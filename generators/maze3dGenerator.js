// Abstract class
/* 1. Define an abstract class named Maze3dGenerator that has:
(a) A method named generate that returns an instance of Maze3d. Determine what
should be the parameters of this method.
(b) A method named measure Algorithm Time that measures the time needed
to generate a maze. This method is identical to all the maze generating 
algorithms, therefore we would like to implement it here. The method should 
sample the current system time (by using Date.now), call generate, and then 
sample the system time again. Return the elapsed time as a string with proper units.
*/

import Maze3d from "../maze3d.js";
import Directions from "../directions.js";

class Maze3dGenerator {
  #levels;
  #rows;
  #columns;
  #DIRECTIONS;

  constructor(levels, rows, columns) {
    if (this.constructor === Maze3dGenerator) {
      throw new Error("Abstract class cannot be instantiated");
    }
    this.#levels = levels;
    this.#rows = rows;
    this.#columns = columns;

    this.#DIRECTIONS = new Directions();

    // this.#DIRECTIONS = new Map([
    //   ["right", [0, 0, 1]],
    //   ["left", [0, 0, -1]],
    //   ["up", [1, 0, 0]],
    //   ["down", [-1, 0, 0]],
    //   ["forward", [0, 1, 0]],
    //   ["backward", [0, -1, 0]],
    // ]);
  }

  get levels() {
    return this.#levels;
  }

  get rows() {
    return this.#rows;
  }

  get columns() {
    return this.#columns;
  }

  get DIRECTIONS() {
    return this.#DIRECTIONS;
  }

  // Returns instance of maze3d
  generate() {
    this.maze = new Maze3d(this.#levels, this.#rows, this.#columns);
    return this.maze;
  }

  measureAlgorithmTime() {
    const start = Date.now();
    this.generate();
    const end = Date.now();
    const runTime = end - start;
    //return `Runtime: ${(runTime / 1000).toFixed(2)}s`;
    return `Runtime: ${runTime} ms`;
  }

  randomCell(levels, rows, cols) {
    const level = Math.floor(Math.random() * levels);
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    return { level, row, col };
  }

  // Returns 1 or 0 for walls
  randomInt(num) {
    return Math.floor(Math.random() * num);
  }

  /**
   *
   * @param {Cell} cell
   * @param {Maze3d} maze
   * @returns boolean if cell is in maze
   */
  safeCell(cell, direction, maze) {
    // if inside grid - greater than 0 and less than # of levels/rows/cols
    if (
      cell.level + direction[0] < maze.levels &&
      cell.level + direction[0] >= 0 &&
      cell.row + direction[1] < maze.rows &&
      cell.row + direction[1] >= 0 &&
      cell.col + direction[2] < maze.columns &&
      cell.col + direction[2] >= 0
    ) {
      return true;
    }
    return false;
  }

  /**
   * Breaks wall for current cell and neighbour cell for given move in Directions map
   * @param {Cell} currLoc
   * @param {Cell} newLoc
   * @param {Map<key>} move
   */
  breakWalls(currLoc, newLoc, move) {
    switch (move) {
      case "right":
        currLoc.wallList.right = 0;
        newLoc.wallList.left = 0;
        break;
      case "left":
        currLoc.wallList.left = 0;
        newLoc.wallList.right = 0;
        break;
      case "up":
        currLoc.wallList.up = 0;
        newLoc.wallList.down = 0;
        break;
      case "down":
        currLoc.wallList.down = 0;
        newLoc.wallList.up = 0;
        break;
      case "forward":
        currLoc.wallList.forward = 0;
        newLoc.wallList.backward = 0;
        break;
      case "backward":
        currLoc.wallList.backward = 0;
        newLoc.wallList.forward = 0;
        break;
    }
  }

  getUnvisitedNeighbors(cell, maze) {
    let cellNeighbors = new Map();
    for (const [key, direction] of this.#DIRECTIONS.directions.entries()) {
      if (this.safeCell(cell, direction, maze)) {
        const neighbor =
          maze.maze[cell.level + direction[0]][cell.row + direction[1]][
            cell.col + direction[2]
          ];
        if (!neighbor.visited) {
          cellNeighbors.set(key, neighbor);
        }
      }
    }
    return cellNeighbors;
  }

  getAllNeighbors(cell, maze) {
    let cellNeighbors = new Map();
    for (const [key, direction] of this.#DIRECTIONS.directions.entries()) {
      if (this.safeCell(cell, direction, maze)) {
        const neighbor =
          maze.maze[cell.level + direction[0]][cell.row + direction[1]][
            cell.col + direction[2]
          ];
        cellNeighbors.set(key, neighbor);
      }
    }
    return cellNeighbors;
  }

  chooseRandomNeighbor(map) {
    let lst = [];
    for (const key of map.keys()) {
      lst.push(key);
    }

    if (lst.length !== 0) {
      let randomIdx = Math.floor(Math.random() * lst.length);
      let randomKey = lst[randomIdx];
      return randomKey;
    } else {
      return false;
    }
    //return randomNeighbor;
  }

  // returns random neighbor if safe
  // getRandomNeighbor(currLoc, maze) {

  //     const neighborIdx = Math.floor(Math.random(lst.length));
  //     const neighbor = lst[neighborIdx];

  //     if(this.safeCell(currLoc, neighbor, maze)) {
  //         return neighbor;
  //     } else {
  //         this.getRandomNeighbor(currLoc, maze);
  //     }
  // }

  checkDistance(currLoc, nextLoc) {
    const d = Math.sqrt(
      (currLoc.level - nextLoc.level) ** 2 +
        (currLoc.row - nextLoc.row) ** 2 +
        (currLoc.col - nextLoc.col) ** 2
    );
    return d;
  }

  assignNeighbors(level, row, col, maze) {
    let neighborDown = level !== 0 ? maze.maze[level - 1][row][col] : undefined;
    let neighborUp =
      level !== maze.levels - 1 ? maze.maze[level + 1][row][col] : undefined;
    let neighborBackward =
      row !== 0 ? maze.maze[level][row - 1][col] : undefined;
    let neighborForward =
      row !== maze.rows - 1 ? maze.maze[level][row + 1][col] : undefined;
    let neighborRight =
      col !== maze.columns - 1 ? maze.maze[level][row][col + 1] : undefined;
    let neighborLeft = col !== 0 ? maze.maze[level][row][col - 1] : undefined;

    return {
      neighborDown,
      neighborUp,
      neighborBackward,
      neighborForward,
      neighborRight,
      neighborLeft,
    };
  }

  matchNeighborWalls(neighbor, cell) {
    if (neighbor.neighborDown) {
      neighbor.neighborDown.wallList.up = cell.wallList.down;
    }
    if (neighbor.neighborUp) {
      neighbor.neighborUp.wallList.down = cell.wallList.up;
    }
    if (neighbor.neighborForward) {
      neighbor.neighborForward.wallList.backward = cell.wallList.forward;
    }
    if (neighbor.neighborBackward) {
      neighbor.neighborBackward.wallList.forward = cell.wallList.backward;
    }
    if (neighbor.neighborLeft) {
      neighbor.neighborLeft.wallList.right = cell.wallList.left;
    }
    if (neighbor.neighborRight) {
      neighbor.neighborRight.wallList.left = cell.wallList.right;
    }
  }
}

export default Maze3dGenerator;
