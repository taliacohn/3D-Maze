class Cell {
    constructor(levelNum, rowNum, colNum, maze) {
        this.levelNum = levelNum;
        this.rowNum = rowNum;
        this.colNum = colNum; 
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
        };
    }
}

export default Cell; 