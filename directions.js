class Directions {
  #directions;
  #right;
  #left;
  #up;
  #down;
  #forward;
  #backward;

  constructor() {
    this.#directions = new Map([
      ["right", [0, 0, 1]],
      ["left", [0, 0, -1]],
      ["up", [1, 0, 0]],
      ["down", [-1, 0, 0]],
      ["forward", [0, 1, 0]],
      ["backward", [0, -1, 0]],
    ]);

    this.#right = [0, 0, 1];
    this.#left = [0, 0, -1];
    this.#up = [1, 0, 0];
    this.#down = [-1, 0, 0];
    this.#forward = [0, 1, 0];
    this.#backward = [0, -1, 0];
  }

  get directions() {
    return this.#directions;
  }

  get right() {
    return this.#right;
  }

  get left() {
    return this.#left;
  }

  get up() {
    return this.#up;
  }

  get down() {
    return this.#down;
  }

  get forward() {
    return this.#forward;
  }

  get backward() {
    return this.#backward;
  }
}

export default Directions;
