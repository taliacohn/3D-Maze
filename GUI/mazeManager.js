import Cell from "../generators/cell.js";
import Maze3d from "../maze3d.js";

/** Represents maze game - manager of maze and player */
class MazeManager {
  #maze;
  #directions;
  #player;

  /**
   *
   * @param {Maze3d} maze
   * @param {Player} player
   */
  constructor(maze, player) {
    this.#maze = maze;
    this.#player = player;
    this.up = this.#maze.cellInput.get("up");
    this.down = this.#maze.cellInput.get("down");
    this.upDown = this.#maze.cellInput.get("upDown");
  }

  get maze() {
    return this.#maze;
  }

  get player() {
    return this.#player;
  }

  generateMaze(level) {
    const levelMessage = document.getElementById("levelNum");
    const mazeBox = document.getElementById("mazeBox");

    let width = (mazeBox.innerHTML = "");
    levelMessage.textContent = "";

    levelMessage.textContent = `Level ${level + 1}`;

    for (let x = 0; x < this.#maze.rows; x++) {
      for (let y = 0; y < this.#maze.columns; y++) {
        const displayCell = document.createElement("div");
        const cell = this.#maze.maze[level][x][y];
        const location = `${level}${x}${y}`;
        displayCell.className = "cell";
        displayCell.dataset.id = location;

        if (!cell.wallList.up && !cell.wallList.down) {
          displayCell.textContent = this.upDown;
        } else if (!cell.wallList.up) {
          displayCell.textContent = this.up;
        } else if (!cell.wallList.down) {
          displayCell.textContent = this.down;
        } else if (cell.wallList.goal) {
          displayCell.innerHTML += `<img src="./images/robot2.jpg" id="goal"`;
          displayCell.style.backgroundColor = "darkBlue";
        } else if (cell.wallList.start) {
          cell.wallList.player = true;
          const startCell = document.createElement("img");
          startCell.src = this.#player.src;
          displayCell.style.backgroundColor = "lightBlue";
          displayCell.appendChild(startCell);
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
        mazeBox.style.width = this.#maze.columns * 20 + "px";
        mazeBox.style.height = this.#maze.rows * 20 + "px";
      }
    }
  }
}
