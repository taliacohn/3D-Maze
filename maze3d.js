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
    constructor(rows, columns, levels, start, goal) {
        // this.start = start;
        // this.goal = goal;
        this.rows = rows; // y
        this.columns = columns; // z
        this.levels = levels; // x
        this.start = start;
        this.goal = goal;
        this.maze = new Array();
        this.stack =[];

        // Initialize maze with cells 
        for (let l = 0; l < this.levels; l++) {
            let mazeBoard = [];
            for (let r = 0; r < this.rows; r++) {
                let row = [];
                //this.maze[i][j] = new Array(this.columns);
                for (let c = 0; c < this.columns; c++) {
                    let cell = new Cell(l, r, c, this.maze);
                    row.push(cell);
                }
                mazeBoard.push(row);
            }
            this.maze.push(mazeBoard);
        }
    }


    toString() {
        let printMaze = '';
        const up = '\u2191';
        const down = '\u2193';
        const upAndDown = '\u2195';
        let rowLine = '';

        for (let level = 0; level < this.levels; level++) { // level
            printMaze += `Level ${level+1}\n`;
            printMaze += '-'; // start of top border

            //for (let z = 0; z < this.columns; z++) {  
            printMaze += '----'.repeat(this.columns); // top border
            printMaze += '\n'; //next line

            // Maze [right, left, up, down, forward, backward]

            // this.wallList = {
            //     up : true,
            //     down : true, 
            //     right : true,
            //     left : true,
            //     forward: true,
            //     backward : true,
            // };

            for (let row = 0; row < this.rows; row++) { 
                for (let col = 0; col < this.columns; col++) {
                    /**
                     * @type {Cell}
                     */
                    const cell = this.maze[level][row][col];

                    if (col === 0 || cell.wallList.left) {
                        printMaze += '|';
                    } else {
                        printMaze += ' ';
                    }

                    if (this.start[0] === level &&
                        this.start[1] === row &&
                        this.start[2] === col) {
                            printMaze += ' S ';
                    } else if (this.goal[0] === level &&
                        this.goal[1] === row &&
                        this.goal[2] === col) {
                            printMaze += ' G '
                    } else if (!cell.wallList.up && !cell.wallList.down) {
                        printMaze += ' ' + upAndDown + ' ';
                    } else if (!cell.wallList.up) {
                        printMaze += ' ' + up + ' ';
                    } else if (!cell.wallList.down) {
                        printMaze += ' ' + down + ' '; 
                    } else {
                        printMaze += '   ';
                    }
                    
                    if (cell.wallList.forward && col === this.columns - 1) { // not allowed forward & last col
                        rowLine += ' - |';
                    } else if (col === this.columns - 1) { // can go forward, last col
                        rowLine += '   |'
                    } else if (cell.wallList.forward){ // can't go forward
                        rowLine += ' - +';
                    } else {
                        rowLine += '   +';
                    }
                }
                printMaze += '|\n|';
                if (row < this.rows - 1) {
                    printMaze += rowLine + '\n';
                }
                
                rowLine = '';
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
    
let maze = new Maze3d(6, 6, 2, [0, 0, 0], [1, 2, 3]);
console.log(maze.toString())





