const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let circleTurn;
const WinningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
let winningMessageTextElement = document.querySelector(
  "[data-winnig-message-text]"
);
let winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");

restartButton.addEventListener("click", startGame);
startGame();

function startGame() {
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  boardHover();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  // place the mark
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  // check for the win
  if (checkWin(currentClass)) {
    endGame(false);
  }
  // check for the draw
  else if (isDraw()) {
    endGame(true);
  }
  // switch turns
  else {
    swapTurns();
    boardHover();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win`;
  }
  winningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function boardHover() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WinningCombination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
