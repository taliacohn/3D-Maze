// Can be used by any type of domain
// Key - needs to be string to compare
// When you develop neighbor of state, need to compare to current state
/* example:
const a = new State('a');
const b = new State('b');
const goal = new State('b');
console.log(b.equals(goal)) // true

possible states - location of player, visited 
*/

class State {
  #key;

  constructor(key) {
    if (this.constructor === State) {
      throw new Error("State cannot be initialized");
    }
    this.#key = key;
  }

  get key() {
    return this.#key;
  }

  // needds to be strings
  equals(other) {
    return other instanceof State && this.#key === other.#key;
  }
}

export default State;
