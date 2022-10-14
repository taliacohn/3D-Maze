// defines all the common functionality of all the search algos
// all have a search function that gets any searchable and returns a solution
import Cell from "../generators/cell.js";

class SearchAlgorithm {
  #numberOfNodesEvaluated;

  constructor() {
    if (this.constructor === SearchAlgorithm) {
      throw new Error("Abstract method cannot be instantiated");
    }
    this.#numberOfNodesEvaluated;
  }

  checkGoal(node, maze) {
    /** @type {Cell} */
    let state = this.getState(node);
    const level = state[0];
    const row = state[1];
    const col = state[2];

    /** @type {Cell} */
    const goalLevel = maze.goalCell.level;
    const goalRow = maze.goalCell.row;
    const goalCol = maze.goalCell.col;

    if (level === goalLevel && row === goalRow && col === goalCol) {
      return true;
    }
    return false;
  }

  search() {
    throw new Error("Abstract Method not implemented");
  }

  getNumberOfNodesEvaluated() {
    return this.#numberOfNodesEvaluated;
  }

  findPath(target) {
    let currNode = target;
    let path = [];
    while (currNode.parent) {
      let currNodeState = this.getState(currNode);
      path.unshift(currNodeState);
      currNode = currNode.parent;
    }
    return path;
  }

  getState(node) {
    /** @type {Cell} */
    const level = node.state.level;
    const row = node.state.row;
    const col = node.state.col;

    return [level, row, col];
  }
}

export default SearchAlgorithm;
