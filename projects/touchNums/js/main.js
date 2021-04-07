'use strict';

const EASY = 16;
const MEDIUM = 25;
const HARD = 36;
var gNums;
var gLevel = EASY;
var gStartTime;
var gTimerInterval;

function initGame() {
    gNums = createNums(gLevel);
    renderNums();
    clearTimeout(gTimerInterval);
}

function renderNums() {
    var strHtml = '';
    var size = Math.sqrt(gNums.length);

    for (var i = 0; i < size; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < size; j++) {
            var num = getRanNum();
            strHtml += `<td 
            onclick="cellClicked(this,${num})"
            >${num}</td>`
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function getRanNum() {
    var randIndex = Math.floor(Math.random() * gNums.length)
    var randNum = gNums[randIndex];
    gNums.splice(randIndex, 1);
    return randNum;
}

function createNums(len) {
    var nums = [];
    for (var i = 0; i < len; i++) {
        nums.push([i + 1]);
    }
    return nums;
}

function cellClicked(elClickedNum, numClicked) {
    if (numClicked !== gNums.length + 1) return;  //if is'nt num expected go back;

    if (gNums.length === 0 && numClicked === 1) {
        gStartTime = Date.now();
        renderTimer();
    }
    gNums.push(numClicked);
    console.log('gNums', gNums);
    renderCell(elClickedNum, numClicked);
    checkFinishGame();
}

function renderCell(elClickedNum, numClicked) {
    elClickedNum.classList.add('pressed');
    renderNextNum(numClicked);
}

function renderNextNum() {
    if (gNums.length !== gLevel) {
        var elNextNum = document.querySelector('.next-num span');
        elNextNum.innerText = gNums.length + 1;
    }
}

function checkFinishGame() {
    if (gNums.length === gLevel) {
        clearTimeout(gTimerInterval);
        alert('Congrats! You\'re time is: ' + getTime() + '!');

        var elButton = document.querySelector('.start-btn');
        elButton.style.display = 'inline-block';
    }
}

function playAgain(elButton) {
    elButton.style.display = 'none';
    var elTimer = document.querySelector('.timer');
    elTimer.style.display = 'none';
    initGame();
    renderNextNum();
}

function renderTimer() {
    var elTimer = document.querySelector('.timer');
    elTimer.style.display = 'flex';
    gTimerInterval = setInterval(function () {
        elTimer.innerText = getTime();
    }, 100);

}

function getTime() {
    var totalTime = (Date.now() - gStartTime) / 1000;
    return totalTime;
}

function playLevel(elButton) {
    if (elButton.classList.contains('easy')) gLevel = EASY;
    else if (elButton.classList.contains('medium')) gLevel = MEDIUM;
    else gLevel = HARD;

    changeBottonsStyle(elButton);
    initGame();
}

function changeBottonsStyle(elButton) {
    var elButtons = document.querySelectorAll('.btn');
    for (var i = 0; i < elButtons.length; i++) {
        if (elButton === elButtons[i]) {
            elButtons[i].style.backgroundColor = 'white';
            elButtons[i].style.borderWidth = '2px';

        } else {
            elButtons[i].style.backgroundColor = 'rgb(246,131,112)';
            elButtons[i].style.borderWidth = '0px';
        }
    }
}
