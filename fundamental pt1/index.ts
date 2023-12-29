function checkIfInstanceOf(obj: any, classFunction: any): boolean {
    while (obj != null) {
      if (obj.constructor === classFunction) {
        return true;
      }
      obj = Object.getPrototypeOf(obj);
    }
    return false;
  }



//   2624

declare global {
    interface Array<T> {
      snail(rowsCount: number, colsCount: number): number[][];
    }
  }
  
  Array.prototype.snail = function (
    rowsCount: number,
    colsCount: number
  ): number[][] {
    if (rowsCount * colsCount != this.length) {
      return [];
    }
    const ans: number[][] = [];
    for (let i = 0; i < rowsCount; ++i) {
      ans.push([]);
    }
    for (let i = 0; i < rowsCount; ++i)
      for (let j = 0; j < colsCount; ++j) {
        const k = j * rowsCount + (j % 2 == 0 ? i : rowsCount - 1 - i);
        ans[i][j] = this[k];
      }
    return ans;
  };


//   2630 solution

type Fn = (...params: any) => any;

function memoize(fn: Fn): Fn {
  const root = new Map(); // trie
  const ansKey = {};
  return function (...params) {
    let node = root;
    for (const param of params) {
      let next = node.get(param);
      if (next === undefined) {
        next = new Map();
        node.set(param, next);
      }
      node = next;
    }

    // Check if `ansKey` has been set.
    if (node.has(ansKey)) return node.get(ansKey);
    const ans = fn(...params);
    node.set(ansKey, ans);
    return ans;
  };
}


// 2648 sol

function* fibGenerator(): Generator<number, any, number> {
    const arr = [0, 0, 1];
    while (true) {
      yield arr[1];
      arr[0] = arr[1];
      arr[1] = arr[2];
      arr[2] = arr[0] + arr[1];
    }
  }


//   2649 sol

type MultidimensionalArray = (MultidimensionalArray | number)[];

function* inorderTraversal(
  arr: MultidimensionalArray
): Generator<number, void, unknown> {
  for (const item of arr) {
    if (typeof item === 'number') {
      yield item;
    } else {
      yield* inorderTraversal(item);
    }
  }
}