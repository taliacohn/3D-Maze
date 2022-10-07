class Cell {
    #wallList
    
    constructor(level, row, col, right = 1, left = 1, up = 0, down = 0, forward = 0, backward = 1) {
        // 1 for wall =, 0 for no wall
        this.#wallList = [right, left, up, down, forward, backward];
        this.level = level;
        this.row = row;
        this.col = col; 
    }

    get wallList() {
        return this.#wallList;
    }
 
    // set wallList(wallList) {
    //     this.#wallList = wallList;
    // }
}

export default Cell; 