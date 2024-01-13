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


ctx.moveTo(200, 100);
ctx.lineTo(220, 100);
ctx.arc(220, 110, 10, 3 / 2 * Math.PI, 2 * Math.PI);
ctx.lineTo(230, 130);
ctx.arc(220, 130, 10, 0, Math.PI / 2);
ctx.lineTo(200, 140);
ctx.arc(200, 130, 10, Math.PI / 2, Math.PI);
ctx.lineTo(190, 110);
ctx.arc(200, 110, 10, Math.PI, 3 / 2 * Math.PI);
ctx.stroke();
