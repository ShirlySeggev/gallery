var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var STORAGE_KEY = 'questDB';

function createQuestsTree() {
    if (!getQuestfromStorage()) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi?');
        gQuestsTree.no = createQuest('Rita?');
    } else gQuestsTree = getQuestfromStorage();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // Create and Connect the 2 Quests to the quetsions tree
    var newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = gCurrQuest;
    gPrevQuest[lastRes] = newQuest;
    gCurrQuest = gQuestsTree;

    _saveQuestToStorage();
}

function getCurrQuest() {
    return gCurrQuest;
}

function _saveQuestToStorage() {
    saveToStorage(STORAGE_KEY, gQuestsTree);
}


function getQuestfromStorage() {
    return loadFromStorage(STORAGE_KEY);
}