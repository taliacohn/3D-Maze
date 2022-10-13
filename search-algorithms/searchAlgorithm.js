// defines all the common functionality of all the search algos
// all have a search function that gets any searchable and returns a solution

class SearchAlgorithm {
  #numberOfNodesEvaluated;

  constructor() {
    if (this.constructor === SearchAlgorithm) {
      throw new Error("Abstract method cannot be instantiated");
    }
    this.#numberOfNodesEvaluated;
  }

  checkGoal(node, maze) {
    if (
      node.state.level === maze.goalState.level &&
      node.state.row === maze.goalState.row &&
      node.state.col === maze.goalState.col
    ) {
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

  findPath(source, target) {
    let currNode = target;
    let path = [];
    while (currNode.parent) {
      path.unshift(currNode);
      currNode = currNode.parent;
    }
    return path;
  }
}

export default SearchAlgorithm;
