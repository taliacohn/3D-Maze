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
    this.goalSrc = "./GUI/images/end.png";
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
    console.log(this.#maze.toString());
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
    mazeBox.style.backgroundColor = "inherit";

    this.width = mazeBox.clientWidth / cols;
    this.height = mazeBox.clientHeight / rows;

    mazeBox.innerHTML = "";
    levelMessage.textContent = "";

    if (this.#maze.levels > 1) {
      levelMessage.textContent = `Floor ${level + 1}`;
      levelMessage.style.fontSize = "1.25rem";
    }

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        const cell = this.#maze.maze[level][x][y];
        const displayCell = document.createElement("div");
        const location = `${level}${x}${y}`;
        displayCell.className = "cell";
        displayCell.dataset.id = location;

        this.addDesign(cell, displayCell, x, y, rows, cols);

        displayCell.style.width = this.width + "px";
        displayCell.style.height = this.height + "px";

        displayCell.style.backgroundColor = "inherit";
        mazeBox.appendChild(displayCell);
      }
    }
  }

  addDesign(cell, displayCell, x, y, rows, cols) {
    if (cell.wallList.left && y !== 0) {
      displayCell.style.borderLeft = "1px solid black";
    }
    if (cell.wallList.forward && x !== 0) {
      displayCell.style.borderTop = "1px solid black";
    }

    if (cell.wallList.goal) {
      const goalImg = new Image(this.width - 5, this.height - 5);
      goalImg.src = this.goalSrc;
      cell.wallList.goal = true;
      displayCell.appendChild(goalImg);
      displayCell.className = "cell";
    } else if (cell.wallList.start) {
      cell.wallList.start = true;
      displayCell.className = "cell player";
      const startImg = new Image(this.width - 2, this.height - 2);
      startImg.src = this.#player.src;
      displayCell.appendChild(startImg);
      displayCell.className = "cell";
    } else if (!cell.wallList.up && !cell.wallList.down) {
      const upDown = new Image(this.width - 2, this.height - 2);
      upDown.src = "./GUI/images/arrowUpDown.png";
      displayCell.appendChild(upDown);
      displayCell.className = "cell upDown";
    } else if (!cell.wallList.up) {
      const up = new Image(this.width - 2, this.height - 2);
      up.src = "./GUI/images/arrowUp.png";
      displayCell.appendChild(up);
      displayCell.className = "cell up";
    } else if (!cell.wallList.down) {
      const down = new Image(this.width - 2, this.height - 2);
      up.src = "./GUI/images/arrowDown.png";
      displayCell.appendChild(down);
      displayCell.className = "cell down";
    }
  }
}

export default MazeManager;
