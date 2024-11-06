const flaskUrl = 'https://port-0-llt-backend-m2eej1jqd8b44d66.sel4.cloudtype.app';

console.log("Initializing script...");

const date = new Date();
const day = date.getDay();
const diff = 6 - day;
const nextSaturday = new Date(date.setDate(date.getDate() + diff));
const formattedDate = nextSaturday.toISOString().split('T')[0];

function generateLotto() {
    document.getElementById('loading').style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';
    console.log("Fetching lotto numbers from backend...");

    fetch(`${flaskUrl}/generate-lotto`)
        .then(response => {
            console.log("Received response from backend");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Lotto numbers:", data.numbers);
            const gameNumbers = data.numbers;
            const currentRound = data.round;

            document.getElementById('game-info').innerText = `${currentRound}회차 (${formattedDate})`;

            appendNumbers('game1', gameNumbers[0]);
            appendNumbers('game2', gameNumbers[1]);
            appendNumbers('game3', gameNumbers[2]);
            appendNumbers('game4', gameNumbers[3]);
            appendNumbers('game5', gameNumbers[4]);

            document.getElementById('loading').style.display = 'none';
            document.getElementById('result-container').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching lotto numbers:', error);
            document.getElementById('loading').style.display = 'none';
        });
}

function appendNumbers(gameId, numbers) {
    console.log(`Appending numbers for ${gameId}:`, numbers);
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
