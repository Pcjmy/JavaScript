const canvas = document.getElementById('myCanvas');
canvas.height = 500;
canvas.width = 500;
canvas.style.border = '1px solid black';

const ctx = canvas.getContext('2d');

const prePos = {
  x: 0,
  y: 0
}

let writeable = false;

canvas.addEventListener('mousemove', (e) => {
  if (writeable) {
    draw(e.offsetX, e.offsetY);
  }
})

canvas.addEventListener('mousedown', (e) => {
  writeable = true;
})

canvas.addEventListener('mouseup', (e) => {
  writeable = false;
  prePos.x = 0;
  prePos.y = 0;
})

function draw(x, y) {
  if (prePos.x === 0 && prePos.y === 0) {
    prePos.x = x;
    prePos.y = y;
  } else {
    ctx.moveTo(prePos.x, prePos.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    prePos.x = x;
    prePos.y = y;
  }
}
