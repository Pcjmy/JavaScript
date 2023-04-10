const urls = [
  {
    info: 'link1',
    time: 3000
  },
  {
    info: 'link2',
    time: 1000
  },
  {
    info: 'link3',
    time: 2000
  },
  {
    info: 'link4',
    time: 5000
  },
  {
    info: 'link5',
    time: 2000
  },
  {
    info: 'link6',
    time: 3000
  },
]

function loadImg(url) {
  return new Promise((resolve, reject) => {
    console.log('---' + url.info + ' start!')
    setTimeout(() => {
      console.log(url.info + ' OK!!!')
      resolve()
    }, url.time)
  })
}

module.exports = {
  urls,
  loadImg
}
