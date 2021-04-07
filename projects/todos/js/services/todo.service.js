'use strict';

var STORAGE_KEY = 'todosDB';
var gFilterBy = 'all';
var gSortBy = 'txt';
var gTodos;
_createTodos();

function getTodosForDisplay() {
    setSort(gSortBy);
    if (gFilterBy === 'all') return gTodos;
    var todos = gTodos.filter(function(todo) {
        return todo.isDone && gFilterBy === 'done' ||
            !todo.isDone && gFilterBy === 'active'
    })
    return todos;
}

function getTotalCount() {
    return gTodos.length;
}

function getActiveCount() {
    var todos = gTodos.filter(function(todo) {
        return !todo.isDone;
    })
    return todos.length;
}

function removeTodo(todoId) {
    var idx = gTodos.findIndex(function(todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function(todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    _saveTodosToStorage();
}

function addTodo(txt, importance) {
    var todo = _createTodo(txt, importance);
    gTodos.unshift(todo);
    _saveTodosToStorage();
}


function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy;
    if (sortBy === 'txt') {
        gTodos.sort(function(a, b) {
            return a.txt.localeCompare(b.txt);
        });
    } else if (sortBy === 'created') {
        gTodos.sort(function(a, b) {
            return a.createdAt - b.createdAt
        });
    } else {
        gTodos.sort(function(a, b) {
            return a.importance - b.importance
        });
    }
}


function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos);
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)
    if (!todos || todos.length === 0) {
        var todos = [
            _createTodo('Study HTML', 2),
            _createTodo('Learn CSS', 3),
            _createTodo('Master Javascript', 1)
        ];
    }
    gTodos = todos;
    _saveTodosToStorage();
}

function _createTodo(txt, importance) {
    var todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: importance
    }
    return todo;
}

function allTodosDone() {
    return gTodos.every(function(todo) {
        return todo.isDone
    });
}