const canvas = document.getElementById('myCanvas');
canvas.style.border = '2px solid black';
console.log(canvas);

const ctx = canvas.getContext('2d');
console.log(ctx);

// ctx.fillRect(100, 100, 100, 100);
// ctx.strokeRect(300, 300, 100, 100);

// canvas绘制三角形
ctx.lineWidth = 2;
ctx.strokeStyle = 'aqua';
ctx.moveTo(50, 50);
ctx.lineTo(100, 100);
ctx.lineTo(50, 100);
ctx.lineTo(50,50);
ctx.stroke();

// canvas绘制弧形
// arc(x, y, radius, startAngle, endAngle, anticlockwise)
ctx.lineWidth = 3;
ctx.strokeStyle = 'red';
ctx.beginPath();
ctx.arc(200, 200, 50, 0, 2 * Math.PI);
ctx.stroke();
