'use strict';

function onInit() {
    renderLogin();
}

function renderLogin() {
    var strHtml = ` 
    <h1>Sign In!</h1>
    <div for="username">Username</div>
    <input type="text" name="userName" id="username"/>
    <div for="paswword">Password</div>
    <input type="password" name="password" id="password" />
    <button onclick="onLogin()">Login</button>`
    var elLogin = document.querySelector('.login');
    elLogin.innerHTML = strHtml;
}



function onLogin() {
    var elUser = document.querySelector('input[name=userName]');
    var userName = elUser.value;
    var elPass = document.querySelector('input[name=password]');
    var userPass = elPass.value;
    doLogin(userName, userPass);
}


function showSecretContent(user) {
    document.querySelector('.secret-content').style.display = 'flex';
    document.querySelector('.secret-content').style.justifyContent = 'center';
    document.querySelector('header h1').innerHTML = user.userName;
    if (user.isAdmin) {
        var str = `<button onclick="location.href='admin.html'">Admin</button>`
        document.querySelector('.admin').innerHTML = str;
    }

}

function onLogout() {
    document.querySelector('header h1').innerHTML = '';
    document.querySelector('.secret-content').style.display = 'none';
    document.querySelector('.logout').style.display = 'none';
    document.querySelector('.admin').style.display = 'none';
    document.querySelector('.login').style.display = 'block';
    localStorage.clear();

    onInit();
}