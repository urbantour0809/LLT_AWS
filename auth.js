const flaskUrl = 'https://port-0-llt-backend-m2eej1jqd8b44d66.sel4.cloudtype.app'; // Flask server URL

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
    });
    console.log("Registration response:", response);

    const result = await response.json();
    console.log("Registration result:", result);

    alert(result.message || result.error);
    if (response.ok) {
        console.log("Registration successful, redirecting to login page...");
        window.location.href = "login.html";
    }
}

// Login User
async function loginUser(event) {
    event.preventDefault();
    console.log("Logging in user...");

    const credentials = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };
    console.log("Login credentials:", credentials);

    const response = await fetch(`${flaskUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    console.log("Login response:", response);

    const result = await response.json();
    console.log("Login result:", result);

    alert(result.message || result.error);
    if (response.ok) {
        console.log("Login successful, redirecting to main page...");
        window.location.href = "index.html";
    }
}
