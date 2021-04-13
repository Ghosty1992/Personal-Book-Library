class Book {
  constructor(isbn, title, author, description, feedback) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.description = description;
    this.feedback = feedback;
  }
}

class Tasks {
  static displayBooks() {
    const books = Library.getBook();

    books.forEach((book) => Tasks.createNewBook(book));
  }
  static createNewBook(book) {
    const bookList = document.querySelector('#book-list');
    const newTr = document.createElement('tr');
    newTr.innerHTML = `<td>${book.isbn}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.description}</td>
      <td>${book.feedback}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

    bookList.append(newTr);
  }
  static deleteBook(item) {
    item.parentElement.parentElement.remove();
  }

  static clearFormFields() {
    document.querySelector('#book-isbn').value = '';
    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
    document.querySelector('#book-description').value = '';
    document.querySelector('#book-feedback').value = '';
  }
}

class Library {
  static getBook() {
    let books;
    localStorage.getItem('books') === null
      ? (books = [])
      : (books = JSON.parse(localStorage.getItem('books')));
    return books;
  }
  static addBook(book) {
    const books = Library.getBook();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(id) {
    const books = Library.getBook();
    books.forEach((book, index) => {
      if (book.isbn === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Tasks.displayBooks);

const form = document.querySelector('#myForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookIsbn = document.querySelector('#book-isbn').value;
  const bookTitle = document.querySelector('#book-title').value;
  const bookAuthor = document.querySelector('#book-author').value;
  const bookDesc = document.querySelector('#book-description').value;
  const bookFeedback = document.querySelector('#book-feedback').value;

  if (bookIsbn === '' || bookTitle === '' || bookAuthor === '') {
    alert('Fields are mandatory.Please fill in!');
  } else {
    const book = new Book(
      bookIsbn,
      bookTitle,
      bookAuthor,
      bookDesc,
      bookFeedback
    );
    Tasks.createNewBook(book);
    Library.addBook(book);
    Tasks.clearFormFields();
  }
});
document.querySelector('#book-list').addEventListener('click', (e) => {
  Tasks.deleteBook(e.target);

  Library.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
