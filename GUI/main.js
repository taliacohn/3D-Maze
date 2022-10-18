import MazeManager from "./mazeManager.js";
import FormValidation from "./formValidation.js";
import Player from "./player.js";
import DFSMaze3dGenerator from "../generators/DFSMaze3dGenerator.js";

let manager;

/** Form Validation */

const form = document.querySelector("form");
const name = document.getElementById("name");
const numRows = document.getElementById("rows");
const numCols = document.getElementById("cols");
const numLevels = document.getElementById("levels");

const newFormVal = new FormValidation();

/** Check form on input */
name.addEventListener("input", () => newFormVal.nameError());
numRows.addEventListener("input", () => newFormVal.rowError());
numCols.addEventListener("input", () => newFormVal.colError());
numLevels.addEventListener("input", () => newFormVal.levelError());

/** Check form on submit */
form.addEventListener("submit", (e) => {
  newGame(e);
});

/** If form validated, start new game */
function newGame(e) {
  const checkName = newFormVal.nameError();
  const checkRow = newFormVal.rowError();
  const checkCol = newFormVal.colError();
  const checkLevel = newFormVal.levelError();

  if (!checkName || !checkRow || !checkCol || !checkLevel) {
    e.preventDefault();
  }

  if (checkName && checkRow && checkCol && checkLevel) {
    //Generate new maze
    manager = new MazeManager();
    manager.createMaze(numLevels, numRows, numCols);
    manager.displayMaze();
  }
}
