/* Define a class Maze3d that represents the maze as a 3-dimensional 
array of cells. Each cell has a Boolean array of 6 values that indicates 
whether the cell has a wall to either of its sides (left, right, forward, 
backward, up and down).

Implent a toString() method that returns a string displaying 
the maze. Figure 2 shows an example for how the string may look 
like in the console (you can choose your own format).
 */

import Cell from "./generators/cell.js";

class Maze3d {
  #rows;
  #columns;
  #levels;

  /**
   *
   * @param {number} rows
   * @param {number} columns
   * @param {number} levels
   * @param {Cell} start
   * @param {Cell} goal
   */
  constructor(levels, rows, columns) {
    this.#rows = rows; // y
    this.#columns = columns; // z
    this.#levels = levels; // x
    this.start;
    this.goal;
    this.cellInput = new Map([
      ["up", " \u2191 "],
      ["down", " \u2193 "],
      ["upDown", " \u2195 "],
      ["start", " S "],
      ["goal", " G "],
    ]);

    this.maze = new Array();

    // Initialize maze with cells
    for (let l = 0; l < this.#levels; l++) {
      let mazeBoard = [];
      for (let r = 0; r < this.#rows; r++) {
        let row = [];
        //this.maze[i][j] = new Array(this.columns);
        for (let c = 0; c < this.#columns; c++) {
          let cell = new Cell(l, r, c, this.maze);
          row.push(cell);
        }
        mazeBoard.push(row);
      }
      this.maze.push(mazeBoard);
    }
  }

  get rows() {
    return this.#rows;
  }

  get columns() {
    return this.#columns;
  }

  get levels() {
    return this.#levels;
  }

  toString() {
    let printMaze = "";
    let rowLine = "";

    const up = this.cellInput.get("up");
    const down = this.cellInput.get("down");
    const upDown = this.cellInput.get("upDown");
    const start = this.cellInput.get("start");
    const goal = this.cellInput.get("goal");

    for (let level = 0; level < this.#levels; level++) {
      // level
      printMaze += `Level ${level + 1}\n`;
      printMaze += "-" + "----".repeat(this.#columns) + "\n"; // start of top border

      for (let row = 0; row < this.#rows; row++) {
        for (let col = 0; col < this.#columns; col++) {
          /**
           * @type {Cell}
           */
          const cell = this.maze[level][row][col];

          if (col === 0 || cell.wallList.left) {
            printMaze += "|";
          } else {
            printMaze += " ";
          }

          if (cell.wallList.start) {
            printMaze += start;
          } else if (cell.wallList.goal) {
            printMaze += goal;
          } else if (!cell.wallList.up && !cell.wallList.down) {
            printMaze += upDown;
          } else if (!cell.wallList.up) {
            printMaze += up;
          } else if (!cell.wallList.down) {
            printMaze += down;
          } else {
            printMaze += "   ";
          }

          if (cell.wallList.forward && col === this.#columns - 1) {
            // not allowed forward & last col
            rowLine += " - |";
          } else if (col === this.#columns - 1) {
            // can go forward, last col
            rowLine += "   |";
          } else if (cell.wallList.forward) {
            // can't go forward
            rowLine += " - +";
          } else {
            rowLine += "   +";
          }
        }
        printMaze += "|\n|";
        if (row < this.#rows - 1) {
          printMaze += rowLine + "\n";
        }

        rowLine = "";
      }

      printMaze = printMaze.slice(0, printMaze.length - 1);
      printMaze += "-";
      for (let z = 0; z < this.#columns; z++) {
        printMaze += "----"; // bottom border
      }
      printMaze += "\n\n";
    }
    return printMaze;
  }
}
export default Maze3d;

// let maze = new Maze3d(2, 5, 5);
// console.log(maze.toString())
