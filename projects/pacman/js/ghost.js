'use strict'
const GHOST = '&#9781;';

const gGhostStartingI = 3;
const gGhostStartingJ = 3;


var gGhosts = []
var gIntervalGhosts;
var gCountRemovedGhosts = 0;

function createGhost(board, currContent) {

    var ghost = {
        location: {
            i: gGhostStartingI,
            j: gGhostStartingJ
        },
        currCellContent: currContent,
        // currCellContent: EMPTY,
        ghostColor: getRandomColor()
    }

    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST; //update model
}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board, FOOD);
    createGhost(board, FOOD);
    createGhost(board, FOOD);
    gIntervalGhosts = setInterval(moveGhosts, 2000);
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost);
    }
}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff();

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === CHERRY) return

    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        // gameOver();
        return
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent //putting last cell content instead of ghost

    // update the DOM
    renderCell(ghost.location, ghost.currCellContent); //rendering last cell content

    // Move the ghost
    // update the model

    ghost.location = nextLocation;
    ghost.currCellContent = nextCell;

    gBoard[ghost.location.i][ghost.location.j] = GHOST;

    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost));
}

//random location to the 4 neighbors
function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span style= "color:${ghost.ghostColor}">${GHOST}</span>`
}