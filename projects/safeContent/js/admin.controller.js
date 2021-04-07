'use strict;'


function initAdmin() {
    renderTable();
    renderAdminName();
}

function renderAdminName() {
    document.querySelector('header h1').innerHTML = 'Hello Admin!';
}

function renderTable() {
    var users = getUsersToShow();

    var tablelHead = `<tr>
                    <td>UserName</td>
                    <td>password</td>
                    <td>date</td>
                    <td>isAdmin</td>
                    </tr>`;
    var tableHtml = users.map(function(user) {
        return `  
                <tr>
                <td> ${user.userName}</td>
                <td>${user.password}</td>
                <td>${user.lastLoginTime}</td>
                <td>${user.isAdmin}</td>
                </tr>`;
    });
    var elTable = document.querySelector('.users-container');
    elTable.innerHTML = tablelHead + tableHtml.join('');
}

function onSetSort(sortBy) {
    setSort(sortBy);
    console.log('Sortting', sortBy);
    renderTable();
}

function setSort(sortBy) {
    var users = getUsersToShow();
    gSortBy = sortBy;
    if (sortBy === 'txt') {
        users.sort(function(a, b) {
            return a.userName.localeCompare(b.userName);
        });
    } else {
        users.sort(function(a, b) {
            return b.lastLoginTime - a.lastLoginTime;
        });
    }
}