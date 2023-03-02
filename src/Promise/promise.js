const PENDING = 'pending'
const FUFILLED = 'fufilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(fn) {
    this.status = PENDING
    this.value = null
    this.reson = null

    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch(e) {
      this.reject(e)
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.status = FUFILLED
      this.value = value
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
    }
  }
}