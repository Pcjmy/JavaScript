const canvas = document.getElementById('myCanvas');

canvas.width = 600;
canvas.height = 600;

canvas.style.border = '1px solid black';

const ctx = canvas.getContext('2d');

const img = new Image();
img.src = './assets/vip.png';

img.onload = function() {
  ctx.drawImage(img, 0, 0, img.width, img.height);
}
