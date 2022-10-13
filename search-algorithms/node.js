//Node for searching
// Represents states
//Edges represent transitions between states
//Goal test is a set of goal nodes
//Data structures from which search tree is constructed
// each node has a parent, state, and various bookkeeping fields
class Node {
  #state;

  constructor(state, parent, cost) {
    this.#state = state;
    this.cost = cost;
    this.parent = parent;
  }

  get state() {
    return this.#state;
  }
}

export default Node;
