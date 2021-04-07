'use strict';
// var gBookId;

var gIsOnUpdate = false;

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooksForDisplay();

    var tableHtml = books.map(function(book) {
        return `  
                <tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td class="changePrice${book.id}">$<span>${book.price}</span></td>
                <td><button onclick="onReadBook('${book.id}')">Read</button></td>
                <td><button onclick="onUpdateBook('${book.id}')">Update</button></td>
                <td><button onclick="onDeleteBook('${book.id}')">Delete</button></td>
                </tr>`;
    });
    var elTable = document.querySelector('.books-container');
    elTable.innerHTML = tableHtml.join('');
}

function onDeleteBook(bookId) {
    removeBook(bookId);
    console.log('removing', bookId);
    renderBooks();
}

function onUpdateBook(bookId) {
    gIsOnUpdate = !gIsOnUpdate;
    var elPrice = document.querySelector(`.changePrice${bookId} span`);
    if (gIsOnUpdate) {
        var strHtml = `<input type="number" name="${bookId}"/>`;
        elPrice.innerHTML = strHtml;
    } else {
        var newPrice = document.querySelector(`input[name="${bookId}"]`).value;
        updateBook(bookId, newPrice);
        console.log('updatign', bookId, newPrice);
        renderBooks();
    }
}

function onAddBook(ev) {
    ev.preventDefault();
    var elInputs = document.querySelectorAll('input')
    var newName = document.querySelector('input[name="bookName"]').value;
    var newPrice = document.querySelector('input[name="price"]').value;
    addBook(newName, newPrice);
    elInputs.forEach(function(elInput) {
        elInput.value = '';
    });
    renderBooks();
}

function onReadBook(bookId) {
    var theBook = getBookById(bookId);
    var strHtml = `
            <h2>Book Details</h2>
            <h3>${theBook.name}</h3>
            <h4>$${theBook.price}</h4>
            <img src="${theBook.imgUrl}"></img>
            <div class="rate">Rate:</div>
            <button onclick="onSetRate('${theBook.id}', 'reduce')">-</button> 
            <input type="text" name="newRate" value="${theBook.rate}"/>
            <button onclick="onSetRate('${theBook.id}', 'add')">+</button> 
            <button onclick="onCloseModal()">Close</button>`
    var elModal = document.querySelector('.modal');
    elModal.innerHTML = strHtml;
    elModal.hidden = false;
}

function onSetRate(bookId, operator) {
    var rate = document.querySelector('input[name=newRate]');
    console.log(operator);
    if (rate.value > 10 || rate.value < 0) return;
    (operator === 'add') ? rate.value++: rate.value--;
    document.querySelector('input[name=newRate]').innerHTML = rate.value;
    addRate(bookId, rate.value);
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}

function onSetSort(sortBy) {
    setSort(sortBy);
    renderBooks();
}

function onSetPage(diff) {
    var pageNum = setPage(diff);
    renderBooks();
    var elPageNum = document.querySelector('.current-page')
    elPageNum.innerText = pageNum
    nextPage();
}