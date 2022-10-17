// import Maze3d from "./generators/maze3d.js";
// import Maze3dGenerator from "./generators/maze3dGenerator.js";
import SimpleMaze3dGenerator from "./generators/simpleMaze3dGenerator.js";
import DFSMaze3dGenerator from "./generators/DFSMaze3dGenerator.js";
import AldousBroder3DMazeGenerator from "./generators/aldousBroderMaze3DGenerator.js";
import MazeAdapter from "./search-algorithms/adapter.js";
import DepthFirstSearch from "./search-algorithms/depthFirstSearch.js";
import BreadthFirstSearch from "./search-algorithms/breadthFirstSearch.js";
import AStar from "./search-algorithms/aStar.js";

// add start/goal to maze 3d to test
// const maze = new Maze3d;
// console.log(maze.toString());

// const maze1 = new SimpleMaze3dGenerator(3, 5, 5);
// let maze2 = maze1.generate();
// console.log(maze2.toString());
// console.log(maze1.measureAlgorithmTime());

const maze3 = new DFSMaze3dGenerator(2, 3, 3);
let maze4 = maze3.generate();
console.log(maze4.toString());
console.log(maze3.measureAlgorithmTime());

// const maze5 = new AldousBroder3DMazeGenerator(3, 5, 5);
// let maze6 = maze5.generate();
// console.log(maze6.toString());
// console.log(maze5.measureAlgorithmTime());

const adapter = new MazeAdapter(maze4);
const dfs = new DepthFirstSearch();
console.log(dfs.search(adapter));
console.log(dfs.numOfNodesEvaluated);

const bfs = new BreadthFirstSearch();
console.log(bfs.search(adapter));
console.log(bfs.numOfNodesEvaluated);

// const astar = new AStar();
// console.log(astar.search(adapter));
// console.log(astar.numOfNodesEvaluated);
