    const addBookBtn =document.getElementById('add-book-btn');
    const addBookForm = document.getElementById('add-book');
    const bookList = [];
    const bookTilesContainer = document.getElementById("book-container")
    const bookCount = document.querySelector('.count');

    function updateBookCount() {
        const bookTiles = document.querySelectorAll('.book-tile');
        const bookCountElement = document.querySelector('.count');
        const bookCount = bookTiles.length;
        bookCountElement.textContent = bookCount;
    }

    document.addEventListener('DOMContentLoaded', updateBookCount);

    
    console.log('javascript loaded');

    addBookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('added new book')

        //get input data from the addBookForm

        const titleInput = addBookForm.querySelector('input[name="title"]');
        const authorInput = addBookForm.querySelector('input[name="author"]');
        const genreInput = addBookForm.querySelector('input[name="genre"]');
        const statusInput = addBookForm.querySelector('select[name="status"]')

        const book = {
            title: titleInput.value,
            author: authorInput.value,
            genre: genreInput.value,
            status: statusInput.value
        }

        bookList.push(book);
        console.log(bookList)

        const currentCount = parseInt(bookCount.textContent);
        bookCount.textContent = currentCount + 1;

        // Clear the input fields
        titleInput.value = '';
        authorInput.value = '';
        genreInput.value = '';
        statusInput.value = '';

        //append the data to the main content area

            const bookTile = document.createElement('div');
            bookTile.classList.add('book-tile')

            const bookDescription = document.createElement('div')
            bookDescription.classList.add('des-books')

            const imgBook = document.createElement('img');
            imgBook.src = "assets/book.svg"
            imgBook.alt= `${book.title} Cover`

            const titleP = document.createElement('p');
            titleP.classList.add('book-title'); // Add this line
            titleP.textContent = book.title;
            
            const authorP = document.createElement('p');
            authorP.classList.add('book-author'); // Add this line
            authorP.textContent = book.author;
            
            const genreP = document.createElement('p');
            genreP.classList.add('book-genre'); // Add this line
            genreP.textContent = book.genre;
            
            const statusP = document.createElement('p');
            statusP.classList.add('book-status'); // Add this line
            statusP.textContent = book.status;

            //currently reading update
            function updateCurrentlyReading(bookTile) {
                const currentlyReadingSection = document.querySelector('.currently-reading');
                const readingTile = currentlyReadingSection.querySelector('.reading-tile');
            
                // Get the book information from the book tile
                const title = bookTile.querySelector('.des-books p:first-child').textContent;
                const author = bookTile.querySelector('.des-books p:nth-child(2)').textContent;
                const genre = bookTile.querySelector('.des-books p:nth-child(3)').textContent;
                const status = bookTile.querySelector('.des-books p:nth-child(4)').textContent;
            
                // Update the reading tile with the book information
                readingTile.innerHTML = `
                <h2>Currently Reading</h2>
                <img src="assets/book.svg" alt="">
                <h3>Title: ${title}</h3>
                <h3>Author: ${author}</h3>
                <h3>Genre: ${genre}</h3>
                <h3>Status: ${status}</h3>
                `;
            }


            const currentReadBtn = document.createElement('button');
            currentReadBtn.innerText = 'Mark as Currently Reading';
            currentReadBtn.classList.add('current-read-btn')

            


            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('current-read-btn')) {
                const bookTile = e.target.parentElement;
                updateCurrentlyReading(bookTile);
                }
            });

            const actionBtns = document.createElement('div')
            actionBtns.classList.add('action-btns');
            
            //delete button &  its functionality
            const deleteBtn = document.createElement('img')
            deleteBtn.src = "assets/delete.svg"
            deleteBtn.alt= "delete book"
            deleteBtn.classList.add('delete-btn')

            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                bookTile.remove();
                updateBookCount()
            });

            //edit button and its functionality         
            
            function editBook(editButton, bookDescription) {
                console.log('function called')


                const bookTile = editButton.closest('.book-tile');
                const titleElement = bookTile.querySelector('.book-title');
                const authorElement = bookTile.querySelector('.book-author');
                const genreElement = bookTile.querySelector('.book-genre');
                const statusElement = bookTile.querySelector('.book-status');
            

                const title = titleElement ? titleElement.innerText : '';
                const author = authorElement ? authorElement.innerText : '';
                const genre = genreElement ? genreElement.innerText : '';
                const status = statusElement ? statusElement.innerText : '';
            
                // Create a form pop-up
                const popup = document.createElement('div');
                popup.classList.add('popup');
                popup.innerHTML = `
                <form>
                    <h2>Edit Book</h2>
                    <label for="edit-title">Title:</label>
                    <input type="text" id="edit-title" value="${title}">
                    <label for="edit-author">Author:</label>
                    <input type="text" id="edit-author" value="${author}">
                    <label for="edit-genre">Genre:</label>
                    <input type="text" id="edit-genre" value="${genre}">
                    <label for="edit-status">Status:</label>
                    <select id="edit-status">
                    <option value="Read" ${status === 'Read' ? 'selected' : ''}>Read</option>
                    <option value="DNF" ${status === 'DNF' ? 'selected' : ''}>Did Not Finish</option>
                    <option value="Reading" ${status === 'Reading' ? 'selected' : ''}>Reading</option>
                    </select>
                    <button id="save-edit-btn">Save</button>
                    <button id="cancel-edit-btn">Cancel</button>
                </form>
                `;

                console.log(popup);
            
                // Add the popup to the page
                document.body.appendChild(popup);
            
                // Add event listeners to the save and cancel buttons
                document.getElementById('save-edit-btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Retrieve the updated book data from the popup form
                    const newTitle = document.getElementById('edit-title').value;
                    const newAuthor = document.getElementById('edit-author').value;
                    const newGenre = document.getElementById('edit-genre').value;
                    const newStatus = document.getElementById('edit-status').value;
                    
                    // Get the index of the book being edited
                    const bookIndex = bookList.findIndex((book) => book.title === title);
                    
                    // Update the book object in the bookList array
                    bookList[bookIndex].title = newTitle;
                    bookList[bookIndex].author = newAuthor;
                    bookList[bookIndex].genre = newGenre;
                    bookList[bookIndex].status = newStatus;
                    
                    // Update the book tile HTML
                    titleElement.textContent = newTitle;
                    authorElement.textContent = newAuthor;
                    genreElement.textContent = newGenre;
                    statusElement.textContent = newStatus;
                    
                    // Close the popup
                    popup.remove();
                });
            
                document.getElementById('cancel-edit-btn').addEventListener('click', (e) => {
                e.preventDefault();
                // Remove the popup
                popup.remove();
                });
            }

            const editBtn = document.createElement('img')
            editBtn.src = "assets/edit.svg"
            editBtn.alt= "edit book"
            editBtn.classList.add('edit-btn')

            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('edit btn clicked');
                editBook(editBtn);           
            })

            actionBtns.appendChild(deleteBtn)
            actionBtns.appendChild(editBtn)
            
            bookDescription.appendChild(titleP)
            bookDescription.appendChild(authorP)
            bookDescription.appendChild(genreP)
            bookDescription.appendChild(statusP)

            
            bookTile.appendChild(imgBook)
            bookTile.appendChild(bookDescription)
            bookTile.appendChild(currentReadBtn)
            bookTile.appendChild(actionBtns)


            bookTilesContainer.appendChild(bookTile)
            updateBookCount()
        });   


    //delete button function
    // const deleteBtn = document.querySelector('.delete-btn');

    // deleteBtn.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   console.log('delete button clicked');
    // });

    //edit function


