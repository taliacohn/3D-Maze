/** Represents the player in the maze */
class Player {
  #level;
  #row;
  #col;

  constructor(maze, level, row, col) {
    this.src = "./GUI/images/player.png";
    this.#level = level;
    this.#col = col;
    this.#row = row;
    this.maze = maze;
  }

  get level() {
    return this.#level;
  }

  get row() {
    return this.#row;
  }

  get col() {
    return this.#col;
  }

  set level(num) {
    this.#level = num;
  }

  set row(num) {
    this.#row = num;
  }

  set col(num) {
    this.#col = num;
  }

  changeLocation(directionCell) {
    this.#level += directionCell[0];
    this.#row += directionCell[1];
    this.#col += directionCell[2];
  }
}

export default Player;
