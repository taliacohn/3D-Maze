/*  Create a subclass of Maze3dGenerator named DFSMaze3dGenerator that uses Depth 
First Search (DFS) to generate the maze (see Algorithm 1).
*/

import Maze3dGenerator from "./maze3dGenerator.js";

/**
 * DFS Maze Generator
 */
class DFSMaze3dGenerator extends Maze3dGenerator {
  constructor(levels, rows, cols) {
    super(levels, rows, cols);
  }

  generate() {
    const maze = super.generate();
    const startValues = this.randomCell(maze.levels, maze.rows, maze.columns);
    maze.start = maze.maze[startValues.level][startValues.row][startValues.col];
    maze.start.wallList.start = true;

    let stack = [];
    let visited = [];

    let currLoc = maze.maze[maze.start.level][maze.start.row][maze.start.col];
    currLoc.visited = true;

    do {
      let neighborMap = this.getUnvisitedNeighbors(currLoc, maze);
      let key = this.chooseRandomNeighbor(neighborMap);
      let nextLoc = neighborMap.get(key);

      // if there is a neighbor that hasn't been visited
      if (nextLoc) {
        nextLoc.visited = true;
        // add current cell to stack
        stack.push(currLoc);
        visited.push(currLoc);
        this.breakWalls(currLoc, nextLoc, key);
        currLoc = nextLoc;
      } else {
        let cell = stack.pop();
        currLoc = cell;
      }
    } while (stack.length > 0);

    // last curr cell when stack is empty = goal
    let goalCell = visited.pop();
    goalCell.wallList.goal = true;
    maze.goal = goalCell;

    return maze;
  }
}

export default DFSMaze3dGenerator;
