const myLibrary = [];
const libraryContainer = document.querySelector('.book-container');

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
        `;
        libraryContainer.appendChild(bookCard);
    });
}

// Sample books
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);

libraryDisplay();