import Cell from "../generators/cell.js";
import Maze3d from "../maze3d.js";

/** Represents maze game - manager of maze and player */
class MazeManager {
  #maze;
  #directions;
  #player;

  constructor() {
    this.#maze;
    this.#player;
    this.up = this.#maze.cellInput.get("up");
    this.down = this.#maze.cellInput.get("down");
    this.upDown = this.#maze.cellInput.get("upDown");
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

    const levelMessage = document.getElementById("levelNum");
    const mazeBox = document.getElementById("mazeBox");

    mazeBox.innerHTML = "";
    levelMessage.textContent = "";

    this.width = mazeBox.clientWidth / this.columns;
    mazeBox.style.width = this.width + "px";
    this.height = mazeBox.clientHeight / this.rows;
    mazeBox.style.height = this.height + "px";

    levelMessage.textContent = `Level ${level + 1}`;

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        const cell = this.#maze.maze[level][x][y];
        const displayCell = document.createElement("div");
        const location = `${level}${x}${y}`;
        displayCell.className = "cell";
        displayCell.dataset.id = location;

        addDesign(cell, displayCell);

        displayCell.style.flexBasis = (100 % cols) + "%";
      }
    }
  }

  addDesign(cell, displayCell) {
    if (!cell.wallList.up && !cell.wallList.down) {
      displayCell.textContent = this.upDown;
      cell.className = "cell upDown";
    } else if (!cell.wallList.up) {
      displayCell.textContent = this.up;
      cell.className = "cell up";
    } else if (!cell.wallList.down) {
      displayCell.textContent = this.down;
      cell.className = "cell down";
    }

    if (cell.wallList.goal) {
      displayCell.innerHTML += `<img src="./images/robot2.jpg" id="goal">`;
    } else if (cell.wallList.start) {
      cell.wallList.player = true;
      cell.className = "cell player";
      displayCell.innerHTML += `<img src="./images/robot.jpg" id="start">`;
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

    mazeBox.appendChild(displayCell);
  }
}

export default MazeManager;
