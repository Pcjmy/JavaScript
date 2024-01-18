const canvas = document.getElementById('myCanvas');

canvas.width = 600;
canvas.height = 600;

canvas.style.border = '1px solid black';

const showCircle = document.getElementById('show-color-circle');
const selectCircle = document.getElementById('selected-color-circle');

const ctx = canvas.getContext('2d');

const img = new Image();
img.src = './assets/vip.png';

img.onload = function () {
  ctx.drawImage(img, 0, 0);
}

function pickColor(event, target) {
  console.log(event.offsetX, event.offsetY);
  const imgData = ctx.getImageData(event.offsetX, event.offsetY, 1, 1);
  console.log(imgData);
  const data = imgData.data;
  const colorData = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]/255})`;
  console.log(target);
  target.style.backgroundColor = colorData;
}

canvas.addEventListener('mousemove', (e) => {
  pickColor(e, showCircle);
})

canvas.addEventListener('click', (e) => {
  pickColor(e, selectCircle);
})
