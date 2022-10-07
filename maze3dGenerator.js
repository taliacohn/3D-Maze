// Abstract class
/* 1. Define an abstract class named Maze3dGenerator that has:
(a) A method named generate that returns an instance of Maze3d. Determine what
should be the parameters of this method.
(b) A method named measure Algorithm Time that measures the time needed
to generate a maze. This method is identical to all the maze generating 
algorithms, therefore we would like to implement it here. The method should 
sample the current system time (by using Date.now), call generate, and then 
sample the system time again. Return the elapsed time as a string with proper units.
*/

import Maze3d from "./maze3d.js";

class Maze3dGenerator {
    constructor() {
        if (this.constructor === Maze3dGenerator) {
            throw new Error('Abstract class cannot be instantiated');
        }
        this.DIRECTIONS = new Array([0, 0, 1], [0, 0, -1], [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0]);
        //level, row, column
        //right, left, up, down, forward, backward

        }

    generate(rows = 4, columns = 4, levels = 2, start, goal) {
        this.maze = new Maze3d(rows, columns, levels, start, goal);
        return this.maze;
    }

    measureAlgorithmTime() {
        const start = Date.now();
        this.generate();
        const end = Date.now();
        const runTime = (end - start).toFixed(2);
        return `Runtime: ${runTime / 1000}s`;
    }


    randomCell(maze) {
        const level = Math.floor(Math.random() * maze.levels);
        const row = Math.floor(Math.random() * maze.rows);
        const col = Math.floor(Math.random() * maze.columns);

        return [level][row][col];
    }
    
    // Returns 1 or 0 for walls
    randomInt(num) {
        return Math.floor(Math.random() * num)
    }

    cellInMaze(cell) {
        if (cell[0] > 0 && cell[0] < this.maze.levels &&
            cell[1] > 0 && cell[1] < this.maze.levels &&
            cell[2] > 0 && cell[2] < this.maze.columns) {
                return true;
            }
    }

    //this.DIRECTIONS = new Array([0, 0, 1], [0, 0, -1], [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0]);
                    //right, left, up, down, forward, backward

    breakWalls(currPos, newPos, move) {
        currPos = this.maze.maze[currPos[0]][currPos[1]][currPos[2]];
        newPos = this.maze.maze[newPos[0]][newPos[1]][newPos[2]];
        if (move[0] === 1) { //move up
            currPos.wallList[2] = 0;
            newPos.wallList[3] = 0; 
        } else if (move[0] === -1) { //move down 
            currPos.wallList[3] = 0;
            newPos.wallList[2] = 0; 
        } else if (move[1] === 1) { // forward
            currPos.wallList[4] = 0;
            newPos.wallList[5] = 0; 
        } else if (move[1] === -1) { //backward
            currPos.wallList[5] = 0;
            newPos.wallList[4] = 0; 
        } else if (move[2] === 1) { // rihgt
            currPos.wallList[0] = 0;
            newPos.wallList[1] = 0; 
        } else if (move[2] === -1) { // left
            currPos.wallList[1] = 0;
            newPos.wallList[0] = 0; 
        }

    }
}

export default Maze3dGenerator;