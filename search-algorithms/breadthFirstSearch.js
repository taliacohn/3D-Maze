import SearchAlgorithm from "./searchAlgorithm.js";
import Node from "./node.js";

//FIFO -
class BreadthFirstSearch extends SearchAlgorithm {
  #numOfNodesEvaluated;

  constructor() {
    super();
    this.#numOfNodesEvaluated = 0;
  }

  get numOfNodesEvaluated() {
    return this.#numOfNodesEvaluated;
  }

  search(searchable) {
    const startCell = searchable.startCell;
    const goalCell = searchable.goalCell;
    let startNode = new Node(startCell, null, 0); // Node = state, prevNode, cost
    let goalNode = new Node(goalCell, null, 0);
    let queue = new Array(); // FIFO
    let visited = new Set();

    queue.push(startNode);

    //while not empty
    while (queue.length > 0) {
      let node = queue.shift(); // chooses the shallowest node in queue
      let currNodeState = {
        level: node.state.level,
        row: node.state.row,
        col: node.state.col,
      };
      if (
        !visited.has(
          [currNodeState.level, currNodeState.row, currNodeState.col].toString()
        )
      ) {
        visited.add(
          [currNodeState.level, currNodeState.row, currNodeState.col].toString()
        );
      }

      if (super.checkGoal(node, searchable)) {
        this.#numOfNodesEvaluated = visited.size;
        return super.findPath(node); // return solution
      }

      const neighbors = searchable.getStateTransitions(
        currNodeState,
        searchable
      );

      if (neighbors) {
        // explore all neighbors
        for (const neighbor of neighbors) {
          let childNodeState =
            searchable.problem.maze[neighbor[0]][neighbor[1]][neighbor[2]];
          let childNode = new Node(childNodeState, node, 0);
          if (
            !visited.has(
              [
                childNodeState.level,
                childNodeState.row,
                childNodeState.col,
              ].toString()
            )
          ) {
            queue.push(childNode);
          }
        }
      }
    }
    return false;
  }
}

export default BreadthFirstSearch;
