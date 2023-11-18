// Card suits and values
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Function to create a deck of cards
function createDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

// Shuffle function
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Function to render the initial game board
function renderGameBoard() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j <= i; j++) {
            const card = deck.pop();
            const cardElement = createCardElement(card);
            if (j === i) {
                cardElement.classList.add('face-up');
            }
            gameContainer.appendChild(cardElement);
        }
    }
}

// Function to create a card element
function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.suit = card.suit;
    cardElement.dataset.value = card.value;
    cardElement.textContent = `${card.value} ${getSuitSymbol(card.suit)}`;
    cardElement.addEventListener('click', handleCardClick);
    return cardElement;
}

// Function to get the Unicode symbol for a card suit
function getSuitSymbol(suit) {
    switch (suit) {
        case 'hearts':
            return '♥';
        case 'diamonds':
            return '♦';
        case 'clubs':
            return '♣';
        case 'spades':
            return '♠';
    }
}

// Function to handle card clicks
function handleCardClick() {
    const clickedCard = this;

    if (!clickedCard.classList.contains('face-up')) {
        // Flip the clicked card face-up
        clickedCard.classList.add('face-up');
    } else {
        // Flip the clicked card face-down
        clickedCard.classList.remove('face-up');
    }
}

// Add these variables to track the timer
let startTime;
let timerInterval;

// Function to start the timer
function startTimer() {
    startTime = new Date().getTime();

    // Update the timer every second
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);

    const formattedTime = `${padZero(minutes)}:${padZero(seconds % 60)}`;
    document.getElementById('timer').textContent = `Time: ${formattedTime}`;
}

// Function to pad zero for single-digit numbers
function padZero(number) {
    return number < 10 ? `0${number}` : number;
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Modify the renderGameBoard function to start the timer when rendering the game board
function renderGameBoard() {
    // ... (existing code)

    // Start the timer when rendering the game board
    startTimer();
}

// Modify the handleCardClick function to stop the timer when the game is won and display the rank
function handleCardClick() {
    // ... (existing code)

    // Check for win condition (modify this according to your game rules)
    if (deck.length === 0) {
        stopTimer();

        const elapsedTime = calculateElapsedTime();
        const rank = calculateRank(elapsedTime);

        alert(`Congratulations! You won!\nYour time: ${formatElapsedTime(elapsedTime)}\nRank: ${rank}`);
    }
}

// Function to calculate elapsed time in seconds
function calculateElapsedTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    return Math.floor(elapsedTime / 1000);
}

// Function to calculate rank based on elapsed time
function calculateRank(elapsedTime) {
    if (elapsedTime <= 180) {
        return 'Gold';
    } else if (elapsedTime > 180 && elapsedTime <= 599) {
        return 'Silver';
    } else {
        return 'Bronze';
    }
}

// Function to format elapsed time as MM:SS
function formatElapsedTime(elapsedTime) {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return `${padZero(minutes)}:${padZero(seconds)}`;
}



// Initialize the game
const deck = createDeck();
shuffle(deck);
renderGameBoard();

