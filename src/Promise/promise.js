const PENDING = 'pending';
const FULFILLED = 'fufilled';
const REJECTED = 'rejected';

class MyPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALL_LIST = [];

  constructor(fn) {
    this.status = PENDING;
    this.value = null;
    this.reson = null;

    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch(e) {
      this.reject(e)
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
    }
  }

  then(onFulfilled, onRejected) {
    const fulFilledFn = this.isFunction(onFulfilled) ? onFulfilled : (value) => {
      return value;
    }
    const rejectedFn = this.isFunction(onRejected) ? onRejected: (reason) => {
      throw reason;
    }

    switch(this.status) {
      case FULFILLED: {
        fulFilledFn(this.value);
        break;
      }
      case REJECTED: {
        rejectedFn(this.reason);
        break;
      }
      case PENDING: {
        this.FULFILLED_CALLBACK_LIST.push(fulFilledFn);
        this.REJECTED_CALL_LIST.push(rejectedFn);
        break;
      }
    }
  }

  isFunction(param) {
    return typeof param === 'function';
  }
}

const promise = new MyPromise((resolve, reject) => {})