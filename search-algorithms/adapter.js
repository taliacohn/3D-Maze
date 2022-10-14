import Maze3d from "../maze3d.js";
import Searchable from "./searchable.js";

// adapts 3D maze (instance of Maze3D) into a search problem (Searchable)
class MazeAdapter extends Searchable {
  #problem;
  #startCell;
  #goalCell;
  #DIRECTIONS;

  constructor(problem) {
    super(problem);

    /**@type {Maze3d} */
    this.#problem = problem;
    this.#startCell = this.#problem.start;
    this.#goalCell = this.#problem.goal;

    this.#DIRECTIONS = new Map([
      ["right", [0, 0, 1]],
      ["left", [0, 0, -1]],
      ["up", [1, 0, 0]],
      ["down", [-1, 0, 0]],
      ["forward", [0, 1, 0]],
      ["backward", [0, -1, 0]],
    ]);
  }

  get problem() {
    return this.#problem;
  }

  get directions() {
    return this.#DIRECTIONS;
  }

  get startCell() {
    return this.#startCell;
  }

  get goalCell() {
    return this.#goalCell;
  }

  /**
   * Returns Map of  unvisited neighbors of given cell in problem
   * Checks if neighbors are on maze board and have been visited
   */
  getStateTransitions(cell, problem) {
    let neighbors = [];

    const currCell = problem.problem.maze[cell.level][cell.row][cell.col];
    for (const [key, direction] of this.#DIRECTIONS.entries()) {
      let newNeighbor = [
        cell.level + direction[0],
        cell.row + direction[1],
        cell.col + direction[2],
      ];
      if (this.safeCell(newNeighbor, problem)) {
        if (key === "right" && !currCell.wallList.right) {
          neighbors.push(newNeighbor);
        } else if (key === "left" && !currCell.wallList.left) {
          neighbors.push(newNeighbor);
        } else if (key === "up" && !currCell.wallList.up) {
          neighbors.push(newNeighbor);
        } else if (key === "down" && !currCell.wallList.down) {
          neighbors.push(newNeighbor);
        } else if (key === "forward" && !currCell.wallList.forward) {
          neighbors.push(newNeighbor);
        } else if (key === "backward" && !currCell.wallList.backward) {
          neighbors.push(newNeighbor);
        }
      }
    }
    return neighbors;
  }

  safeCell(cell, maze) {
    // if inside grid - greater than 0 and less than # of levels/rows/cols
    if (
      maze.problem.levels > cell[0] >= 0 &&
      maze.problem.rows > cell[1] >= 0 &&
      maze.problem.columns > cell[2] >= 0
    ) {
      return true;
    }
    return false;
  }
}

export default MazeAdapter;
