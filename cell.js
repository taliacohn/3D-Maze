class Cell {
    #wallList
    
    constructor(level, row, col, right = 0, left = 1, up = 0, down = 0, forward = 0, backward = 0) {
        // 1 for wall 
        this.#wallList = [right, left, up, down, forward, backward];
        this.level = level;
        this.row = row;
        this.col = col; 
    }

    get wallList() {
        return this.#wallList;
    }

    set wallList(wallList) {
        this.#wallList = wallList;
    }
}

export default Cell; 