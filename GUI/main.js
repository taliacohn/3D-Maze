import MazeManager from "./mazeManager.js";
import FormValidation from "./formValidation.js";
import Player from "./player.js";
import DFSMaze3dGenerator from "../generators/DFSMaze3dGenerator.js";

const mazeGame = document.getElementById("mazeBox");
const initialImage = document.getElementById("initialImage");
const welcomeMsg = document.getElementById("welcomeMessage");
const welcomeMsgPar = document.querySelector("#welcomeMessage + p#welcome");

const loadGameName = document.getElementById("loadMaze");
const loadGameBtn = document.getElementById("loadMazeBtn");

const rulesBtn = document.getElementById("rules");

const solveGameBtn = document.getElementById("solveBtn");
const resetBtn = document.getElementById("resentBtn");
const hintBtn = document.getElementById("hint");

/** Form Validation */
const form = document.querySelector("#user-form form");
const name = document.getElementById("name");
const numRows = document.getElementById("rows");
const numCols = document.getElementById("cols");
const numLevels = document.getElementById("levels");

const newFormVal = new FormValidation();

/** Check form on input */
const nameErrorCheck = newFormVal.nameError();
const rowErrorCheck = newFormVal.rowError();
const colErrorCheck = newFormVal.colError();
const levelErrorCheck = newFormVal.levelError();

name.addEventListener("input", nameErrorCheck);
numRows.addEventListener("input", rowErrorCheck);
numCols.addEventListener("input", colErrorCheck);
numLevels.addEventListener("input", levelErrorCheck);

/** Check form on submit */
form.addEventListener("submit", (e) => {
  validateForm(e);
});

function validateForm(e) {
  const checkName = newFormVal.nameError();
  const checkRow = newFormVal.rowError();
  const checkCol = newFormVal.colError();
  const checkLevel = newFormVal.levelError();

  if (!checkName || !checkRow || !checkCol || !checkLevel) {
    e.preventDefault();
  } else {
    //start game
    initialImage.hidden = true;
    form.hidden = true;

    // enter welcome message
    welcomeMsgPar.textContent = `Welcome ${name.value}! Let's play`;
    welcomeMsg.hidden = false;

    const genMaze = new DFSMaze3dGenerator(
      Number(numLevels.value),
      Number(numRows.value),
      Number(numCols.value)
    );
    const maze = genMaze.generate();
    const player = new Player(maze);
    const manager = new MazeManager(maze, player);

    // Save maze and name to local storage
    const stringMaze = JSON.stringify(maze);
    localStorage.setItem(name.value, stringMaze);

    manager.generateMaze(maze.start.level);
  }
}
