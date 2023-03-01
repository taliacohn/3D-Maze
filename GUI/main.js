import MazeManager from "./mazeManager.js";
import FormValidation from "./formValidation.js";

const form = document.querySelector("#form");
const name = document.getElementById("name");
const loadMazeName = document.getElementById("loadMazeName");
const numRows = document.getElementById("rows");
const numCols = document.getElementById("cols");
const numLevels = document.getElementById("levels");

const gamePlayBtns = document.getElementById("gamePlayBtns");
const resetBtn = document.getElementById("resetBtn");
const solveGameBtn = document.getElementById("solveBtn");
const hintBtn = document.getElementById("hint");
const saveGameBtn = document.getElementById("saveGameBtn");
const loadMazeBtn = document.getElementById("loadMazebtn");

const newFormVal = new FormValidation();
let manager;

/** Form Validation */
/** Check form on input */
name.addEventListener("input", () => newFormVal.nameError());
numRows.addEventListener("input", () => newFormVal.rowError());
numCols.addEventListener("input", () => newFormVal.colError());
numLevels.addEventListener("input", () => newFormVal.levelError());

/** Check form on submit */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  newGame(e);
});

/** If form validated, start new game */
function newGame(e) {
  e.preventDefault();
  const checkName = newFormVal.nameError();
  const checkRow = newFormVal.rowError();
  const checkCol = newFormVal.colError();
  const checkLevel = newFormVal.levelError();

  if (!checkName || !checkRow || !checkCol || !checkLevel) {
    console.log("didn't work");
  } else if (checkName && checkRow && checkCol && checkLevel) {
    //Generate new maze
    startGame();
  }
}

function startGame() {
  manager = new MazeManager();
  manager.createMaze(numLevels.value, numRows.value, numCols.value);
  manager.displayMaze();
  gamePlayBtns.hidden = false;
  //form.reset();
  console.log("worked");
}

// Reset player on click of reset button
resetBtn.addEventListener("click", () => {
  manager.resetToStart();
});

document.addEventListener("keydown", (e) => {
  const keyPresses = [
    "ArrowUp",
    "ArrowDown",
    "ArrowRight",
    "ArrowLeft",
    "KeyW",
    "KeyS",
  ];
  if (manager) {
    if (keyPresses.includes(e.key)) {
      e.view.event.preventDefault();
    }
    manager.playerMove(e.key);
  }
});

solveGameBtn.addEventListener("click", () => {
  manager.solveGame();
});

hintBtn.addEventListener("click", () => {
  manager.hint();
});

saveGameBtn.addEventListener("click", () => {
  console.log(name.value);
  manager.saveGame(name.value);
});

loadMazeBtn.addEventListener("click", () => {
  manager = new MazeManager();
  manager.loadGame(loadMazeName.value);
  gamePlayBtns.hidden = false;
});
