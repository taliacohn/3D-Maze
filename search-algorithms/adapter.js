// adapts 3D maze (instance of Maze3D) into a search problem (Searchable)
class MazeAdapter extends Searchable {
  constructor(problem) {
    // maze
    super(problem);
  }

  /**
   * Returns Map of  unvisited neighbors of given cell in problem
   * Checks if neighbors are on maze board and have been visited
   */
  getStateTransitions(cell, problem) {
    return this.problem.getUnvisitedNeighbors();
  }
}

export default MazeAdapter;
