'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.btn-playAgain').click(onRestartGame);

function init() {
    console.log('Started...');
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').hide();
    renderQuest();
    $('.quest').show();
}

function renderQuest() {
    $('.quest h2').html(getCurrQuest().txt);
    $('.quest h2').show();
    $('.btn-yes').show();
    $('.btn-no').show();
}

function onUserResponse(ev) {
    var res = ev.data.ans;
    // If this node has no children
    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {
            $('.btn-yes').hide();
            $('.btn-no').hide();
            $('.quest h2').html('Yes, I knew it!');
            $('.btn-playAgain').show();
        } else {
            // hide and show new-quest section
            $('.quest').hide();
            $('.new-quest').show();
        }
    } else {
        //update the lastRes global var
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess(ev) {
    ev.preventDefault();
    var newGuess = $('#newGuess').val();
    var newQuest = $('#newQuest').val();
    //  Get the inputs' values
    //  Call the service addGuess
    addGuess(newQuest, newGuess, gLastRes);
    onRestartGame();
}

function onRestartGame() {
    $('.quest h2').hide();
    $('.btn-playAgain').hide();
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    createQuestsTree();
}