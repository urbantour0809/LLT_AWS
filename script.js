const flaskUrl = 'https://port-0-llt-backend-m2eej1jqd8b44d66.sel4.cloudtype.app';

// 사용자 인증 확인
function checkAuth() {
    console.log("Checking user authentication status...");

    return fetch(`${flaskUrl}/check-auth`, { method: 'GET', credentials: 'include' })
        .then(response => {
            console.log("Auth check response:", response);
            return response.json();
        })
        .then(data => {
            console.log("Auth check data:", data);
            return data.loggedIn;
        });
}

// 로또 번호 생성 함수 (인증 확인 포함)
async function generateLotto() {
    console.log("Generating lotto numbers...");

    // 로그인 여부 확인
    const isLoggedIn = await checkAuth();
    console.log("Is user logged in:", isLoggedIn);

    if (!isLoggedIn) {
        console.log("User is not logged in, showing alert and redirecting to login page...");
        alert("로그인 후 이용해주세요.");
        window.location.href = "login.html";
        return;
    }

    document.getElementById('loading').style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';
    console.log("Fetching lotto numbers from backend...");

    fetch(`${flaskUrl}/generate-lotto`, { credentials: 'include' })
        .then(response => {
            console.log("Lotto generation response:", response);
            return response.json();
        })
        .then(data => {
            console.log("Lotto data received:", data);

            const gameNumbers = data.numbers;
            const currentRound = data.round;
            const formattedDate = new Date().toISOString().split('T')[0];
            document.getElementById('game-info').innerText = `${currentRound}회차 (${formattedDate})`;

            for (let i = 0; i < gameNumbers.length; i++) {
                console.log(`Appending numbers for game${i + 1}:`, gameNumbers[i]);
                appendNumbers(`game${i + 1}`, gameNumbers[i]);
            }

            document.getElementById('loading').style.display = 'none';
            document.getElementById('result-container').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching lotto numbers:', error);
            document.getElementById('loading').style.display = 'none';
            alert("로또 번호 생성에 실패했습니다. 다시 시도해주세요.");
        });
}
