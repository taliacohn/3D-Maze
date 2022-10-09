class Cell {
    constructor(level, row, col, maze) {
        this.level = level;
        this.row = row;
        this.col = col; 
        this.maze = maze;

        this.visited = false; //start as false

        // true for wall, false for no wall
        // start as true by default
        this.wallList = {
            up : true,
            down : true, 
            right : true,
            left : true,
            forward: true,
            backward : true,
            start: false,
            goal: false,
        };

    }
}

export default Cell; 