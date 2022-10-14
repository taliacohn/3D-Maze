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
    const startCell = searchable.startCell;
    const goalCell = searchable.goalCell;
    let startNode = new Node(startCell, undefined, 0);
    let goalNode = new Node(goalCell, undefined, 0);
    let visited = new Set(); //nodes explored
    const frontier = new PriorityQueue( // will take initial node and heuristic(initial node);
      (node1, node2) => node1.distance < node2.distance
    );

    frontier.push(startNode);

    while (frontier.length > 0) {
      // get node with lowest cost
      let lowestIdx = lowestIdx(frontier);
    }
    let currNode = frontier[lowestIdx];
    frontier.splice(lowestIdx, 1);

    let currNodeState = super.getState(currNode);
    // if node not in visited, add it
    if (!visited.has([currNodeState[0], currNodeState[1], currNodeState[2]])) {
      visited.add(currNodeState);
    }

    //check goal = node
    if (super.checkGoal(currNode, searchable)) {
      this.#numOfNodesEvaluated = visited.size;
      return super.findPath(goalNode); // return solution
    }

    const neighbors = searchable.getStateTransitions(currNodeState, searchable);
    // if neighbors list not empty
    if (neighbors) {
      // explore all neighbors
      for (const neighbor of neighbors) {
        if (!visited.includes(neighbor)) {
          const gCost = currNode.cost + 1; // cost of getting to this node
          const hCost = this.heuristic(neighbor, goalNode.state); // estimated time to reach the finish from this node
          const fCost = gCost + hCost; // lower fCost is better - next cost
          let neighborState =
            searchable.problem.maze[neighbor[0]][neighbor[1]][neighbor[2]];
          const nextNode = new Node(neighborState, currNode, fCost);

          // check Frontier
          for (const obj of frontier) {
            let objState = this.getState(obj);
            if (
              objState[0] === neighborState.level &&
              objState[1] === neighborState.row &&
              objState[2] === neighborState.col
            ) {
              let frontierIdx = frontier.indexOf(obj);
              if (frontier[frontierIdx].cost >= nextNode.cost) {
                frontier.splice(frontierIdx, 1, nextNode);
              }
            } else {
              frontier.push(nextNode);
            }
          }
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
