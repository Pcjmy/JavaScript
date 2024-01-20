const animation = document.querySelector('#lottie');
console.log(animation);

animation.addEventListener('ready', () => {
  animation.resize();
  // animation.pause();
  animation.setDirection(-1);
  animation.setLooping(true);
})
