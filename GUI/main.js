import MazeManager from "./mazeManager.js";
import FormValidation from "./formValidation.js";

const form = document.getElementById("user-form");
const name = document.getElementById("name");
const numRows = document.getElementById("rows");
const numCols = document.getElementById("cols");
const numLevels = document.getElementById("levels");

const loadGameName = document.getElementById("loadMaze");
const loadGameBtn = document.getElementById("loadMazeBtn");

const rulesBtn = document.getElementById("rules");

const solveGameBtn = document.getElementById("solveBtn");
const resetBtn = document.getElementById("resentBtn");
const hintBtn = document.getElementById("hint");

// Check form on input
const newFormVal = new FormValidation();

name.addEventListener("input", newFormVal.nameError());
numRows.addEventListener("input", newFormVal.rowError());
numCols.addEventListener("input", newFormVal.colError());
numLevels.addEventListener("input", newFormVal.levelError());

// Check form on submit
form.addEventListener("submit", (e) => {
  validateForm(e);
});

function validateForm(form) {
  const checkName = newFormVal.nameError();
  const checkRow = newFormVal.rowError();
  const checkCol = newFormVal.colError();
  const checkLevel = newFormVal.levelError();

  if (!checkName || !checkRow || !checkCol || !checkLevel) {
    form.preventDefault();
  }
  //   else {
  //     //start game
  //   }
}
