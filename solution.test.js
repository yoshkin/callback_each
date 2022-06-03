// @ts-check

import concat from '../solution';

describe('#concat', () => {
  it('set 1', () => {
    const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
    return new Promise((done) => {
      concat(coll, (item, callback) => {
        callback(null, item);
      }, (err, result) => {
        expect(result).toEqual(coll.reduce((acc, item) => acc.concat(item)));
        done();
      });
    });
  });

  it('set 2', () => {
    const callOrder = [];
    const iteratee = (x, cb) => {
      setTimeout(() => {
        callOrder.push(x);
        let y = x;
        const r = [];
        while (y > 0) {
          r.push(y);
          y -= 1;
        }
        cb(null, r);
      }, x * 25);
    };
    return new Promise((done) => {
      concat([1, 3, 2], iteratee, (err, results) => {
        expect(results).toEqual([1, 2, 1, 3, 2, 1]);
        expect(callOrder).toEqual([1, 2, 3]);
        expect(err === null).toBeTruthy();
        done();
      });
    });
  });

  it('set 3 error', () => {
    const iteratee = (x, cb) => {
      cb(new Error('test error'));
    };
    return new Promise((done) => {
      concat([1, 2, 3], iteratee, (err) => {
        expect(err).toBeInstanceOf(Error);
        done();
      });
    });
  });

  it('should work 2', () => {
    const coll = [];
    return new Promise((done) => {
      concat(coll, () => {
      }, () => {
        expect(true).toBe(true);
        done();
      });
    });
  });
});
