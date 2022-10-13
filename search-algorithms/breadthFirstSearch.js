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
    let startNode = new Node(searchable.startState, undefined, 0); // Node = state, prevNode, cost
    let goalNode = new Node(searchable.goalState, undefined, 0);
    let queue = new Array(); // FIFO
    let visited = new Set();

    //check goal = node
    if (super.checkGoal(startNode, searchable)) {
      this.#numberOfNodesEvaluated = visited.size;
      return super.findPath(startNode, goalNode); // return solution
    }

    queue.push(startNode.state);

    //while not empty
    while (queue.length > 0) {
      // SHOULDNT THIS BE SHIFT SINCE FIFO?!?!?!
      const node = queue.shift(); // chooses the shallowest node in queue

      const neighbors = searchable.getStateTransitions(node, searchable); // gets a Map

      for (const value of neighbors.values()) {
        let childNode = new Node(value, node, 0);
        this.#numOfNodesEvaluated += 1;
        if (!visited.has(childNode.state) && !queue.has(childNode.state)) {
          //not in visited, not in frontier
          if (super.checkGoal(childNode, searchable)) {
            this.#numberOfNodesEvaluated = visited.size;
            return super.findPath();
          }
          queue.push(childNode.state);
        }
        visited.add(node.state); // add to explored
      }
    }
    return false;
  }
}

export default BreadthFirstSearch;
