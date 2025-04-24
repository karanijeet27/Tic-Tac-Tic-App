const board = document.getElementById("board");
const statusText = document.getElementById("status");
const welcomeScreen = document.getElementById("welcomeScreen");
const gameContainer = document.getElementById("gameContainer");

let currentPlayer = "X";
let gameActive = true;
let mode = "friend";
const cells = Array(9).fill(null);

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function startGame(selectedMode) {
  mode = selectedMode;
  welcomeScreen.style.display = "none";
  gameContainer.style.display = "block";
  restartGame();
}

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    if (cell) {
      div.textContent = cell;
      div.classList.add("disabled");
    }
    div.addEventListener("click", () => handleCellClick(index));
    board.appendChild(div);
  });
}

function handleCellClick(index) {
  if (!gameActive || cells[index]) return;
  cells[index] = currentPlayer;
  renderBoard();
  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    setTimeout(showModeSelection, 2000);
  } else if (cells.every(cell => cell)) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    setTimeout(showModeSelection, 2000);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Current Turn: ${currentPlayer}`;
    if (mode === "computer" && currentPlayer === "O") {
      setTimeout(computerMove, 500);
    }
  }
}

function computerMove() {
  const emptyIndexes = cells.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
  if (emptyIndexes.length > 0 && gameActive) {
    const move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    handleCellClick(move);
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function restartGame() {
  for (let i = 0; i < cells.length; i++) cells[i] = null;
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Current Turn: ${currentPlayer}`;
  renderBoard();
}

function showModeSelection() {
  gameContainer.style.display = "none";
  welcomeScreen.style.display = "block";
}
