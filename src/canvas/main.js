const canvas = document.getElementById('myCanvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

canvas.style.backgroundColor = 'black';

const ctx = canvas.getContext('2d');

const imgsArr = [];

function calcDrawStartPos(img) {
  console.log(img.width, img.height);
  const x = (canvas.width - img.width) / 2;
  const y = (canvas.height - img.height) / 2;
  return {
    x, y
  }
}

function init() {
  for (let i = 1; i <= 64; i++) {
    const img = new Image();
    if (i < 10){
      img.src = `./assets/000${i}.png`;
    } else {
      img.src = `./assets/00${i}.png`;
    }
    imgsArr.push(img);
  }
}

init();

let imgCount = 0;

window.addEventListener('wheel', (e) => {
  console.log(e.deltaY);

  if (e.deltaY > 0 && imgCount < 63) {
    const startPos = calcDrawStartPos(imgsArr[imgCount]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgsArr[imgCount], startPos.x, startPos.y);
    imgCount++;
  } else if (e.deltaY < 0 && imgCount > 0) {
    imgCount--;
    const startPos = calcDrawStartPos(imgsArr[imgCount]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgsArr[imgCount], startPos.x, startPos.y);
  }
})
