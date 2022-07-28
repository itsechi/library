const title = document.querySelector('#book-title');
const author = document.querySelector('#book-author');
const pages = document.querySelector('#book-pages');
const read = document.querySelector('#book-status');
const addBtn = document.querySelector('form');
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
  // clear input fields
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}

// create a new book
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// add book to myLibrary array
addBtn.addEventListener('submit', addBookToLibrary);
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
  myLibrary.forEach((book, i) => {
    const displayBook = document.createElement('div');
    displayBook.className = 'card';
    displayBook.setAttribute('data-index', `${i}`);
    displayBook.innerHTML = `<h1 class="title">${book.title}</h1>
    <h2 class="author">${book.author}</h2>
    <h3 class="pages">${book.pages} pages</h3>
    <h2 class="status">${
      book.read
        ? `<input type="checkbox" class="mark-read" checked>`
        : `<input type="checkbox" class="mark-read">`
    } mark read</h2>
    <div class="status-bar ${book.read ? `read` : 'not-read'}">`;
    cardContainer.appendChild(displayBook);

    // mark read
    const markReadBtn = displayBook.querySelector('.mark-read');
    markReadBtn.addEventListener('click', e => {
      if (!e.target.checked) {
        e.target.parentNode.nextSibling.nextElementSibling.classList.remove(
          'read'
        );
        e.target.parentNode.nextSibling.nextElementSibling.classList.add(
          'not-read'
        );
        myLibrary[i].read = false;
      } else if (e.target.checked) {
        e.target.parentNode.nextSibling.nextElementSibling.classList.remove(
          'not-read'
        );
        e.target.parentNode.nextSibling.nextElementSibling.classList.add(
          'read'
        );
        myLibrary[i].read = true;
      }
    });
  });
}

// test books
const ISOLT = new Book('In Search of Lost Time', 'Marcel Proust', 4215, true);
myLibrary.push(ISOLT);
const Hamlet = new Book('Hamlet', 'William Shakespeare', 104, false);
myLibrary.push(Hamlet);
displayBooks();
