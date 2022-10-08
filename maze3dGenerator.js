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
    /**
     * 
     * @param {Maze3d} maze 
     */
    constructor(maze) {
        if (this.constructor === Maze3dGenerator) {
            throw new Error('Abstract class cannot be instantiated');
        }
        this.DIRECTIONS = new Map([
            ['right', [0, 0, 1]], 
            ['left', [0, 0, -1]], 
            ['up', [1, 0, 0]], 
            ['down', [-1, 0, 0]], 
            ['forward', [0, 1, 0]], 
            ['backward', [0, -1, 0]]
        ]);
        this.maze = maze;
        //level, row, column
        //right, left, up, down, forward, backward

        }

    generate(start, goal, rows, columns, levels) {
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

    randomCell(levels, rows, cols) {
        const level = Math.floor(Math.random() * levels);
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);

        return [level, row, col];
    }
    
    // Returns 1 or 0 for walls
    randomInt(num) {
        return Math.floor(Math.random() * num)
    }

    /**
     * 
     * @param {Cell} cell 
     * @param {Maze3d} maze 
     * @returns boolean if cell is in maze
     */
    safeCell(cell, maze) {
        // if inside grid - greater than 0 and less than # of levels/rows/cols
        if (cell[0] > 0 && cell[0] < maze.maze.levels &&
            cell[1] > 0 && cell[1] < maze.maze.rows &&
            cell[2] > 0 && cell[2] < maze.maze.columns) {
                return true;
            }
        return false;
    }

    /**
     * Breaks wall for current cell and neighbour cell for given move in Directions map
     * @param {Cell} currLoc 
     * @param {Cell} newLoc 
     * @param {Map<key>} move 
     */
    breakWalls(currLoc, newLoc, move) {
        switch(move) {
            case 'right':
                currLoc.wallList.right = 0;
                newLoc.wallList.left = 0;
                break;
            case 'left':
                currLoc.wallList.left = 0;
                newLoc.wallList.right = 0;
                break;
            case 'up':
                currLoc.wallList.up = 0;
                newLoc.wallList.down = 0;
                break;
            case 'down':
                currLoc.wallList.down = 0;
                newLoc.wallList.up = 0;
                break;
            case 'forward':
                currLoc.wallList.forward = 0;
                newLoc.wallList.backward = 0;
                break;
            case 'backward':
                currLoc.wallList.backward = 0;
                newLoc.wallList.forward = 0;
                break;
        }
    }

    getRandomNeighbor(currLoc, maze) {
        let lst = [];
        for (const key of this.DIRECTIONS.keys()) {
            lst.push(key);
        }

        neighborIdx = Math.floor(Math.random(lst.length));
        return neighbor = lst[neighborIdx];
    }

    // /**
    //  * 
    //  * @param {Cell} currLoc 
    //  * @param {Maze3d} maze 
    //  * returns list of neighbors of current cell
    //  */
    // findNeighbors(currLoc, maze) {
    //     const level = currLoc[0];
    //     const row = currLoc[1];
    //     const col = currLoc[2];
    //     let neighbors = [];

    //     let down = level !== 0 ? maze.maze[level - 1][row][col]: undefined;
    //     let up = level !== maze.maze.levels - 1 ? maze.maze[level + 1][row][col] : undefined;
    //     let forward = row !== maze.maze.rows - 1 ? maze.maze[level][row - 1][col]: undefined;
    //     let backward = row !== 0 ? maze.maze[level][row + 1] : undefined;
    //     let right = col !== maze.maze.columns - 1 ? maze.maze[level][row][col + 1] : undefined;
    //     let left = col !== 0 ? maze.maze[level][row][col - 1] : undefined;

    //     if (up) neighbors.push(up);
    //     if (down) neighbors.push(down);
    //     if (forward) neighbors.push(forward);
    //     if (backward) neighbors.push(backward);
    //     if (right) neighbors.push(right);
    //     if (left) neighbors.push(left);

    //     return neighbors;
    // }

    checkDistance(currLoc, nextLoc) {
        const d = Math.sqrt((currLoc[0] - nextLoc[0] ** 2) + (currLoc[1] - nextLoc[1] ** 2) + (currLoc[2] - nextLoc[2] ** 2));
        return d;
    }
}

export default Maze3dGenerator;