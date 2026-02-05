const myLibrary = [];
const libraryContainer = document.querySelector('.book-container');
const addBookButton = document.querySelector('.add-book-button');

function Book(title, author, pages, read) {
    if (!new.target) {
        throw new Error('Book constructor must be called with the new keyword');
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function libraryDisplay() {
    myLibrary.forEach(book => {
        const bookCard = document.createElement('tr');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.read ? 'Yes' : 'No'}</td>
            <td>${book.id}</td>
            <td><button class="remove-book-button" data-id="${book.id}">Remove</button></td>
        `;
        for (const button of bookCard.querySelectorAll('.remove-book-button')) {
            button.addEventListener('click', function () {
                const bookId = this.getAttribute('data-id');
                const bookIndex = myLibrary.findIndex(b => b.id === bookId);
                if (bookIndex !== -1) {
                    myLibrary.splice(bookIndex, 1);
                    libraryContainer.innerHTML = ''; // Clear existing display
                    libraryDisplay(); // Refresh display
                }
            });
        }
        libraryContainer.appendChild(bookCard);
    });
}

function displayBookForm() {
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    formContainer.innerHTML = `
        <form class="book-form">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required>
            <label for="author">Author:</label>
            <input type="text" id="author" name="author" required>
            <label for="pages">Pages:</label>
            <input type="number" id="pages" name="pages" required>
            <label for="read">Read:</label>
            <input type="checkbox" id="read" name="read">
            <button type="submit">Add Book</button>
        </form>
    `;
    document.body.appendChild(formContainer);

    const bookForm = document.querySelector('.book-form');
    bookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = bookForm.title.value;
        const author = bookForm.author.value;
        const pages = parseInt(bookForm.pages.value, 10);
        const read = bookForm.read.checked;

        addBookToLibrary(title, author, pages, read);
        libraryContainer.innerHTML = ''; // Clear existing display
        libraryDisplay(); // Refresh display
        document.body.removeChild(formContainer); // Remove form
    });
}

addBookButton.addEventListener('click', displayBookForm);

// Sample books
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);

libraryDisplay();