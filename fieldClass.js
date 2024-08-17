const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor() {
    this.fieldArray = [];
    this.currentPosition = {};
  }

  demoMode() {
    this.fieldArray = [
      ["*", "░", "O"],
      ["░", "O", "░"],
      ["░", "^", "░"],
    ];
    this.currentPosition = { x: 0, y: 0 };
  }

  generateMap() {
    // Fill in map with empty spaces
    const map = [];
    for (let y = 0; y < 10; y++) {
      const row = [];
      for (let x = 0; x < 10; x++) {
        row.push(fieldCharacter);
      }
      map.push(row);
    }

    // Position Player
    const playerX = Math.floor(Math.random() * 10);
    const playerY = Math.floor(Math.random() * 10);
    map[playerY][playerX] = pathCharacter;

    // Place Goal
    let goalX, goalY;
    do {
      goalX = Math.floor(Math.random() * 10);
      goalY = Math.floor(Math.random() * 10);
    } while (map[goalY][goalX] === pathCharacter);
    map[goalY][goalX] = hat;

    // Placing Holes
    const numHoles = 15;
    for (let i = 0; i < numHoles; i++) {
      let holeX, holeY;
      do {
        holeX = Math.floor(Math.random() * 10);
        holeY = Math.floor(Math.random() * 10);
      } while (
        map[holeY][holeX] === pathCharacter ||
        map[holeY][holeX] === hole ||
        map[holeY][holeX] === hat
      );
      map[holeY][holeX] = "O";
    }

    this.fieldArray = map;
    this.currentPosition = { x: playerX, y: playerY };
  }

  get maxX() {
    return this.fieldArray[0].length - 1;
  }

  get maxY() {
    return this.fieldArray.length - 1;
  }

  updateMap() {
    const { x, y } = this.currentPosition;
    // Read Data Of New Co-ordinates
    const newCharacter = this.fieldArray[y][x];
    if (newCharacter === fieldCharacter) {
      // Overwrite with pathCharacter
      this.fieldArray[y][x] = pathCharacter;
    } else if (newCharacter === hole || newCharacter === pathCharacter) {
      process.stdout.write("Oops, Game Over\n");
      process.exit();
    } else if (newCharacter === hat) {
      process.stdout.write("Yay, You Win\n");
      process.exit();
    }
  }

  moveLeft() {
    const current_x = this.currentPosition["x"];
    const new_x = current_x > 0 ? current_x - 1 : this.maxX;
    this.currentPosition = { ...this.currentPosition, x: new_x };
    this.updateMap();
  }

  moveRight() {
    const current_x = this.currentPosition["x"];
    const new_x = current_x !== this.maxX ? current_x + 1 : 0;
    this.currentPosition = { ...this.currentPosition, x: new_x };
    this.updateMap();
  }

  moveUp() {
    const current_y = this.currentPosition["y"];
    const new_y = current_y !== 0 ? current_y - 1 : this.maxY;
    this.currentPosition = { ...this.currentPosition, y: new_y };
    this.updateMap();
  }

  moveDown() {
    const current_y = this.currentPosition["y"];
    const new_y = current_y !== this.maxY ? current_y + 1 : 0;
    this.currentPosition = { ...this.currentPosition, y: new_y };
    this.updateMap();
  }

  toString() {
    const stringArray = [];
    for (let row of this.fieldArray) {
      row = row.join(" ");
      stringArray.push(row);
    }
    const string = stringArray.join("\n");
    return string;
  }
}

module.exports = Field;
