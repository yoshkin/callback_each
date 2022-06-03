// @ts-check

const noop = () => {};

const once = (fn) => {
  let called = false;

  return (...args) => {
    if (called) return;
    called = true;
    fn(...args);
  };
};

// BEGIN (write your solution here)
const each = (coll, iteratee, callback = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  if (coll.length === 0) {
    callback(null);
    return;
  }

  const cb = (err) => {
    if (err) {
      oncedCallback(err);
      return;
    }
    completed += 1;
    if (completed === coll.length) {
      oncedCallback(null);
    }
  };

  coll.forEach((item) => iteratee(item, cb));
};

export default (coll, fn, callback) => {
  let result = [];
  each(coll, (item, cb) => {
    fn(item, (err, data) => {
      result = result.concat(data || []);
      cb(err);
    });
  }, (err) => {
    callback(err, result);
  });
};
// END
