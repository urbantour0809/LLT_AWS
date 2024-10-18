window.onload = function() {
    const flaskUrl = 'https://port-0-llt-backend-m2eej1jqd8b44d66.sel4.cloudtype.app'; // Flask 서버의 AWS URL로 변경

    const date = new Date();
    const day = date.getDay();
    const diff = 6 - day;
    const nextSaturday = new Date(date.setDate(date.getDate() + diff));
    const formattedDate = nextSaturday.toISOString().split('T')[0];

    document.getElementById('game-info').innerText = `1137회차 (${formattedDate})`;

    fetch(`${flaskUrl}/generate-lotto/`)
        .then(response => response.json())
        .then(data => {
            const gameNumbers = data.numbers;
            appendNumbers('game1', gameNumbers[0]);
            appendNumbers('game2', gameNumbers[1]);
            appendNumbers('game3', gameNumbers[2]);
            appendNumbers('game4', gameNumbers[3]);
            appendNumbers('game5', gameNumbers[4]);
        })
        .catch(error => console.error('Error:', error));

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
}
