const canvas = document.getElementById('myCanvas');

canvas.width = 600;
canvas.height = 600;

canvas.style.border = '1px solid black';

const ctx = canvas.getContext('2d');

ctx.save();

ctx.moveTo(300, 300);
ctx.translate(300, 300);

for (let i = 0; i < 12; i++) {
  ctx.moveTo(150, 0);
  ctx.lineTo(170, 0);
  ctx.stroke();
  ctx.rotate(30 / 180 * Math.PI);
}
