// Fetch records from local storage
function fetchRecordsFromLocalStorage() {
    const agriculturalTasks = JSON.parse(localStorage.getItem('agriculturalTasks')) || [];
    const fertilizersPesticides = JSON.parse(localStorage.getItem('fertilizersPesticides')) || [];
    const irrigations = JSON.parse(localStorage.getItem('irrigations')) || [];
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];

    return [
        ...agriculturalTasks.map(record => ({ ...record, type: 'Agricultural Task' })),
        ...fertilizersPesticides.map(record => ({ ...record, type: 'Fertilizer/Pesticide' })),
        ...irrigations.map(record => ({ ...record, type: 'Irrigation' })),
        ...events.map(record => ({ ...record, type: 'Event' })),
        ...expenses.map(record => ({ ...record, type: 'Expense' })),
        ...incomes.map(record => ({ ...record, type: 'Income' })),
    ];
}

// Function to search records
function searchRecords() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Fetch records from local storage
    const records = fetchRecordsFromLocalStorage();

    // Filter records based on search input and date range
    const filteredRecords = records.filter(record => {
        const recordDate = new Date(record.date || record.dateStarted || record.irrigationDate || record.expenseDate || record.incomeDate);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        return (
            (searchInput === '' || record.type.toLowerCase().includes(searchInput) || (record.taskName && record.taskName.toLowerCase().includes(searchInput)) || (record.productName && record.productName.toLowerCase().includes(searchInput)) || (record.eventName && record.eventName.toLowerCase().includes(searchInput)) || (record.expenseType && record.expenseType.toLowerCase().includes(searchInput)) || (record.incomeSource && record.incomeSource.toLowerCase().includes(searchInput))) &&
            (startDate === '' || recordDate >= startDateObj) &&
            (endDate === '' || recordDate <= endDateObj)
        );
    });

    // Display search results
    displaySearchResults(filteredRecords);
}

// Function to format details for display
function formatDetails(record) {
    let details = '';
    switch (record.type) {
        case 'Agricultural Task':
            details = `
                <strong>Task Name:</strong> ${record.taskName}<br>
                <strong>Date Started:</strong> ${record.dateStarted}<br>
                <strong>Workers Number:</strong> ${record.workersNumber}<br>
                <strong>Cost:</strong> ${record.taskCost}
            `;
            break;
        case 'Fertilizer/Pesticide':
            details = `
                <strong>Type:</strong> ${record.type}<br>
                <strong>Product Name:</strong> ${record.productName}<br>
                <strong>Items:</strong> ${record.items}<br>
                <strong>Date:</strong> ${record.date}<br>
                <strong>Cost per Item:</strong> ${record.costPerItem}<br>
                <strong>Total Cost:</strong> ${record.totalCost}
            `;
            break;
        case 'Irrigation':
            details = `
                <strong>Date:</strong> ${record.irrigationDate}<br>
                <strong>Hours:</strong> ${record.hours}<br>
                <strong>Cost:</strong> ${record.irrigationCost}
            `;
            break;
        case 'Event':
            details = `
                <strong>Event Name:</strong> ${record.eventName}<br>
                <strong>Date:</strong> ${record.eventDate}<br>
                <strong>Damage:</strong> ${record.damage}<br>
                <strong>Percentage of Damage:</strong> ${record.percentageOfDamage}<br>
                <strong>Comments:</strong> ${record.comments}
            `;
            break;
        case 'Expense':
            details = `
                <strong>Expense Type:</strong> ${record.expenseType}<br>
                <strong>Description:</strong> ${record.expenseDescription}<br>
                <strong>Date:</strong> ${record.expenseDate}<br>
                <strong>Amount:</strong> ${record.expenseAmount}
            `;
            break;
        case 'Income':
            details = `
                <strong>Source of Income:</strong> ${record.incomeSource}<br>
                <strong>Date:</strong> ${record.incomeDate}<br>
                <strong>Amount:</strong> ${record.incomeAmount}<br>
                <strong>Comments:</strong> ${record.comments}
            `;
            break;
        default:
            details = 'No details available';
    }
    return details;
}

// Function to display search results
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
                        <td>${record.taskName || record.productName || record.eventName || record.expenseType || record.incomeSource || '-'}</td>
                        <td>${record.date || record.dateStarted || record.irrigationDate || record.expenseDate || record.incomeDate || '-'}</td>
                        <td>${formatDetails(record)}</td>
                        <td>
                            <button onclick="confirmDeleteRecord('${record.type}', ${results.indexOf(record)})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        searchResults.appendChild(table);
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

// Functions to delete individual records from local storage
function deleteAgriculturalTask(index) {
    const agriculturalTasks = JSON.parse(localStorage.getItem('agriculturalTasks')) || [];
    agriculturalTasks.splice(index, 1);
    localStorage.setItem('agriculturalTasks', JSON.stringify(agriculturalTasks));
}

function deleteFertilizerPesticide(index) {
    const fertilizersPesticides = JSON.parse(localStorage.getItem('fertilizersPesticides')) || [];
    fertilizersPesticides.splice(index, 1);
    localStorage.setItem('fertilizersPesticides', JSON.stringify(fertilizersPesticides));
}

function deleteIrrigation(index) {
    const irrigations = JSON.parse(localStorage.getItem('irrigations')) || [];
    irrigations.splice(index, 1);
    localStorage.setItem('irrigations', JSON.stringify(irrigations));
}

function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
}

function deleteExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function deleteIncome(index) {
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes.splice(index, 1);
    localStorage.setItem('incomes', JSON.stringify(incomes));
}

// Event listener for DOM content loaded to ensure script runs after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Display all records initially
    searchRecords();
});