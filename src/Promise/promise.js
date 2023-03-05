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

    const fulFilledFnWithCatch = (resolve, reject, newPromise) => {
      queueMicrotask(() => {
        try {
          if (!this.isFunction(onFulfilled)) {
            resolve(this.value);
          } else {
            const x = fulFilledFn(this.value);
            this.resolvePromise(newPromise, x, resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      })
    }

    const rejectedFnWithCatch = (resolve, reject, newPromise) => {
      queueMicrotask(() => {
        try {
          if (!this.isFunction(onRejected)) {
            reject(this.reason);
          } else {
            const x = rejectedFn(this.reason);
            this.resolvePromise(newPromise, x, resolve, reject);
          }
        } catch (e) {
          reject(e)
        }
      })
    }

    switch (this.status) {
      case FULFILLED: {
        const newPromise = new MyPromise((resolve, reject) => fulFilledFnWithCatch(resolve, reject, newPromise));
        return newPromise;
      }
      case REJECTED: {
        const newPromise = new MyPromise((resolve, reject) => rejectedFn(resolve, reject, newPromise));
        return newPromise;
      }
      case PENDING: {
        const newPromise = new MyPromise((resolve, reject) => {
          this.FULFILLED_CALLBACK_LIST.push(() => fulFilledFnWithCatch(resolve, reject, newPromise));
          this.REJECTED_CALL_LIST.push(() => rejectedFnWithCatch(resolve, reject, newPromise));
        });
        return newPromise;
      }
    }
  }

  resolvePromise(newPromise, x, resolve, reject) {
    if (newPromise === x) {
      return reject(new TypeError('ERROR'));
    }

    if (x instanceof MyPromise) {
      x.then(

      )
    } else if (typeof x === 'object' || this.isFunction(x)) {
      if (x === null) {
        return resolve(x);
      }

      let then = null;

      try {
        then = x.then;
      } catch (error) {
        return reject(error);
      }

      if (this.isFunction(then)) {
        let called = false;
        try {
          then.call(
            x,
            (y) => {
              if (called) {
                return ;
              }
              called = true;
              this.resolvePromise();
            }
          )
        } catch (error) {
          if (called) {
            return ;
          }
          reject(error);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }

  isFunction(param) {
    return typeof param === 'function';
  }
}

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
}).then(console.log);