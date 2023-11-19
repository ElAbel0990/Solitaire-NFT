// Card suits and values
const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

// Declare the deck as a global variable
let deck;

// Function to create a deck of cards
function createDeck() {
  const newDeck = [];
  for (const suit of suits) {
    for (const value of values) {
      newDeck.push({ suit, value });
    }
  }
  return newDeck;
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
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = "";

  deck = createDeck(); // Assign the created deck to the global variable
  shuffle(deck);

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j <= i; j++) {
      const card = deck.pop();
      const cardElement = createCardElement(card);
      gameContainer.appendChild(cardElement);
    }
  }
}

// Function to create a card element
function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.suit = card.suit;
  cardElement.dataset.value = card.value;
  cardElement.textContent = `${card.value} ${getSuitSymbol(card.suit)}`;

  // Add color based on suit
  switch (card.suit) {
    case "hearts":
      cardElement.style.color = "red";
      break;
    case "diamonds":
      cardElement.style.color = "red";
      break;
    case "clubs":
      cardElement.style.color = "black";
      break;
    case "spades":
      cardElement.style.color = "black";
      break;
    default:
      break;
  }

  cardElement.addEventListener("click", handleCardClick);
  return cardElement;
}

// Function to get the Unicode symbol for a card suit
function getSuitSymbol(suit) {
  switch (suit) {
    case "hearts":
      return "♥";
    case "diamonds":
      return "♦";
    case "clubs":
      return "♣";
    case "spades":
      return "♠";
  }
}

// Modify the handleCardClick function to check for the win condition
function handleCardClick() {
  const clickedCard = this;

  if (!clickedCard.classList.contains("face-up")) {
    // Flip the clicked card face-up
    clickedCard.classList.add("face-up");

    // Check for valid moves based on the solitaire rules
    const validMove = isValidMove(clickedCard);

    if (!validMove) {
      // If the move is not valid, flip the card face-down
      clickedCard.classList.remove("face-up");
    }

    // Check for win condition when all cards are face-up in the tableau
    const tableauCards = document.querySelectorAll(".tableau .card");
    const allCardsFaceUp = Array.from(tableauCards).every((card) =>
      card.classList.contains("face-up")
    );

    // Check for win condition when there are no cards left in the deck
    const noCardsInDeck = deck.length === 0;

    if (allCardsFaceUp && noCardsInDeck) {
      stopTimer();
      const elapsedTime = calculateElapsedTime();
      const rank = calculateRank(elapsedTime);

      alert(
        `Congratulations! You won!\nYour time: ${formatElapsedTime(
          elapsedTime
        )}\nRank: ${rank}`
      );
    }
  }
}

// Function to check if a move is valid
function isValidMove(clickedCard) {
  // Implement your logic to check if the clicked card can be moved
  // For example, you might check if the card is the top card of a stack or if it can be placed on another card.
  // Return true if the move is valid, and false otherwise.
  // Add your specific rules based on the solitaire game.
  return true; // Placeholder, replace with your actual logic
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
  document.getElementById("timer").textContent = `Time: ${formattedTime}`;
}

// Function to pad zero for single-digit numbers
function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Modify the handleCardClick function to check for the win condition
function handleCardClick() {
  const clickedCard = this;

  if (!clickedCard.classList.contains("face-up")) {
    // Flip the clicked card face-up
    clickedCard.classList.add("face-up");
  } else {
    // Flip the clicked card face-down
    clickedCard.classList.remove("face-up");
  }

  // Check for win condition when all cards are face-up in the tableau
  const tableauCards = document.querySelectorAll(".tableau .card");
  const allCardsFaceUp = Array.from(tableauCards).every((card) =>
    card.classList.contains("face-up")
  );

  // Check for win condition when there are no cards left in the deck
  const noCardsInDeck = deck.length === 0;

  if (allCardsFaceUp && noCardsInDeck) {
    stopTimer();
    const elapsedTime = calculateElapsedTime();
    const rank = calculateRank(elapsedTime);

    alert(
      `Congratulations! You won!\nYour time: ${formatElapsedTime(
        elapsedTime
      )}\nRank: ${rank}`
    );
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
    return "Gold";
  } else if (elapsedTime > 180 && elapsedTime <= 599) {
    return "Silver";
  } else {
    return "Bronze";
  }
}

// Function to format elapsed time as MM:SS
function formatElapsedTime(elapsedTime) {
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  return `${padZero(minutes)}:${padZero(seconds)}`;
}

// Your existing card-related functions can go here
function renderSolitaireGame() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = "";

  // Add tableau and foundation stacks
  const tableauStack = document.createElement("div");
  tableauStack.classList.add("stack", "tableau");
  gameContainer.appendChild(tableauStack); // Append tableauStack to gameContainer

  const foundationStack = document.createElement("div");
  foundationStack.classList.add("stack", "foundation");
  gameContainer.appendChild(foundationStack); // Append foundationStack to gameContainer

  // Initialize the game with cards in the tableau
  initializeTableau(tableauStack);
}

// Function to initialize the tableau with cards
function initializeTableau(tableauStack) {
  const deck = createDeck(); // Create a new deck
  shuffle(deck);

  for (let i = 0; i < 7; i++) {
    const column = document.createElement("div");
    column.classList.add("column");

    for (let j = 0; j <= i; j++) {
      const card = deck.pop();
      const cardElement = createCardElement(card);
      column.appendChild(cardElement);
    }

    tableauStack.appendChild(column);
  }
}

// Call the function to render the solitaire game
renderSolitaireGame();

// Initialize the game
shuffle(deck);
renderGameBoard(); // Render the game board after starting the timer
startTimer(); // Start the timer after the game board is rendered
