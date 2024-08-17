const prompt = require("prompt-sync")({ sigint: true });
const Field = require("./fieldClass.js");

const hole = "O";
const pathCharacter = "*";

const myField = new Field();

if (process.argv.at(2) === 'demo') {
    console.log('DEMO MODE');
    myField.demoMode();
} else {
    myField.generateMap();
}


const playGame = (key) => {
  // Note userInput is a buffer
  if (key == "\u001B\u005B\u0041") {
    myField.moveUp();
  }
  if (key == "\u001B\u005B\u0043") {
    myField.moveRight();
  }
  if (key == "\u001B\u005B\u0042") {
    myField.moveDown();
  }
  if (key == "\u001B\u005B\u0044") {
    myField.moveLeft();
  }

  if (key == "\u0003") {
    process.stdout.write("Thank you for playing\n");
    process.exit();
  }
  console.log(myField.toString());
  console.log('\n');
};

// Start Message
const startGameString = `\nWelcome to Find Your Hat
The objective of this game is to get your character (${pathCharacter})
to your hat without falling into a hole (${hole}) or backtracking
on your character (${pathCharacter}).

Controls:
- Use the arrows on your keyboard to move your character up, down,
  left, and right
- ^C to exit the game

Here is the starting board:
${myField.toString()}

Have fun!
`;

console.log(startGameString);


// Game Loop
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");

stdin.on("data", playGame);
