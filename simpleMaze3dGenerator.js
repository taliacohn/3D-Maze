/* Create a subclass of Maze3dGenerator named SimpleMaze3dGenerator 
thatchooses the locations of the walls randomly. To make sure 
that the maze has a solution, carve a random path from a random 
entrance to the maze to a random exit from the maze.
*/

import Maze3d from "./maze3d.js";
import Maze3dGenerator from "./maze3dGenerator.js";
import Cell from "./cell.js";

class SimpleMaze3dGenerator extends Maze3dGenerator{
    /**
     * 
     * @param {Maze3d} maze 
     */ 
    constructor(maze) {
        super(maze); 
        this.maze = maze;
    }

    generate() {
        for (let level = 0; level < this.maze.levels; level++) {
            for (let row = 0; row < this.maze.rows; row++) {
                for (let col = 0; col < this.maze.col; col++) {

                    /**
                     * @type {Cell}
                     */
                    const cell = this.maze.maze[level][row][col];
                    
                    // Generate random walls for each cell 
                    // call randomInt with max num 2 - get 0 or 1 (false or true)
                    cell.wallList.up = (level === 0) ? true : this.randomInt(2);
                    cell.wallList.down = (level === this.maze.levels - 1) ? true : this.randomInt(2);
                    cell.wallList.left = (col === 0) ? true : this.randomInt(2);
                    cell.wallList.right = (col === this.maze.columns - 1) ? true : this.randomInt(2);
                    cell.wallList.forward = (row === 0) ? true : this.randomInt(2);
                    cell.wallList.backward = (row === this.maze.rows - 1) ? true : this.randomInt(2);
                
                    // Assign neighbors
                    let neighborDown = level !== 0 ? maze.maze[level - 1][row][col]: undefined;
                    let neighborUp = level !== maze.maze.levels - 1 ? maze.maze[level + 1][row][col] : undefined;
                    let neigborForward = row !== maze.maze.rows - 1 ? maze.maze[level][row - 1][col]: undefined;
                    let neighborBackward = row !== 0 ? maze.maze[level][row + 1] : undefined;
                    let neighborRight = col !== maze.maze.columns - 1 ? maze.maze[level][row][col + 1] : undefined;
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

        // Choose random start and goal
        this.maze.start = this.randomCell(this.maze.levels, this.maze.rows, this.maze.columns);
        this.maze.goal = this.randomCell(this.maze.levels, this.maze.rows, this.maze.columns);
        
        while (this.maze.start[0] === this.maze.goal[0] &&
            this.maze.start[1] === this.maze.goal[1] &&
            this.maze.start[2] === this.maze.goal[2]) {
                this.maze.start = this.randomCell(this.maze.levels, this.maze.rows, this.maze.columns);
            }

        //carve path
        let currLoc = this.maze.maze[this.maze.start[0]][this.maze.start[1]][this.maze.start[2]];
        let nextLoc;

        // TO DO: change to a function that finds cells neighbors and finds a random neighbor
        while (currLoc[0] !== this.maze.goal[0] && currLoc[1] !== this.maze.goal[1] && currLoc[2] !== this.maze.goal[2]) {
            // Get random move
            const moveKey = this.getRandomNeighbor();
            const move = this.DIRECTIONS.get(moveKey);

            const nextLoc = this.maze.maze[currLoc[0] + move[0]][currLoc[1] + move[1]][currLoc[2] + move[2]];
            if (this.safeCell(move, this.maze)) {
                const currDist = this.checkDistance(currLoc, nextLoc);
                const nextDist = this.checkDistance(nextLoc, this.maze.goal);
                if (currDist > nextDist) {
                    this.breakWalls(currLoc, nextLoc)
                    currLoc = nextLoc;
                }
            }
        }
        console.log(this.maze.toString());
        return this.maze;
    }
}

export default SimpleMaze3dGenerator;

let maze = new Maze3d(5, 5, 2, [0, 0 , 0], [1, 3, 3]);
let newMaze = new SimpleMaze3dGenerator(maze);
newMaze.generate();
console.log(newMaze.measureAlgorithmTime());
