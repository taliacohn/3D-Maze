import Maze3dGenerator from "./maze3dGenerator.js";

/* Aldous-Broder algorithm produces uniform spanning trees
1. Pick a random cell as the current cell and mark it as visited
2. While there are unvisited cells:
    a) Pick a neighbor
    b) If the chosen nieghbour has not been visited:
        - Remove the wall between the current cell and chosen neighbour
        - Mark the chosen neighbour as visited 
    c) Make the chosen neighbour the current cell */

class AldousBroder3DMazeGenerator extends Maze3dGenerator {
    constructor(levels, rows, cols) {
        super(levels, rows, cols)
    }

    generate() {
        const maze = super.generate();

        let startValues = this.randomCell(maze.levels, maze.rows, maze.columns);
        let start = maze.maze[startValues.level][startValues.row][startValues.col]
        start.wallList.start = true;

        let cellsLeft = maze.levels * maze.rows * maze.columns - 1;
        let currLoc = maze.maze[start.level][start.row][start.col];

        while (cellsLeft) {
            let neighborMap = this.getAllNeighbors(currLoc, maze);
            let key = this.chooseRandomNeighbor(neighborMap);
            let nextLoc = neighborMap.get(key);

            if (!nextLoc.visited) {
                this.breakWalls(currLoc, nextLoc, key);
                currLoc.visited = true;
                currLoc = nextLoc;
                cellsLeft -= 1;
            } else {
                currLoc = nextLoc;
            }
        }
        currLoc.wallList.goal = true;

        return maze;
    }
}

export default AldousBroder3DMazeGenerator; 