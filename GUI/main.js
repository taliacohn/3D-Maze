import MazeManager from "./mazeManager.js";
import FormValidation from "./formValidation.js";
import Player from "./player.js";
import DFSMaze3dGenerator from "../generators/DFSMaze3dGenerator.js";

/** Used for starting game */
// const loadGameName = document.getElementById("loadMaze");
// const loadGameBtn = document.getElementById("loadMazeBtn");

// const rulesBtn = document.getElementById("rules");

// const solveGameBtn = document.getElementById("solveBtn");
// const resetBtn = document.getElementById("resentBtn");
// const hintBtn = document.getElementById("hint");

/** Form Validation */

const form = document.querySelector("form");
const name = document.getElementById("name");
const numRows = document.getElementById("rows");
const numCols = document.getElementById("cols");
const numLevels = document.getElementById("levels");
const startSection = document.querySelector("section#start-game");

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

function newGame(e) {
  const checkName = newFormVal.nameError();
  const checkRow = newFormVal.rowError();
  const checkCol = newFormVal.colError();
  const checkLevel = newFormVal.levelError();

  if (!checkName || !checkRow || !checkCol || !checkLevel) {
    e.preventDefault();
  }

  if (checkName && checkRow && checkCol && checkLevel) {
    const welcomeMsg = document.getElementById("welcomeMessage");
    const welcomeMsgPar = document.querySelector("#welcomeMessage + p#welcome");
    const initialImage = document.getElementById("#mazeBox + div#initialImage");
    const initImg = document.querySelector(
      "#initialImage + img#initialRobotPic"
    );
    const initP = document.querySelector("#initialImage + p#initialMessage");
    // enter welcome message
    welcomeMsgPar.textContent = `Welcome ${name.value}. Let's play!`;
    welcomeMsgPar.style.color = "black";
    welcomeMsg.hidden = false;

    //Hide form and initial picture
    initialImage.hidden = true;
    initImg.hidden = true;
    initP = true;
    startSection.hidden = true;

    //Generate new maze
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
