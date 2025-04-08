const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const box = 20;
const canvasSize = canvas.width / box;

let snake = [{ x: 10, y: 10 }];
let direction = "RIGHT";
let food = { 
    x: Math.floor(Math.random() * canvasSize), 
    y: Math.floor(Math.random() * canvasSize) 
};
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key === 38 && direction !== "DOWN") direction = "UP";
    else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key === 40 && direction !== "UP") direction = "DOWN";
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x * box, food.y * box, box, box);
}

function drawSnake() {
    context.fillStyle = "lime";
    snake.forEach(segment => {
        context.fillRect(segment.x * box, segment.y * box, box, box);
    });
}

function updateSnake() {
    const head = { ...snake[0] };

    if (direction === "LEFT") head.x -= 1;
    if (direction === "RIGHT") head.x += 1;
    if (direction === "UP") head.y -= 1;
    if (direction === "DOWN") head.y += 1;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * canvasSize),
            y: Math.floor(Math.random() * canvasSize),
        };
        score += 10;
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize) return true;

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

function drawGame() {
    if (checkCollision()) {
        alert(`Game Over! Your score is ${score}`);
        document.location.reload();
        return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    updateSnake();

    setTimeout(drawGame, 100);
}

drawGame();
