const canvas = document.getElementById('myCanvas');
canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid black';

const ctx = canvas.getContext('2d');
ctx.moveTo(100, 100);
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.arc(90, 100, 10, 0, 2 * Math.PI);
ctx.moveTo(90 + 10 * Math.sin(Math.PI / 4), 100 + 10 * Math.sin(Math.PI / 4));
ctx.lineTo(106, 116);
ctx.stroke();
