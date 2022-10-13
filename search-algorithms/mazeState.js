import State from "./state.js"; 

class MazeState extends State {
    #node;

    constructor(node) {
        this.#node = node;
    }
    
    get node() {
        return this.#node;
    }

    toString() {
        return this.#node; // need to return as string to be able to compare two states
    }
}

export default MazeState;
