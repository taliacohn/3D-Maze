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

form.addEventListener("submit", (e) => {
  validateForm(e);
});

function validateForm(form) {}
