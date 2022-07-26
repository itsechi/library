const title = document.querySelector('#book-title');
const author = document.querySelector('#book-author');
const pages = document.querySelector('#book-pages');
const addBtn = document.querySelector('#add-book');
const read = document.querySelector('#book-status');
const cardContainer = document.querySelector('.card-container');
const openFormBtn = document.querySelector('#open-form');
const form = document.querySelector('.form-modal');
const overlay = document.querySelector('.form-overlay');
let myLibrary = [];

// show form
openFormBtn.addEventListener('click', () => form.classList.remove('hidden'));
// close form
overlay.addEventListener('click', closeForm);
function closeForm() {
  form.classList.add('hidden');
}

// create a new book
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// add book to myLibrary array
addBtn.addEventListener('click', addBookToLibrary);
function addBookToLibrary(e) {
  e.preventDefault();
  const book = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(book);
  closeForm();
  displayBooks();
}

// display myLibrary
function displayBooks() {
  cardContainer.innerHTML = '';
  myLibrary.forEach(book => {
    const displayBook = document.createElement('div');
    displayBook.className = 'card';
    displayBook.innerHTML = `<h2 class="title">${book.title}</h2>
    <h3 class="author">${book.author}</h3>
    <h4 class="pages">${book.pages} pages</h4>
    <h3 class="status">${
      book.read
        ? `<input type="checkbox" id="mark-read checked"</input>`
        : `<input type="checkbox" id="mark-read"></input>`
    } mark read</h3>
    <div class="status-bar ${book.read ? `read` : 'not-read'}">`;
    cardContainer.appendChild(displayBook);
  });
}

const ISOLT = new Book('In Search of Lost Time', 'Marcel Proust', 4215, true);
myLibrary.push(ISOLT);
const Hamlet = new Book('Hamlet', 'William Shakespeare', 104, false);
myLibrary.push(Hamlet);
displayBooks();
