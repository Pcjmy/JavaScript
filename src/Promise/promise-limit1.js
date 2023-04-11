const { urls, loadImg } = require('./mock')

class PromiseQueue {
  constructor(limit) {
    this.limit = limit
    this.cnt = 0
    this.list = []
  }
  add(task) {
    this.list.push(task)
    this.run()
  }
  run() {
    if (this.list.length === 0 || this.cnt === this.limit) {
      return
    }
    this.cnt ++
    const fn = this.list.shift()
    const promise = fn()
    promise.then(this.complete.bind(this)).catch(this.complete.bind(this))
  }
  complete() {
    this.cnt--
    this.run()
  }
}

const queue = new PromiseQueue(3)
urls.forEach(url => {
  queue.add(() => loadImg(url))
})