import Maze3d from "../maze3d.js";
import Searchable from "./searchable.js";

// adapts 3D maze (instance of Maze3D) into a search problem (Searchable)
class MazeAdapter extends Searchable {
  #problem;
  #startCell;
  #goalCell;

  constructor(problem) {
    super(problem);

    /**@type {Maze3d} */
    this.#problem = problem;
    this.#startCell = this.#problem.start;
    this.#goalCell = this.#problem.goal;
  }

  get problem() {
    return this.#problem;
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
    return this.problem.getUnvisitedNeighbors(cell, problem);
  }
}

export default MazeAdapter;
