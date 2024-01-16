const canvas = document.getElementById('myCanvas');

canvas.width = 600;
canvas.height = 600;

canvas.style.border = '1px solid black';

const ctx = canvas.getContext('2d');

const now = new Date();

const hours = now.getHours() % 12;
const minutes = now.getMinutes();
const seconds = now.getSeconds();

ctx.save();

ctx.moveTo(300, 300);
ctx.translate(300, 300);
ctx.save();

for (let i = 0; i < 12; i++) {
  ctx.moveTo(150, 0);
  ctx.lineTo(170, 0);
  ctx.stroke();
  ctx.rotate(30 / 180 * Math.PI);
}

ctx.restore();
ctx.save();
ctx.beginPath();
ctx.lineWidth = 6;
ctx.lineCap = 'round';
const hourRotate = hours * (Math.PI / 6) + minutes * (Math.PI / 360) + seconds * (Math.PI / 21600);
ctx.rotate(hourRotate - Math.PI / 2);
ctx.moveTo(-20, 0);
ctx.lineTo(100, 0);
ctx.stroke();

const minuteRotate = minutes * (Math.PI / 30) + seconds * (Math.PI / 1800);
ctx.restore();
ctx.save();
ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.rotate(minuteRotate - Math.PI / 2);
ctx.moveTo(-20, 0);
ctx.lineTo(130, 0);
ctx.stroke();

const secondRotate = seconds * (Math.PI / 30);
ctx.restore();
ctx.save();
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.rotate(secondRotate - Math.PI / 2);
ctx.moveTo(-20, 0);
ctx.lineTo(135, 0);
ctx.stroke();
