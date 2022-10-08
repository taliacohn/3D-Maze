/* Create a subclass of Maze3dGenerator named SimpleMaze3dGenerator 
thatchooses the locations of the walls randomly. To make sure 
that the maze has a solution, carve a random path from a random 
entrance to the maze to a random exit from the maze.
*/

import Maze3dGenerator from "./maze3dGenerator.js";
import Cell from "./cell.js";

class SimpleMaze3dGenerator extends Maze3dGenerator{
    constructor(levels, rows, cols) {
        super(levels, rows, cols); 
    }

    // Returns instance of maze3d
    generate() {
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
        while (start[0] === goal[0] && start[1] === goal[1] && start[2] === goal[2]);

        for (let level = 0; level < maze.levels; level++) {
            for (let row = 0; row < maze.rows; row++) {
                for (let col = 0; col < maze.col; col++) {

                    /**
                     * @type {Cell}
                     */
                    const cell = maze.maze[level][row][col];
                    
                    // Generate random walls for each cell 
                    // call randomInt with max num 2 - get 0 or 1 (false or true)
                    cell.wallList.up = (level === 0) ? true : this.randomInt(2);
                    cell.wallList.down = (level === maze.levels - 1) ? true : this.randomInt(2);
                    cell.wallList.left = (col === 0) ? true : this.randomInt(2);
                    cell.wallList.right = (col === maze.columns - 1) ? true : this.randomInt(2);
                    cell.wallList.forward = (row === 0) ? true : this.randomInt(2);
                    cell.wallList.backward = (row === maze.rows - 1) ? true : this.randomInt(2);
                
                    // Assign neighbors
                    let neighborDown = level !== 0 ? maze.maze[level - 1][row][col]: undefined;
                    let neighborUp = level !== maze.levels - 1 ? maze.maze[level + 1][row][col] : undefined;
                    let neigborForward = row !== maze.rows - 1 ? maze.maze[level][row - 1][col]: undefined;
                    let neighborBackward = row !== 0 ? maze.maze[level][row + 1] : undefined;
                    let neighborRight = col !== maze.columns - 1 ? maze.maze[level][row][col + 1] : undefined;
                    let neighborLeft = col !== 0 ? maze.maze[level][row][col - 1] : undefined;

                    // Match walls to current cell walls
                    neighborDown.wallList.up = cell.wallList.down;
                    neighborUp.wallList.down = cell.wallList.up;
                    neigborForward.wallList.backward = cell.wallList.forward;
                    neighborBackward.wallList.forward = cell.wallList.backward;
                    neighborRight.wallList.left = cell.wallList.right;
                    neighborLeft.wallList.right = cell.wallList.left;
                }
            }
        }

        //carve path
        let currLoc = maze.maze[maze.start[0]][maze.start[1]][maze.start[2]];

        // TO DO: change to a function that finds cells neighbors and finds a random neighbor
        while (currLoc[0] !== maze.goal[0] && currLoc[1] !== maze.goal[1] && currLoc[2] !== maze.goal[2]) {
            // Get random move
            const moveKey = this.getRandomNeighbor();
            const move = this.DIRECTIONS.get(moveKey);

            const nextLoc = maze.maze[currLoc[0] + move[0]][currLoc[1] + move[1]][currLoc[2] + move[2]];
            if (this.safeCell(move, maze)) {
                const currDist = this.checkDistance(currLoc, nextLoc);
                const nextDist = this.checkDistance(nextLoc, maze.goal);
                if (currDist > nextDist) {
                    this.breakWalls(currLoc, nextLoc)
                    currLoc = nextLoc;
                }
            }
        }
        return maze;
    }
}

export default SimpleMaze3dGenerator;


