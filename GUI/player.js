/** Represents the player in the maze */
class Player {
  #level;
  #row;
  #col;

  constructor(maze) {
    this.src = "./images/robot.jpg";
    this.#level = level;
    this.#col = col;
    this.#row = row;
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

  changeLocation(level, row, col) {
    this.level = level;
    this.row = row;
    this.col = col;
  }
}

export default Player;
