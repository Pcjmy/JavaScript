const PENDING = 'pending';
const FULFILLED = 'fufilled';
const REJECTED = 'rejected';

class MyPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALL_LIST = [];
  _status = PENDING;

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

  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
    switch (newStatus) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach(callback => {
          callback(this.value);
        })
        break;
      }
      case REJECTED: {
        this.REJECTED_CALL_LIST.forEach(callback => {
          callback(this.reason);
        })
        break;
      }
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED;
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
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