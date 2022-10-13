import SearchAlgorithm from "./searchAlgorithm.js";

class AStar extends SearchAlgorithm {
  #numOfNodesEvaluated;
  constructor() {
    super();
    this.#numOfNodesEvaluated;
  }

  get numOfNodesEvaluated() {
    return this.#numOfNodesEvaluated;
  }

  search(searchable) {
    let startNode = new Node(searchable.startState, undefined, 0);
    let goalNode = new Node(searchable.goalState, undefined, 0);
    let visited = new Set(); //nodes explored
    const frontier = new PriorityQueue( // will take initial node and heuristic(initial node);
      (node1, node2) => node1.distance < node2.distance
    );

    frontier.push(startNode);

    while (frontier.length < 0) {
      // get node with lowest cost
      let lowestIdx = lowestIdx(frontier);
    }
    let currNode = frontier[lowestIdx];
    frontier.splice(lowestIdx, 1);
    visited.push(currNode);

    //check goal = node
    if (super.checkGoal(startNode, searchable)) {
      this.#numOfNodesEvaluated = visited.size;
      return super.findPath(startNode, goalNode); // return solution
    }

    const neighbors = searchable.getStateTransitions(node, searchable);
    for (const value of neighbors.values()) {
      const gCost = currNode.cost + 1; // cost of getting to this node
      const hCost = this.heuristic(value, goalNode.state); // estimated time to reach the finish from this node
      const fCost = gCost + hCost; // lower fCost is better - next cost
      const nextNode = new Node(value, currNode, fCost);

      if (!visited.has(nextNode) && !frontier.has(nextNode)) {
        frontier.push(nextNode);
      } else {
        let frontierIdx = frontier.indexOf(nextNode);
        if (frontier[frontierIdx].cost >= nextNode.cost) {
          frontier.splice(frontierIdx, 1, nextNode);
        }
      }
    }
  }

  heuristic(a, b) {
    //passes through two arrays
    const d1 = Math.abs(b[0] - a[0]);
    const d2 = Math.abs(b[1] - a[1]);
    const d3 = Math.abs(b[2] - a[2]);
    return d1 + d2 + d3;
  }

  lowestIndex(frontier) {
    let lowestIdx = 0;
    for (let i = 0; i < frontier.length; i++) {
      if (frontier[i].cost < frontier[lowestIdx].cost) {
        lowestIdx = i;
      }
    }
    return lowestIdx;
  }
}

export default AStar;

// for each state we define the min cost to get from the start to s: g(s)
// and estimated cost to get from s to the goal: h(s)
//estimates the cost of the path from s to the goal as f(s) = g(s) + h(s)
