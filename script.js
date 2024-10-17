// Arrays to store books, members, and issued books
let books = [];
let members = [];
let issuedBooks = [];

// Load books from localStorage when the page loads
function loadBooks() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
        displayBooks();
    }
}

// Load members from localStorage when the page loads
function loadMembers() {
    const storedMembers = localStorage.getItem('members');
    if (storedMembers) {
        members = JSON.parse(storedMembers);
        displayMembers();
    }
}

// Load issued books from localStorage when the page loads
function loadIssuedBooks() {
    const storedIssuedBooks = localStorage.getItem('issuedBooks');
    if (storedIssuedBooks) {
        issuedBooks = JSON.parse(storedIssuedBooks);
        displayIssuedBooks();
    }
}

// Add a new book and save to localStorage
function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const genre = document.getElementById('bookGenre').value;
    const year = document.getElementById('bookYear').value;
    const isbn = document.getElementById('bookISBN').value;

    const book = { title, author, genre, year, isbn };
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books)); // Save to localStorage
    displayBooks();
    clearBookForm();
}

// Display books in the table
function displayBooks() {
    const bookCatalog = document.querySelector('#bookCatalog tbody');
    bookCatalog.innerHTML = ''; // Clear previous content

    books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.year}</td>
            <td>${book.isbn}</td>
            <td>
                <button onclick="editBook(${index})">Edit</button>
                <button onclick="deleteBook(${index})">Delete</button>
            </td>
        `;
        bookCatalog.appendChild(row);
    });
}

// Clear book input form
function clearBookForm() {
    document.getElementById('bookForm').reset();
}

// Add a new member and save to localStorage
function addMember() {
    const name = document.getElementById('memberName').value;
    const email = document.getElementById('memberEmail').value;
    const phone = document.getElementById('memberPhone').value;
    const membershipID = document.getElementById('membershipID').value;

    const member = { name, email, phone, membershipID };
    members.push(member);
    localStorage.setItem('members', JSON.stringify(members)); // Save to localStorage
    displayMembers();
    clearMemberForm();
}

// Display members in the table
function displayMembers() {
    const memberList = document.querySelector('#memberList tbody');
    memberList.innerHTML = ''; // Clear previous content

    members.forEach((member, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.phone}</td>
            <td>${member.membershipID}</td>
            <td>
                <button onclick="editMember(${index})">Edit</button>
                <button onclick="deleteMember(${index})">Delete</button>
            </td>
        `;
        memberList.appendChild(row);
    });
}

// Clear member input form
function clearMemberForm() {
    document.getElementById('memberForm').reset();
}

// Issue a book and save to localStorage
function issueBook() {
    const memberID = document.getElementById('issueMemberID').value;
    const isbn = document.getElementById('issueBookISBN').value;
    const issueDate = document.getElementById('issueDate').value;

    const issuedBook = { memberID, isbn, issueDate };
    issuedBooks.push(issuedBook);
    localStorage.setItem('issuedBooks', JSON.stringify(issuedBooks)); // Save to localStorage
    displayIssuedBooks();
    clearIssueForm();
}

// Display issued books in the table
function displayIssuedBooks() {
    const issuedBookList = document.querySelector('#issuedBooksList tbody');
    issuedBookList.innerHTML = ''; // Clear previous content

    issuedBooks.forEach((issuedBook, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${issuedBook.memberID}</td>
            <td>${issuedBook.isbn}</td>
            <td>${issuedBook.issueDate}</td>
            <td>
                <button onclick="returnBook(${index})">Return</button>
            </td>
        `;
        issuedBookList.appendChild(row);
    });
}

// Clear issue book form
function clearIssueForm() {
    document.getElementById('issueForm').reset();
}

// Return a book and remove from localStorage
function returnBook(index) {
    issuedBooks.splice(index, 1); // Remove book from issued list
    localStorage.setItem('issuedBooks', JSON.stringify(issuedBooks)); // Update localStorage
    displayIssuedBooks();
}

// Book Search Functionality
function searchBooks() {
    const searchTerm = document.getElementById('searchBookInput').value.toLowerCase();
    const bookCatalog = document.querySelector('#bookCatalog tbody');
    bookCatalog.innerHTML = ''; // Clear previous content

    books.forEach((book, index) => {
        if (book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm) || 
            book.genre.toLowerCase().includes(searchTerm)) {

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.year}</td>
                <td>${book.isbn}</td>
                <td>
                    <button onclick="editBook(${index})">Edit</button>
                    <button onclick="deleteBook(${index})">Delete</button>
                </td>
            `;
            bookCatalog.appendChild(row);
        }
    });
}

// Load books, members, and issued books on page load
window.onload = function() {
    loadBooks();
    loadMembers();
    loadIssuedBooks();
};
