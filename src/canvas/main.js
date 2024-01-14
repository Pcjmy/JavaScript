const canvas = document.getElementById('myCanvas');
canvas.width = 600;
canvas.height = 600;
canvas.style.border = '1px solid black';

const ctx = canvas.getContext('2d');
ctx.lineWidth = 6;
ctx.lineCap = 'round';
ctx.moveTo(220, 200);
ctx.arc(200, 200, 20, 0, 2 * Math.PI);
ctx.stroke();

ctx.translate(200, 200);
ctx.rotate(-(Math.PI / 180) * 90);

for (let i = 0; i < 8; i++) {
  ctx.moveTo(30, 0);
  ctx.lineTo(50,0);
  ctx.stroke();
  ctx.rotate((Math.PI / 180) * 45);
}
