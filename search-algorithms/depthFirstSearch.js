import SearchAlgorithm from "./searchAlgorithm.js";
import Node from "./node.js";

//LIFO
class DepthFirstSearch extends SearchAlgorithm {
  #numOfNodesEvaluated;
  constructor() {
    super();
    this.#numOfNodesEvaluated;
    this.visited;
  }

  get numOfNodesEvaluated() {
    return this.#numOfNodesEvaluated;
  }

  getStartCell() {
    const startCell = searchable.startCell;
    return startCell;
  }

  search(startCell, searchable) {
    let startNode = new Node(startCell, null, 0); // Node = state, prevNode, cost
    let stack = new Array(); // LIFO - visited, but not explored
    this.visited = new Set(); // visited and explored

    //let state = this.getState(startNode);
    stack.push(startNode); // visited, but not explored start node yet

    //while not empty
    while (stack.length > 0) {
      let node = stack.pop(); // take one node from frontier to explore neighbors

      let currNodeState = {
        level: node.state.level,
        row: node.state.row,
        col: node.state.col,
      };

      if (
        !this.visited.has(
          [currNodeState.level, currNodeState.row, currNodeState.col].toString()
        )
      ) {
        this.visited.add(
          [currNodeState.level, currNodeState.row, currNodeState.col].toString()
        );
      }

      //check if node = goal
      if (super.checkGoal(node, searchable)) {
        this.#numOfNodesEvaluated = this.visited.size;
        return super.findPath(node); // return solution
      }

      // get neighbours in array
      const neighbors = searchable.getStateTransitions(
        currNodeState,
        searchable
      );

      // if neighbors list not empty
      if (neighbors) {
        // explore all neighbors
        for (const neighbor of neighbors) {
          let childNodeState =
            searchable.problem.maze[neighbor[0]][neighbor[1]][neighbor[2]];
          let childNode = new Node(childNodeState, node, 0);
          if (
            !this.visited.has(
              [
                childNodeState.level,
                childNodeState.row,
                childNodeState.col,
              ].toString()
            )
          ) {
            stack.push(childNode);
          }
        }
      }
    }
    return false;
  }
}

export default DepthFirstSearch;
