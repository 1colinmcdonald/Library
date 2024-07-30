const books = [];
const bookElements = [];
const bookshelf = document.querySelector(".bookshelf");


addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("Moby Dick", "Herman Melville", 635, false);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, true)
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("Moby Dick", "Herman Melville", 635, false);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, true)



function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        if (this.read) {
            readString = 'read';
        } else {
            readString = "not read yet";
        }
        return `${this.title} by ${this.author}, ${this.pages}, ${readString}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    books.push(book);
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.setAttribute("index", books.length - 1);
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    const deleteImage = document.createElement("img");
    deleteImage.src = "img/close-circle.svg";
    deleteButton.appendChild(deleteImage);
    bookDiv.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
        books.splice(deleteButton.parentElement.getAttribute("index"), 1);
        deleteButton.parentNode.parentNode.removeChild(deleteButton.parentNode);
    })
    const doneReadingButton = document.createElement("button");
    doneReadingButton.classList.add("done-reading");
    if (read) {
        doneReadingButton.textContent = "Done reading";
        const doneReadingSymbol = document.createElement("img");
        doneReadingSymbol.src = "img/check.svg";
        doneReadingSymbol.classList.add("done-reading-symbol");
        bookDiv.appendChild(doneReadingSymbol);
    }
    else
        doneReadingButton.textContent = "Not done reading";
    bookDiv.appendChild(doneReadingButton);
    doneReadingButton.addEventListener("click", () => {
        console.log("Click!");
        const book = books[doneReadingButton.parentNode.getAttribute("index")];
        if (book.read === false) {
            console.log("hi!");
            doneReadingButton.textContent = "Done reading";
            const doneReadingSymbol = document.createElement("img");
            doneReadingSymbol.src = "img/check.svg";
            doneReadingSymbol.classList.add("done-reading-symbol");
            books[doneReadingButton.parentNode.getAttribute("index")].read = true;
            doneReadingButton.parentNode.appendChild(doneReadingSymbol);
        } else {
            doneReadingButton.textContent = "Not done reading"
            const parent = doneReadingButton.parentNode;
            parent.removeChild(parent.querySelector(".done-reading-symbol"))
            books[parent.getAttribute("index")].read = false;
        }

    })
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = title;
    bookDiv.appendChild(titleDiv);
    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author");
    authorDiv.textContent = author;
    bookDiv.appendChild(authorDiv);
    bookshelf.appendChild(bookDiv);
}

const addBookButton = document.querySelector('button.add-book');
const addBookDialog = document.querySelector('dialog.add-book');
addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
})

const submitBookEntry = document.querySelector('button#submit-book-entry');
const form = document.querySelector("form");

addBookDialog.addEventListener("close", () => {
    let form = document.querySelector("form");
    if (addBookDialog.returnValue === "submit") {
        formElements = Array.from(form.elements)
        addBookToLibrary(formElements[0].value, formElements[1].value, Number(formElements[2].value), formElements[3].value)
        addBookDialog.close(true);
        window.scrollTo(0, document.body.scrollHeight);
    } else if (addBookDialog.returnValue === "cancel") {
        addBookDialog.close(false);
    }
    form.reset();
})