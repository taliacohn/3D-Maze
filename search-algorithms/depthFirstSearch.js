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

    //check goal = node
    if (super.checkGoal(startNode, searchable)) {
      this.#numOfNodesEvaluated = visited.size;
      return super.findPath(startNode, goalNode); // return solution
    }

    stack.push(node.state); // visited, but not explored start node yet

    //while not empty
    while (stack.length > 0) {
      node = stack.pop(); // take one node from frontier to explore neighbors

      const neighbors = searchable.getStateTransitions(node, searchable); // gets a Map

      for (const value of neighbors.values()) {
        // explore all neighbors
        let childNode = new Node(value, node, 0);
        this.#numOfNodesEvaluated += 1;
        if (!visited.has(childNode.state) && !stack.has(childNode.state)) {
          //not in visited, not in frontier
          if (super.checkGoal(startNode, searchable)) {
            this.#numOfNodesEvaluated = visited.size;
            return super.findPath(startNode, goalNode); // return solution
          }
          stack.push(childNode.state);
        }
        visited.add(node.state); // add to explored
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
