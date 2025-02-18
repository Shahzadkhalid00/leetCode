/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    
   const cache = new Map();

  return function (...args) {
    const cacheData = cache.get(args[0]);

    if (!cacheData) {
      const result = fn(...args);

      const initialElement = [args, result]
      cache.set(args[0], [initialElement]);

      return result;
    }

    const exactCacheCase = cacheData.find(([allArgs]) => allArgs.length === args.length && allArgs.every((arg, idx) => arg === args[idx]));

    if (!exactCacheCase) {
      const result2 = fn(...args);

      cacheData.push([args, result2])
      cache.set(args[0], cacheData);

      return result2;
    }

    return exactCacheCase[1];
  };
}


/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */