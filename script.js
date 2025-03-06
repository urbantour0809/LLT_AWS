const flaskUrl = 'https://port-0-llt-backend-m2eej1jqd8b44d66.sel4.cloudtype.app';

// 로또 번호 생성 함수
async function generateLotto() {
    console.log("Generating lotto numbers...");

    document.getElementById('loading').style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';
    console.log("Fetching lotto numbers from backend...");

    fetch(`${flaskUrl}/generate-lotto`)
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

function appendNumbers(gameId, numbers) {
    const gameElement = document.getElementById(gameId);
    if (!gameElement) {
        console.error(`Element with id ${gameId} not found`);
        return;
    }
    
    gameElement.innerHTML = ''; // 기존 내용 초기화
    
    numbers.forEach(number => {
        const img = document.createElement('img');
        img.src = `src/image/numbers/${number}.png`; // 번호에 해당하는 이미지 경로
        img.alt = `번호 ${number}`;
        img.className = 'lotto-ball'; // CSS에서 정의된 클래스 사용
        gameElement.appendChild(img);
    });
}
