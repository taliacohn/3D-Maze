/* Create a subclass of Maze3dGenerator named SimpleMaze3dGenerator 
thatchooses the locations of the walls randomly. To make sure 
that the maze has a solution, carve a random path from a random 
entrance to the maze to a random exit from the maze.
*/

import Maze3dGenerator from "./maze3dGenerator.js";
import Cell from "./cell.js";

//let newMaze = new SimpleMaze3dGenerator(2, 5, 5);

class SimpleMaze3dGenerator extends Maze3dGenerator{
    constructor(levels, rows, cols) {
        super(levels, rows, cols); 
    }

    generate() {
    // Returns instance of maze3d
        const maze = super.generate();
        let start;
        let goal;

        // Choose random start and goal
        do {
            let startValues = this.randomCell(maze.levels, maze.rows, maze.columns);
            start = maze.maze[startValues.level][startValues.row][startValues.col]
            start.wallList.start = true;
    
            let goalValues = this.randomCell(maze.levels, maze.rows, maze.columns);
            goal = maze.maze[goalValues.level][goalValues.row][goalValues.col]
            goal.wallList.goal = true;
        }
        while (start.level === goal.level && start.row === goal.row && start.col === goal.col);

        for (let level = 0; level < maze.levels; level++) {
            for (let row = 0; row < maze.rows; row++) {
                for (let col = 0; col < maze.columns; col++) {
                    

                    /**
                     * @type {Cell}
                     */
                    const cell = maze.maze[level][row][col];
                    
                    // Generate random walls for each cell 
                    // call randomInt with max num 2 - get 0 or 1 (false or true)
                    cell.wallList.down = (level === 0) ? true : this.randomInt(2);
                    cell.wallList.up = (level === maze.levels - 1) ? true : this.randomInt(2);
                    cell.wallList.left = (col === 0) ? true : this.randomInt(2);
                    cell.wallList.right = (col === maze.columns - 1) ? true : this.randomInt(2);
                    cell.wallList.forward = (row === 0) ? true : this.randomInt(2);
                    cell.wallList.backward = (row === maze.rows - 1) ? true : this.randomInt(2);

                    let neighbors = this.assignNeighbors(level, row, col, maze);
                    this.matchNeighborWalls(neighbors, cell);
                
                    // // Assign neighbors
                    // const neighborDown = level !== 0 ? maze.maze[level - 1][row][col]: undefined;
                    // const neighborUp = level !== maze.levels - 1 ? maze.maze[level + 1][row][col] : undefined;
                    // const neighborBackward = row !== 0 ? maze.maze[level][row - 1][col]: undefined;
                    // const neighborForward = row !== maze.rows - 1 ? maze.maze[level][row + 1][col] : undefined;
                    // const neighborRight = col !== maze.columns - 1 ? maze.maze[level][row][col + 1] : undefined;
                    // const neighborLeft = col !== 0 ? maze.maze[level][row][col - 1] : undefined;

                    // // Match walls to current cell walls
                    // if (neighborDown) {
                    //     neighborDown.wallList.up = cell.wallList.down;
                    // } 
                    // if (neighborUp) {
                    //     neighborUp.wallList.down = cell.wallList.up;
                    // } 
                    // if (neighborForward) {
                    //     neighborForward.wallList.backward = cell.wallList.forward;
                    // } 
                    // if (neighborBackward) {
                    //     neighborBackward.wallList.forward = cell.wallList.backward;
                    // } 
                    // if (neighborLeft) {
                    //     neighborLeft.wallList.right = cell.wallList.left;
                    // } 
                    // if (neighborRight) {
                    //     neighborRight.wallList.left = cell.wallList.right;
                    // }

                    // neighborDown.wallList.up = cell.wallList.down;
                    // neighborUp.wallList.down = cell.wallList.up;
                    // neighborForward.wallList.backward = cell.wallList.forward;
                    // neighborBackward.wallList.forward = cell.wallList.backward;
                    // neighborRight.wallList.left = cell.wallList.right;
                    // neighborLeft.wallList.right = cell.wallList.left;
                }
            }
        }

        //carve path
        let currLoc = maze.maze[start.level][start.row][start.col];
        let lstTried = new Set();

        while (currLoc != maze.maze[goal.level][goal.row][goal.col]) {
            // Get random move
            let moveKey = this.chooseRandomNeighbor(this.DIRECTIONS);
            let move = this.DIRECTIONS.get(moveKey);
            
            //const move = this.DIRECTIONS.get(moveKey);

            if (!lstTried.has(moveKey) && this.safeCell(currLoc, move, maze)) {
                const nextLoc = maze.maze[currLoc.level + move[0]][currLoc.row + move[1]][currLoc.col + move[2]];
                const currDist = this.checkDistance(currLoc, goal);
                const nextDist = this.checkDistance(nextLoc, goal);
                    if (currDist > nextDist) {
                        this.breakWalls(currLoc, nextLoc, moveKey);
                        currLoc = nextLoc;
                        moveKey = '';
                        lstTried = new Set();
                    }
            }
            lstTried.add(moveKey);

            
        }
        return maze;
    }
}

export default SimpleMaze3dGenerator;


