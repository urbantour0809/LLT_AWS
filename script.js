const flaskUrl = 'https://port-0-llt-backend-m2eej1jqd8b44d66.sel4.cloudtype.app';

// Function to check if the user is authenticated
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

// Function to generate lotto numbers (with authentication check)
async function generateLotto() {
    console.log("Generating lotto numbers...");

    // Check if the user is logged in
    const isLoggedIn = await checkAuth();
    console.log("Is user logged in:", isLoggedIn);

    // If not logged in, show alert and redirect to login page
    if (!isLoggedIn) {
        console.log("User is not logged in, showing alert and redirecting to login page...");
        alert("Please log in to generate lotto numbers.");
        window.location.href = "login.html";
        return;
    }

    // If logged in, proceed with fetching lotto numbers
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
        });
}

// Helper function to append lotto numbers to the page
function appendNumbers(gameId, numbers) {
    console.log(`Appending numbers to ${gameId}:`, numbers);

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

// Make generateLotto function globally accessible
window.generateLotto = generateLotto;
