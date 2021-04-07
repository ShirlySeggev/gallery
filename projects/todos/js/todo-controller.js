'use strict';

function onInit() {
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();

    if (!todos.length) {
        var isAllDone = allTodosDone(gTodos)
        if (isAllDone) document.querySelector('.todo-list span').innerText = 'All todos Done!';
        else document.querySelector('.todo-list span').innerText = 'No todos!';
    }


    var strHTMLs = todos.map(function(todo) {
            var className = (todo.isDone) ? 'done' : ''
            return `  
        <li class="${className}" onclick="onToggleTodo('${todo.id}')">
            Todo: ${todo.txt} |
            Created at: ${todo.createdAt} |
            Importance: ${todo.importance} 
            <button class="btn-remove" onclick="onRemoveTodo(event, '${todo.id}')">x</button>
        </li>`;
        })
        // console.log('strHTMLs', strHTMLs);
    var elTodoList = document.querySelector('.todo-list ul')
    elTodoList.innerHTML = strHTMLs.join('');

    document.querySelector('.stat-total').innerText = getTotalCount();
    document.querySelector('.stat-active').innerText = getActiveCount();

}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    var userConfirm = confirm('Do you aprove to delete the Todo?');
    if (userConfirm) {
        console.log('Removing', todoId);
        removeTodo(todoId);
        renderTodos();
    } else {
        alert('you cancel the delete!');
    }
}

function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onAddTodo() {
    var elTxt = document.querySelector('input[name=newTodoTxt]');
    var txt = elTxt.value;
    var elImportance = document.querySelector('input[name=newTodoImportance]');
    var importance = elImportance.value;
    if (!txt || (importance > 3 || importance < 1)) return;
    addTodo(txt, +importance);
    elTxt.value = '';
    elImportance.value = '';
    renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy);
    console.log('Filtering', filterBy);
    renderTodos();
}

function onSetSort(sortBy) {
    setSort(sortBy);
    console.log('Sortting', sortBy);
    renderTodos();
}