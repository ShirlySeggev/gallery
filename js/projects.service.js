'use strict';

var gProjs;
createProjects();

function getProjectsToDisplay() {
    return gProjs;
}

function createProjects() {
    var projs = [
        createProj('guessMe', 'Guess Me', 'jQuery & Bootstrap', '06/04/21'),
        createProj('bookShop', 'Books Shop', 'CRUD', '05/04/21'),
        createProj('todos', 'Todos', 'MVC', '05/04/21'),
        createProj('safeContent', 'Safe Content', 'MVC', '04/04/21'),
        createProj('minesweeper', 'Minesweeper', 'First Sprint', '25/03/21'),
        createProj('pacman', 'Pacman', 'Board Games', '22/03/21'),
        createProj('ballBoard', 'Ball Board', 'Board Games', '21/03/21'),
        createProj('chess', 'Chess', 'Board Games', '21/03/21'),
        createProj('inPicture', 'In-Picture Game', 'HTML, CSS, JS', '18/03/21'),
        createProj('touchNums', 'Touch Nums', 'HTML, CSS, JS', '18/03/21')
    ];
    gProjs = projs;
}

function createProj(id, name, title, publishedAt) {
    return {
        id,
        name,
        title,
        publishedAt,
        url: `${id}.jpg`,
        client: 'Homework',
        desc: 'lorem ipsum lorem ipsum lorem ipsum',
        labels: ['Matrixes', 'keyboard events']
    }
}