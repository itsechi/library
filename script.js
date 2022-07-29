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
openFormBtn.addEventListener('click', () => {
  form.classList.remove('hidden');
  overlay.classList.remove('hidden');
});
// close form
overlay.addEventListener('click', closeForm);
function closeForm() {
  overlay.classList.add('hidden');
  deleteModal.classList.add('hidden');
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
    <span class="material-icons-outlined trash">delete</span>
    <div class="status"><label>${
      book.read
        ? `<input type="checkbox" class="mark-read" checked>`
        : `<input type="checkbox" class="mark-read">`
    } 
    mark read</label></div>
    <div class="status-bar ${book.read ? `read` : 'not-read'}">`;
    cardContainer.appendChild(displayBook);

    // sort books
    const dropdown = document.querySelector('#dropdown');
    dropdown.addEventListener('change', () => {
      if (dropdown.value === 'all') displayBook.classList.remove('hidden');
      if (dropdown.value === 'read') {
        displayBook.classList.remove('hidden');
        if (!book.read) {
          displayBook.classList.add('hidden');
        }
      }
      if (dropdown.value === 'not read') {
        displayBook.classList.remove('hidden');
        if (book.read) {
          displayBook.classList.add('hidden');
        }
      }
    });

    // mark read
    const markReadBtn = displayBook.querySelector('.mark-read');
    markReadBtn.addEventListener('click', e => {
      if (!e.target.checked) {
        e.target.parentNode.parentNode.nextElementSibling.classList.remove(
          'read'
        );
        e.target.parentNode.parentNode.nextElementSibling.classList.add(
          'not-read'
        );
        myLibrary[i].read = false;
      } else if (e.target.checked) {
        e.target.parentNode.parentNode.nextElementSibling.classList.remove(
          'not-read'
        );
        e.target.parentNode.parentNode.nextElementSibling.classList.add('read');
        myLibrary[i].read = true;
      }
    });

    // delete book
    const deleteBtn = displayBook.querySelector('.trash');
    deleteBtn.addEventListener('click', () => {
      myLibrary.splice(i, 1);
      cardContainer.removeChild(displayBook);
    });
  });
}

// delete all books
const deleteModal = document.querySelector('.delete-modal');
const deleteAllBtn = document.querySelector('#delete-all');
deleteAllBtn.addEventListener('click', () => {
  deleteModal.classList.remove('hidden');
  overlay.classList.remove('hidden');

  const confirmDelete = document.querySelector('#confirm-delete');
  confirmDelete.addEventListener('click', () => {
    myLibrary = [];
    cardContainer.innerHTML = '';
    closeForm();
  });

  const cancelDelete = document.querySelector('#cancel-delete');
  cancelDelete.addEventListener('click', closeForm);
});

// test books
const ISOLT = new Book('In Search of Lost Time', 'Marcel Proust', 4215, true);
myLibrary.push(ISOLT);
const Hamlet = new Book('Hamlet', 'William Shakespeare', 104, false);
myLibrary.push(Hamlet);
displayBooks();
