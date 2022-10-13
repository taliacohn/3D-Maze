/* Class named SearchDemo with a method run() that does the following:

a) Generates a 3D maze using DFSMaze3dGenerator
b) Solves this maze using the three search algorithms
c) Prints the number of states that have been visited by each algorithm (you will have to generate large enough mazes to see the difference)

alg.search(new Maze Domain())
alg.search(new WordDomain())
*/

import BreadthFirstSearch from "./breadthFirstSearch.js";
import DepthFirstSearch from "./depthFirstSearch.js";
import AStar from "./aStar.js";
import DFSMaze3dGenerator from "../generators/DFSMaze3dGenerator.js";
import MazeAdapter from "./adapter.js";

class SearchDemo {
  run(levels, rows, cols) {
    const mazeGen = new DFSMaze3dGenerator(levels, rows, cols);
    const maze = mazeGen.generate();

    const adapter = new MazeAdapter(maze);

    const BFSSearch = new BreadthFirstSearch();
    BFSSearch.search(adapter);
    const BFSStatesVisited = BFSSearch.numOfNodesEvaluated;

    const DFSSearch = new DepthFirstSearch();
    DFSSearch.search(adapter);
    const DFSStatesVisited = DFSSearch.numOfNodesEvaluated;

    const AStarSearch = new AStar();
    AStarSearch.search(adapter);
    const AStarStatesVisited = AStarSearch.numOfNodesEvaluated;

    return `Number of states visited during search each algorithm:\nBreadth First Search: ${BFSStatesVisited}\n
    Depth First Search: ${DFSStatesVisited}\nA*: ${AStarStatesVisited}`;
  }
}

export default SearchDemo;
