const boardSize = 20; //Sets the size of the board to 20x20 cells.
let snake = [{ x: 10, y: 10 }]; //The snake is represented as an array of positions (starting with one block in the center).
let direction = { x: 0, y: 0 }; //Direction of movement: initially set to no movement.
let food = {};
let score = 0;
let gameInterval; // stores interval ID for snake movement.
let isPaused = false; // tracks if the game is paused.

//accessing dom elements form html
const board = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const pauseButton = document.getElementById("pauseBtn");

//board drawing 
function createBoard() {
  board.innerHTML = "";
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const cell = document.createElement("div");//  creates a new div element to represent a single cell on board
      cell.classList.add("cell"); //add css class cell to newly created div...to define its border,size,bgcolor etc 
// Adds custom data-* attributes (data-x and data-y) to the cell.
// These help uniquely identify each cell's position on the board so they can be accessed later using coordinates.
// For example, cell at top-left corner will have data-x="0" and data-y="0".
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;
      board.appendChild(cell); //Adds the cell <div> to the board element (the game grid in the HTML).
    }
  }
}

//draw snake and food
function draw() { // clear previous food and snake
  document.querySelectorAll(".cell").forEach(cell => {
    cell.classList.remove("snake", "food");
  });

  snake.forEach(part => { // loop over each part of snake array
    const cell = getCell(part.x, part.y);  // returns div that had data part.x and part.y
    if (cell) cell.classList.add("snake"); // if cell found add snake class to that cell snake class is a css  wiht bg color green 
  });

  const foodCell = getCell(food.x, food.y); // get dom cell where food is currently placed using x and y coordinates
  if (foodCell) foodCell.classList.add("food");  // if food found add css food to that with bg clolor red
}

function getCell(x, y) {
  return document.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);  //Gets a specific cell element using its data-x and data-y.
}

//place food randomly
function placeFood() { 
  food = { // generating random food location
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };
  if (snake.some(part => part.x === food.x && part.y === food.y)) { // make sure food and snake coordiantes are not same
    placeFood();
  }
}


//function for moving snake 
function moveSnake() { 
  if (isPaused) return; // if game is paused dont move the snake 
  if (direction.x === 0 && direction.y === 0) return;  // no direction is set

  const head = { ...snake[0] };
  head.x += direction.x;
  head.y += direction.y; // calculating new head positon  based on direction 

    // checking the boundary conditions
  if (
    head.x < 0 || head.x >= boardSize ||
    head.y < 0 || head.y >= boardSize
  ) {
    return gameOver();
  }

  if (snake.some(part => part.x === head.x && part.y === head.y)) {
    return gameOver();  // ends game if snake hits the wall 
  }

  snake.unshift(head); // adds new head to front of snake 

  if (head.x === food.x && head.y === food.y) { // snake has come on food
    score++;
    scoreDisplay.textContent = score;
    placeFood(); // if snake eats food increase score and place new food
  } else {
    snake.pop(); // else remove tail 
  }

  draw(); // draw updated grid / board 
}

//function to change direction
function changeDirection(e) {
  const key = e.key;
  if (key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -1 };
  if (key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 1 };
  if (key === "ArrowLeft" && direction.x === 0) direction = { x: -1, y: 0 };
  if (key === "ArrowRight" && direction.x === 0) direction = { x: 1, y: 0 };
}

//function for gameover
function gameOver() {
  clearInterval(gameInterval);
  alert("Game Over! Your score: " + score);
  window.location.reload(); // stops the interval and reloads the page after showing an alert 
}


//start or restart  the game
function startGame() {  // resets snakes,score,direction 
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  scoreDisplay.textContent = score;
  isPaused = false;
  pauseButton.textContent = "Pause";
// rebuilds board and starts movement interval
  createBoard();
  placeFood();
  draw();
  document.addEventListener("keydown", changeDirection);
  clearInterval(gameInterval);
  gameInterval = setInterval(moveSnake, 150);
}

//main even listener 

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startBtn");

  startButton.addEventListener("click", () => {
    startButton.disabled = true;
    startGame();
    // starts the game when u click start 
  
  });

  pauseButton.addEventListener("click", () => {
    if (!gameInterval) return;
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "Resume" : "Pause";
  });
  // toggle ispaused state when u click pause/resume 
});
