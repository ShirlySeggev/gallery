'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '+';
const CHERRY = '🍒'

var gTotalFood = -1;
var gCherryInterval;


var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    createCherry();
    console.log('A', gTotalFood);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                continue;
            }
            else if (i === 1 && j === 1 || i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 || i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = POWER_FOOD;
            }
            else {
                board[i][j] = FOOD;
            }
            gTotalFood++;
        }
    }
    console.log('B', gTotalFood);
    return board;
}

function updateScore(diff) {
    // update model
    gGame.score += diff;
    // and dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
    console.log('C', gTotalFood);
    if (gGame.score === gTotalFood) openModal();
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    gGame.score = 0; //update model
    var elScore = document.querySelector('h2 span'); //update DOM
    elScore.innerText = gGame.score;
    openModal();
}

function openModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    var elModalSpan = document.querySelector('.modal span');
    
    if (!gGame.isOn) elModalSpan.innerText = 'GAME OVER!!!';
    else elModalSpan.innerText = 'CONGRATS! YOU WIN!!!';

    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
}

function playAgain() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
    clearTimeout(gIntervalGhosts);
    gTotalFood = -1;
    console.log('D', gTotalFood);
    init();
}


function getEmptyCells(board) {
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCellPos = { i, j };
            var currCell = board[i][j];
            if (currCell === EMPTY) emptyCells.push(currCellPos)
        }
    }
    return emptyCells;
}

function createCherry() {
    gCherryInterval = setInterval(function () {
        var emptyCells = getEmptyCells(gBoard);
        if (!emptyCells.length) return;
        var cell = emptyCells[getRandomInt(0, emptyCells.length - 1)];
        gBoard[cell.i][cell.j] = CHERRY; 	//Model
        renderCell({ i: cell.i, j: cell.j }, CHERRY); 	//Dom
        gTotalFood += 10;
        console.log('E', gTotalFood);
    }, 15000);
}
