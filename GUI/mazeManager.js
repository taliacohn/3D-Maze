import DFSMaze3dGenerator from "../generators/DFSMaze3dGenerator.js";
import Player from "./player.js";
import Directions from "../directions.js";
import Cell from "../generators/cell.js";

/** Represents maze game - manager of maze and player */
class MazeManager {
  #maze;
  #player;
  #directions;
  #levels;
  #rows;
  #cols;

  constructor() {
    this.#maze;
    this.#player;
    this.#directions = new Directions();
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

  get directions() {
    return this.#directions;
  }

  createMaze(level, row, col) {
    this.genMaze = new DFSMaze3dGenerator(
      Number(level),
      Number(row),
      Number(col)
    );

    this.#maze = this.genMaze.generate();
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

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = this.#maze.maze[level][row][col];
        const displayCell = document.createElement("div");
        const location = `${level}${row}${col}`;
        displayCell.className = "cell";
        displayCell.dataset.id = location;

        this.addDesign(cell, displayCell, row, col, level);

        displayCell.style.width = this.width + "px";
        displayCell.style.height = this.height + "px";

        displayCell.style.backgroundColor = "inherit";
        mazeBox.appendChild(displayCell);
      }
    }
  }

  addDesign(cell, displayCell, row, col, level) {
    if (cell.wallList.left && col !== 0) {
      displayCell.style.borderLeft = "1px solid black";
    }

    if (
      this.#player.level === level &&
      this.#player.row === row &&
      this.#player.col === col
    ) {
      displayCell.className = "cell player";
      const startImg = new Image(this.width - 5, this.height - 10);
      startImg.src = this.#player.src;
      displayCell.appendChild(startImg);
      displayCell.className = "cell";
    } else if (cell.wallList.goal) {
      const goalImg = new Image(this.width - 5, this.height - 5);
      goalImg.src = this.goalSrc;
      cell.wallList.goal = true;
      displayCell.appendChild(goalImg);
      displayCell.className = "cell";
    } else if (!cell.wallList.up && !cell.wallList.down) {
      const upDown = new Image(this.width - 5, this.height - 5);
      upDown.src = "./GUI/images/arrowUpDown.png";
      displayCell.appendChild(upDown);
      displayCell.className = "cell upDown";
    } else if (!cell.wallList.up) {
      const up = new Image(this.width - 5, this.height - 5);
      up.src = "./GUI/images/arrowUp.png";
      displayCell.appendChild(up);
      displayCell.className = "cell up";
    } else if (!cell.wallList.down) {
      const down = new Image(this.width - 5, this.height - 5);
      down.src = "./GUI/images/arrowDown.png";
      displayCell.appendChild(down);
      displayCell.className = "cell down";
    }

    if (cell.wallList.forward && row !== this.#maze.rows) {
      displayCell.style.borderBottom = "1px solid black";
    }
  }

  resetToStart() {
    const start = this.#maze.start;

    this.#player.level = start.level;
    this.#player.row = start.row;
    this.#player.col = start.col;

    this.displayMaze();
  }

  // check if keyboard move is valid, move player if it is
  playerMove(keyMove) {
    console.log(keyMove);
    const level = this.#player.level;
    const row = this.#player.row;
    const col = this.#player.col;

    const keyOptions = new Map([
      ["ArrowUp", "backward"],
      ["ArrowDown", "forward"],
      ["w", "up"],
      ["s", "down"],
      ["ArrowRight", "right"],
      ["ArrowLeft", "left"],
    ]);

    /** @type {Cell} */
    const currCell = this.#maze.maze[level][row][col];

    if (keyOptions.has(keyMove)) {
      const directionKey = keyOptions.get(keyMove);
      const direction = this.#directions.directions.get(directionKey);

      const currWallList = currCell.wallList[directionKey];

      // check if in borders and not crossing a wall
      if (
        this.genMaze.safeCell(currCell, direction, this.#maze) &&
        !currWallList
      ) {
        this.#player.changeLocation(direction);
        this.displayMaze();
      }
    }

    // check if at goal
  }
}

export default MazeManager;
