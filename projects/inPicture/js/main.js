// console.log('hi!!');

'use strict';

var gCurrQuestIdx = 0;
var gQuests;


function initGame() {
    gQuests = createQuests();
    renderQuest();
}

function renderQuest() {
    var strHtml = `<img src = "img/${gCurrQuestIdx+1}.png" />`

    var elPicture = document.querySelector('.picture');
    elPicture.innerHTML = strHtml;

    renderButtons();
}

function checkAnswer(elButton) {
    var iButton = +elButton.getAttribute('data-i');
    if (iButton === gQuests[gCurrQuestIdx].correctOptIndex) {
        gCurrQuestIdx++;
        if (gCurrQuestIdx < gQuests.length) renderQuest();
        else finishGame();
    }
}

function finishGame() {
    alert('Congrats! You know all the animals!');

    var elButton = document.querySelector('.start-btn');
    elButton.style.display = 'inline-block';
}

function playAgain(elButton) {
    elButton.style.display = 'none';
    gCurrQuestIdx = 0;
    renderQuest();
}

function renderButtons(){
    var strHtml ='';

    for(var i=0; i< gQuests[gCurrQuestIdx].opts.length; i++){
        strHtml+=`<button data-i="${i+1}" 
        onclick="checkAnswer(this)">${gQuests[gCurrQuestIdx].opts[i]}</button>`;
    }

    var elButtonGroup = document.querySelector('.btn-group');
    elButtonGroup.innerHTML = strHtml;

    //  <button data-i="1" onclick="checkAnswer(this)">Dog</button>
}

function createQuests() {
    var quests = [
        { id: 1, opts: ['Dog', 'Lion', 'Cat', 'Giraffe'], correctOptIndex: 1 },
        { id: 2, opts: ['Mouse', 'Cat', 'Elephant', 'Monkey'], correctOptIndex: 2 },
        { id: 3, opts: ['Tiger', 'Zebra', 'Horse', 'Rabbit'], correctOptIndex: 3 },
        { id: 4, opts: ['Tiger', 'Deer', 'Owl', 'Sheep'], correctOptIndex: 4 }
    ];
    return quests;
}



