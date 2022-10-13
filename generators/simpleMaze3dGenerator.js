/* Create a subclass of Maze3dGenerator named SimpleMaze3dGenerator 
thatchooses the locations of the walls randomly. To make sure 
that the maze has a solution, carve a random path from a random 
entrance to the maze to a random exit from the maze.
*/

import Maze3dGenerator from "./maze3dGenerator.js";
import Cell from "./cell.js";

//let newMaze = new SimpleMaze3dGenerator(2, 5, 5);

class SimpleMaze3dGenerator extends Maze3dGenerator {
  constructor(levels, rows, cols) {
    super(levels, rows, cols);
  }

  generate() {
    // Returns instance of maze3d
    const maze = super.generate();
    let goal;

    // Choose random start and goal
    do {
      let startValues = this.randomCell(maze.levels, maze.rows, maze.columns);
      maze.start =
        maze.maze[startValues.level][startValues.row][startValues.col];
      maze.start.wallList.start = true;

      let goalValues = this.randomCell(maze.levels, maze.rows, maze.columns);
      maze.goal = maze.maze[goalValues.level][goalValues.row][goalValues.col];
      maze.goal.wallList.goal = true;
    } while (
      maze.start.level === maze.goal.level &&
      maze.start.row === maze.goal.row &&
      maze.start.col === maze.goal.col
    );

    for (let level = 0; level < maze.levels; level++) {
      for (let row = 0; row < maze.rows; row++) {
        for (let col = 0; col < maze.columns; col++) {
          /**
           * @type {Cell}
           */
          const cell = maze.maze[level][row][col];

          // Generate random walls for each cell
          // call randomInt with max num 2 - get 0 or 1 (false or true)
          cell.wallList.down = level === 0 ? true : this.randomInt(2);
          cell.wallList.up =
            level === maze.levels - 1 ? true : this.randomInt(2);
          cell.wallList.left = col === 0 ? true : this.randomInt(2);
          cell.wallList.right =
            col === maze.columns - 1 ? true : this.randomInt(2);
          cell.wallList.forward = row === 0 ? true : this.randomInt(2);
          cell.wallList.backward =
            row === maze.rows - 1 ? true : this.randomInt(2);

          let neighbors = this.assignNeighbors(level, row, col, maze);
          this.matchNeighborWalls(neighbors, cell);
        }
      }
    }

    //carve path
    let currLoc = maze.maze[maze.start.level][maze.start.row][maze.start.col];
    let lstTried = new Set();

    while (
      currLoc != maze.maze[maze.goal.level][maze.goal.row][maze.goal.col]
    ) {
      // Get random move
      let moveKey = this.chooseRandomNeighbor(this.DIRECTIONS);
      let move = this.DIRECTIONS.get(moveKey);

      //const move = this.DIRECTIONS.get(moveKey);

      if (!lstTried.has(moveKey) && this.safeCell(currLoc, move, maze)) {
        const nextLoc =
          maze.maze[currLoc.level + move[0]][currLoc.row + move[1]][
            currLoc.col + move[2]
          ];
        const currDist = this.checkDistance(currLoc, maze.goal);
        const nextDist = this.checkDistance(nextLoc, maze.goal);
        if (currDist > nextDist) {
          this.breakWalls(currLoc, nextLoc, moveKey);
          currLoc = nextLoc;
          moveKey = "";
          lstTried = new Set();
        }
      }
      lstTried.add(moveKey);
    }
    return maze;
  }
}

export default SimpleMaze3dGenerator;
