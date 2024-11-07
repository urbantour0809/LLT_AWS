const flaskUrl = 'https://port-0-llt-backend-m2eej1jqd8b44d66.sel4.cloudtype.app';

// Register User
async function registerUser(event) {
    event.preventDefault();
    console.log("Registering user...");

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    
    if (password !== confirmPassword) {
        console.log("Passwords do not match.");
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
    console.log("User data:", userData);

    const response = await fetch(`${flaskUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include' // Add this line
    });
    console.log("Registration response:", response);

    if (response.ok) {
        const result = await response.json();
        alert(result.message || 'Registration successful.');
        console.log("Registration successful, redirecting to login page...");
        window.location.href = "login.html";
    } else {
        const result = await response.json();
        alert(result.error || 'Registration failed.');
    }
}

// Similarly add `credentials: 'include'` in other fetch requests in auth.js and script.js
