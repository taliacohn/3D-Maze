import SearchAlgorithm from "./searchAlgorithm.js";
import Node from "./node.js";

//LIFO
class DepthFirstSearch extends SearchAlgorithm {
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
    let startNode = new Node(startCell, null, 0); // Node = state, prevNode, cost
    let goalNode = new Node(goalCell, null, 0);
    let stack = new Array(); // LIFO - visited, but not explored
    let visited = new Set(); // visited and explored

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
        !visited.has(
          [currNodeState.level, currNodeState.row, currNodeState.col].toString()
        )
      ) {
        visited.add(
          [currNodeState.level, currNodeState.row, currNodeState.col].toString()
        );
      }

      //check if node = goal
      if (super.checkGoal(node, searchable)) {
        this.#numOfNodesEvaluated = visited.size;
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
            !visited.has(
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

//LIFO queue

/*
  first take current node at top of stack, add starting point onto the stack before the loop
  then visit node, check if that's the solution. if yes, break
  otherwise, visit every path we can get to from the current path
  mark path as visited, push on stack 
  if we get to end of stack, we pop the previous path off stack, and keep searching
  makes assumption there is a solution 
    while (true) {
        currNode = stack.top();
        path.push(curNode.id);
        curNode.visited = true;
        if (currNode.id === targetNode.id) {
            break;
        }

        var unvisited = 0;
        currNode.adj.forEach(function(id) {
            var node = getNodebyId(graph, id);
            if (!node.visited) {
                stack.push(node);
                unvisited += 1;
            }
        })

        if (unvisited === 0) {
            stack.pop();
        }
    }

    */

export default DepthFirstSearch;
