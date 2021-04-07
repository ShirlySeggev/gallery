'use strict'
const KEY = 'books';
const PAGE_SIZE = 5;

var gBooks;
var gSortBy = 'txt';
var gPageIdx = 0;

_createBooks();

function setPage(diff) {
    if (gPageIdx + diff > gBooks.length / PAGE_SIZE) return gPageIdx;
    if (gPageIdx + diff < 0) return gPageIdx;
    gPageIdx += diff;
    return gPageIdx;
}

function addRate(bookId, rate) {
    var book = getBookById(bookId);
    book.rate = rate;
    _saveBooksToStorage();
}

function addBook(newName, newPrice) {
    var newBook = _createBook(newName, newPrice);
    gBooks.push(newBook);
    _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
    var book = getBookById(bookId);
    book.price = newPrice;
    _saveBooksToStorage();
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id;
    });
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function getBooks() {
    return gBooks;
}

function _createBook(name = getRandName(), price = getRandomIntInclusive(20, 80)) {
    var randImg = getRandomIntInclusive(1, 5);
    return {
        id: makeId(),
        name,
        price,
        imgUrl: `img/${randImg}.jpg`,
        rate: 0
    };
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < 20; i++) {
            books.push(_createBook());
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

function getBookById(bookId) {
    var book = gBooks.find(function(book) {
        return bookId === book.id
    });
    return book;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function getSort() {
    if (gSortBy === 'txt') {
        gBooks.sort(function(book1, book2) {
            return book1.name.localeCompare(book2.name);
        });
    } else {
        gBooks.sort(function(book1, book2) {
            return book1.price - book2.price
        });
    }
}

function getBooksForDisplay() {
    var books = getBooks();
    getSort();

    var startIdx = gPageIdx * PAGE_SIZE;
    var books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books;
}