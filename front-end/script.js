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

// Shuffle function
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

//Function to create a deck of cards
function createDeck() {
  const newDeck = [];
  for (const suit of suits) {
    for (const value of values) {
      newDeck.push({ suit, value });
    }
  }
  return newDeck;
}

// Function to render the initial game board
function renderGameBoard() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = "";

  // Check if there are enough cards in the deck
  if (deck.length === 0) {
    console.error("The deck is empty!");
    return;
  }

  const tableauStack = document.createElement("div");
  tableauStack.classList.add("stack", "tableau");
  gameContainer.appendChild(tableauStack);

  const foundationStack = document.createElement("div");
  foundationStack.classList.add("stack", "foundation");
  gameContainer.appendChild(foundationStack);

  // Initialize the tableau with cards
  initializeTableau(tableauStack);

  // Move the call to initializeTableau before rendering the initial game board
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j <= i; j++) {
      // Check if there are enough cards in the deck
      if (deck.length > 0) {
        const card = deck.pop();
        const cardElement = createCardElement(card);

        if (j === i) {
          cardElement.classList.add("top"); // Only show the top card in each column
        }

        cardElement.addEventListener("click", handleCardClick);
        gameContainer.appendChild(cardElement);
      } else {
        console.error("The deck is empty!");
      }
    }
  }
}

// Function to create a card element
function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  if (!card) {
    // Handle the case when the deck is empty
    // For example, you might want to set a default state or log an error
    console.error("The deck is empty!");
    return cardElement;
  }

  cardElement.dataset.suit = card.suit;
  cardElement.dataset.value = card.value;
  cardElement.textContent = `${card.value} ${getSuitSymbol(card.suit)}`;

  // Add color based on suit
  switch (card.suit) {
    case "hearts":
    case "diamonds":
      cardElement.classList.add("red");
      break;
    case "clubs":
    case "spades":
      cardElement.classList.add("black");
      break;
    default:
      break;
  }

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
function handleCardClick() {
  const clickedCard = this;

  // Check if the clicked card is face-up and can be moved
  if (clickedCard.classList.contains("face-up") && canMove(clickedCard)) {
    // Move the card
    moveCard(clickedCard);
  }
}

// Function to move the clicked card
function moveCard(clickedCard) {
  // Implement your logic to move the card, e.g., change its parent stack
  const sourceStack = clickedCard.parentElement;
  const destinationStack = getDestinationStack(clickedCard);

  if (destinationStack) {
    destinationStack.appendChild(clickedCard);
  }

  // Check for win condition when all cards are face-up in the tableau
  const tableauStacks = document.querySelectorAll(".tableau .column");
  const allCardsFaceUp = Array.from(tableauStacks).every((stack) =>
    stack.lastChild.classList.contains("face-up")
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

// Function to check if the clicked card can be moved
function canMove(clickedCard) {
  // Implement your specific rules here
  // For example, you might check if the card can be placed on the next card in a sequential order with different colors
  const destinationStack = getDestinationStack(clickedCard);

  return destinationStack !== null;
}

function getDestinationStack(clickedCard) {
  // Find the tableau stacks
  const tableauStacks = document.querySelectorAll(".tableau .column");

  // Iterate through the stacks to find a valid destination
  for (const destinationStack of tableauStacks) {
    // Skip the source stack
    if (destinationStack === clickedCard.parentElement) {
      continue;
    }

    // Check if the card can be moved to the destination stack
    if (canMoveToStack(clickedCard, destinationStack)) {
      return destinationStack;
    }
  }

  return null; // No valid destination found
}

// Function to check if a card can be moved to a specific stack
function canMoveToStack(clickedCard, destinationStack) {
  const topCard = destinationStack.lastChild;

  // If the stack is empty, only allow kings to be moved
  if (!topCard) {
    return clickedCard.dataset.value === "K";
  }

  // Check if the values are sequential and the colors are different
  const clickedValue = values.indexOf(clickedCard.dataset.value);
  const topCardValue = values.indexOf(topCard.dataset.value);
  const clickedSuit = clickedCard.dataset.suit;
  const topCardSuit = topCard.dataset.suit;

  return (
    (topCardValue - 1 === clickedValue &&
      (topCardSuit === "hearts" || topCardSuit === "diamonds") &&
      (clickedSuit === "clubs" || clickedSuit === "spades")) ||
    ((topCardSuit === "clubs" || topCardSuit === "spades") &&
      (clickedSuit === "hearts" || clickedSuit === "diamonds"))
  );
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

function initializeTableau(tableauStack) {
  if (!tableauStack) {
    console.error("Tableau stack element not found");
    return;
  }

  for (let i = 0; i < 7; i++) {
    const column = document.createElement("div");
    column.classList.add("column");

    for (let j = 0; j <= i; j++) {
      // Check if there are enough cards in the deck
      if (deck.length > 0) {
        const card = deck.pop();
        const cardElement = createCardElement(card);

        if (j === i) {
          cardElement.classList.add("top"); // Only show the top card in each column
        }

        cardElement.addEventListener("click", handleCardClick);
        column.appendChild(cardElement);
      } else {
        console.error("The deck is empty!");
        return; // Stop the function if the deck is empty
      }
    }

    tableauStack.appendChild(column);
  }
}

// Call the function to initialize the tableau stacks
const tableauStack = document.querySelector(".tableau");
initializeTableau(tableauStack);

// Initialize the deck
deck = createDeck();
shuffle(deck);

// Call the function to initialize the tableau stacks
initializeTableau(document.querySelector(".tableau"));

// Render the game board after starting the timer
renderGameBoard();
startTimer(); // Start the timer after the game board is rendered

// Call the function to render the solitaire game
renderSolitaireGame();
