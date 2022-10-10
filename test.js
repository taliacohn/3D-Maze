// import Maze3d from "./generators/maze3d.js";
// import Maze3dGenerator from "./generators/maze3dGenerator.js";
import SimpleMaze3dGenerator from "./generators/simpleMaze3dGenerator.js";
import DFSMaze3dGenerator from "./generators/DFSMaze3dGenerator.js";
import AldousBroder3DMazeGenerator from "./generators/aldousBroderMaze3DGenerator.js";

// add start/goal to maze 3d to test
// const maze = new Maze3d;
// console.log(maze.toString());

const maze1 = new SimpleMaze3dGenerator(5, 10, 10);
let maze2 = maze1.generate();
console.log(maze2.toString());
console.log(maze1.measureAlgorithmTime());

const maze3 = new DFSMaze3dGenerator(5, 10, 10);
let maze4 = maze3.generate();
console.log(maze4.toString());
console.log(maze3.measureAlgorithmTime());

const maze5 = new AldousBroder3DMazeGenerator(5, 10, 10);
let maze6 = maze5.generate();
console.log(maze6.toString());
console.log(maze5.measureAlgorithmTime());