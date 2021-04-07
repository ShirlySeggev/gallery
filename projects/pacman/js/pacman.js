'use strict'
const PACMAN = '😷';

var gPacman;
var gSuperInterval;


function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false,
        isUp: false,
        isDown: false,
        isRight: false,
        isLeft: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN; //update model

}

function movePacman(ev) {
    if (!gGame.isOn) return
    var nextLocation = getNextLocation(ev);
    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            for (var i = 0; i < gGhosts.length; i++) {  //remove from array
                if (gGhosts[i].location.i === nextLocation.i &&
                    gGhosts[i].location.j === nextLocation.j) {
                    gBoard[nextLocation.i][nextLocation.j] = gGhosts[i].currCellContent;
                    console.log('current content: ' + gGhosts[i].currCellContent);
                    if (gGhosts[i].currCellContent === FOOD || gGhosts[i].currCellContent === POWER_FOOD) {
                        updateScore(1);
                    }
                    gGhosts.splice(i, 1);
                    gCountRemovedGhosts++;
                }
            }
            renderCell(nextLocation, EMPTY);  // update the DOM
        } else {
            gameOver();
            renderCell(gPacman.location, EMPTY);
            return;
        }
    }
    if (nextCell === FOOD) {
        updateScore(1);
    }
    if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return;
        updateScore(1);
        gPacman.isSuper = true;
        for (var i = 0; i < gGhosts.length; i++) { //changing ghost color
            gGhosts[i].ghostColor = 'blue'; //MODEL
            getGhostHTML(gGhosts[i]); //DOM
        }
        gSuperInterval = setTimeout(function () {
            gPacman.isSuper = false;
            //change color back
            for (var i = 0; i < gGhosts.length; i++) {
                gGhosts[i].ghostColor = getRandomColor(); //MODEL
                getGhostHTML(gGhosts[i]); //DOM
            }
            //create the ghost that eaten
            var currContent = gBoard[gGhostStartingI][gGhostStartingJ];
            for (var i = 0; i < gCountRemovedGhosts; i++) { //update the model board and array
                createGhost(gBoard, currContent);
            }
            gCountRemovedGhosts = 0;
        }, 5000);
    }

    if (nextCell === CHERRY) updateScore(10);
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman
    // update the model

    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

    // update the DOM
    var elPacman = document.querySelector(`.cell${gPacman.location.i}-${gPacman.location.j}`);
    if (gPacman.isUp) elPacman.style.transform = 'rotate(180deg)';
    if (gPacman.isDown) elPacman.style.transform = 'rotate(0deg)';
    if (gPacman.isLeft) elPacman.style.transform = 'rotate(90deg)';
    if (gPacman.isRight) elPacman.style.transform = 'rotate(-90deg)';
    gPacman.isUp = gPacman.isDown = gPacman.isLeft = gPacman.isRight = false;
    renderCell(gPacman.location, PACMAN);

}

function getNextLocation(ev) {
    // figure out nextLocation
    // console.log('ev.code', ev.code)
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (ev.code) {
        case 'ArrowUp':
            nextLocation.i--
            gPacman.isUp = true;
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacman.isDown = true;
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.isLeft = true;
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacman.isRight = true;
            break;
        default: return null
    }

    return nextLocation;
}