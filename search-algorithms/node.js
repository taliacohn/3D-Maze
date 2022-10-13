//Node for searching
// Represents states
//Edges represent transitions between states
//Goal test is a set of goal nodes
//Data structures from which search tree is constructed
// each node has a parent, state, and various bookkeeping fields
class Node {
  /** @type {Map<object, Node>} */

  constructor(state, parent, cost) {
    this.#state = state;
    this.cost = cost;
    this.parent = parent;

    this.#adjacencyList = new Map();
  }

  get state() {
    return this.#state;
  }

  addAdjacent(node, weight) {
    this.#adjacencyList.set(node.value, [node, weight]); // use array to store value
  }


  // Returns list of neighbours b/c adjacency list is private
  get neighbors() {
    // Return keys of Map - need names of cities
    return [...this.#adjacencyList.keys()];
  }

  get neighborNodes() {
    return [...this.#adjacencyList.values()].map((v) => v[0]);
  }
}
