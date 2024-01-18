const canvas = document.getElementById('myCanvas');

canvas.width = 600;
canvas.height = 600;

canvas.style.border = '1px solid black';

const ctx = canvas.getContext('2d');

const step = 1;
const initPos = {
  x: 200,
  y: 200,
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(initPos.x + 20, initPos.y);
  ctx.arc(initPos.x, initPos.y, 20, 0, 2 * Math.PI);
  ctx.fill();
  initPos.x += step;
  requestAnimationFrame(draw);
}

draw();
