const flaskUrl = 'https://port-0-llt-backend-m2eej1jqd8b44d66.sel4.cloudtype.app'; // Flask server URL

// Register User
async function registerUser(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const userData = {
        username: document.getElementById('username').value,
        password: password,
        confirm_password: confirmPassword,
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
    };

    const response = await fetch(`${flaskUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });

    const result = await response.json();
    alert(result.message || result.error);
    if (response.ok) {
        window.location.href = "login.html";
    }
}

// Login User
async function loginUser(event) {
    event.preventDefault();
    const credentials = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    const response = await fetch(`${flaskUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    const result = await response.json();
    alert(result.message || result.error);
    if (response.ok) {
        window.location.href = "index.html";
    }
}
