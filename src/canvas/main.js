const canvas = document.getElementById('myCanvas');
canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid black';

const ctx = canvas.getContext('2d');
ctx.save();
ctx.lineWidth = 2;
ctx.moveTo(100, 100);
ctx.lineTo(150, 100);
ctx.stroke();

ctx.save();
ctx.beginPath();
ctx.lineWidth = 6;
ctx.moveTo(100, 120);
ctx.lineTo(150, 120);
ctx.stroke();

ctx.save();
ctx.beginPath();
ctx.lineWidth = 10;
ctx.moveTo(100, 150);
ctx.lineTo(150, 150);
ctx.stroke();

ctx.save();
ctx.beginPath();
ctx.lineWidth = 12;
ctx.moveTo(100, 170);
ctx.lineTo(150, 170);
ctx.restore();
ctx.restore();
ctx.restore();
ctx.stroke();
