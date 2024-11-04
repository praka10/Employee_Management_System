const API_URL = 'http://localhost:5000/employees';

async function fetchEmployees() {
    const response = await fetch(API_URL);
    const employees = await response.json();
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = '';

    employees.forEach(employee => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.innerHTML = `
            <span>${employee.empId} - ${employee.name} - ${employee.department} - ${employee.status}</span>
            <button class="btn btn-danger btn-sm" onclick="deleteEmployee('${employee._id}')">Delete</button>
        `;
        employeeList.appendChild(listItem);
    });
}

async function addEmployee() {
    const empId = document.getElementById('empId').value;
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const status = document.getElementById('status').value;

    // Validation
    if (!empId || !name || !department || !status) {
        showMessage('All fields are required!', 'danger');
        return;
    }

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ empId, name, department, status })
        });
        showMessage('Employee added successfully!', 'success');
        fetchEmployees();
    } catch (error) {
        showMessage('Error adding employee!', 'danger');
    }
}

async function deleteEmployee(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    showMessage('Employee deleted successfully!', 'success');
    fetchEmployees();
}

function showMessage(message, type) {
    const messageBox = document.getElementById('message');
    messageBox.className = `alert alert-${type}`;
    messageBox.innerText = message;
    messageBox.style.display = 'block';
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}

// Initial fetch of employees
fetchEmployees();
