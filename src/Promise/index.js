function getUser() {
  return fetch('./1.json');
}

function m1() {
  const user = getUser();
  return user;
}

function m2() {
  const user = m1();
  return user;
}

function m3() {
  const user = m2();
  return user;
}

function main() {
  // console.log(1);
  const user = m3();
  console.log(user);
}

function run(func) {
  // 1. 改动fetch
  const oldFetch = window.fetch;
  const cache = {
    status: 'pending',
    value: null,
  };
  function newFetch(...args) {
    // 有缓存返回缓存
    if (cache.status === 'fulfilled') {
      return cache.value;
    } else if (cache.status === 'rejected') {
      throw new cache.status;
    }
    // 没有缓存
    // 发送请求
    const p = oldFetch(...args)
      .then((data) => data.json())
      .then((data) => {
        // console.log('data=', data);
        cache.value = data;
        cache.status = 'fulfilled';
      })
      .catch((err) => {
        cache.value = err;
        cache.status = 'rejected';
      });
    // 抛出错误
    throw p;
  }
  window.fetch = newFetch;
  // 2. 执行func
  try {
    func();
  } catch(err) {
    if (err instanceof Promise) {
      err.finally(() => {
        window.fetch = newFetch;
        func();
        window.fetch = oldFetch;
      });
    }
  }
  // 3. 改回fetch
  window.fetch = oldFetch;
}

run(main);
