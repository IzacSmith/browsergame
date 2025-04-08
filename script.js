const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

function draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(100, 100, 50, 50);
}

draw();
