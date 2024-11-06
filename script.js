const flaskUrl = 'https://port-0-llt-backend-m2eej1jqd8b44d66.sel4.cloudtype.app';

function checkAuth() {
    // Check login status from backend
    return fetch(`${flaskUrl}/check-auth`, { method: 'GET', credentials: 'include' })
        .then(response => response.json())
        .then(data => data.loggedIn);
}

async function generateLotto() {
    const isLoggedIn = await checkAuth();
    if (!isLoggedIn) {
        alert("Please log in to generate lotto numbers.");
        window.location.href = "login.html";
        return;
    }

    document.getElementById('loading').style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';

    fetch(`${flaskUrl}/generate-lotto`)
        .then(response => response.json())
        .then(data => {
            const gameNumbers = data.numbers;
            const currentRound = data.round;
            const formattedDate = new Date().toISOString().split('T')[0];
            document.getElementById('game-info').innerText = `${currentRound}회차 (${formattedDate})`;

            for (let i = 0; i < gameNumbers.length; i++) {
                appendNumbers(`game${i + 1}`, gameNumbers[i]);
            }

            document.getElementById('loading').style.display = 'none';
            document.getElementById('result-container').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching lotto numbers:', error);
            document.getElementById('loading').style.display = 'none';
        });
}

function appendNumbers(gameId, numbers) {
    const gameDiv = document.getElementById(gameId);
    gameDiv.innerHTML = '';
    numbers.forEach(num => {
        const img = document.createElement('img');
        img.src = `src/image/numbers/${num}.png`;
        img.alt = `${num}번`;
        img.classList.add('lotto-ball');
        gameDiv.appendChild(img);
    });
}

window.generateLotto = generateLotto;
