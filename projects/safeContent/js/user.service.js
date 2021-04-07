'use strict';
console.log('hii');

var STORAGE_KEY = 'usersDB';
var gUsers;
var gSortBy = 'txt';
_createUsers();


function login(theUser) {
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.logout').style.display = 'block';
    showSecretContent(theUser);
    theUser.lastLoginTime = Date.now();
    _saveUsersToStorage();
}

function doLogin(userName, password) {
    var theUser = gUsers.find(function(user) {
        return (user.userName === userName &&
            user.password === password)
    });
    (theUser) ? login(theUser): alert('no user in DB');

}

function getUsersToShow() {
    return gUsers;
}

function _saveUsersToStorage() {
    saveToStorage(STORAGE_KEY, gUsers);
}

function _createUsers() {
    var users = loadFromStorage(STORAGE_KEY)
    if (!users || users.length === 0) {
        var users = [
            _createUser('puki', 'secret', true),
            _createUser('muki', '123', false),
            _createUser('shuki', '456', false),
        ];
    }
    gUsers = users;
    _saveUsersToStorage();
}

function _createUser(name, pass, isAdmin) {
    var user = {
        id: _makeId(),
        userName: name,
        password: pass,
        lastLoginTime: Date.now(),
        isAdmin: isAdmin
    }
    return user;
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}