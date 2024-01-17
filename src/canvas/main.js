const canvas = document.getElementById('myCanvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

canvas.style.backgroundColor = 'black';

const ctx = canvas.getContext('2d');

function calcDrawStartPos(img) {
  const x = (canvas.width - img.width) / 2;
  const y = (canvas.height - img.height) / 2;
  return {
    x, y
  }
}

const img1 = new Image();
img1.src = './assets/0001.png';

img1.onload = (e) => {
  const startPos = calcDrawStartPos(e.target);
  ctx.drawImage(e.target, startPos.x, startPos.y);
}

window.addEventListener('wheel', (e) => {
  console.log(e.deltaY);
})
