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

    const fulFilledFnWithCatch = (resolve, reject) => {
      try {
        fulFilledFn(this.value);
        resolve(this.value);
      } catch (e) {
        reject(e);
      }
    }

    const rejectedFnWithCatch = (resolve, reject) => {
      try {
        rejectedFn(this.value);
        if (this.isFunction(onRejected)) {
          resolve();
        }
      } catch (e) {
        reject(e)
      }
    }

    switch(this.status) {
      case FULFILLED: {
        return new Promise(fulFilledFnWithCatch);
      }
      case REJECTED: {
        return new Promise(rejectedFnWithCatch);
      }
      case PENDING: {
        return new MyPromise((resolve, reject) => {
          this.FULFILLED_CALLBACK_LIST.push(() => fulFilledFnWithCatch(resolve, reject));
          this.REJECTED_CALL_LIST.push(() => rejectedFnWithCatch(resolve, reject));
        })
      }
    }
  }

  isFunction(param) {
    return typeof param === 'function';
  }
}

const promise = new MyPromise((resolve, reject) => {})