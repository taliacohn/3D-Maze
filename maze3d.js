/* Define a class Maze3d that represents the maze as a 3-dimensional 
array of cells. Each cell has a Boolean array of 6 values that indicates 
whether the cell has a wall to either of its sides (left, right, forward, 
backward, up and down).

Implent a toString() method that returns a string displaying 
the maze. Figure 2 shows an example for how the string may look 
like in the console (you can choose your own format).
 */

import Cell from "./cell.js";

class Maze3d {
    /**
     * 
     * @param {number} rows 
     * @param {number} columns 
     * @param {number} levels 
     */
    constructor(start, goal, rows = 5, columns = 5, levels = 2) {
        this.start = start;
        this.goal = goal;
        this.rows = rows; // y
        this.columns = columns; // z
        this.levels = levels; // x

        /**
         * @type {Array<Cell>}
         */
        this.maze = new Array();

        // Initialize maze with cells 
        for (let i = 0; i < this.levels; i++) {
            let mazeBoard = [];
            for (let j = 0; j < this.rows; j++) {
                let row = [];
                //this.maze[i][j] = new Array(this.columns);
                for (let k = 0; k < this.columns; k++) {
                    let c = new Cell(i, j, k);
                    row.push(c);
                }
                mazeBoard.push(row);
            }
            this.maze.push(mazeBoard);
        }
    }

    // get maze() {
    //     return this.maze;
    // }

    toString() {
        let printMaze = '';
        const up = '\u2191';
        const down = '\u2193';
        const upAndDown = '\u2195';
        let line = '';

        for (let x = 0; x < this.levels; x++) { // level
            printMaze += `Level ${x+1}\n`;
            printMaze += '-'; // start of top border

            for (let z = 0; z < this.columns; z++) {  
                printMaze += '----'; // top border
            }
            printMaze += '\n'; //next line

            // Maze [right, left, up, down, forward, backward]
            for (let row = 0; row < this.rows; row++) { 
                for (let col = 0; col < this.columns; col++) {
                    const cell = this.maze[x][row][col];

                    // if (cell.wallList.left || col === 0) { // left 
                    if (col === 0 || cell.wallList[1]) {
                        printMaze += '|';
                    } else {
                        printMaze += ' ';
                    }

                    if (this.start[0] === x &&
                        this.start[1] === row &&
                        this.start[2] === col) {
                            printMaze += ' S ';
                    } else if (this.goal[0] === x &&
                        this.goal[1] === row &&
                        this.goal[2] === col) {
                            printMaze += ' G '
                    } else if (!cell.wallList[2] && !cell.wallList[3]) {
                        printMaze += ' ' + upAndDown + ' ';
                    } else if (!cell.wallList[2]) {
                        printMaze += ' ' + up + ' ';
                    } else if (!cell.wallList[3]) {
                        printMaze += ' ' + down + ' '; 
                    } else {
                        printMaze += '   ';
                    }
                    
                    if (!cell.wallList[4] && col === this.columns - 1) { // not allowed forward & last col
                        line += ' - |';
                    } else if (col === this.columns - 1) { // can go forward, last col
                        line += '   |'
                    } else if (!cell.wallList[4]){ // can't go forward
                        line += ' - +';
                    } else {
                        line += '   +';
                    }
                }
                printMaze += '|\n|';
                if (row < this.rows - 1) {
                    printMaze += line + '\n';
                }
                
                line = '';

                //printMaze = printMaze.slice(0, printMaze.length - 1)
                //printMaze += '|\n'
            }

        printMaze = printMaze.slice(0, printMaze.length - 1)
        printMaze += '-'
        for (let z = 0; z < this.columns ; z++) {  
            printMaze += '----'; // bottom border
        }
        printMaze += '\n\n';
        }
        return printMaze;
    }
}
export default Maze3d;
    
let maze = new Maze3d([1, 6, 3], [2, 3, 4])
console.log(maze.toString())





