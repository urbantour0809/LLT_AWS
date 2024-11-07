const flaskUrl = 'https://port-0-llt-backend-m2eej1jqd8b44d66.sel4.cloudtype.app'; // Flask 서버 URL

// 회원가입
async function registerUser(event) {
    event.preventDefault();
    console.log("Registering user...");

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    
    if (password !== confirmPassword) {
        console.log("Passwords do not match.");
        alert('비밀번호가 일치하지 않습니다.');
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

    try {
        const response = await fetch(`${flaskUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',  // CORS credentials 포함
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error("회원가입에 실패하였습니다.");
        }

        const result = await response.json();
        console.log("Registration result:", result);
        alert("회원가입에 성공하였습니다.");
        window.location.href = "login.html";
    } catch (error) {
        console.error("Registration error:", error);
        alert(error.message);
    }
}

// 로그인
async function loginUser(event) {
    event.preventDefault();
    console.log("Logging in user...");

    const credentials = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };
    console.log("Login credentials:", credentials);

    try {
        const response = await fetch(`${flaskUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error("아이디/비밀번호를 확인해주세요.");
        }

        const result = await response.json();
        console.log("Login result:", result);
        alert("로그인에 성공하였습니다.");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Login error:", error);
        alert(error.message);
    }
}
