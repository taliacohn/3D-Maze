import DFSMaze3dGenerator from "../generators/DFSMaze3dGenerator.js";
import Player from "./player.js";

/** Represents maze game - manager of maze and player */
class MazeManager {
  #maze;
  #player;

  constructor() {
    this.#maze;
    this.#player;
    this.width;
    this.height;
  }

  get maze() {
    return this.#maze;
  }

  get player() {
    return this.#player;
  }

  createMaze(level, row, col) {
    const genMaze = new DFSMaze3dGenerator(
      Number(level),
      Number(row),
      Number(col)
    );
    this.#maze = genMaze.generate();
    this.#player = new Player(
      this.#maze,
      this.#maze.start.level,
      this.#maze.start.row,
      this.#maze.start.col
    );
  }

  displayMaze() {
    const rows = this.#maze.rows;
    const cols = this.#maze.columns;

    const level = this.#player.level;

    const levelMessage = document.getElementById("levelNum");
    const mazeBox = document.getElementById("mazeBox");

    mazeBox.innerHTML = "";
    levelMessage.textContent = "";

    this.width = mazeBox.clientWidth / this.columns;
    this.height = mazeBox.clientHeight / this.rows;

    levelMessage.textContent = `Floor ${level + 1}`;
    levelMessage.style.fontSize = "1.5rem";

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        const cell = this.#maze.maze[level][x][y];
        const displayCell = document.createElement("div");
        const location = `${level}${x}${y}`;
        displayCell.className = "cell";
        displayCell.dataset.id = location;

        this.addDesign(cell, displayCell);

        displayCell.style.boxSizing = "border-box";
        displayCell.style.flexBasis = (100 % cols) + "%";
        displayCell.style.height = mazeBox.clientHeight / rows + "%";

        mazeBox.appendChild(displayCell);
      }
    }
  }

  addDesign(cell, displayCell) {
    const up = this.#maze.cellInput.get("up");
    const down = this.#maze.cellInput.get("down");
    const upDown = this.#maze.cellInput.get("upDown");

    if (!cell.wallList.up && !cell.wallList.down) {
      displayCell.textContent = upDown;
      cell.className = "cell upDown";
    } else if (!cell.wallList.up) {
      displayCell.textContent = up;
      cell.className = "cell up";
    } else if (!cell.wallList.down) {
      displayCell.textContent = down;
      cell.className = "cell down";
    }

    if (cell.wallList.goal) {
      displayCell.innerHTML += `<img src=".GUI/images/robot2.jpg" id="goal">`;
    } else if (cell.wallList.start) {
      cell.wallList.player = true;
      cell.className = "cell player";
      displayCell.innerHTML += `<img src=".GUI/images/robot.jpg" id="start">`;
    }

    if (cell.wallList.right) {
      displayCell.style.borderRight = "1px solid darkgrey";
    }
    if (cell.wallList.left) {
      displayCell.style.borderLeft = "1px solid darkgrey";
    }
    if (cell.wallList.up) {
      displayCell.style.borderTop = "1px solid darkgrey";
    }
    if (cell.wallList.down) {
      displayCell.style.borderBottom = "1px solid darkgrey";
    }
  }
}

export default MazeManager;
