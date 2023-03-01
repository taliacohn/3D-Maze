import circularJSON from "../node_modules/circular-json/build/circular-json.max";
import DFSMaze3dGenerator from "../generators/DFSMaze3dGenerator.js";
import Player from "./player.js";
import Directions from "../directions.js";
import Cell from "../generators/cell.js";
import DepthFirstSearch from "../search-algorithms/depthFirstSearch.js";
import MazeAdapter from "../search-algorithms/adapter.js";

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
    this.gamePlay;
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

    this.gamePlay = true;
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
        displayCell.setAttribute("id", location);

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
      const startImg = new Image(this.width - 10, this.height - 10);
      startImg.src = this.#player.src;
      displayCell.appendChild(startImg);
      displayCell.className = "cell";
    } else if (cell.wallList.goal) {
      const goalImg = new Image(this.width - 10, this.height - 10);
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
    if (this.gamePlay) {
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
    }

    // check if at goal
    this.checkWin();
  }

  checkWin() {
    if (
      this.#player.level === this.#maze.goal.level &&
      this.#player.row === this.#maze.goal.row &&
      this.#player.col === this.#maze.goal.col
    ) {
      const mazeBox = document.getElementById("mazeBox");
      const gameBtns = document.getElementById("gamePlayBtns");
      mazeBox.firstChild.remove();
      gameBtns.hidden = true;
      mazeBox.innerHTML = "";
      mazeBox.style.backgroundColor = "darkBlue";
      const h2 = document.createElement("h2");
      h2.textContent = "You win!";

      h2.style.color = "white";
      h2.style.backgroundColor = "darkBlue";
      h2.style.fontSize = "5rem";

      h2.style.position = "absolute";
      h2.style.top = "30%";
      h2.style.transform = "translateY(-40%)";
      h2.style.left = "10%";

      mazeBox.appendChild(h2);
      this.gamePlay = false;
    }
  }

  solutionPath() {
    const currCell =
      this.#maze.maze[this.#player.level][this.#player.row][this.#player.col];
    const adapter = new MazeAdapter(this.#maze);
    const DFSSearch = new DepthFirstSearch();
    let path = DFSSearch.search(currCell, adapter);
    return path;
  }

  hint() {
    // from curr location
    const path = this.solutionPath();
    const nextMove = path[0];
    const nextMoveCell = document.getElementById(
      `${nextMove[0]}${nextMove[1]}${nextMove[2]}`
    );
    const currCell = document.getElementById(
      `${this.#player.level}${this.#player.row}${this.#player.row}`
    );

    if (nextMove[0] !== this.#player.level) {
      currCell.style.backgroundColor = "lightCoral";
    } else {
      nextMoveCell.style.backgroundColor = "lightCoral";
    }
  }

  solveGame() {
    const path = this.solutionPath();
    const numMoves = path.length;

    let moveNum = 0;
    const interval = setInterval(() => {
      if (moveNum === numMoves) {
        clearInterval(interval);
      }

      this.#player.level = path[moveNum][0];
      this.#player.row = path[moveNum][1];
      this.#player.col = path[moveNum][2];

      this.displayMaze();
      moveNum++;
    }, 400);
    return interval;
  }

  saveGame(name) {
    const saveError = document.querySelector("#saveGameBtn + p.error");

    if (localStorage.getItem("maze" + name)) {
      saveError.textContent = "Game with this name saved";
    } else {
      saveError.textContent = "";
      let mazeGame = circularJSON.stringify(this.#maze);
      localStorage.setItem("maze" + name, mazeGame);
    }
  }

  loadGame(name) {
    const loadError = document.querySelector("#loadMazeBtn + p.error");
    if (!localStorage.getItem("maze" + name)) {
      loadError.textContent = "No game with this name saved.";
    } else {
      loadError = "";
      mazeStr = localStorage.getItem("maze" + name);
      this.#maze = circularJSON.parse(mazeStr);
      this.displayMaze();
    }
  }
}

export default MazeManager;
