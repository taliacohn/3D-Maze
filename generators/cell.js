/** Represents a cell in the maze game */
class Cell {
  constructor(level, row, col, maze) {
    this.level = level;
    this.row = row;
    this.col = col;
    //this.maze = maze;

    this.visited = false; //start as false

    /** Cell walls represented by true or false. True for wall, false for no wall. */
    this.wallList = {
      up: true,
      down: true,
      right: true,
      left: true,
      forward: true,
      backward: true,
      start: false,
      goal: false,
      player: false,
    };
  }
}

export default Cell;
