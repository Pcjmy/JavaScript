const canvas = document.getElementById('myCanvas');

canvas.width = 600;
canvas.height = 600;

canvas.style.border = '1px solid black';

const ctx = canvas.getContext('2d');
const img = document.getElementById('img');
const aaa = document.getElementById('aaa');

const canvasImg = new Image();
canvasImg.src = './assets/vip.png';

canvasImg.onload = function () {
  ctx.drawImage(canvasImg, 0, 0);
  const data = canvas.toDataURL('image/png');
  img.src = data;
  aaa.href = data;
}

// https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial
