function generateUserId() {
    return 'user_' + Date.now();
}

function toggleForm(formId) {
    const form = document.getElementById(formId);
    const otherFormId = formId === 'loginForm' ? 'registerForm' : 'loginForm';
    const otherForm = document.getElementById(otherFormId);

    if (form && otherForm) {
        if (form.style.display === 'none' || form.style.display === '') {
            form.style.display = 'flex';
            setTimeout(() => form.classList.add('active'), 10);
            otherForm.style.display = 'none';
            otherForm.classList.remove('active');
        } else {
            form.style.display = 'none';
            form.classList.remove('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const body = document.body;

    // Only check authentication on pages that require it
    if (body.classList.contains('auth-required')) {
        checkAuthentication();
    }

    displayNavButtons();

    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', function () {
            toggleForm('loginForm');
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', function () {
            toggleForm('registerForm');
        });
    }

    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', function () {
            const form = this.parentElement;
            form.style.display = 'none';
            form.classList.remove('active');
        });
    });

    const loginForm = document.querySelector('#loginForm form');
    const registerForm = document.querySelector('#registerForm form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Initialize forms for operations.html, events.html, expenses.html, and income.html
    const agriculturalTasksForm = document.getElementById('agriculturalTasksForm');
    const fertilizerPesticidesForm = document.getElementById('fertilizerPesticidesForm');
    const irrigationForm = document.getElementById('irrigationForm');
    const eventsForm = document.getElementById('eventsForm');
    const otherExpensesForm = document.getElementById('otherExpensesForm');
    const incomeForm = document.getElementById('incomeForm');

    if (agriculturalTasksForm) {
        agriculturalTasksForm.addEventListener('submit', saveAgriculturalTask);
        displayAgriculturalTasks();
    }

    if (fertilizerPesticidesForm) {
        fertilizerPesticidesForm.addEventListener('submit', saveFertilizerPesticide);
        displayFertilizersPesticides();
    }

    if (irrigationForm) {
        irrigationForm.addEventListener('submit', saveIrrigation);
        displayIrrigations();
    }

    if (eventsForm) {
        eventsForm.addEventListener('submit', saveEvent);
        displayEvents();
    }

    if (otherExpensesForm) {
        otherExpensesForm.addEventListener('submit', saveExpense);
        displayExpenses();
    }

    if (incomeForm) {
        incomeForm.addEventListener('submit', saveIncome);
        displayIncome();
    }

    // Display initial search results if on search history page
    if (document.getElementById('searchInput')) {
        searchRecords();
    }
});

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.email === email);

    if (userExists) {
        alert('User already exists');
    } else {
        const userId = generateUserId();
        users.push({ id: userId, name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        toggleForm('loginForm');
    }
}

function displayNavButtons() {
    const navButtons = document.getElementById('navButtons');

    if (!navButtons) {
        console.error('navButtons element not found');
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        navButtons.innerHTML = `
            <span>Welcome, ${currentUser.name}</span>
            <button onclick="handleSignOut()" class="nav-button">Sign Out</button>
        `;
    } else {
        navButtons.innerHTML = `
            <a href="#" id="loginBtn"><button class="nav-button">Login</button></a>
            <a href="#" id="registerBtn"><button class="nav-button">Register</button></a>
        `;

        // Add event listeners for the dynamically added buttons
        document.getElementById('loginBtn').addEventListener('click', function () {
            window.location.href = 'login.html';
        });
        document.getElementById('registerBtn').addEventListener('click', function () {
            window.location.href = 'login.html';
        });
    }
    console.log('Nav buttons updated');
}

function handleSignOut() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function checkAuthentication() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
    }
}

// Save operations data
function saveAgriculturalTask(event) {
    event.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const dateStarted = document.getElementById('dateStarted').value;
    const workersNumber = document.getElementById('workersNumber').value;
    const taskCost = document.getElementById('taskCost').value;

    const agriculturalTasks = JSON.parse(localStorage.getItem('agriculturalTasks')) || [];
    agriculturalTasks.push({ taskName, dateStarted, workersNumber, taskCost });
    localStorage.setItem('agriculturalTasks', JSON.stringify(agriculturalTasks));

    document.getElementById('agriculturalTasksForm').reset();
    displayAgriculturalTasks();
}

function saveFertilizerPesticide(event) {
    event.preventDefault();
    const type = document.getElementById('type').value;
    const productName = document.getElementById('productName').value;
    const items = document.getElementById('items').value;
    const date = document.getElementById('date').value;
    const costPerItem = document.getElementById('costPerItem').value;
    const totalCost = document.getElementById('totalCost').value;

    const fertilizersPesticides = JSON.parse(localStorage.getItem('fertilizersPesticides')) || [];
    fertilizersPesticides.push({ type, productName, items, date, costPerItem, totalCost });
    localStorage.setItem('fertilizersPesticides', JSON.stringify(fertilizersPesticides));

    document.getElementById('fertilizerPesticidesForm').reset();
    displayFertilizersPesticides();
}

function saveIrrigation(event) {
    event.preventDefault();
    const irrigationDate = document.getElementById('irrigationDate').value;
    const hours = document.getElementById('hours').value;
    const irrigationCost = document.getElementById('irrigationCost').value;

    const irrigations = JSON.parse(localStorage.getItem('irrigations')) || [];
    irrigations.push({ irrigationDate, hours, irrigationCost });
    localStorage.setItem('irrigations', JSON.stringify(irrigations));

    document.getElementById('irrigationForm').reset();
    displayIrrigations();
}

function saveEvent(event) {
    event.preventDefault();
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const damage = document.getElementById('damage').value;
    const percentageOfDamage = document.getElementById('percentageOfDamage').value;
    const comments = document.getElementById('comments').value;

    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push({ eventName, eventDate, damage, percentageOfDamage, comments });
    localStorage.setItem('events', JSON.stringify(events));

    document.getElementById('eventsForm').reset();
    displayEvents();
}

function saveExpense(event) {
    event.preventDefault();
    const expenseType = document.getElementById('expenseType').value;
    const expenseDescription = document.getElementById('expenseDescription').value;
    const expenseDate = document.getElementById('expenseDate').value;
    const expenseAmount = document.getElementById('expenseAmount').value;

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({ expenseType, expenseDescription, expenseDate, expenseAmount });
    localStorage.setItem('expenses', JSON.stringify(expenses));

    document.getElementById('otherExpensesForm').reset();
    displayExpenses();
}

function saveIncome(event) {
    event.preventDefault();
    const incomeSource = document.getElementById('incomeSource').value;
    const incomeDate = document.getElementById('incomeDate').value;
    const incomeAmount = document.getElementById('incomeAmount').value;
    const comments = document.getElementById('comments').value;

    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes.push({ incomeSource, incomeDate, incomeAmount, comments });
    localStorage.setItem('incomes', JSON.stringify(incomes));

    document.getElementById('incomeForm').reset();
    displayIncome();
}

// Display operations data
function displayAgriculturalTasks() {
    const agriculturalTasks = JSON.parse(localStorage.getItem('agriculturalTasks')) || [];
    const table = document.getElementById('agriculturalTasksTable');
    table.innerHTML = `<tr>
                        <th>Task Name</th>
                        <th>Date Started</th>
                        <th>Workers Number</th>
                        <th>Cost</th>
                        <th>Actions</th>
                    </tr>`;
    agriculturalTasks.forEach((task, index) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = task.taskName;
        row.insertCell(1).textContent = task.dateStarted;
        row.insertCell(2).textContent = task.workersNumber;
        row.insertCell(3).textContent = task.taskCost;
        const actionsCell = row.insertCell(4);
        actionsCell.innerHTML = `<button onclick="editAgriculturalTask(${index})">Edit</button>
                                 <button onclick="confirmDeleteAgriculturalTask(${index})">Delete</button>`;
    });
}

function displayFertilizersPesticides() {
    const fertilizersPesticides = JSON.parse(localStorage.getItem('fertilizersPesticides')) || [];
    const table = document.getElementById('fertilizerPesticidesTable');
    table.innerHTML = `<tr>
                        <th>Type</th>
                        <th>Product Name</th>
                        <th>Items</th>
                        <th>Date</th>
                        <th>Cost per Item</th>
                        <th>Total Cost</th>
                        <th>Actions</th>
                    </tr>`;
    fertilizersPesticides.forEach((product, index) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = product.type;
        row.insertCell(1).textContent = product.productName;
        row.insertCell(2).textContent = product.items;
        row.insertCell(3).textContent = product.date;
        row.insertCell(4).textContent = product.costPerItem;
        row.insertCell(5).textContent = product.totalCost;
        const actionsCell = row.insertCell(6);
        actionsCell.innerHTML = `<button onclick="editFertilizerPesticide(${index})">Edit</button>
                                 <button onclick="confirmDeleteFertilizerPesticide(${index})">Delete</button>`;
    });
}

function displayIrrigations() {
    const irrigations = JSON.parse(localStorage.getItem('irrigations')) || [];
    const table = document.getElementById('irrigationTable');
    table.innerHTML = `<tr>
                        <th>Date</th>
                        <th>Hours</th>
                        <th>Cost</th>
                        <th>Actions</th>
                    </tr>`;
    irrigations.forEach((irrigation, index) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = irrigation.irrigationDate;
        row.insertCell(1).textContent = irrigation.hours;
        row.insertCell(2).textContent = irrigation.irrigationCost;
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button onclick="editIrrigation(${index})">Edit</button>
                                 <button onclick="confirmDeleteIrrigation(${index})">Delete</button>`;
    });
}

// Display events data
function displayEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const table = document.getElementById('eventsTable');
    table.innerHTML = `<tr>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Damage</th>
                        <th>Percentage of Damage</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>`;
    events.forEach((event, index) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = event.eventName;
        row.insertCell(1).textContent = event.eventDate;
        row.insertCell(2).textContent = event.damage;
        row.insertCell(3).textContent = event.percentageOfDamage;
        row.insertCell(4).textContent = event.comments;
        const actionsCell = row.insertCell(5);
        actionsCell.innerHTML = `<button onclick="editEvent(${index})">Edit</button>
                                 <button onclick="confirmDeleteEvent(${index})">Delete</button>`;
    });
}

// Display expenses data
function displayExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const table = document.getElementById('expensesTable');
    table.innerHTML = `<tr>
                        <th>Expense Type</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>`;
    expenses.forEach((expense, index) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = expense.expenseType;
        row.insertCell(1).textContent = expense.expenseDescription;
        row.insertCell(2).textContent = expense.expenseDate;
        row.insertCell(3).textContent = expense.expenseAmount;
        const actionsCell = row.insertCell(4);
        actionsCell.innerHTML = `<button onclick="editExpense(${index})">Edit</button>
                                 <button onclick="confirmDeleteExpense(${index})">Delete</button>`;
    });
}

// Display income data
function displayIncome() {
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    const table = document.getElementById('incomeTable');
    table.innerHTML = `<tr>
                        <th>Source of Income</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>`;
    incomes.forEach((income, index) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = income.incomeSource;
        row.insertCell(1).textContent = income.incomeDate;
        row.insertCell(2).textContent = income.incomeAmount;
        row.insertCell(3).textContent = income.comments;
        const actionsCell = row.insertCell(4);
        actionsCell.innerHTML = `<button onclick="editIncome(${index})">Edit</button>
                                 <button onclick="confirmDeleteIncome(${index})">Delete</button>`;
    });
}

// Edit and delete operations data
function editAgriculturalTask(index) {
    const agriculturalTasks = JSON.parse(localStorage.getItem('agriculturalTasks')) || [];
    const task = agriculturalTasks[index];

    document.getElementById('taskName').value = task.taskName;
    document.getElementById('dateStarted').value = task.dateStarted;
    document.getElementById('workersNumber').value = task.workersNumber;
    document.getElementById('taskCost').value = task.taskCost;

    agriculturalTasks.splice(index, 1);
    localStorage.setItem('agriculturalTasks', JSON.stringify(agriculturalTasks));
    displayAgriculturalTasks();
}

function confirmDeleteAgriculturalTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        deleteAgriculturalTask(index);
    }
}

function deleteAgriculturalTask(index) {
    const agriculturalTasks = JSON.parse(localStorage.getItem('agriculturalTasks')) || [];
    agriculturalTasks.splice(index, 1);
    localStorage.setItem('agriculturalTasks', JSON.stringify(agriculturalTasks));
    displayAgriculturalTasks();
}

function editFertilizerPesticide(index) {
    const fertilizersPesticides = JSON.parse(localStorage.getItem('fertilizersPesticides')) || [];
    const product = fertilizersPesticides[index];

    document.getElementById('type').value = product.type;
    document.getElementById('productName').value = product.productName;
    document.getElementById('items').value = product.items;
    document.getElementById('date').value = product.date;
    document.getElementById('costPerItem').value = product.costPerItem;
    document.getElementById('totalCost').value = product.totalCost;

    fertilizersPesticides.splice(index, 1);
    localStorage.setItem('fertilizersPesticides', JSON.stringify(fertilizersPesticides));
    displayFertilizersPesticides();
}

function confirmDeleteFertilizerPesticide(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        deleteFertilizerPesticide(index);
    }
}

function deleteFertilizerPesticide(index) {
    const fertilizersPesticides = JSON.parse(localStorage.getItem('fertilizersPesticides')) || [];
    fertilizersPesticides.splice(index, 1);
    localStorage.setItem('fertilizersPesticides', JSON.stringify(fertilizersPesticides));
    displayFertilizersPesticides();
}

function editIrrigation(index) {
    const irrigations = JSON.parse(localStorage.getItem('irrigations')) || [];
    const irrigation = irrigations[index];

    document.getElementById('irrigationDate').value = irrigation.irrigationDate;
    document.getElementById('hours').value = irrigation.hours;
    document.getElementById('irrigationCost').value = irrigation.irrigationCost;

    irrigations.splice(index, 1);
    localStorage.setItem('irrigations', JSON.stringify(irrigations));
    displayIrrigations();
}

function confirmDeleteIrrigation(index) {
    if (confirm('Are you sure you want to delete this irrigation?')) {
        deleteIrrigation(index);
    }
}

function deleteIrrigation(index) {
    const irrigations = JSON.parse(localStorage.getItem('irrigations')) || [];
    irrigations.splice(index, 1);
    localStorage.setItem('irrigations', JSON.stringify(irrigations));
    displayIrrigations();
}

function editEvent(index) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events[index];

    document.getElementById('eventName').value = event.eventName;
    document.getElementById('eventDate').value = event.eventDate;
    document.getElementById('damage').value = event.damage;
    document.getElementById('percentageOfDamage').value = event.percentageOfDamage;
    document.getElementById('comments').value = event.comments;

    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    displayEvents();
}

function confirmDeleteEvent(index) {
    if (confirm('Are you sure you want to delete this event?')) {
        deleteEvent(index);
    }
}

function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    displayEvents();
}

function editExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expense = expenses[index];

    document.getElementById('expenseType').value = expense.expenseType;
    document.getElementById('expenseDescription').value = expense.expenseDescription;
    document.getElementById('expenseDate').value = expense.expenseDate;
    document.getElementById('expenseAmount').value = expense.expenseAmount;

    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

function confirmDeleteExpense(index) {
    if (confirm('Are you sure you want to delete this expense?')) {
        deleteExpense(index);
    }
}

function deleteExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

function editIncome(index) {
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    const income = incomes[index];

    document.getElementById('incomeSource').value = income.incomeSource;
    document.getElementById('incomeDate').value = income.incomeDate;
    document.getElementById('incomeAmount').value = income.incomeAmount;
    document.getElementById('comments').value = income.comments;

    incomes.splice(index, 1);
    localStorage.setItem('incomes', JSON.stringify(incomes));
    displayIncome();
}

function confirmDeleteIncome(index) {
    if (confirm('Are you sure you want to delete this income?')) {
        deleteIncome(index);
    }
}

function deleteIncome(index) {
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes.splice(index, 1);
    localStorage.setItem('incomes', JSON.stringify(incomes));
    displayIncome();
}

// Search history functionalities
function searchRecords() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const records = fetchRecords(); // Fetch records from local storage

    const filteredRecords = records.filter(record => {
        const recordDate = new Date(record.date);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        return (
            (searchInput === '' || record.type.toLowerCase().includes(searchInput)) &&
            (startDate === '' || recordDate >= startDateObj) &&
            (endDate === '' || recordDate <= endDateObj)
        );
    });

    displaySearchResults(filteredRecords);
}

function fetchRecords() {
    const agriculturalTasks = JSON.parse(localStorage.getItem('agriculturalTasks')) || [];
    const fertilizersPesticides = JSON.parse(localStorage.getItem('fertilizersPesticides')) || [];
    const irrigations = JSON.parse(localStorage.getItem('irrigations')) || [];
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];

    const records = [
        ...agriculturalTasks.map(task => ({ ...task, type: 'Agricultural Task' })),
        ...fertilizersPesticides.map(product => ({ ...product, type: 'Fertilizer/Pesticide' })),
        ...irrigations.map(irrigation => ({ ...irrigation, type: 'Irrigation' })),
        ...events.map(event => ({ ...event, type: 'Event' })),
        ...expenses.map(expense => ({ ...expense, type: 'Expense' })),
        ...incomes.map(income => ({ ...income, type: 'Income' }))
    ];

    return records;
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<p>No records found.</p>';
    } else {
        const table = document.createElement('table');
        table.classList.add('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Details</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${results.map(record => `
                    <tr>
                        <td>${record.type}</td>
                        <td>${record.name || record.eventName || record.expenseType || record.incomeSource || '-'}</td>
                        <td>${record.date || record.eventDate || record.expenseDate || record.incomeDate}</td>
                        <td>${JSON.stringify(record)}</td>
                        <td>
                            <button onclick="editRecord('${record.type}', ${results.indexOf(record)})">Edit</button>
                            <button onclick="confirmDeleteRecord('${record.type}', ${results.indexOf(record)})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        searchResults.appendChild(table);
    }
}

function editRecord(type, index) {
    // Redirect to appropriate form for editing
    switch (type) {
        case 'Agricultural Task':
            editAgriculturalTask(index);
            window.location.href = 'operations.html';
            break;
        case 'Fertilizer/Pesticide':
            editFertilizerPesticide(index);
            window.location.href = 'operations.html';
            break;
        case 'Irrigation':
            editIrrigation(index);
            window.location.href = 'operations.html';
            break;
        case 'Event':
            editEvent(index);
            window.location.href = 'events.html';
            break;
        case 'Expense':
            editExpense(index);
            window.location.href = 'expenses.html';
            break;
        case 'Income':
            editIncome(index);
            window.location.href = 'income.html';
            break;
    }
}

function confirmDeleteRecord(type, index) {
    if (confirm('Are you sure you want to delete this record?')) {
        deleteRecord(type, index);
    }
}

function deleteRecord(type, index) {
    switch (type) {
        case 'Agricultural Task':
            deleteAgriculturalTask(index);
            break;
        case 'Fertilizer/Pesticide':
            deleteFertilizerPesticide(index);
            break;
        case 'Irrigation':
            deleteIrrigation(index);
            break;
        case 'Event':
            deleteEvent(index);
            break;
        case 'Expense':
            deleteExpense(index);
            break;
        case 'Income':
            deleteIncome(index);
            break;
    }
    searchRecords();
}