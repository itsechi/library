const title = document.querySelector('#book-title');
const author = document.querySelector('#book-author');
const pages = document.querySelector('#book-pages');
const addBtn = document.querySelector('button');
const read = document.querySelector('#book-status');
const display = document.querySelector('.display');
let myLibrary = [];

addBtn.addEventListener('click', addBookToLibrary);

// create a new book
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      read ? 'have read' : 'not read yet'
    }`;
  };
}

// add book to myLibrary array
function addBookToLibrary() {
  const book = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(book);
  console.log(myLibrary);
  displayBooks();
}

// display myLibrary
function displayBooks() {
  display.innerHTML = '';
  myLibrary.forEach(book => {
    console.log(book.info());
    const displayBook = document.createElement('div');
    displayBook.innerHTML = book.info();
    display.appendChild(displayBook);
  });
}

