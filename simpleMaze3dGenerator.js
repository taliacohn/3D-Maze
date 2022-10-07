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
        for (let z = 0; z < this.maze.levels; z++) {
            for (let x = 0; x < this.maze.rows; x++) {
                for (let y = 0; y < this.maze.columns; y+2) {

                    /**
                     * @type {Cell}
                     */
                    const cell = this.maze.maze[z][x][y];
                    
                    // Generate random walls for each cell 
                    if (z === 0) {
                        cell.wallList[3] = 1; // can't go down
                    } else if (z === maze.levels - 1) {
                        cell.wallList[2] = 1; // can't go up
                    } else {
                        cell.wallList[3] = this.randomInt();
                        cell.wallList[2] = this.randomInt();
                    }

                    if (x === 0) { // top row
                        cell.wallList[4] = 1;
                    } else if (x === maze.rows -1) { // bottom row
                        cell.wallList[5] = 1;
                    } else {
                        cell.wallList[4] = this.randomInt();
                        cell.wallList[5] = this.randomInt()
                    }
                    
                    if (y === 0) { // left end
                        cell.wallList[1] = 1; 
                    } else if (y === maze.columns - 1) { // right end
                        cell.wallList[0] = 1;
                    } else {
                        cell.wallList[1] = this.randomInt();
                        cell.wallList[0] = this.randomInt();
                    }
                }
            }
        }

        for (let z = 0; z < maze.levels; z++) {
            for (let x = 0; x < maze.rows; x++) {
                for (let y = 0; y < maze.columns; y++) {

                    

                // make sure all walls of neighbor cells are the same
                /**
                 * @type {Cell}
                 */
                    const cell = maze.maze[z][x][y];


                    //this.DIRECTIONS = new Array([0, 0, 1], [0, 0, -1], [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0]);
                    //right, left, up, down, forward, backward


                    // making sure the neighbours match
                    for (i = 0; i < this.DIRECTIONS.length; i++) {
                        let newCell = maze.maze[cell[0] + this.DIRECTIONS[i][0]][cell[1] + this.DIRECTIONS[i][1]][cell[2] + this.DIRECTIONS[i][2]];

                        if (this.cellInMaze(newCell)) {
                            if (cell.wallList[i]) {
                                newCell.wallList[i] = 1;
                            } else {
                                newCell.wallList[i] = 0;
                            }

                        }
                    }
                }
            }
        }

        this.maze.start = this.randomCell(this.maze);
        this.maze.goal = this.randomCell(this.maze);
        

        while (this.maze.start[0] === this.maze.goal[0] &&
            this.maze.start[1] === this.maze.goal[1] &&
            this.maze.start[2] === this.maze.goal[2]) {
                this.maze.start = this.randomCell(this.maze);
            }

        let currPos = this.maze.maze[start[0]][start[1]][start[2]];

        //this.#wallList = [right, left, up, down, forward, backward]

        let nextPos;
        let moves;
        // complete while not at goal 
        do {
            if (currPos[0] < this.maze.goal[0]) {
                moves.push(this.DIRECTIONS[2]);
            } else if (currPos > goal[0]) {
                moves.push(this.DIRECTIONS[3]);
            }

            if (currPos[1] < goal[1]) {
                moves.push(this.DIRECTIONS[4]);
            } else if (currPos < goal[1]) {
                moves.push(this.DIRECTIONS[5]);
            }

            if (currPos[2] < goal[2]) {
                moves.push(this.DIRECTIONS[0]);
            } else if (currPos[2] > goal[2]) {
                moves.push(this.DIRECTIONS[1]);
            }

            while (moves) { //moves in list
                let move = moves[this.randomInt(this.DIRECTIONS.length)];
                nextPos = this.maze.maze[currPos[0] + move[0]][currPos[1] + move[1]][currPos[2] + move[2]];
                if (this.cellInMaze(nextPos)) {
                    this.breakWall(currPos, nextPos, move);
                }
                currPos = nextPos;
                nextPos = '';
            }
        }
        while (currPos[0] !== this.maze.goal[0] && currPos[1] !== this.maze.goal[1] && currPos[2] !== this.maze.goal[2]);
        
        console.log(this.maze.maze.toString());
        return this.maze;
    }
}

export default SimpleMaze3dGenerator;

let newMaze = new SimpleMaze3dGenerator();
newMaze.generate();
