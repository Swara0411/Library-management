let books = [];
let members = [];
let issuedBooks = [];

// Book Management
function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const genre = document.getElementById('bookGenre').value;
    const year = document.getElementById('bookYear').value;
    const isbn = document.getElementById('bookISBN').value;

    const book = { title, author, genre, year, isbn };
    books.push(book);
    displayBooks();
    clearBookForm();
}

function displayBooks() {
    const bookCatalog = document.querySelector('#bookCatalog tbody');
    bookCatalog.innerHTML = '';

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

function editBook(index) {
    const book = books[index];
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;
    document.getElementById('bookGenre').value = book.genre;
    document.getElementById('bookYear').value = book.year;
    document.getElementById('bookISBN').value = book.isbn;
    
    // Update and remove the old book
    books.splice(index, 1);
}

function deleteBook(index) {
    books.splice(index, 1);
    displayBooks();
}

function clearBookForm() {
    document.getElementById('bookForm').reset();
}

// Member Management
function addMember() {
    const name = document.getElementById('memberName').value;
    const email = document.getElementById('memberEmail').value;
    const phone = document.getElementById('memberPhone').value;
    const membershipID = document.getElementById('membershipID').value;

    const member = { name, email, phone, membershipID };
    members.push(member);
    displayMembers();
    clearMemberForm();
}

function displayMembers() {
    const memberList = document.querySelector('#memberList tbody');
    memberList.innerHTML = '';

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

function editMember(index) {
    const member = members[index];
    document.getElementById('memberName').value = member.name;
    document.getElementById('memberEmail').value = member.email;
    document.getElementById('memberPhone').value = member.phone;
    document.getElementById('membershipID').value = member.membershipID;
    
    // Update and remove the old member
    members.splice(index, 1);
}

function deleteMember(index) {
    members.splice(index, 1);
    displayMembers();
}

function clearMemberForm() {
    document.getElementById('memberForm').reset();
}

// Book Issue Management
function issueBook() {
    const memberIndex = document.getElementById('issueMember').selectedIndex - 1;
    const bookIndex = document.getElementById('issueBook').selectedIndex - 1;
    const dueDate = document.getElementById('dueDate').value;

    if (memberIndex < 0 || bookIndex < 0 || !dueDate) {
        alert('Please fill out all fields');
        return;
    }

    const issue = {
        member: members[memberIndex].name,
        book: books[bookIndex].title,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: dueDate
    };

    issuedBooks.push(issue);
    displayIssuedBooks();
}

function displayIssuedBooks() {
    const issuedList = document.querySelector('#issuedBooks tbody');
    issuedList.innerHTML = '';

    issuedBooks.forEach((issue, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${issue.member}</td>
            <td>${issue.book}</td>
            <td>${issue.issueDate}</td>
            <td>${issue.dueDate}</td>
            <td>
                <button onclick="returnBook(${index})">Return</button>
            </td>
        `;
        issuedList.appendChild(row);
    });
}

function returnBook(index) {
    issuedBooks.splice(index, 1);
    displayIssuedBooks();
}

// Search functionality
function searchBooks() {
    const query = document.getElementById('searchBook').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
    displayFilteredBooks(filteredBooks);
}

function displayFilteredBooks(filteredBooks) {
    const bookCatalog = document.querySelector('#bookCatalog tbody');
    bookCatalog.innerHTML = '';

    filteredBooks.forEach((book, index) => {
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

function searchMembers() {
    const query = document.getElementById('searchMember').value.toLowerCase();
    const filteredMembers = members.filter(member => 
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query)
    );
    displayFilteredMembers(filteredMembers);
}

function displayFilteredMembers(filteredMembers) {
    const memberList = document.querySelector('#memberList tbody');
    memberList.innerHTML = '';

    filteredMembers.forEach((member, index) => {
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

// Navigation
document.getElementById('manageBooks').addEventListener('click', () => {
    document.getElementById('bookSection').style.display = 'block';
    document.getElementById('memberSection').style.display = 'none';
    document.getElementById('issueSection').style.display = 'none';
});

document.getElementById('manageMembers').addEventListener('click', () => {
    document.getElementById('bookSection').style.display = 'none';
    document.getElementById('memberSection').style.display = 'block';
    document.getElementById('issueSection').style.display = 'none';
});

document.getElementById('issueBooks').addEventListener('click', () => {
    document.getElementById('bookSection').style.display = 'none';
    document.getElementById('memberSection').style.display = 'none';
    document.getElementById('issueSection').style.display = 'block';
    populateIssueForm();
});

function populateIssueForm() {
    const memberSelect = document.getElementById('issueMember');
    const bookSelect = document.getElementById('issueBook');
    memberSelect.innerHTML = '<option value="">Select a Member</option>';
    bookSelect.innerHTML = '<option value="">Select a Book</option>';

    members.forEach(member => {
        const option = document.createElement('option');
        option.textContent = member.name;
        memberSelect.appendChild(option);
    });

    books.forEach(book => {
        const option = document.createElement('option');
        option.textContent = book.title;
        bookSelect.appendChild(option);
    });
}
