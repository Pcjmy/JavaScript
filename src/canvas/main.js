const canvas = document.getElementById('myCanvas');
canvas.style.border = '2px solid black';
console.log(canvas);

const ctx = canvas.getContext('2d');
console.log(ctx);

// ctx.fillRect(100, 100, 100, 100);
// ctx.strokeRect(300, 300, 100, 100);

ctx.moveTo(50, 50);
ctx.lineTo(100, 100);
ctx.lineTo(50, 100);
ctx.lineTo(50,50);
ctx.stroke();
