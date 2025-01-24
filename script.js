const addBookBtn = document.getElementById('add-book-btn');
const form = document.querySelector('form');
const bookList = [];
const bookContainer = document.getElementById('book-container');

console.log('JavaScript loaded');

addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Button clicked');

  const titleInput = form.querySelector('input[name="title"]');
  const authorInput = form.querySelector('input[name="author"]');
  const genreInput = form.querySelector('input[name="genre"]');
  const statusInput = form.querySelector('select[name="status"]')
  const book = {
    title: titleInput.value,
    author: authorInput.value,
    genre: genreInput.value,
    status: statusInput.value
  };
  bookList.push(book);
  console.log(bookList);

  // Clear existing book tiles
  bookContainer.innerHTML = '';

  // Render the updated book list
  bookList.forEach((book) => {
    const bookTile = document.createElement('div');
    bookTile.classList.add('book-tile');

    const img = document.createElement('img');
    img.src = 'assets/book.svg';
    img.alt = 'books';

    const desBooks = document.createElement('div');
    desBooks.classList.add('des-books');

    const titleP = document.createElement('p');
    titleP.textContent = book.title;

    const authorP = document.createElement('p');
    authorP.textContent = book.author;

    const genreP = document.createElement('p');
    genreP.textContent = book.genre;

    const statusP = document.createElement('p');
    statusP.textContent = book.status; // You can replace this with a dynamic status

    desBooks.appendChild(titleP);
    desBooks.appendChild(authorP);
    desBooks.appendChild(genreP);
    desBooks.appendChild(statusP);

    bookTile.appendChild(img);
    bookTile.appendChild(desBooks);

    bookContainer.appendChild(bookTile);
  });
});