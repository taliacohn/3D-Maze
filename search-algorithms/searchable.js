/** Represents abstract class of general domain to be searched */
class Searchable {
  // #startState;
  // #goalState;

  constructor(problem) {
    if (this.constructor === Searchable) {
      throw new Error("Abstract class cannot be instantiated");
      // this.#goalState = problem.goal;
      // this.#startState = problem.start;
      this.problem = problem;
    }
  }

  get startState() {
    // return this.#startState; // get from 3D maze instance/problem
    throw new Error("Abstract method not implemented");
  }
  // initial node, root node

  get goalState() {
    // return this.#goalState; // get from 3D maze instance/problem
    throw new Error("Abstract method not implemented");
  }
  // does state == goal

  getStateTransitions(state) {
    throw new Error("Abstract method not implemented");
    // succ(initialState) = {(initialState -> neighbor)...}
    // has current state and next state
    // actions = directions
    // update location, update visited
  }
}

export default Searchable;
