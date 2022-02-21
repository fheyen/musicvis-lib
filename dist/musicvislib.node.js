var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/dist/d3-array.js
var require_d3_array = __commonJS({
  "node_modules/.pnpm/d3-array@2.12.1/node_modules/d3-array/dist/d3-array.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      function ascending(a, b) {
        return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
      }
      function bisector(f) {
        let delta = f;
        let compare = f;
        if (f.length === 1) {
          delta = (d, x) => f(d) - x;
          compare = ascendingComparator(f);
        }
        function left(a, x, lo, hi) {
          if (lo == null)
            lo = 0;
          if (hi == null)
            hi = a.length;
          while (lo < hi) {
            const mid = lo + hi >>> 1;
            if (compare(a[mid], x) < 0)
              lo = mid + 1;
            else
              hi = mid;
          }
          return lo;
        }
        function right(a, x, lo, hi) {
          if (lo == null)
            lo = 0;
          if (hi == null)
            hi = a.length;
          while (lo < hi) {
            const mid = lo + hi >>> 1;
            if (compare(a[mid], x) > 0)
              hi = mid;
            else
              lo = mid + 1;
          }
          return lo;
        }
        function center(a, x, lo, hi) {
          if (lo == null)
            lo = 0;
          if (hi == null)
            hi = a.length;
          const i = left(a, x, lo, hi - 1);
          return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
        }
        return { left, center, right };
      }
      function ascendingComparator(f) {
        return (d, x) => ascending(f(d), x);
      }
      function number(x) {
        return x === null ? NaN : +x;
      }
      function* numbers(values, valueof) {
        if (valueof === void 0) {
          for (let value of values) {
            if (value != null && (value = +value) >= value) {
              yield value;
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (value = +value) >= value) {
              yield value;
            }
          }
        }
      }
      const ascendingBisect = bisector(ascending);
      const bisectRight = ascendingBisect.right;
      const bisectLeft = ascendingBisect.left;
      const bisectCenter = bisector(number).center;
      function count(values, valueof) {
        let count2 = 0;
        if (valueof === void 0) {
          for (let value of values) {
            if (value != null && (value = +value) >= value) {
              ++count2;
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (value = +value) >= value) {
              ++count2;
            }
          }
        }
        return count2;
      }
      function length$1(array2) {
        return array2.length | 0;
      }
      function empty(length2) {
        return !(length2 > 0);
      }
      function arrayify(values) {
        return typeof values !== "object" || "length" in values ? values : Array.from(values);
      }
      function reducer(reduce2) {
        return (values) => reduce2(...values);
      }
      function cross(...values) {
        const reduce2 = typeof values[values.length - 1] === "function" && reducer(values.pop());
        values = values.map(arrayify);
        const lengths = values.map(length$1);
        const j = values.length - 1;
        const index2 = new Array(j + 1).fill(0);
        const product = [];
        if (j < 0 || lengths.some(empty))
          return product;
        while (true) {
          product.push(index2.map((j2, i2) => values[i2][j2]));
          let i = j;
          while (++index2[i] === lengths[i]) {
            if (i === 0)
              return reduce2 ? product.map(reduce2) : product;
            index2[i--] = 0;
          }
        }
      }
      function cumsum(values, valueof) {
        var sum2 = 0, index2 = 0;
        return Float64Array.from(values, valueof === void 0 ? (v) => sum2 += +v || 0 : (v) => sum2 += +valueof(v, index2++, values) || 0);
      }
      function descending(a, b) {
        return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
      }
      function variance(values, valueof) {
        let count2 = 0;
        let delta;
        let mean3 = 0;
        let sum2 = 0;
        if (valueof === void 0) {
          for (let value of values) {
            if (value != null && (value = +value) >= value) {
              delta = value - mean3;
              mean3 += delta / ++count2;
              sum2 += delta * (value - mean3);
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (value = +value) >= value) {
              delta = value - mean3;
              mean3 += delta / ++count2;
              sum2 += delta * (value - mean3);
            }
          }
        }
        if (count2 > 1)
          return sum2 / (count2 - 1);
      }
      function deviation2(values, valueof) {
        const v = variance(values, valueof);
        return v ? Math.sqrt(v) : v;
      }
      function extent5(values, valueof) {
        let min4;
        let max9;
        if (valueof === void 0) {
          for (const value of values) {
            if (value != null) {
              if (min4 === void 0) {
                if (value >= value)
                  min4 = max9 = value;
              } else {
                if (min4 > value)
                  min4 = value;
                if (max9 < value)
                  max9 = value;
              }
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null) {
              if (min4 === void 0) {
                if (value >= value)
                  min4 = max9 = value;
              } else {
                if (min4 > value)
                  min4 = value;
                if (max9 < value)
                  max9 = value;
              }
            }
          }
        }
        return [min4, max9];
      }
      class Adder {
        constructor() {
          this._partials = new Float64Array(32);
          this._n = 0;
        }
        add(x) {
          const p = this._partials;
          let i = 0;
          for (let j = 0; j < this._n && j < 32; j++) {
            const y = p[j], hi = x + y, lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);
            if (lo)
              p[i++] = lo;
            x = hi;
          }
          p[i] = x;
          this._n = i + 1;
          return this;
        }
        valueOf() {
          const p = this._partials;
          let n = this._n, x, y, lo, hi = 0;
          if (n > 0) {
            hi = p[--n];
            while (n > 0) {
              x = hi;
              y = p[--n];
              hi = x + y;
              lo = y - (hi - x);
              if (lo)
                break;
            }
            if (n > 0 && (lo < 0 && p[n - 1] < 0 || lo > 0 && p[n - 1] > 0)) {
              y = lo * 2;
              x = hi + y;
              if (y == x - hi)
                hi = x;
            }
          }
          return hi;
        }
      }
      function fsum(values, valueof) {
        const adder = new Adder();
        if (valueof === void 0) {
          for (let value of values) {
            if (value = +value) {
              adder.add(value);
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if (value = +valueof(value, ++index2, values)) {
              adder.add(value);
            }
          }
        }
        return +adder;
      }
      function fcumsum(values, valueof) {
        const adder = new Adder();
        let index2 = -1;
        return Float64Array.from(values, valueof === void 0 ? (v) => adder.add(+v || 0) : (v) => adder.add(+valueof(v, ++index2, values) || 0));
      }
      class InternMap extends Map {
        constructor(entries, key = keyof) {
          super();
          Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
          if (entries != null)
            for (const [key2, value] of entries)
              this.set(key2, value);
        }
        get(key) {
          return super.get(intern_get(this, key));
        }
        has(key) {
          return super.has(intern_get(this, key));
        }
        set(key, value) {
          return super.set(intern_set(this, key), value);
        }
        delete(key) {
          return super.delete(intern_delete(this, key));
        }
      }
      class InternSet extends Set {
        constructor(values, key = keyof) {
          super();
          Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
          if (values != null)
            for (const value of values)
              this.add(value);
        }
        has(value) {
          return super.has(intern_get(this, value));
        }
        add(value) {
          return super.add(intern_set(this, value));
        }
        delete(value) {
          return super.delete(intern_delete(this, value));
        }
      }
      function intern_get({ _intern, _key }, value) {
        const key = _key(value);
        return _intern.has(key) ? _intern.get(key) : value;
      }
      function intern_set({ _intern, _key }, value) {
        const key = _key(value);
        if (_intern.has(key))
          return _intern.get(key);
        _intern.set(key, value);
        return value;
      }
      function intern_delete({ _intern, _key }, value) {
        const key = _key(value);
        if (_intern.has(key)) {
          value = _intern.get(value);
          _intern.delete(key);
        }
        return value;
      }
      function keyof(value) {
        return value !== null && typeof value === "object" ? value.valueOf() : value;
      }
      function identity(x) {
        return x;
      }
      function group8(values, ...keys) {
        return nest(values, identity, identity, keys);
      }
      function groups(values, ...keys) {
        return nest(values, Array.from, identity, keys);
      }
      function rollup(values, reduce2, ...keys) {
        return nest(values, identity, reduce2, keys);
      }
      function rollups(values, reduce2, ...keys) {
        return nest(values, Array.from, reduce2, keys);
      }
      function index(values, ...keys) {
        return nest(values, identity, unique, keys);
      }
      function indexes(values, ...keys) {
        return nest(values, Array.from, unique, keys);
      }
      function unique(values) {
        if (values.length !== 1)
          throw new Error("duplicate key");
        return values[0];
      }
      function nest(values, map2, reduce2, keys) {
        return function regroup(values2, i) {
          if (i >= keys.length)
            return reduce2(values2);
          const groups2 = new InternMap();
          const keyof2 = keys[i++];
          let index2 = -1;
          for (const value of values2) {
            const key = keyof2(value, ++index2, values2);
            const group9 = groups2.get(key);
            if (group9)
              group9.push(value);
            else
              groups2.set(key, [value]);
          }
          for (const [key, values3] of groups2) {
            groups2.set(key, regroup(values3, i));
          }
          return map2(groups2);
        }(values, 0);
      }
      function permute(source, keys) {
        return Array.from(keys, (key) => source[key]);
      }
      function sort(values, ...F) {
        if (typeof values[Symbol.iterator] !== "function")
          throw new TypeError("values is not iterable");
        values = Array.from(values);
        let [f = ascending] = F;
        if (f.length === 1 || F.length > 1) {
          const index2 = Uint32Array.from(values, (d, i) => i);
          if (F.length > 1) {
            F = F.map((f2) => values.map(f2));
            index2.sort((i, j) => {
              for (const f2 of F) {
                const c = ascending(f2[i], f2[j]);
                if (c)
                  return c;
              }
            });
          } else {
            f = values.map(f);
            index2.sort((i, j) => ascending(f[i], f[j]));
          }
          return permute(values, index2);
        }
        return values.sort(f);
      }
      function groupSort(values, reduce2, key) {
        return (reduce2.length === 1 ? sort(rollup(values, reduce2, key), ([ak, av], [bk, bv]) => ascending(av, bv) || ascending(ak, bk)) : sort(group8(values, key), ([ak, av], [bk, bv]) => reduce2(av, bv) || ascending(ak, bk))).map(([key2]) => key2);
      }
      var array = Array.prototype;
      var slice = array.slice;
      function constant(x) {
        return function() {
          return x;
        };
      }
      var e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
      function ticks(start, stop, count2) {
        var reverse2, i = -1, n, ticks2, step;
        stop = +stop, start = +start, count2 = +count2;
        if (start === stop && count2 > 0)
          return [start];
        if (reverse2 = stop < start)
          n = start, start = stop, stop = n;
        if ((step = tickIncrement(start, stop, count2)) === 0 || !isFinite(step))
          return [];
        if (step > 0) {
          let r0 = Math.round(start / step), r1 = Math.round(stop / step);
          if (r0 * step < start)
            ++r0;
          if (r1 * step > stop)
            --r1;
          ticks2 = new Array(n = r1 - r0 + 1);
          while (++i < n)
            ticks2[i] = (r0 + i) * step;
        } else {
          step = -step;
          let r0 = Math.round(start * step), r1 = Math.round(stop * step);
          if (r0 / step < start)
            ++r0;
          if (r1 / step > stop)
            --r1;
          ticks2 = new Array(n = r1 - r0 + 1);
          while (++i < n)
            ticks2[i] = (r0 + i) / step;
        }
        if (reverse2)
          ticks2.reverse();
        return ticks2;
      }
      function tickIncrement(start, stop, count2) {
        var step = (stop - start) / Math.max(0, count2), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
        return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
      }
      function tickStep(start, stop, count2) {
        var step0 = Math.abs(stop - start) / Math.max(0, count2), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
        if (error >= e10)
          step1 *= 10;
        else if (error >= e5)
          step1 *= 5;
        else if (error >= e2)
          step1 *= 2;
        return stop < start ? -step1 : step1;
      }
      function nice(start, stop, count2) {
        let prestep;
        while (true) {
          const step = tickIncrement(start, stop, count2);
          if (step === prestep || step === 0 || !isFinite(step)) {
            return [start, stop];
          } else if (step > 0) {
            start = Math.floor(start / step) * step;
            stop = Math.ceil(stop / step) * step;
          } else if (step < 0) {
            start = Math.ceil(start * step) / step;
            stop = Math.floor(stop * step) / step;
          }
          prestep = step;
        }
      }
      function sturges(values) {
        return Math.ceil(Math.log(count(values)) / Math.LN2) + 1;
      }
      function bin() {
        var value = identity, domain = extent5, threshold = sturges;
        function histogram(data) {
          if (!Array.isArray(data))
            data = Array.from(data);
          var i, n = data.length, x, values = new Array(n);
          for (i = 0; i < n; ++i) {
            values[i] = value(data[i], i, data);
          }
          var xz = domain(values), x0 = xz[0], x1 = xz[1], tz = threshold(values, x0, x1);
          if (!Array.isArray(tz)) {
            const max9 = x1, tn = +tz;
            if (domain === extent5)
              [x0, x1] = nice(x0, x1, tn);
            tz = ticks(x0, x1, tn);
            if (tz[tz.length - 1] >= x1) {
              if (max9 >= x1 && domain === extent5) {
                const step = tickIncrement(x0, x1, tn);
                if (isFinite(step)) {
                  if (step > 0) {
                    x1 = (Math.floor(x1 / step) + 1) * step;
                  } else if (step < 0) {
                    x1 = (Math.ceil(x1 * -step) + 1) / -step;
                  }
                }
              } else {
                tz.pop();
              }
            }
          }
          var m = tz.length;
          while (tz[0] <= x0)
            tz.shift(), --m;
          while (tz[m - 1] > x1)
            tz.pop(), --m;
          var bins = new Array(m + 1), bin2;
          for (i = 0; i <= m; ++i) {
            bin2 = bins[i] = [];
            bin2.x0 = i > 0 ? tz[i - 1] : x0;
            bin2.x1 = i < m ? tz[i] : x1;
          }
          for (i = 0; i < n; ++i) {
            x = values[i];
            if (x0 <= x && x <= x1) {
              bins[bisectRight(tz, x, 0, m)].push(data[i]);
            }
          }
          return bins;
        }
        histogram.value = function(_) {
          return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
        };
        histogram.domain = function(_) {
          return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
        };
        histogram.thresholds = function(_) {
          return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), histogram) : threshold;
        };
        return histogram;
      }
      function max8(values, valueof) {
        let max9;
        if (valueof === void 0) {
          for (const value of values) {
            if (value != null && (max9 < value || max9 === void 0 && value >= value)) {
              max9 = value;
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (max9 < value || max9 === void 0 && value >= value)) {
              max9 = value;
            }
          }
        }
        return max9;
      }
      function min3(values, valueof) {
        let min4;
        if (valueof === void 0) {
          for (const value of values) {
            if (value != null && (min4 > value || min4 === void 0 && value >= value)) {
              min4 = value;
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (min4 > value || min4 === void 0 && value >= value)) {
              min4 = value;
            }
          }
        }
        return min4;
      }
      function quickselect(array2, k, left = 0, right = array2.length - 1, compare = ascending) {
        while (right > left) {
          if (right - left > 600) {
            const n = right - left + 1;
            const m = k - left + 1;
            const z = Math.log(n);
            const s = 0.5 * Math.exp(2 * z / 3);
            const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            quickselect(array2, k, newLeft, newRight, compare);
          }
          const t = array2[k];
          let i = left;
          let j = right;
          swap(array2, left, k);
          if (compare(array2[right], t) > 0)
            swap(array2, left, right);
          while (i < j) {
            swap(array2, i, j), ++i, --j;
            while (compare(array2[i], t) < 0)
              ++i;
            while (compare(array2[j], t) > 0)
              --j;
          }
          if (compare(array2[left], t) === 0)
            swap(array2, left, j);
          else
            ++j, swap(array2, j, right);
          if (j <= k)
            left = j + 1;
          if (k <= j)
            right = j - 1;
        }
        return array2;
      }
      function swap(array2, i, j) {
        const t = array2[i];
        array2[i] = array2[j];
        array2[j] = t;
      }
      function quantile2(values, p, valueof) {
        values = Float64Array.from(numbers(values, valueof));
        if (!(n = values.length))
          return;
        if ((p = +p) <= 0 || n < 2)
          return min3(values);
        if (p >= 1)
          return max8(values);
        var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = max8(quickselect(values, i0).subarray(0, i0 + 1)), value1 = min3(values.subarray(i0 + 1));
        return value0 + (value1 - value0) * (i - i0);
      }
      function quantileSorted(values, p, valueof = number) {
        if (!(n = values.length))
          return;
        if ((p = +p) <= 0 || n < 2)
          return +valueof(values[0], 0, values);
        if (p >= 1)
          return +valueof(values[n - 1], n - 1, values);
        var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = +valueof(values[i0], i0, values), value1 = +valueof(values[i0 + 1], i0 + 1, values);
        return value0 + (value1 - value0) * (i - i0);
      }
      function freedmanDiaconis(values, min4, max9) {
        return Math.ceil((max9 - min4) / (2 * (quantile2(values, 0.75) - quantile2(values, 0.25)) * Math.pow(count(values), -1 / 3)));
      }
      function scott(values, min4, max9) {
        return Math.ceil((max9 - min4) / (3.5 * deviation2(values) * Math.pow(count(values), -1 / 3)));
      }
      function maxIndex(values, valueof) {
        let max9;
        let maxIndex2 = -1;
        let index2 = -1;
        if (valueof === void 0) {
          for (const value of values) {
            ++index2;
            if (value != null && (max9 < value || max9 === void 0 && value >= value)) {
              max9 = value, maxIndex2 = index2;
            }
          }
        } else {
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (max9 < value || max9 === void 0 && value >= value)) {
              max9 = value, maxIndex2 = index2;
            }
          }
        }
        return maxIndex2;
      }
      function mean2(values, valueof) {
        let count2 = 0;
        let sum2 = 0;
        if (valueof === void 0) {
          for (let value of values) {
            if (value != null && (value = +value) >= value) {
              ++count2, sum2 += value;
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (value = +value) >= value) {
              ++count2, sum2 += value;
            }
          }
        }
        if (count2)
          return sum2 / count2;
      }
      function median2(values, valueof) {
        return quantile2(values, 0.5, valueof);
      }
      function* flatten(arrays) {
        for (const array2 of arrays) {
          yield* array2;
        }
      }
      function merge(arrays) {
        return Array.from(flatten(arrays));
      }
      function minIndex2(values, valueof) {
        let min4;
        let minIndex3 = -1;
        let index2 = -1;
        if (valueof === void 0) {
          for (const value of values) {
            ++index2;
            if (value != null && (min4 > value || min4 === void 0 && value >= value)) {
              min4 = value, minIndex3 = index2;
            }
          }
        } else {
          for (let value of values) {
            if ((value = valueof(value, ++index2, values)) != null && (min4 > value || min4 === void 0 && value >= value)) {
              min4 = value, minIndex3 = index2;
            }
          }
        }
        return minIndex3;
      }
      function pairs(values, pairof = pair) {
        const pairs2 = [];
        let previous;
        let first = false;
        for (const value of values) {
          if (first)
            pairs2.push(pairof(previous, value));
          previous = value;
          first = true;
        }
        return pairs2;
      }
      function pair(a, b) {
        return [a, b];
      }
      function range(start, stop, step) {
        start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
        var i = -1, n = Math.max(0, Math.ceil((stop - start) / step)) | 0, range2 = new Array(n);
        while (++i < n) {
          range2[i] = start + i * step;
        }
        return range2;
      }
      function least(values, compare = ascending) {
        let min4;
        let defined = false;
        if (compare.length === 1) {
          let minValue;
          for (const element of values) {
            const value = compare(element);
            if (defined ? ascending(value, minValue) < 0 : ascending(value, value) === 0) {
              min4 = element;
              minValue = value;
              defined = true;
            }
          }
        } else {
          for (const value of values) {
            if (defined ? compare(value, min4) < 0 : compare(value, value) === 0) {
              min4 = value;
              defined = true;
            }
          }
        }
        return min4;
      }
      function leastIndex(values, compare = ascending) {
        if (compare.length === 1)
          return minIndex2(values, compare);
        let minValue;
        let min4 = -1;
        let index2 = -1;
        for (const value of values) {
          ++index2;
          if (min4 < 0 ? compare(value, value) === 0 : compare(value, minValue) < 0) {
            minValue = value;
            min4 = index2;
          }
        }
        return min4;
      }
      function greatest(values, compare = ascending) {
        let max9;
        let defined = false;
        if (compare.length === 1) {
          let maxValue;
          for (const element of values) {
            const value = compare(element);
            if (defined ? ascending(value, maxValue) > 0 : ascending(value, value) === 0) {
              max9 = element;
              maxValue = value;
              defined = true;
            }
          }
        } else {
          for (const value of values) {
            if (defined ? compare(value, max9) > 0 : compare(value, value) === 0) {
              max9 = value;
              defined = true;
            }
          }
        }
        return max9;
      }
      function greatestIndex(values, compare = ascending) {
        if (compare.length === 1)
          return maxIndex(values, compare);
        let maxValue;
        let max9 = -1;
        let index2 = -1;
        for (const value of values) {
          ++index2;
          if (max9 < 0 ? compare(value, value) === 0 : compare(value, maxValue) > 0) {
            maxValue = value;
            max9 = index2;
          }
        }
        return max9;
      }
      function scan(values, compare) {
        const index2 = leastIndex(values, compare);
        return index2 < 0 ? void 0 : index2;
      }
      var shuffle = shuffler(Math.random);
      function shuffler(random) {
        return function shuffle2(array2, i0 = 0, i1 = array2.length) {
          let m = i1 - (i0 = +i0);
          while (m) {
            const i = random() * m-- | 0, t = array2[m + i0];
            array2[m + i0] = array2[i + i0];
            array2[i + i0] = t;
          }
          return array2;
        };
      }
      function sum(values, valueof) {
        let sum2 = 0;
        if (valueof === void 0) {
          for (let value of values) {
            if (value = +value) {
              sum2 += value;
            }
          }
        } else {
          let index2 = -1;
          for (let value of values) {
            if (value = +valueof(value, ++index2, values)) {
              sum2 += value;
            }
          }
        }
        return sum2;
      }
      function transpose(matrix) {
        if (!(n = matrix.length))
          return [];
        for (var i = -1, m = min3(matrix, length), transpose2 = new Array(m); ++i < m; ) {
          for (var j = -1, n, row = transpose2[i] = new Array(n); ++j < n; ) {
            row[j] = matrix[j][i];
          }
        }
        return transpose2;
      }
      function length(d) {
        return d.length;
      }
      function zip() {
        return transpose(arguments);
      }
      function every(values, test) {
        if (typeof test !== "function")
          throw new TypeError("test is not a function");
        let index2 = -1;
        for (const value of values) {
          if (!test(value, ++index2, values)) {
            return false;
          }
        }
        return true;
      }
      function some(values, test) {
        if (typeof test !== "function")
          throw new TypeError("test is not a function");
        let index2 = -1;
        for (const value of values) {
          if (test(value, ++index2, values)) {
            return true;
          }
        }
        return false;
      }
      function filter(values, test) {
        if (typeof test !== "function")
          throw new TypeError("test is not a function");
        const array2 = [];
        let index2 = -1;
        for (const value of values) {
          if (test(value, ++index2, values)) {
            array2.push(value);
          }
        }
        return array2;
      }
      function map(values, mapper) {
        if (typeof values[Symbol.iterator] !== "function")
          throw new TypeError("values is not iterable");
        if (typeof mapper !== "function")
          throw new TypeError("mapper is not a function");
        return Array.from(values, (value, index2) => mapper(value, index2, values));
      }
      function reduce(values, reducer2, value) {
        if (typeof reducer2 !== "function")
          throw new TypeError("reducer is not a function");
        const iterator = values[Symbol.iterator]();
        let done, next, index2 = -1;
        if (arguments.length < 3) {
          ({ done, value } = iterator.next());
          if (done)
            return;
          ++index2;
        }
        while ({ done, value: next } = iterator.next(), !done) {
          value = reducer2(value, next, ++index2, values);
        }
        return value;
      }
      function reverse(values) {
        if (typeof values[Symbol.iterator] !== "function")
          throw new TypeError("values is not iterable");
        return Array.from(values).reverse();
      }
      function difference2(values, ...others) {
        values = new Set(values);
        for (const other of others) {
          for (const value of other) {
            values.delete(value);
          }
        }
        return values;
      }
      function disjoint(values, other) {
        const iterator = other[Symbol.iterator](), set2 = /* @__PURE__ */ new Set();
        for (const v of values) {
          if (set2.has(v))
            return false;
          let value, done;
          while ({ value, done } = iterator.next()) {
            if (done)
              break;
            if (Object.is(v, value))
              return false;
            set2.add(value);
          }
        }
        return true;
      }
      function set(values) {
        return values instanceof Set ? values : new Set(values);
      }
      function intersection3(values, ...others) {
        values = new Set(values);
        others = others.map(set);
        out:
          for (const value of values) {
            for (const other of others) {
              if (!other.has(value)) {
                values.delete(value);
                continue out;
              }
            }
          }
        return values;
      }
      function superset(values, other) {
        const iterator = values[Symbol.iterator](), set2 = /* @__PURE__ */ new Set();
        for (const o of other) {
          if (set2.has(o))
            continue;
          let value, done;
          while ({ value, done } = iterator.next()) {
            if (done)
              return false;
            set2.add(value);
            if (Object.is(o, value))
              break;
          }
        }
        return true;
      }
      function subset(values, other) {
        return superset(other, values);
      }
      function union2(...others) {
        const set2 = /* @__PURE__ */ new Set();
        for (const other of others) {
          for (const o of other) {
            set2.add(o);
          }
        }
        return set2;
      }
      exports2.Adder = Adder;
      exports2.InternMap = InternMap;
      exports2.InternSet = InternSet;
      exports2.ascending = ascending;
      exports2.bin = bin;
      exports2.bisect = bisectRight;
      exports2.bisectCenter = bisectCenter;
      exports2.bisectLeft = bisectLeft;
      exports2.bisectRight = bisectRight;
      exports2.bisector = bisector;
      exports2.count = count;
      exports2.cross = cross;
      exports2.cumsum = cumsum;
      exports2.descending = descending;
      exports2.deviation = deviation2;
      exports2.difference = difference2;
      exports2.disjoint = disjoint;
      exports2.every = every;
      exports2.extent = extent5;
      exports2.fcumsum = fcumsum;
      exports2.filter = filter;
      exports2.fsum = fsum;
      exports2.greatest = greatest;
      exports2.greatestIndex = greatestIndex;
      exports2.group = group8;
      exports2.groupSort = groupSort;
      exports2.groups = groups;
      exports2.histogram = bin;
      exports2.index = index;
      exports2.indexes = indexes;
      exports2.intersection = intersection3;
      exports2.least = least;
      exports2.leastIndex = leastIndex;
      exports2.map = map;
      exports2.max = max8;
      exports2.maxIndex = maxIndex;
      exports2.mean = mean2;
      exports2.median = median2;
      exports2.merge = merge;
      exports2.min = min3;
      exports2.minIndex = minIndex2;
      exports2.nice = nice;
      exports2.pairs = pairs;
      exports2.permute = permute;
      exports2.quantile = quantile2;
      exports2.quantileSorted = quantileSorted;
      exports2.quickselect = quickselect;
      exports2.range = range;
      exports2.reduce = reduce;
      exports2.reverse = reverse;
      exports2.rollup = rollup;
      exports2.rollups = rollups;
      exports2.scan = scan;
      exports2.shuffle = shuffle;
      exports2.shuffler = shuffler;
      exports2.some = some;
      exports2.sort = sort;
      exports2.subset = subset;
      exports2.sum = sum;
      exports2.superset = superset;
      exports2.thresholdFreedmanDiaconis = freedmanDiaconis;
      exports2.thresholdScott = scott;
      exports2.thresholdSturges = sturges;
      exports2.tickIncrement = tickIncrement;
      exports2.tickStep = tickStep;
      exports2.ticks = ticks;
      exports2.transpose = transpose;
      exports2.union = union2;
      exports2.variance = variance;
      exports2.zip = zip;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-axis@2.1.0/node_modules/d3-axis/dist/d3-axis.js
var require_d3_axis = __commonJS({
  "node_modules/.pnpm/d3-axis@2.1.0/node_modules/d3-axis/dist/d3-axis.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      var slice = Array.prototype.slice;
      function identity(x) {
        return x;
      }
      var top = 1, right = 2, bottom = 3, left = 4, epsilon = 1e-6;
      function translateX(x) {
        return "translate(" + x + ",0)";
      }
      function translateY(y) {
        return "translate(0," + y + ")";
      }
      function number(scale) {
        return (d) => +scale(d);
      }
      function center(scale, offset) {
        offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
        if (scale.round())
          offset = Math.round(offset);
        return (d) => +scale(d) + offset;
      }
      function entering() {
        return !this.__axis;
      }
      function axis(orient, scale) {
        var tickArguments = [], tickValues = null, tickFormat = null, tickSizeInner = 6, tickSizeOuter = 6, tickPadding = 3, offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5, k = orient === top || orient === left ? -1 : 1, x = orient === left || orient === right ? "x" : "y", transform = orient === top || orient === bottom ? translateX : translateY;
        function axis2(context) {
          var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues, format = tickFormat == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity : tickFormat, spacing = Math.max(tickSizeInner, 0) + tickPadding, range = scale.range(), range0 = +range[0] + offset, range1 = +range[range.length - 1] + offset, position = (scale.bandwidth ? center : number)(scale.copy(), offset), selection = context.selection ? context.selection() : context, path = selection.selectAll(".domain").data([null]), tick = selection.selectAll(".tick").data(values, scale).order(), tickExit = tick.exit(), tickEnter = tick.enter().append("g").attr("class", "tick"), line = tick.select("line"), text = tick.select("text");
          path = path.merge(path.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
          tick = tick.merge(tickEnter);
          line = line.merge(tickEnter.append("line").attr("stroke", "currentColor").attr(x + "2", k * tickSizeInner));
          text = text.merge(tickEnter.append("text").attr("fill", "currentColor").attr(x, k * spacing).attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));
          if (context !== selection) {
            path = path.transition(context);
            tick = tick.transition(context);
            line = line.transition(context);
            text = text.transition(context);
            tickExit = tickExit.transition(context).attr("opacity", epsilon).attr("transform", function(d) {
              return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform");
            });
            tickEnter.attr("opacity", epsilon).attr("transform", function(d) {
              var p = this.parentNode.__axis;
              return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset);
            });
          }
          tickExit.remove();
          path.attr("d", orient === left || orient === right ? tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1);
          tick.attr("opacity", 1).attr("transform", function(d) {
            return transform(position(d) + offset);
          });
          line.attr(x + "2", k * tickSizeInner);
          text.attr(x, k * spacing).text(format);
          selection.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");
          selection.each(function() {
            this.__axis = position;
          });
        }
        axis2.scale = function(_) {
          return arguments.length ? (scale = _, axis2) : scale;
        };
        axis2.ticks = function() {
          return tickArguments = slice.call(arguments), axis2;
        };
        axis2.tickArguments = function(_) {
          return arguments.length ? (tickArguments = _ == null ? [] : slice.call(_), axis2) : tickArguments.slice();
        };
        axis2.tickValues = function(_) {
          return arguments.length ? (tickValues = _ == null ? null : slice.call(_), axis2) : tickValues && tickValues.slice();
        };
        axis2.tickFormat = function(_) {
          return arguments.length ? (tickFormat = _, axis2) : tickFormat;
        };
        axis2.tickSize = function(_) {
          return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis2) : tickSizeInner;
        };
        axis2.tickSizeInner = function(_) {
          return arguments.length ? (tickSizeInner = +_, axis2) : tickSizeInner;
        };
        axis2.tickSizeOuter = function(_) {
          return arguments.length ? (tickSizeOuter = +_, axis2) : tickSizeOuter;
        };
        axis2.tickPadding = function(_) {
          return arguments.length ? (tickPadding = +_, axis2) : tickPadding;
        };
        axis2.offset = function(_) {
          return arguments.length ? (offset = +_, axis2) : offset;
        };
        return axis2;
      }
      function axisTop(scale) {
        return axis(top, scale);
      }
      function axisRight(scale) {
        return axis(right, scale);
      }
      function axisBottom(scale) {
        return axis(bottom, scale);
      }
      function axisLeft(scale) {
        return axis(left, scale);
      }
      exports2.axisBottom = axisBottom;
      exports2.axisLeft = axisLeft;
      exports2.axisRight = axisRight;
      exports2.axisTop = axisTop;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-dispatch@2.0.0/node_modules/d3-dispatch/dist/d3-dispatch.js
var require_d3_dispatch = __commonJS({
  "node_modules/.pnpm/d3-dispatch@2.0.0/node_modules/d3-dispatch/dist/d3-dispatch.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      var noop = { value: () => {
      } };
      function dispatch() {
        for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
          if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t))
            throw new Error("illegal type: " + t);
          _[t] = [];
        }
        return new Dispatch(_);
      }
      function Dispatch(_) {
        this._ = _;
      }
      function parseTypenames(typenames, types) {
        return typenames.trim().split(/^|\s+/).map(function(t) {
          var name = "", i = t.indexOf(".");
          if (i >= 0)
            name = t.slice(i + 1), t = t.slice(0, i);
          if (t && !types.hasOwnProperty(t))
            throw new Error("unknown type: " + t);
          return { type: t, name };
        });
      }
      Dispatch.prototype = dispatch.prototype = {
        constructor: Dispatch,
        on: function(typename, callback) {
          var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
          if (arguments.length < 2) {
            while (++i < n)
              if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name)))
                return t;
            return;
          }
          if (callback != null && typeof callback !== "function")
            throw new Error("invalid callback: " + callback);
          while (++i < n) {
            if (t = (typename = T[i]).type)
              _[t] = set(_[t], typename.name, callback);
            else if (callback == null)
              for (t in _)
                _[t] = set(_[t], typename.name, null);
          }
          return this;
        },
        copy: function() {
          var copy = {}, _ = this._;
          for (var t in _)
            copy[t] = _[t].slice();
          return new Dispatch(copy);
        },
        call: function(type, that) {
          if ((n = arguments.length - 2) > 0)
            for (var args = new Array(n), i = 0, n, t; i < n; ++i)
              args[i] = arguments[i + 2];
          if (!this._.hasOwnProperty(type))
            throw new Error("unknown type: " + type);
          for (t = this._[type], i = 0, n = t.length; i < n; ++i)
            t[i].value.apply(that, args);
        },
        apply: function(type, that, args) {
          if (!this._.hasOwnProperty(type))
            throw new Error("unknown type: " + type);
          for (var t = this._[type], i = 0, n = t.length; i < n; ++i)
            t[i].value.apply(that, args);
        }
      };
      function get(type, name) {
        for (var i = 0, n = type.length, c; i < n; ++i) {
          if ((c = type[i]).name === name) {
            return c.value;
          }
        }
      }
      function set(type, name, callback) {
        for (var i = 0, n = type.length; i < n; ++i) {
          if (type[i].name === name) {
            type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
            break;
          }
        }
        if (callback != null)
          type.push({ name, value: callback });
        return type;
      }
      exports2.dispatch = dispatch;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/dist/d3-selection.js
var require_d3_selection = __commonJS({
  "node_modules/.pnpm/d3-selection@2.0.0/node_modules/d3-selection/dist/d3-selection.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      var xhtml = "http://www.w3.org/1999/xhtml";
      var namespaces = {
        svg: "http://www.w3.org/2000/svg",
        xhtml,
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
      };
      function namespace(name) {
        var prefix = name += "", i = prefix.indexOf(":");
        if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
          name = name.slice(i + 1);
        return namespaces.hasOwnProperty(prefix) ? { space: namespaces[prefix], local: name } : name;
      }
      function creatorInherit(name) {
        return function() {
          var document2 = this.ownerDocument, uri = this.namespaceURI;
          return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
        };
      }
      function creatorFixed(fullname) {
        return function() {
          return this.ownerDocument.createElementNS(fullname.space, fullname.local);
        };
      }
      function creator(name) {
        var fullname = namespace(name);
        return (fullname.local ? creatorFixed : creatorInherit)(fullname);
      }
      function none() {
      }
      function selector(selector2) {
        return selector2 == null ? none : function() {
          return this.querySelector(selector2);
        };
      }
      function selection_select(select2) {
        if (typeof select2 !== "function")
          select2 = selector(select2);
        for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
          for (var group8 = groups[j], n = group8.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
            if ((node = group8[i]) && (subnode = select2.call(node, node.__data__, i, group8))) {
              if ("__data__" in node)
                subnode.__data__ = node.__data__;
              subgroup[i] = subnode;
            }
          }
        }
        return new Selection(subgroups, this._parents);
      }
      function array(x) {
        return typeof x === "object" && "length" in x ? x : Array.from(x);
      }
      function empty() {
        return [];
      }
      function selectorAll(selector2) {
        return selector2 == null ? empty : function() {
          return this.querySelectorAll(selector2);
        };
      }
      function arrayAll(select2) {
        return function() {
          var group8 = select2.apply(this, arguments);
          return group8 == null ? [] : array(group8);
        };
      }
      function selection_selectAll(select2) {
        if (typeof select2 === "function")
          select2 = arrayAll(select2);
        else
          select2 = selectorAll(select2);
        for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
          for (var group8 = groups[j], n = group8.length, node, i = 0; i < n; ++i) {
            if (node = group8[i]) {
              subgroups.push(select2.call(node, node.__data__, i, group8));
              parents.push(node);
            }
          }
        }
        return new Selection(subgroups, parents);
      }
      function matcher(selector2) {
        return function() {
          return this.matches(selector2);
        };
      }
      function childMatcher(selector2) {
        return function(node) {
          return node.matches(selector2);
        };
      }
      var find = Array.prototype.find;
      function childFind(match) {
        return function() {
          return find.call(this.children, match);
        };
      }
      function childFirst() {
        return this.firstElementChild;
      }
      function selection_selectChild(match) {
        return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
      }
      var filter = Array.prototype.filter;
      function children() {
        return this.children;
      }
      function childrenFilter(match) {
        return function() {
          return filter.call(this.children, match);
        };
      }
      function selection_selectChildren(match) {
        return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
      }
      function selection_filter(match) {
        if (typeof match !== "function")
          match = matcher(match);
        for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
          for (var group8 = groups[j], n = group8.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
            if ((node = group8[i]) && match.call(node, node.__data__, i, group8)) {
              subgroup.push(node);
            }
          }
        }
        return new Selection(subgroups, this._parents);
      }
      function sparse(update) {
        return new Array(update.length);
      }
      function selection_enter() {
        return new Selection(this._enter || this._groups.map(sparse), this._parents);
      }
      function EnterNode(parent, datum2) {
        this.ownerDocument = parent.ownerDocument;
        this.namespaceURI = parent.namespaceURI;
        this._next = null;
        this._parent = parent;
        this.__data__ = datum2;
      }
      EnterNode.prototype = {
        constructor: EnterNode,
        appendChild: function(child) {
          return this._parent.insertBefore(child, this._next);
        },
        insertBefore: function(child, next) {
          return this._parent.insertBefore(child, next);
        },
        querySelector: function(selector2) {
          return this._parent.querySelector(selector2);
        },
        querySelectorAll: function(selector2) {
          return this._parent.querySelectorAll(selector2);
        }
      };
      function constant(x) {
        return function() {
          return x;
        };
      }
      function bindIndex(parent, group8, enter, update, exit, data) {
        var i = 0, node, groupLength = group8.length, dataLength = data.length;
        for (; i < dataLength; ++i) {
          if (node = group8[i]) {
            node.__data__ = data[i];
            update[i] = node;
          } else {
            enter[i] = new EnterNode(parent, data[i]);
          }
        }
        for (; i < groupLength; ++i) {
          if (node = group8[i]) {
            exit[i] = node;
          }
        }
      }
      function bindKey(parent, group8, enter, update, exit, data, key) {
        var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group8.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
        for (i = 0; i < groupLength; ++i) {
          if (node = group8[i]) {
            keyValues[i] = keyValue = key.call(node, node.__data__, i, group8) + "";
            if (nodeByKeyValue.has(keyValue)) {
              exit[i] = node;
            } else {
              nodeByKeyValue.set(keyValue, node);
            }
          }
        }
        for (i = 0; i < dataLength; ++i) {
          keyValue = key.call(parent, data[i], i, data) + "";
          if (node = nodeByKeyValue.get(keyValue)) {
            update[i] = node;
            node.__data__ = data[i];
            nodeByKeyValue.delete(keyValue);
          } else {
            enter[i] = new EnterNode(parent, data[i]);
          }
        }
        for (i = 0; i < groupLength; ++i) {
          if ((node = group8[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
            exit[i] = node;
          }
        }
      }
      function datum(node) {
        return node.__data__;
      }
      function selection_data(value, key) {
        if (!arguments.length)
          return Array.from(this, datum);
        var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
        if (typeof value !== "function")
          value = constant(value);
        for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
          var parent = parents[j], group8 = groups[j], groupLength = group8.length, data = array(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
          bind(parent, group8, enterGroup, updateGroup, exitGroup, data, key);
          for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
            if (previous = enterGroup[i0]) {
              if (i0 >= i1)
                i1 = i0 + 1;
              while (!(next = updateGroup[i1]) && ++i1 < dataLength)
                ;
              previous._next = next || null;
            }
          }
        }
        update = new Selection(update, parents);
        update._enter = enter;
        update._exit = exit;
        return update;
      }
      function selection_exit() {
        return new Selection(this._exit || this._groups.map(sparse), this._parents);
      }
      function selection_join(onenter, onupdate, onexit) {
        var enter = this.enter(), update = this, exit = this.exit();
        enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
        if (onupdate != null)
          update = onupdate(update);
        if (onexit == null)
          exit.remove();
        else
          onexit(exit);
        return enter && update ? enter.merge(update).order() : update;
      }
      function selection_merge(selection2) {
        if (!(selection2 instanceof Selection))
          throw new Error("invalid merge");
        for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
          for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
            if (node = group0[i] || group1[i]) {
              merge[i] = node;
            }
          }
        }
        for (; j < m0; ++j) {
          merges[j] = groups0[j];
        }
        return new Selection(merges, this._parents);
      }
      function selection_order() {
        for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
          for (var group8 = groups[j], i = group8.length - 1, next = group8[i], node; --i >= 0; ) {
            if (node = group8[i]) {
              if (next && node.compareDocumentPosition(next) ^ 4)
                next.parentNode.insertBefore(node, next);
              next = node;
            }
          }
        }
        return this;
      }
      function selection_sort(compare) {
        if (!compare)
          compare = ascending;
        function compareNode(a, b) {
          return a && b ? compare(a.__data__, b.__data__) : !a - !b;
        }
        for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
          for (var group8 = groups[j], n = group8.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
            if (node = group8[i]) {
              sortgroup[i] = node;
            }
          }
          sortgroup.sort(compareNode);
        }
        return new Selection(sortgroups, this._parents).order();
      }
      function ascending(a, b) {
        return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
      }
      function selection_call() {
        var callback = arguments[0];
        arguments[0] = this;
        callback.apply(null, arguments);
        return this;
      }
      function selection_nodes() {
        return Array.from(this);
      }
      function selection_node() {
        for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
          for (var group8 = groups[j], i = 0, n = group8.length; i < n; ++i) {
            var node = group8[i];
            if (node)
              return node;
          }
        }
        return null;
      }
      function selection_size() {
        let size = 0;
        for (const node of this)
          ++size;
        return size;
      }
      function selection_empty() {
        return !this.node();
      }
      function selection_each(callback) {
        for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
          for (var group8 = groups[j], i = 0, n = group8.length, node; i < n; ++i) {
            if (node = group8[i])
              callback.call(node, node.__data__, i, group8);
          }
        }
        return this;
      }
      function attrRemove(name) {
        return function() {
          this.removeAttribute(name);
        };
      }
      function attrRemoveNS(fullname) {
        return function() {
          this.removeAttributeNS(fullname.space, fullname.local);
        };
      }
      function attrConstant(name, value) {
        return function() {
          this.setAttribute(name, value);
        };
      }
      function attrConstantNS(fullname, value) {
        return function() {
          this.setAttributeNS(fullname.space, fullname.local, value);
        };
      }
      function attrFunction(name, value) {
        return function() {
          var v = value.apply(this, arguments);
          if (v == null)
            this.removeAttribute(name);
          else
            this.setAttribute(name, v);
        };
      }
      function attrFunctionNS(fullname, value) {
        return function() {
          var v = value.apply(this, arguments);
          if (v == null)
            this.removeAttributeNS(fullname.space, fullname.local);
          else
            this.setAttributeNS(fullname.space, fullname.local, v);
        };
      }
      function selection_attr(name, value) {
        var fullname = namespace(name);
        if (arguments.length < 2) {
          var node = this.node();
          return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
        }
        return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
      }
      function defaultView(node) {
        return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
      }
      function styleRemove(name) {
        return function() {
          this.style.removeProperty(name);
        };
      }
      function styleConstant(name, value, priority) {
        return function() {
          this.style.setProperty(name, value, priority);
        };
      }
      function styleFunction(name, value, priority) {
        return function() {
          var v = value.apply(this, arguments);
          if (v == null)
            this.style.removeProperty(name);
          else
            this.style.setProperty(name, v, priority);
        };
      }
      function selection_style(name, value, priority) {
        return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
      }
      function styleValue(node, name) {
        return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
      }
      function propertyRemove(name) {
        return function() {
          delete this[name];
        };
      }
      function propertyConstant(name, value) {
        return function() {
          this[name] = value;
        };
      }
      function propertyFunction(name, value) {
        return function() {
          var v = value.apply(this, arguments);
          if (v == null)
            delete this[name];
          else
            this[name] = v;
        };
      }
      function selection_property(name, value) {
        return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
      }
      function classArray(string) {
        return string.trim().split(/^|\s+/);
      }
      function classList(node) {
        return node.classList || new ClassList(node);
      }
      function ClassList(node) {
        this._node = node;
        this._names = classArray(node.getAttribute("class") || "");
      }
      ClassList.prototype = {
        add: function(name) {
          var i = this._names.indexOf(name);
          if (i < 0) {
            this._names.push(name);
            this._node.setAttribute("class", this._names.join(" "));
          }
        },
        remove: function(name) {
          var i = this._names.indexOf(name);
          if (i >= 0) {
            this._names.splice(i, 1);
            this._node.setAttribute("class", this._names.join(" "));
          }
        },
        contains: function(name) {
          return this._names.indexOf(name) >= 0;
        }
      };
      function classedAdd(node, names) {
        var list = classList(node), i = -1, n = names.length;
        while (++i < n)
          list.add(names[i]);
      }
      function classedRemove(node, names) {
        var list = classList(node), i = -1, n = names.length;
        while (++i < n)
          list.remove(names[i]);
      }
      function classedTrue(names) {
        return function() {
          classedAdd(this, names);
        };
      }
      function classedFalse(names) {
        return function() {
          classedRemove(this, names);
        };
      }
      function classedFunction(names, value) {
        return function() {
          (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
        };
      }
      function selection_classed(name, value) {
        var names = classArray(name + "");
        if (arguments.length < 2) {
          var list = classList(this.node()), i = -1, n = names.length;
          while (++i < n)
            if (!list.contains(names[i]))
              return false;
          return true;
        }
        return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
      }
      function textRemove() {
        this.textContent = "";
      }
      function textConstant(value) {
        return function() {
          this.textContent = value;
        };
      }
      function textFunction(value) {
        return function() {
          var v = value.apply(this, arguments);
          this.textContent = v == null ? "" : v;
        };
      }
      function selection_text(value) {
        return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
      }
      function htmlRemove() {
        this.innerHTML = "";
      }
      function htmlConstant(value) {
        return function() {
          this.innerHTML = value;
        };
      }
      function htmlFunction(value) {
        return function() {
          var v = value.apply(this, arguments);
          this.innerHTML = v == null ? "" : v;
        };
      }
      function selection_html(value) {
        return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
      }
      function raise() {
        if (this.nextSibling)
          this.parentNode.appendChild(this);
      }
      function selection_raise() {
        return this.each(raise);
      }
      function lower() {
        if (this.previousSibling)
          this.parentNode.insertBefore(this, this.parentNode.firstChild);
      }
      function selection_lower() {
        return this.each(lower);
      }
      function selection_append(name) {
        var create2 = typeof name === "function" ? name : creator(name);
        return this.select(function() {
          return this.appendChild(create2.apply(this, arguments));
        });
      }
      function constantNull() {
        return null;
      }
      function selection_insert(name, before) {
        var create2 = typeof name === "function" ? name : creator(name), select2 = before == null ? constantNull : typeof before === "function" ? before : selector(before);
        return this.select(function() {
          return this.insertBefore(create2.apply(this, arguments), select2.apply(this, arguments) || null);
        });
      }
      function remove() {
        var parent = this.parentNode;
        if (parent)
          parent.removeChild(this);
      }
      function selection_remove() {
        return this.each(remove);
      }
      function selection_cloneShallow() {
        var clone = this.cloneNode(false), parent = this.parentNode;
        return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
      }
      function selection_cloneDeep() {
        var clone = this.cloneNode(true), parent = this.parentNode;
        return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
      }
      function selection_clone(deep) {
        return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
      }
      function selection_datum(value) {
        return arguments.length ? this.property("__data__", value) : this.node().__data__;
      }
      function contextListener(listener) {
        return function(event) {
          listener.call(this, event, this.__data__);
        };
      }
      function parseTypenames(typenames) {
        return typenames.trim().split(/^|\s+/).map(function(t) {
          var name = "", i = t.indexOf(".");
          if (i >= 0)
            name = t.slice(i + 1), t = t.slice(0, i);
          return { type: t, name };
        });
      }
      function onRemove(typename) {
        return function() {
          var on = this.__on;
          if (!on)
            return;
          for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
            if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
              this.removeEventListener(o.type, o.listener, o.options);
            } else {
              on[++i] = o;
            }
          }
          if (++i)
            on.length = i;
          else
            delete this.__on;
        };
      }
      function onAdd(typename, value, options) {
        return function() {
          var on = this.__on, o, listener = contextListener(value);
          if (on)
            for (var j = 0, m = on.length; j < m; ++j) {
              if ((o = on[j]).type === typename.type && o.name === typename.name) {
                this.removeEventListener(o.type, o.listener, o.options);
                this.addEventListener(o.type, o.listener = listener, o.options = options);
                o.value = value;
                return;
              }
            }
          this.addEventListener(typename.type, listener, options);
          o = { type: typename.type, name: typename.name, value, listener, options };
          if (!on)
            this.__on = [o];
          else
            on.push(o);
        };
      }
      function selection_on(typename, value, options) {
        var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
        if (arguments.length < 2) {
          var on = this.node().__on;
          if (on)
            for (var j = 0, m = on.length, o; j < m; ++j) {
              for (i = 0, o = on[j]; i < n; ++i) {
                if ((t = typenames[i]).type === o.type && t.name === o.name) {
                  return o.value;
                }
              }
            }
          return;
        }
        on = value ? onAdd : onRemove;
        for (i = 0; i < n; ++i)
          this.each(on(typenames[i], value, options));
        return this;
      }
      function dispatchEvent(node, type, params) {
        var window2 = defaultView(node), event = window2.CustomEvent;
        if (typeof event === "function") {
          event = new event(type, params);
        } else {
          event = window2.document.createEvent("Event");
          if (params)
            event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
          else
            event.initEvent(type, false, false);
        }
        node.dispatchEvent(event);
      }
      function dispatchConstant(type, params) {
        return function() {
          return dispatchEvent(this, type, params);
        };
      }
      function dispatchFunction(type, params) {
        return function() {
          return dispatchEvent(this, type, params.apply(this, arguments));
        };
      }
      function selection_dispatch(type, params) {
        return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
      }
      function* selection_iterator() {
        for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
          for (var group8 = groups[j], i = 0, n = group8.length, node; i < n; ++i) {
            if (node = group8[i])
              yield node;
          }
        }
      }
      var root = [null];
      function Selection(groups, parents) {
        this._groups = groups;
        this._parents = parents;
      }
      function selection() {
        return new Selection([[document.documentElement]], root);
      }
      function selection_selection() {
        return this;
      }
      Selection.prototype = selection.prototype = {
        constructor: Selection,
        select: selection_select,
        selectAll: selection_selectAll,
        selectChild: selection_selectChild,
        selectChildren: selection_selectChildren,
        filter: selection_filter,
        data: selection_data,
        enter: selection_enter,
        exit: selection_exit,
        join: selection_join,
        merge: selection_merge,
        selection: selection_selection,
        order: selection_order,
        sort: selection_sort,
        call: selection_call,
        nodes: selection_nodes,
        node: selection_node,
        size: selection_size,
        empty: selection_empty,
        each: selection_each,
        attr: selection_attr,
        style: selection_style,
        property: selection_property,
        classed: selection_classed,
        text: selection_text,
        html: selection_html,
        raise: selection_raise,
        lower: selection_lower,
        append: selection_append,
        insert: selection_insert,
        remove: selection_remove,
        clone: selection_clone,
        datum: selection_datum,
        on: selection_on,
        dispatch: selection_dispatch,
        [Symbol.iterator]: selection_iterator
      };
      function select(selector2) {
        return typeof selector2 === "string" ? new Selection([[document.querySelector(selector2)]], [document.documentElement]) : new Selection([[selector2]], root);
      }
      function create(name) {
        return select(creator(name).call(document.documentElement));
      }
      var nextId = 0;
      function local() {
        return new Local();
      }
      function Local() {
        this._ = "@" + (++nextId).toString(36);
      }
      Local.prototype = local.prototype = {
        constructor: Local,
        get: function(node) {
          var id = this._;
          while (!(id in node))
            if (!(node = node.parentNode))
              return;
          return node[id];
        },
        set: function(node, value) {
          return node[this._] = value;
        },
        remove: function(node) {
          return this._ in node && delete node[this._];
        },
        toString: function() {
          return this._;
        }
      };
      function sourceEvent(event) {
        let sourceEvent2;
        while (sourceEvent2 = event.sourceEvent)
          event = sourceEvent2;
        return event;
      }
      function pointer(event, node) {
        event = sourceEvent(event);
        if (node === void 0)
          node = event.currentTarget;
        if (node) {
          var svg = node.ownerSVGElement || node;
          if (svg.createSVGPoint) {
            var point = svg.createSVGPoint();
            point.x = event.clientX, point.y = event.clientY;
            point = point.matrixTransform(node.getScreenCTM().inverse());
            return [point.x, point.y];
          }
          if (node.getBoundingClientRect) {
            var rect = node.getBoundingClientRect();
            return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
          }
        }
        return [event.pageX, event.pageY];
      }
      function pointers(events, node) {
        if (events.target) {
          events = sourceEvent(events);
          if (node === void 0)
            node = events.currentTarget;
          events = events.touches || [events];
        }
        return Array.from(events, (event) => pointer(event, node));
      }
      function selectAll(selector2) {
        return typeof selector2 === "string" ? new Selection([document.querySelectorAll(selector2)], [document.documentElement]) : new Selection([selector2 == null ? [] : array(selector2)], root);
      }
      exports2.create = create;
      exports2.creator = creator;
      exports2.local = local;
      exports2.matcher = matcher;
      exports2.namespace = namespace;
      exports2.namespaces = namespaces;
      exports2.pointer = pointer;
      exports2.pointers = pointers;
      exports2.select = select;
      exports2.selectAll = selectAll;
      exports2.selection = selection;
      exports2.selector = selector;
      exports2.selectorAll = selectorAll;
      exports2.style = styleValue;
      exports2.window = defaultView;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-drag@2.0.0/node_modules/d3-drag/dist/d3-drag.js
var require_d3_drag = __commonJS({
  "node_modules/.pnpm/d3-drag@2.0.0/node_modules/d3-drag/dist/d3-drag.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_dispatch(), require_d3_selection()) : typeof define === "function" && define.amd ? define(["exports", "d3-dispatch", "d3-selection"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3, global2.d3));
    })(exports, function(exports2, d3Dispatch, d3Selection) {
      "use strict";
      function nopropagation(event) {
        event.stopImmediatePropagation();
      }
      function noevent(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      function nodrag(view) {
        var root = view.document.documentElement, selection = d3Selection.select(view).on("dragstart.drag", noevent, true);
        if ("onselectstart" in root) {
          selection.on("selectstart.drag", noevent, true);
        } else {
          root.__noselect = root.style.MozUserSelect;
          root.style.MozUserSelect = "none";
        }
      }
      function yesdrag(view, noclick) {
        var root = view.document.documentElement, selection = d3Selection.select(view).on("dragstart.drag", null);
        if (noclick) {
          selection.on("click.drag", noevent, true);
          setTimeout(function() {
            selection.on("click.drag", null);
          }, 0);
        }
        if ("onselectstart" in root) {
          selection.on("selectstart.drag", null);
        } else {
          root.style.MozUserSelect = root.__noselect;
          delete root.__noselect;
        }
      }
      var constant = (x) => () => x;
      function DragEvent(type, {
        sourceEvent,
        subject,
        target,
        identifier,
        active,
        x,
        y,
        dx,
        dy,
        dispatch
      }) {
        Object.defineProperties(this, {
          type: { value: type, enumerable: true, configurable: true },
          sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
          subject: { value: subject, enumerable: true, configurable: true },
          target: { value: target, enumerable: true, configurable: true },
          identifier: { value: identifier, enumerable: true, configurable: true },
          active: { value: active, enumerable: true, configurable: true },
          x: { value: x, enumerable: true, configurable: true },
          y: { value: y, enumerable: true, configurable: true },
          dx: { value: dx, enumerable: true, configurable: true },
          dy: { value: dy, enumerable: true, configurable: true },
          _: { value: dispatch }
        });
      }
      DragEvent.prototype.on = function() {
        var value = this._.on.apply(this._, arguments);
        return value === this._ ? this : value;
      };
      function defaultFilter(event) {
        return !event.ctrlKey && !event.button;
      }
      function defaultContainer() {
        return this.parentNode;
      }
      function defaultSubject(event, d) {
        return d == null ? { x: event.x, y: event.y } : d;
      }
      function defaultTouchable() {
        return navigator.maxTouchPoints || "ontouchstart" in this;
      }
      function drag() {
        var filter = defaultFilter, container = defaultContainer, subject = defaultSubject, touchable = defaultTouchable, gestures = {}, listeners = d3Dispatch.dispatch("start", "drag", "end"), active = 0, mousedownx, mousedowny, mousemoving, touchending, clickDistance2 = 0;
        function drag2(selection) {
          selection.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
        }
        function mousedowned(event, d) {
          if (touchending || !filter.call(this, event, d))
            return;
          var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
          if (!gesture)
            return;
          d3Selection.select(event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
          nodrag(event.view);
          nopropagation(event);
          mousemoving = false;
          mousedownx = event.clientX;
          mousedowny = event.clientY;
          gesture("start", event);
        }
        function mousemoved(event) {
          noevent(event);
          if (!mousemoving) {
            var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
            mousemoving = dx * dx + dy * dy > clickDistance2;
          }
          gestures.mouse("drag", event);
        }
        function mouseupped(event) {
          d3Selection.select(event.view).on("mousemove.drag mouseup.drag", null);
          yesdrag(event.view, mousemoving);
          noevent(event);
          gestures.mouse("end", event);
        }
        function touchstarted(event, d) {
          if (!filter.call(this, event, d))
            return;
          var touches = event.changedTouches, c = container.call(this, event, d), n = touches.length, i, gesture;
          for (i = 0; i < n; ++i) {
            if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
              nopropagation(event);
              gesture("start", event, touches[i]);
            }
          }
        }
        function touchmoved(event) {
          var touches = event.changedTouches, n = touches.length, i, gesture;
          for (i = 0; i < n; ++i) {
            if (gesture = gestures[touches[i].identifier]) {
              noevent(event);
              gesture("drag", event, touches[i]);
            }
          }
        }
        function touchended(event) {
          var touches = event.changedTouches, n = touches.length, i, gesture;
          if (touchending)
            clearTimeout(touchending);
          touchending = setTimeout(function() {
            touchending = null;
          }, 500);
          for (i = 0; i < n; ++i) {
            if (gesture = gestures[touches[i].identifier]) {
              nopropagation(event);
              gesture("end", event, touches[i]);
            }
          }
        }
        function beforestart(that, container2, event, d, identifier, touch) {
          var dispatch = listeners.copy(), p = d3Selection.pointer(touch || event, container2), dx, dy, s;
          if ((s = subject.call(that, new DragEvent("beforestart", {
            sourceEvent: event,
            target: drag2,
            identifier,
            active,
            x: p[0],
            y: p[1],
            dx: 0,
            dy: 0,
            dispatch
          }), d)) == null)
            return;
          dx = s.x - p[0] || 0;
          dy = s.y - p[1] || 0;
          return function gesture(type, event2, touch2) {
            var p0 = p, n;
            switch (type) {
              case "start":
                gestures[identifier] = gesture, n = active++;
                break;
              case "end":
                delete gestures[identifier], --active;
              case "drag":
                p = d3Selection.pointer(touch2 || event2, container2), n = active;
                break;
            }
            dispatch.call(type, that, new DragEvent(type, {
              sourceEvent: event2,
              subject: s,
              target: drag2,
              identifier,
              active: n,
              x: p[0] + dx,
              y: p[1] + dy,
              dx: p[0] - p0[0],
              dy: p[1] - p0[1],
              dispatch
            }), d);
          };
        }
        drag2.filter = function(_) {
          return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), drag2) : filter;
        };
        drag2.container = function(_) {
          return arguments.length ? (container = typeof _ === "function" ? _ : constant(_), drag2) : container;
        };
        drag2.subject = function(_) {
          return arguments.length ? (subject = typeof _ === "function" ? _ : constant(_), drag2) : subject;
        };
        drag2.touchable = function(_) {
          return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), drag2) : touchable;
        };
        drag2.on = function() {
          var value = listeners.on.apply(listeners, arguments);
          return value === listeners ? drag2 : value;
        };
        drag2.clickDistance = function(_) {
          return arguments.length ? (clickDistance2 = (_ = +_) * _, drag2) : Math.sqrt(clickDistance2);
        };
        return drag2;
      }
      exports2.drag = drag;
      exports2.dragDisable = nodrag;
      exports2.dragEnable = yesdrag;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-color@2.0.0/node_modules/d3-color/dist/d3-color.js
var require_d3_color = __commonJS({
  "node_modules/.pnpm/d3-color@2.0.0/node_modules/d3-color/dist/d3-color.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      function define2(constructor, factory, prototype) {
        constructor.prototype = factory.prototype = prototype;
        prototype.constructor = constructor;
      }
      function extend(parent, definition) {
        var prototype = Object.create(parent.prototype);
        for (var key in definition)
          prototype[key] = definition[key];
        return prototype;
      }
      function Color() {
      }
      var darker = 0.7;
      var brighter = 1 / darker;
      var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"), reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"), reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"), reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"), reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"), reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
      var named = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
      };
      define2(Color, color2, {
        copy: function(channels) {
          return Object.assign(new this.constructor(), this, channels);
        },
        displayable: function() {
          return this.rgb().displayable();
        },
        hex: color_formatHex,
        formatHex: color_formatHex,
        formatHsl: color_formatHsl,
        formatRgb: color_formatRgb,
        toString: color_formatRgb
      });
      function color_formatHex() {
        return this.rgb().formatHex();
      }
      function color_formatHsl() {
        return hslConvert(this).formatHsl();
      }
      function color_formatRgb() {
        return this.rgb().formatRgb();
      }
      function color2(format) {
        var m, l;
        format = (format + "").trim().toLowerCase();
        return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
      }
      function rgbn(n) {
        return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
      }
      function rgba(r, g, b, a) {
        if (a <= 0)
          r = g = b = NaN;
        return new Rgb(r, g, b, a);
      }
      function rgbConvert(o) {
        if (!(o instanceof Color))
          o = color2(o);
        if (!o)
          return new Rgb();
        o = o.rgb();
        return new Rgb(o.r, o.g, o.b, o.opacity);
      }
      function rgb(r, g, b, opacity) {
        return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
      }
      function Rgb(r, g, b, opacity) {
        this.r = +r;
        this.g = +g;
        this.b = +b;
        this.opacity = +opacity;
      }
      define2(Rgb, rgb, extend(Color, {
        brighter: function(k) {
          k = k == null ? brighter : Math.pow(brighter, k);
          return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
        },
        darker: function(k) {
          k = k == null ? darker : Math.pow(darker, k);
          return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
        },
        rgb: function() {
          return this;
        },
        displayable: function() {
          return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
        },
        hex: rgb_formatHex,
        formatHex: rgb_formatHex,
        formatRgb: rgb_formatRgb,
        toString: rgb_formatRgb
      }));
      function rgb_formatHex() {
        return "#" + hex(this.r) + hex(this.g) + hex(this.b);
      }
      function rgb_formatRgb() {
        var a = this.opacity;
        a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
      }
      function hex(value) {
        value = Math.max(0, Math.min(255, Math.round(value) || 0));
        return (value < 16 ? "0" : "") + value.toString(16);
      }
      function hsla(h, s, l, a) {
        if (a <= 0)
          h = s = l = NaN;
        else if (l <= 0 || l >= 1)
          h = s = NaN;
        else if (s <= 0)
          h = NaN;
        return new Hsl(h, s, l, a);
      }
      function hslConvert(o) {
        if (o instanceof Hsl)
          return new Hsl(o.h, o.s, o.l, o.opacity);
        if (!(o instanceof Color))
          o = color2(o);
        if (!o)
          return new Hsl();
        if (o instanceof Hsl)
          return o;
        o = o.rgb();
        var r = o.r / 255, g = o.g / 255, b = o.b / 255, min3 = Math.min(r, g, b), max8 = Math.max(r, g, b), h = NaN, s = max8 - min3, l = (max8 + min3) / 2;
        if (s) {
          if (r === max8)
            h = (g - b) / s + (g < b) * 6;
          else if (g === max8)
            h = (b - r) / s + 2;
          else
            h = (r - g) / s + 4;
          s /= l < 0.5 ? max8 + min3 : 2 - max8 - min3;
          h *= 60;
        } else {
          s = l > 0 && l < 1 ? 0 : h;
        }
        return new Hsl(h, s, l, o.opacity);
      }
      function hsl2(h, s, l, opacity) {
        return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
      }
      function Hsl(h, s, l, opacity) {
        this.h = +h;
        this.s = +s;
        this.l = +l;
        this.opacity = +opacity;
      }
      define2(Hsl, hsl2, extend(Color, {
        brighter: function(k) {
          k = k == null ? brighter : Math.pow(brighter, k);
          return new Hsl(this.h, this.s, this.l * k, this.opacity);
        },
        darker: function(k) {
          k = k == null ? darker : Math.pow(darker, k);
          return new Hsl(this.h, this.s, this.l * k, this.opacity);
        },
        rgb: function() {
          var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
          return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
        },
        displayable: function() {
          return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
        },
        formatHsl: function() {
          var a = this.opacity;
          a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
          return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
        }
      }));
      function hsl2rgb(h, m1, m2) {
        return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
      }
      const radians = Math.PI / 180;
      const degrees = 180 / Math.PI;
      const K = 18, Xn = 0.96422, Yn = 1, Zn = 0.82521, t0 = 4 / 29, t1 = 6 / 29, t2 = 3 * t1 * t1, t3 = t1 * t1 * t1;
      function labConvert(o) {
        if (o instanceof Lab)
          return new Lab(o.l, o.a, o.b, o.opacity);
        if (o instanceof Hcl)
          return hcl2lab(o);
        if (!(o instanceof Rgb))
          o = rgbConvert(o);
        var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
        if (r === g && g === b)
          x = z = y;
        else {
          x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
          z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
        }
        return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
      }
      function gray(l, opacity) {
        return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
      }
      function lab(l, a, b, opacity) {
        return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
      }
      function Lab(l, a, b, opacity) {
        this.l = +l;
        this.a = +a;
        this.b = +b;
        this.opacity = +opacity;
      }
      define2(Lab, lab, extend(Color, {
        brighter: function(k) {
          return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
        },
        darker: function(k) {
          return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
        },
        rgb: function() {
          var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z = isNaN(this.b) ? y : y - this.b / 200;
          x = Xn * lab2xyz(x);
          y = Yn * lab2xyz(y);
          z = Zn * lab2xyz(z);
          return new Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.033454 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
        }
      }));
      function xyz2lab(t) {
        return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
      }
      function lab2xyz(t) {
        return t > t1 ? t * t * t : t2 * (t - t0);
      }
      function lrgb2rgb(x) {
        return 255 * (x <= 31308e-7 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
      }
      function rgb2lrgb(x) {
        return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
      }
      function hclConvert(o) {
        if (o instanceof Hcl)
          return new Hcl(o.h, o.c, o.l, o.opacity);
        if (!(o instanceof Lab))
          o = labConvert(o);
        if (o.a === 0 && o.b === 0)
          return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
        var h = Math.atan2(o.b, o.a) * degrees;
        return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
      }
      function lch(l, c, h, opacity) {
        return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
      }
      function hcl(h, c, l, opacity) {
        return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
      }
      function Hcl(h, c, l, opacity) {
        this.h = +h;
        this.c = +c;
        this.l = +l;
        this.opacity = +opacity;
      }
      function hcl2lab(o) {
        if (isNaN(o.h))
          return new Lab(o.l, 0, 0, o.opacity);
        var h = o.h * radians;
        return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
      }
      define2(Hcl, hcl, extend(Color, {
        brighter: function(k) {
          return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
        },
        darker: function(k) {
          return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
        },
        rgb: function() {
          return hcl2lab(this).rgb();
        }
      }));
      var A = -0.14861, B = 1.78277, C = -0.29227, D = -0.90649, E = 1.97294, ED = E * D, EB = E * B, BC_DA = B * C - D * A;
      function cubehelixConvert(o) {
        if (o instanceof Cubehelix)
          return new Cubehelix(o.h, o.s, o.l, o.opacity);
        if (!(o instanceof Rgb))
          o = rgbConvert(o);
        var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * degrees - 120 : NaN;
        return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
      }
      function cubehelix(h, s, l, opacity) {
        return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
      }
      function Cubehelix(h, s, l, opacity) {
        this.h = +h;
        this.s = +s;
        this.l = +l;
        this.opacity = +opacity;
      }
      define2(Cubehelix, cubehelix, extend(Color, {
        brighter: function(k) {
          k = k == null ? brighter : Math.pow(brighter, k);
          return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
        },
        darker: function(k) {
          k = k == null ? darker : Math.pow(darker, k);
          return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
        },
        rgb: function() {
          var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
          return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
        }
      }));
      exports2.color = color2;
      exports2.cubehelix = cubehelix;
      exports2.gray = gray;
      exports2.hcl = hcl;
      exports2.hsl = hsl2;
      exports2.lab = lab;
      exports2.lch = lch;
      exports2.rgb = rgb;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/dist/d3-interpolate.js
var require_d3_interpolate = __commonJS({
  "node_modules/.pnpm/d3-interpolate@2.0.1/node_modules/d3-interpolate/dist/d3-interpolate.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_color()) : typeof define === "function" && define.amd ? define(["exports", "d3-color"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3));
    })(exports, function(exports2, d3Color) {
      "use strict";
      function basis(t1, v0, v1, v2, v3) {
        var t2 = t1 * t1, t3 = t2 * t1;
        return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
      }
      function basis$1(values) {
        var n = values.length - 1;
        return function(t) {
          var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
          return basis((t - i / n) * n, v0, v1, v2, v3);
        };
      }
      function basisClosed(values) {
        var n = values.length;
        return function(t) {
          var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
          return basis((t - i / n) * n, v0, v1, v2, v3);
        };
      }
      var constant = (x) => () => x;
      function linear(a, d) {
        return function(t) {
          return a + t * d;
        };
      }
      function exponential(a, b, y) {
        return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
          return Math.pow(a + t * b, y);
        };
      }
      function hue(a, b) {
        var d = b - a;
        return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
      }
      function gamma(y) {
        return (y = +y) === 1 ? nogamma : function(a, b) {
          return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
        };
      }
      function nogamma(a, b) {
        var d = b - a;
        return d ? linear(a, d) : constant(isNaN(a) ? b : a);
      }
      var rgb = function rgbGamma(y) {
        var color2 = gamma(y);
        function rgb2(start, end) {
          var r = color2((start = d3Color.rgb(start)).r, (end = d3Color.rgb(end)).r), g = color2(start.g, end.g), b = color2(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
          return function(t) {
            start.r = r(t);
            start.g = g(t);
            start.b = b(t);
            start.opacity = opacity(t);
            return start + "";
          };
        }
        rgb2.gamma = rgbGamma;
        return rgb2;
      }(1);
      function rgbSpline(spline) {
        return function(colors) {
          var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
          for (i = 0; i < n; ++i) {
            color2 = d3Color.rgb(colors[i]);
            r[i] = color2.r || 0;
            g[i] = color2.g || 0;
            b[i] = color2.b || 0;
          }
          r = spline(r);
          g = spline(g);
          b = spline(b);
          color2.opacity = 1;
          return function(t) {
            color2.r = r(t);
            color2.g = g(t);
            color2.b = b(t);
            return color2 + "";
          };
        };
      }
      var rgbBasis = rgbSpline(basis$1);
      var rgbBasisClosed = rgbSpline(basisClosed);
      function numberArray(a, b) {
        if (!b)
          b = [];
        var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
        return function(t) {
          for (i = 0; i < n; ++i)
            c[i] = a[i] * (1 - t) + b[i] * t;
          return c;
        };
      }
      function isNumberArray(x) {
        return ArrayBuffer.isView(x) && !(x instanceof DataView);
      }
      function array(a, b) {
        return (isNumberArray(b) ? numberArray : genericArray)(a, b);
      }
      function genericArray(a, b) {
        var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
        for (i = 0; i < na; ++i)
          x[i] = value(a[i], b[i]);
        for (; i < nb; ++i)
          c[i] = b[i];
        return function(t) {
          for (i = 0; i < na; ++i)
            c[i] = x[i](t);
          return c;
        };
      }
      function date(a, b) {
        var d = new Date();
        return a = +a, b = +b, function(t) {
          return d.setTime(a * (1 - t) + b * t), d;
        };
      }
      function number(a, b) {
        return a = +a, b = +b, function(t) {
          return a * (1 - t) + b * t;
        };
      }
      function object(a, b) {
        var i = {}, c = {}, k;
        if (a === null || typeof a !== "object")
          a = {};
        if (b === null || typeof b !== "object")
          b = {};
        for (k in b) {
          if (k in a) {
            i[k] = value(a[k], b[k]);
          } else {
            c[k] = b[k];
          }
        }
        return function(t) {
          for (k in i)
            c[k] = i[k](t);
          return c;
        };
      }
      var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
      function zero(b) {
        return function() {
          return b;
        };
      }
      function one(b) {
        return function(t) {
          return b(t) + "";
        };
      }
      function string(a, b) {
        var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
        a = a + "", b = b + "";
        while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
          if ((bs = bm.index) > bi) {
            bs = b.slice(bi, bs);
            if (s[i])
              s[i] += bs;
            else
              s[++i] = bs;
          }
          if ((am = am[0]) === (bm = bm[0])) {
            if (s[i])
              s[i] += bm;
            else
              s[++i] = bm;
          } else {
            s[++i] = null;
            q.push({ i, x: number(am, bm) });
          }
          bi = reB.lastIndex;
        }
        if (bi < b.length) {
          bs = b.slice(bi);
          if (s[i])
            s[i] += bs;
          else
            s[++i] = bs;
        }
        return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
          for (var i2 = 0, o; i2 < b; ++i2)
            s[(o = q[i2]).i] = o.x(t);
          return s.join("");
        });
      }
      function value(a, b) {
        var t = typeof b, c;
        return b == null || t === "boolean" ? constant(b) : (t === "number" ? number : t === "string" ? (c = d3Color.color(b)) ? (b = c, rgb) : string : b instanceof d3Color.color ? rgb : b instanceof Date ? date : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : number)(a, b);
      }
      function discrete(range) {
        var n = range.length;
        return function(t) {
          return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
        };
      }
      function hue$1(a, b) {
        var i = hue(+a, +b);
        return function(t) {
          var x = i(t);
          return x - 360 * Math.floor(x / 360);
        };
      }
      function round(a, b) {
        return a = +a, b = +b, function(t) {
          return Math.round(a * (1 - t) + b * t);
        };
      }
      var degrees = 180 / Math.PI;
      var identity = {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        skewX: 0,
        scaleX: 1,
        scaleY: 1
      };
      function decompose(a, b, c, d, e, f) {
        var scaleX, scaleY, skewX;
        if (scaleX = Math.sqrt(a * a + b * b))
          a /= scaleX, b /= scaleX;
        if (skewX = a * c + b * d)
          c -= a * skewX, d -= b * skewX;
        if (scaleY = Math.sqrt(c * c + d * d))
          c /= scaleY, d /= scaleY, skewX /= scaleY;
        if (a * d < b * c)
          a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
        return {
          translateX: e,
          translateY: f,
          rotate: Math.atan2(b, a) * degrees,
          skewX: Math.atan(skewX) * degrees,
          scaleX,
          scaleY
        };
      }
      var svgNode;
      function parseCss(value2) {
        const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value2 + "");
        return m.isIdentity ? identity : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
      }
      function parseSvg(value2) {
        if (value2 == null)
          return identity;
        if (!svgNode)
          svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
        svgNode.setAttribute("transform", value2);
        if (!(value2 = svgNode.transform.baseVal.consolidate()))
          return identity;
        value2 = value2.matrix;
        return decompose(value2.a, value2.b, value2.c, value2.d, value2.e, value2.f);
      }
      function interpolateTransform(parse2, pxComma, pxParen, degParen) {
        function pop(s) {
          return s.length ? s.pop() + " " : "";
        }
        function translate(xa, ya, xb, yb, s, q) {
          if (xa !== xb || ya !== yb) {
            var i = s.push("translate(", null, pxComma, null, pxParen);
            q.push({ i: i - 4, x: number(xa, xb) }, { i: i - 2, x: number(ya, yb) });
          } else if (xb || yb) {
            s.push("translate(" + xb + pxComma + yb + pxParen);
          }
        }
        function rotate(a, b, s, q) {
          if (a !== b) {
            if (a - b > 180)
              b += 360;
            else if (b - a > 180)
              a += 360;
            q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b) });
          } else if (b) {
            s.push(pop(s) + "rotate(" + b + degParen);
          }
        }
        function skewX(a, b, s, q) {
          if (a !== b) {
            q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b) });
          } else if (b) {
            s.push(pop(s) + "skewX(" + b + degParen);
          }
        }
        function scale(xa, ya, xb, yb, s, q) {
          if (xa !== xb || ya !== yb) {
            var i = s.push(pop(s) + "scale(", null, ",", null, ")");
            q.push({ i: i - 4, x: number(xa, xb) }, { i: i - 2, x: number(ya, yb) });
          } else if (xb !== 1 || yb !== 1) {
            s.push(pop(s) + "scale(" + xb + "," + yb + ")");
          }
        }
        return function(a, b) {
          var s = [], q = [];
          a = parse2(a), b = parse2(b);
          translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
          rotate(a.rotate, b.rotate, s, q);
          skewX(a.skewX, b.skewX, s, q);
          scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
          a = b = null;
          return function(t) {
            var i = -1, n = q.length, o;
            while (++i < n)
              s[(o = q[i]).i] = o.x(t);
            return s.join("");
          };
        };
      }
      var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
      var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
      var epsilon2 = 1e-12;
      function cosh(x) {
        return ((x = Math.exp(x)) + 1 / x) / 2;
      }
      function sinh(x) {
        return ((x = Math.exp(x)) - 1 / x) / 2;
      }
      function tanh(x) {
        return ((x = Math.exp(2 * x)) - 1) / (x + 1);
      }
      var zoom = function zoomRho(rho, rho2, rho4) {
        function zoom2(p0, p1) {
          var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
          if (d2 < epsilon2) {
            S = Math.log(w1 / w0) / rho;
            i = function(t) {
              return [
                ux0 + t * dx,
                uy0 + t * dy,
                w0 * Math.exp(rho * t * S)
              ];
            };
          } else {
            var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
            S = (r1 - r0) / rho;
            i = function(t) {
              var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
              return [
                ux0 + u * dx,
                uy0 + u * dy,
                w0 * coshr0 / cosh(rho * s + r0)
              ];
            };
          }
          i.duration = S * 1e3 * rho / Math.SQRT2;
          return i;
        }
        zoom2.rho = function(_) {
          var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
          return zoomRho(_1, _2, _4);
        };
        return zoom2;
      }(Math.SQRT2, 2, 4);
      function hsl2(hue2) {
        return function(start, end) {
          var h = hue2((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
          return function(t) {
            start.h = h(t);
            start.s = s(t);
            start.l = l(t);
            start.opacity = opacity(t);
            return start + "";
          };
        };
      }
      var hsl$1 = hsl2(hue);
      var hslLong = hsl2(nogamma);
      function lab(start, end) {
        var l = nogamma((start = d3Color.lab(start)).l, (end = d3Color.lab(end)).l), a = nogamma(start.a, end.a), b = nogamma(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
        return function(t) {
          start.l = l(t);
          start.a = a(t);
          start.b = b(t);
          start.opacity = opacity(t);
          return start + "";
        };
      }
      function hcl(hue2) {
        return function(start, end) {
          var h = hue2((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h), c = nogamma(start.c, end.c), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
          return function(t) {
            start.h = h(t);
            start.c = c(t);
            start.l = l(t);
            start.opacity = opacity(t);
            return start + "";
          };
        };
      }
      var hcl$1 = hcl(hue);
      var hclLong = hcl(nogamma);
      function cubehelix(hue2) {
        return function cubehelixGamma(y) {
          y = +y;
          function cubehelix2(start, end) {
            var h = hue2((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
            return function(t) {
              start.h = h(t);
              start.s = s(t);
              start.l = l(Math.pow(t, y));
              start.opacity = opacity(t);
              return start + "";
            };
          }
          cubehelix2.gamma = cubehelixGamma;
          return cubehelix2;
        }(1);
      }
      var cubehelix$1 = cubehelix(hue);
      var cubehelixLong = cubehelix(nogamma);
      function piecewise(interpolate, values) {
        if (values === void 0)
          values = interpolate, interpolate = value;
        var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
        while (i < n)
          I[i] = interpolate(v, v = values[++i]);
        return function(t) {
          var i2 = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
          return I[i2](t - i2);
        };
      }
      function quantize(interpolator, n) {
        var samples = new Array(n);
        for (var i = 0; i < n; ++i)
          samples[i] = interpolator(i / (n - 1));
        return samples;
      }
      exports2.interpolate = value;
      exports2.interpolateArray = array;
      exports2.interpolateBasis = basis$1;
      exports2.interpolateBasisClosed = basisClosed;
      exports2.interpolateCubehelix = cubehelix$1;
      exports2.interpolateCubehelixLong = cubehelixLong;
      exports2.interpolateDate = date;
      exports2.interpolateDiscrete = discrete;
      exports2.interpolateHcl = hcl$1;
      exports2.interpolateHclLong = hclLong;
      exports2.interpolateHsl = hsl$1;
      exports2.interpolateHslLong = hslLong;
      exports2.interpolateHue = hue$1;
      exports2.interpolateLab = lab;
      exports2.interpolateNumber = number;
      exports2.interpolateNumberArray = numberArray;
      exports2.interpolateObject = object;
      exports2.interpolateRgb = rgb;
      exports2.interpolateRgbBasis = rgbBasis;
      exports2.interpolateRgbBasisClosed = rgbBasisClosed;
      exports2.interpolateRound = round;
      exports2.interpolateString = string;
      exports2.interpolateTransformCss = interpolateTransformCss;
      exports2.interpolateTransformSvg = interpolateTransformSvg;
      exports2.interpolateZoom = zoom;
      exports2.piecewise = piecewise;
      exports2.quantize = quantize;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-timer@2.0.0/node_modules/d3-timer/dist/d3-timer.js
var require_d3_timer = __commonJS({
  "node_modules/.pnpm/d3-timer@2.0.0/node_modules/d3-timer/dist/d3-timer.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      var frame = 0, timeout = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
        setTimeout(f, 17);
      };
      function now() {
        return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
      }
      function clearNow() {
        clockNow = 0;
      }
      function Timer() {
        this._call = this._time = this._next = null;
      }
      Timer.prototype = timer.prototype = {
        constructor: Timer,
        restart: function(callback, delay2, time) {
          if (typeof callback !== "function")
            throw new TypeError("callback is not a function");
          time = (time == null ? now() : +time) + (delay2 == null ? 0 : +delay2);
          if (!this._next && taskTail !== this) {
            if (taskTail)
              taskTail._next = this;
            else
              taskHead = this;
            taskTail = this;
          }
          this._call = callback;
          this._time = time;
          sleep();
        },
        stop: function() {
          if (this._call) {
            this._call = null;
            this._time = Infinity;
            sleep();
          }
        }
      };
      function timer(callback, delay2, time) {
        var t = new Timer();
        t.restart(callback, delay2, time);
        return t;
      }
      function timerFlush() {
        now();
        ++frame;
        var t = taskHead, e;
        while (t) {
          if ((e = clockNow - t._time) >= 0)
            t._call.call(null, e);
          t = t._next;
        }
        --frame;
      }
      function wake() {
        clockNow = (clockLast = clock.now()) + clockSkew;
        frame = timeout = 0;
        try {
          timerFlush();
        } finally {
          frame = 0;
          nap();
          clockNow = 0;
        }
      }
      function poke() {
        var now2 = clock.now(), delay2 = now2 - clockLast;
        if (delay2 > pokeDelay)
          clockSkew -= delay2, clockLast = now2;
      }
      function nap() {
        var t0, t1 = taskHead, t2, time = Infinity;
        while (t1) {
          if (t1._call) {
            if (time > t1._time)
              time = t1._time;
            t0 = t1, t1 = t1._next;
          } else {
            t2 = t1._next, t1._next = null;
            t1 = t0 ? t0._next = t2 : taskHead = t2;
          }
        }
        taskTail = t0;
        sleep(time);
      }
      function sleep(time) {
        if (frame)
          return;
        if (timeout)
          timeout = clearTimeout(timeout);
        var delay2 = time - clockNow;
        if (delay2 > 24) {
          if (time < Infinity)
            timeout = setTimeout(wake, time - clock.now() - clockSkew);
          if (interval)
            interval = clearInterval(interval);
        } else {
          if (!interval)
            clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
          frame = 1, setFrame(wake);
        }
      }
      function timeout$1(callback, delay2, time) {
        var t = new Timer();
        delay2 = delay2 == null ? 0 : +delay2;
        t.restart((elapsed) => {
          t.stop();
          callback(elapsed + delay2);
        }, delay2, time);
        return t;
      }
      function interval$1(callback, delay2, time) {
        var t = new Timer(), total = delay2;
        if (delay2 == null)
          return t.restart(callback, delay2, time), t;
        t._restart = t.restart;
        t.restart = function(callback2, delay3, time2) {
          delay3 = +delay3, time2 = time2 == null ? now() : +time2;
          t._restart(function tick(elapsed) {
            elapsed += total;
            t._restart(tick, total += delay3, time2);
            callback2(elapsed);
          }, delay3, time2);
        };
        t.restart(callback, delay2, time);
        return t;
      }
      exports2.interval = interval$1;
      exports2.now = now;
      exports2.timeout = timeout$1;
      exports2.timer = timer;
      exports2.timerFlush = timerFlush;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-ease@2.0.0/node_modules/d3-ease/dist/d3-ease.js
var require_d3_ease = __commonJS({
  "node_modules/.pnpm/d3-ease@2.0.0/node_modules/d3-ease/dist/d3-ease.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      const linear = (t) => +t;
      function quadIn(t) {
        return t * t;
      }
      function quadOut(t) {
        return t * (2 - t);
      }
      function quadInOut(t) {
        return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
      }
      function cubicIn(t) {
        return t * t * t;
      }
      function cubicOut(t) {
        return --t * t * t + 1;
      }
      function cubicInOut(t) {
        return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
      }
      var exponent = 3;
      var polyIn = function custom(e) {
        e = +e;
        function polyIn2(t) {
          return Math.pow(t, e);
        }
        polyIn2.exponent = custom;
        return polyIn2;
      }(exponent);
      var polyOut = function custom(e) {
        e = +e;
        function polyOut2(t) {
          return 1 - Math.pow(1 - t, e);
        }
        polyOut2.exponent = custom;
        return polyOut2;
      }(exponent);
      var polyInOut = function custom(e) {
        e = +e;
        function polyInOut2(t) {
          return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
        }
        polyInOut2.exponent = custom;
        return polyInOut2;
      }(exponent);
      var pi = Math.PI, halfPi = pi / 2;
      function sinIn(t) {
        return +t === 1 ? 1 : 1 - Math.cos(t * halfPi);
      }
      function sinOut(t) {
        return Math.sin(t * halfPi);
      }
      function sinInOut(t) {
        return (1 - Math.cos(pi * t)) / 2;
      }
      function tpmt(x) {
        return (Math.pow(2, -10 * x) - 9765625e-10) * 1.0009775171065494;
      }
      function expIn(t) {
        return tpmt(1 - +t);
      }
      function expOut(t) {
        return 1 - tpmt(t);
      }
      function expInOut(t) {
        return ((t *= 2) <= 1 ? tpmt(1 - t) : 2 - tpmt(t - 1)) / 2;
      }
      function circleIn(t) {
        return 1 - Math.sqrt(1 - t * t);
      }
      function circleOut(t) {
        return Math.sqrt(1 - --t * t);
      }
      function circleInOut(t) {
        return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
      }
      var b1 = 4 / 11, b2 = 6 / 11, b3 = 8 / 11, b4 = 3 / 4, b5 = 9 / 11, b6 = 10 / 11, b7 = 15 / 16, b8 = 21 / 22, b9 = 63 / 64, b0 = 1 / b1 / b1;
      function bounceIn(t) {
        return 1 - bounceOut(1 - t);
      }
      function bounceOut(t) {
        return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
      }
      function bounceInOut(t) {
        return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
      }
      var overshoot = 1.70158;
      var backIn = function custom(s) {
        s = +s;
        function backIn2(t) {
          return (t = +t) * t * (s * (t - 1) + t);
        }
        backIn2.overshoot = custom;
        return backIn2;
      }(overshoot);
      var backOut = function custom(s) {
        s = +s;
        function backOut2(t) {
          return --t * t * ((t + 1) * s + t) + 1;
        }
        backOut2.overshoot = custom;
        return backOut2;
      }(overshoot);
      var backInOut = function custom(s) {
        s = +s;
        function backInOut2(t) {
          return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
        }
        backInOut2.overshoot = custom;
        return backInOut2;
      }(overshoot);
      var tau = 2 * Math.PI, amplitude = 1, period = 0.3;
      var elasticIn = function custom(a, p) {
        var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
        function elasticIn2(t) {
          return a * tpmt(- --t) * Math.sin((s - t) / p);
        }
        elasticIn2.amplitude = function(a2) {
          return custom(a2, p * tau);
        };
        elasticIn2.period = function(p2) {
          return custom(a, p2);
        };
        return elasticIn2;
      }(amplitude, period);
      var elasticOut = function custom(a, p) {
        var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
        function elasticOut2(t) {
          return 1 - a * tpmt(t = +t) * Math.sin((t + s) / p);
        }
        elasticOut2.amplitude = function(a2) {
          return custom(a2, p * tau);
        };
        elasticOut2.period = function(p2) {
          return custom(a, p2);
        };
        return elasticOut2;
      }(amplitude, period);
      var elasticInOut = function custom(a, p) {
        var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
        function elasticInOut2(t) {
          return ((t = t * 2 - 1) < 0 ? a * tpmt(-t) * Math.sin((s - t) / p) : 2 - a * tpmt(t) * Math.sin((s + t) / p)) / 2;
        }
        elasticInOut2.amplitude = function(a2) {
          return custom(a2, p * tau);
        };
        elasticInOut2.period = function(p2) {
          return custom(a, p2);
        };
        return elasticInOut2;
      }(amplitude, period);
      exports2.easeBack = backInOut;
      exports2.easeBackIn = backIn;
      exports2.easeBackInOut = backInOut;
      exports2.easeBackOut = backOut;
      exports2.easeBounce = bounceOut;
      exports2.easeBounceIn = bounceIn;
      exports2.easeBounceInOut = bounceInOut;
      exports2.easeBounceOut = bounceOut;
      exports2.easeCircle = circleInOut;
      exports2.easeCircleIn = circleIn;
      exports2.easeCircleInOut = circleInOut;
      exports2.easeCircleOut = circleOut;
      exports2.easeCubic = cubicInOut;
      exports2.easeCubicIn = cubicIn;
      exports2.easeCubicInOut = cubicInOut;
      exports2.easeCubicOut = cubicOut;
      exports2.easeElastic = elasticOut;
      exports2.easeElasticIn = elasticIn;
      exports2.easeElasticInOut = elasticInOut;
      exports2.easeElasticOut = elasticOut;
      exports2.easeExp = expInOut;
      exports2.easeExpIn = expIn;
      exports2.easeExpInOut = expInOut;
      exports2.easeExpOut = expOut;
      exports2.easeLinear = linear;
      exports2.easePoly = polyInOut;
      exports2.easePolyIn = polyIn;
      exports2.easePolyInOut = polyInOut;
      exports2.easePolyOut = polyOut;
      exports2.easeQuad = quadInOut;
      exports2.easeQuadIn = quadIn;
      exports2.easeQuadInOut = quadInOut;
      exports2.easeQuadOut = quadOut;
      exports2.easeSin = sinInOut;
      exports2.easeSinIn = sinIn;
      exports2.easeSinInOut = sinInOut;
      exports2.easeSinOut = sinOut;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/dist/d3-transition.js
var require_d3_transition = __commonJS({
  "node_modules/.pnpm/d3-transition@2.0.0_d3-selection@2.0.0/node_modules/d3-transition/dist/d3-transition.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_selection(), require_d3_dispatch(), require_d3_timer(), require_d3_interpolate(), require_d3_color(), require_d3_ease()) : typeof define === "function" && define.amd ? define(["exports", "d3-selection", "d3-dispatch", "d3-timer", "d3-interpolate", "d3-color", "d3-ease"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3, global2.d3, global2.d3, global2.d3, global2.d3, global2.d3));
    })(exports, function(exports2, d3Selection, d3Dispatch, d3Timer, d3Interpolate, d3Color, d3Ease) {
      "use strict";
      var emptyOn = d3Dispatch.dispatch("start", "end", "cancel", "interrupt");
      var emptyTween = [];
      var CREATED = 0;
      var SCHEDULED = 1;
      var STARTING = 2;
      var STARTED = 3;
      var RUNNING = 4;
      var ENDING = 5;
      var ENDED = 6;
      function schedule(node, name, id2, index, group8, timing) {
        var schedules = node.__transition;
        if (!schedules)
          node.__transition = {};
        else if (id2 in schedules)
          return;
        create(node, id2, {
          name,
          index,
          group: group8,
          on: emptyOn,
          tween: emptyTween,
          time: timing.time,
          delay: timing.delay,
          duration: timing.duration,
          ease: timing.ease,
          timer: null,
          state: CREATED
        });
      }
      function init(node, id2) {
        var schedule2 = get(node, id2);
        if (schedule2.state > CREATED)
          throw new Error("too late; already scheduled");
        return schedule2;
      }
      function set(node, id2) {
        var schedule2 = get(node, id2);
        if (schedule2.state > STARTED)
          throw new Error("too late; already running");
        return schedule2;
      }
      function get(node, id2) {
        var schedule2 = node.__transition;
        if (!schedule2 || !(schedule2 = schedule2[id2]))
          throw new Error("transition not found");
        return schedule2;
      }
      function create(node, id2, self2) {
        var schedules = node.__transition, tween;
        schedules[id2] = self2;
        self2.timer = d3Timer.timer(schedule2, 0, self2.time);
        function schedule2(elapsed) {
          self2.state = SCHEDULED;
          self2.timer.restart(start2, self2.delay, self2.time);
          if (self2.delay <= elapsed)
            start2(elapsed - self2.delay);
        }
        function start2(elapsed) {
          var i, j, n, o;
          if (self2.state !== SCHEDULED)
            return stop();
          for (i in schedules) {
            o = schedules[i];
            if (o.name !== self2.name)
              continue;
            if (o.state === STARTED)
              return d3Timer.timeout(start2);
            if (o.state === RUNNING) {
              o.state = ENDED;
              o.timer.stop();
              o.on.call("interrupt", node, node.__data__, o.index, o.group);
              delete schedules[i];
            } else if (+i < id2) {
              o.state = ENDED;
              o.timer.stop();
              o.on.call("cancel", node, node.__data__, o.index, o.group);
              delete schedules[i];
            }
          }
          d3Timer.timeout(function() {
            if (self2.state === STARTED) {
              self2.state = RUNNING;
              self2.timer.restart(tick, self2.delay, self2.time);
              tick(elapsed);
            }
          });
          self2.state = STARTING;
          self2.on.call("start", node, node.__data__, self2.index, self2.group);
          if (self2.state !== STARTING)
            return;
          self2.state = STARTED;
          tween = new Array(n = self2.tween.length);
          for (i = 0, j = -1; i < n; ++i) {
            if (o = self2.tween[i].value.call(node, node.__data__, self2.index, self2.group)) {
              tween[++j] = o;
            }
          }
          tween.length = j + 1;
        }
        function tick(elapsed) {
          var t = elapsed < self2.duration ? self2.ease.call(null, elapsed / self2.duration) : (self2.timer.restart(stop), self2.state = ENDING, 1), i = -1, n = tween.length;
          while (++i < n) {
            tween[i].call(node, t);
          }
          if (self2.state === ENDING) {
            self2.on.call("end", node, node.__data__, self2.index, self2.group);
            stop();
          }
        }
        function stop() {
          self2.state = ENDED;
          self2.timer.stop();
          delete schedules[id2];
          for (var i in schedules)
            return;
          delete node.__transition;
        }
      }
      function interrupt(node, name) {
        var schedules = node.__transition, schedule2, active2, empty = true, i;
        if (!schedules)
          return;
        name = name == null ? null : name + "";
        for (i in schedules) {
          if ((schedule2 = schedules[i]).name !== name) {
            empty = false;
            continue;
          }
          active2 = schedule2.state > STARTING && schedule2.state < ENDING;
          schedule2.state = ENDED;
          schedule2.timer.stop();
          schedule2.on.call(active2 ? "interrupt" : "cancel", node, node.__data__, schedule2.index, schedule2.group);
          delete schedules[i];
        }
        if (empty)
          delete node.__transition;
      }
      function selection_interrupt(name) {
        return this.each(function() {
          interrupt(this, name);
        });
      }
      function tweenRemove(id2, name) {
        var tween0, tween1;
        return function() {
          var schedule2 = set(this, id2), tween = schedule2.tween;
          if (tween !== tween0) {
            tween1 = tween0 = tween;
            for (var i = 0, n = tween1.length; i < n; ++i) {
              if (tween1[i].name === name) {
                tween1 = tween1.slice();
                tween1.splice(i, 1);
                break;
              }
            }
          }
          schedule2.tween = tween1;
        };
      }
      function tweenFunction(id2, name, value) {
        var tween0, tween1;
        if (typeof value !== "function")
          throw new Error();
        return function() {
          var schedule2 = set(this, id2), tween = schedule2.tween;
          if (tween !== tween0) {
            tween1 = (tween0 = tween).slice();
            for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
              if (tween1[i].name === name) {
                tween1[i] = t;
                break;
              }
            }
            if (i === n)
              tween1.push(t);
          }
          schedule2.tween = tween1;
        };
      }
      function transition_tween(name, value) {
        var id2 = this._id;
        name += "";
        if (arguments.length < 2) {
          var tween = get(this.node(), id2).tween;
          for (var i = 0, n = tween.length, t; i < n; ++i) {
            if ((t = tween[i]).name === name) {
              return t.value;
            }
          }
          return null;
        }
        return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
      }
      function tweenValue(transition2, name, value) {
        var id2 = transition2._id;
        transition2.each(function() {
          var schedule2 = set(this, id2);
          (schedule2.value || (schedule2.value = {}))[name] = value.apply(this, arguments);
        });
        return function(node) {
          return get(node, id2).value[name];
        };
      }
      function interpolate(a, b) {
        var c;
        return (typeof b === "number" ? d3Interpolate.interpolateNumber : b instanceof d3Color.color ? d3Interpolate.interpolateRgb : (c = d3Color.color(b)) ? (b = c, d3Interpolate.interpolateRgb) : d3Interpolate.interpolateString)(a, b);
      }
      function attrRemove(name) {
        return function() {
          this.removeAttribute(name);
        };
      }
      function attrRemoveNS(fullname) {
        return function() {
          this.removeAttributeNS(fullname.space, fullname.local);
        };
      }
      function attrConstant(name, interpolate2, value1) {
        var string00, string1 = value1 + "", interpolate0;
        return function() {
          var string0 = this.getAttribute(name);
          return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
        };
      }
      function attrConstantNS(fullname, interpolate2, value1) {
        var string00, string1 = value1 + "", interpolate0;
        return function() {
          var string0 = this.getAttributeNS(fullname.space, fullname.local);
          return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
        };
      }
      function attrFunction(name, interpolate2, value) {
        var string00, string10, interpolate0;
        return function() {
          var string0, value1 = value(this), string1;
          if (value1 == null)
            return void this.removeAttribute(name);
          string0 = this.getAttribute(name);
          string1 = value1 + "";
          return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
        };
      }
      function attrFunctionNS(fullname, interpolate2, value) {
        var string00, string10, interpolate0;
        return function() {
          var string0, value1 = value(this), string1;
          if (value1 == null)
            return void this.removeAttributeNS(fullname.space, fullname.local);
          string0 = this.getAttributeNS(fullname.space, fullname.local);
          string1 = value1 + "";
          return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
        };
      }
      function transition_attr(name, value) {
        var fullname = d3Selection.namespace(name), i = fullname === "transform" ? d3Interpolate.interpolateTransformSvg : interpolate;
        return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
      }
      function attrInterpolate(name, i) {
        return function(t) {
          this.setAttribute(name, i.call(this, t));
        };
      }
      function attrInterpolateNS(fullname, i) {
        return function(t) {
          this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
        };
      }
      function attrTweenNS(fullname, value) {
        var t0, i0;
        function tween() {
          var i = value.apply(this, arguments);
          if (i !== i0)
            t0 = (i0 = i) && attrInterpolateNS(fullname, i);
          return t0;
        }
        tween._value = value;
        return tween;
      }
      function attrTween(name, value) {
        var t0, i0;
        function tween() {
          var i = value.apply(this, arguments);
          if (i !== i0)
            t0 = (i0 = i) && attrInterpolate(name, i);
          return t0;
        }
        tween._value = value;
        return tween;
      }
      function transition_attrTween(name, value) {
        var key = "attr." + name;
        if (arguments.length < 2)
          return (key = this.tween(key)) && key._value;
        if (value == null)
          return this.tween(key, null);
        if (typeof value !== "function")
          throw new Error();
        var fullname = d3Selection.namespace(name);
        return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
      }
      function delayFunction(id2, value) {
        return function() {
          init(this, id2).delay = +value.apply(this, arguments);
        };
      }
      function delayConstant(id2, value) {
        return value = +value, function() {
          init(this, id2).delay = value;
        };
      }
      function transition_delay(value) {
        var id2 = this._id;
        return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get(this.node(), id2).delay;
      }
      function durationFunction(id2, value) {
        return function() {
          set(this, id2).duration = +value.apply(this, arguments);
        };
      }
      function durationConstant(id2, value) {
        return value = +value, function() {
          set(this, id2).duration = value;
        };
      }
      function transition_duration(value) {
        var id2 = this._id;
        return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get(this.node(), id2).duration;
      }
      function easeConstant(id2, value) {
        if (typeof value !== "function")
          throw new Error();
        return function() {
          set(this, id2).ease = value;
        };
      }
      function transition_ease(value) {
        var id2 = this._id;
        return arguments.length ? this.each(easeConstant(id2, value)) : get(this.node(), id2).ease;
      }
      function easeVarying(id2, value) {
        return function() {
          var v = value.apply(this, arguments);
          if (typeof v !== "function")
            throw new Error();
          set(this, id2).ease = v;
        };
      }
      function transition_easeVarying(value) {
        if (typeof value !== "function")
          throw new Error();
        return this.each(easeVarying(this._id, value));
      }
      function transition_filter(match) {
        if (typeof match !== "function")
          match = d3Selection.matcher(match);
        for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
          for (var group8 = groups[j], n = group8.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
            if ((node = group8[i]) && match.call(node, node.__data__, i, group8)) {
              subgroup.push(node);
            }
          }
        }
        return new Transition(subgroups, this._parents, this._name, this._id);
      }
      function transition_merge(transition2) {
        if (transition2._id !== this._id)
          throw new Error();
        for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
          for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
            if (node = group0[i] || group1[i]) {
              merge[i] = node;
            }
          }
        }
        for (; j < m0; ++j) {
          merges[j] = groups0[j];
        }
        return new Transition(merges, this._parents, this._name, this._id);
      }
      function start(name) {
        return (name + "").trim().split(/^|\s+/).every(function(t) {
          var i = t.indexOf(".");
          if (i >= 0)
            t = t.slice(0, i);
          return !t || t === "start";
        });
      }
      function onFunction(id2, name, listener) {
        var on0, on1, sit = start(name) ? init : set;
        return function() {
          var schedule2 = sit(this, id2), on = schedule2.on;
          if (on !== on0)
            (on1 = (on0 = on).copy()).on(name, listener);
          schedule2.on = on1;
        };
      }
      function transition_on(name, listener) {
        var id2 = this._id;
        return arguments.length < 2 ? get(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
      }
      function removeFunction(id2) {
        return function() {
          var parent = this.parentNode;
          for (var i in this.__transition)
            if (+i !== id2)
              return;
          if (parent)
            parent.removeChild(this);
        };
      }
      function transition_remove() {
        return this.on("end.remove", removeFunction(this._id));
      }
      function transition_select(select) {
        var name = this._name, id2 = this._id;
        if (typeof select !== "function")
          select = d3Selection.selector(select);
        for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
          for (var group8 = groups[j], n = group8.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
            if ((node = group8[i]) && (subnode = select.call(node, node.__data__, i, group8))) {
              if ("__data__" in node)
                subnode.__data__ = node.__data__;
              subgroup[i] = subnode;
              schedule(subgroup[i], name, id2, i, subgroup, get(node, id2));
            }
          }
        }
        return new Transition(subgroups, this._parents, name, id2);
      }
      function transition_selectAll(select) {
        var name = this._name, id2 = this._id;
        if (typeof select !== "function")
          select = d3Selection.selectorAll(select);
        for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
          for (var group8 = groups[j], n = group8.length, node, i = 0; i < n; ++i) {
            if (node = group8[i]) {
              for (var children = select.call(node, node.__data__, i, group8), child, inherit2 = get(node, id2), k = 0, l = children.length; k < l; ++k) {
                if (child = children[k]) {
                  schedule(child, name, id2, k, children, inherit2);
                }
              }
              subgroups.push(children);
              parents.push(node);
            }
          }
        }
        return new Transition(subgroups, parents, name, id2);
      }
      var Selection = d3Selection.selection.prototype.constructor;
      function transition_selection() {
        return new Selection(this._groups, this._parents);
      }
      function styleNull(name, interpolate2) {
        var string00, string10, interpolate0;
        return function() {
          var string0 = d3Selection.style(this, name), string1 = (this.style.removeProperty(name), d3Selection.style(this, name));
          return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, string10 = string1);
        };
      }
      function styleRemove(name) {
        return function() {
          this.style.removeProperty(name);
        };
      }
      function styleConstant(name, interpolate2, value1) {
        var string00, string1 = value1 + "", interpolate0;
        return function() {
          var string0 = d3Selection.style(this, name);
          return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
        };
      }
      function styleFunction(name, interpolate2, value) {
        var string00, string10, interpolate0;
        return function() {
          var string0 = d3Selection.style(this, name), value1 = value(this), string1 = value1 + "";
          if (value1 == null)
            string1 = value1 = (this.style.removeProperty(name), d3Selection.style(this, name));
          return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
        };
      }
      function styleMaybeRemove(id2, name) {
        var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
        return function() {
          var schedule2 = set(this, id2), on = schedule2.on, listener = schedule2.value[key] == null ? remove || (remove = styleRemove(name)) : void 0;
          if (on !== on0 || listener0 !== listener)
            (on1 = (on0 = on).copy()).on(event, listener0 = listener);
          schedule2.on = on1;
        };
      }
      function transition_style(name, value, priority) {
        var i = (name += "") === "transform" ? d3Interpolate.interpolateTransformCss : interpolate;
        return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
      }
      function styleInterpolate(name, i, priority) {
        return function(t) {
          this.style.setProperty(name, i.call(this, t), priority);
        };
      }
      function styleTween(name, value, priority) {
        var t, i0;
        function tween() {
          var i = value.apply(this, arguments);
          if (i !== i0)
            t = (i0 = i) && styleInterpolate(name, i, priority);
          return t;
        }
        tween._value = value;
        return tween;
      }
      function transition_styleTween(name, value, priority) {
        var key = "style." + (name += "");
        if (arguments.length < 2)
          return (key = this.tween(key)) && key._value;
        if (value == null)
          return this.tween(key, null);
        if (typeof value !== "function")
          throw new Error();
        return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
      }
      function textConstant(value) {
        return function() {
          this.textContent = value;
        };
      }
      function textFunction(value) {
        return function() {
          var value1 = value(this);
          this.textContent = value1 == null ? "" : value1;
        };
      }
      function transition_text(value) {
        return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
      }
      function textInterpolate(i) {
        return function(t) {
          this.textContent = i.call(this, t);
        };
      }
      function textTween(value) {
        var t0, i0;
        function tween() {
          var i = value.apply(this, arguments);
          if (i !== i0)
            t0 = (i0 = i) && textInterpolate(i);
          return t0;
        }
        tween._value = value;
        return tween;
      }
      function transition_textTween(value) {
        var key = "text";
        if (arguments.length < 1)
          return (key = this.tween(key)) && key._value;
        if (value == null)
          return this.tween(key, null);
        if (typeof value !== "function")
          throw new Error();
        return this.tween(key, textTween(value));
      }
      function transition_transition() {
        var name = this._name, id0 = this._id, id1 = newId();
        for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
          for (var group8 = groups[j], n = group8.length, node, i = 0; i < n; ++i) {
            if (node = group8[i]) {
              var inherit2 = get(node, id0);
              schedule(node, name, id1, i, group8, {
                time: inherit2.time + inherit2.delay + inherit2.duration,
                delay: 0,
                duration: inherit2.duration,
                ease: inherit2.ease
              });
            }
          }
        }
        return new Transition(groups, this._parents, name, id1);
      }
      function transition_end() {
        var on0, on1, that = this, id2 = that._id, size = that.size();
        return new Promise(function(resolve, reject) {
          var cancel = { value: reject }, end = { value: function() {
            if (--size === 0)
              resolve();
          } };
          that.each(function() {
            var schedule2 = set(this, id2), on = schedule2.on;
            if (on !== on0) {
              on1 = (on0 = on).copy();
              on1._.cancel.push(cancel);
              on1._.interrupt.push(cancel);
              on1._.end.push(end);
            }
            schedule2.on = on1;
          });
          if (size === 0)
            resolve();
        });
      }
      var id = 0;
      function Transition(groups, parents, name, id2) {
        this._groups = groups;
        this._parents = parents;
        this._name = name;
        this._id = id2;
      }
      function transition(name) {
        return d3Selection.selection().transition(name);
      }
      function newId() {
        return ++id;
      }
      var selection_prototype = d3Selection.selection.prototype;
      Transition.prototype = transition.prototype = {
        constructor: Transition,
        select: transition_select,
        selectAll: transition_selectAll,
        filter: transition_filter,
        merge: transition_merge,
        selection: transition_selection,
        transition: transition_transition,
        call: selection_prototype.call,
        nodes: selection_prototype.nodes,
        node: selection_prototype.node,
        size: selection_prototype.size,
        empty: selection_prototype.empty,
        each: selection_prototype.each,
        on: transition_on,
        attr: transition_attr,
        attrTween: transition_attrTween,
        style: transition_style,
        styleTween: transition_styleTween,
        text: transition_text,
        textTween: transition_textTween,
        remove: transition_remove,
        tween: transition_tween,
        delay: transition_delay,
        duration: transition_duration,
        ease: transition_ease,
        easeVarying: transition_easeVarying,
        end: transition_end,
        [Symbol.iterator]: selection_prototype[Symbol.iterator]
      };
      var defaultTiming = {
        time: null,
        delay: 0,
        duration: 250,
        ease: d3Ease.easeCubicInOut
      };
      function inherit(node, id2) {
        var timing;
        while (!(timing = node.__transition) || !(timing = timing[id2])) {
          if (!(node = node.parentNode)) {
            throw new Error(`transition ${id2} not found`);
          }
        }
        return timing;
      }
      function selection_transition(name) {
        var id2, timing;
        if (name instanceof Transition) {
          id2 = name._id, name = name._name;
        } else {
          id2 = newId(), (timing = defaultTiming).time = d3Timer.now(), name = name == null ? null : name + "";
        }
        for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
          for (var group8 = groups[j], n = group8.length, node, i = 0; i < n; ++i) {
            if (node = group8[i]) {
              schedule(node, name, id2, i, group8, timing || inherit(node, id2));
            }
          }
        }
        return new Transition(groups, this._parents, name, id2);
      }
      d3Selection.selection.prototype.interrupt = selection_interrupt;
      d3Selection.selection.prototype.transition = selection_transition;
      var root = [null];
      function active(node, name) {
        var schedules = node.__transition, schedule2, i;
        if (schedules) {
          name = name == null ? null : name + "";
          for (i in schedules) {
            if ((schedule2 = schedules[i]).state > SCHEDULED && schedule2.name === name) {
              return new Transition([[node]], root, name, +i);
            }
          }
        }
        return null;
      }
      exports2.active = active;
      exports2.interrupt = interrupt;
      exports2.transition = transition;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-brush@2.1.0/node_modules/d3-brush/dist/d3-brush.js
var require_d3_brush = __commonJS({
  "node_modules/.pnpm/d3-brush@2.1.0/node_modules/d3-brush/dist/d3-brush.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_dispatch(), require_d3_drag(), require_d3_interpolate(), require_d3_selection(), require_d3_transition()) : typeof define === "function" && define.amd ? define(["exports", "d3-dispatch", "d3-drag", "d3-interpolate", "d3-selection", "d3-transition"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3, global2.d3, global2.d3, global2.d3, global2.d3));
    })(exports, function(exports2, d3Dispatch, d3Drag, d3Interpolate, d3Selection, d3Transition) {
      "use strict";
      var constant = (x) => () => x;
      function BrushEvent(type2, {
        sourceEvent,
        target,
        selection,
        mode,
        dispatch
      }) {
        Object.defineProperties(this, {
          type: { value: type2, enumerable: true, configurable: true },
          sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
          target: { value: target, enumerable: true, configurable: true },
          selection: { value: selection, enumerable: true, configurable: true },
          mode: { value: mode, enumerable: true, configurable: true },
          _: { value: dispatch }
        });
      }
      function nopropagation(event) {
        event.stopImmediatePropagation();
      }
      function noevent(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      var MODE_DRAG = { name: "drag" }, MODE_SPACE = { name: "space" }, MODE_HANDLE = { name: "handle" }, MODE_CENTER = { name: "center" };
      const { abs, max: max8, min: min3 } = Math;
      function number1(e) {
        return [+e[0], +e[1]];
      }
      function number2(e) {
        return [number1(e[0]), number1(e[1])];
      }
      var X = {
        name: "x",
        handles: ["w", "e"].map(type),
        input: function(x, e) {
          return x == null ? null : [[+x[0], e[0][1]], [+x[1], e[1][1]]];
        },
        output: function(xy) {
          return xy && [xy[0][0], xy[1][0]];
        }
      };
      var Y = {
        name: "y",
        handles: ["n", "s"].map(type),
        input: function(y, e) {
          return y == null ? null : [[e[0][0], +y[0]], [e[1][0], +y[1]]];
        },
        output: function(xy) {
          return xy && [xy[0][1], xy[1][1]];
        }
      };
      var XY = {
        name: "xy",
        handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
        input: function(xy) {
          return xy == null ? null : number2(xy);
        },
        output: function(xy) {
          return xy;
        }
      };
      var cursors = {
        overlay: "crosshair",
        selection: "move",
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize"
      };
      var flipX = {
        e: "w",
        w: "e",
        nw: "ne",
        ne: "nw",
        se: "sw",
        sw: "se"
      };
      var flipY = {
        n: "s",
        s: "n",
        nw: "sw",
        ne: "se",
        se: "ne",
        sw: "nw"
      };
      var signsX = {
        overlay: 1,
        selection: 1,
        n: null,
        e: 1,
        s: null,
        w: -1,
        nw: -1,
        ne: 1,
        se: 1,
        sw: -1
      };
      var signsY = {
        overlay: 1,
        selection: 1,
        n: -1,
        e: null,
        s: 1,
        w: null,
        nw: -1,
        ne: -1,
        se: 1,
        sw: 1
      };
      function type(t) {
        return { type: t };
      }
      function defaultFilter(event) {
        return !event.ctrlKey && !event.button;
      }
      function defaultExtent() {
        var svg = this.ownerSVGElement || this;
        if (svg.hasAttribute("viewBox")) {
          svg = svg.viewBox.baseVal;
          return [[svg.x, svg.y], [svg.x + svg.width, svg.y + svg.height]];
        }
        return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
      }
      function defaultTouchable() {
        return navigator.maxTouchPoints || "ontouchstart" in this;
      }
      function local(node) {
        while (!node.__brush)
          if (!(node = node.parentNode))
            return;
        return node.__brush;
      }
      function empty(extent5) {
        return extent5[0][0] === extent5[1][0] || extent5[0][1] === extent5[1][1];
      }
      function brushSelection(node) {
        var state = node.__brush;
        return state ? state.dim.output(state.selection) : null;
      }
      function brushX() {
        return brush$1(X);
      }
      function brushY() {
        return brush$1(Y);
      }
      function brush() {
        return brush$1(XY);
      }
      function brush$1(dim) {
        var extent5 = defaultExtent, filter = defaultFilter, touchable = defaultTouchable, keys = true, listeners = d3Dispatch.dispatch("start", "brush", "end"), handleSize = 6, touchending;
        function brush2(group8) {
          var overlay = group8.property("__brush", initialize).selectAll(".overlay").data([type("overlay")]);
          overlay.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", cursors.overlay).merge(overlay).each(function() {
            var extent6 = local(this).extent;
            d3Selection.select(this).attr("x", extent6[0][0]).attr("y", extent6[0][1]).attr("width", extent6[1][0] - extent6[0][0]).attr("height", extent6[1][1] - extent6[0][1]);
          });
          group8.selectAll(".selection").data([type("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", cursors.selection).attr("fill", "#777").attr("fill-opacity", 0.3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
          var handle = group8.selectAll(".handle").data(dim.handles, function(d) {
            return d.type;
          });
          handle.exit().remove();
          handle.enter().append("rect").attr("class", function(d) {
            return "handle handle--" + d.type;
          }).attr("cursor", function(d) {
            return cursors[d.type];
          });
          group8.each(redraw).attr("fill", "none").attr("pointer-events", "all").on("mousedown.brush", started).filter(touchable).on("touchstart.brush", started).on("touchmove.brush", touchmoved).on("touchend.brush touchcancel.brush", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
        }
        brush2.move = function(group8, selection) {
          if (group8.tween) {
            group8.on("start.brush", function(event) {
              emitter(this, arguments).beforestart().start(event);
            }).on("interrupt.brush end.brush", function(event) {
              emitter(this, arguments).end(event);
            }).tween("brush", function() {
              var that = this, state = that.__brush, emit = emitter(that, arguments), selection0 = state.selection, selection1 = dim.input(typeof selection === "function" ? selection.apply(this, arguments) : selection, state.extent), i = d3Interpolate.interpolate(selection0, selection1);
              function tween(t) {
                state.selection = t === 1 && selection1 === null ? null : i(t);
                redraw.call(that);
                emit.brush();
              }
              return selection0 !== null && selection1 !== null ? tween : tween(1);
            });
          } else {
            group8.each(function() {
              var that = this, args = arguments, state = that.__brush, selection1 = dim.input(typeof selection === "function" ? selection.apply(that, args) : selection, state.extent), emit = emitter(that, args).beforestart();
              d3Transition.interrupt(that);
              state.selection = selection1 === null ? null : selection1;
              redraw.call(that);
              emit.start().brush().end();
            });
          }
        };
        brush2.clear = function(group8) {
          brush2.move(group8, null);
        };
        function redraw() {
          var group8 = d3Selection.select(this), selection = local(this).selection;
          if (selection) {
            group8.selectAll(".selection").style("display", null).attr("x", selection[0][0]).attr("y", selection[0][1]).attr("width", selection[1][0] - selection[0][0]).attr("height", selection[1][1] - selection[0][1]);
            group8.selectAll(".handle").style("display", null).attr("x", function(d) {
              return d.type[d.type.length - 1] === "e" ? selection[1][0] - handleSize / 2 : selection[0][0] - handleSize / 2;
            }).attr("y", function(d) {
              return d.type[0] === "s" ? selection[1][1] - handleSize / 2 : selection[0][1] - handleSize / 2;
            }).attr("width", function(d) {
              return d.type === "n" || d.type === "s" ? selection[1][0] - selection[0][0] + handleSize : handleSize;
            }).attr("height", function(d) {
              return d.type === "e" || d.type === "w" ? selection[1][1] - selection[0][1] + handleSize : handleSize;
            });
          } else {
            group8.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null);
          }
        }
        function emitter(that, args, clean) {
          var emit = that.__brush.emitter;
          return emit && (!clean || !emit.clean) ? emit : new Emitter(that, args, clean);
        }
        function Emitter(that, args, clean) {
          this.that = that;
          this.args = args;
          this.state = that.__brush;
          this.active = 0;
          this.clean = clean;
        }
        Emitter.prototype = {
          beforestart: function() {
            if (++this.active === 1)
              this.state.emitter = this, this.starting = true;
            return this;
          },
          start: function(event, mode) {
            if (this.starting)
              this.starting = false, this.emit("start", event, mode);
            else
              this.emit("brush", event);
            return this;
          },
          brush: function(event, mode) {
            this.emit("brush", event, mode);
            return this;
          },
          end: function(event, mode) {
            if (--this.active === 0)
              delete this.state.emitter, this.emit("end", event, mode);
            return this;
          },
          emit: function(type2, event, mode) {
            var d = d3Selection.select(this.that).datum();
            listeners.call(type2, this.that, new BrushEvent(type2, {
              sourceEvent: event,
              target: brush2,
              selection: dim.output(this.state.selection),
              mode,
              dispatch: listeners
            }), d);
          }
        };
        function started(event) {
          if (touchending && !event.touches)
            return;
          if (!filter.apply(this, arguments))
            return;
          var that = this, type2 = event.target.__data__.type, mode = (keys && event.metaKey ? type2 = "overlay" : type2) === "selection" ? MODE_DRAG : keys && event.altKey ? MODE_CENTER : MODE_HANDLE, signX = dim === Y ? null : signsX[type2], signY = dim === X ? null : signsY[type2], state = local(that), extent6 = state.extent, selection = state.selection, W = extent6[0][0], w0, w1, N = extent6[0][1], n0, n1, E = extent6[1][0], e0, e1, S = extent6[1][1], s0, s1, dx = 0, dy = 0, moving, shifting = signX && signY && keys && event.shiftKey, lockX, lockY, points = Array.from(event.touches || [event], (t) => {
            const i = t.identifier;
            t = d3Selection.pointer(t, that);
            t.point0 = t.slice();
            t.identifier = i;
            return t;
          });
          if (type2 === "overlay") {
            if (selection)
              moving = true;
            const pts = [points[0], points[1] || points[0]];
            state.selection = selection = [[
              w0 = dim === Y ? W : min3(pts[0][0], pts[1][0]),
              n0 = dim === X ? N : min3(pts[0][1], pts[1][1])
            ], [
              e0 = dim === Y ? E : max8(pts[0][0], pts[1][0]),
              s0 = dim === X ? S : max8(pts[0][1], pts[1][1])
            ]];
            if (points.length > 1)
              move();
          } else {
            w0 = selection[0][0];
            n0 = selection[0][1];
            e0 = selection[1][0];
            s0 = selection[1][1];
          }
          w1 = w0;
          n1 = n0;
          e1 = e0;
          s1 = s0;
          var group8 = d3Selection.select(that).attr("pointer-events", "none");
          var overlay = group8.selectAll(".overlay").attr("cursor", cursors[type2]);
          d3Transition.interrupt(that);
          var emit = emitter(that, arguments, true).beforestart();
          if (event.touches) {
            emit.moved = moved;
            emit.ended = ended;
          } else {
            var view = d3Selection.select(event.view).on("mousemove.brush", moved, true).on("mouseup.brush", ended, true);
            if (keys)
              view.on("keydown.brush", keydowned, true).on("keyup.brush", keyupped, true);
            d3Drag.dragDisable(event.view);
          }
          redraw.call(that);
          emit.start(event, mode.name);
          function moved(event2) {
            for (const p of event2.changedTouches || [event2]) {
              for (const d of points)
                if (d.identifier === p.identifier)
                  d.cur = d3Selection.pointer(p, that);
            }
            if (shifting && !lockX && !lockY && points.length === 1) {
              const point = points[0];
              if (abs(point.cur[0] - point[0]) > abs(point.cur[1] - point[1]))
                lockY = true;
              else
                lockX = true;
            }
            for (const point of points)
              if (point.cur)
                point[0] = point.cur[0], point[1] = point.cur[1];
            moving = true;
            noevent(event2);
            move(event2);
          }
          function move(event2) {
            const point = points[0], point0 = point.point0;
            var t;
            dx = point[0] - point0[0];
            dy = point[1] - point0[1];
            switch (mode) {
              case MODE_SPACE:
              case MODE_DRAG: {
                if (signX)
                  dx = max8(W - w0, min3(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
                if (signY)
                  dy = max8(N - n0, min3(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
                break;
              }
              case MODE_HANDLE: {
                if (points[1]) {
                  if (signX)
                    w1 = max8(W, min3(E, points[0][0])), e1 = max8(W, min3(E, points[1][0])), signX = 1;
                  if (signY)
                    n1 = max8(N, min3(S, points[0][1])), s1 = max8(N, min3(S, points[1][1])), signY = 1;
                } else {
                  if (signX < 0)
                    dx = max8(W - w0, min3(E - w0, dx)), w1 = w0 + dx, e1 = e0;
                  else if (signX > 0)
                    dx = max8(W - e0, min3(E - e0, dx)), w1 = w0, e1 = e0 + dx;
                  if (signY < 0)
                    dy = max8(N - n0, min3(S - n0, dy)), n1 = n0 + dy, s1 = s0;
                  else if (signY > 0)
                    dy = max8(N - s0, min3(S - s0, dy)), n1 = n0, s1 = s0 + dy;
                }
                break;
              }
              case MODE_CENTER: {
                if (signX)
                  w1 = max8(W, min3(E, w0 - dx * signX)), e1 = max8(W, min3(E, e0 + dx * signX));
                if (signY)
                  n1 = max8(N, min3(S, n0 - dy * signY)), s1 = max8(N, min3(S, s0 + dy * signY));
                break;
              }
            }
            if (e1 < w1) {
              signX *= -1;
              t = w0, w0 = e0, e0 = t;
              t = w1, w1 = e1, e1 = t;
              if (type2 in flipX)
                overlay.attr("cursor", cursors[type2 = flipX[type2]]);
            }
            if (s1 < n1) {
              signY *= -1;
              t = n0, n0 = s0, s0 = t;
              t = n1, n1 = s1, s1 = t;
              if (type2 in flipY)
                overlay.attr("cursor", cursors[type2 = flipY[type2]]);
            }
            if (state.selection)
              selection = state.selection;
            if (lockX)
              w1 = selection[0][0], e1 = selection[1][0];
            if (lockY)
              n1 = selection[0][1], s1 = selection[1][1];
            if (selection[0][0] !== w1 || selection[0][1] !== n1 || selection[1][0] !== e1 || selection[1][1] !== s1) {
              state.selection = [[w1, n1], [e1, s1]];
              redraw.call(that);
              emit.brush(event2, mode.name);
            }
          }
          function ended(event2) {
            nopropagation(event2);
            if (event2.touches) {
              if (event2.touches.length)
                return;
              if (touchending)
                clearTimeout(touchending);
              touchending = setTimeout(function() {
                touchending = null;
              }, 500);
            } else {
              d3Drag.dragEnable(event2.view, moving);
              view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
            }
            group8.attr("pointer-events", "all");
            overlay.attr("cursor", cursors.overlay);
            if (state.selection)
              selection = state.selection;
            if (empty(selection))
              state.selection = null, redraw.call(that);
            emit.end(event2, mode.name);
          }
          function keydowned(event2) {
            switch (event2.keyCode) {
              case 16: {
                shifting = signX && signY;
                break;
              }
              case 18: {
                if (mode === MODE_HANDLE) {
                  if (signX)
                    e0 = e1 - dx * signX, w0 = w1 + dx * signX;
                  if (signY)
                    s0 = s1 - dy * signY, n0 = n1 + dy * signY;
                  mode = MODE_CENTER;
                  move();
                }
                break;
              }
              case 32: {
                if (mode === MODE_HANDLE || mode === MODE_CENTER) {
                  if (signX < 0)
                    e0 = e1 - dx;
                  else if (signX > 0)
                    w0 = w1 - dx;
                  if (signY < 0)
                    s0 = s1 - dy;
                  else if (signY > 0)
                    n0 = n1 - dy;
                  mode = MODE_SPACE;
                  overlay.attr("cursor", cursors.selection);
                  move();
                }
                break;
              }
              default:
                return;
            }
            noevent(event2);
          }
          function keyupped(event2) {
            switch (event2.keyCode) {
              case 16: {
                if (shifting) {
                  lockX = lockY = shifting = false;
                  move();
                }
                break;
              }
              case 18: {
                if (mode === MODE_CENTER) {
                  if (signX < 0)
                    e0 = e1;
                  else if (signX > 0)
                    w0 = w1;
                  if (signY < 0)
                    s0 = s1;
                  else if (signY > 0)
                    n0 = n1;
                  mode = MODE_HANDLE;
                  move();
                }
                break;
              }
              case 32: {
                if (mode === MODE_SPACE) {
                  if (event2.altKey) {
                    if (signX)
                      e0 = e1 - dx * signX, w0 = w1 + dx * signX;
                    if (signY)
                      s0 = s1 - dy * signY, n0 = n1 + dy * signY;
                    mode = MODE_CENTER;
                  } else {
                    if (signX < 0)
                      e0 = e1;
                    else if (signX > 0)
                      w0 = w1;
                    if (signY < 0)
                      s0 = s1;
                    else if (signY > 0)
                      n0 = n1;
                    mode = MODE_HANDLE;
                  }
                  overlay.attr("cursor", cursors[type2]);
                  move();
                }
                break;
              }
              default:
                return;
            }
            noevent(event2);
          }
        }
        function touchmoved(event) {
          emitter(this, arguments).moved(event);
        }
        function touchended(event) {
          emitter(this, arguments).ended(event);
        }
        function initialize() {
          var state = this.__brush || { selection: null };
          state.extent = number2(extent5.apply(this, arguments));
          state.dim = dim;
          return state;
        }
        brush2.extent = function(_) {
          return arguments.length ? (extent5 = typeof _ === "function" ? _ : constant(number2(_)), brush2) : extent5;
        };
        brush2.filter = function(_) {
          return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), brush2) : filter;
        };
        brush2.touchable = function(_) {
          return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), brush2) : touchable;
        };
        brush2.handleSize = function(_) {
          return arguments.length ? (handleSize = +_, brush2) : handleSize;
        };
        brush2.keyModifiers = function(_) {
          return arguments.length ? (keys = !!_, brush2) : keys;
        };
        brush2.on = function() {
          var value = listeners.on.apply(listeners, arguments);
          return value === listeners ? brush2 : value;
        };
        return brush2;
      }
      exports2.brush = brush;
      exports2.brushSelection = brushSelection;
      exports2.brushX = brushX;
      exports2.brushY = brushY;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-path@2.0.0/node_modules/d3-path/dist/d3-path.js
var require_d3_path = __commonJS({
  "node_modules/.pnpm/d3-path@2.0.0/node_modules/d3-path/dist/d3-path.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      const pi = Math.PI, tau = 2 * pi, epsilon = 1e-6, tauEpsilon = tau - epsilon;
      function Path() {
        this._x0 = this._y0 = this._x1 = this._y1 = null;
        this._ = "";
      }
      function path() {
        return new Path();
      }
      Path.prototype = path.prototype = {
        constructor: Path,
        moveTo: function(x, y) {
          this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
        },
        closePath: function() {
          if (this._x1 !== null) {
            this._x1 = this._x0, this._y1 = this._y0;
            this._ += "Z";
          }
        },
        lineTo: function(x, y) {
          this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
        },
        quadraticCurveTo: function(x1, y1, x, y) {
          this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
        },
        bezierCurveTo: function(x1, y1, x2, y2, x, y) {
          this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
        },
        arcTo: function(x1, y1, x2, y2, r) {
          x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
          var x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
          if (r < 0)
            throw new Error("negative radius: " + r);
          if (this._x1 === null) {
            this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
          } else if (!(l01_2 > epsilon))
            ;
          else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
            this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
          } else {
            var x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
            if (Math.abs(t01 - 1) > epsilon) {
              this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
            }
            this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
          }
        },
        arc: function(x, y, r, a0, a1, ccw) {
          x = +x, y = +y, r = +r, ccw = !!ccw;
          var dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x + dx, y0 = y + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
          if (r < 0)
            throw new Error("negative radius: " + r);
          if (this._x1 === null) {
            this._ += "M" + x0 + "," + y0;
          } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
            this._ += "L" + x0 + "," + y0;
          }
          if (!r)
            return;
          if (da < 0)
            da = da % tau + tau;
          if (da > tauEpsilon) {
            this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
          } else if (da > epsilon) {
            this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
          }
        },
        rect: function(x, y, w, h) {
          this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + +w + "v" + +h + "h" + -w + "Z";
        },
        toString: function() {
          return this._;
        }
      };
      exports2.path = path;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-chord@2.0.0/node_modules/d3-chord/dist/d3-chord.js
var require_d3_chord = __commonJS({
  "node_modules/.pnpm/d3-chord@2.0.0/node_modules/d3-chord/dist/d3-chord.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_path()) : typeof define === "function" && define.amd ? define(["exports", "d3-path"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3));
    })(exports, function(exports2, d3Path) {
      "use strict";
      var abs = Math.abs;
      var cos = Math.cos;
      var sin = Math.sin;
      var pi = Math.PI;
      var halfPi = pi / 2;
      var tau = pi * 2;
      var max8 = Math.max;
      var epsilon = 1e-12;
      function range(i, j) {
        return Array.from({ length: j - i }, (_, k) => i + k);
      }
      function compareValue(compare) {
        return function(a, b) {
          return compare(a.source.value + a.target.value, b.source.value + b.target.value);
        };
      }
      function chord() {
        return chord$1(false, false);
      }
      function chordTranspose() {
        return chord$1(false, true);
      }
      function chordDirected() {
        return chord$1(true, false);
      }
      function chord$1(directed, transpose) {
        var padAngle = 0, sortGroups = null, sortSubgroups = null, sortChords = null;
        function chord2(matrix) {
          var n = matrix.length, groupSums = new Array(n), groupIndex = range(0, n), chords = new Array(n * n), groups = new Array(n), k = 0, dx;
          matrix = Float64Array.from({ length: n * n }, transpose ? (_, i) => matrix[i % n][i / n | 0] : (_, i) => matrix[i / n | 0][i % n]);
          for (let i = 0; i < n; ++i) {
            let x = 0;
            for (let j = 0; j < n; ++j)
              x += matrix[i * n + j] + directed * matrix[j * n + i];
            k += groupSums[i] = x;
          }
          k = max8(0, tau - padAngle * n) / k;
          dx = k ? padAngle : tau / n;
          {
            let x = 0;
            if (sortGroups)
              groupIndex.sort((a, b) => sortGroups(groupSums[a], groupSums[b]));
            for (const i of groupIndex) {
              const x0 = x;
              if (directed) {
                const subgroupIndex = range(~n + 1, n).filter((j) => j < 0 ? matrix[~j * n + i] : matrix[i * n + j]);
                if (sortSubgroups)
                  subgroupIndex.sort((a, b) => sortSubgroups(a < 0 ? -matrix[~a * n + i] : matrix[i * n + a], b < 0 ? -matrix[~b * n + i] : matrix[i * n + b]));
                for (const j of subgroupIndex) {
                  if (j < 0) {
                    const chord3 = chords[~j * n + i] || (chords[~j * n + i] = { source: null, target: null });
                    chord3.target = { index: i, startAngle: x, endAngle: x += matrix[~j * n + i] * k, value: matrix[~j * n + i] };
                  } else {
                    const chord3 = chords[i * n + j] || (chords[i * n + j] = { source: null, target: null });
                    chord3.source = { index: i, startAngle: x, endAngle: x += matrix[i * n + j] * k, value: matrix[i * n + j] };
                  }
                }
                groups[i] = { index: i, startAngle: x0, endAngle: x, value: groupSums[i] };
              } else {
                const subgroupIndex = range(0, n).filter((j) => matrix[i * n + j] || matrix[j * n + i]);
                if (sortSubgroups)
                  subgroupIndex.sort((a, b) => sortSubgroups(matrix[i * n + a], matrix[i * n + b]));
                for (const j of subgroupIndex) {
                  let chord3;
                  if (i < j) {
                    chord3 = chords[i * n + j] || (chords[i * n + j] = { source: null, target: null });
                    chord3.source = { index: i, startAngle: x, endAngle: x += matrix[i * n + j] * k, value: matrix[i * n + j] };
                  } else {
                    chord3 = chords[j * n + i] || (chords[j * n + i] = { source: null, target: null });
                    chord3.target = { index: i, startAngle: x, endAngle: x += matrix[i * n + j] * k, value: matrix[i * n + j] };
                    if (i === j)
                      chord3.source = chord3.target;
                  }
                  if (chord3.source && chord3.target && chord3.source.value < chord3.target.value) {
                    const source = chord3.source;
                    chord3.source = chord3.target;
                    chord3.target = source;
                  }
                }
                groups[i] = { index: i, startAngle: x0, endAngle: x, value: groupSums[i] };
              }
              x += dx;
            }
          }
          chords = Object.values(chords);
          chords.groups = groups;
          return sortChords ? chords.sort(sortChords) : chords;
        }
        chord2.padAngle = function(_) {
          return arguments.length ? (padAngle = max8(0, _), chord2) : padAngle;
        };
        chord2.sortGroups = function(_) {
          return arguments.length ? (sortGroups = _, chord2) : sortGroups;
        };
        chord2.sortSubgroups = function(_) {
          return arguments.length ? (sortSubgroups = _, chord2) : sortSubgroups;
        };
        chord2.sortChords = function(_) {
          return arguments.length ? (_ == null ? sortChords = null : (sortChords = compareValue(_))._ = _, chord2) : sortChords && sortChords._;
        };
        return chord2;
      }
      var slice = Array.prototype.slice;
      function constant(x) {
        return function() {
          return x;
        };
      }
      function defaultSource(d) {
        return d.source;
      }
      function defaultTarget(d) {
        return d.target;
      }
      function defaultRadius(d) {
        return d.radius;
      }
      function defaultStartAngle(d) {
        return d.startAngle;
      }
      function defaultEndAngle(d) {
        return d.endAngle;
      }
      function defaultPadAngle() {
        return 0;
      }
      function defaultArrowheadRadius() {
        return 10;
      }
      function ribbon(headRadius) {
        var source = defaultSource, target = defaultTarget, sourceRadius = defaultRadius, targetRadius = defaultRadius, startAngle = defaultStartAngle, endAngle = defaultEndAngle, padAngle = defaultPadAngle, context = null;
        function ribbon2() {
          var buffer, s = source.apply(this, arguments), t = target.apply(this, arguments), ap = padAngle.apply(this, arguments) / 2, argv = slice.call(arguments), sr = +sourceRadius.apply(this, (argv[0] = s, argv)), sa0 = startAngle.apply(this, argv) - halfPi, sa1 = endAngle.apply(this, argv) - halfPi, tr = +targetRadius.apply(this, (argv[0] = t, argv)), ta0 = startAngle.apply(this, argv) - halfPi, ta1 = endAngle.apply(this, argv) - halfPi;
          if (!context)
            context = buffer = d3Path.path();
          if (ap > epsilon) {
            if (abs(sa1 - sa0) > ap * 2 + epsilon)
              sa1 > sa0 ? (sa0 += ap, sa1 -= ap) : (sa0 -= ap, sa1 += ap);
            else
              sa0 = sa1 = (sa0 + sa1) / 2;
            if (abs(ta1 - ta0) > ap * 2 + epsilon)
              ta1 > ta0 ? (ta0 += ap, ta1 -= ap) : (ta0 -= ap, ta1 += ap);
            else
              ta0 = ta1 = (ta0 + ta1) / 2;
          }
          context.moveTo(sr * cos(sa0), sr * sin(sa0));
          context.arc(0, 0, sr, sa0, sa1);
          if (sa0 !== ta0 || sa1 !== ta1) {
            if (headRadius) {
              var hr = +headRadius.apply(this, arguments), tr2 = tr - hr, ta2 = (ta0 + ta1) / 2;
              context.quadraticCurveTo(0, 0, tr2 * cos(ta0), tr2 * sin(ta0));
              context.lineTo(tr * cos(ta2), tr * sin(ta2));
              context.lineTo(tr2 * cos(ta1), tr2 * sin(ta1));
            } else {
              context.quadraticCurveTo(0, 0, tr * cos(ta0), tr * sin(ta0));
              context.arc(0, 0, tr, ta0, ta1);
            }
          }
          context.quadraticCurveTo(0, 0, sr * cos(sa0), sr * sin(sa0));
          context.closePath();
          if (buffer)
            return context = null, buffer + "" || null;
        }
        if (headRadius)
          ribbon2.headRadius = function(_) {
            return arguments.length ? (headRadius = typeof _ === "function" ? _ : constant(+_), ribbon2) : headRadius;
          };
        ribbon2.radius = function(_) {
          return arguments.length ? (sourceRadius = targetRadius = typeof _ === "function" ? _ : constant(+_), ribbon2) : sourceRadius;
        };
        ribbon2.sourceRadius = function(_) {
          return arguments.length ? (sourceRadius = typeof _ === "function" ? _ : constant(+_), ribbon2) : sourceRadius;
        };
        ribbon2.targetRadius = function(_) {
          return arguments.length ? (targetRadius = typeof _ === "function" ? _ : constant(+_), ribbon2) : targetRadius;
        };
        ribbon2.startAngle = function(_) {
          return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), ribbon2) : startAngle;
        };
        ribbon2.endAngle = function(_) {
          return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), ribbon2) : endAngle;
        };
        ribbon2.padAngle = function(_) {
          return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), ribbon2) : padAngle;
        };
        ribbon2.source = function(_) {
          return arguments.length ? (source = _, ribbon2) : source;
        };
        ribbon2.target = function(_) {
          return arguments.length ? (target = _, ribbon2) : target;
        };
        ribbon2.context = function(_) {
          return arguments.length ? (context = _ == null ? null : _, ribbon2) : context;
        };
        return ribbon2;
      }
      function ribbon$1() {
        return ribbon();
      }
      function ribbonArrow() {
        return ribbon(defaultArrowheadRadius);
      }
      exports2.chord = chord;
      exports2.chordDirected = chordDirected;
      exports2.chordTranspose = chordTranspose;
      exports2.ribbon = ribbon$1;
      exports2.ribbonArrow = ribbonArrow;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-contour@2.0.0/node_modules/d3-contour/dist/d3-contour.js
var require_d3_contour = __commonJS({
  "node_modules/.pnpm/d3-contour@2.0.0/node_modules/d3-contour/dist/d3-contour.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_array()) : typeof define === "function" && define.amd ? define(["exports", "d3-array"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3));
    })(exports, function(exports2, d3Array) {
      "use strict";
      var array = Array.prototype;
      var slice = array.slice;
      function ascending(a, b) {
        return a - b;
      }
      function area(ring) {
        var i = 0, n = ring.length, area2 = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
        while (++i < n)
          area2 += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
        return area2;
      }
      var constant = (x) => () => x;
      function contains(ring, hole) {
        var i = -1, n = hole.length, c;
        while (++i < n)
          if (c = ringContains(ring, hole[i]))
            return c;
        return 0;
      }
      function ringContains(ring, point) {
        var x = point[0], y = point[1], contains2 = -1;
        for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
          var pi = ring[i], xi = pi[0], yi = pi[1], pj = ring[j], xj = pj[0], yj = pj[1];
          if (segmentContains(pi, pj, point))
            return 0;
          if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi)
            contains2 = -contains2;
        }
        return contains2;
      }
      function segmentContains(a, b, c) {
        var i;
        return collinear(a, b, c) && within(a[i = +(a[0] === b[0])], c[i], b[i]);
      }
      function collinear(a, b, c) {
        return (b[0] - a[0]) * (c[1] - a[1]) === (c[0] - a[0]) * (b[1] - a[1]);
      }
      function within(p, q, r) {
        return p <= q && q <= r || r <= q && q <= p;
      }
      function noop() {
      }
      var cases = [
        [],
        [[[1, 1.5], [0.5, 1]]],
        [[[1.5, 1], [1, 1.5]]],
        [[[1.5, 1], [0.5, 1]]],
        [[[1, 0.5], [1.5, 1]]],
        [[[1, 1.5], [0.5, 1]], [[1, 0.5], [1.5, 1]]],
        [[[1, 0.5], [1, 1.5]]],
        [[[1, 0.5], [0.5, 1]]],
        [[[0.5, 1], [1, 0.5]]],
        [[[1, 1.5], [1, 0.5]]],
        [[[0.5, 1], [1, 0.5]], [[1.5, 1], [1, 1.5]]],
        [[[1.5, 1], [1, 0.5]]],
        [[[0.5, 1], [1.5, 1]]],
        [[[1, 1.5], [1.5, 1]]],
        [[[0.5, 1], [1, 1.5]]],
        []
      ];
      function contours() {
        var dx = 1, dy = 1, threshold = d3Array.thresholdSturges, smooth = smoothLinear;
        function contours2(values) {
          var tz = threshold(values);
          if (!Array.isArray(tz)) {
            var domain = d3Array.extent(values), start = domain[0], stop = domain[1];
            tz = d3Array.tickStep(start, stop, tz);
            tz = d3Array.range(Math.floor(start / tz) * tz, Math.floor(stop / tz) * tz, tz);
          } else {
            tz = tz.slice().sort(ascending);
          }
          return tz.map(function(value) {
            return contour(values, value);
          });
        }
        function contour(values, value) {
          var polygons = [], holes = [];
          isorings(values, value, function(ring) {
            smooth(ring, values, value);
            if (area(ring) > 0)
              polygons.push([ring]);
            else
              holes.push(ring);
          });
          holes.forEach(function(hole) {
            for (var i = 0, n = polygons.length, polygon; i < n; ++i) {
              if (contains((polygon = polygons[i])[0], hole) !== -1) {
                polygon.push(hole);
                return;
              }
            }
          });
          return {
            type: "MultiPolygon",
            value,
            coordinates: polygons
          };
        }
        function isorings(values, value, callback) {
          var fragmentByStart = new Array(), fragmentByEnd = new Array(), x, y, t0, t1, t2, t3;
          x = y = -1;
          t1 = values[0] >= value;
          cases[t1 << 1].forEach(stitch);
          while (++x < dx - 1) {
            t0 = t1, t1 = values[x + 1] >= value;
            cases[t0 | t1 << 1].forEach(stitch);
          }
          cases[t1 << 0].forEach(stitch);
          while (++y < dy - 1) {
            x = -1;
            t1 = values[y * dx + dx] >= value;
            t2 = values[y * dx] >= value;
            cases[t1 << 1 | t2 << 2].forEach(stitch);
            while (++x < dx - 1) {
              t0 = t1, t1 = values[y * dx + dx + x + 1] >= value;
              t3 = t2, t2 = values[y * dx + x + 1] >= value;
              cases[t0 | t1 << 1 | t2 << 2 | t3 << 3].forEach(stitch);
            }
            cases[t1 | t2 << 3].forEach(stitch);
          }
          x = -1;
          t2 = values[y * dx] >= value;
          cases[t2 << 2].forEach(stitch);
          while (++x < dx - 1) {
            t3 = t2, t2 = values[y * dx + x + 1] >= value;
            cases[t2 << 2 | t3 << 3].forEach(stitch);
          }
          cases[t2 << 3].forEach(stitch);
          function stitch(line) {
            var start = [line[0][0] + x, line[0][1] + y], end = [line[1][0] + x, line[1][1] + y], startIndex = index(start), endIndex = index(end), f, g;
            if (f = fragmentByEnd[startIndex]) {
              if (g = fragmentByStart[endIndex]) {
                delete fragmentByEnd[f.end];
                delete fragmentByStart[g.start];
                if (f === g) {
                  f.ring.push(end);
                  callback(f.ring);
                } else {
                  fragmentByStart[f.start] = fragmentByEnd[g.end] = { start: f.start, end: g.end, ring: f.ring.concat(g.ring) };
                }
              } else {
                delete fragmentByEnd[f.end];
                f.ring.push(end);
                fragmentByEnd[f.end = endIndex] = f;
              }
            } else if (f = fragmentByStart[endIndex]) {
              if (g = fragmentByEnd[startIndex]) {
                delete fragmentByStart[f.start];
                delete fragmentByEnd[g.end];
                if (f === g) {
                  f.ring.push(end);
                  callback(f.ring);
                } else {
                  fragmentByStart[g.start] = fragmentByEnd[f.end] = { start: g.start, end: f.end, ring: g.ring.concat(f.ring) };
                }
              } else {
                delete fragmentByStart[f.start];
                f.ring.unshift(start);
                fragmentByStart[f.start = startIndex] = f;
              }
            } else {
              fragmentByStart[startIndex] = fragmentByEnd[endIndex] = { start: startIndex, end: endIndex, ring: [start, end] };
            }
          }
        }
        function index(point) {
          return point[0] * 2 + point[1] * (dx + 1) * 4;
        }
        function smoothLinear(ring, values, value) {
          ring.forEach(function(point) {
            var x = point[0], y = point[1], xt = x | 0, yt = y | 0, v0, v1 = values[yt * dx + xt];
            if (x > 0 && x < dx && xt === x) {
              v0 = values[yt * dx + xt - 1];
              point[0] = x + (value - v0) / (v1 - v0) - 0.5;
            }
            if (y > 0 && y < dy && yt === y) {
              v0 = values[(yt - 1) * dx + xt];
              point[1] = y + (value - v0) / (v1 - v0) - 0.5;
            }
          });
        }
        contours2.contour = contour;
        contours2.size = function(_) {
          if (!arguments.length)
            return [dx, dy];
          var _0 = Math.floor(_[0]), _1 = Math.floor(_[1]);
          if (!(_0 >= 0 && _1 >= 0))
            throw new Error("invalid size");
          return dx = _0, dy = _1, contours2;
        };
        contours2.thresholds = function(_) {
          return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), contours2) : threshold;
        };
        contours2.smooth = function(_) {
          return arguments.length ? (smooth = _ ? smoothLinear : noop, contours2) : smooth === smoothLinear;
        };
        return contours2;
      }
      function blurX(source, target, r) {
        var n = source.width, m = source.height, w = (r << 1) + 1;
        for (var j = 0; j < m; ++j) {
          for (var i = 0, sr = 0; i < n + r; ++i) {
            if (i < n) {
              sr += source.data[i + j * n];
            }
            if (i >= r) {
              if (i >= w) {
                sr -= source.data[i - w + j * n];
              }
              target.data[i - r + j * n] = sr / Math.min(i + 1, n - 1 + w - i, w);
            }
          }
        }
      }
      function blurY(source, target, r) {
        var n = source.width, m = source.height, w = (r << 1) + 1;
        for (var i = 0; i < n; ++i) {
          for (var j = 0, sr = 0; j < m + r; ++j) {
            if (j < m) {
              sr += source.data[i + j * n];
            }
            if (j >= r) {
              if (j >= w) {
                sr -= source.data[i + (j - w) * n];
              }
              target.data[i + (j - r) * n] = sr / Math.min(j + 1, m - 1 + w - j, w);
            }
          }
        }
      }
      function defaultX(d) {
        return d[0];
      }
      function defaultY(d) {
        return d[1];
      }
      function defaultWeight() {
        return 1;
      }
      function density() {
        var x = defaultX, y = defaultY, weight = defaultWeight, dx = 960, dy = 500, r = 20, k = 2, o = r * 3, n = dx + o * 2 >> k, m = dy + o * 2 >> k, threshold = constant(20);
        function density2(data) {
          var values0 = new Float32Array(n * m), values1 = new Float32Array(n * m);
          data.forEach(function(d, i, data2) {
            var xi = +x(d, i, data2) + o >> k, yi = +y(d, i, data2) + o >> k, wi = +weight(d, i, data2);
            if (xi >= 0 && xi < n && yi >= 0 && yi < m) {
              values0[xi + yi * n] += wi;
            }
          });
          blurX({ width: n, height: m, data: values0 }, { width: n, height: m, data: values1 }, r >> k);
          blurY({ width: n, height: m, data: values1 }, { width: n, height: m, data: values0 }, r >> k);
          blurX({ width: n, height: m, data: values0 }, { width: n, height: m, data: values1 }, r >> k);
          blurY({ width: n, height: m, data: values1 }, { width: n, height: m, data: values0 }, r >> k);
          blurX({ width: n, height: m, data: values0 }, { width: n, height: m, data: values1 }, r >> k);
          blurY({ width: n, height: m, data: values1 }, { width: n, height: m, data: values0 }, r >> k);
          var tz = threshold(values0);
          if (!Array.isArray(tz)) {
            var stop = d3Array.max(values0);
            tz = d3Array.tickStep(0, stop, tz);
            tz = d3Array.range(0, Math.floor(stop / tz) * tz, tz);
            tz.shift();
          }
          return contours().thresholds(tz).size([n, m])(values0).map(transform);
        }
        function transform(geometry) {
          geometry.value *= Math.pow(2, -2 * k);
          geometry.coordinates.forEach(transformPolygon);
          return geometry;
        }
        function transformPolygon(coordinates) {
          coordinates.forEach(transformRing);
        }
        function transformRing(coordinates) {
          coordinates.forEach(transformPoint);
        }
        function transformPoint(coordinates) {
          coordinates[0] = coordinates[0] * Math.pow(2, k) - o;
          coordinates[1] = coordinates[1] * Math.pow(2, k) - o;
        }
        function resize() {
          o = r * 3;
          n = dx + o * 2 >> k;
          m = dy + o * 2 >> k;
          return density2;
        }
        density2.x = function(_) {
          return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), density2) : x;
        };
        density2.y = function(_) {
          return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), density2) : y;
        };
        density2.weight = function(_) {
          return arguments.length ? (weight = typeof _ === "function" ? _ : constant(+_), density2) : weight;
        };
        density2.size = function(_) {
          if (!arguments.length)
            return [dx, dy];
          var _0 = +_[0], _1 = +_[1];
          if (!(_0 >= 0 && _1 >= 0))
            throw new Error("invalid size");
          return dx = _0, dy = _1, resize();
        };
        density2.cellSize = function(_) {
          if (!arguments.length)
            return 1 << k;
          if (!((_ = +_) >= 1))
            throw new Error("invalid cell size");
          return k = Math.floor(Math.log(_) / Math.LN2), resize();
        };
        density2.thresholds = function(_) {
          return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), density2) : threshold;
        };
        density2.bandwidth = function(_) {
          if (!arguments.length)
            return Math.sqrt(r * (r + 1));
          if (!((_ = +_) >= 0))
            throw new Error("invalid bandwidth");
          return r = Math.round((Math.sqrt(4 * _ * _ + 1) - 1) / 2), resize();
        };
        return density2;
      }
      exports2.contourDensity = density;
      exports2.contours = contours;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-delaunay@5.3.0/node_modules/d3-delaunay/dist/d3-delaunay.js
var require_d3_delaunay = __commonJS({
  "node_modules/.pnpm/d3-delaunay@5.3.0/node_modules/d3-delaunay/dist/d3-delaunay.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      const EPSILON = Math.pow(2, -52);
      const EDGE_STACK = new Uint32Array(512);
      class Delaunator {
        static from(points, getX = defaultGetX, getY = defaultGetY) {
          const n = points.length;
          const coords = new Float64Array(n * 2);
          for (let i = 0; i < n; i++) {
            const p = points[i];
            coords[2 * i] = getX(p);
            coords[2 * i + 1] = getY(p);
          }
          return new Delaunator(coords);
        }
        constructor(coords) {
          const n = coords.length >> 1;
          if (n > 0 && typeof coords[0] !== "number")
            throw new Error("Expected coords to contain numbers.");
          this.coords = coords;
          const maxTriangles = Math.max(2 * n - 5, 0);
          this._triangles = new Uint32Array(maxTriangles * 3);
          this._halfedges = new Int32Array(maxTriangles * 3);
          this._hashSize = Math.ceil(Math.sqrt(n));
          this._hullPrev = new Uint32Array(n);
          this._hullNext = new Uint32Array(n);
          this._hullTri = new Uint32Array(n);
          this._hullHash = new Int32Array(this._hashSize).fill(-1);
          this._ids = new Uint32Array(n);
          this._dists = new Float64Array(n);
          this.update();
        }
        update() {
          const { coords, _hullPrev: hullPrev, _hullNext: hullNext, _hullTri: hullTri, _hullHash: hullHash } = this;
          const n = coords.length >> 1;
          let minX = Infinity;
          let minY = Infinity;
          let maxX = -Infinity;
          let maxY = -Infinity;
          for (let i = 0; i < n; i++) {
            const x = coords[2 * i];
            const y = coords[2 * i + 1];
            if (x < minX)
              minX = x;
            if (y < minY)
              minY = y;
            if (x > maxX)
              maxX = x;
            if (y > maxY)
              maxY = y;
            this._ids[i] = i;
          }
          const cx = (minX + maxX) / 2;
          const cy = (minY + maxY) / 2;
          let minDist = Infinity;
          let i0, i1, i2;
          for (let i = 0; i < n; i++) {
            const d = dist(cx, cy, coords[2 * i], coords[2 * i + 1]);
            if (d < minDist) {
              i0 = i;
              minDist = d;
            }
          }
          const i0x = coords[2 * i0];
          const i0y = coords[2 * i0 + 1];
          minDist = Infinity;
          for (let i = 0; i < n; i++) {
            if (i === i0)
              continue;
            const d = dist(i0x, i0y, coords[2 * i], coords[2 * i + 1]);
            if (d < minDist && d > 0) {
              i1 = i;
              minDist = d;
            }
          }
          let i1x = coords[2 * i1];
          let i1y = coords[2 * i1 + 1];
          let minRadius = Infinity;
          for (let i = 0; i < n; i++) {
            if (i === i0 || i === i1)
              continue;
            const r = circumradius(i0x, i0y, i1x, i1y, coords[2 * i], coords[2 * i + 1]);
            if (r < minRadius) {
              i2 = i;
              minRadius = r;
            }
          }
          let i2x = coords[2 * i2];
          let i2y = coords[2 * i2 + 1];
          if (minRadius === Infinity) {
            for (let i = 0; i < n; i++) {
              this._dists[i] = coords[2 * i] - coords[0] || coords[2 * i + 1] - coords[1];
            }
            quicksort(this._ids, this._dists, 0, n - 1);
            const hull = new Uint32Array(n);
            let j = 0;
            for (let i = 0, d0 = -Infinity; i < n; i++) {
              const id = this._ids[i];
              if (this._dists[id] > d0) {
                hull[j++] = id;
                d0 = this._dists[id];
              }
            }
            this.hull = hull.subarray(0, j);
            this.triangles = new Uint32Array(0);
            this.halfedges = new Uint32Array(0);
            return;
          }
          if (orient(i0x, i0y, i1x, i1y, i2x, i2y)) {
            const i = i1;
            const x = i1x;
            const y = i1y;
            i1 = i2;
            i1x = i2x;
            i1y = i2y;
            i2 = i;
            i2x = x;
            i2y = y;
          }
          const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
          this._cx = center.x;
          this._cy = center.y;
          for (let i = 0; i < n; i++) {
            this._dists[i] = dist(coords[2 * i], coords[2 * i + 1], center.x, center.y);
          }
          quicksort(this._ids, this._dists, 0, n - 1);
          this._hullStart = i0;
          let hullSize = 3;
          hullNext[i0] = hullPrev[i2] = i1;
          hullNext[i1] = hullPrev[i0] = i2;
          hullNext[i2] = hullPrev[i1] = i0;
          hullTri[i0] = 0;
          hullTri[i1] = 1;
          hullTri[i2] = 2;
          hullHash.fill(-1);
          hullHash[this._hashKey(i0x, i0y)] = i0;
          hullHash[this._hashKey(i1x, i1y)] = i1;
          hullHash[this._hashKey(i2x, i2y)] = i2;
          this.trianglesLen = 0;
          this._addTriangle(i0, i1, i2, -1, -1, -1);
          for (let k = 0, xp, yp; k < this._ids.length; k++) {
            const i = this._ids[k];
            const x = coords[2 * i];
            const y = coords[2 * i + 1];
            if (k > 0 && Math.abs(x - xp) <= EPSILON && Math.abs(y - yp) <= EPSILON)
              continue;
            xp = x;
            yp = y;
            if (i === i0 || i === i1 || i === i2)
              continue;
            let start = 0;
            for (let j = 0, key = this._hashKey(x, y); j < this._hashSize; j++) {
              start = hullHash[(key + j) % this._hashSize];
              if (start !== -1 && start !== hullNext[start])
                break;
            }
            start = hullPrev[start];
            let e = start, q;
            while (q = hullNext[e], !orient(x, y, coords[2 * e], coords[2 * e + 1], coords[2 * q], coords[2 * q + 1])) {
              e = q;
              if (e === start) {
                e = -1;
                break;
              }
            }
            if (e === -1)
              continue;
            let t = this._addTriangle(e, i, hullNext[e], -1, -1, hullTri[e]);
            hullTri[i] = this._legalize(t + 2);
            hullTri[e] = t;
            hullSize++;
            let n2 = hullNext[e];
            while (q = hullNext[n2], orient(x, y, coords[2 * n2], coords[2 * n2 + 1], coords[2 * q], coords[2 * q + 1])) {
              t = this._addTriangle(n2, i, q, hullTri[i], -1, hullTri[n2]);
              hullTri[i] = this._legalize(t + 2);
              hullNext[n2] = n2;
              hullSize--;
              n2 = q;
            }
            if (e === start) {
              while (q = hullPrev[e], orient(x, y, coords[2 * q], coords[2 * q + 1], coords[2 * e], coords[2 * e + 1])) {
                t = this._addTriangle(q, i, e, -1, hullTri[e], hullTri[q]);
                this._legalize(t + 2);
                hullTri[q] = t;
                hullNext[e] = e;
                hullSize--;
                e = q;
              }
            }
            this._hullStart = hullPrev[i] = e;
            hullNext[e] = hullPrev[n2] = i;
            hullNext[i] = n2;
            hullHash[this._hashKey(x, y)] = i;
            hullHash[this._hashKey(coords[2 * e], coords[2 * e + 1])] = e;
          }
          this.hull = new Uint32Array(hullSize);
          for (let i = 0, e = this._hullStart; i < hullSize; i++) {
            this.hull[i] = e;
            e = hullNext[e];
          }
          this.triangles = this._triangles.subarray(0, this.trianglesLen);
          this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
        }
        _hashKey(x, y) {
          return Math.floor(pseudoAngle(x - this._cx, y - this._cy) * this._hashSize) % this._hashSize;
        }
        _legalize(a) {
          const { _triangles: triangles, _halfedges: halfedges, coords } = this;
          let i = 0;
          let ar = 0;
          while (true) {
            const b = halfedges[a];
            const a0 = a - a % 3;
            ar = a0 + (a + 2) % 3;
            if (b === -1) {
              if (i === 0)
                break;
              a = EDGE_STACK[--i];
              continue;
            }
            const b0 = b - b % 3;
            const al = a0 + (a + 1) % 3;
            const bl = b0 + (b + 2) % 3;
            const p0 = triangles[ar];
            const pr = triangles[a];
            const pl = triangles[al];
            const p1 = triangles[bl];
            const illegal = inCircle(coords[2 * p0], coords[2 * p0 + 1], coords[2 * pr], coords[2 * pr + 1], coords[2 * pl], coords[2 * pl + 1], coords[2 * p1], coords[2 * p1 + 1]);
            if (illegal) {
              triangles[a] = p1;
              triangles[b] = p0;
              const hbl = halfedges[bl];
              if (hbl === -1) {
                let e = this._hullStart;
                do {
                  if (this._hullTri[e] === bl) {
                    this._hullTri[e] = a;
                    break;
                  }
                  e = this._hullPrev[e];
                } while (e !== this._hullStart);
              }
              this._link(a, hbl);
              this._link(b, halfedges[ar]);
              this._link(ar, bl);
              const br = b0 + (b + 1) % 3;
              if (i < EDGE_STACK.length) {
                EDGE_STACK[i++] = br;
              }
            } else {
              if (i === 0)
                break;
              a = EDGE_STACK[--i];
            }
          }
          return ar;
        }
        _link(a, b) {
          this._halfedges[a] = b;
          if (b !== -1)
            this._halfedges[b] = a;
        }
        _addTriangle(i0, i1, i2, a, b, c) {
          const t = this.trianglesLen;
          this._triangles[t] = i0;
          this._triangles[t + 1] = i1;
          this._triangles[t + 2] = i2;
          this._link(t, a);
          this._link(t + 1, b);
          this._link(t + 2, c);
          this.trianglesLen += 3;
          return t;
        }
      }
      function pseudoAngle(dx, dy) {
        const p = dx / (Math.abs(dx) + Math.abs(dy));
        return (dy > 0 ? 3 - p : 1 + p) / 4;
      }
      function dist(ax, ay, bx, by) {
        const dx = ax - bx;
        const dy = ay - by;
        return dx * dx + dy * dy;
      }
      function orientIfSure(px, py, rx, ry, qx, qy) {
        const l = (ry - py) * (qx - px);
        const r = (rx - px) * (qy - py);
        return Math.abs(l - r) >= 33306690738754716e-32 * Math.abs(l + r) ? l - r : 0;
      }
      function orient(rx, ry, qx, qy, px, py) {
        const sign = orientIfSure(px, py, rx, ry, qx, qy) || orientIfSure(rx, ry, qx, qy, px, py) || orientIfSure(qx, qy, px, py, rx, ry);
        return sign < 0;
      }
      function inCircle(ax, ay, bx, by, cx, cy, px, py) {
        const dx = ax - px;
        const dy = ay - py;
        const ex = bx - px;
        const ey = by - py;
        const fx = cx - px;
        const fy = cy - py;
        const ap = dx * dx + dy * dy;
        const bp = ex * ex + ey * ey;
        const cp = fx * fx + fy * fy;
        return dx * (ey * cp - bp * fy) - dy * (ex * cp - bp * fx) + ap * (ex * fy - ey * fx) < 0;
      }
      function circumradius(ax, ay, bx, by, cx, cy) {
        const dx = bx - ax;
        const dy = by - ay;
        const ex = cx - ax;
        const ey = cy - ay;
        const bl = dx * dx + dy * dy;
        const cl = ex * ex + ey * ey;
        const d = 0.5 / (dx * ey - dy * ex);
        const x = (ey * bl - dy * cl) * d;
        const y = (dx * cl - ex * bl) * d;
        return x * x + y * y;
      }
      function circumcenter(ax, ay, bx, by, cx, cy) {
        const dx = bx - ax;
        const dy = by - ay;
        const ex = cx - ax;
        const ey = cy - ay;
        const bl = dx * dx + dy * dy;
        const cl = ex * ex + ey * ey;
        const d = 0.5 / (dx * ey - dy * ex);
        const x = ax + (ey * bl - dy * cl) * d;
        const y = ay + (dx * cl - ex * bl) * d;
        return { x, y };
      }
      function quicksort(ids, dists, left, right) {
        if (right - left <= 20) {
          for (let i = left + 1; i <= right; i++) {
            const temp = ids[i];
            const tempDist = dists[temp];
            let j = i - 1;
            while (j >= left && dists[ids[j]] > tempDist)
              ids[j + 1] = ids[j--];
            ids[j + 1] = temp;
          }
        } else {
          const median2 = left + right >> 1;
          let i = left + 1;
          let j = right;
          swap(ids, median2, i);
          if (dists[ids[left]] > dists[ids[right]])
            swap(ids, left, right);
          if (dists[ids[i]] > dists[ids[right]])
            swap(ids, i, right);
          if (dists[ids[left]] > dists[ids[i]])
            swap(ids, left, i);
          const temp = ids[i];
          const tempDist = dists[temp];
          while (true) {
            do
              i++;
            while (dists[ids[i]] < tempDist);
            do
              j--;
            while (dists[ids[j]] > tempDist);
            if (j < i)
              break;
            swap(ids, i, j);
          }
          ids[left + 1] = ids[j];
          ids[j] = temp;
          if (right - i + 1 >= j - left) {
            quicksort(ids, dists, i, right);
            quicksort(ids, dists, left, j - 1);
          } else {
            quicksort(ids, dists, left, j - 1);
            quicksort(ids, dists, i, right);
          }
        }
      }
      function swap(arr, i, j) {
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
      function defaultGetX(p) {
        return p[0];
      }
      function defaultGetY(p) {
        return p[1];
      }
      const epsilon = 1e-6;
      class Path {
        constructor() {
          this._x0 = this._y0 = this._x1 = this._y1 = null;
          this._ = "";
        }
        moveTo(x, y) {
          this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
        }
        closePath() {
          if (this._x1 !== null) {
            this._x1 = this._x0, this._y1 = this._y0;
            this._ += "Z";
          }
        }
        lineTo(x, y) {
          this._ += `L${this._x1 = +x},${this._y1 = +y}`;
        }
        arc(x, y, r) {
          x = +x, y = +y, r = +r;
          const x0 = x + r;
          const y0 = y;
          if (r < 0)
            throw new Error("negative radius");
          if (this._x1 === null)
            this._ += `M${x0},${y0}`;
          else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon)
            this._ += "L" + x0 + "," + y0;
          if (!r)
            return;
          this._ += `A${r},${r},0,1,1,${x - r},${y}A${r},${r},0,1,1,${this._x1 = x0},${this._y1 = y0}`;
        }
        rect(x, y, w, h) {
          this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${+w}v${+h}h${-w}Z`;
        }
        value() {
          return this._ || null;
        }
      }
      class Polygon {
        constructor() {
          this._ = [];
        }
        moveTo(x, y) {
          this._.push([x, y]);
        }
        closePath() {
          this._.push(this._[0].slice());
        }
        lineTo(x, y) {
          this._.push([x, y]);
        }
        value() {
          return this._.length ? this._ : null;
        }
      }
      class Voronoi {
        constructor(delaunay, [xmin, ymin, xmax, ymax] = [0, 0, 960, 500]) {
          if (!((xmax = +xmax) >= (xmin = +xmin)) || !((ymax = +ymax) >= (ymin = +ymin)))
            throw new Error("invalid bounds");
          this.delaunay = delaunay;
          this._circumcenters = new Float64Array(delaunay.points.length * 2);
          this.vectors = new Float64Array(delaunay.points.length * 2);
          this.xmax = xmax, this.xmin = xmin;
          this.ymax = ymax, this.ymin = ymin;
          this._init();
        }
        update() {
          this.delaunay.update();
          this._init();
          return this;
        }
        _init() {
          const { delaunay: { points, hull, triangles }, vectors } = this;
          const circumcenters = this.circumcenters = this._circumcenters.subarray(0, triangles.length / 3 * 2);
          for (let i = 0, j = 0, n = triangles.length, x, y; i < n; i += 3, j += 2) {
            const t1 = triangles[i] * 2;
            const t2 = triangles[i + 1] * 2;
            const t3 = triangles[i + 2] * 2;
            const x12 = points[t1];
            const y12 = points[t1 + 1];
            const x2 = points[t2];
            const y2 = points[t2 + 1];
            const x3 = points[t3];
            const y3 = points[t3 + 1];
            const dx = x2 - x12;
            const dy = y2 - y12;
            const ex = x3 - x12;
            const ey = y3 - y12;
            const bl = dx * dx + dy * dy;
            const cl = ex * ex + ey * ey;
            const ab = (dx * ey - dy * ex) * 2;
            if (!ab) {
              x = (x12 + x3) / 2 - 1e8 * ey;
              y = (y12 + y3) / 2 + 1e8 * ex;
            } else if (Math.abs(ab) < 1e-8) {
              x = (x12 + x3) / 2;
              y = (y12 + y3) / 2;
            } else {
              const d = 1 / ab;
              x = x12 + (ey * bl - dy * cl) * d;
              y = y12 + (dx * cl - ex * bl) * d;
            }
            circumcenters[j] = x;
            circumcenters[j + 1] = y;
          }
          let h = hull[hull.length - 1];
          let p0, p1 = h * 4;
          let x0, x1 = points[2 * h];
          let y0, y1 = points[2 * h + 1];
          vectors.fill(0);
          for (let i = 0; i < hull.length; ++i) {
            h = hull[i];
            p0 = p1, x0 = x1, y0 = y1;
            p1 = h * 4, x1 = points[2 * h], y1 = points[2 * h + 1];
            vectors[p0 + 2] = vectors[p1] = y0 - y1;
            vectors[p0 + 3] = vectors[p1 + 1] = x1 - x0;
          }
        }
        render(context) {
          const buffer = context == null ? context = new Path() : void 0;
          const { delaunay: { halfedges, inedges, hull }, circumcenters, vectors } = this;
          if (hull.length <= 1)
            return null;
          for (let i = 0, n = halfedges.length; i < n; ++i) {
            const j = halfedges[i];
            if (j < i)
              continue;
            const ti = Math.floor(i / 3) * 2;
            const tj = Math.floor(j / 3) * 2;
            const xi = circumcenters[ti];
            const yi = circumcenters[ti + 1];
            const xj = circumcenters[tj];
            const yj = circumcenters[tj + 1];
            this._renderSegment(xi, yi, xj, yj, context);
          }
          let h0, h1 = hull[hull.length - 1];
          for (let i = 0; i < hull.length; ++i) {
            h0 = h1, h1 = hull[i];
            const t = Math.floor(inedges[h1] / 3) * 2;
            const x = circumcenters[t];
            const y = circumcenters[t + 1];
            const v = h0 * 4;
            const p = this._project(x, y, vectors[v + 2], vectors[v + 3]);
            if (p)
              this._renderSegment(x, y, p[0], p[1], context);
          }
          return buffer && buffer.value();
        }
        renderBounds(context) {
          const buffer = context == null ? context = new Path() : void 0;
          context.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
          return buffer && buffer.value();
        }
        renderCell(i, context) {
          const buffer = context == null ? context = new Path() : void 0;
          const points = this._clip(i);
          if (points === null || !points.length)
            return;
          context.moveTo(points[0], points[1]);
          let n = points.length;
          while (points[0] === points[n - 2] && points[1] === points[n - 1] && n > 1)
            n -= 2;
          for (let i2 = 2; i2 < n; i2 += 2) {
            if (points[i2] !== points[i2 - 2] || points[i2 + 1] !== points[i2 - 1])
              context.lineTo(points[i2], points[i2 + 1]);
          }
          context.closePath();
          return buffer && buffer.value();
        }
        *cellPolygons() {
          const { delaunay: { points } } = this;
          for (let i = 0, n = points.length / 2; i < n; ++i) {
            const cell = this.cellPolygon(i);
            if (cell)
              cell.index = i, yield cell;
          }
        }
        cellPolygon(i) {
          const polygon = new Polygon();
          this.renderCell(i, polygon);
          return polygon.value();
        }
        _renderSegment(x0, y0, x1, y1, context) {
          let S;
          const c0 = this._regioncode(x0, y0);
          const c1 = this._regioncode(x1, y1);
          if (c0 === 0 && c1 === 0) {
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
          } else if (S = this._clipSegment(x0, y0, x1, y1, c0, c1)) {
            context.moveTo(S[0], S[1]);
            context.lineTo(S[2], S[3]);
          }
        }
        contains(i, x, y) {
          if ((x = +x, x !== x) || (y = +y, y !== y))
            return false;
          return this.delaunay._step(i, x, y) === i;
        }
        *neighbors(i) {
          const ci = this._clip(i);
          if (ci)
            for (const j of this.delaunay.neighbors(i)) {
              const cj = this._clip(j);
              if (cj)
                loop:
                  for (let ai = 0, li = ci.length; ai < li; ai += 2) {
                    for (let aj = 0, lj = cj.length; aj < lj; aj += 2) {
                      if (ci[ai] == cj[aj] && ci[ai + 1] == cj[aj + 1] && ci[(ai + 2) % li] == cj[(aj + lj - 2) % lj] && ci[(ai + 3) % li] == cj[(aj + lj - 1) % lj]) {
                        yield j;
                        break loop;
                      }
                    }
                  }
            }
        }
        _cell(i) {
          const { circumcenters, delaunay: { inedges, halfedges, triangles } } = this;
          const e0 = inedges[i];
          if (e0 === -1)
            return null;
          const points = [];
          let e = e0;
          do {
            const t = Math.floor(e / 3);
            points.push(circumcenters[t * 2], circumcenters[t * 2 + 1]);
            e = e % 3 === 2 ? e - 2 : e + 1;
            if (triangles[e] !== i)
              break;
            e = halfedges[e];
          } while (e !== e0 && e !== -1);
          return points;
        }
        _clip(i) {
          if (i === 0 && this.delaunay.hull.length === 1) {
            return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
          }
          const points = this._cell(i);
          if (points === null)
            return null;
          const { vectors: V } = this;
          const v = i * 4;
          return V[v] || V[v + 1] ? this._clipInfinite(i, points, V[v], V[v + 1], V[v + 2], V[v + 3]) : this._clipFinite(i, points);
        }
        _clipFinite(i, points) {
          const n = points.length;
          let P = null;
          let x0, y0, x1 = points[n - 2], y1 = points[n - 1];
          let c0, c1 = this._regioncode(x1, y1);
          let e0, e1;
          for (let j = 0; j < n; j += 2) {
            x0 = x1, y0 = y1, x1 = points[j], y1 = points[j + 1];
            c0 = c1, c1 = this._regioncode(x1, y1);
            if (c0 === 0 && c1 === 0) {
              e0 = e1, e1 = 0;
              if (P)
                P.push(x1, y1);
              else
                P = [x1, y1];
            } else {
              let S, sx0, sy0, sx1, sy1;
              if (c0 === 0) {
                if ((S = this._clipSegment(x0, y0, x1, y1, c0, c1)) === null)
                  continue;
                [sx0, sy0, sx1, sy1] = S;
              } else {
                if ((S = this._clipSegment(x1, y1, x0, y0, c1, c0)) === null)
                  continue;
                [sx1, sy1, sx0, sy0] = S;
                e0 = e1, e1 = this._edgecode(sx0, sy0);
                if (e0 && e1)
                  this._edge(i, e0, e1, P, P.length);
                if (P)
                  P.push(sx0, sy0);
                else
                  P = [sx0, sy0];
              }
              e0 = e1, e1 = this._edgecode(sx1, sy1);
              if (e0 && e1)
                this._edge(i, e0, e1, P, P.length);
              if (P)
                P.push(sx1, sy1);
              else
                P = [sx1, sy1];
            }
          }
          if (P) {
            e0 = e1, e1 = this._edgecode(P[0], P[1]);
            if (e0 && e1)
              this._edge(i, e0, e1, P, P.length);
          } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
            return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
          }
          return P;
        }
        _clipSegment(x0, y0, x1, y1, c0, c1) {
          while (true) {
            if (c0 === 0 && c1 === 0)
              return [x0, y0, x1, y1];
            if (c0 & c1)
              return null;
            let x, y, c = c0 || c1;
            if (c & 8)
              x = x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0), y = this.ymax;
            else if (c & 4)
              x = x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0), y = this.ymin;
            else if (c & 2)
              y = y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0), x = this.xmax;
            else
              y = y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0), x = this.xmin;
            if (c0)
              x0 = x, y0 = y, c0 = this._regioncode(x0, y0);
            else
              x1 = x, y1 = y, c1 = this._regioncode(x1, y1);
          }
        }
        _clipInfinite(i, points, vx0, vy0, vxn, vyn) {
          let P = Array.from(points), p;
          if (p = this._project(P[0], P[1], vx0, vy0))
            P.unshift(p[0], p[1]);
          if (p = this._project(P[P.length - 2], P[P.length - 1], vxn, vyn))
            P.push(p[0], p[1]);
          if (P = this._clipFinite(i, P)) {
            for (let j = 0, n = P.length, c0, c1 = this._edgecode(P[n - 2], P[n - 1]); j < n; j += 2) {
              c0 = c1, c1 = this._edgecode(P[j], P[j + 1]);
              if (c0 && c1)
                j = this._edge(i, c0, c1, P, j), n = P.length;
            }
          } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
            P = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax];
          }
          return P;
        }
        _edge(i, e0, e1, P, j) {
          while (e0 !== e1) {
            let x, y;
            switch (e0) {
              case 5:
                e0 = 4;
                continue;
              case 4:
                e0 = 6, x = this.xmax, y = this.ymin;
                break;
              case 6:
                e0 = 2;
                continue;
              case 2:
                e0 = 10, x = this.xmax, y = this.ymax;
                break;
              case 10:
                e0 = 8;
                continue;
              case 8:
                e0 = 9, x = this.xmin, y = this.ymax;
                break;
              case 9:
                e0 = 1;
                continue;
              case 1:
                e0 = 5, x = this.xmin, y = this.ymin;
                break;
            }
            if ((P[j] !== x || P[j + 1] !== y) && this.contains(i, x, y)) {
              P.splice(j, 0, x, y), j += 2;
            }
          }
          if (P.length > 4) {
            for (let i2 = 0; i2 < P.length; i2 += 2) {
              const j2 = (i2 + 2) % P.length, k = (i2 + 4) % P.length;
              if (P[i2] === P[j2] && P[j2] === P[k] || P[i2 + 1] === P[j2 + 1] && P[j2 + 1] === P[k + 1])
                P.splice(j2, 2), i2 -= 2;
            }
          }
          return j;
        }
        _project(x0, y0, vx, vy) {
          let t = Infinity, c, x, y;
          if (vy < 0) {
            if (y0 <= this.ymin)
              return null;
            if ((c = (this.ymin - y0) / vy) < t)
              y = this.ymin, x = x0 + (t = c) * vx;
          } else if (vy > 0) {
            if (y0 >= this.ymax)
              return null;
            if ((c = (this.ymax - y0) / vy) < t)
              y = this.ymax, x = x0 + (t = c) * vx;
          }
          if (vx > 0) {
            if (x0 >= this.xmax)
              return null;
            if ((c = (this.xmax - x0) / vx) < t)
              x = this.xmax, y = y0 + (t = c) * vy;
          } else if (vx < 0) {
            if (x0 <= this.xmin)
              return null;
            if ((c = (this.xmin - x0) / vx) < t)
              x = this.xmin, y = y0 + (t = c) * vy;
          }
          return [x, y];
        }
        _edgecode(x, y) {
          return (x === this.xmin ? 1 : x === this.xmax ? 2 : 0) | (y === this.ymin ? 4 : y === this.ymax ? 8 : 0);
        }
        _regioncode(x, y) {
          return (x < this.xmin ? 1 : x > this.xmax ? 2 : 0) | (y < this.ymin ? 4 : y > this.ymax ? 8 : 0);
        }
      }
      const tau = 2 * Math.PI, pow = Math.pow;
      function pointX(p) {
        return p[0];
      }
      function pointY(p) {
        return p[1];
      }
      function collinear(d) {
        const { triangles, coords } = d;
        for (let i = 0; i < triangles.length; i += 3) {
          const a = 2 * triangles[i], b = 2 * triangles[i + 1], c = 2 * triangles[i + 2], cross = (coords[c] - coords[a]) * (coords[b + 1] - coords[a + 1]) - (coords[b] - coords[a]) * (coords[c + 1] - coords[a + 1]);
          if (cross > 1e-10)
            return false;
        }
        return true;
      }
      function jitter(x, y, r) {
        return [x + Math.sin(x + y) * r, y + Math.cos(x - y) * r];
      }
      class Delaunay {
        static from(points, fx = pointX, fy = pointY, that) {
          return new Delaunay("length" in points ? flatArray(points, fx, fy, that) : Float64Array.from(flatIterable(points, fx, fy, that)));
        }
        constructor(points) {
          this._delaunator = new Delaunator(points);
          this.inedges = new Int32Array(points.length / 2);
          this._hullIndex = new Int32Array(points.length / 2);
          this.points = this._delaunator.coords;
          this._init();
        }
        update() {
          this._delaunator.update();
          this._init();
          return this;
        }
        _init() {
          const d = this._delaunator, points = this.points;
          if (d.hull && d.hull.length > 2 && collinear(d)) {
            this.collinear = Int32Array.from({ length: points.length / 2 }, (_, i) => i).sort((i, j) => points[2 * i] - points[2 * j] || points[2 * i + 1] - points[2 * j + 1]);
            const e = this.collinear[0], f = this.collinear[this.collinear.length - 1], bounds = [points[2 * e], points[2 * e + 1], points[2 * f], points[2 * f + 1]], r = 1e-8 * Math.hypot(bounds[3] - bounds[1], bounds[2] - bounds[0]);
            for (let i = 0, n = points.length / 2; i < n; ++i) {
              const p = jitter(points[2 * i], points[2 * i + 1], r);
              points[2 * i] = p[0];
              points[2 * i + 1] = p[1];
            }
            this._delaunator = new Delaunator(points);
          } else {
            delete this.collinear;
          }
          const halfedges = this.halfedges = this._delaunator.halfedges;
          const hull = this.hull = this._delaunator.hull;
          const triangles = this.triangles = this._delaunator.triangles;
          const inedges = this.inedges.fill(-1);
          const hullIndex = this._hullIndex.fill(-1);
          for (let e = 0, n = halfedges.length; e < n; ++e) {
            const p = triangles[e % 3 === 2 ? e - 2 : e + 1];
            if (halfedges[e] === -1 || inedges[p] === -1)
              inedges[p] = e;
          }
          for (let i = 0, n = hull.length; i < n; ++i) {
            hullIndex[hull[i]] = i;
          }
          if (hull.length <= 2 && hull.length > 0) {
            this.triangles = new Int32Array(3).fill(-1);
            this.halfedges = new Int32Array(3).fill(-1);
            this.triangles[0] = hull[0];
            this.triangles[1] = hull[1];
            this.triangles[2] = hull[1];
            inedges[hull[0]] = 1;
            if (hull.length === 2)
              inedges[hull[1]] = 0;
          }
        }
        voronoi(bounds) {
          return new Voronoi(this, bounds);
        }
        *neighbors(i) {
          const { inedges, hull, _hullIndex, halfedges, triangles, collinear: collinear2 } = this;
          if (collinear2) {
            const l = collinear2.indexOf(i);
            if (l > 0)
              yield collinear2[l - 1];
            if (l < collinear2.length - 1)
              yield collinear2[l + 1];
            return;
          }
          const e0 = inedges[i];
          if (e0 === -1)
            return;
          let e = e0, p0 = -1;
          do {
            yield p0 = triangles[e];
            e = e % 3 === 2 ? e - 2 : e + 1;
            if (triangles[e] !== i)
              return;
            e = halfedges[e];
            if (e === -1) {
              const p = hull[(_hullIndex[i] + 1) % hull.length];
              if (p !== p0)
                yield p;
              return;
            }
          } while (e !== e0);
        }
        find(x, y, i = 0) {
          if ((x = +x, x !== x) || (y = +y, y !== y))
            return -1;
          const i0 = i;
          let c;
          while ((c = this._step(i, x, y)) >= 0 && c !== i && c !== i0)
            i = c;
          return c;
        }
        _step(i, x, y) {
          const { inedges, hull, _hullIndex, halfedges, triangles, points } = this;
          if (inedges[i] === -1 || !points.length)
            return (i + 1) % (points.length >> 1);
          let c = i;
          let dc = pow(x - points[i * 2], 2) + pow(y - points[i * 2 + 1], 2);
          const e0 = inedges[i];
          let e = e0;
          do {
            let t = triangles[e];
            const dt = pow(x - points[t * 2], 2) + pow(y - points[t * 2 + 1], 2);
            if (dt < dc)
              dc = dt, c = t;
            e = e % 3 === 2 ? e - 2 : e + 1;
            if (triangles[e] !== i)
              break;
            e = halfedges[e];
            if (e === -1) {
              e = hull[(_hullIndex[i] + 1) % hull.length];
              if (e !== t) {
                if (pow(x - points[e * 2], 2) + pow(y - points[e * 2 + 1], 2) < dc)
                  return e;
              }
              break;
            }
          } while (e !== e0);
          return c;
        }
        render(context) {
          const buffer = context == null ? context = new Path() : void 0;
          const { points, halfedges, triangles } = this;
          for (let i = 0, n = halfedges.length; i < n; ++i) {
            const j = halfedges[i];
            if (j < i)
              continue;
            const ti = triangles[i] * 2;
            const tj = triangles[j] * 2;
            context.moveTo(points[ti], points[ti + 1]);
            context.lineTo(points[tj], points[tj + 1]);
          }
          this.renderHull(context);
          return buffer && buffer.value();
        }
        renderPoints(context, r = 2) {
          const buffer = context == null ? context = new Path() : void 0;
          const { points } = this;
          for (let i = 0, n = points.length; i < n; i += 2) {
            const x = points[i], y = points[i + 1];
            context.moveTo(x + r, y);
            context.arc(x, y, r, 0, tau);
          }
          return buffer && buffer.value();
        }
        renderHull(context) {
          const buffer = context == null ? context = new Path() : void 0;
          const { hull, points } = this;
          const h = hull[0] * 2, n = hull.length;
          context.moveTo(points[h], points[h + 1]);
          for (let i = 1; i < n; ++i) {
            const h2 = 2 * hull[i];
            context.lineTo(points[h2], points[h2 + 1]);
          }
          context.closePath();
          return buffer && buffer.value();
        }
        hullPolygon() {
          const polygon = new Polygon();
          this.renderHull(polygon);
          return polygon.value();
        }
        renderTriangle(i, context) {
          const buffer = context == null ? context = new Path() : void 0;
          const { points, triangles } = this;
          const t0 = triangles[i *= 3] * 2;
          const t1 = triangles[i + 1] * 2;
          const t2 = triangles[i + 2] * 2;
          context.moveTo(points[t0], points[t0 + 1]);
          context.lineTo(points[t1], points[t1 + 1]);
          context.lineTo(points[t2], points[t2 + 1]);
          context.closePath();
          return buffer && buffer.value();
        }
        *trianglePolygons() {
          const { triangles } = this;
          for (let i = 0, n = triangles.length / 3; i < n; ++i) {
            yield this.trianglePolygon(i);
          }
        }
        trianglePolygon(i) {
          const polygon = new Polygon();
          this.renderTriangle(i, polygon);
          return polygon.value();
        }
      }
      function flatArray(points, fx, fy, that) {
        const n = points.length;
        const array = new Float64Array(n * 2);
        for (let i = 0; i < n; ++i) {
          const p = points[i];
          array[i * 2] = fx.call(that, p, i, points);
          array[i * 2 + 1] = fy.call(that, p, i, points);
        }
        return array;
      }
      function* flatIterable(points, fx, fy, that) {
        let i = 0;
        for (const p of points) {
          yield fx.call(that, p, i, points);
          yield fy.call(that, p, i, points);
          ++i;
        }
      }
      exports2.Delaunay = Delaunay;
      exports2.Voronoi = Voronoi;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-dsv@2.0.0/node_modules/d3-dsv/dist/d3-dsv.js
var require_d3_dsv = __commonJS({
  "node_modules/.pnpm/d3-dsv@2.0.0/node_modules/d3-dsv/dist/d3-dsv.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      var EOL = {}, EOF = {}, QUOTE = 34, NEWLINE = 10, RETURN = 13;
      function objectConverter(columns) {
        return new Function("d", "return {" + columns.map(function(name, i) {
          return JSON.stringify(name) + ": d[" + i + '] || ""';
        }).join(",") + "}");
      }
      function customConverter(columns, f) {
        var object = objectConverter(columns);
        return function(row, i) {
          return f(object(row), i, columns);
        };
      }
      function inferColumns(rows) {
        var columnSet = /* @__PURE__ */ Object.create(null), columns = [];
        rows.forEach(function(row) {
          for (var column in row) {
            if (!(column in columnSet)) {
              columns.push(columnSet[column] = column);
            }
          }
        });
        return columns;
      }
      function pad(value, width) {
        var s = value + "", length = s.length;
        return length < width ? new Array(width - length + 1).join(0) + s : s;
      }
      function formatYear(year) {
        return year < 0 ? "-" + pad(-year, 6) : year > 9999 ? "+" + pad(year, 6) : pad(year, 4);
      }
      function formatDate2(date) {
        var hours = date.getUTCHours(), minutes = date.getUTCMinutes(), seconds = date.getUTCSeconds(), milliseconds = date.getUTCMilliseconds();
        return isNaN(date) ? "Invalid Date" : formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2) + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z" : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z" : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z" : "");
      }
      function dsv(delimiter) {
        var reFormat = new RegExp('["' + delimiter + "\n\r]"), DELIMITER = delimiter.charCodeAt(0);
        function parse2(text, f) {
          var convert, columns, rows = parseRows(text, function(row, i) {
            if (convert)
              return convert(row, i - 1);
            columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
          });
          rows.columns = columns || [];
          return rows;
        }
        function parseRows(text, f) {
          var rows = [], N = text.length, I = 0, n = 0, t, eof = N <= 0, eol = false;
          if (text.charCodeAt(N - 1) === NEWLINE)
            --N;
          if (text.charCodeAt(N - 1) === RETURN)
            --N;
          function token() {
            if (eof)
              return EOF;
            if (eol)
              return eol = false, EOL;
            var i, j = I, c;
            if (text.charCodeAt(j) === QUOTE) {
              while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE)
                ;
              if ((i = I) >= N)
                eof = true;
              else if ((c = text.charCodeAt(I++)) === NEWLINE)
                eol = true;
              else if (c === RETURN) {
                eol = true;
                if (text.charCodeAt(I) === NEWLINE)
                  ++I;
              }
              return text.slice(j + 1, i - 1).replace(/""/g, '"');
            }
            while (I < N) {
              if ((c = text.charCodeAt(i = I++)) === NEWLINE)
                eol = true;
              else if (c === RETURN) {
                eol = true;
                if (text.charCodeAt(I) === NEWLINE)
                  ++I;
              } else if (c !== DELIMITER)
                continue;
              return text.slice(j, i);
            }
            return eof = true, text.slice(j, N);
          }
          while ((t = token()) !== EOF) {
            var row = [];
            while (t !== EOL && t !== EOF)
              row.push(t), t = token();
            if (f && (row = f(row, n++)) == null)
              continue;
            rows.push(row);
          }
          return rows;
        }
        function preformatBody(rows, columns) {
          return rows.map(function(row) {
            return columns.map(function(column) {
              return formatValue(row[column]);
            }).join(delimiter);
          });
        }
        function format(rows, columns) {
          if (columns == null)
            columns = inferColumns(rows);
          return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
        }
        function formatBody(rows, columns) {
          if (columns == null)
            columns = inferColumns(rows);
          return preformatBody(rows, columns).join("\n");
        }
        function formatRows(rows) {
          return rows.map(formatRow).join("\n");
        }
        function formatRow(row) {
          return row.map(formatValue).join(delimiter);
        }
        function formatValue(value) {
          return value == null ? "" : value instanceof Date ? formatDate2(value) : reFormat.test(value += "") ? '"' + value.replace(/"/g, '""') + '"' : value;
        }
        return {
          parse: parse2,
          parseRows,
          format,
          formatBody,
          formatRows,
          formatRow,
          formatValue
        };
      }
      var csv = dsv(",");
      var csvParse = csv.parse;
      var csvParseRows = csv.parseRows;
      var csvFormat = csv.format;
      var csvFormatBody = csv.formatBody;
      var csvFormatRows = csv.formatRows;
      var csvFormatRow = csv.formatRow;
      var csvFormatValue = csv.formatValue;
      var tsv = dsv("	");
      var tsvParse = tsv.parse;
      var tsvParseRows = tsv.parseRows;
      var tsvFormat = tsv.format;
      var tsvFormatBody = tsv.formatBody;
      var tsvFormatRows = tsv.formatRows;
      var tsvFormatRow = tsv.formatRow;
      var tsvFormatValue = tsv.formatValue;
      function autoType(object) {
        for (var key in object) {
          var value = object[key].trim(), number, m;
          if (!value)
            value = null;
          else if (value === "true")
            value = true;
          else if (value === "false")
            value = false;
          else if (value === "NaN")
            value = NaN;
          else if (!isNaN(number = +value))
            value = number;
          else if (m = value.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/)) {
            if (fixtz && !!m[4] && !m[7])
              value = value.replace(/-/g, "/").replace(/T/, " ");
            value = new Date(value);
          } else
            continue;
          object[key] = value;
        }
        return object;
      }
      const fixtz = new Date("2019-01-01T00:00").getHours() || new Date("2019-07-01T00:00").getHours();
      exports2.autoType = autoType;
      exports2.csvFormat = csvFormat;
      exports2.csvFormatBody = csvFormatBody;
      exports2.csvFormatRow = csvFormatRow;
      exports2.csvFormatRows = csvFormatRows;
      exports2.csvFormatValue = csvFormatValue;
      exports2.csvParse = csvParse;
      exports2.csvParseRows = csvParseRows;
      exports2.dsvFormat = dsv;
      exports2.tsvFormat = tsvFormat;
      exports2.tsvFormatBody = tsvFormatBody;
      exports2.tsvFormatRow = tsvFormatRow;
      exports2.tsvFormatRows = tsvFormatRows;
      exports2.tsvFormatValue = tsvFormatValue;
      exports2.tsvParse = tsvParse;
      exports2.tsvParseRows = tsvParseRows;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-fetch@2.0.0/node_modules/d3-fetch/dist/d3-fetch.js
var require_d3_fetch = __commonJS({
  "node_modules/.pnpm/d3-fetch@2.0.0/node_modules/d3-fetch/dist/d3-fetch.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_dsv()) : typeof define === "function" && define.amd ? define(["exports", "d3-dsv"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3));
    })(exports, function(exports2, d3Dsv) {
      "use strict";
      function responseBlob(response) {
        if (!response.ok)
          throw new Error(response.status + " " + response.statusText);
        return response.blob();
      }
      function blob(input, init) {
        return fetch(input, init).then(responseBlob);
      }
      function responseArrayBuffer(response) {
        if (!response.ok)
          throw new Error(response.status + " " + response.statusText);
        return response.arrayBuffer();
      }
      function buffer(input, init) {
        return fetch(input, init).then(responseArrayBuffer);
      }
      function responseText(response) {
        if (!response.ok)
          throw new Error(response.status + " " + response.statusText);
        return response.text();
      }
      function text(input, init) {
        return fetch(input, init).then(responseText);
      }
      function dsvParse(parse2) {
        return function(input, init, row) {
          if (arguments.length === 2 && typeof init === "function")
            row = init, init = void 0;
          return text(input, init).then(function(response) {
            return parse2(response, row);
          });
        };
      }
      function dsv(delimiter, input, init, row) {
        if (arguments.length === 3 && typeof init === "function")
          row = init, init = void 0;
        var format = d3Dsv.dsvFormat(delimiter);
        return text(input, init).then(function(response) {
          return format.parse(response, row);
        });
      }
      var csv = dsvParse(d3Dsv.csvParse);
      var tsv = dsvParse(d3Dsv.tsvParse);
      function image(input, init) {
        return new Promise(function(resolve, reject) {
          var image2 = new Image();
          for (var key in init)
            image2[key] = init[key];
          image2.onerror = reject;
          image2.onload = function() {
            resolve(image2);
          };
          image2.src = input;
        });
      }
      function responseJson(response) {
        if (!response.ok)
          throw new Error(response.status + " " + response.statusText);
        if (response.status === 204 || response.status === 205)
          return;
        return response.json();
      }
      function json(input, init) {
        return fetch(input, init).then(responseJson);
      }
      function parser(type) {
        return (input, init) => text(input, init).then((text2) => new DOMParser().parseFromString(text2, type));
      }
      var xml = parser("application/xml");
      var html = parser("text/html");
      var svg = parser("image/svg+xml");
      exports2.blob = blob;
      exports2.buffer = buffer;
      exports2.csv = csv;
      exports2.dsv = dsv;
      exports2.html = html;
      exports2.image = image;
      exports2.json = json;
      exports2.svg = svg;
      exports2.text = text;
      exports2.tsv = tsv;
      exports2.xml = xml;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-quadtree@2.0.0/node_modules/d3-quadtree/dist/d3-quadtree.js
var require_d3_quadtree = __commonJS({
  "node_modules/.pnpm/d3-quadtree@2.0.0/node_modules/d3-quadtree/dist/d3-quadtree.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      function tree_add(d) {
        const x = +this._x.call(null, d), y = +this._y.call(null, d);
        return add(this.cover(x, y), x, y, d);
      }
      function add(tree, x, y, d) {
        if (isNaN(x) || isNaN(y))
          return tree;
        var parent, node = tree._root, leaf = { data: d }, x0 = tree._x0, y0 = tree._y0, x1 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i, j;
        if (!node)
          return tree._root = leaf, tree;
        while (node.length) {
          if (right = x >= (xm = (x0 + x1) / 2))
            x0 = xm;
          else
            x1 = xm;
          if (bottom = y >= (ym = (y0 + y1) / 2))
            y0 = ym;
          else
            y1 = ym;
          if (parent = node, !(node = node[i = bottom << 1 | right]))
            return parent[i] = leaf, tree;
        }
        xp = +tree._x.call(null, node.data);
        yp = +tree._y.call(null, node.data);
        if (x === xp && y === yp)
          return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;
        do {
          parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
          if (right = x >= (xm = (x0 + x1) / 2))
            x0 = xm;
          else
            x1 = xm;
          if (bottom = y >= (ym = (y0 + y1) / 2))
            y0 = ym;
          else
            y1 = ym;
        } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));
        return parent[j] = node, parent[i] = leaf, tree;
      }
      function addAll(data) {
        var d, i, n = data.length, x, y, xz = new Array(n), yz = new Array(n), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        for (i = 0; i < n; ++i) {
          if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d)))
            continue;
          xz[i] = x;
          yz[i] = y;
          if (x < x0)
            x0 = x;
          if (x > x1)
            x1 = x;
          if (y < y0)
            y0 = y;
          if (y > y1)
            y1 = y;
        }
        if (x0 > x1 || y0 > y1)
          return this;
        this.cover(x0, y0).cover(x1, y1);
        for (i = 0; i < n; ++i) {
          add(this, xz[i], yz[i], data[i]);
        }
        return this;
      }
      function tree_cover(x, y) {
        if (isNaN(x = +x) || isNaN(y = +y))
          return this;
        var x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1;
        if (isNaN(x0)) {
          x1 = (x0 = Math.floor(x)) + 1;
          y1 = (y0 = Math.floor(y)) + 1;
        } else {
          var z = x1 - x0 || 1, node = this._root, parent, i;
          while (x0 > x || x >= x1 || y0 > y || y >= y1) {
            i = (y < y0) << 1 | x < x0;
            parent = new Array(4), parent[i] = node, node = parent, z *= 2;
            switch (i) {
              case 0:
                x1 = x0 + z, y1 = y0 + z;
                break;
              case 1:
                x0 = x1 - z, y1 = y0 + z;
                break;
              case 2:
                x1 = x0 + z, y0 = y1 - z;
                break;
              case 3:
                x0 = x1 - z, y0 = y1 - z;
                break;
            }
          }
          if (this._root && this._root.length)
            this._root = node;
        }
        this._x0 = x0;
        this._y0 = y0;
        this._x1 = x1;
        this._y1 = y1;
        return this;
      }
      function tree_data() {
        var data = [];
        this.visit(function(node) {
          if (!node.length)
            do
              data.push(node.data);
            while (node = node.next);
        });
        return data;
      }
      function tree_extent(_) {
        return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
      }
      function Quad(node, x0, y0, x1, y1) {
        this.node = node;
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
      }
      function tree_find(x, y, radius) {
        var data, x0 = this._x0, y0 = this._y0, x1, y1, x2, y2, x3 = this._x1, y3 = this._y1, quads = [], node = this._root, q, i;
        if (node)
          quads.push(new Quad(node, x0, y0, x3, y3));
        if (radius == null)
          radius = Infinity;
        else {
          x0 = x - radius, y0 = y - radius;
          x3 = x + radius, y3 = y + radius;
          radius *= radius;
        }
        while (q = quads.pop()) {
          if (!(node = q.node) || (x1 = q.x0) > x3 || (y1 = q.y0) > y3 || (x2 = q.x1) < x0 || (y2 = q.y1) < y0)
            continue;
          if (node.length) {
            var xm = (x1 + x2) / 2, ym = (y1 + y2) / 2;
            quads.push(new Quad(node[3], xm, ym, x2, y2), new Quad(node[2], x1, ym, xm, y2), new Quad(node[1], xm, y1, x2, ym), new Quad(node[0], x1, y1, xm, ym));
            if (i = (y >= ym) << 1 | x >= xm) {
              q = quads[quads.length - 1];
              quads[quads.length - 1] = quads[quads.length - 1 - i];
              quads[quads.length - 1 - i] = q;
            }
          } else {
            var dx = x - +this._x.call(null, node.data), dy = y - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
            if (d2 < radius) {
              var d = Math.sqrt(radius = d2);
              x0 = x - d, y0 = y - d;
              x3 = x + d, y3 = y + d;
              data = node.data;
            }
          }
        }
        return data;
      }
      function tree_remove(d) {
        if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d)))
          return this;
        var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1, x, y, xm, ym, right, bottom, i, j;
        if (!node)
          return this;
        if (node.length)
          while (true) {
            if (right = x >= (xm = (x0 + x1) / 2))
              x0 = xm;
            else
              x1 = xm;
            if (bottom = y >= (ym = (y0 + y1) / 2))
              y0 = ym;
            else
              y1 = ym;
            if (!(parent = node, node = node[i = bottom << 1 | right]))
              return this;
            if (!node.length)
              break;
            if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3])
              retainer = parent, j = i;
          }
        while (node.data !== d)
          if (!(previous = node, node = node.next))
            return this;
        if (next = node.next)
          delete node.next;
        if (previous)
          return next ? previous.next = next : delete previous.next, this;
        if (!parent)
          return this._root = next, this;
        next ? parent[i] = next : delete parent[i];
        if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
          if (retainer)
            retainer[j] = node;
          else
            this._root = node;
        }
        return this;
      }
      function removeAll(data) {
        for (var i = 0, n = data.length; i < n; ++i)
          this.remove(data[i]);
        return this;
      }
      function tree_root() {
        return this._root;
      }
      function tree_size() {
        var size = 0;
        this.visit(function(node) {
          if (!node.length)
            do
              ++size;
            while (node = node.next);
        });
        return size;
      }
      function tree_visit(callback) {
        var quads = [], q, node = this._root, child, x0, y0, x1, y1;
        if (node)
          quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
        while (q = quads.pop()) {
          if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
            var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
            if (child = node[3])
              quads.push(new Quad(child, xm, ym, x1, y1));
            if (child = node[2])
              quads.push(new Quad(child, x0, ym, xm, y1));
            if (child = node[1])
              quads.push(new Quad(child, xm, y0, x1, ym));
            if (child = node[0])
              quads.push(new Quad(child, x0, y0, xm, ym));
          }
        }
        return this;
      }
      function tree_visitAfter(callback) {
        var quads = [], next = [], q;
        if (this._root)
          quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
        while (q = quads.pop()) {
          var node = q.node;
          if (node.length) {
            var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
            if (child = node[0])
              quads.push(new Quad(child, x0, y0, xm, ym));
            if (child = node[1])
              quads.push(new Quad(child, xm, y0, x1, ym));
            if (child = node[2])
              quads.push(new Quad(child, x0, ym, xm, y1));
            if (child = node[3])
              quads.push(new Quad(child, xm, ym, x1, y1));
          }
          next.push(q);
        }
        while (q = next.pop()) {
          callback(q.node, q.x0, q.y0, q.x1, q.y1);
        }
        return this;
      }
      function defaultX(d) {
        return d[0];
      }
      function tree_x(_) {
        return arguments.length ? (this._x = _, this) : this._x;
      }
      function defaultY(d) {
        return d[1];
      }
      function tree_y(_) {
        return arguments.length ? (this._y = _, this) : this._y;
      }
      function quadtree(nodes, x, y) {
        var tree = new Quadtree(x == null ? defaultX : x, y == null ? defaultY : y, NaN, NaN, NaN, NaN);
        return nodes == null ? tree : tree.addAll(nodes);
      }
      function Quadtree(x, y, x0, y0, x1, y1) {
        this._x = x;
        this._y = y;
        this._x0 = x0;
        this._y0 = y0;
        this._x1 = x1;
        this._y1 = y1;
        this._root = void 0;
      }
      function leaf_copy(leaf) {
        var copy = { data: leaf.data }, next = copy;
        while (leaf = leaf.next)
          next = next.next = { data: leaf.data };
        return copy;
      }
      var treeProto = quadtree.prototype = Quadtree.prototype;
      treeProto.copy = function() {
        var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
        if (!node)
          return copy;
        if (!node.length)
          return copy._root = leaf_copy(node), copy;
        nodes = [{ source: node, target: copy._root = new Array(4) }];
        while (node = nodes.pop()) {
          for (var i = 0; i < 4; ++i) {
            if (child = node.source[i]) {
              if (child.length)
                nodes.push({ source: child, target: node.target[i] = new Array(4) });
              else
                node.target[i] = leaf_copy(child);
            }
          }
        }
        return copy;
      };
      treeProto.add = tree_add;
      treeProto.addAll = addAll;
      treeProto.cover = tree_cover;
      treeProto.data = tree_data;
      treeProto.extent = tree_extent;
      treeProto.find = tree_find;
      treeProto.remove = tree_remove;
      treeProto.removeAll = removeAll;
      treeProto.root = tree_root;
      treeProto.size = tree_size;
      treeProto.visit = tree_visit;
      treeProto.visitAfter = tree_visitAfter;
      treeProto.x = tree_x;
      treeProto.y = tree_y;
      exports2.quadtree = quadtree;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-force@2.1.1/node_modules/d3-force/dist/d3-force.js
var require_d3_force = __commonJS({
  "node_modules/.pnpm/d3-force@2.1.1/node_modules/d3-force/dist/d3-force.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_quadtree(), require_d3_dispatch(), require_d3_timer()) : typeof define === "function" && define.amd ? define(["exports", "d3-quadtree", "d3-dispatch", "d3-timer"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3, global2.d3, global2.d3));
    })(exports, function(exports2, d3Quadtree, d3Dispatch, d3Timer) {
      "use strict";
      function center(x2, y2) {
        var nodes, strength = 1;
        if (x2 == null)
          x2 = 0;
        if (y2 == null)
          y2 = 0;
        function force() {
          var i, n = nodes.length, node, sx = 0, sy = 0;
          for (i = 0; i < n; ++i) {
            node = nodes[i], sx += node.x, sy += node.y;
          }
          for (sx = (sx / n - x2) * strength, sy = (sy / n - y2) * strength, i = 0; i < n; ++i) {
            node = nodes[i], node.x -= sx, node.y -= sy;
          }
        }
        force.initialize = function(_) {
          nodes = _;
        };
        force.x = function(_) {
          return arguments.length ? (x2 = +_, force) : x2;
        };
        force.y = function(_) {
          return arguments.length ? (y2 = +_, force) : y2;
        };
        force.strength = function(_) {
          return arguments.length ? (strength = +_, force) : strength;
        };
        return force;
      }
      function constant(x2) {
        return function() {
          return x2;
        };
      }
      function jiggle(random) {
        return (random() - 0.5) * 1e-6;
      }
      function x(d) {
        return d.x + d.vx;
      }
      function y(d) {
        return d.y + d.vy;
      }
      function collide(radius) {
        var nodes, radii, random, strength = 1, iterations = 1;
        if (typeof radius !== "function")
          radius = constant(radius == null ? 1 : +radius);
        function force() {
          var i, n = nodes.length, tree, node, xi, yi, ri, ri2;
          for (var k = 0; k < iterations; ++k) {
            tree = d3Quadtree.quadtree(nodes, x, y).visitAfter(prepare);
            for (i = 0; i < n; ++i) {
              node = nodes[i];
              ri = radii[node.index], ri2 = ri * ri;
              xi = node.x + node.vx;
              yi = node.y + node.vy;
              tree.visit(apply);
            }
          }
          function apply(quad, x0, y0, x1, y1) {
            var data = quad.data, rj = quad.r, r = ri + rj;
            if (data) {
              if (data.index > node.index) {
                var x2 = xi - data.x - data.vx, y2 = yi - data.y - data.vy, l = x2 * x2 + y2 * y2;
                if (l < r * r) {
                  if (x2 === 0)
                    x2 = jiggle(random), l += x2 * x2;
                  if (y2 === 0)
                    y2 = jiggle(random), l += y2 * y2;
                  l = (r - (l = Math.sqrt(l))) / l * strength;
                  node.vx += (x2 *= l) * (r = (rj *= rj) / (ri2 + rj));
                  node.vy += (y2 *= l) * r;
                  data.vx -= x2 * (r = 1 - r);
                  data.vy -= y2 * r;
                }
              }
              return;
            }
            return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
          }
        }
        function prepare(quad) {
          if (quad.data)
            return quad.r = radii[quad.data.index];
          for (var i = quad.r = 0; i < 4; ++i) {
            if (quad[i] && quad[i].r > quad.r) {
              quad.r = quad[i].r;
            }
          }
        }
        function initialize() {
          if (!nodes)
            return;
          var i, n = nodes.length, node;
          radii = new Array(n);
          for (i = 0; i < n; ++i)
            node = nodes[i], radii[node.index] = +radius(node, i, nodes);
        }
        force.initialize = function(_nodes, _random) {
          nodes = _nodes;
          random = _random;
          initialize();
        };
        force.iterations = function(_) {
          return arguments.length ? (iterations = +_, force) : iterations;
        };
        force.strength = function(_) {
          return arguments.length ? (strength = +_, force) : strength;
        };
        force.radius = function(_) {
          return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), initialize(), force) : radius;
        };
        return force;
      }
      function index(d) {
        return d.index;
      }
      function find(nodeById, nodeId) {
        var node = nodeById.get(nodeId);
        if (!node)
          throw new Error("node not found: " + nodeId);
        return node;
      }
      function link(links) {
        var id = index, strength = defaultStrength, strengths, distance = constant(30), distances, nodes, count, bias, random, iterations = 1;
        if (links == null)
          links = [];
        function defaultStrength(link2) {
          return 1 / Math.min(count[link2.source.index], count[link2.target.index]);
        }
        function force(alpha) {
          for (var k = 0, n = links.length; k < iterations; ++k) {
            for (var i = 0, link2, source, target, x2, y2, l, b; i < n; ++i) {
              link2 = links[i], source = link2.source, target = link2.target;
              x2 = target.x + target.vx - source.x - source.vx || jiggle(random);
              y2 = target.y + target.vy - source.y - source.vy || jiggle(random);
              l = Math.sqrt(x2 * x2 + y2 * y2);
              l = (l - distances[i]) / l * alpha * strengths[i];
              x2 *= l, y2 *= l;
              target.vx -= x2 * (b = bias[i]);
              target.vy -= y2 * b;
              source.vx += x2 * (b = 1 - b);
              source.vy += y2 * b;
            }
          }
        }
        function initialize() {
          if (!nodes)
            return;
          var i, n = nodes.length, m2 = links.length, nodeById = new Map(nodes.map((d, i2) => [id(d, i2, nodes), d])), link2;
          for (i = 0, count = new Array(n); i < m2; ++i) {
            link2 = links[i], link2.index = i;
            if (typeof link2.source !== "object")
              link2.source = find(nodeById, link2.source);
            if (typeof link2.target !== "object")
              link2.target = find(nodeById, link2.target);
            count[link2.source.index] = (count[link2.source.index] || 0) + 1;
            count[link2.target.index] = (count[link2.target.index] || 0) + 1;
          }
          for (i = 0, bias = new Array(m2); i < m2; ++i) {
            link2 = links[i], bias[i] = count[link2.source.index] / (count[link2.source.index] + count[link2.target.index]);
          }
          strengths = new Array(m2), initializeStrength();
          distances = new Array(m2), initializeDistance();
        }
        function initializeStrength() {
          if (!nodes)
            return;
          for (var i = 0, n = links.length; i < n; ++i) {
            strengths[i] = +strength(links[i], i, links);
          }
        }
        function initializeDistance() {
          if (!nodes)
            return;
          for (var i = 0, n = links.length; i < n; ++i) {
            distances[i] = +distance(links[i], i, links);
          }
        }
        force.initialize = function(_nodes, _random) {
          nodes = _nodes;
          random = _random;
          initialize();
        };
        force.links = function(_) {
          return arguments.length ? (links = _, initialize(), force) : links;
        };
        force.id = function(_) {
          return arguments.length ? (id = _, force) : id;
        };
        force.iterations = function(_) {
          return arguments.length ? (iterations = +_, force) : iterations;
        };
        force.strength = function(_) {
          return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initializeStrength(), force) : strength;
        };
        force.distance = function(_) {
          return arguments.length ? (distance = typeof _ === "function" ? _ : constant(+_), initializeDistance(), force) : distance;
        };
        return force;
      }
      const a = 1664525;
      const c = 1013904223;
      const m = 4294967296;
      function lcg() {
        let s = 1;
        return () => (s = (a * s + c) % m) / m;
      }
      function x$1(d) {
        return d.x;
      }
      function y$1(d) {
        return d.y;
      }
      var initialRadius = 10, initialAngle = Math.PI * (3 - Math.sqrt(5));
      function simulation(nodes) {
        var simulation2, alpha = 1, alphaMin = 1e-3, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = 0.6, forces = /* @__PURE__ */ new Map(), stepper = d3Timer.timer(step), event = d3Dispatch.dispatch("tick", "end"), random = lcg();
        if (nodes == null)
          nodes = [];
        function step() {
          tick();
          event.call("tick", simulation2);
          if (alpha < alphaMin) {
            stepper.stop();
            event.call("end", simulation2);
          }
        }
        function tick(iterations) {
          var i, n = nodes.length, node;
          if (iterations === void 0)
            iterations = 1;
          for (var k = 0; k < iterations; ++k) {
            alpha += (alphaTarget - alpha) * alphaDecay;
            forces.forEach(function(force) {
              force(alpha);
            });
            for (i = 0; i < n; ++i) {
              node = nodes[i];
              if (node.fx == null)
                node.x += node.vx *= velocityDecay;
              else
                node.x = node.fx, node.vx = 0;
              if (node.fy == null)
                node.y += node.vy *= velocityDecay;
              else
                node.y = node.fy, node.vy = 0;
            }
          }
          return simulation2;
        }
        function initializeNodes() {
          for (var i = 0, n = nodes.length, node; i < n; ++i) {
            node = nodes[i], node.index = i;
            if (node.fx != null)
              node.x = node.fx;
            if (node.fy != null)
              node.y = node.fy;
            if (isNaN(node.x) || isNaN(node.y)) {
              var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
              node.x = radius * Math.cos(angle);
              node.y = radius * Math.sin(angle);
            }
            if (isNaN(node.vx) || isNaN(node.vy)) {
              node.vx = node.vy = 0;
            }
          }
        }
        function initializeForce(force) {
          if (force.initialize)
            force.initialize(nodes, random);
          return force;
        }
        initializeNodes();
        return simulation2 = {
          tick,
          restart: function() {
            return stepper.restart(step), simulation2;
          },
          stop: function() {
            return stepper.stop(), simulation2;
          },
          nodes: function(_) {
            return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation2) : nodes;
          },
          alpha: function(_) {
            return arguments.length ? (alpha = +_, simulation2) : alpha;
          },
          alphaMin: function(_) {
            return arguments.length ? (alphaMin = +_, simulation2) : alphaMin;
          },
          alphaDecay: function(_) {
            return arguments.length ? (alphaDecay = +_, simulation2) : +alphaDecay;
          },
          alphaTarget: function(_) {
            return arguments.length ? (alphaTarget = +_, simulation2) : alphaTarget;
          },
          velocityDecay: function(_) {
            return arguments.length ? (velocityDecay = 1 - _, simulation2) : 1 - velocityDecay;
          },
          randomSource: function(_) {
            return arguments.length ? (random = _, forces.forEach(initializeForce), simulation2) : random;
          },
          force: function(name, _) {
            return arguments.length > 1 ? (_ == null ? forces.delete(name) : forces.set(name, initializeForce(_)), simulation2) : forces.get(name);
          },
          find: function(x2, y2, radius) {
            var i = 0, n = nodes.length, dx, dy, d2, node, closest;
            if (radius == null)
              radius = Infinity;
            else
              radius *= radius;
            for (i = 0; i < n; ++i) {
              node = nodes[i];
              dx = x2 - node.x;
              dy = y2 - node.y;
              d2 = dx * dx + dy * dy;
              if (d2 < radius)
                closest = node, radius = d2;
            }
            return closest;
          },
          on: function(name, _) {
            return arguments.length > 1 ? (event.on(name, _), simulation2) : event.on(name);
          }
        };
      }
      function manyBody() {
        var nodes, node, random, alpha, strength = constant(-30), strengths, distanceMin2 = 1, distanceMax2 = Infinity, theta2 = 0.81;
        function force(_) {
          var i, n = nodes.length, tree = d3Quadtree.quadtree(nodes, x$1, y$1).visitAfter(accumulate);
          for (alpha = _, i = 0; i < n; ++i)
            node = nodes[i], tree.visit(apply);
        }
        function initialize() {
          if (!nodes)
            return;
          var i, n = nodes.length, node2;
          strengths = new Array(n);
          for (i = 0; i < n; ++i)
            node2 = nodes[i], strengths[node2.index] = +strength(node2, i, nodes);
        }
        function accumulate(quad) {
          var strength2 = 0, q, c2, weight = 0, x2, y2, i;
          if (quad.length) {
            for (x2 = y2 = i = 0; i < 4; ++i) {
              if ((q = quad[i]) && (c2 = Math.abs(q.value))) {
                strength2 += q.value, weight += c2, x2 += c2 * q.x, y2 += c2 * q.y;
              }
            }
            quad.x = x2 / weight;
            quad.y = y2 / weight;
          } else {
            q = quad;
            q.x = q.data.x;
            q.y = q.data.y;
            do
              strength2 += strengths[q.data.index];
            while (q = q.next);
          }
          quad.value = strength2;
        }
        function apply(quad, x1, _, x2) {
          if (!quad.value)
            return true;
          var x3 = quad.x - node.x, y2 = quad.y - node.y, w = x2 - x1, l = x3 * x3 + y2 * y2;
          if (w * w / theta2 < l) {
            if (l < distanceMax2) {
              if (x3 === 0)
                x3 = jiggle(random), l += x3 * x3;
              if (y2 === 0)
                y2 = jiggle(random), l += y2 * y2;
              if (l < distanceMin2)
                l = Math.sqrt(distanceMin2 * l);
              node.vx += x3 * quad.value * alpha / l;
              node.vy += y2 * quad.value * alpha / l;
            }
            return true;
          } else if (quad.length || l >= distanceMax2)
            return;
          if (quad.data !== node || quad.next) {
            if (x3 === 0)
              x3 = jiggle(random), l += x3 * x3;
            if (y2 === 0)
              y2 = jiggle(random), l += y2 * y2;
            if (l < distanceMin2)
              l = Math.sqrt(distanceMin2 * l);
          }
          do
            if (quad.data !== node) {
              w = strengths[quad.data.index] * alpha / l;
              node.vx += x3 * w;
              node.vy += y2 * w;
            }
          while (quad = quad.next);
        }
        force.initialize = function(_nodes, _random) {
          nodes = _nodes;
          random = _random;
          initialize();
        };
        force.strength = function(_) {
          return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
        };
        force.distanceMin = function(_) {
          return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
        };
        force.distanceMax = function(_) {
          return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
        };
        force.theta = function(_) {
          return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
        };
        return force;
      }
      function radial(radius, x2, y2) {
        var nodes, strength = constant(0.1), strengths, radiuses;
        if (typeof radius !== "function")
          radius = constant(+radius);
        if (x2 == null)
          x2 = 0;
        if (y2 == null)
          y2 = 0;
        function force(alpha) {
          for (var i = 0, n = nodes.length; i < n; ++i) {
            var node = nodes[i], dx = node.x - x2 || 1e-6, dy = node.y - y2 || 1e-6, r = Math.sqrt(dx * dx + dy * dy), k = (radiuses[i] - r) * strengths[i] * alpha / r;
            node.vx += dx * k;
            node.vy += dy * k;
          }
        }
        function initialize() {
          if (!nodes)
            return;
          var i, n = nodes.length;
          strengths = new Array(n);
          radiuses = new Array(n);
          for (i = 0; i < n; ++i) {
            radiuses[i] = +radius(nodes[i], i, nodes);
            strengths[i] = isNaN(radiuses[i]) ? 0 : +strength(nodes[i], i, nodes);
          }
        }
        force.initialize = function(_) {
          nodes = _, initialize();
        };
        force.strength = function(_) {
          return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
        };
        force.radius = function(_) {
          return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), initialize(), force) : radius;
        };
        force.x = function(_) {
          return arguments.length ? (x2 = +_, force) : x2;
        };
        force.y = function(_) {
          return arguments.length ? (y2 = +_, force) : y2;
        };
        return force;
      }
      function x$2(x2) {
        var strength = constant(0.1), nodes, strengths, xz;
        if (typeof x2 !== "function")
          x2 = constant(x2 == null ? 0 : +x2);
        function force(alpha) {
          for (var i = 0, n = nodes.length, node; i < n; ++i) {
            node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
          }
        }
        function initialize() {
          if (!nodes)
            return;
          var i, n = nodes.length;
          strengths = new Array(n);
          xz = new Array(n);
          for (i = 0; i < n; ++i) {
            strengths[i] = isNaN(xz[i] = +x2(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
          }
        }
        force.initialize = function(_) {
          nodes = _;
          initialize();
        };
        force.strength = function(_) {
          return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
        };
        force.x = function(_) {
          return arguments.length ? (x2 = typeof _ === "function" ? _ : constant(+_), initialize(), force) : x2;
        };
        return force;
      }
      function y$2(y2) {
        var strength = constant(0.1), nodes, strengths, yz;
        if (typeof y2 !== "function")
          y2 = constant(y2 == null ? 0 : +y2);
        function force(alpha) {
          for (var i = 0, n = nodes.length, node; i < n; ++i) {
            node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
          }
        }
        function initialize() {
          if (!nodes)
            return;
          var i, n = nodes.length;
          strengths = new Array(n);
          yz = new Array(n);
          for (i = 0; i < n; ++i) {
            strengths[i] = isNaN(yz[i] = +y2(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
          }
        }
        force.initialize = function(_) {
          nodes = _;
          initialize();
        };
        force.strength = function(_) {
          return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
        };
        force.y = function(_) {
          return arguments.length ? (y2 = typeof _ === "function" ? _ : constant(+_), initialize(), force) : y2;
        };
        return force;
      }
      exports2.forceCenter = center;
      exports2.forceCollide = collide;
      exports2.forceLink = link;
      exports2.forceManyBody = manyBody;
      exports2.forceRadial = radial;
      exports2.forceSimulation = simulation;
      exports2.forceX = x$2;
      exports2.forceY = y$2;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/dist/d3-format.js
var require_d3_format = __commonJS({
  "node_modules/.pnpm/d3-format@2.0.0/node_modules/d3-format/dist/d3-format.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      function formatDecimal(x) {
        return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
      }
      function formatDecimalParts(x, p) {
        if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0)
          return null;
        var i, coefficient = x.slice(0, i);
        return [
          coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
          +x.slice(i + 1)
        ];
      }
      function exponent(x) {
        return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
      }
      function formatGroup(grouping, thousands) {
        return function(value, width) {
          var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
          while (i > 0 && g > 0) {
            if (length + g + 1 > width)
              g = Math.max(1, width - length);
            t.push(value.substring(i -= g, i + g));
            if ((length += g + 1) > width)
              break;
            g = grouping[j = (j + 1) % grouping.length];
          }
          return t.reverse().join(thousands);
        };
      }
      function formatNumerals(numerals) {
        return function(value) {
          return value.replace(/[0-9]/g, function(i) {
            return numerals[+i];
          });
        };
      }
      var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
      function formatSpecifier(specifier) {
        if (!(match = re.exec(specifier)))
          throw new Error("invalid format: " + specifier);
        var match;
        return new FormatSpecifier({
          fill: match[1],
          align: match[2],
          sign: match[3],
          symbol: match[4],
          zero: match[5],
          width: match[6],
          comma: match[7],
          precision: match[8] && match[8].slice(1),
          trim: match[9],
          type: match[10]
        });
      }
      formatSpecifier.prototype = FormatSpecifier.prototype;
      function FormatSpecifier(specifier) {
        this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
        this.align = specifier.align === void 0 ? ">" : specifier.align + "";
        this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
        this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
        this.zero = !!specifier.zero;
        this.width = specifier.width === void 0 ? void 0 : +specifier.width;
        this.comma = !!specifier.comma;
        this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
        this.trim = !!specifier.trim;
        this.type = specifier.type === void 0 ? "" : specifier.type + "";
      }
      FormatSpecifier.prototype.toString = function() {
        return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
      };
      function formatTrim(s) {
        out:
          for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
            switch (s[i]) {
              case ".":
                i0 = i1 = i;
                break;
              case "0":
                if (i0 === 0)
                  i0 = i;
                i1 = i;
                break;
              default:
                if (!+s[i])
                  break out;
                if (i0 > 0)
                  i0 = 0;
                break;
            }
          }
        return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
      }
      var prefixExponent;
      function formatPrefixAuto(x, p) {
        var d = formatDecimalParts(x, p);
        if (!d)
          return x + "";
        var coefficient = d[0], exponent2 = d[1], i = exponent2 - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent2 / 3))) * 3) + 1, n = coefficient.length;
        return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0];
      }
      function formatRounded(x, p) {
        var d = formatDecimalParts(x, p);
        if (!d)
          return x + "";
        var coefficient = d[0], exponent2 = d[1];
        return exponent2 < 0 ? "0." + new Array(-exponent2).join("0") + coefficient : coefficient.length > exponent2 + 1 ? coefficient.slice(0, exponent2 + 1) + "." + coefficient.slice(exponent2 + 1) : coefficient + new Array(exponent2 - coefficient.length + 2).join("0");
      }
      var formatTypes = {
        "%": (x, p) => (x * 100).toFixed(p),
        "b": (x) => Math.round(x).toString(2),
        "c": (x) => x + "",
        "d": formatDecimal,
        "e": (x, p) => x.toExponential(p),
        "f": (x, p) => x.toFixed(p),
        "g": (x, p) => x.toPrecision(p),
        "o": (x) => Math.round(x).toString(8),
        "p": (x, p) => formatRounded(x * 100, p),
        "r": formatRounded,
        "s": formatPrefixAuto,
        "X": (x) => Math.round(x).toString(16).toUpperCase(),
        "x": (x) => Math.round(x).toString(16)
      };
      function identity(x) {
        return x;
      }
      var map = Array.prototype.map, prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
      function formatLocale(locale2) {
        var group8 = locale2.grouping === void 0 || locale2.thousands === void 0 ? identity : formatGroup(map.call(locale2.grouping, Number), locale2.thousands + ""), currencyPrefix = locale2.currency === void 0 ? "" : locale2.currency[0] + "", currencySuffix = locale2.currency === void 0 ? "" : locale2.currency[1] + "", decimal = locale2.decimal === void 0 ? "." : locale2.decimal + "", numerals = locale2.numerals === void 0 ? identity : formatNumerals(map.call(locale2.numerals, String)), percent = locale2.percent === void 0 ? "%" : locale2.percent + "", minus = locale2.minus === void 0 ? "\u2212" : locale2.minus + "", nan = locale2.nan === void 0 ? "NaN" : locale2.nan + "";
        function newFormat(specifier) {
          specifier = formatSpecifier(specifier);
          var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
          if (type === "n")
            comma = true, type = "g";
          else if (!formatTypes[type])
            precision === void 0 && (precision = 12), trim = true, type = "g";
          if (zero || fill === "0" && align === "=")
            zero = true, fill = "0", align = "=";
          var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
          var formatType = formatTypes[type], maybeSuffix = /[defgprs%]/.test(type);
          precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
          function format(value) {
            var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
            if (type === "c") {
              valueSuffix = formatType(value) + valueSuffix;
              value = "";
            } else {
              value = +value;
              var valueNegative = value < 0 || 1 / value < 0;
              value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
              if (trim)
                value = formatTrim(value);
              if (valueNegative && +value === 0 && sign !== "+")
                valueNegative = false;
              valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
              valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
              if (maybeSuffix) {
                i = -1, n = value.length;
                while (++i < n) {
                  if (c = value.charCodeAt(i), 48 > c || c > 57) {
                    valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                    value = value.slice(0, i);
                    break;
                  }
                }
              }
            }
            if (comma && !zero)
              value = group8(value, Infinity);
            var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
            if (comma && zero)
              value = group8(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
            switch (align) {
              case "<":
                value = valuePrefix + value + valueSuffix + padding;
                break;
              case "=":
                value = valuePrefix + padding + value + valueSuffix;
                break;
              case "^":
                value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
                break;
              default:
                value = padding + valuePrefix + value + valueSuffix;
                break;
            }
            return numerals(value);
          }
          format.toString = function() {
            return specifier + "";
          };
          return format;
        }
        function formatPrefix(specifier, value) {
          var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
          return function(value2) {
            return f(k * value2) + prefix;
          };
        }
        return {
          format: newFormat,
          formatPrefix
        };
      }
      var locale;
      defaultLocale({
        thousands: ",",
        grouping: [3],
        currency: ["$", ""]
      });
      function defaultLocale(definition) {
        locale = formatLocale(definition);
        exports2.format = locale.format;
        exports2.formatPrefix = locale.formatPrefix;
        return locale;
      }
      function precisionFixed(step) {
        return Math.max(0, -exponent(Math.abs(step)));
      }
      function precisionPrefix(step, value) {
        return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
      }
      function precisionRound(step, max8) {
        step = Math.abs(step), max8 = Math.abs(max8) - step;
        return Math.max(0, exponent(max8) - exponent(step)) + 1;
      }
      exports2.FormatSpecifier = FormatSpecifier;
      exports2.formatDefaultLocale = defaultLocale;
      exports2.formatLocale = formatLocale;
      exports2.formatSpecifier = formatSpecifier;
      exports2.precisionFixed = precisionFixed;
      exports2.precisionPrefix = precisionPrefix;
      exports2.precisionRound = precisionRound;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-geo@2.0.2/node_modules/d3-geo/dist/d3-geo.js
var require_d3_geo = __commonJS({
  "node_modules/.pnpm/d3-geo@2.0.2/node_modules/d3-geo/dist/d3-geo.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_array()) : typeof define === "function" && define.amd ? define(["exports", "d3-array"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3));
    })(exports, function(exports2, d3Array) {
      "use strict";
      var epsilon = 1e-6;
      var epsilon2 = 1e-12;
      var pi = Math.PI;
      var halfPi = pi / 2;
      var quarterPi = pi / 4;
      var tau = pi * 2;
      var degrees = 180 / pi;
      var radians = pi / 180;
      var abs = Math.abs;
      var atan = Math.atan;
      var atan2 = Math.atan2;
      var cos = Math.cos;
      var ceil = Math.ceil;
      var exp = Math.exp;
      var hypot = Math.hypot;
      var log = Math.log;
      var pow = Math.pow;
      var sin = Math.sin;
      var sign = Math.sign || function(x) {
        return x > 0 ? 1 : x < 0 ? -1 : 0;
      };
      var sqrt = Math.sqrt;
      var tan = Math.tan;
      function acos(x) {
        return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
      }
      function asin(x) {
        return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
      }
      function haversin(x) {
        return (x = sin(x / 2)) * x;
      }
      function noop() {
      }
      function streamGeometry(geometry, stream) {
        if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
          streamGeometryType[geometry.type](geometry, stream);
        }
      }
      var streamObjectType = {
        Feature: function(object2, stream) {
          streamGeometry(object2.geometry, stream);
        },
        FeatureCollection: function(object2, stream) {
          var features = object2.features, i = -1, n = features.length;
          while (++i < n)
            streamGeometry(features[i].geometry, stream);
        }
      };
      var streamGeometryType = {
        Sphere: function(object2, stream) {
          stream.sphere();
        },
        Point: function(object2, stream) {
          object2 = object2.coordinates;
          stream.point(object2[0], object2[1], object2[2]);
        },
        MultiPoint: function(object2, stream) {
          var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
          while (++i < n)
            object2 = coordinates2[i], stream.point(object2[0], object2[1], object2[2]);
        },
        LineString: function(object2, stream) {
          streamLine(object2.coordinates, stream, 0);
        },
        MultiLineString: function(object2, stream) {
          var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
          while (++i < n)
            streamLine(coordinates2[i], stream, 0);
        },
        Polygon: function(object2, stream) {
          streamPolygon(object2.coordinates, stream);
        },
        MultiPolygon: function(object2, stream) {
          var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
          while (++i < n)
            streamPolygon(coordinates2[i], stream);
        },
        GeometryCollection: function(object2, stream) {
          var geometries = object2.geometries, i = -1, n = geometries.length;
          while (++i < n)
            streamGeometry(geometries[i], stream);
        }
      };
      function streamLine(coordinates2, stream, closed) {
        var i = -1, n = coordinates2.length - closed, coordinate;
        stream.lineStart();
        while (++i < n)
          coordinate = coordinates2[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
        stream.lineEnd();
      }
      function streamPolygon(coordinates2, stream) {
        var i = -1, n = coordinates2.length;
        stream.polygonStart();
        while (++i < n)
          streamLine(coordinates2[i], stream, 1);
        stream.polygonEnd();
      }
      function geoStream(object2, stream) {
        if (object2 && streamObjectType.hasOwnProperty(object2.type)) {
          streamObjectType[object2.type](object2, stream);
        } else {
          streamGeometry(object2, stream);
        }
      }
      var areaRingSum = new d3Array.Adder();
      var areaSum = new d3Array.Adder(), lambda00, phi00, lambda0, cosPhi0, sinPhi0;
      var areaStream = {
        point: noop,
        lineStart: noop,
        lineEnd: noop,
        polygonStart: function() {
          areaRingSum = new d3Array.Adder();
          areaStream.lineStart = areaRingStart;
          areaStream.lineEnd = areaRingEnd;
        },
        polygonEnd: function() {
          var areaRing = +areaRingSum;
          areaSum.add(areaRing < 0 ? tau + areaRing : areaRing);
          this.lineStart = this.lineEnd = this.point = noop;
        },
        sphere: function() {
          areaSum.add(tau);
        }
      };
      function areaRingStart() {
        areaStream.point = areaPointFirst;
      }
      function areaRingEnd() {
        areaPoint(lambda00, phi00);
      }
      function areaPointFirst(lambda, phi) {
        areaStream.point = areaPoint;
        lambda00 = lambda, phi00 = phi;
        lambda *= radians, phi *= radians;
        lambda0 = lambda, cosPhi0 = cos(phi = phi / 2 + quarterPi), sinPhi0 = sin(phi);
      }
      function areaPoint(lambda, phi) {
        lambda *= radians, phi *= radians;
        phi = phi / 2 + quarterPi;
        var dLambda = lambda - lambda0, sdLambda = dLambda >= 0 ? 1 : -1, adLambda = sdLambda * dLambda, cosPhi = cos(phi), sinPhi = sin(phi), k = sinPhi0 * sinPhi, u = cosPhi0 * cosPhi + k * cos(adLambda), v = k * sdLambda * sin(adLambda);
        areaRingSum.add(atan2(v, u));
        lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
      }
      function area(object2) {
        areaSum = new d3Array.Adder();
        geoStream(object2, areaStream);
        return areaSum * 2;
      }
      function spherical(cartesian2) {
        return [atan2(cartesian2[1], cartesian2[0]), asin(cartesian2[2])];
      }
      function cartesian(spherical2) {
        var lambda = spherical2[0], phi = spherical2[1], cosPhi = cos(phi);
        return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
      }
      function cartesianDot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      }
      function cartesianCross(a, b) {
        return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
      }
      function cartesianAddInPlace(a, b) {
        a[0] += b[0], a[1] += b[1], a[2] += b[2];
      }
      function cartesianScale(vector, k) {
        return [vector[0] * k, vector[1] * k, vector[2] * k];
      }
      function cartesianNormalizeInPlace(d) {
        var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
        d[0] /= l, d[1] /= l, d[2] /= l;
      }
      var lambda0$1, phi0, lambda1, phi1, lambda2, lambda00$1, phi00$1, p0, deltaSum, ranges, range;
      var boundsStream = {
        point: boundsPoint,
        lineStart: boundsLineStart,
        lineEnd: boundsLineEnd,
        polygonStart: function() {
          boundsStream.point = boundsRingPoint;
          boundsStream.lineStart = boundsRingStart;
          boundsStream.lineEnd = boundsRingEnd;
          deltaSum = new d3Array.Adder();
          areaStream.polygonStart();
        },
        polygonEnd: function() {
          areaStream.polygonEnd();
          boundsStream.point = boundsPoint;
          boundsStream.lineStart = boundsLineStart;
          boundsStream.lineEnd = boundsLineEnd;
          if (areaRingSum < 0)
            lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
          else if (deltaSum > epsilon)
            phi1 = 90;
          else if (deltaSum < -epsilon)
            phi0 = -90;
          range[0] = lambda0$1, range[1] = lambda1;
        },
        sphere: function() {
          lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
        }
      };
      function boundsPoint(lambda, phi) {
        ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
        if (phi < phi0)
          phi0 = phi;
        if (phi > phi1)
          phi1 = phi;
      }
      function linePoint(lambda, phi) {
        var p = cartesian([lambda * radians, phi * radians]);
        if (p0) {
          var normal = cartesianCross(p0, p), equatorial = [normal[1], -normal[0], 0], inflection = cartesianCross(equatorial, normal);
          cartesianNormalizeInPlace(inflection);
          inflection = spherical(inflection);
          var delta = lambda - lambda2, sign2 = delta > 0 ? 1 : -1, lambdai = inflection[0] * degrees * sign2, phii, antimeridian = abs(delta) > 180;
          if (antimeridian ^ (sign2 * lambda2 < lambdai && lambdai < sign2 * lambda)) {
            phii = inflection[1] * degrees;
            if (phii > phi1)
              phi1 = phii;
          } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign2 * lambda2 < lambdai && lambdai < sign2 * lambda)) {
            phii = -inflection[1] * degrees;
            if (phii < phi0)
              phi0 = phii;
          } else {
            if (phi < phi0)
              phi0 = phi;
            if (phi > phi1)
              phi1 = phi;
          }
          if (antimeridian) {
            if (lambda < lambda2) {
              if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1))
                lambda1 = lambda;
            } else {
              if (angle(lambda, lambda1) > angle(lambda0$1, lambda1))
                lambda0$1 = lambda;
            }
          } else {
            if (lambda1 >= lambda0$1) {
              if (lambda < lambda0$1)
                lambda0$1 = lambda;
              if (lambda > lambda1)
                lambda1 = lambda;
            } else {
              if (lambda > lambda2) {
                if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1))
                  lambda1 = lambda;
              } else {
                if (angle(lambda, lambda1) > angle(lambda0$1, lambda1))
                  lambda0$1 = lambda;
              }
            }
          }
        } else {
          ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
        }
        if (phi < phi0)
          phi0 = phi;
        if (phi > phi1)
          phi1 = phi;
        p0 = p, lambda2 = lambda;
      }
      function boundsLineStart() {
        boundsStream.point = linePoint;
      }
      function boundsLineEnd() {
        range[0] = lambda0$1, range[1] = lambda1;
        boundsStream.point = boundsPoint;
        p0 = null;
      }
      function boundsRingPoint(lambda, phi) {
        if (p0) {
          var delta = lambda - lambda2;
          deltaSum.add(abs(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
        } else {
          lambda00$1 = lambda, phi00$1 = phi;
        }
        areaStream.point(lambda, phi);
        linePoint(lambda, phi);
      }
      function boundsRingStart() {
        areaStream.lineStart();
      }
      function boundsRingEnd() {
        boundsRingPoint(lambda00$1, phi00$1);
        areaStream.lineEnd();
        if (abs(deltaSum) > epsilon)
          lambda0$1 = -(lambda1 = 180);
        range[0] = lambda0$1, range[1] = lambda1;
        p0 = null;
      }
      function angle(lambda02, lambda12) {
        return (lambda12 -= lambda02) < 0 ? lambda12 + 360 : lambda12;
      }
      function rangeCompare(a, b) {
        return a[0] - b[0];
      }
      function rangeContains(range2, x) {
        return range2[0] <= range2[1] ? range2[0] <= x && x <= range2[1] : x < range2[0] || range2[1] < x;
      }
      function bounds(feature) {
        var i, n, a, b, merged, deltaMax, delta;
        phi1 = lambda1 = -(lambda0$1 = phi0 = Infinity);
        ranges = [];
        geoStream(feature, boundsStream);
        if (n = ranges.length) {
          ranges.sort(rangeCompare);
          for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
            b = ranges[i];
            if (rangeContains(a, b[0]) || rangeContains(a, b[1])) {
              if (angle(a[0], b[1]) > angle(a[0], a[1]))
                a[1] = b[1];
              if (angle(b[0], a[1]) > angle(a[0], a[1]))
                a[0] = b[0];
            } else {
              merged.push(a = b);
            }
          }
          for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
            b = merged[i];
            if ((delta = angle(a[1], b[0])) > deltaMax)
              deltaMax = delta, lambda0$1 = b[0], lambda1 = a[1];
          }
        }
        ranges = range = null;
        return lambda0$1 === Infinity || phi0 === Infinity ? [[NaN, NaN], [NaN, NaN]] : [[lambda0$1, phi0], [lambda1, phi1]];
      }
      var W0, W1, X0, Y0, Z0, X1, Y1, Z1, X2, Y2, Z2, lambda00$2, phi00$2, x0, y0, z0;
      var centroidStream = {
        sphere: noop,
        point: centroidPoint,
        lineStart: centroidLineStart,
        lineEnd: centroidLineEnd,
        polygonStart: function() {
          centroidStream.lineStart = centroidRingStart;
          centroidStream.lineEnd = centroidRingEnd;
        },
        polygonEnd: function() {
          centroidStream.lineStart = centroidLineStart;
          centroidStream.lineEnd = centroidLineEnd;
        }
      };
      function centroidPoint(lambda, phi) {
        lambda *= radians, phi *= radians;
        var cosPhi = cos(phi);
        centroidPointCartesian(cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi));
      }
      function centroidPointCartesian(x, y, z) {
        ++W0;
        X0 += (x - X0) / W0;
        Y0 += (y - Y0) / W0;
        Z0 += (z - Z0) / W0;
      }
      function centroidLineStart() {
        centroidStream.point = centroidLinePointFirst;
      }
      function centroidLinePointFirst(lambda, phi) {
        lambda *= radians, phi *= radians;
        var cosPhi = cos(phi);
        x0 = cosPhi * cos(lambda);
        y0 = cosPhi * sin(lambda);
        z0 = sin(phi);
        centroidStream.point = centroidLinePoint;
        centroidPointCartesian(x0, y0, z0);
      }
      function centroidLinePoint(lambda, phi) {
        lambda *= radians, phi *= radians;
        var cosPhi = cos(phi), x = cosPhi * cos(lambda), y = cosPhi * sin(lambda), z = sin(phi), w = atan2(sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
        W1 += w;
        X1 += w * (x0 + (x0 = x));
        Y1 += w * (y0 + (y0 = y));
        Z1 += w * (z0 + (z0 = z));
        centroidPointCartesian(x0, y0, z0);
      }
      function centroidLineEnd() {
        centroidStream.point = centroidPoint;
      }
      function centroidRingStart() {
        centroidStream.point = centroidRingPointFirst;
      }
      function centroidRingEnd() {
        centroidRingPoint(lambda00$2, phi00$2);
        centroidStream.point = centroidPoint;
      }
      function centroidRingPointFirst(lambda, phi) {
        lambda00$2 = lambda, phi00$2 = phi;
        lambda *= radians, phi *= radians;
        centroidStream.point = centroidRingPoint;
        var cosPhi = cos(phi);
        x0 = cosPhi * cos(lambda);
        y0 = cosPhi * sin(lambda);
        z0 = sin(phi);
        centroidPointCartesian(x0, y0, z0);
      }
      function centroidRingPoint(lambda, phi) {
        lambda *= radians, phi *= radians;
        var cosPhi = cos(phi), x = cosPhi * cos(lambda), y = cosPhi * sin(lambda), z = sin(phi), cx = y0 * z - z0 * y, cy = z0 * x - x0 * z, cz = x0 * y - y0 * x, m = hypot(cx, cy, cz), w = asin(m), v = m && -w / m;
        X2.add(v * cx);
        Y2.add(v * cy);
        Z2.add(v * cz);
        W1 += w;
        X1 += w * (x0 + (x0 = x));
        Y1 += w * (y0 + (y0 = y));
        Z1 += w * (z0 + (z0 = z));
        centroidPointCartesian(x0, y0, z0);
      }
      function centroid(object2) {
        W0 = W1 = X0 = Y0 = Z0 = X1 = Y1 = Z1 = 0;
        X2 = new d3Array.Adder();
        Y2 = new d3Array.Adder();
        Z2 = new d3Array.Adder();
        geoStream(object2, centroidStream);
        var x = +X2, y = +Y2, z = +Z2, m = hypot(x, y, z);
        if (m < epsilon2) {
          x = X1, y = Y1, z = Z1;
          if (W1 < epsilon)
            x = X0, y = Y0, z = Z0;
          m = hypot(x, y, z);
          if (m < epsilon2)
            return [NaN, NaN];
        }
        return [atan2(y, x) * degrees, asin(z / m) * degrees];
      }
      function constant(x) {
        return function() {
          return x;
        };
      }
      function compose(a, b) {
        function compose2(x, y) {
          return x = a(x, y), b(x[0], x[1]);
        }
        if (a.invert && b.invert)
          compose2.invert = function(x, y) {
            return x = b.invert(x, y), x && a.invert(x[0], x[1]);
          };
        return compose2;
      }
      function rotationIdentity(lambda, phi) {
        return [abs(lambda) > pi ? lambda + Math.round(-lambda / tau) * tau : lambda, phi];
      }
      rotationIdentity.invert = rotationIdentity;
      function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
        return (deltaLambda %= tau) ? deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma)) : rotationLambda(deltaLambda) : deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma) : rotationIdentity;
      }
      function forwardRotationLambda(deltaLambda) {
        return function(lambda, phi) {
          return lambda += deltaLambda, [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
        };
      }
      function rotationLambda(deltaLambda) {
        var rotation2 = forwardRotationLambda(deltaLambda);
        rotation2.invert = forwardRotationLambda(-deltaLambda);
        return rotation2;
      }
      function rotationPhiGamma(deltaPhi, deltaGamma) {
        var cosDeltaPhi = cos(deltaPhi), sinDeltaPhi = sin(deltaPhi), cosDeltaGamma = cos(deltaGamma), sinDeltaGamma = sin(deltaGamma);
        function rotation2(lambda, phi) {
          var cosPhi = cos(phi), x = cos(lambda) * cosPhi, y = sin(lambda) * cosPhi, z = sin(phi), k = z * cosDeltaPhi + x * sinDeltaPhi;
          return [
            atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
            asin(k * cosDeltaGamma + y * sinDeltaGamma)
          ];
        }
        rotation2.invert = function(lambda, phi) {
          var cosPhi = cos(phi), x = cos(lambda) * cosPhi, y = sin(lambda) * cosPhi, z = sin(phi), k = z * cosDeltaGamma - y * sinDeltaGamma;
          return [
            atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
            asin(k * cosDeltaPhi - x * sinDeltaPhi)
          ];
        };
        return rotation2;
      }
      function rotation(rotate) {
        rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);
        function forward(coordinates2) {
          coordinates2 = rotate(coordinates2[0] * radians, coordinates2[1] * radians);
          return coordinates2[0] *= degrees, coordinates2[1] *= degrees, coordinates2;
        }
        forward.invert = function(coordinates2) {
          coordinates2 = rotate.invert(coordinates2[0] * radians, coordinates2[1] * radians);
          return coordinates2[0] *= degrees, coordinates2[1] *= degrees, coordinates2;
        };
        return forward;
      }
      function circleStream(stream, radius, delta, direction, t0, t1) {
        if (!delta)
          return;
        var cosRadius = cos(radius), sinRadius = sin(radius), step = direction * delta;
        if (t0 == null) {
          t0 = radius + direction * tau;
          t1 = radius - step / 2;
        } else {
          t0 = circleRadius(cosRadius, t0);
          t1 = circleRadius(cosRadius, t1);
          if (direction > 0 ? t0 < t1 : t0 > t1)
            t0 += direction * tau;
        }
        for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
          point = spherical([cosRadius, -sinRadius * cos(t), -sinRadius * sin(t)]);
          stream.point(point[0], point[1]);
        }
      }
      function circleRadius(cosRadius, point) {
        point = cartesian(point), point[0] -= cosRadius;
        cartesianNormalizeInPlace(point);
        var radius = acos(-point[1]);
        return ((-point[2] < 0 ? -radius : radius) + tau - epsilon) % tau;
      }
      function circle() {
        var center = constant([0, 0]), radius = constant(90), precision = constant(6), ring, rotate, stream = { point };
        function point(x, y) {
          ring.push(x = rotate(x, y));
          x[0] *= degrees, x[1] *= degrees;
        }
        function circle2() {
          var c = center.apply(this, arguments), r = radius.apply(this, arguments) * radians, p = precision.apply(this, arguments) * radians;
          ring = [];
          rotate = rotateRadians(-c[0] * radians, -c[1] * radians, 0).invert;
          circleStream(stream, r, p, 1);
          c = { type: "Polygon", coordinates: [ring] };
          ring = rotate = null;
          return c;
        }
        circle2.center = function(_) {
          return arguments.length ? (center = typeof _ === "function" ? _ : constant([+_[0], +_[1]]), circle2) : center;
        };
        circle2.radius = function(_) {
          return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), circle2) : radius;
        };
        circle2.precision = function(_) {
          return arguments.length ? (precision = typeof _ === "function" ? _ : constant(+_), circle2) : precision;
        };
        return circle2;
      }
      function clipBuffer() {
        var lines = [], line;
        return {
          point: function(x, y, m) {
            line.push([x, y, m]);
          },
          lineStart: function() {
            lines.push(line = []);
          },
          lineEnd: noop,
          rejoin: function() {
            if (lines.length > 1)
              lines.push(lines.pop().concat(lines.shift()));
          },
          result: function() {
            var result = lines;
            lines = [];
            line = null;
            return result;
          }
        };
      }
      function pointEqual(a, b) {
        return abs(a[0] - b[0]) < epsilon && abs(a[1] - b[1]) < epsilon;
      }
      function Intersection(point, points, other, entry) {
        this.x = point;
        this.z = points;
        this.o = other;
        this.e = entry;
        this.v = false;
        this.n = this.p = null;
      }
      function clipRejoin(segments, compareIntersection2, startInside, interpolate2, stream) {
        var subject = [], clip2 = [], i, n;
        segments.forEach(function(segment) {
          if ((n2 = segment.length - 1) <= 0)
            return;
          var n2, p02 = segment[0], p1 = segment[n2], x;
          if (pointEqual(p02, p1)) {
            if (!p02[2] && !p1[2]) {
              stream.lineStart();
              for (i = 0; i < n2; ++i)
                stream.point((p02 = segment[i])[0], p02[1]);
              stream.lineEnd();
              return;
            }
            p1[0] += 2 * epsilon;
          }
          subject.push(x = new Intersection(p02, segment, null, true));
          clip2.push(x.o = new Intersection(p02, null, x, false));
          subject.push(x = new Intersection(p1, segment, null, false));
          clip2.push(x.o = new Intersection(p1, null, x, true));
        });
        if (!subject.length)
          return;
        clip2.sort(compareIntersection2);
        link(subject);
        link(clip2);
        for (i = 0, n = clip2.length; i < n; ++i) {
          clip2[i].e = startInside = !startInside;
        }
        var start = subject[0], points, point;
        while (1) {
          var current = start, isSubject = true;
          while (current.v)
            if ((current = current.n) === start)
              return;
          points = current.z;
          stream.lineStart();
          do {
            current.v = current.o.v = true;
            if (current.e) {
              if (isSubject) {
                for (i = 0, n = points.length; i < n; ++i)
                  stream.point((point = points[i])[0], point[1]);
              } else {
                interpolate2(current.x, current.n.x, 1, stream);
              }
              current = current.n;
            } else {
              if (isSubject) {
                points = current.p.z;
                for (i = points.length - 1; i >= 0; --i)
                  stream.point((point = points[i])[0], point[1]);
              } else {
                interpolate2(current.x, current.p.x, -1, stream);
              }
              current = current.p;
            }
            current = current.o;
            points = current.z;
            isSubject = !isSubject;
          } while (!current.v);
          stream.lineEnd();
        }
      }
      function link(array) {
        if (!(n = array.length))
          return;
        var n, i = 0, a = array[0], b;
        while (++i < n) {
          a.n = b = array[i];
          b.p = a;
          a = b;
        }
        a.n = b = array[0];
        b.p = a;
      }
      function longitude(point) {
        if (abs(point[0]) <= pi)
          return point[0];
        else
          return sign(point[0]) * ((abs(point[0]) + pi) % tau - pi);
      }
      function polygonContains(polygon, point) {
        var lambda = longitude(point), phi = point[1], sinPhi = sin(phi), normal = [sin(lambda), -cos(lambda), 0], angle2 = 0, winding = 0;
        var sum = new d3Array.Adder();
        if (sinPhi === 1)
          phi = halfPi + epsilon;
        else if (sinPhi === -1)
          phi = -halfPi - epsilon;
        for (var i = 0, n = polygon.length; i < n; ++i) {
          if (!(m = (ring = polygon[i]).length))
            continue;
          var ring, m, point0 = ring[m - 1], lambda02 = longitude(point0), phi02 = point0[1] / 2 + quarterPi, sinPhi02 = sin(phi02), cosPhi02 = cos(phi02);
          for (var j = 0; j < m; ++j, lambda02 = lambda12, sinPhi02 = sinPhi1, cosPhi02 = cosPhi1, point0 = point1) {
            var point1 = ring[j], lambda12 = longitude(point1), phi12 = point1[1] / 2 + quarterPi, sinPhi1 = sin(phi12), cosPhi1 = cos(phi12), delta = lambda12 - lambda02, sign2 = delta >= 0 ? 1 : -1, absDelta = sign2 * delta, antimeridian = absDelta > pi, k = sinPhi02 * sinPhi1;
            sum.add(atan2(k * sign2 * sin(absDelta), cosPhi02 * cosPhi1 + k * cos(absDelta)));
            angle2 += antimeridian ? delta + sign2 * tau : delta;
            if (antimeridian ^ lambda02 >= lambda ^ lambda12 >= lambda) {
              var arc = cartesianCross(cartesian(point0), cartesian(point1));
              cartesianNormalizeInPlace(arc);
              var intersection3 = cartesianCross(normal, arc);
              cartesianNormalizeInPlace(intersection3);
              var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection3[2]);
              if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
                winding += antimeridian ^ delta >= 0 ? 1 : -1;
              }
            }
          }
        }
        return (angle2 < -epsilon || angle2 < epsilon && sum < -epsilon2) ^ winding & 1;
      }
      function clip(pointVisible, clipLine2, interpolate2, start) {
        return function(sink) {
          var line = clipLine2(sink), ringBuffer = clipBuffer(), ringSink = clipLine2(ringBuffer), polygonStarted = false, polygon, segments, ring;
          var clip2 = {
            point,
            lineStart,
            lineEnd,
            polygonStart: function() {
              clip2.point = pointRing;
              clip2.lineStart = ringStart;
              clip2.lineEnd = ringEnd;
              segments = [];
              polygon = [];
            },
            polygonEnd: function() {
              clip2.point = point;
              clip2.lineStart = lineStart;
              clip2.lineEnd = lineEnd;
              segments = d3Array.merge(segments);
              var startInside = polygonContains(polygon, start);
              if (segments.length) {
                if (!polygonStarted)
                  sink.polygonStart(), polygonStarted = true;
                clipRejoin(segments, compareIntersection, startInside, interpolate2, sink);
              } else if (startInside) {
                if (!polygonStarted)
                  sink.polygonStart(), polygonStarted = true;
                sink.lineStart();
                interpolate2(null, null, 1, sink);
                sink.lineEnd();
              }
              if (polygonStarted)
                sink.polygonEnd(), polygonStarted = false;
              segments = polygon = null;
            },
            sphere: function() {
              sink.polygonStart();
              sink.lineStart();
              interpolate2(null, null, 1, sink);
              sink.lineEnd();
              sink.polygonEnd();
            }
          };
          function point(lambda, phi) {
            if (pointVisible(lambda, phi))
              sink.point(lambda, phi);
          }
          function pointLine(lambda, phi) {
            line.point(lambda, phi);
          }
          function lineStart() {
            clip2.point = pointLine;
            line.lineStart();
          }
          function lineEnd() {
            clip2.point = point;
            line.lineEnd();
          }
          function pointRing(lambda, phi) {
            ring.push([lambda, phi]);
            ringSink.point(lambda, phi);
          }
          function ringStart() {
            ringSink.lineStart();
            ring = [];
          }
          function ringEnd() {
            pointRing(ring[0][0], ring[0][1]);
            ringSink.lineEnd();
            var clean = ringSink.clean(), ringSegments = ringBuffer.result(), i, n = ringSegments.length, m, segment, point2;
            ring.pop();
            polygon.push(ring);
            ring = null;
            if (!n)
              return;
            if (clean & 1) {
              segment = ringSegments[0];
              if ((m = segment.length - 1) > 0) {
                if (!polygonStarted)
                  sink.polygonStart(), polygonStarted = true;
                sink.lineStart();
                for (i = 0; i < m; ++i)
                  sink.point((point2 = segment[i])[0], point2[1]);
                sink.lineEnd();
              }
              return;
            }
            if (n > 1 && clean & 2)
              ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
            segments.push(ringSegments.filter(validSegment));
          }
          return clip2;
        };
      }
      function validSegment(segment) {
        return segment.length > 1;
      }
      function compareIntersection(a, b) {
        return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon : halfPi - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon : halfPi - b[1]);
      }
      var clipAntimeridian = clip(function() {
        return true;
      }, clipAntimeridianLine, clipAntimeridianInterpolate, [-pi, -halfPi]);
      function clipAntimeridianLine(stream) {
        var lambda02 = NaN, phi02 = NaN, sign0 = NaN, clean;
        return {
          lineStart: function() {
            stream.lineStart();
            clean = 1;
          },
          point: function(lambda12, phi12) {
            var sign1 = lambda12 > 0 ? pi : -pi, delta = abs(lambda12 - lambda02);
            if (abs(delta - pi) < epsilon) {
              stream.point(lambda02, phi02 = (phi02 + phi12) / 2 > 0 ? halfPi : -halfPi);
              stream.point(sign0, phi02);
              stream.lineEnd();
              stream.lineStart();
              stream.point(sign1, phi02);
              stream.point(lambda12, phi02);
              clean = 0;
            } else if (sign0 !== sign1 && delta >= pi) {
              if (abs(lambda02 - sign0) < epsilon)
                lambda02 -= sign0 * epsilon;
              if (abs(lambda12 - sign1) < epsilon)
                lambda12 -= sign1 * epsilon;
              phi02 = clipAntimeridianIntersect(lambda02, phi02, lambda12, phi12);
              stream.point(sign0, phi02);
              stream.lineEnd();
              stream.lineStart();
              stream.point(sign1, phi02);
              clean = 0;
            }
            stream.point(lambda02 = lambda12, phi02 = phi12);
            sign0 = sign1;
          },
          lineEnd: function() {
            stream.lineEnd();
            lambda02 = phi02 = NaN;
          },
          clean: function() {
            return 2 - clean;
          }
        };
      }
      function clipAntimeridianIntersect(lambda02, phi02, lambda12, phi12) {
        var cosPhi02, cosPhi1, sinLambda0Lambda1 = sin(lambda02 - lambda12);
        return abs(sinLambda0Lambda1) > epsilon ? atan((sin(phi02) * (cosPhi1 = cos(phi12)) * sin(lambda12) - sin(phi12) * (cosPhi02 = cos(phi02)) * sin(lambda02)) / (cosPhi02 * cosPhi1 * sinLambda0Lambda1)) : (phi02 + phi12) / 2;
      }
      function clipAntimeridianInterpolate(from, to, direction, stream) {
        var phi;
        if (from == null) {
          phi = direction * halfPi;
          stream.point(-pi, phi);
          stream.point(0, phi);
          stream.point(pi, phi);
          stream.point(pi, 0);
          stream.point(pi, -phi);
          stream.point(0, -phi);
          stream.point(-pi, -phi);
          stream.point(-pi, 0);
          stream.point(-pi, phi);
        } else if (abs(from[0] - to[0]) > epsilon) {
          var lambda = from[0] < to[0] ? pi : -pi;
          phi = direction * lambda / 2;
          stream.point(-lambda, phi);
          stream.point(0, phi);
          stream.point(lambda, phi);
        } else {
          stream.point(to[0], to[1]);
        }
      }
      function clipCircle(radius) {
        var cr = cos(radius), delta = 6 * radians, smallRadius = cr > 0, notHemisphere = abs(cr) > epsilon;
        function interpolate2(from, to, direction, stream) {
          circleStream(stream, radius, delta, direction, from, to);
        }
        function visible(lambda, phi) {
          return cos(lambda) * cos(phi) > cr;
        }
        function clipLine2(stream) {
          var point0, c0, v0, v00, clean;
          return {
            lineStart: function() {
              v00 = v0 = false;
              clean = 1;
            },
            point: function(lambda, phi) {
              var point1 = [lambda, phi], point2, v = visible(lambda, phi), c = smallRadius ? v ? 0 : code(lambda, phi) : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
              if (!point0 && (v00 = v0 = v))
                stream.lineStart();
              if (v !== v0) {
                point2 = intersect(point0, point1);
                if (!point2 || pointEqual(point0, point2) || pointEqual(point1, point2))
                  point1[2] = 1;
              }
              if (v !== v0) {
                clean = 0;
                if (v) {
                  stream.lineStart();
                  point2 = intersect(point1, point0);
                  stream.point(point2[0], point2[1]);
                } else {
                  point2 = intersect(point0, point1);
                  stream.point(point2[0], point2[1], 2);
                  stream.lineEnd();
                }
                point0 = point2;
              } else if (notHemisphere && point0 && smallRadius ^ v) {
                var t;
                if (!(c & c0) && (t = intersect(point1, point0, true))) {
                  clean = 0;
                  if (smallRadius) {
                    stream.lineStart();
                    stream.point(t[0][0], t[0][1]);
                    stream.point(t[1][0], t[1][1]);
                    stream.lineEnd();
                  } else {
                    stream.point(t[1][0], t[1][1]);
                    stream.lineEnd();
                    stream.lineStart();
                    stream.point(t[0][0], t[0][1], 3);
                  }
                }
              }
              if (v && (!point0 || !pointEqual(point0, point1))) {
                stream.point(point1[0], point1[1]);
              }
              point0 = point1, v0 = v, c0 = c;
            },
            lineEnd: function() {
              if (v0)
                stream.lineEnd();
              point0 = null;
            },
            clean: function() {
              return clean | (v00 && v0) << 1;
            }
          };
        }
        function intersect(a, b, two) {
          var pa = cartesian(a), pb = cartesian(b);
          var n1 = [1, 0, 0], n2 = cartesianCross(pa, pb), n2n2 = cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
          if (!determinant)
            return !two && a;
          var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = cartesianCross(n1, n2), A = cartesianScale(n1, c1), B = cartesianScale(n2, c2);
          cartesianAddInPlace(A, B);
          var u = n1xn2, w = cartesianDot(A, u), uu = cartesianDot(u, u), t2 = w * w - uu * (cartesianDot(A, A) - 1);
          if (t2 < 0)
            return;
          var t = sqrt(t2), q = cartesianScale(u, (-w - t) / uu);
          cartesianAddInPlace(q, A);
          q = spherical(q);
          if (!two)
            return q;
          var lambda02 = a[0], lambda12 = b[0], phi02 = a[1], phi12 = b[1], z;
          if (lambda12 < lambda02)
            z = lambda02, lambda02 = lambda12, lambda12 = z;
          var delta2 = lambda12 - lambda02, polar = abs(delta2 - pi) < epsilon, meridian = polar || delta2 < epsilon;
          if (!polar && phi12 < phi02)
            z = phi02, phi02 = phi12, phi12 = z;
          if (meridian ? polar ? phi02 + phi12 > 0 ^ q[1] < (abs(q[0] - lambda02) < epsilon ? phi02 : phi12) : phi02 <= q[1] && q[1] <= phi12 : delta2 > pi ^ (lambda02 <= q[0] && q[0] <= lambda12)) {
            var q1 = cartesianScale(u, (-w + t) / uu);
            cartesianAddInPlace(q1, A);
            return [q, spherical(q1)];
          }
        }
        function code(lambda, phi) {
          var r = smallRadius ? radius : pi - radius, code2 = 0;
          if (lambda < -r)
            code2 |= 1;
          else if (lambda > r)
            code2 |= 2;
          if (phi < -r)
            code2 |= 4;
          else if (phi > r)
            code2 |= 8;
          return code2;
        }
        return clip(visible, clipLine2, interpolate2, smallRadius ? [0, -radius] : [-pi, radius - pi]);
      }
      function clipLine(a, b, x02, y02, x12, y12) {
        var ax = a[0], ay = a[1], bx = b[0], by = b[1], t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay, r;
        r = x02 - ax;
        if (!dx && r > 0)
          return;
        r /= dx;
        if (dx < 0) {
          if (r < t0)
            return;
          if (r < t1)
            t1 = r;
        } else if (dx > 0) {
          if (r > t1)
            return;
          if (r > t0)
            t0 = r;
        }
        r = x12 - ax;
        if (!dx && r < 0)
          return;
        r /= dx;
        if (dx < 0) {
          if (r > t1)
            return;
          if (r > t0)
            t0 = r;
        } else if (dx > 0) {
          if (r < t0)
            return;
          if (r < t1)
            t1 = r;
        }
        r = y02 - ay;
        if (!dy && r > 0)
          return;
        r /= dy;
        if (dy < 0) {
          if (r < t0)
            return;
          if (r < t1)
            t1 = r;
        } else if (dy > 0) {
          if (r > t1)
            return;
          if (r > t0)
            t0 = r;
        }
        r = y12 - ay;
        if (!dy && r < 0)
          return;
        r /= dy;
        if (dy < 0) {
          if (r > t1)
            return;
          if (r > t0)
            t0 = r;
        } else if (dy > 0) {
          if (r < t0)
            return;
          if (r < t1)
            t1 = r;
        }
        if (t0 > 0)
          a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
        if (t1 < 1)
          b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
        return true;
      }
      var clipMax = 1e9, clipMin = -clipMax;
      function clipRectangle(x02, y02, x12, y12) {
        function visible(x, y) {
          return x02 <= x && x <= x12 && y02 <= y && y <= y12;
        }
        function interpolate2(from, to, direction, stream) {
          var a = 0, a1 = 0;
          if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoint(from, to) < 0 ^ direction > 0) {
            do
              stream.point(a === 0 || a === 3 ? x02 : x12, a > 1 ? y12 : y02);
            while ((a = (a + direction + 4) % 4) !== a1);
          } else {
            stream.point(to[0], to[1]);
          }
        }
        function corner(p, direction) {
          return abs(p[0] - x02) < epsilon ? direction > 0 ? 0 : 3 : abs(p[0] - x12) < epsilon ? direction > 0 ? 2 : 1 : abs(p[1] - y02) < epsilon ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
        }
        function compareIntersection2(a, b) {
          return comparePoint(a.x, b.x);
        }
        function comparePoint(a, b) {
          var ca = corner(a, 1), cb = corner(b, 1);
          return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
        }
        return function(stream) {
          var activeStream = stream, bufferStream = clipBuffer(), segments, polygon, ring, x__, y__, v__, x_, y_, v_, first, clean;
          var clipStream = {
            point,
            lineStart,
            lineEnd,
            polygonStart,
            polygonEnd
          };
          function point(x, y) {
            if (visible(x, y))
              activeStream.point(x, y);
          }
          function polygonInside() {
            var winding = 0;
            for (var i = 0, n = polygon.length; i < n; ++i) {
              for (var ring2 = polygon[i], j = 1, m = ring2.length, point2 = ring2[0], a0, a1, b0 = point2[0], b1 = point2[1]; j < m; ++j) {
                a0 = b0, a1 = b1, point2 = ring2[j], b0 = point2[0], b1 = point2[1];
                if (a1 <= y12) {
                  if (b1 > y12 && (b0 - a0) * (y12 - a1) > (b1 - a1) * (x02 - a0))
                    ++winding;
                } else {
                  if (b1 <= y12 && (b0 - a0) * (y12 - a1) < (b1 - a1) * (x02 - a0))
                    --winding;
                }
              }
            }
            return winding;
          }
          function polygonStart() {
            activeStream = bufferStream, segments = [], polygon = [], clean = true;
          }
          function polygonEnd() {
            var startInside = polygonInside(), cleanInside = clean && startInside, visible2 = (segments = d3Array.merge(segments)).length;
            if (cleanInside || visible2) {
              stream.polygonStart();
              if (cleanInside) {
                stream.lineStart();
                interpolate2(null, null, 1, stream);
                stream.lineEnd();
              }
              if (visible2) {
                clipRejoin(segments, compareIntersection2, startInside, interpolate2, stream);
              }
              stream.polygonEnd();
            }
            activeStream = stream, segments = polygon = ring = null;
          }
          function lineStart() {
            clipStream.point = linePoint2;
            if (polygon)
              polygon.push(ring = []);
            first = true;
            v_ = false;
            x_ = y_ = NaN;
          }
          function lineEnd() {
            if (segments) {
              linePoint2(x__, y__);
              if (v__ && v_)
                bufferStream.rejoin();
              segments.push(bufferStream.result());
            }
            clipStream.point = point;
            if (v_)
              activeStream.lineEnd();
          }
          function linePoint2(x, y) {
            var v = visible(x, y);
            if (polygon)
              ring.push([x, y]);
            if (first) {
              x__ = x, y__ = y, v__ = v;
              first = false;
              if (v) {
                activeStream.lineStart();
                activeStream.point(x, y);
              }
            } else {
              if (v && v_)
                activeStream.point(x, y);
              else {
                var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))], b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
                if (clipLine(a, b, x02, y02, x12, y12)) {
                  if (!v_) {
                    activeStream.lineStart();
                    activeStream.point(a[0], a[1]);
                  }
                  activeStream.point(b[0], b[1]);
                  if (!v)
                    activeStream.lineEnd();
                  clean = false;
                } else if (v) {
                  activeStream.lineStart();
                  activeStream.point(x, y);
                  clean = false;
                }
              }
            }
            x_ = x, y_ = y, v_ = v;
          }
          return clipStream;
        };
      }
      function extent5() {
        var x02 = 0, y02 = 0, x12 = 960, y12 = 500, cache, cacheStream, clip2;
        return clip2 = {
          stream: function(stream) {
            return cache && cacheStream === stream ? cache : cache = clipRectangle(x02, y02, x12, y12)(cacheStream = stream);
          },
          extent: function(_) {
            return arguments.length ? (x02 = +_[0][0], y02 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1], cache = cacheStream = null, clip2) : [[x02, y02], [x12, y12]];
          }
        };
      }
      var lengthSum, lambda0$2, sinPhi0$1, cosPhi0$1;
      var lengthStream = {
        sphere: noop,
        point: noop,
        lineStart: lengthLineStart,
        lineEnd: noop,
        polygonStart: noop,
        polygonEnd: noop
      };
      function lengthLineStart() {
        lengthStream.point = lengthPointFirst;
        lengthStream.lineEnd = lengthLineEnd;
      }
      function lengthLineEnd() {
        lengthStream.point = lengthStream.lineEnd = noop;
      }
      function lengthPointFirst(lambda, phi) {
        lambda *= radians, phi *= radians;
        lambda0$2 = lambda, sinPhi0$1 = sin(phi), cosPhi0$1 = cos(phi);
        lengthStream.point = lengthPoint;
      }
      function lengthPoint(lambda, phi) {
        lambda *= radians, phi *= radians;
        var sinPhi = sin(phi), cosPhi = cos(phi), delta = abs(lambda - lambda0$2), cosDelta = cos(delta), sinDelta = sin(delta), x = cosPhi * sinDelta, y = cosPhi0$1 * sinPhi - sinPhi0$1 * cosPhi * cosDelta, z = sinPhi0$1 * sinPhi + cosPhi0$1 * cosPhi * cosDelta;
        lengthSum.add(atan2(sqrt(x * x + y * y), z));
        lambda0$2 = lambda, sinPhi0$1 = sinPhi, cosPhi0$1 = cosPhi;
      }
      function length(object2) {
        lengthSum = new d3Array.Adder();
        geoStream(object2, lengthStream);
        return +lengthSum;
      }
      var coordinates = [null, null], object = { type: "LineString", coordinates };
      function distance(a, b) {
        coordinates[0] = a;
        coordinates[1] = b;
        return length(object);
      }
      var containsObjectType = {
        Feature: function(object2, point) {
          return containsGeometry(object2.geometry, point);
        },
        FeatureCollection: function(object2, point) {
          var features = object2.features, i = -1, n = features.length;
          while (++i < n)
            if (containsGeometry(features[i].geometry, point))
              return true;
          return false;
        }
      };
      var containsGeometryType = {
        Sphere: function() {
          return true;
        },
        Point: function(object2, point) {
          return containsPoint(object2.coordinates, point);
        },
        MultiPoint: function(object2, point) {
          var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
          while (++i < n)
            if (containsPoint(coordinates2[i], point))
              return true;
          return false;
        },
        LineString: function(object2, point) {
          return containsLine(object2.coordinates, point);
        },
        MultiLineString: function(object2, point) {
          var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
          while (++i < n)
            if (containsLine(coordinates2[i], point))
              return true;
          return false;
        },
        Polygon: function(object2, point) {
          return containsPolygon(object2.coordinates, point);
        },
        MultiPolygon: function(object2, point) {
          var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
          while (++i < n)
            if (containsPolygon(coordinates2[i], point))
              return true;
          return false;
        },
        GeometryCollection: function(object2, point) {
          var geometries = object2.geometries, i = -1, n = geometries.length;
          while (++i < n)
            if (containsGeometry(geometries[i], point))
              return true;
          return false;
        }
      };
      function containsGeometry(geometry, point) {
        return geometry && containsGeometryType.hasOwnProperty(geometry.type) ? containsGeometryType[geometry.type](geometry, point) : false;
      }
      function containsPoint(coordinates2, point) {
        return distance(coordinates2, point) === 0;
      }
      function containsLine(coordinates2, point) {
        var ao, bo, ab;
        for (var i = 0, n = coordinates2.length; i < n; i++) {
          bo = distance(coordinates2[i], point);
          if (bo === 0)
            return true;
          if (i > 0) {
            ab = distance(coordinates2[i], coordinates2[i - 1]);
            if (ab > 0 && ao <= ab && bo <= ab && (ao + bo - ab) * (1 - Math.pow((ao - bo) / ab, 2)) < epsilon2 * ab)
              return true;
          }
          ao = bo;
        }
        return false;
      }
      function containsPolygon(coordinates2, point) {
        return !!polygonContains(coordinates2.map(ringRadians), pointRadians(point));
      }
      function ringRadians(ring) {
        return ring = ring.map(pointRadians), ring.pop(), ring;
      }
      function pointRadians(point) {
        return [point[0] * radians, point[1] * radians];
      }
      function contains(object2, point) {
        return (object2 && containsObjectType.hasOwnProperty(object2.type) ? containsObjectType[object2.type] : containsGeometry)(object2, point);
      }
      function graticuleX(y02, y12, dy) {
        var y = d3Array.range(y02, y12 - epsilon, dy).concat(y12);
        return function(x) {
          return y.map(function(y2) {
            return [x, y2];
          });
        };
      }
      function graticuleY(x02, x12, dx) {
        var x = d3Array.range(x02, x12 - epsilon, dx).concat(x12);
        return function(y) {
          return x.map(function(x2) {
            return [x2, y];
          });
        };
      }
      function graticule() {
        var x12, x02, X12, X02, y12, y02, Y12, Y02, dx = 10, dy = dx, DX = 90, DY = 360, x, y, X, Y, precision = 2.5;
        function graticule2() {
          return { type: "MultiLineString", coordinates: lines() };
        }
        function lines() {
          return d3Array.range(ceil(X02 / DX) * DX, X12, DX).map(X).concat(d3Array.range(ceil(Y02 / DY) * DY, Y12, DY).map(Y)).concat(d3Array.range(ceil(x02 / dx) * dx, x12, dx).filter(function(x2) {
            return abs(x2 % DX) > epsilon;
          }).map(x)).concat(d3Array.range(ceil(y02 / dy) * dy, y12, dy).filter(function(y2) {
            return abs(y2 % DY) > epsilon;
          }).map(y));
        }
        graticule2.lines = function() {
          return lines().map(function(coordinates2) {
            return { type: "LineString", coordinates: coordinates2 };
          });
        };
        graticule2.outline = function() {
          return {
            type: "Polygon",
            coordinates: [
              X(X02).concat(Y(Y12).slice(1), X(X12).reverse().slice(1), Y(Y02).reverse().slice(1))
            ]
          };
        };
        graticule2.extent = function(_) {
          if (!arguments.length)
            return graticule2.extentMinor();
          return graticule2.extentMajor(_).extentMinor(_);
        };
        graticule2.extentMajor = function(_) {
          if (!arguments.length)
            return [[X02, Y02], [X12, Y12]];
          X02 = +_[0][0], X12 = +_[1][0];
          Y02 = +_[0][1], Y12 = +_[1][1];
          if (X02 > X12)
            _ = X02, X02 = X12, X12 = _;
          if (Y02 > Y12)
            _ = Y02, Y02 = Y12, Y12 = _;
          return graticule2.precision(precision);
        };
        graticule2.extentMinor = function(_) {
          if (!arguments.length)
            return [[x02, y02], [x12, y12]];
          x02 = +_[0][0], x12 = +_[1][0];
          y02 = +_[0][1], y12 = +_[1][1];
          if (x02 > x12)
            _ = x02, x02 = x12, x12 = _;
          if (y02 > y12)
            _ = y02, y02 = y12, y12 = _;
          return graticule2.precision(precision);
        };
        graticule2.step = function(_) {
          if (!arguments.length)
            return graticule2.stepMinor();
          return graticule2.stepMajor(_).stepMinor(_);
        };
        graticule2.stepMajor = function(_) {
          if (!arguments.length)
            return [DX, DY];
          DX = +_[0], DY = +_[1];
          return graticule2;
        };
        graticule2.stepMinor = function(_) {
          if (!arguments.length)
            return [dx, dy];
          dx = +_[0], dy = +_[1];
          return graticule2;
        };
        graticule2.precision = function(_) {
          if (!arguments.length)
            return precision;
          precision = +_;
          x = graticuleX(y02, y12, 90);
          y = graticuleY(x02, x12, precision);
          X = graticuleX(Y02, Y12, 90);
          Y = graticuleY(X02, X12, precision);
          return graticule2;
        };
        return graticule2.extentMajor([[-180, -90 + epsilon], [180, 90 - epsilon]]).extentMinor([[-180, -80 - epsilon], [180, 80 + epsilon]]);
      }
      function graticule10() {
        return graticule()();
      }
      function interpolate(a, b) {
        var x02 = a[0] * radians, y02 = a[1] * radians, x12 = b[0] * radians, y12 = b[1] * radians, cy0 = cos(y02), sy0 = sin(y02), cy1 = cos(y12), sy1 = sin(y12), kx0 = cy0 * cos(x02), ky0 = cy0 * sin(x02), kx1 = cy1 * cos(x12), ky1 = cy1 * sin(x12), d = 2 * asin(sqrt(haversin(y12 - y02) + cy0 * cy1 * haversin(x12 - x02))), k = sin(d);
        var interpolate2 = d ? function(t) {
          var B = sin(t *= d) / k, A = sin(d - t) / k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
          return [
            atan2(y, x) * degrees,
            atan2(z, sqrt(x * x + y * y)) * degrees
          ];
        } : function() {
          return [x02 * degrees, y02 * degrees];
        };
        interpolate2.distance = d;
        return interpolate2;
      }
      var identity = (x) => x;
      var areaSum$1 = new d3Array.Adder(), areaRingSum$1 = new d3Array.Adder(), x00, y00, x0$1, y0$1;
      var areaStream$1 = {
        point: noop,
        lineStart: noop,
        lineEnd: noop,
        polygonStart: function() {
          areaStream$1.lineStart = areaRingStart$1;
          areaStream$1.lineEnd = areaRingEnd$1;
        },
        polygonEnd: function() {
          areaStream$1.lineStart = areaStream$1.lineEnd = areaStream$1.point = noop;
          areaSum$1.add(abs(areaRingSum$1));
          areaRingSum$1 = new d3Array.Adder();
        },
        result: function() {
          var area2 = areaSum$1 / 2;
          areaSum$1 = new d3Array.Adder();
          return area2;
        }
      };
      function areaRingStart$1() {
        areaStream$1.point = areaPointFirst$1;
      }
      function areaPointFirst$1(x, y) {
        areaStream$1.point = areaPoint$1;
        x00 = x0$1 = x, y00 = y0$1 = y;
      }
      function areaPoint$1(x, y) {
        areaRingSum$1.add(y0$1 * x - x0$1 * y);
        x0$1 = x, y0$1 = y;
      }
      function areaRingEnd$1() {
        areaPoint$1(x00, y00);
      }
      var x0$2 = Infinity, y0$2 = x0$2, x1 = -x0$2, y1 = x1;
      var boundsStream$1 = {
        point: boundsPoint$1,
        lineStart: noop,
        lineEnd: noop,
        polygonStart: noop,
        polygonEnd: noop,
        result: function() {
          var bounds2 = [[x0$2, y0$2], [x1, y1]];
          x1 = y1 = -(y0$2 = x0$2 = Infinity);
          return bounds2;
        }
      };
      function boundsPoint$1(x, y) {
        if (x < x0$2)
          x0$2 = x;
        if (x > x1)
          x1 = x;
        if (y < y0$2)
          y0$2 = y;
        if (y > y1)
          y1 = y;
      }
      var X0$1 = 0, Y0$1 = 0, Z0$1 = 0, X1$1 = 0, Y1$1 = 0, Z1$1 = 0, X2$1 = 0, Y2$1 = 0, Z2$1 = 0, x00$1, y00$1, x0$3, y0$3;
      var centroidStream$1 = {
        point: centroidPoint$1,
        lineStart: centroidLineStart$1,
        lineEnd: centroidLineEnd$1,
        polygonStart: function() {
          centroidStream$1.lineStart = centroidRingStart$1;
          centroidStream$1.lineEnd = centroidRingEnd$1;
        },
        polygonEnd: function() {
          centroidStream$1.point = centroidPoint$1;
          centroidStream$1.lineStart = centroidLineStart$1;
          centroidStream$1.lineEnd = centroidLineEnd$1;
        },
        result: function() {
          var centroid2 = Z2$1 ? [X2$1 / Z2$1, Y2$1 / Z2$1] : Z1$1 ? [X1$1 / Z1$1, Y1$1 / Z1$1] : Z0$1 ? [X0$1 / Z0$1, Y0$1 / Z0$1] : [NaN, NaN];
          X0$1 = Y0$1 = Z0$1 = X1$1 = Y1$1 = Z1$1 = X2$1 = Y2$1 = Z2$1 = 0;
          return centroid2;
        }
      };
      function centroidPoint$1(x, y) {
        X0$1 += x;
        Y0$1 += y;
        ++Z0$1;
      }
      function centroidLineStart$1() {
        centroidStream$1.point = centroidPointFirstLine;
      }
      function centroidPointFirstLine(x, y) {
        centroidStream$1.point = centroidPointLine;
        centroidPoint$1(x0$3 = x, y0$3 = y);
      }
      function centroidPointLine(x, y) {
        var dx = x - x0$3, dy = y - y0$3, z = sqrt(dx * dx + dy * dy);
        X1$1 += z * (x0$3 + x) / 2;
        Y1$1 += z * (y0$3 + y) / 2;
        Z1$1 += z;
        centroidPoint$1(x0$3 = x, y0$3 = y);
      }
      function centroidLineEnd$1() {
        centroidStream$1.point = centroidPoint$1;
      }
      function centroidRingStart$1() {
        centroidStream$1.point = centroidPointFirstRing;
      }
      function centroidRingEnd$1() {
        centroidPointRing(x00$1, y00$1);
      }
      function centroidPointFirstRing(x, y) {
        centroidStream$1.point = centroidPointRing;
        centroidPoint$1(x00$1 = x0$3 = x, y00$1 = y0$3 = y);
      }
      function centroidPointRing(x, y) {
        var dx = x - x0$3, dy = y - y0$3, z = sqrt(dx * dx + dy * dy);
        X1$1 += z * (x0$3 + x) / 2;
        Y1$1 += z * (y0$3 + y) / 2;
        Z1$1 += z;
        z = y0$3 * x - x0$3 * y;
        X2$1 += z * (x0$3 + x);
        Y2$1 += z * (y0$3 + y);
        Z2$1 += z * 3;
        centroidPoint$1(x0$3 = x, y0$3 = y);
      }
      function PathContext(context) {
        this._context = context;
      }
      PathContext.prototype = {
        _radius: 4.5,
        pointRadius: function(_) {
          return this._radius = _, this;
        },
        polygonStart: function() {
          this._line = 0;
        },
        polygonEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._point = 0;
        },
        lineEnd: function() {
          if (this._line === 0)
            this._context.closePath();
          this._point = NaN;
        },
        point: function(x, y) {
          switch (this._point) {
            case 0: {
              this._context.moveTo(x, y);
              this._point = 1;
              break;
            }
            case 1: {
              this._context.lineTo(x, y);
              break;
            }
            default: {
              this._context.moveTo(x + this._radius, y);
              this._context.arc(x, y, this._radius, 0, tau);
              break;
            }
          }
        },
        result: noop
      };
      var lengthSum$1 = new d3Array.Adder(), lengthRing, x00$2, y00$2, x0$4, y0$4;
      var lengthStream$1 = {
        point: noop,
        lineStart: function() {
          lengthStream$1.point = lengthPointFirst$1;
        },
        lineEnd: function() {
          if (lengthRing)
            lengthPoint$1(x00$2, y00$2);
          lengthStream$1.point = noop;
        },
        polygonStart: function() {
          lengthRing = true;
        },
        polygonEnd: function() {
          lengthRing = null;
        },
        result: function() {
          var length2 = +lengthSum$1;
          lengthSum$1 = new d3Array.Adder();
          return length2;
        }
      };
      function lengthPointFirst$1(x, y) {
        lengthStream$1.point = lengthPoint$1;
        x00$2 = x0$4 = x, y00$2 = y0$4 = y;
      }
      function lengthPoint$1(x, y) {
        x0$4 -= x, y0$4 -= y;
        lengthSum$1.add(sqrt(x0$4 * x0$4 + y0$4 * y0$4));
        x0$4 = x, y0$4 = y;
      }
      function PathString() {
        this._string = [];
      }
      PathString.prototype = {
        _radius: 4.5,
        _circle: circle$1(4.5),
        pointRadius: function(_) {
          if ((_ = +_) !== this._radius)
            this._radius = _, this._circle = null;
          return this;
        },
        polygonStart: function() {
          this._line = 0;
        },
        polygonEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._point = 0;
        },
        lineEnd: function() {
          if (this._line === 0)
            this._string.push("Z");
          this._point = NaN;
        },
        point: function(x, y) {
          switch (this._point) {
            case 0: {
              this._string.push("M", x, ",", y);
              this._point = 1;
              break;
            }
            case 1: {
              this._string.push("L", x, ",", y);
              break;
            }
            default: {
              if (this._circle == null)
                this._circle = circle$1(this._radius);
              this._string.push("M", x, ",", y, this._circle);
              break;
            }
          }
        },
        result: function() {
          if (this._string.length) {
            var result = this._string.join("");
            this._string = [];
            return result;
          } else {
            return null;
          }
        }
      };
      function circle$1(radius) {
        return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
      }
      function index(projection2, context) {
        var pointRadius = 4.5, projectionStream, contextStream;
        function path(object2) {
          if (object2) {
            if (typeof pointRadius === "function")
              contextStream.pointRadius(+pointRadius.apply(this, arguments));
            geoStream(object2, projectionStream(contextStream));
          }
          return contextStream.result();
        }
        path.area = function(object2) {
          geoStream(object2, projectionStream(areaStream$1));
          return areaStream$1.result();
        };
        path.measure = function(object2) {
          geoStream(object2, projectionStream(lengthStream$1));
          return lengthStream$1.result();
        };
        path.bounds = function(object2) {
          geoStream(object2, projectionStream(boundsStream$1));
          return boundsStream$1.result();
        };
        path.centroid = function(object2) {
          geoStream(object2, projectionStream(centroidStream$1));
          return centroidStream$1.result();
        };
        path.projection = function(_) {
          return arguments.length ? (projectionStream = _ == null ? (projection2 = null, identity) : (projection2 = _).stream, path) : projection2;
        };
        path.context = function(_) {
          if (!arguments.length)
            return context;
          contextStream = _ == null ? (context = null, new PathString()) : new PathContext(context = _);
          if (typeof pointRadius !== "function")
            contextStream.pointRadius(pointRadius);
          return path;
        };
        path.pointRadius = function(_) {
          if (!arguments.length)
            return pointRadius;
          pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
          return path;
        };
        return path.projection(projection2).context(context);
      }
      function transform(methods) {
        return {
          stream: transformer(methods)
        };
      }
      function transformer(methods) {
        return function(stream) {
          var s = new TransformStream();
          for (var key in methods)
            s[key] = methods[key];
          s.stream = stream;
          return s;
        };
      }
      function TransformStream() {
      }
      TransformStream.prototype = {
        constructor: TransformStream,
        point: function(x, y) {
          this.stream.point(x, y);
        },
        sphere: function() {
          this.stream.sphere();
        },
        lineStart: function() {
          this.stream.lineStart();
        },
        lineEnd: function() {
          this.stream.lineEnd();
        },
        polygonStart: function() {
          this.stream.polygonStart();
        },
        polygonEnd: function() {
          this.stream.polygonEnd();
        }
      };
      function fit(projection2, fitBounds, object2) {
        var clip2 = projection2.clipExtent && projection2.clipExtent();
        projection2.scale(150).translate([0, 0]);
        if (clip2 != null)
          projection2.clipExtent(null);
        geoStream(object2, projection2.stream(boundsStream$1));
        fitBounds(boundsStream$1.result());
        if (clip2 != null)
          projection2.clipExtent(clip2);
        return projection2;
      }
      function fitExtent(projection2, extent6, object2) {
        return fit(projection2, function(b) {
          var w = extent6[1][0] - extent6[0][0], h = extent6[1][1] - extent6[0][1], k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])), x = +extent6[0][0] + (w - k * (b[1][0] + b[0][0])) / 2, y = +extent6[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
          projection2.scale(150 * k).translate([x, y]);
        }, object2);
      }
      function fitSize(projection2, size, object2) {
        return fitExtent(projection2, [[0, 0], size], object2);
      }
      function fitWidth(projection2, width, object2) {
        return fit(projection2, function(b) {
          var w = +width, k = w / (b[1][0] - b[0][0]), x = (w - k * (b[1][0] + b[0][0])) / 2, y = -k * b[0][1];
          projection2.scale(150 * k).translate([x, y]);
        }, object2);
      }
      function fitHeight(projection2, height, object2) {
        return fit(projection2, function(b) {
          var h = +height, k = h / (b[1][1] - b[0][1]), x = -k * b[0][0], y = (h - k * (b[1][1] + b[0][1])) / 2;
          projection2.scale(150 * k).translate([x, y]);
        }, object2);
      }
      var maxDepth = 16, cosMinDistance = cos(30 * radians);
      function resample(project, delta2) {
        return +delta2 ? resample$1(project, delta2) : resampleNone(project);
      }
      function resampleNone(project) {
        return transformer({
          point: function(x, y) {
            x = project(x, y);
            this.stream.point(x[0], x[1]);
          }
        });
      }
      function resample$1(project, delta2) {
        function resampleLineTo(x02, y02, lambda02, a0, b0, c0, x12, y12, lambda12, a1, b1, c1, depth, stream) {
          var dx = x12 - x02, dy = y12 - y02, d2 = dx * dx + dy * dy;
          if (d2 > 4 * delta2 && depth--) {
            var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = sqrt(a * a + b * b + c * c), phi2 = asin(c /= m), lambda22 = abs(abs(c) - 1) < epsilon || abs(lambda02 - lambda12) < epsilon ? (lambda02 + lambda12) / 2 : atan2(b, a), p = project(lambda22, phi2), x2 = p[0], y2 = p[1], dx2 = x2 - x02, dy2 = y2 - y02, dz = dy * dx2 - dx * dy2;
            if (dz * dz / d2 > delta2 || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
              resampleLineTo(x02, y02, lambda02, a0, b0, c0, x2, y2, lambda22, a /= m, b /= m, c, depth, stream);
              stream.point(x2, y2);
              resampleLineTo(x2, y2, lambda22, a, b, c, x12, y12, lambda12, a1, b1, c1, depth, stream);
            }
          }
        }
        return function(stream) {
          var lambda002, x002, y002, a00, b00, c00, lambda02, x02, y02, a0, b0, c0;
          var resampleStream = {
            point,
            lineStart,
            lineEnd,
            polygonStart: function() {
              stream.polygonStart();
              resampleStream.lineStart = ringStart;
            },
            polygonEnd: function() {
              stream.polygonEnd();
              resampleStream.lineStart = lineStart;
            }
          };
          function point(x, y) {
            x = project(x, y);
            stream.point(x[0], x[1]);
          }
          function lineStart() {
            x02 = NaN;
            resampleStream.point = linePoint2;
            stream.lineStart();
          }
          function linePoint2(lambda, phi) {
            var c = cartesian([lambda, phi]), p = project(lambda, phi);
            resampleLineTo(x02, y02, lambda02, a0, b0, c0, x02 = p[0], y02 = p[1], lambda02 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
            stream.point(x02, y02);
          }
          function lineEnd() {
            resampleStream.point = point;
            stream.lineEnd();
          }
          function ringStart() {
            lineStart();
            resampleStream.point = ringPoint;
            resampleStream.lineEnd = ringEnd;
          }
          function ringPoint(lambda, phi) {
            linePoint2(lambda002 = lambda, phi), x002 = x02, y002 = y02, a00 = a0, b00 = b0, c00 = c0;
            resampleStream.point = linePoint2;
          }
          function ringEnd() {
            resampleLineTo(x02, y02, lambda02, a0, b0, c0, x002, y002, lambda002, a00, b00, c00, maxDepth, stream);
            resampleStream.lineEnd = lineEnd;
            lineEnd();
          }
          return resampleStream;
        };
      }
      var transformRadians = transformer({
        point: function(x, y) {
          this.stream.point(x * radians, y * radians);
        }
      });
      function transformRotate(rotate) {
        return transformer({
          point: function(x, y) {
            var r = rotate(x, y);
            return this.stream.point(r[0], r[1]);
          }
        });
      }
      function scaleTranslate(k, dx, dy, sx, sy) {
        function transform2(x, y) {
          x *= sx;
          y *= sy;
          return [dx + k * x, dy - k * y];
        }
        transform2.invert = function(x, y) {
          return [(x - dx) / k * sx, (dy - y) / k * sy];
        };
        return transform2;
      }
      function scaleTranslateRotate(k, dx, dy, sx, sy, alpha) {
        if (!alpha)
          return scaleTranslate(k, dx, dy, sx, sy);
        var cosAlpha = cos(alpha), sinAlpha = sin(alpha), a = cosAlpha * k, b = sinAlpha * k, ai = cosAlpha / k, bi = sinAlpha / k, ci = (sinAlpha * dy - cosAlpha * dx) / k, fi = (sinAlpha * dx + cosAlpha * dy) / k;
        function transform2(x, y) {
          x *= sx;
          y *= sy;
          return [a * x - b * y + dx, dy - b * x - a * y];
        }
        transform2.invert = function(x, y) {
          return [sx * (ai * x - bi * y + ci), sy * (fi - bi * x - ai * y)];
        };
        return transform2;
      }
      function projection(project) {
        return projectionMutator(function() {
          return project;
        })();
      }
      function projectionMutator(projectAt) {
        var project, k = 150, x = 480, y = 250, lambda = 0, phi = 0, deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, alpha = 0, sx = 1, sy = 1, theta = null, preclip = clipAntimeridian, x02 = null, y02, x12, y12, postclip = identity, delta2 = 0.5, projectResample, projectTransform, projectRotateTransform, cache, cacheStream;
        function projection2(point) {
          return projectRotateTransform(point[0] * radians, point[1] * radians);
        }
        function invert(point) {
          point = projectRotateTransform.invert(point[0], point[1]);
          return point && [point[0] * degrees, point[1] * degrees];
        }
        projection2.stream = function(stream) {
          return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
        };
        projection2.preclip = function(_) {
          return arguments.length ? (preclip = _, theta = void 0, reset()) : preclip;
        };
        projection2.postclip = function(_) {
          return arguments.length ? (postclip = _, x02 = y02 = x12 = y12 = null, reset()) : postclip;
        };
        projection2.clipAngle = function(_) {
          return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees;
        };
        projection2.clipExtent = function(_) {
          return arguments.length ? (postclip = _ == null ? (x02 = y02 = x12 = y12 = null, identity) : clipRectangle(x02 = +_[0][0], y02 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1]), reset()) : x02 == null ? null : [[x02, y02], [x12, y12]];
        };
        projection2.scale = function(_) {
          return arguments.length ? (k = +_, recenter()) : k;
        };
        projection2.translate = function(_) {
          return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
        };
        projection2.center = function(_) {
          return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees, phi * degrees];
        };
        projection2.rotate = function(_) {
          return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees, deltaPhi * degrees, deltaGamma * degrees];
        };
        projection2.angle = function(_) {
          return arguments.length ? (alpha = _ % 360 * radians, recenter()) : alpha * degrees;
        };
        projection2.reflectX = function(_) {
          return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
        };
        projection2.reflectY = function(_) {
          return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
        };
        projection2.precision = function(_) {
          return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
        };
        projection2.fitExtent = function(extent6, object2) {
          return fitExtent(projection2, extent6, object2);
        };
        projection2.fitSize = function(size, object2) {
          return fitSize(projection2, size, object2);
        };
        projection2.fitWidth = function(width, object2) {
          return fitWidth(projection2, width, object2);
        };
        projection2.fitHeight = function(height, object2) {
          return fitHeight(projection2, height, object2);
        };
        function recenter() {
          var center = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)), transform2 = scaleTranslateRotate(k, x - center[0], y - center[1], sx, sy, alpha);
          rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
          projectTransform = compose(project, transform2);
          projectRotateTransform = compose(rotate, projectTransform);
          projectResample = resample(projectTransform, delta2);
          return reset();
        }
        function reset() {
          cache = cacheStream = null;
          return projection2;
        }
        return function() {
          project = projectAt.apply(this, arguments);
          projection2.invert = project.invert && invert;
          return recenter();
        };
      }
      function conicProjection(projectAt) {
        var phi02 = 0, phi12 = pi / 3, m = projectionMutator(projectAt), p = m(phi02, phi12);
        p.parallels = function(_) {
          return arguments.length ? m(phi02 = _[0] * radians, phi12 = _[1] * radians) : [phi02 * degrees, phi12 * degrees];
        };
        return p;
      }
      function cylindricalEqualAreaRaw(phi02) {
        var cosPhi02 = cos(phi02);
        function forward(lambda, phi) {
          return [lambda * cosPhi02, sin(phi) / cosPhi02];
        }
        forward.invert = function(x, y) {
          return [x / cosPhi02, asin(y * cosPhi02)];
        };
        return forward;
      }
      function conicEqualAreaRaw(y02, y12) {
        var sy0 = sin(y02), n = (sy0 + sin(y12)) / 2;
        if (abs(n) < epsilon)
          return cylindricalEqualAreaRaw(y02);
        var c = 1 + sy0 * (2 * n - sy0), r0 = sqrt(c) / n;
        function project(x, y) {
          var r = sqrt(c - 2 * n * sin(y)) / n;
          return [r * sin(x *= n), r0 - r * cos(x)];
        }
        project.invert = function(x, y) {
          var r0y = r0 - y, l = atan2(x, abs(r0y)) * sign(r0y);
          if (r0y * n < 0)
            l -= pi * sign(x) * sign(r0y);
          return [l / n, asin((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
        };
        return project;
      }
      function conicEqualArea() {
        return conicProjection(conicEqualAreaRaw).scale(155.424).center([0, 33.6442]);
      }
      function albers() {
        return conicEqualArea().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-0.6, 38.7]);
      }
      function multiplex(streams) {
        var n = streams.length;
        return {
          point: function(x, y) {
            var i = -1;
            while (++i < n)
              streams[i].point(x, y);
          },
          sphere: function() {
            var i = -1;
            while (++i < n)
              streams[i].sphere();
          },
          lineStart: function() {
            var i = -1;
            while (++i < n)
              streams[i].lineStart();
          },
          lineEnd: function() {
            var i = -1;
            while (++i < n)
              streams[i].lineEnd();
          },
          polygonStart: function() {
            var i = -1;
            while (++i < n)
              streams[i].polygonStart();
          },
          polygonEnd: function() {
            var i = -1;
            while (++i < n)
              streams[i].polygonEnd();
          }
        };
      }
      function albersUsa() {
        var cache, cacheStream, lower48 = albers(), lower48Point, alaska = conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, hawaii = conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, point, pointStream = { point: function(x, y) {
          point = [x, y];
        } };
        function albersUsa2(coordinates2) {
          var x = coordinates2[0], y = coordinates2[1];
          return point = null, (lower48Point.point(x, y), point) || (alaskaPoint.point(x, y), point) || (hawaiiPoint.point(x, y), point);
        }
        albersUsa2.invert = function(coordinates2) {
          var k = lower48.scale(), t = lower48.translate(), x = (coordinates2[0] - t[0]) / k, y = (coordinates2[1] - t[1]) / k;
          return (y >= 0.12 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii : lower48).invert(coordinates2);
        };
        albersUsa2.stream = function(stream) {
          return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
        };
        albersUsa2.precision = function(_) {
          if (!arguments.length)
            return lower48.precision();
          lower48.precision(_), alaska.precision(_), hawaii.precision(_);
          return reset();
        };
        albersUsa2.scale = function(_) {
          if (!arguments.length)
            return lower48.scale();
          lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
          return albersUsa2.translate(lower48.translate());
        };
        albersUsa2.translate = function(_) {
          if (!arguments.length)
            return lower48.translate();
          var k = lower48.scale(), x = +_[0], y = +_[1];
          lower48Point = lower48.translate(_).clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]]).stream(pointStream);
          alaskaPoint = alaska.translate([x - 0.307 * k, y + 0.201 * k]).clipExtent([[x - 0.425 * k + epsilon, y + 0.12 * k + epsilon], [x - 0.214 * k - epsilon, y + 0.234 * k - epsilon]]).stream(pointStream);
          hawaiiPoint = hawaii.translate([x - 0.205 * k, y + 0.212 * k]).clipExtent([[x - 0.214 * k + epsilon, y + 0.166 * k + epsilon], [x - 0.115 * k - epsilon, y + 0.234 * k - epsilon]]).stream(pointStream);
          return reset();
        };
        albersUsa2.fitExtent = function(extent6, object2) {
          return fitExtent(albersUsa2, extent6, object2);
        };
        albersUsa2.fitSize = function(size, object2) {
          return fitSize(albersUsa2, size, object2);
        };
        albersUsa2.fitWidth = function(width, object2) {
          return fitWidth(albersUsa2, width, object2);
        };
        albersUsa2.fitHeight = function(height, object2) {
          return fitHeight(albersUsa2, height, object2);
        };
        function reset() {
          cache = cacheStream = null;
          return albersUsa2;
        }
        return albersUsa2.scale(1070);
      }
      function azimuthalRaw(scale) {
        return function(x, y) {
          var cx = cos(x), cy = cos(y), k = scale(cx * cy);
          if (k === Infinity)
            return [2, 0];
          return [
            k * cy * sin(x),
            k * sin(y)
          ];
        };
      }
      function azimuthalInvert(angle2) {
        return function(x, y) {
          var z = sqrt(x * x + y * y), c = angle2(z), sc = sin(c), cc = cos(c);
          return [
            atan2(x * sc, z * cc),
            asin(z && y * sc / z)
          ];
        };
      }
      var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
        return sqrt(2 / (1 + cxcy));
      });
      azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
        return 2 * asin(z / 2);
      });
      function azimuthalEqualArea() {
        return projection(azimuthalEqualAreaRaw).scale(124.75).clipAngle(180 - 1e-3);
      }
      var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
        return (c = acos(c)) && c / sin(c);
      });
      azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
        return z;
      });
      function azimuthalEquidistant() {
        return projection(azimuthalEquidistantRaw).scale(79.4188).clipAngle(180 - 1e-3);
      }
      function mercatorRaw(lambda, phi) {
        return [lambda, log(tan((halfPi + phi) / 2))];
      }
      mercatorRaw.invert = function(x, y) {
        return [x, 2 * atan(exp(y)) - halfPi];
      };
      function mercator() {
        return mercatorProjection(mercatorRaw).scale(961 / tau);
      }
      function mercatorProjection(project) {
        var m = projection(project), center = m.center, scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, x02 = null, y02, x12, y12;
        m.scale = function(_) {
          return arguments.length ? (scale(_), reclip()) : scale();
        };
        m.translate = function(_) {
          return arguments.length ? (translate(_), reclip()) : translate();
        };
        m.center = function(_) {
          return arguments.length ? (center(_), reclip()) : center();
        };
        m.clipExtent = function(_) {
          return arguments.length ? (_ == null ? x02 = y02 = x12 = y12 = null : (x02 = +_[0][0], y02 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1]), reclip()) : x02 == null ? null : [[x02, y02], [x12, y12]];
        };
        function reclip() {
          var k = pi * scale(), t = m(rotation(m.rotate()).invert([0, 0]));
          return clipExtent(x02 == null ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw ? [[Math.max(t[0] - k, x02), y02], [Math.min(t[0] + k, x12), y12]] : [[x02, Math.max(t[1] - k, y02)], [x12, Math.min(t[1] + k, y12)]]);
        }
        return reclip();
      }
      function tany(y) {
        return tan((halfPi + y) / 2);
      }
      function conicConformalRaw(y02, y12) {
        var cy0 = cos(y02), n = y02 === y12 ? sin(y02) : log(cy0 / cos(y12)) / log(tany(y12) / tany(y02)), f = cy0 * pow(tany(y02), n) / n;
        if (!n)
          return mercatorRaw;
        function project(x, y) {
          if (f > 0) {
            if (y < -halfPi + epsilon)
              y = -halfPi + epsilon;
          } else {
            if (y > halfPi - epsilon)
              y = halfPi - epsilon;
          }
          var r = f / pow(tany(y), n);
          return [r * sin(n * x), f - r * cos(n * x)];
        }
        project.invert = function(x, y) {
          var fy = f - y, r = sign(n) * sqrt(x * x + fy * fy), l = atan2(x, abs(fy)) * sign(fy);
          if (fy * n < 0)
            l -= pi * sign(x) * sign(fy);
          return [l / n, 2 * atan(pow(f / r, 1 / n)) - halfPi];
        };
        return project;
      }
      function conicConformal() {
        return conicProjection(conicConformalRaw).scale(109.5).parallels([30, 30]);
      }
      function equirectangularRaw(lambda, phi) {
        return [lambda, phi];
      }
      equirectangularRaw.invert = equirectangularRaw;
      function equirectangular() {
        return projection(equirectangularRaw).scale(152.63);
      }
      function conicEquidistantRaw(y02, y12) {
        var cy0 = cos(y02), n = y02 === y12 ? sin(y02) : (cy0 - cos(y12)) / (y12 - y02), g = cy0 / n + y02;
        if (abs(n) < epsilon)
          return equirectangularRaw;
        function project(x, y) {
          var gy = g - y, nx = n * x;
          return [gy * sin(nx), g - gy * cos(nx)];
        }
        project.invert = function(x, y) {
          var gy = g - y, l = atan2(x, abs(gy)) * sign(gy);
          if (gy * n < 0)
            l -= pi * sign(x) * sign(gy);
          return [l / n, g - sign(n) * sqrt(x * x + gy * gy)];
        };
        return project;
      }
      function conicEquidistant() {
        return conicProjection(conicEquidistantRaw).scale(131.154).center([0, 13.9389]);
      }
      var A1 = 1.340264, A2 = -0.081106, A3 = 893e-6, A4 = 3796e-6, M = sqrt(3) / 2, iterations = 12;
      function equalEarthRaw(lambda, phi) {
        var l = asin(M * sin(phi)), l2 = l * l, l6 = l2 * l2 * l2;
        return [
          lambda * cos(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
          l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))
        ];
      }
      equalEarthRaw.invert = function(x, y) {
        var l = y, l2 = l * l, l6 = l2 * l2 * l2;
        for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
          fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y;
          fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
          l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
          if (abs(delta) < epsilon2)
            break;
        }
        return [
          M * x * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / cos(l),
          asin(sin(l) / M)
        ];
      };
      function equalEarth() {
        return projection(equalEarthRaw).scale(177.158);
      }
      function gnomonicRaw(x, y) {
        var cy = cos(y), k = cos(x) * cy;
        return [cy * sin(x) / k, sin(y) / k];
      }
      gnomonicRaw.invert = azimuthalInvert(atan);
      function gnomonic() {
        return projection(gnomonicRaw).scale(144.049).clipAngle(60);
      }
      function identity$1() {
        var k = 1, tx = 0, ty = 0, sx = 1, sy = 1, alpha = 0, ca, sa, x02 = null, y02, x12, y12, kx = 1, ky = 1, transform2 = transformer({
          point: function(x, y) {
            var p = projection2([x, y]);
            this.stream.point(p[0], p[1]);
          }
        }), postclip = identity, cache, cacheStream;
        function reset() {
          kx = k * sx;
          ky = k * sy;
          cache = cacheStream = null;
          return projection2;
        }
        function projection2(p) {
          var x = p[0] * kx, y = p[1] * ky;
          if (alpha) {
            var t = y * ca - x * sa;
            x = x * ca + y * sa;
            y = t;
          }
          return [x + tx, y + ty];
        }
        projection2.invert = function(p) {
          var x = p[0] - tx, y = p[1] - ty;
          if (alpha) {
            var t = y * ca + x * sa;
            x = x * ca - y * sa;
            y = t;
          }
          return [x / kx, y / ky];
        };
        projection2.stream = function(stream) {
          return cache && cacheStream === stream ? cache : cache = transform2(postclip(cacheStream = stream));
        };
        projection2.postclip = function(_) {
          return arguments.length ? (postclip = _, x02 = y02 = x12 = y12 = null, reset()) : postclip;
        };
        projection2.clipExtent = function(_) {
          return arguments.length ? (postclip = _ == null ? (x02 = y02 = x12 = y12 = null, identity) : clipRectangle(x02 = +_[0][0], y02 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1]), reset()) : x02 == null ? null : [[x02, y02], [x12, y12]];
        };
        projection2.scale = function(_) {
          return arguments.length ? (k = +_, reset()) : k;
        };
        projection2.translate = function(_) {
          return arguments.length ? (tx = +_[0], ty = +_[1], reset()) : [tx, ty];
        };
        projection2.angle = function(_) {
          return arguments.length ? (alpha = _ % 360 * radians, sa = sin(alpha), ca = cos(alpha), reset()) : alpha * degrees;
        };
        projection2.reflectX = function(_) {
          return arguments.length ? (sx = _ ? -1 : 1, reset()) : sx < 0;
        };
        projection2.reflectY = function(_) {
          return arguments.length ? (sy = _ ? -1 : 1, reset()) : sy < 0;
        };
        projection2.fitExtent = function(extent6, object2) {
          return fitExtent(projection2, extent6, object2);
        };
        projection2.fitSize = function(size, object2) {
          return fitSize(projection2, size, object2);
        };
        projection2.fitWidth = function(width, object2) {
          return fitWidth(projection2, width, object2);
        };
        projection2.fitHeight = function(height, object2) {
          return fitHeight(projection2, height, object2);
        };
        return projection2;
      }
      function naturalEarth1Raw(lambda, phi) {
        var phi2 = phi * phi, phi4 = phi2 * phi2;
        return [
          lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (3971e-6 * phi2 - 1529e-6 * phi4))),
          phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 5916e-6 * phi4)))
        ];
      }
      naturalEarth1Raw.invert = function(x, y) {
        var phi = y, i = 25, delta;
        do {
          var phi2 = phi * phi, phi4 = phi2 * phi2;
          phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 5916e-6 * phi4))) - y) / (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 5916e-6 * 11 * phi4)));
        } while (abs(delta) > epsilon && --i > 0);
        return [
          x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (3971e-6 - 1529e-6 * phi2)))),
          phi
        ];
      };
      function naturalEarth1() {
        return projection(naturalEarth1Raw).scale(175.295);
      }
      function orthographicRaw(x, y) {
        return [cos(y) * sin(x), sin(y)];
      }
      orthographicRaw.invert = azimuthalInvert(asin);
      function orthographic() {
        return projection(orthographicRaw).scale(249.5).clipAngle(90 + epsilon);
      }
      function stereographicRaw(x, y) {
        var cy = cos(y), k = 1 + cos(x) * cy;
        return [cy * sin(x) / k, sin(y) / k];
      }
      stereographicRaw.invert = azimuthalInvert(function(z) {
        return 2 * atan(z);
      });
      function stereographic() {
        return projection(stereographicRaw).scale(250).clipAngle(142);
      }
      function transverseMercatorRaw(lambda, phi) {
        return [log(tan((halfPi + phi) / 2)), -lambda];
      }
      transverseMercatorRaw.invert = function(x, y) {
        return [-y, 2 * atan(exp(x)) - halfPi];
      };
      function transverseMercator() {
        var m = mercatorProjection(transverseMercatorRaw), center = m.center, rotate = m.rotate;
        m.center = function(_) {
          return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
        };
        m.rotate = function(_) {
          return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
        };
        return rotate([0, 0, 90]).scale(159.155);
      }
      exports2.geoAlbers = albers;
      exports2.geoAlbersUsa = albersUsa;
      exports2.geoArea = area;
      exports2.geoAzimuthalEqualArea = azimuthalEqualArea;
      exports2.geoAzimuthalEqualAreaRaw = azimuthalEqualAreaRaw;
      exports2.geoAzimuthalEquidistant = azimuthalEquidistant;
      exports2.geoAzimuthalEquidistantRaw = azimuthalEquidistantRaw;
      exports2.geoBounds = bounds;
      exports2.geoCentroid = centroid;
      exports2.geoCircle = circle;
      exports2.geoClipAntimeridian = clipAntimeridian;
      exports2.geoClipCircle = clipCircle;
      exports2.geoClipExtent = extent5;
      exports2.geoClipRectangle = clipRectangle;
      exports2.geoConicConformal = conicConformal;
      exports2.geoConicConformalRaw = conicConformalRaw;
      exports2.geoConicEqualArea = conicEqualArea;
      exports2.geoConicEqualAreaRaw = conicEqualAreaRaw;
      exports2.geoConicEquidistant = conicEquidistant;
      exports2.geoConicEquidistantRaw = conicEquidistantRaw;
      exports2.geoContains = contains;
      exports2.geoDistance = distance;
      exports2.geoEqualEarth = equalEarth;
      exports2.geoEqualEarthRaw = equalEarthRaw;
      exports2.geoEquirectangular = equirectangular;
      exports2.geoEquirectangularRaw = equirectangularRaw;
      exports2.geoGnomonic = gnomonic;
      exports2.geoGnomonicRaw = gnomonicRaw;
      exports2.geoGraticule = graticule;
      exports2.geoGraticule10 = graticule10;
      exports2.geoIdentity = identity$1;
      exports2.geoInterpolate = interpolate;
      exports2.geoLength = length;
      exports2.geoMercator = mercator;
      exports2.geoMercatorRaw = mercatorRaw;
      exports2.geoNaturalEarth1 = naturalEarth1;
      exports2.geoNaturalEarth1Raw = naturalEarth1Raw;
      exports2.geoOrthographic = orthographic;
      exports2.geoOrthographicRaw = orthographicRaw;
      exports2.geoPath = index;
      exports2.geoProjection = projection;
      exports2.geoProjectionMutator = projectionMutator;
      exports2.geoRotation = rotation;
      exports2.geoStereographic = stereographic;
      exports2.geoStereographicRaw = stereographicRaw;
      exports2.geoStream = geoStream;
      exports2.geoTransform = transform;
      exports2.geoTransverseMercator = transverseMercator;
      exports2.geoTransverseMercatorRaw = transverseMercatorRaw;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-hierarchy@2.0.0/node_modules/d3-hierarchy/dist/d3-hierarchy.js
var require_d3_hierarchy = __commonJS({
  "node_modules/.pnpm/d3-hierarchy@2.0.0/node_modules/d3-hierarchy/dist/d3-hierarchy.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      function defaultSeparation(a, b) {
        return a.parent === b.parent ? 1 : 2;
      }
      function meanX(children) {
        return children.reduce(meanXReduce, 0) / children.length;
      }
      function meanXReduce(x, c) {
        return x + c.x;
      }
      function maxY(children) {
        return 1 + children.reduce(maxYReduce, 0);
      }
      function maxYReduce(y, c) {
        return Math.max(y, c.y);
      }
      function leafLeft(node) {
        var children;
        while (children = node.children)
          node = children[0];
        return node;
      }
      function leafRight(node) {
        var children;
        while (children = node.children)
          node = children[children.length - 1];
        return node;
      }
      function cluster() {
        var separation = defaultSeparation, dx = 1, dy = 1, nodeSize = false;
        function cluster2(root) {
          var previousNode, x = 0;
          root.eachAfter(function(node) {
            var children = node.children;
            if (children) {
              node.x = meanX(children);
              node.y = maxY(children);
            } else {
              node.x = previousNode ? x += separation(node, previousNode) : 0;
              node.y = 0;
              previousNode = node;
            }
          });
          var left = leafLeft(root), right = leafRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
          return root.eachAfter(nodeSize ? function(node) {
            node.x = (node.x - root.x) * dx;
            node.y = (root.y - node.y) * dy;
          } : function(node) {
            node.x = (node.x - x0) / (x1 - x0) * dx;
            node.y = (1 - (root.y ? node.y / root.y : 1)) * dy;
          });
        }
        cluster2.separation = function(x) {
          return arguments.length ? (separation = x, cluster2) : separation;
        };
        cluster2.size = function(x) {
          return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], cluster2) : nodeSize ? null : [dx, dy];
        };
        cluster2.nodeSize = function(x) {
          return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], cluster2) : nodeSize ? [dx, dy] : null;
        };
        return cluster2;
      }
      function count(node) {
        var sum = 0, children = node.children, i = children && children.length;
        if (!i)
          sum = 1;
        else
          while (--i >= 0)
            sum += children[i].value;
        node.value = sum;
      }
      function node_count() {
        return this.eachAfter(count);
      }
      function node_each(callback, that) {
        let index2 = -1;
        for (const node of this) {
          callback.call(that, node, ++index2, this);
        }
        return this;
      }
      function node_eachBefore(callback, that) {
        var node = this, nodes = [node], children, i, index2 = -1;
        while (node = nodes.pop()) {
          callback.call(that, node, ++index2, this);
          if (children = node.children) {
            for (i = children.length - 1; i >= 0; --i) {
              nodes.push(children[i]);
            }
          }
        }
        return this;
      }
      function node_eachAfter(callback, that) {
        var node = this, nodes = [node], next = [], children, i, n, index2 = -1;
        while (node = nodes.pop()) {
          next.push(node);
          if (children = node.children) {
            for (i = 0, n = children.length; i < n; ++i) {
              nodes.push(children[i]);
            }
          }
        }
        while (node = next.pop()) {
          callback.call(that, node, ++index2, this);
        }
        return this;
      }
      function node_find(callback, that) {
        let index2 = -1;
        for (const node of this) {
          if (callback.call(that, node, ++index2, this)) {
            return node;
          }
        }
      }
      function node_sum(value) {
        return this.eachAfter(function(node) {
          var sum = +value(node.data) || 0, children = node.children, i = children && children.length;
          while (--i >= 0)
            sum += children[i].value;
          node.value = sum;
        });
      }
      function node_sort(compare) {
        return this.eachBefore(function(node) {
          if (node.children) {
            node.children.sort(compare);
          }
        });
      }
      function node_path(end) {
        var start = this, ancestor = leastCommonAncestor(start, end), nodes = [start];
        while (start !== ancestor) {
          start = start.parent;
          nodes.push(start);
        }
        var k = nodes.length;
        while (end !== ancestor) {
          nodes.splice(k, 0, end);
          end = end.parent;
        }
        return nodes;
      }
      function leastCommonAncestor(a, b) {
        if (a === b)
          return a;
        var aNodes = a.ancestors(), bNodes = b.ancestors(), c = null;
        a = aNodes.pop();
        b = bNodes.pop();
        while (a === b) {
          c = a;
          a = aNodes.pop();
          b = bNodes.pop();
        }
        return c;
      }
      function node_ancestors() {
        var node = this, nodes = [node];
        while (node = node.parent) {
          nodes.push(node);
        }
        return nodes;
      }
      function node_descendants() {
        return Array.from(this);
      }
      function node_leaves() {
        var leaves = [];
        this.eachBefore(function(node) {
          if (!node.children) {
            leaves.push(node);
          }
        });
        return leaves;
      }
      function node_links() {
        var root = this, links = [];
        root.each(function(node) {
          if (node !== root) {
            links.push({ source: node.parent, target: node });
          }
        });
        return links;
      }
      function* node_iterator() {
        var node = this, current, next = [node], children, i, n;
        do {
          current = next.reverse(), next = [];
          while (node = current.pop()) {
            yield node;
            if (children = node.children) {
              for (i = 0, n = children.length; i < n; ++i) {
                next.push(children[i]);
              }
            }
          }
        } while (next.length);
      }
      function hierarchy(data, children) {
        if (data instanceof Map) {
          data = [void 0, data];
          if (children === void 0)
            children = mapChildren;
        } else if (children === void 0) {
          children = objectChildren;
        }
        var root = new Node(data), node, nodes = [root], child, childs, i, n;
        while (node = nodes.pop()) {
          if ((childs = children(node.data)) && (n = (childs = Array.from(childs)).length)) {
            node.children = childs;
            for (i = n - 1; i >= 0; --i) {
              nodes.push(child = childs[i] = new Node(childs[i]));
              child.parent = node;
              child.depth = node.depth + 1;
            }
          }
        }
        return root.eachBefore(computeHeight);
      }
      function node_copy() {
        return hierarchy(this).eachBefore(copyData);
      }
      function objectChildren(d) {
        return d.children;
      }
      function mapChildren(d) {
        return Array.isArray(d) ? d[1] : null;
      }
      function copyData(node) {
        if (node.data.value !== void 0)
          node.value = node.data.value;
        node.data = node.data.data;
      }
      function computeHeight(node) {
        var height = 0;
        do
          node.height = height;
        while ((node = node.parent) && node.height < ++height);
      }
      function Node(data) {
        this.data = data;
        this.depth = this.height = 0;
        this.parent = null;
      }
      Node.prototype = hierarchy.prototype = {
        constructor: Node,
        count: node_count,
        each: node_each,
        eachAfter: node_eachAfter,
        eachBefore: node_eachBefore,
        find: node_find,
        sum: node_sum,
        sort: node_sort,
        path: node_path,
        ancestors: node_ancestors,
        descendants: node_descendants,
        leaves: node_leaves,
        links: node_links,
        copy: node_copy,
        [Symbol.iterator]: node_iterator
      };
      function array(x) {
        return typeof x === "object" && "length" in x ? x : Array.from(x);
      }
      function shuffle(array2) {
        var m = array2.length, t, i;
        while (m) {
          i = Math.random() * m-- | 0;
          t = array2[m];
          array2[m] = array2[i];
          array2[i] = t;
        }
        return array2;
      }
      function enclose(circles) {
        var i = 0, n = (circles = shuffle(Array.from(circles))).length, B = [], p, e;
        while (i < n) {
          p = circles[i];
          if (e && enclosesWeak(e, p))
            ++i;
          else
            e = encloseBasis(B = extendBasis(B, p)), i = 0;
        }
        return e;
      }
      function extendBasis(B, p) {
        var i, j;
        if (enclosesWeakAll(p, B))
          return [p];
        for (i = 0; i < B.length; ++i) {
          if (enclosesNot(p, B[i]) && enclosesWeakAll(encloseBasis2(B[i], p), B)) {
            return [B[i], p];
          }
        }
        for (i = 0; i < B.length - 1; ++i) {
          for (j = i + 1; j < B.length; ++j) {
            if (enclosesNot(encloseBasis2(B[i], B[j]), p) && enclosesNot(encloseBasis2(B[i], p), B[j]) && enclosesNot(encloseBasis2(B[j], p), B[i]) && enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)) {
              return [B[i], B[j], p];
            }
          }
        }
        throw new Error();
      }
      function enclosesNot(a, b) {
        var dr = a.r - b.r, dx = b.x - a.x, dy = b.y - a.y;
        return dr < 0 || dr * dr < dx * dx + dy * dy;
      }
      function enclosesWeak(a, b) {
        var dr = a.r - b.r + Math.max(a.r, b.r, 1) * 1e-9, dx = b.x - a.x, dy = b.y - a.y;
        return dr > 0 && dr * dr > dx * dx + dy * dy;
      }
      function enclosesWeakAll(a, B) {
        for (var i = 0; i < B.length; ++i) {
          if (!enclosesWeak(a, B[i])) {
            return false;
          }
        }
        return true;
      }
      function encloseBasis(B) {
        switch (B.length) {
          case 1:
            return encloseBasis1(B[0]);
          case 2:
            return encloseBasis2(B[0], B[1]);
          case 3:
            return encloseBasis3(B[0], B[1], B[2]);
        }
      }
      function encloseBasis1(a) {
        return {
          x: a.x,
          y: a.y,
          r: a.r
        };
      }
      function encloseBasis2(a, b) {
        var x1 = a.x, y1 = a.y, r1 = a.r, x2 = b.x, y2 = b.y, r2 = b.r, x21 = x2 - x1, y21 = y2 - y1, r21 = r2 - r1, l = Math.sqrt(x21 * x21 + y21 * y21);
        return {
          x: (x1 + x2 + x21 / l * r21) / 2,
          y: (y1 + y2 + y21 / l * r21) / 2,
          r: (l + r1 + r2) / 2
        };
      }
      function encloseBasis3(a, b, c) {
        var x1 = a.x, y1 = a.y, r1 = a.r, x2 = b.x, y2 = b.y, r2 = b.r, x3 = c.x, y3 = c.y, r3 = c.r, a2 = x1 - x2, a3 = x1 - x3, b2 = y1 - y2, b3 = y1 - y3, c2 = r2 - r1, c3 = r3 - r1, d1 = x1 * x1 + y1 * y1 - r1 * r1, d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2, d39 = d1 - x3 * x3 - y3 * y3 + r3 * r3, ab = a3 * b2 - a2 * b3, xa = (b2 * d39 - b3 * d2) / (ab * 2) - x1, xb = (b3 * c2 - b2 * c3) / ab, ya = (a3 * d2 - a2 * d39) / (ab * 2) - y1, yb = (a2 * c3 - a3 * c2) / ab, A = xb * xb + yb * yb - 1, B = 2 * (r1 + xa * xb + ya * yb), C = xa * xa + ya * ya - r1 * r1, r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
        return {
          x: x1 + xa + xb * r,
          y: y1 + ya + yb * r,
          r
        };
      }
      function place(b, a, c) {
        var dx = b.x - a.x, x, a2, dy = b.y - a.y, y, b2, d2 = dx * dx + dy * dy;
        if (d2) {
          a2 = a.r + c.r, a2 *= a2;
          b2 = b.r + c.r, b2 *= b2;
          if (a2 > b2) {
            x = (d2 + b2 - a2) / (2 * d2);
            y = Math.sqrt(Math.max(0, b2 / d2 - x * x));
            c.x = b.x - x * dx - y * dy;
            c.y = b.y - x * dy + y * dx;
          } else {
            x = (d2 + a2 - b2) / (2 * d2);
            y = Math.sqrt(Math.max(0, a2 / d2 - x * x));
            c.x = a.x + x * dx - y * dy;
            c.y = a.y + x * dy + y * dx;
          }
        } else {
          c.x = a.x + c.r;
          c.y = a.y;
        }
      }
      function intersects(a, b) {
        var dr = a.r + b.r - 1e-6, dx = b.x - a.x, dy = b.y - a.y;
        return dr > 0 && dr * dr > dx * dx + dy * dy;
      }
      function score(node) {
        var a = node._, b = node.next._, ab = a.r + b.r, dx = (a.x * b.r + b.x * a.r) / ab, dy = (a.y * b.r + b.y * a.r) / ab;
        return dx * dx + dy * dy;
      }
      function Node$1(circle) {
        this._ = circle;
        this.next = null;
        this.previous = null;
      }
      function packEnclose(circles) {
        if (!(n = (circles = array(circles)).length))
          return 0;
        var a, b, c, n, aa, ca, i, j, k, sj, sk;
        a = circles[0], a.x = 0, a.y = 0;
        if (!(n > 1))
          return a.r;
        b = circles[1], a.x = -b.r, b.x = a.r, b.y = 0;
        if (!(n > 2))
          return a.r + b.r;
        place(b, a, c = circles[2]);
        a = new Node$1(a), b = new Node$1(b), c = new Node$1(c);
        a.next = c.previous = b;
        b.next = a.previous = c;
        c.next = b.previous = a;
        pack:
          for (i = 3; i < n; ++i) {
            place(a._, b._, c = circles[i]), c = new Node$1(c);
            j = b.next, k = a.previous, sj = b._.r, sk = a._.r;
            do {
              if (sj <= sk) {
                if (intersects(j._, c._)) {
                  b = j, a.next = b, b.previous = a, --i;
                  continue pack;
                }
                sj += j._.r, j = j.next;
              } else {
                if (intersects(k._, c._)) {
                  a = k, a.next = b, b.previous = a, --i;
                  continue pack;
                }
                sk += k._.r, k = k.previous;
              }
            } while (j !== k.next);
            c.previous = a, c.next = b, a.next = b.previous = b = c;
            aa = score(a);
            while ((c = c.next) !== b) {
              if ((ca = score(c)) < aa) {
                a = c, aa = ca;
              }
            }
            b = a.next;
          }
        a = [b._], c = b;
        while ((c = c.next) !== b)
          a.push(c._);
        c = enclose(a);
        for (i = 0; i < n; ++i)
          a = circles[i], a.x -= c.x, a.y -= c.y;
        return c.r;
      }
      function siblings(circles) {
        packEnclose(circles);
        return circles;
      }
      function optional(f) {
        return f == null ? null : required(f);
      }
      function required(f) {
        if (typeof f !== "function")
          throw new Error();
        return f;
      }
      function constantZero() {
        return 0;
      }
      function constant(x) {
        return function() {
          return x;
        };
      }
      function defaultRadius(d) {
        return Math.sqrt(d.value);
      }
      function index() {
        var radius = null, dx = 1, dy = 1, padding = constantZero;
        function pack(root) {
          root.x = dx / 2, root.y = dy / 2;
          if (radius) {
            root.eachBefore(radiusLeaf(radius)).eachAfter(packChildren(padding, 0.5)).eachBefore(translateChild(1));
          } else {
            root.eachBefore(radiusLeaf(defaultRadius)).eachAfter(packChildren(constantZero, 1)).eachAfter(packChildren(padding, root.r / Math.min(dx, dy))).eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
          }
          return root;
        }
        pack.radius = function(x) {
          return arguments.length ? (radius = optional(x), pack) : radius;
        };
        pack.size = function(x) {
          return arguments.length ? (dx = +x[0], dy = +x[1], pack) : [dx, dy];
        };
        pack.padding = function(x) {
          return arguments.length ? (padding = typeof x === "function" ? x : constant(+x), pack) : padding;
        };
        return pack;
      }
      function radiusLeaf(radius) {
        return function(node) {
          if (!node.children) {
            node.r = Math.max(0, +radius(node) || 0);
          }
        };
      }
      function packChildren(padding, k) {
        return function(node) {
          if (children = node.children) {
            var children, i, n = children.length, r = padding(node) * k || 0, e;
            if (r)
              for (i = 0; i < n; ++i)
                children[i].r += r;
            e = packEnclose(children);
            if (r)
              for (i = 0; i < n; ++i)
                children[i].r -= r;
            node.r = e + r;
          }
        };
      }
      function translateChild(k) {
        return function(node) {
          var parent = node.parent;
          node.r *= k;
          if (parent) {
            node.x = parent.x + k * node.x;
            node.y = parent.y + k * node.y;
          }
        };
      }
      function roundNode(node) {
        node.x0 = Math.round(node.x0);
        node.y0 = Math.round(node.y0);
        node.x1 = Math.round(node.x1);
        node.y1 = Math.round(node.y1);
      }
      function treemapDice(parent, x0, y0, x1, y1) {
        var nodes = parent.children, node, i = -1, n = nodes.length, k = parent.value && (x1 - x0) / parent.value;
        while (++i < n) {
          node = nodes[i], node.y0 = y0, node.y1 = y1;
          node.x0 = x0, node.x1 = x0 += node.value * k;
        }
      }
      function partition() {
        var dx = 1, dy = 1, padding = 0, round = false;
        function partition2(root) {
          var n = root.height + 1;
          root.x0 = root.y0 = padding;
          root.x1 = dx;
          root.y1 = dy / n;
          root.eachBefore(positionNode(dy, n));
          if (round)
            root.eachBefore(roundNode);
          return root;
        }
        function positionNode(dy2, n) {
          return function(node) {
            if (node.children) {
              treemapDice(node, node.x0, dy2 * (node.depth + 1) / n, node.x1, dy2 * (node.depth + 2) / n);
            }
            var x0 = node.x0, y0 = node.y0, x1 = node.x1 - padding, y1 = node.y1 - padding;
            if (x1 < x0)
              x0 = x1 = (x0 + x1) / 2;
            if (y1 < y0)
              y0 = y1 = (y0 + y1) / 2;
            node.x0 = x0;
            node.y0 = y0;
            node.x1 = x1;
            node.y1 = y1;
          };
        }
        partition2.round = function(x) {
          return arguments.length ? (round = !!x, partition2) : round;
        };
        partition2.size = function(x) {
          return arguments.length ? (dx = +x[0], dy = +x[1], partition2) : [dx, dy];
        };
        partition2.padding = function(x) {
          return arguments.length ? (padding = +x, partition2) : padding;
        };
        return partition2;
      }
      var preroot = { depth: -1 }, ambiguous = {};
      function defaultId(d) {
        return d.id;
      }
      function defaultParentId(d) {
        return d.parentId;
      }
      function stratify() {
        var id = defaultId, parentId = defaultParentId;
        function stratify2(data) {
          var nodes = Array.from(data), n = nodes.length, d, i, root, parent, node, nodeId, nodeKey, nodeByKey = /* @__PURE__ */ new Map();
          for (i = 0; i < n; ++i) {
            d = nodes[i], node = nodes[i] = new Node(d);
            if ((nodeId = id(d, i, data)) != null && (nodeId += "")) {
              nodeKey = node.id = nodeId;
              nodeByKey.set(nodeKey, nodeByKey.has(nodeKey) ? ambiguous : node);
            }
            if ((nodeId = parentId(d, i, data)) != null && (nodeId += "")) {
              node.parent = nodeId;
            }
          }
          for (i = 0; i < n; ++i) {
            node = nodes[i];
            if (nodeId = node.parent) {
              parent = nodeByKey.get(nodeId);
              if (!parent)
                throw new Error("missing: " + nodeId);
              if (parent === ambiguous)
                throw new Error("ambiguous: " + nodeId);
              if (parent.children)
                parent.children.push(node);
              else
                parent.children = [node];
              node.parent = parent;
            } else {
              if (root)
                throw new Error("multiple roots");
              root = node;
            }
          }
          if (!root)
            throw new Error("no root");
          root.parent = preroot;
          root.eachBefore(function(node2) {
            node2.depth = node2.parent.depth + 1;
            --n;
          }).eachBefore(computeHeight);
          root.parent = null;
          if (n > 0)
            throw new Error("cycle");
          return root;
        }
        stratify2.id = function(x) {
          return arguments.length ? (id = required(x), stratify2) : id;
        };
        stratify2.parentId = function(x) {
          return arguments.length ? (parentId = required(x), stratify2) : parentId;
        };
        return stratify2;
      }
      function defaultSeparation$1(a, b) {
        return a.parent === b.parent ? 1 : 2;
      }
      function nextLeft(v) {
        var children = v.children;
        return children ? children[0] : v.t;
      }
      function nextRight(v) {
        var children = v.children;
        return children ? children[children.length - 1] : v.t;
      }
      function moveSubtree(wm, wp, shift) {
        var change = shift / (wp.i - wm.i);
        wp.c -= change;
        wp.s += shift;
        wm.c += change;
        wp.z += shift;
        wp.m += shift;
      }
      function executeShifts(v) {
        var shift = 0, change = 0, children = v.children, i = children.length, w;
        while (--i >= 0) {
          w = children[i];
          w.z += shift;
          w.m += shift;
          shift += w.s + (change += w.c);
        }
      }
      function nextAncestor(vim, v, ancestor) {
        return vim.a.parent === v.parent ? vim.a : ancestor;
      }
      function TreeNode2(node, i) {
        this._ = node;
        this.parent = null;
        this.children = null;
        this.A = null;
        this.a = this;
        this.z = 0;
        this.m = 0;
        this.c = 0;
        this.s = 0;
        this.t = null;
        this.i = i;
      }
      TreeNode2.prototype = Object.create(Node.prototype);
      function treeRoot(root) {
        var tree2 = new TreeNode2(root, 0), node, nodes = [tree2], child, children, i, n;
        while (node = nodes.pop()) {
          if (children = node._.children) {
            node.children = new Array(n = children.length);
            for (i = n - 1; i >= 0; --i) {
              nodes.push(child = node.children[i] = new TreeNode2(children[i], i));
              child.parent = node;
            }
          }
        }
        (tree2.parent = new TreeNode2(null, 0)).children = [tree2];
        return tree2;
      }
      function tree() {
        var separation = defaultSeparation$1, dx = 1, dy = 1, nodeSize = null;
        function tree2(root) {
          var t = treeRoot(root);
          t.eachAfter(firstWalk), t.parent.m = -t.z;
          t.eachBefore(secondWalk);
          if (nodeSize)
            root.eachBefore(sizeNode);
          else {
            var left = root, right = root, bottom = root;
            root.eachBefore(function(node) {
              if (node.x < left.x)
                left = node;
              if (node.x > right.x)
                right = node;
              if (node.depth > bottom.depth)
                bottom = node;
            });
            var s = left === right ? 1 : separation(left, right) / 2, tx = s - left.x, kx = dx / (right.x + s + tx), ky = dy / (bottom.depth || 1);
            root.eachBefore(function(node) {
              node.x = (node.x + tx) * kx;
              node.y = node.depth * ky;
            });
          }
          return root;
        }
        function firstWalk(v) {
          var children = v.children, siblings2 = v.parent.children, w = v.i ? siblings2[v.i - 1] : null;
          if (children) {
            executeShifts(v);
            var midpoint = (children[0].z + children[children.length - 1].z) / 2;
            if (w) {
              v.z = w.z + separation(v._, w._);
              v.m = v.z - midpoint;
            } else {
              v.z = midpoint;
            }
          } else if (w) {
            v.z = w.z + separation(v._, w._);
          }
          v.parent.A = apportion(v, w, v.parent.A || siblings2[0]);
        }
        function secondWalk(v) {
          v._.x = v.z + v.parent.m;
          v.m += v.parent.m;
        }
        function apportion(v, w, ancestor) {
          if (w) {
            var vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift;
            while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
              vom = nextLeft(vom);
              vop = nextRight(vop);
              vop.a = v;
              shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
              if (shift > 0) {
                moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
                sip += shift;
                sop += shift;
              }
              sim += vim.m;
              sip += vip.m;
              som += vom.m;
              sop += vop.m;
            }
            if (vim && !nextRight(vop)) {
              vop.t = vim;
              vop.m += sim - sop;
            }
            if (vip && !nextLeft(vom)) {
              vom.t = vip;
              vom.m += sip - som;
              ancestor = v;
            }
          }
          return ancestor;
        }
        function sizeNode(node) {
          node.x *= dx;
          node.y = node.depth * dy;
        }
        tree2.separation = function(x) {
          return arguments.length ? (separation = x, tree2) : separation;
        };
        tree2.size = function(x) {
          return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], tree2) : nodeSize ? null : [dx, dy];
        };
        tree2.nodeSize = function(x) {
          return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], tree2) : nodeSize ? [dx, dy] : null;
        };
        return tree2;
      }
      function treemapSlice(parent, x0, y0, x1, y1) {
        var nodes = parent.children, node, i = -1, n = nodes.length, k = parent.value && (y1 - y0) / parent.value;
        while (++i < n) {
          node = nodes[i], node.x0 = x0, node.x1 = x1;
          node.y0 = y0, node.y1 = y0 += node.value * k;
        }
      }
      var phi = (1 + Math.sqrt(5)) / 2;
      function squarifyRatio(ratio, parent, x0, y0, x1, y1) {
        var rows = [], nodes = parent.children, row, nodeValue, i0 = 0, i1 = 0, n = nodes.length, dx, dy, value = parent.value, sumValue, minValue, maxValue, newRatio, minRatio, alpha, beta;
        while (i0 < n) {
          dx = x1 - x0, dy = y1 - y0;
          do
            sumValue = nodes[i1++].value;
          while (!sumValue && i1 < n);
          minValue = maxValue = sumValue;
          alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
          beta = sumValue * sumValue * alpha;
          minRatio = Math.max(maxValue / beta, beta / minValue);
          for (; i1 < n; ++i1) {
            sumValue += nodeValue = nodes[i1].value;
            if (nodeValue < minValue)
              minValue = nodeValue;
            if (nodeValue > maxValue)
              maxValue = nodeValue;
            beta = sumValue * sumValue * alpha;
            newRatio = Math.max(maxValue / beta, beta / minValue);
            if (newRatio > minRatio) {
              sumValue -= nodeValue;
              break;
            }
            minRatio = newRatio;
          }
          rows.push(row = { value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1) });
          if (row.dice)
            treemapDice(row, x0, y0, x1, value ? y0 += dy * sumValue / value : y1);
          else
            treemapSlice(row, x0, y0, value ? x0 += dx * sumValue / value : x1, y1);
          value -= sumValue, i0 = i1;
        }
        return rows;
      }
      var squarify = function custom(ratio) {
        function squarify2(parent, x0, y0, x1, y1) {
          squarifyRatio(ratio, parent, x0, y0, x1, y1);
        }
        squarify2.ratio = function(x) {
          return custom((x = +x) > 1 ? x : 1);
        };
        return squarify2;
      }(phi);
      function index$1() {
        var tile = squarify, round = false, dx = 1, dy = 1, paddingStack = [0], paddingInner = constantZero, paddingTop = constantZero, paddingRight = constantZero, paddingBottom = constantZero, paddingLeft = constantZero;
        function treemap(root) {
          root.x0 = root.y0 = 0;
          root.x1 = dx;
          root.y1 = dy;
          root.eachBefore(positionNode);
          paddingStack = [0];
          if (round)
            root.eachBefore(roundNode);
          return root;
        }
        function positionNode(node) {
          var p = paddingStack[node.depth], x0 = node.x0 + p, y0 = node.y0 + p, x1 = node.x1 - p, y1 = node.y1 - p;
          if (x1 < x0)
            x0 = x1 = (x0 + x1) / 2;
          if (y1 < y0)
            y0 = y1 = (y0 + y1) / 2;
          node.x0 = x0;
          node.y0 = y0;
          node.x1 = x1;
          node.y1 = y1;
          if (node.children) {
            p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
            x0 += paddingLeft(node) - p;
            y0 += paddingTop(node) - p;
            x1 -= paddingRight(node) - p;
            y1 -= paddingBottom(node) - p;
            if (x1 < x0)
              x0 = x1 = (x0 + x1) / 2;
            if (y1 < y0)
              y0 = y1 = (y0 + y1) / 2;
            tile(node, x0, y0, x1, y1);
          }
        }
        treemap.round = function(x) {
          return arguments.length ? (round = !!x, treemap) : round;
        };
        treemap.size = function(x) {
          return arguments.length ? (dx = +x[0], dy = +x[1], treemap) : [dx, dy];
        };
        treemap.tile = function(x) {
          return arguments.length ? (tile = required(x), treemap) : tile;
        };
        treemap.padding = function(x) {
          return arguments.length ? treemap.paddingInner(x).paddingOuter(x) : treemap.paddingInner();
        };
        treemap.paddingInner = function(x) {
          return arguments.length ? (paddingInner = typeof x === "function" ? x : constant(+x), treemap) : paddingInner;
        };
        treemap.paddingOuter = function(x) {
          return arguments.length ? treemap.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x) : treemap.paddingTop();
        };
        treemap.paddingTop = function(x) {
          return arguments.length ? (paddingTop = typeof x === "function" ? x : constant(+x), treemap) : paddingTop;
        };
        treemap.paddingRight = function(x) {
          return arguments.length ? (paddingRight = typeof x === "function" ? x : constant(+x), treemap) : paddingRight;
        };
        treemap.paddingBottom = function(x) {
          return arguments.length ? (paddingBottom = typeof x === "function" ? x : constant(+x), treemap) : paddingBottom;
        };
        treemap.paddingLeft = function(x) {
          return arguments.length ? (paddingLeft = typeof x === "function" ? x : constant(+x), treemap) : paddingLeft;
        };
        return treemap;
      }
      function binary(parent, x0, y0, x1, y1) {
        var nodes = parent.children, i, n = nodes.length, sum, sums = new Array(n + 1);
        for (sums[0] = sum = i = 0; i < n; ++i) {
          sums[i + 1] = sum += nodes[i].value;
        }
        partition2(0, n, parent.value, x0, y0, x1, y1);
        function partition2(i2, j, value, x02, y02, x12, y12) {
          if (i2 >= j - 1) {
            var node = nodes[i2];
            node.x0 = x02, node.y0 = y02;
            node.x1 = x12, node.y1 = y12;
            return;
          }
          var valueOffset = sums[i2], valueTarget = value / 2 + valueOffset, k = i2 + 1, hi = j - 1;
          while (k < hi) {
            var mid = k + hi >>> 1;
            if (sums[mid] < valueTarget)
              k = mid + 1;
            else
              hi = mid;
          }
          if (valueTarget - sums[k - 1] < sums[k] - valueTarget && i2 + 1 < k)
            --k;
          var valueLeft = sums[k] - valueOffset, valueRight = value - valueLeft;
          if (x12 - x02 > y12 - y02) {
            var xk = value ? (x02 * valueRight + x12 * valueLeft) / value : x12;
            partition2(i2, k, valueLeft, x02, y02, xk, y12);
            partition2(k, j, valueRight, xk, y02, x12, y12);
          } else {
            var yk = value ? (y02 * valueRight + y12 * valueLeft) / value : y12;
            partition2(i2, k, valueLeft, x02, y02, x12, yk);
            partition2(k, j, valueRight, x02, yk, x12, y12);
          }
        }
      }
      function sliceDice(parent, x0, y0, x1, y1) {
        (parent.depth & 1 ? treemapSlice : treemapDice)(parent, x0, y0, x1, y1);
      }
      var resquarify = function custom(ratio) {
        function resquarify2(parent, x0, y0, x1, y1) {
          if ((rows = parent._squarify) && rows.ratio === ratio) {
            var rows, row, nodes, i, j = -1, n, m = rows.length, value = parent.value;
            while (++j < m) {
              row = rows[j], nodes = row.children;
              for (i = row.value = 0, n = nodes.length; i < n; ++i)
                row.value += nodes[i].value;
              if (row.dice)
                treemapDice(row, x0, y0, x1, value ? y0 += (y1 - y0) * row.value / value : y1);
              else
                treemapSlice(row, x0, y0, value ? x0 += (x1 - x0) * row.value / value : x1, y1);
              value -= row.value;
            }
          } else {
            parent._squarify = rows = squarifyRatio(ratio, parent, x0, y0, x1, y1);
            rows.ratio = ratio;
          }
        }
        resquarify2.ratio = function(x) {
          return custom((x = +x) > 1 ? x : 1);
        };
        return resquarify2;
      }(phi);
      exports2.cluster = cluster;
      exports2.hierarchy = hierarchy;
      exports2.pack = index;
      exports2.packEnclose = enclose;
      exports2.packSiblings = siblings;
      exports2.partition = partition;
      exports2.stratify = stratify;
      exports2.tree = tree;
      exports2.treemap = index$1;
      exports2.treemapBinary = binary;
      exports2.treemapDice = treemapDice;
      exports2.treemapResquarify = resquarify;
      exports2.treemapSlice = treemapSlice;
      exports2.treemapSliceDice = sliceDice;
      exports2.treemapSquarify = squarify;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-polygon@2.0.0/node_modules/d3-polygon/dist/d3-polygon.js
var require_d3_polygon = __commonJS({
  "node_modules/.pnpm/d3-polygon@2.0.0/node_modules/d3-polygon/dist/d3-polygon.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      function area(polygon) {
        var i = -1, n = polygon.length, a, b = polygon[n - 1], area2 = 0;
        while (++i < n) {
          a = b;
          b = polygon[i];
          area2 += a[1] * b[0] - a[0] * b[1];
        }
        return area2 / 2;
      }
      function centroid(polygon) {
        var i = -1, n = polygon.length, x = 0, y = 0, a, b = polygon[n - 1], c, k = 0;
        while (++i < n) {
          a = b;
          b = polygon[i];
          k += c = a[0] * b[1] - b[0] * a[1];
          x += (a[0] + b[0]) * c;
          y += (a[1] + b[1]) * c;
        }
        return k *= 3, [x / k, y / k];
      }
      function cross(a, b, c) {
        return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
      }
      function lexicographicOrder(a, b) {
        return a[0] - b[0] || a[1] - b[1];
      }
      function computeUpperHullIndexes(points) {
        const n = points.length, indexes = [0, 1];
        let size = 2, i;
        for (i = 2; i < n; ++i) {
          while (size > 1 && cross(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0)
            --size;
          indexes[size++] = i;
        }
        return indexes.slice(0, size);
      }
      function hull(points) {
        if ((n = points.length) < 3)
          return null;
        var i, n, sortedPoints = new Array(n), flippedPoints = new Array(n);
        for (i = 0; i < n; ++i)
          sortedPoints[i] = [+points[i][0], +points[i][1], i];
        sortedPoints.sort(lexicographicOrder);
        for (i = 0; i < n; ++i)
          flippedPoints[i] = [sortedPoints[i][0], -sortedPoints[i][1]];
        var upperIndexes = computeUpperHullIndexes(sortedPoints), lowerIndexes = computeUpperHullIndexes(flippedPoints);
        var skipLeft = lowerIndexes[0] === upperIndexes[0], skipRight = lowerIndexes[lowerIndexes.length - 1] === upperIndexes[upperIndexes.length - 1], hull2 = [];
        for (i = upperIndexes.length - 1; i >= 0; --i)
          hull2.push(points[sortedPoints[upperIndexes[i]][2]]);
        for (i = +skipLeft; i < lowerIndexes.length - skipRight; ++i)
          hull2.push(points[sortedPoints[lowerIndexes[i]][2]]);
        return hull2;
      }
      function contains(polygon, point) {
        var n = polygon.length, p = polygon[n - 1], x = point[0], y = point[1], x0 = p[0], y0 = p[1], x1, y1, inside = false;
        for (var i = 0; i < n; ++i) {
          p = polygon[i], x1 = p[0], y1 = p[1];
          if (y1 > y !== y0 > y && x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)
            inside = !inside;
          x0 = x1, y0 = y1;
        }
        return inside;
      }
      function length(polygon) {
        var i = -1, n = polygon.length, b = polygon[n - 1], xa, ya, xb = b[0], yb = b[1], perimeter = 0;
        while (++i < n) {
          xa = xb;
          ya = yb;
          b = polygon[i];
          xb = b[0];
          yb = b[1];
          xa -= xb;
          ya -= yb;
          perimeter += Math.hypot(xa, ya);
        }
        return perimeter;
      }
      exports2.polygonArea = area;
      exports2.polygonCentroid = centroid;
      exports2.polygonContains = contains;
      exports2.polygonHull = hull;
      exports2.polygonLength = length;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-random@2.2.2/node_modules/d3-random/dist/d3-random.js
var require_d3_random = __commonJS({
  "node_modules/.pnpm/d3-random@2.2.2/node_modules/d3-random/dist/d3-random.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.d3 = global2.d3 || {}));
    })(exports, function(exports2) {
      "use strict";
      var defaultSource = Math.random;
      var uniform = function sourceRandomUniform(source) {
        function randomUniform2(min3, max8) {
          min3 = min3 == null ? 0 : +min3;
          max8 = max8 == null ? 1 : +max8;
          if (arguments.length === 1)
            max8 = min3, min3 = 0;
          else
            max8 -= min3;
          return function() {
            return source() * max8 + min3;
          };
        }
        randomUniform2.source = sourceRandomUniform;
        return randomUniform2;
      }(defaultSource);
      var int = function sourceRandomInt(source) {
        function randomInt5(min3, max8) {
          if (arguments.length < 2)
            max8 = min3, min3 = 0;
          min3 = Math.floor(min3);
          max8 = Math.floor(max8) - min3;
          return function() {
            return Math.floor(source() * max8 + min3);
          };
        }
        randomInt5.source = sourceRandomInt;
        return randomInt5;
      }(defaultSource);
      var normal = function sourceRandomNormal(source) {
        function randomNormal2(mu, sigma) {
          var x, r;
          mu = mu == null ? 0 : +mu;
          sigma = sigma == null ? 1 : +sigma;
          return function() {
            var y;
            if (x != null)
              y = x, x = null;
            else
              do {
                x = source() * 2 - 1;
                y = source() * 2 - 1;
                r = x * x + y * y;
              } while (!r || r > 1);
            return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
          };
        }
        randomNormal2.source = sourceRandomNormal;
        return randomNormal2;
      }(defaultSource);
      var logNormal = function sourceRandomLogNormal(source) {
        var N = normal.source(source);
        function randomLogNormal() {
          var randomNormal2 = N.apply(this, arguments);
          return function() {
            return Math.exp(randomNormal2());
          };
        }
        randomLogNormal.source = sourceRandomLogNormal;
        return randomLogNormal;
      }(defaultSource);
      var irwinHall = function sourceRandomIrwinHall(source) {
        function randomIrwinHall(n) {
          if ((n = +n) <= 0)
            return () => 0;
          return function() {
            for (var sum = 0, i = n; i > 1; --i)
              sum += source();
            return sum + i * source();
          };
        }
        randomIrwinHall.source = sourceRandomIrwinHall;
        return randomIrwinHall;
      }(defaultSource);
      var bates = function sourceRandomBates(source) {
        var I = irwinHall.source(source);
        function randomBates(n) {
          if ((n = +n) === 0)
            return source;
          var randomIrwinHall = I(n);
          return function() {
            return randomIrwinHall() / n;
          };
        }
        randomBates.source = sourceRandomBates;
        return randomBates;
      }(defaultSource);
      var exponential = function sourceRandomExponential(source) {
        function randomExponential(lambda) {
          return function() {
            return -Math.log1p(-source()) / lambda;
          };
        }
        randomExponential.source = sourceRandomExponential;
        return randomExponential;
      }(defaultSource);
      var pareto = function sourceRandomPareto(source) {
        function randomPareto(alpha) {
          if ((alpha = +alpha) < 0)
            throw new RangeError("invalid alpha");
          alpha = 1 / -alpha;
          return function() {
            return Math.pow(1 - source(), alpha);
          };
        }
        randomPareto.source = sourceRandomPareto;
        return randomPareto;
      }(defaultSource);
      var bernoulli = function sourceRandomBernoulli(source) {
        function randomBernoulli(p) {
          if ((p = +p) < 0 || p > 1)
            throw new RangeError("invalid p");
          return function() {
            return Math.floor(source() + p);
          };
        }
        randomBernoulli.source = sourceRandomBernoulli;
        return randomBernoulli;
      }(defaultSource);
      var geometric = function sourceRandomGeometric(source) {
        function randomGeometric(p) {
          if ((p = +p) < 0 || p > 1)
            throw new RangeError("invalid p");
          if (p === 0)
            return () => Infinity;
          if (p === 1)
            return () => 1;
          p = Math.log1p(-p);
          return function() {
            return 1 + Math.floor(Math.log1p(-source()) / p);
          };
        }
        randomGeometric.source = sourceRandomGeometric;
        return randomGeometric;
      }(defaultSource);
      var gamma = function sourceRandomGamma(source) {
        var randomNormal2 = normal.source(source)();
        function randomGamma(k, theta) {
          if ((k = +k) < 0)
            throw new RangeError("invalid k");
          if (k === 0)
            return () => 0;
          theta = theta == null ? 1 : +theta;
          if (k === 1)
            return () => -Math.log1p(-source()) * theta;
          var d = (k < 1 ? k + 1 : k) - 1 / 3, c = 1 / (3 * Math.sqrt(d)), multiplier = k < 1 ? () => Math.pow(source(), 1 / k) : () => 1;
          return function() {
            do {
              do {
                var x = randomNormal2(), v = 1 + c * x;
              } while (v <= 0);
              v *= v * v;
              var u = 1 - source();
            } while (u >= 1 - 0.0331 * x * x * x * x && Math.log(u) >= 0.5 * x * x + d * (1 - v + Math.log(v)));
            return d * v * multiplier() * theta;
          };
        }
        randomGamma.source = sourceRandomGamma;
        return randomGamma;
      }(defaultSource);
      var beta = function sourceRandomBeta(source) {
        var G = gamma.source(source);
        function randomBeta(alpha, beta2) {
          var X = G(alpha), Y = G(beta2);
          return function() {
            var x = X();
            return x === 0 ? 0 : x / (x + Y());
          };
        }
        randomBeta.source = sourceRandomBeta;
        return randomBeta;
      }(defaultSource);
      var binomial = function sourceRandomBinomial(source) {
        var G = geometric.source(source), B = beta.source(source);
        function randomBinomial(n, p) {
          n = +n;
          if ((p = +p) >= 1)
            return () => n;
          if (p <= 0)
            return () => 0;
          return function() {
            var acc = 0, nn = n, pp = p;
            while (nn * pp > 16 && nn * (1 - pp) > 16) {
              var i = Math.floor((nn + 1) * pp), y = B(i, nn - i + 1)();
              if (y <= pp) {
                acc += i;
                nn -= i;
                pp = (pp - y) / (1 - y);
              } else {
                nn = i - 1;
                pp /= y;
              }
            }
            var sign = pp < 0.5, pFinal = sign ? pp : 1 - pp, g = G(pFinal);
            for (var s = g(), k = 0; s <= nn; ++k)
              s += g();
            return acc + (sign ? k : nn - k);
          };
        }
        randomBinomial.source = sourceRandomBinomial;
        return randomBinomial;
      }(defaultSource);
      var weibull = function sourceRandomWeibull(source) {
        function randomWeibull(k, a, b) {
          var outerFunc;
          if ((k = +k) === 0) {
            outerFunc = (x) => -Math.log(x);
          } else {
            k = 1 / k;
            outerFunc = (x) => Math.pow(x, k);
          }
          a = a == null ? 0 : +a;
          b = b == null ? 1 : +b;
          return function() {
            return a + b * outerFunc(-Math.log1p(-source()));
          };
        }
        randomWeibull.source = sourceRandomWeibull;
        return randomWeibull;
      }(defaultSource);
      var cauchy = function sourceRandomCauchy(source) {
        function randomCauchy(a, b) {
          a = a == null ? 0 : +a;
          b = b == null ? 1 : +b;
          return function() {
            return a + b * Math.tan(Math.PI * source());
          };
        }
        randomCauchy.source = sourceRandomCauchy;
        return randomCauchy;
      }(defaultSource);
      var logistic = function sourceRandomLogistic(source) {
        function randomLogistic(a, b) {
          a = a == null ? 0 : +a;
          b = b == null ? 1 : +b;
          return function() {
            var u = source();
            return a + b * Math.log(u / (1 - u));
          };
        }
        randomLogistic.source = sourceRandomLogistic;
        return randomLogistic;
      }(defaultSource);
      var poisson = function sourceRandomPoisson(source) {
        var G = gamma.source(source), B = binomial.source(source);
        function randomPoisson(lambda) {
          return function() {
            var acc = 0, l = lambda;
            while (l > 16) {
              var n = Math.floor(0.875 * l), t = G(n)();
              if (t > l)
                return acc + B(n - 1, l / t)();
              acc += n;
              l -= t;
            }
            for (var s = -Math.log1p(-source()), k = 0; s <= l; ++k)
              s -= Math.log1p(-source());
            return acc + k;
          };
        }
        randomPoisson.source = sourceRandomPoisson;
        return randomPoisson;
      }(defaultSource);
      const mul = 1664525;
      const inc = 1013904223;
      const eps = 1 / 4294967296;
      function lcg(seed = Math.random()) {
        let state = (0 <= seed && seed < 1 ? seed / eps : Math.abs(seed)) | 0;
        return () => (state = mul * state + inc | 0, eps * (state >>> 0));
      }
      exports2.randomBates = bates;
      exports2.randomBernoulli = bernoulli;
      exports2.randomBeta = beta;
      exports2.randomBinomial = binomial;
      exports2.randomCauchy = cauchy;
      exports2.randomExponential = exponential;
      exports2.randomGamma = gamma;
      exports2.randomGeometric = geometric;
      exports2.randomInt = int;
      exports2.randomIrwinHall = irwinHall;
      exports2.randomLcg = lcg;
      exports2.randomLogNormal = logNormal;
      exports2.randomLogistic = logistic;
      exports2.randomNormal = normal;
      exports2.randomPareto = pareto;
      exports2.randomPoisson = poisson;
      exports2.randomUniform = uniform;
      exports2.randomWeibull = weibull;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-time@2.1.1/node_modules/d3-time/dist/d3-time.js
var require_d3_time = __commonJS({
  "node_modules/.pnpm/d3-time@2.1.1/node_modules/d3-time/dist/d3-time.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_array()) : typeof define === "function" && define.amd ? define(["exports", "d3-array"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3));
    })(exports, function(exports2, d3Array) {
      "use strict";
      var t0 = new Date(), t1 = new Date();
      function newInterval(floori, offseti, count, field) {
        function interval(date) {
          return floori(date = arguments.length === 0 ? new Date() : new Date(+date)), date;
        }
        interval.floor = function(date) {
          return floori(date = new Date(+date)), date;
        };
        interval.ceil = function(date) {
          return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
        };
        interval.round = function(date) {
          var d0 = interval(date), d1 = interval.ceil(date);
          return date - d0 < d1 - date ? d0 : d1;
        };
        interval.offset = function(date, step) {
          return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
        };
        interval.range = function(start, stop, step) {
          var range = [], previous;
          start = interval.ceil(start);
          step = step == null ? 1 : Math.floor(step);
          if (!(start < stop) || !(step > 0))
            return range;
          do
            range.push(previous = new Date(+start)), offseti(start, step), floori(start);
          while (previous < start && start < stop);
          return range;
        };
        interval.filter = function(test) {
          return newInterval(function(date) {
            if (date >= date)
              while (floori(date), !test(date))
                date.setTime(date - 1);
          }, function(date, step) {
            if (date >= date) {
              if (step < 0)
                while (++step <= 0) {
                  while (offseti(date, -1), !test(date)) {
                  }
                }
              else
                while (--step >= 0) {
                  while (offseti(date, 1), !test(date)) {
                  }
                }
            }
          });
        };
        if (count) {
          interval.count = function(start, end) {
            t0.setTime(+start), t1.setTime(+end);
            floori(t0), floori(t1);
            return Math.floor(count(t0, t1));
          };
          interval.every = function(step) {
            step = Math.floor(step);
            return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function(d) {
              return field(d) % step === 0;
            } : function(d) {
              return interval.count(0, d) % step === 0;
            });
          };
        }
        return interval;
      }
      var millisecond = newInterval(function() {
      }, function(date, step) {
        date.setTime(+date + step);
      }, function(start, end) {
        return end - start;
      });
      millisecond.every = function(k) {
        k = Math.floor(k);
        if (!isFinite(k) || !(k > 0))
          return null;
        if (!(k > 1))
          return millisecond;
        return newInterval(function(date) {
          date.setTime(Math.floor(date / k) * k);
        }, function(date, step) {
          date.setTime(+date + step * k);
        }, function(start, end) {
          return (end - start) / k;
        });
      };
      var milliseconds = millisecond.range;
      const durationSecond = 1e3;
      const durationMinute = durationSecond * 60;
      const durationHour = durationMinute * 60;
      const durationDay = durationHour * 24;
      const durationWeek = durationDay * 7;
      const durationMonth = durationDay * 30;
      const durationYear = durationDay * 365;
      var second = newInterval(function(date) {
        date.setTime(date - date.getMilliseconds());
      }, function(date, step) {
        date.setTime(+date + step * durationSecond);
      }, function(start, end) {
        return (end - start) / durationSecond;
      }, function(date) {
        return date.getUTCSeconds();
      });
      var seconds = second.range;
      var minute = newInterval(function(date) {
        date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
      }, function(date, step) {
        date.setTime(+date + step * durationMinute);
      }, function(start, end) {
        return (end - start) / durationMinute;
      }, function(date) {
        return date.getMinutes();
      });
      var minutes = minute.range;
      var hour = newInterval(function(date) {
        date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
      }, function(date, step) {
        date.setTime(+date + step * durationHour);
      }, function(start, end) {
        return (end - start) / durationHour;
      }, function(date) {
        return date.getHours();
      });
      var hours = hour.range;
      var day = newInterval((date) => date.setHours(0, 0, 0, 0), (date, step) => date.setDate(date.getDate() + step), (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay, (date) => date.getDate() - 1);
      var days = day.range;
      function weekday(i) {
        return newInterval(function(date) {
          date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
          date.setHours(0, 0, 0, 0);
        }, function(date, step) {
          date.setDate(date.getDate() + step * 7);
        }, function(start, end) {
          return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
        });
      }
      var sunday = weekday(0);
      var monday = weekday(1);
      var tuesday = weekday(2);
      var wednesday = weekday(3);
      var thursday = weekday(4);
      var friday = weekday(5);
      var saturday = weekday(6);
      var sundays = sunday.range;
      var mondays = monday.range;
      var tuesdays = tuesday.range;
      var wednesdays = wednesday.range;
      var thursdays = thursday.range;
      var fridays = friday.range;
      var saturdays = saturday.range;
      var month = newInterval(function(date) {
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setMonth(date.getMonth() + step);
      }, function(start, end) {
        return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
      }, function(date) {
        return date.getMonth();
      });
      var months = month.range;
      var year = newInterval(function(date) {
        date.setMonth(0, 1);
        date.setHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setFullYear(date.getFullYear() + step);
      }, function(start, end) {
        return end.getFullYear() - start.getFullYear();
      }, function(date) {
        return date.getFullYear();
      });
      year.every = function(k) {
        return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
          date.setFullYear(Math.floor(date.getFullYear() / k) * k);
          date.setMonth(0, 1);
          date.setHours(0, 0, 0, 0);
        }, function(date, step) {
          date.setFullYear(date.getFullYear() + step * k);
        });
      };
      var years = year.range;
      var utcMinute = newInterval(function(date) {
        date.setUTCSeconds(0, 0);
      }, function(date, step) {
        date.setTime(+date + step * durationMinute);
      }, function(start, end) {
        return (end - start) / durationMinute;
      }, function(date) {
        return date.getUTCMinutes();
      });
      var utcMinutes = utcMinute.range;
      var utcHour = newInterval(function(date) {
        date.setUTCMinutes(0, 0, 0);
      }, function(date, step) {
        date.setTime(+date + step * durationHour);
      }, function(start, end) {
        return (end - start) / durationHour;
      }, function(date) {
        return date.getUTCHours();
      });
      var utcHours = utcHour.range;
      var utcDay = newInterval(function(date) {
        date.setUTCHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setUTCDate(date.getUTCDate() + step);
      }, function(start, end) {
        return (end - start) / durationDay;
      }, function(date) {
        return date.getUTCDate() - 1;
      });
      var utcDays = utcDay.range;
      function utcWeekday(i) {
        return newInterval(function(date) {
          date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
          date.setUTCHours(0, 0, 0, 0);
        }, function(date, step) {
          date.setUTCDate(date.getUTCDate() + step * 7);
        }, function(start, end) {
          return (end - start) / durationWeek;
        });
      }
      var utcSunday = utcWeekday(0);
      var utcMonday = utcWeekday(1);
      var utcTuesday = utcWeekday(2);
      var utcWednesday = utcWeekday(3);
      var utcThursday = utcWeekday(4);
      var utcFriday = utcWeekday(5);
      var utcSaturday = utcWeekday(6);
      var utcSundays = utcSunday.range;
      var utcMondays = utcMonday.range;
      var utcTuesdays = utcTuesday.range;
      var utcWednesdays = utcWednesday.range;
      var utcThursdays = utcThursday.range;
      var utcFridays = utcFriday.range;
      var utcSaturdays = utcSaturday.range;
      var utcMonth = newInterval(function(date) {
        date.setUTCDate(1);
        date.setUTCHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setUTCMonth(date.getUTCMonth() + step);
      }, function(start, end) {
        return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
      }, function(date) {
        return date.getUTCMonth();
      });
      var utcMonths = utcMonth.range;
      var utcYear = newInterval(function(date) {
        date.setUTCMonth(0, 1);
        date.setUTCHours(0, 0, 0, 0);
      }, function(date, step) {
        date.setUTCFullYear(date.getUTCFullYear() + step);
      }, function(start, end) {
        return end.getUTCFullYear() - start.getUTCFullYear();
      }, function(date) {
        return date.getUTCFullYear();
      });
      utcYear.every = function(k) {
        return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
          date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
          date.setUTCMonth(0, 1);
          date.setUTCHours(0, 0, 0, 0);
        }, function(date, step) {
          date.setUTCFullYear(date.getUTCFullYear() + step * k);
        });
      };
      var utcYears = utcYear.range;
      function ticker(year2, month2, week, day2, hour2, minute2) {
        const tickIntervals = [
          [second, 1, durationSecond],
          [second, 5, 5 * durationSecond],
          [second, 15, 15 * durationSecond],
          [second, 30, 30 * durationSecond],
          [minute2, 1, durationMinute],
          [minute2, 5, 5 * durationMinute],
          [minute2, 15, 15 * durationMinute],
          [minute2, 30, 30 * durationMinute],
          [hour2, 1, durationHour],
          [hour2, 3, 3 * durationHour],
          [hour2, 6, 6 * durationHour],
          [hour2, 12, 12 * durationHour],
          [day2, 1, durationDay],
          [day2, 2, 2 * durationDay],
          [week, 1, durationWeek],
          [month2, 1, durationMonth],
          [month2, 3, 3 * durationMonth],
          [year2, 1, durationYear]
        ];
        function ticks(start, stop, count) {
          const reverse = stop < start;
          if (reverse)
            [start, stop] = [stop, start];
          const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
          const ticks2 = interval ? interval.range(start, +stop + 1) : [];
          return reverse ? ticks2.reverse() : ticks2;
        }
        function tickInterval(start, stop, count) {
          const target = Math.abs(stop - start) / count;
          const i = d3Array.bisector(([, , step2]) => step2).right(tickIntervals, target);
          if (i === tickIntervals.length)
            return year2.every(d3Array.tickStep(start / durationYear, stop / durationYear, count));
          if (i === 0)
            return millisecond.every(Math.max(d3Array.tickStep(start, stop, count), 1));
          const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
          return t.every(step);
        }
        return [ticks, tickInterval];
      }
      const [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute);
      const [timeTicks, timeTickInterval] = ticker(year, month, sunday, day, hour, minute);
      exports2.timeDay = day;
      exports2.timeDays = days;
      exports2.timeFriday = friday;
      exports2.timeFridays = fridays;
      exports2.timeHour = hour;
      exports2.timeHours = hours;
      exports2.timeInterval = newInterval;
      exports2.timeMillisecond = millisecond;
      exports2.timeMilliseconds = milliseconds;
      exports2.timeMinute = minute;
      exports2.timeMinutes = minutes;
      exports2.timeMonday = monday;
      exports2.timeMondays = mondays;
      exports2.timeMonth = month;
      exports2.timeMonths = months;
      exports2.timeSaturday = saturday;
      exports2.timeSaturdays = saturdays;
      exports2.timeSecond = second;
      exports2.timeSeconds = seconds;
      exports2.timeSunday = sunday;
      exports2.timeSundays = sundays;
      exports2.timeThursday = thursday;
      exports2.timeThursdays = thursdays;
      exports2.timeTickInterval = timeTickInterval;
      exports2.timeTicks = timeTicks;
      exports2.timeTuesday = tuesday;
      exports2.timeTuesdays = tuesdays;
      exports2.timeWednesday = wednesday;
      exports2.timeWednesdays = wednesdays;
      exports2.timeWeek = sunday;
      exports2.timeWeeks = sundays;
      exports2.timeYear = year;
      exports2.timeYears = years;
      exports2.utcDay = utcDay;
      exports2.utcDays = utcDays;
      exports2.utcFriday = utcFriday;
      exports2.utcFridays = utcFridays;
      exports2.utcHour = utcHour;
      exports2.utcHours = utcHours;
      exports2.utcMillisecond = millisecond;
      exports2.utcMilliseconds = milliseconds;
      exports2.utcMinute = utcMinute;
      exports2.utcMinutes = utcMinutes;
      exports2.utcMonday = utcMonday;
      exports2.utcMondays = utcMondays;
      exports2.utcMonth = utcMonth;
      exports2.utcMonths = utcMonths;
      exports2.utcSaturday = utcSaturday;
      exports2.utcSaturdays = utcSaturdays;
      exports2.utcSecond = second;
      exports2.utcSeconds = seconds;
      exports2.utcSunday = utcSunday;
      exports2.utcSundays = utcSundays;
      exports2.utcThursday = utcThursday;
      exports2.utcThursdays = utcThursdays;
      exports2.utcTickInterval = utcTickInterval;
      exports2.utcTicks = utcTicks;
      exports2.utcTuesday = utcTuesday;
      exports2.utcTuesdays = utcTuesdays;
      exports2.utcWednesday = utcWednesday;
      exports2.utcWednesdays = utcWednesdays;
      exports2.utcWeek = utcSunday;
      exports2.utcWeeks = utcSundays;
      exports2.utcYear = utcYear;
      exports2.utcYears = utcYears;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-time-format@3.0.0/node_modules/d3-time-format/dist/d3-time-format.js
var require_d3_time_format = __commonJS({
  "node_modules/.pnpm/d3-time-format@3.0.0/node_modules/d3-time-format/dist/d3-time-format.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_time()) : typeof define === "function" && define.amd ? define(["exports", "d3-time"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3));
    })(exports, function(exports2, d3Time) {
      "use strict";
      function localDate(d) {
        if (0 <= d.y && d.y < 100) {
          var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
          date.setFullYear(d.y);
          return date;
        }
        return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
      }
      function utcDate(d) {
        if (0 <= d.y && d.y < 100) {
          var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
          date.setUTCFullYear(d.y);
          return date;
        }
        return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
      }
      function newDate(y, m, d) {
        return { y, m, d, H: 0, M: 0, S: 0, L: 0 };
      }
      function formatLocale(locale2) {
        var locale_dateTime = locale2.dateTime, locale_date = locale2.date, locale_time = locale2.time, locale_periods = locale2.periods, locale_weekdays = locale2.days, locale_shortWeekdays = locale2.shortDays, locale_months = locale2.months, locale_shortMonths = locale2.shortMonths;
        var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
        var formats = {
          "a": formatShortWeekday,
          "A": formatWeekday,
          "b": formatShortMonth,
          "B": formatMonth,
          "c": null,
          "d": formatDayOfMonth,
          "e": formatDayOfMonth,
          "f": formatMicroseconds,
          "g": formatYearISO,
          "G": formatFullYearISO,
          "H": formatHour24,
          "I": formatHour12,
          "j": formatDayOfYear,
          "L": formatMilliseconds,
          "m": formatMonthNumber,
          "M": formatMinutes,
          "p": formatPeriod,
          "q": formatQuarter,
          "Q": formatUnixTimestamp,
          "s": formatUnixTimestampSeconds,
          "S": formatSeconds,
          "u": formatWeekdayNumberMonday,
          "U": formatWeekNumberSunday,
          "V": formatWeekNumberISO,
          "w": formatWeekdayNumberSunday,
          "W": formatWeekNumberMonday,
          "x": null,
          "X": null,
          "y": formatYear,
          "Y": formatFullYear,
          "Z": formatZone,
          "%": formatLiteralPercent
        };
        var utcFormats = {
          "a": formatUTCShortWeekday,
          "A": formatUTCWeekday,
          "b": formatUTCShortMonth,
          "B": formatUTCMonth,
          "c": null,
          "d": formatUTCDayOfMonth,
          "e": formatUTCDayOfMonth,
          "f": formatUTCMicroseconds,
          "g": formatUTCYearISO,
          "G": formatUTCFullYearISO,
          "H": formatUTCHour24,
          "I": formatUTCHour12,
          "j": formatUTCDayOfYear,
          "L": formatUTCMilliseconds,
          "m": formatUTCMonthNumber,
          "M": formatUTCMinutes,
          "p": formatUTCPeriod,
          "q": formatUTCQuarter,
          "Q": formatUnixTimestamp,
          "s": formatUnixTimestampSeconds,
          "S": formatUTCSeconds,
          "u": formatUTCWeekdayNumberMonday,
          "U": formatUTCWeekNumberSunday,
          "V": formatUTCWeekNumberISO,
          "w": formatUTCWeekdayNumberSunday,
          "W": formatUTCWeekNumberMonday,
          "x": null,
          "X": null,
          "y": formatUTCYear,
          "Y": formatUTCFullYear,
          "Z": formatUTCZone,
          "%": formatLiteralPercent
        };
        var parses = {
          "a": parseShortWeekday,
          "A": parseWeekday,
          "b": parseShortMonth,
          "B": parseMonth,
          "c": parseLocaleDateTime,
          "d": parseDayOfMonth,
          "e": parseDayOfMonth,
          "f": parseMicroseconds,
          "g": parseYear,
          "G": parseFullYear,
          "H": parseHour24,
          "I": parseHour24,
          "j": parseDayOfYear,
          "L": parseMilliseconds,
          "m": parseMonthNumber,
          "M": parseMinutes,
          "p": parsePeriod,
          "q": parseQuarter,
          "Q": parseUnixTimestamp,
          "s": parseUnixTimestampSeconds,
          "S": parseSeconds,
          "u": parseWeekdayNumberMonday,
          "U": parseWeekNumberSunday,
          "V": parseWeekNumberISO,
          "w": parseWeekdayNumberSunday,
          "W": parseWeekNumberMonday,
          "x": parseLocaleDate,
          "X": parseLocaleTime,
          "y": parseYear,
          "Y": parseFullYear,
          "Z": parseZone,
          "%": parseLiteralPercent
        };
        formats.x = newFormat(locale_date, formats);
        formats.X = newFormat(locale_time, formats);
        formats.c = newFormat(locale_dateTime, formats);
        utcFormats.x = newFormat(locale_date, utcFormats);
        utcFormats.X = newFormat(locale_time, utcFormats);
        utcFormats.c = newFormat(locale_dateTime, utcFormats);
        function newFormat(specifier, formats2) {
          return function(date) {
            var string = [], i = -1, j = 0, n = specifier.length, c, pad2, format;
            if (!(date instanceof Date))
              date = new Date(+date);
            while (++i < n) {
              if (specifier.charCodeAt(i) === 37) {
                string.push(specifier.slice(j, i));
                if ((pad2 = pads[c = specifier.charAt(++i)]) != null)
                  c = specifier.charAt(++i);
                else
                  pad2 = c === "e" ? " " : "0";
                if (format = formats2[c])
                  c = format(date, pad2);
                string.push(c);
                j = i + 1;
              }
            }
            string.push(specifier.slice(j, i));
            return string.join("");
          };
        }
        function newParse(specifier, Z) {
          return function(string) {
            var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day;
            if (i != string.length)
              return null;
            if ("Q" in d)
              return new Date(d.Q);
            if ("s" in d)
              return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
            if (Z && !("Z" in d))
              d.Z = 0;
            if ("p" in d)
              d.H = d.H % 12 + d.p * 12;
            if (d.m === void 0)
              d.m = "q" in d ? d.q : 0;
            if ("V" in d) {
              if (d.V < 1 || d.V > 53)
                return null;
              if (!("w" in d))
                d.w = 1;
              if ("Z" in d) {
                week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
                week = day > 4 || day === 0 ? d3Time.utcMonday.ceil(week) : d3Time.utcMonday(week);
                week = d3Time.utcDay.offset(week, (d.V - 1) * 7);
                d.y = week.getUTCFullYear();
                d.m = week.getUTCMonth();
                d.d = week.getUTCDate() + (d.w + 6) % 7;
              } else {
                week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
                week = day > 4 || day === 0 ? d3Time.timeMonday.ceil(week) : d3Time.timeMonday(week);
                week = d3Time.timeDay.offset(week, (d.V - 1) * 7);
                d.y = week.getFullYear();
                d.m = week.getMonth();
                d.d = week.getDate() + (d.w + 6) % 7;
              }
            } else if ("W" in d || "U" in d) {
              if (!("w" in d))
                d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
              day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
              d.m = 0;
              d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
            }
            if ("Z" in d) {
              d.H += d.Z / 100 | 0;
              d.M += d.Z % 100;
              return utcDate(d);
            }
            return localDate(d);
          };
        }
        function parseSpecifier(d, specifier, string, j) {
          var i = 0, n = specifier.length, m = string.length, c, parse2;
          while (i < n) {
            if (j >= m)
              return -1;
            c = specifier.charCodeAt(i++);
            if (c === 37) {
              c = specifier.charAt(i++);
              parse2 = parses[c in pads ? specifier.charAt(i++) : c];
              if (!parse2 || (j = parse2(d, string, j)) < 0)
                return -1;
            } else if (c != string.charCodeAt(j++)) {
              return -1;
            }
          }
          return j;
        }
        function parsePeriod(d, string, i) {
          var n = periodRe.exec(string.slice(i));
          return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
        }
        function parseShortWeekday(d, string, i) {
          var n = shortWeekdayRe.exec(string.slice(i));
          return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
        }
        function parseWeekday(d, string, i) {
          var n = weekdayRe.exec(string.slice(i));
          return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
        }
        function parseShortMonth(d, string, i) {
          var n = shortMonthRe.exec(string.slice(i));
          return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
        }
        function parseMonth(d, string, i) {
          var n = monthRe.exec(string.slice(i));
          return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
        }
        function parseLocaleDateTime(d, string, i) {
          return parseSpecifier(d, locale_dateTime, string, i);
        }
        function parseLocaleDate(d, string, i) {
          return parseSpecifier(d, locale_date, string, i);
        }
        function parseLocaleTime(d, string, i) {
          return parseSpecifier(d, locale_time, string, i);
        }
        function formatShortWeekday(d) {
          return locale_shortWeekdays[d.getDay()];
        }
        function formatWeekday(d) {
          return locale_weekdays[d.getDay()];
        }
        function formatShortMonth(d) {
          return locale_shortMonths[d.getMonth()];
        }
        function formatMonth(d) {
          return locale_months[d.getMonth()];
        }
        function formatPeriod(d) {
          return locale_periods[+(d.getHours() >= 12)];
        }
        function formatQuarter(d) {
          return 1 + ~~(d.getMonth() / 3);
        }
        function formatUTCShortWeekday(d) {
          return locale_shortWeekdays[d.getUTCDay()];
        }
        function formatUTCWeekday(d) {
          return locale_weekdays[d.getUTCDay()];
        }
        function formatUTCShortMonth(d) {
          return locale_shortMonths[d.getUTCMonth()];
        }
        function formatUTCMonth(d) {
          return locale_months[d.getUTCMonth()];
        }
        function formatUTCPeriod(d) {
          return locale_periods[+(d.getUTCHours() >= 12)];
        }
        function formatUTCQuarter(d) {
          return 1 + ~~(d.getUTCMonth() / 3);
        }
        return {
          format: function(specifier) {
            var f = newFormat(specifier += "", formats);
            f.toString = function() {
              return specifier;
            };
            return f;
          },
          parse: function(specifier) {
            var p = newParse(specifier += "", false);
            p.toString = function() {
              return specifier;
            };
            return p;
          },
          utcFormat: function(specifier) {
            var f = newFormat(specifier += "", utcFormats);
            f.toString = function() {
              return specifier;
            };
            return f;
          },
          utcParse: function(specifier) {
            var p = newParse(specifier += "", true);
            p.toString = function() {
              return specifier;
            };
            return p;
          }
        };
      }
      var pads = { "-": "", "_": " ", "0": "0" }, numberRe = /^\s*\d+/, percentRe = /^%/, requoteRe = /[\\^$*+?|[\]().{}]/g;
      function pad(value, fill, width) {
        var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
        return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
      }
      function requote(s) {
        return s.replace(requoteRe, "\\$&");
      }
      function formatRe(names) {
        return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
      }
      function formatLookup(names) {
        return new Map(names.map((name, i) => [name.toLowerCase(), i]));
      }
      function parseWeekdayNumberSunday(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 1));
        return n ? (d.w = +n[0], i + n[0].length) : -1;
      }
      function parseWeekdayNumberMonday(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 1));
        return n ? (d.u = +n[0], i + n[0].length) : -1;
      }
      function parseWeekNumberSunday(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.U = +n[0], i + n[0].length) : -1;
      }
      function parseWeekNumberISO(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.V = +n[0], i + n[0].length) : -1;
      }
      function parseWeekNumberMonday(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.W = +n[0], i + n[0].length) : -1;
      }
      function parseFullYear(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 4));
        return n ? (d.y = +n[0], i + n[0].length) : -1;
      }
      function parseYear(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
      }
      function parseZone(d, string, i) {
        var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
        return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
      }
      function parseQuarter(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 1));
        return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
      }
      function parseMonthNumber(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
      }
      function parseDayOfMonth(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.d = +n[0], i + n[0].length) : -1;
      }
      function parseDayOfYear(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 3));
        return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
      }
      function parseHour24(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.H = +n[0], i + n[0].length) : -1;
      }
      function parseMinutes(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.M = +n[0], i + n[0].length) : -1;
      }
      function parseSeconds(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.S = +n[0], i + n[0].length) : -1;
      }
      function parseMilliseconds(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 3));
        return n ? (d.L = +n[0], i + n[0].length) : -1;
      }
      function parseMicroseconds(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 6));
        return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
      }
      function parseLiteralPercent(d, string, i) {
        var n = percentRe.exec(string.slice(i, i + 1));
        return n ? i + n[0].length : -1;
      }
      function parseUnixTimestamp(d, string, i) {
        var n = numberRe.exec(string.slice(i));
        return n ? (d.Q = +n[0], i + n[0].length) : -1;
      }
      function parseUnixTimestampSeconds(d, string, i) {
        var n = numberRe.exec(string.slice(i));
        return n ? (d.s = +n[0], i + n[0].length) : -1;
      }
      function formatDayOfMonth(d, p) {
        return pad(d.getDate(), p, 2);
      }
      function formatHour24(d, p) {
        return pad(d.getHours(), p, 2);
      }
      function formatHour12(d, p) {
        return pad(d.getHours() % 12 || 12, p, 2);
      }
      function formatDayOfYear(d, p) {
        return pad(1 + d3Time.timeDay.count(d3Time.timeYear(d), d), p, 3);
      }
      function formatMilliseconds(d, p) {
        return pad(d.getMilliseconds(), p, 3);
      }
      function formatMicroseconds(d, p) {
        return formatMilliseconds(d, p) + "000";
      }
      function formatMonthNumber(d, p) {
        return pad(d.getMonth() + 1, p, 2);
      }
      function formatMinutes(d, p) {
        return pad(d.getMinutes(), p, 2);
      }
      function formatSeconds(d, p) {
        return pad(d.getSeconds(), p, 2);
      }
      function formatWeekdayNumberMonday(d) {
        var day = d.getDay();
        return day === 0 ? 7 : day;
      }
      function formatWeekNumberSunday(d, p) {
        return pad(d3Time.timeSunday.count(d3Time.timeYear(d) - 1, d), p, 2);
      }
      function dISO(d) {
        var day = d.getDay();
        return day >= 4 || day === 0 ? d3Time.timeThursday(d) : d3Time.timeThursday.ceil(d);
      }
      function formatWeekNumberISO(d, p) {
        d = dISO(d);
        return pad(d3Time.timeThursday.count(d3Time.timeYear(d), d) + (d3Time.timeYear(d).getDay() === 4), p, 2);
      }
      function formatWeekdayNumberSunday(d) {
        return d.getDay();
      }
      function formatWeekNumberMonday(d, p) {
        return pad(d3Time.timeMonday.count(d3Time.timeYear(d) - 1, d), p, 2);
      }
      function formatYear(d, p) {
        return pad(d.getFullYear() % 100, p, 2);
      }
      function formatYearISO(d, p) {
        d = dISO(d);
        return pad(d.getFullYear() % 100, p, 2);
      }
      function formatFullYear(d, p) {
        return pad(d.getFullYear() % 1e4, p, 4);
      }
      function formatFullYearISO(d, p) {
        var day = d.getDay();
        d = day >= 4 || day === 0 ? d3Time.timeThursday(d) : d3Time.timeThursday.ceil(d);
        return pad(d.getFullYear() % 1e4, p, 4);
      }
      function formatZone(d) {
        var z = d.getTimezoneOffset();
        return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
      }
      function formatUTCDayOfMonth(d, p) {
        return pad(d.getUTCDate(), p, 2);
      }
      function formatUTCHour24(d, p) {
        return pad(d.getUTCHours(), p, 2);
      }
      function formatUTCHour12(d, p) {
        return pad(d.getUTCHours() % 12 || 12, p, 2);
      }
      function formatUTCDayOfYear(d, p) {
        return pad(1 + d3Time.utcDay.count(d3Time.utcYear(d), d), p, 3);
      }
      function formatUTCMilliseconds(d, p) {
        return pad(d.getUTCMilliseconds(), p, 3);
      }
      function formatUTCMicroseconds(d, p) {
        return formatUTCMilliseconds(d, p) + "000";
      }
      function formatUTCMonthNumber(d, p) {
        return pad(d.getUTCMonth() + 1, p, 2);
      }
      function formatUTCMinutes(d, p) {
        return pad(d.getUTCMinutes(), p, 2);
      }
      function formatUTCSeconds(d, p) {
        return pad(d.getUTCSeconds(), p, 2);
      }
      function formatUTCWeekdayNumberMonday(d) {
        var dow = d.getUTCDay();
        return dow === 0 ? 7 : dow;
      }
      function formatUTCWeekNumberSunday(d, p) {
        return pad(d3Time.utcSunday.count(d3Time.utcYear(d) - 1, d), p, 2);
      }
      function UTCdISO(d) {
        var day = d.getUTCDay();
        return day >= 4 || day === 0 ? d3Time.utcThursday(d) : d3Time.utcThursday.ceil(d);
      }
      function formatUTCWeekNumberISO(d, p) {
        d = UTCdISO(d);
        return pad(d3Time.utcThursday.count(d3Time.utcYear(d), d) + (d3Time.utcYear(d).getUTCDay() === 4), p, 2);
      }
      function formatUTCWeekdayNumberSunday(d) {
        return d.getUTCDay();
      }
      function formatUTCWeekNumberMonday(d, p) {
        return pad(d3Time.utcMonday.count(d3Time.utcYear(d) - 1, d), p, 2);
      }
      function formatUTCYear(d, p) {
        return pad(d.getUTCFullYear() % 100, p, 2);
      }
      function formatUTCYearISO(d, p) {
        d = UTCdISO(d);
        return pad(d.getUTCFullYear() % 100, p, 2);
      }
      function formatUTCFullYear(d, p) {
        return pad(d.getUTCFullYear() % 1e4, p, 4);
      }
      function formatUTCFullYearISO(d, p) {
        var day = d.getUTCDay();
        d = day >= 4 || day === 0 ? d3Time.utcThursday(d) : d3Time.utcThursday.ceil(d);
        return pad(d.getUTCFullYear() % 1e4, p, 4);
      }
      function formatUTCZone() {
        return "+0000";
      }
      function formatLiteralPercent() {
        return "%";
      }
      function formatUnixTimestamp(d) {
        return +d;
      }
      function formatUnixTimestampSeconds(d) {
        return Math.floor(+d / 1e3);
      }
      var locale;
      defaultLocale({
        dateTime: "%x, %X",
        date: "%-m/%-d/%Y",
        time: "%-I:%M:%S %p",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      });
      function defaultLocale(definition) {
        locale = formatLocale(definition);
        exports2.timeFormat = locale.format;
        exports2.timeParse = locale.parse;
        exports2.utcFormat = locale.utcFormat;
        exports2.utcParse = locale.utcParse;
        return locale;
      }
      var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
      function formatIsoNative(date) {
        return date.toISOString();
      }
      var formatIso = Date.prototype.toISOString ? formatIsoNative : exports2.utcFormat(isoSpecifier);
      function parseIsoNative(string) {
        var date = new Date(string);
        return isNaN(date) ? null : date;
      }
      var parseIso = +new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : exports2.utcParse(isoSpecifier);
      exports2.isoFormat = formatIso;
      exports2.isoParse = parseIso;
      exports2.timeFormatDefaultLocale = defaultLocale;
      exports2.timeFormatLocale = formatLocale;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-scale@3.3.0/node_modules/d3-scale/dist/d3-scale.js
var require_d3_scale = __commonJS({
  "node_modules/.pnpm/d3-scale@3.3.0/node_modules/d3-scale/dist/d3-scale.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_array(), require_d3_interpolate(), require_d3_format(), require_d3_time(), require_d3_time_format()) : typeof define === "function" && define.amd ? define(["exports", "d3-array", "d3-interpolate", "d3-format", "d3-time", "d3-time-format"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3, global2.d3, global2.d3, global2.d3, global2.d3));
    })(exports, function(exports2, d3Array, d3Interpolate, d3Format, d3Time, d3TimeFormat) {
      "use strict";
      function initRange(domain, range) {
        switch (arguments.length) {
          case 0:
            break;
          case 1:
            this.range(domain);
            break;
          default:
            this.range(range).domain(domain);
            break;
        }
        return this;
      }
      function initInterpolator(domain, interpolator) {
        switch (arguments.length) {
          case 0:
            break;
          case 1: {
            if (typeof domain === "function")
              this.interpolator(domain);
            else
              this.range(domain);
            break;
          }
          default: {
            this.domain(domain);
            if (typeof interpolator === "function")
              this.interpolator(interpolator);
            else
              this.range(interpolator);
            break;
          }
        }
        return this;
      }
      const implicit = Symbol("implicit");
      function ordinal() {
        var index = /* @__PURE__ */ new Map(), domain = [], range = [], unknown = implicit;
        function scale(d) {
          var key = d + "", i = index.get(key);
          if (!i) {
            if (unknown !== implicit)
              return unknown;
            index.set(key, i = domain.push(d));
          }
          return range[(i - 1) % range.length];
        }
        scale.domain = function(_) {
          if (!arguments.length)
            return domain.slice();
          domain = [], index = /* @__PURE__ */ new Map();
          for (const value of _) {
            const key = value + "";
            if (index.has(key))
              continue;
            index.set(key, domain.push(value));
          }
          return scale;
        };
        scale.range = function(_) {
          return arguments.length ? (range = Array.from(_), scale) : range.slice();
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        scale.copy = function() {
          return ordinal(domain, range).unknown(unknown);
        };
        initRange.apply(scale, arguments);
        return scale;
      }
      function band() {
        var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, r0 = 0, r1 = 1, step, bandwidth, round = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
        delete scale.unknown;
        function rescale() {
          var n = domain().length, reverse = r1 < r0, start = reverse ? r1 : r0, stop = reverse ? r0 : r1;
          step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
          if (round)
            step = Math.floor(step);
          start += (stop - start - step * (n - paddingInner)) * align;
          bandwidth = step * (1 - paddingInner);
          if (round)
            start = Math.round(start), bandwidth = Math.round(bandwidth);
          var values = d3Array.range(n).map(function(i) {
            return start + step * i;
          });
          return ordinalRange(reverse ? values.reverse() : values);
        }
        scale.domain = function(_) {
          return arguments.length ? (domain(_), rescale()) : domain();
        };
        scale.range = function(_) {
          return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
        };
        scale.rangeRound = function(_) {
          return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
        };
        scale.bandwidth = function() {
          return bandwidth;
        };
        scale.step = function() {
          return step;
        };
        scale.round = function(_) {
          return arguments.length ? (round = !!_, rescale()) : round;
        };
        scale.padding = function(_) {
          return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
        };
        scale.paddingInner = function(_) {
          return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
        };
        scale.paddingOuter = function(_) {
          return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
        };
        scale.align = function(_) {
          return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
        };
        scale.copy = function() {
          return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
        };
        return initRange.apply(rescale(), arguments);
      }
      function pointish(scale) {
        var copy2 = scale.copy;
        scale.padding = scale.paddingOuter;
        delete scale.paddingInner;
        delete scale.paddingOuter;
        scale.copy = function() {
          return pointish(copy2());
        };
        return scale;
      }
      function point() {
        return pointish(band.apply(null, arguments).paddingInner(1));
      }
      function constants(x) {
        return function() {
          return x;
        };
      }
      function number$1(x) {
        return +x;
      }
      var unit = [0, 1];
      function identity$1(x) {
        return x;
      }
      function normalize(a, b) {
        return (b -= a = +a) ? function(x) {
          return (x - a) / b;
        } : constants(isNaN(b) ? NaN : 0.5);
      }
      function clamper(a, b) {
        var t;
        if (a > b)
          t = a, a = b, b = t;
        return function(x) {
          return Math.max(a, Math.min(b, x));
        };
      }
      function bimap(domain, range, interpolate) {
        var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
        if (d1 < d0)
          d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
        else
          d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
        return function(x) {
          return r0(d0(x));
        };
      }
      function polymap(domain, range, interpolate) {
        var j = Math.min(domain.length, range.length) - 1, d = new Array(j), r = new Array(j), i = -1;
        if (domain[j] < domain[0]) {
          domain = domain.slice().reverse();
          range = range.slice().reverse();
        }
        while (++i < j) {
          d[i] = normalize(domain[i], domain[i + 1]);
          r[i] = interpolate(range[i], range[i + 1]);
        }
        return function(x) {
          var i2 = d3Array.bisect(domain, x, 1, j) - 1;
          return r[i2](d[i2](x));
        };
      }
      function copy$1(source, target) {
        return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
      }
      function transformer$2() {
        var domain = unit, range = unit, interpolate = d3Interpolate.interpolate, transform, untransform, unknown, clamp = identity$1, piecewise, output, input;
        function rescale() {
          var n = Math.min(domain.length, range.length);
          if (clamp !== identity$1)
            clamp = clamper(domain[0], domain[n - 1]);
          piecewise = n > 2 ? polymap : bimap;
          output = input = null;
          return scale;
        }
        function scale(x) {
          return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
        }
        scale.invert = function(y) {
          return clamp(untransform((input || (input = piecewise(range, domain.map(transform), d3Interpolate.interpolateNumber)))(y)));
        };
        scale.domain = function(_) {
          return arguments.length ? (domain = Array.from(_, number$1), rescale()) : domain.slice();
        };
        scale.range = function(_) {
          return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
        };
        scale.rangeRound = function(_) {
          return range = Array.from(_), interpolate = d3Interpolate.interpolateRound, rescale();
        };
        scale.clamp = function(_) {
          return arguments.length ? (clamp = _ ? true : identity$1, rescale()) : clamp !== identity$1;
        };
        scale.interpolate = function(_) {
          return arguments.length ? (interpolate = _, rescale()) : interpolate;
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        return function(t, u) {
          transform = t, untransform = u;
          return rescale();
        };
      }
      function continuous() {
        return transformer$2()(identity$1, identity$1);
      }
      function tickFormat(start, stop, count, specifier) {
        var step = d3Array.tickStep(start, stop, count), precision;
        specifier = d3Format.formatSpecifier(specifier == null ? ",f" : specifier);
        switch (specifier.type) {
          case "s": {
            var value = Math.max(Math.abs(start), Math.abs(stop));
            if (specifier.precision == null && !isNaN(precision = d3Format.precisionPrefix(step, value)))
              specifier.precision = precision;
            return d3Format.formatPrefix(specifier, value);
          }
          case "":
          case "e":
          case "g":
          case "p":
          case "r": {
            if (specifier.precision == null && !isNaN(precision = d3Format.precisionRound(step, Math.max(Math.abs(start), Math.abs(stop)))))
              specifier.precision = precision - (specifier.type === "e");
            break;
          }
          case "f":
          case "%": {
            if (specifier.precision == null && !isNaN(precision = d3Format.precisionFixed(step)))
              specifier.precision = precision - (specifier.type === "%") * 2;
            break;
          }
        }
        return d3Format.format(specifier);
      }
      function linearish(scale) {
        var domain = scale.domain;
        scale.ticks = function(count) {
          var d = domain();
          return d3Array.ticks(d[0], d[d.length - 1], count == null ? 10 : count);
        };
        scale.tickFormat = function(count, specifier) {
          var d = domain();
          return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
        };
        scale.nice = function(count) {
          if (count == null)
            count = 10;
          var d = domain();
          var i0 = 0;
          var i1 = d.length - 1;
          var start = d[i0];
          var stop = d[i1];
          var prestep;
          var step;
          var maxIter = 10;
          if (stop < start) {
            step = start, start = stop, stop = step;
            step = i0, i0 = i1, i1 = step;
          }
          while (maxIter-- > 0) {
            step = d3Array.tickIncrement(start, stop, count);
            if (step === prestep) {
              d[i0] = start;
              d[i1] = stop;
              return domain(d);
            } else if (step > 0) {
              start = Math.floor(start / step) * step;
              stop = Math.ceil(stop / step) * step;
            } else if (step < 0) {
              start = Math.ceil(start * step) / step;
              stop = Math.floor(stop * step) / step;
            } else {
              break;
            }
            prestep = step;
          }
          return scale;
        };
        return scale;
      }
      function linear() {
        var scale = continuous();
        scale.copy = function() {
          return copy$1(scale, linear());
        };
        initRange.apply(scale, arguments);
        return linearish(scale);
      }
      function identity(domain) {
        var unknown;
        function scale(x) {
          return x == null || isNaN(x = +x) ? unknown : x;
        }
        scale.invert = scale;
        scale.domain = scale.range = function(_) {
          return arguments.length ? (domain = Array.from(_, number$1), scale) : domain.slice();
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        scale.copy = function() {
          return identity(domain).unknown(unknown);
        };
        domain = arguments.length ? Array.from(domain, number$1) : [0, 1];
        return linearish(scale);
      }
      function nice(domain, interval) {
        domain = domain.slice();
        var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], t;
        if (x1 < x0) {
          t = i0, i0 = i1, i1 = t;
          t = x0, x0 = x1, x1 = t;
        }
        domain[i0] = interval.floor(x0);
        domain[i1] = interval.ceil(x1);
        return domain;
      }
      function transformLog(x) {
        return Math.log(x);
      }
      function transformExp(x) {
        return Math.exp(x);
      }
      function transformLogn(x) {
        return -Math.log(-x);
      }
      function transformExpn(x) {
        return -Math.exp(-x);
      }
      function pow10(x) {
        return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
      }
      function powp(base) {
        return base === 10 ? pow10 : base === Math.E ? Math.exp : function(x) {
          return Math.pow(base, x);
        };
      }
      function logp(base) {
        return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function(x) {
          return Math.log(x) / base;
        });
      }
      function reflect(f) {
        return function(x) {
          return -f(-x);
        };
      }
      function loggish(transform) {
        var scale = transform(transformLog, transformExp), domain = scale.domain, base = 10, logs, pows;
        function rescale() {
          logs = logp(base), pows = powp(base);
          if (domain()[0] < 0) {
            logs = reflect(logs), pows = reflect(pows);
            transform(transformLogn, transformExpn);
          } else {
            transform(transformLog, transformExp);
          }
          return scale;
        }
        scale.base = function(_) {
          return arguments.length ? (base = +_, rescale()) : base;
        };
        scale.domain = function(_) {
          return arguments.length ? (domain(_), rescale()) : domain();
        };
        scale.ticks = function(count) {
          var d = domain(), u = d[0], v = d[d.length - 1], r;
          if (r = v < u)
            i = u, u = v, v = i;
          var i = logs(u), j = logs(v), p, k, t, n = count == null ? 10 : +count, z = [];
          if (!(base % 1) && j - i < n) {
            i = Math.floor(i), j = Math.ceil(j);
            if (u > 0)
              for (; i <= j; ++i) {
                for (k = 1, p = pows(i); k < base; ++k) {
                  t = p * k;
                  if (t < u)
                    continue;
                  if (t > v)
                    break;
                  z.push(t);
                }
              }
            else
              for (; i <= j; ++i) {
                for (k = base - 1, p = pows(i); k >= 1; --k) {
                  t = p * k;
                  if (t < u)
                    continue;
                  if (t > v)
                    break;
                  z.push(t);
                }
              }
            if (z.length * 2 < n)
              z = d3Array.ticks(u, v, n);
          } else {
            z = d3Array.ticks(i, j, Math.min(j - i, n)).map(pows);
          }
          return r ? z.reverse() : z;
        };
        scale.tickFormat = function(count, specifier) {
          if (specifier == null)
            specifier = base === 10 ? ".0e" : ",";
          if (typeof specifier !== "function")
            specifier = d3Format.format(specifier);
          if (count === Infinity)
            return specifier;
          if (count == null)
            count = 10;
          var k = Math.max(1, base * count / scale.ticks().length);
          return function(d) {
            var i = d / pows(Math.round(logs(d)));
            if (i * base < base - 0.5)
              i *= base;
            return i <= k ? specifier(d) : "";
          };
        };
        scale.nice = function() {
          return domain(nice(domain(), {
            floor: function(x) {
              return pows(Math.floor(logs(x)));
            },
            ceil: function(x) {
              return pows(Math.ceil(logs(x)));
            }
          }));
        };
        return scale;
      }
      function log() {
        var scale = loggish(transformer$2()).domain([1, 10]);
        scale.copy = function() {
          return copy$1(scale, log()).base(scale.base());
        };
        initRange.apply(scale, arguments);
        return scale;
      }
      function transformSymlog(c) {
        return function(x) {
          return Math.sign(x) * Math.log1p(Math.abs(x / c));
        };
      }
      function transformSymexp(c) {
        return function(x) {
          return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
        };
      }
      function symlogish(transform) {
        var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));
        scale.constant = function(_) {
          return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
        };
        return linearish(scale);
      }
      function symlog() {
        var scale = symlogish(transformer$2());
        scale.copy = function() {
          return copy$1(scale, symlog()).constant(scale.constant());
        };
        return initRange.apply(scale, arguments);
      }
      function transformPow(exponent) {
        return function(x) {
          return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
        };
      }
      function transformSqrt(x) {
        return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
      }
      function transformSquare(x) {
        return x < 0 ? -x * x : x * x;
      }
      function powish(transform) {
        var scale = transform(identity$1, identity$1), exponent = 1;
        function rescale() {
          return exponent === 1 ? transform(identity$1, identity$1) : exponent === 0.5 ? transform(transformSqrt, transformSquare) : transform(transformPow(exponent), transformPow(1 / exponent));
        }
        scale.exponent = function(_) {
          return arguments.length ? (exponent = +_, rescale()) : exponent;
        };
        return linearish(scale);
      }
      function pow() {
        var scale = powish(transformer$2());
        scale.copy = function() {
          return copy$1(scale, pow()).exponent(scale.exponent());
        };
        initRange.apply(scale, arguments);
        return scale;
      }
      function sqrt() {
        return pow.apply(null, arguments).exponent(0.5);
      }
      function square(x) {
        return Math.sign(x) * x * x;
      }
      function unsquare(x) {
        return Math.sign(x) * Math.sqrt(Math.abs(x));
      }
      function radial() {
        var squared = continuous(), range = [0, 1], round = false, unknown;
        function scale(x) {
          var y = unsquare(squared(x));
          return isNaN(y) ? unknown : round ? Math.round(y) : y;
        }
        scale.invert = function(y) {
          return squared.invert(square(y));
        };
        scale.domain = function(_) {
          return arguments.length ? (squared.domain(_), scale) : squared.domain();
        };
        scale.range = function(_) {
          return arguments.length ? (squared.range((range = Array.from(_, number$1)).map(square)), scale) : range.slice();
        };
        scale.rangeRound = function(_) {
          return scale.range(_).round(true);
        };
        scale.round = function(_) {
          return arguments.length ? (round = !!_, scale) : round;
        };
        scale.clamp = function(_) {
          return arguments.length ? (squared.clamp(_), scale) : squared.clamp();
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        scale.copy = function() {
          return radial(squared.domain(), range).round(round).clamp(squared.clamp()).unknown(unknown);
        };
        initRange.apply(scale, arguments);
        return linearish(scale);
      }
      function quantile2() {
        var domain = [], range = [], thresholds = [], unknown;
        function rescale() {
          var i = 0, n = Math.max(1, range.length);
          thresholds = new Array(n - 1);
          while (++i < n)
            thresholds[i - 1] = d3Array.quantileSorted(domain, i / n);
          return scale;
        }
        function scale(x) {
          return x == null || isNaN(x = +x) ? unknown : range[d3Array.bisect(thresholds, x)];
        }
        scale.invertExtent = function(y) {
          var i = range.indexOf(y);
          return i < 0 ? [NaN, NaN] : [
            i > 0 ? thresholds[i - 1] : domain[0],
            i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
          ];
        };
        scale.domain = function(_) {
          if (!arguments.length)
            return domain.slice();
          domain = [];
          for (let d of _)
            if (d != null && !isNaN(d = +d))
              domain.push(d);
          domain.sort(d3Array.ascending);
          return rescale();
        };
        scale.range = function(_) {
          return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        scale.quantiles = function() {
          return thresholds.slice();
        };
        scale.copy = function() {
          return quantile2().domain(domain).range(range).unknown(unknown);
        };
        return initRange.apply(scale, arguments);
      }
      function quantize() {
        var x0 = 0, x1 = 1, n = 1, domain = [0.5], range = [0, 1], unknown;
        function scale(x) {
          return x != null && x <= x ? range[d3Array.bisect(domain, x, 0, n)] : unknown;
        }
        function rescale() {
          var i = -1;
          domain = new Array(n);
          while (++i < n)
            domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
          return scale;
        }
        scale.domain = function(_) {
          return arguments.length ? ([x0, x1] = _, x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
        };
        scale.range = function(_) {
          return arguments.length ? (n = (range = Array.from(_)).length - 1, rescale()) : range.slice();
        };
        scale.invertExtent = function(y) {
          var i = range.indexOf(y);
          return i < 0 ? [NaN, NaN] : i < 1 ? [x0, domain[0]] : i >= n ? [domain[n - 1], x1] : [domain[i - 1], domain[i]];
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : scale;
        };
        scale.thresholds = function() {
          return domain.slice();
        };
        scale.copy = function() {
          return quantize().domain([x0, x1]).range(range).unknown(unknown);
        };
        return initRange.apply(linearish(scale), arguments);
      }
      function threshold() {
        var domain = [0.5], range = [0, 1], unknown, n = 1;
        function scale(x) {
          return x != null && x <= x ? range[d3Array.bisect(domain, x, 0, n)] : unknown;
        }
        scale.domain = function(_) {
          return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
        };
        scale.range = function(_) {
          return arguments.length ? (range = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
        };
        scale.invertExtent = function(y) {
          var i = range.indexOf(y);
          return [domain[i - 1], domain[i]];
        };
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        scale.copy = function() {
          return threshold().domain(domain).range(range).unknown(unknown);
        };
        return initRange.apply(scale, arguments);
      }
      function date(t) {
        return new Date(t);
      }
      function number(t) {
        return t instanceof Date ? +t : +new Date(+t);
      }
      function calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format) {
        var scale = continuous(), invert = scale.invert, domain = scale.domain;
        var formatMillisecond = format(".%L"), formatSecond = format(":%S"), formatMinute = format("%I:%M"), formatHour = format("%I %p"), formatDay = format("%a %d"), formatWeek = format("%b %d"), formatMonth = format("%B"), formatYear = format("%Y");
        function tickFormat2(date2) {
          return (second(date2) < date2 ? formatMillisecond : minute(date2) < date2 ? formatSecond : hour(date2) < date2 ? formatMinute : day(date2) < date2 ? formatHour : month(date2) < date2 ? week(date2) < date2 ? formatDay : formatWeek : year(date2) < date2 ? formatMonth : formatYear)(date2);
        }
        scale.invert = function(y) {
          return new Date(invert(y));
        };
        scale.domain = function(_) {
          return arguments.length ? domain(Array.from(_, number)) : domain().map(date);
        };
        scale.ticks = function(interval) {
          var d = domain();
          return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
        };
        scale.tickFormat = function(count, specifier) {
          return specifier == null ? tickFormat2 : format(specifier);
        };
        scale.nice = function(interval) {
          var d = domain();
          if (!interval || typeof interval.range !== "function")
            interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
          return interval ? domain(nice(d, interval)) : scale;
        };
        scale.copy = function() {
          return copy$1(scale, calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format));
        };
        return scale;
      }
      function time() {
        return initRange.apply(calendar(d3Time.timeTicks, d3Time.timeTickInterval, d3Time.timeYear, d3Time.timeMonth, d3Time.timeWeek, d3Time.timeDay, d3Time.timeHour, d3Time.timeMinute, d3Time.timeSecond, d3TimeFormat.timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
      }
      function utcTime() {
        return initRange.apply(calendar(d3Time.utcTicks, d3Time.utcTickInterval, d3Time.utcYear, d3Time.utcMonth, d3Time.utcWeek, d3Time.utcDay, d3Time.utcHour, d3Time.utcMinute, d3Time.utcSecond, d3TimeFormat.utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
      }
      function transformer$1() {
        var x0 = 0, x1 = 1, t0, t1, k10, transform, interpolator = identity$1, clamp = false, unknown;
        function scale(x) {
          return x == null || isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
        }
        scale.domain = function(_) {
          return arguments.length ? ([x0, x1] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
        };
        scale.clamp = function(_) {
          return arguments.length ? (clamp = !!_, scale) : clamp;
        };
        scale.interpolator = function(_) {
          return arguments.length ? (interpolator = _, scale) : interpolator;
        };
        function range(interpolate) {
          return function(_) {
            var r0, r1;
            return arguments.length ? ([r0, r1] = _, interpolator = interpolate(r0, r1), scale) : [interpolator(0), interpolator(1)];
          };
        }
        scale.range = range(d3Interpolate.interpolate);
        scale.rangeRound = range(d3Interpolate.interpolateRound);
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        return function(t) {
          transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
          return scale;
        };
      }
      function copy(source, target) {
        return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
      }
      function sequential() {
        var scale = linearish(transformer$1()(identity$1));
        scale.copy = function() {
          return copy(scale, sequential());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function sequentialLog() {
        var scale = loggish(transformer$1()).domain([1, 10]);
        scale.copy = function() {
          return copy(scale, sequentialLog()).base(scale.base());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function sequentialSymlog() {
        var scale = symlogish(transformer$1());
        scale.copy = function() {
          return copy(scale, sequentialSymlog()).constant(scale.constant());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function sequentialPow() {
        var scale = powish(transformer$1());
        scale.copy = function() {
          return copy(scale, sequentialPow()).exponent(scale.exponent());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function sequentialSqrt() {
        return sequentialPow.apply(null, arguments).exponent(0.5);
      }
      function sequentialQuantile() {
        var domain = [], interpolator = identity$1;
        function scale(x) {
          if (x != null && !isNaN(x = +x))
            return interpolator((d3Array.bisect(domain, x, 1) - 1) / (domain.length - 1));
        }
        scale.domain = function(_) {
          if (!arguments.length)
            return domain.slice();
          domain = [];
          for (let d of _)
            if (d != null && !isNaN(d = +d))
              domain.push(d);
          domain.sort(d3Array.ascending);
          return scale;
        };
        scale.interpolator = function(_) {
          return arguments.length ? (interpolator = _, scale) : interpolator;
        };
        scale.range = function() {
          return domain.map((d, i) => interpolator(i / (domain.length - 1)));
        };
        scale.quantiles = function(n) {
          return Array.from({ length: n + 1 }, (_, i) => d3Array.quantile(domain, i / n));
        };
        scale.copy = function() {
          return sequentialQuantile(interpolator).domain(domain);
        };
        return initInterpolator.apply(scale, arguments);
      }
      function transformer() {
        var x0 = 0, x1 = 0.5, x2 = 1, s = 1, t0, t1, t2, k10, k21, interpolator = identity$1, transform, clamp = false, unknown;
        function scale(x) {
          return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (s * x < s * t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
        }
        scale.domain = function(_) {
          return arguments.length ? ([x0, x1, x2] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), t2 = transform(x2 = +x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1, scale) : [x0, x1, x2];
        };
        scale.clamp = function(_) {
          return arguments.length ? (clamp = !!_, scale) : clamp;
        };
        scale.interpolator = function(_) {
          return arguments.length ? (interpolator = _, scale) : interpolator;
        };
        function range(interpolate) {
          return function(_) {
            var r0, r1, r2;
            return arguments.length ? ([r0, r1, r2] = _, interpolator = d3Interpolate.piecewise(interpolate, [r0, r1, r2]), scale) : [interpolator(0), interpolator(0.5), interpolator(1)];
          };
        }
        scale.range = range(d3Interpolate.interpolate);
        scale.rangeRound = range(d3Interpolate.interpolateRound);
        scale.unknown = function(_) {
          return arguments.length ? (unknown = _, scale) : unknown;
        };
        return function(t) {
          transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1;
          return scale;
        };
      }
      function diverging() {
        var scale = linearish(transformer()(identity$1));
        scale.copy = function() {
          return copy(scale, diverging());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function divergingLog() {
        var scale = loggish(transformer()).domain([0.1, 1, 10]);
        scale.copy = function() {
          return copy(scale, divergingLog()).base(scale.base());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function divergingSymlog() {
        var scale = symlogish(transformer());
        scale.copy = function() {
          return copy(scale, divergingSymlog()).constant(scale.constant());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function divergingPow() {
        var scale = powish(transformer());
        scale.copy = function() {
          return copy(scale, divergingPow()).exponent(scale.exponent());
        };
        return initInterpolator.apply(scale, arguments);
      }
      function divergingSqrt() {
        return divergingPow.apply(null, arguments).exponent(0.5);
      }
      exports2.scaleBand = band;
      exports2.scaleDiverging = diverging;
      exports2.scaleDivergingLog = divergingLog;
      exports2.scaleDivergingPow = divergingPow;
      exports2.scaleDivergingSqrt = divergingSqrt;
      exports2.scaleDivergingSymlog = divergingSymlog;
      exports2.scaleIdentity = identity;
      exports2.scaleImplicit = implicit;
      exports2.scaleLinear = linear;
      exports2.scaleLog = log;
      exports2.scaleOrdinal = ordinal;
      exports2.scalePoint = point;
      exports2.scalePow = pow;
      exports2.scaleQuantile = quantile2;
      exports2.scaleQuantize = quantize;
      exports2.scaleRadial = radial;
      exports2.scaleSequential = sequential;
      exports2.scaleSequentialLog = sequentialLog;
      exports2.scaleSequentialPow = sequentialPow;
      exports2.scaleSequentialQuantile = sequentialQuantile;
      exports2.scaleSequentialSqrt = sequentialSqrt;
      exports2.scaleSequentialSymlog = sequentialSymlog;
      exports2.scaleSqrt = sqrt;
      exports2.scaleSymlog = symlog;
      exports2.scaleThreshold = threshold;
      exports2.scaleTime = time;
      exports2.scaleUtc = utcTime;
      exports2.tickFormat = tickFormat;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-scale-chromatic@2.0.0/node_modules/d3-scale-chromatic/dist/d3-scale-chromatic.js
var require_d3_scale_chromatic = __commonJS({
  "node_modules/.pnpm/d3-scale-chromatic@2.0.0/node_modules/d3-scale-chromatic/dist/d3-scale-chromatic.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_interpolate(), require_d3_color()) : typeof define === "function" && define.amd ? define(["exports", "d3-interpolate", "d3-color"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3, global2.d3));
    })(exports, function(exports2, d3Interpolate, d3Color) {
      "use strict";
      function colors(specifier) {
        var n = specifier.length / 6 | 0, colors2 = new Array(n), i = 0;
        while (i < n)
          colors2[i] = "#" + specifier.slice(i * 6, ++i * 6);
        return colors2;
      }
      var category10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
      var Accent = colors("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");
      var Dark2 = colors("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");
      var Paired = colors("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");
      var Pastel1 = colors("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");
      var Pastel2 = colors("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");
      var Set1 = colors("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");
      var Set2 = colors("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");
      var Set3 = colors("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");
      var Tableau10 = colors("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
      var ramp = (scheme2) => d3Interpolate.interpolateRgbBasis(scheme2[scheme2.length - 1]);
      var scheme = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(colors);
      var BrBG = ramp(scheme);
      var scheme$1 = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(colors);
      var PRGn = ramp(scheme$1);
      var scheme$2 = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(colors);
      var PiYG = ramp(scheme$2);
      var scheme$3 = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(colors);
      var PuOr = ramp(scheme$3);
      var scheme$4 = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(colors);
      var RdBu = ramp(scheme$4);
      var scheme$5 = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(colors);
      var RdGy = ramp(scheme$5);
      var scheme$6 = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(colors);
      var RdYlBu = ramp(scheme$6);
      var scheme$7 = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(colors);
      var RdYlGn = ramp(scheme$7);
      var scheme$8 = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(colors);
      var Spectral = ramp(scheme$8);
      var scheme$9 = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(colors);
      var BuGn = ramp(scheme$9);
      var scheme$a = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(colors);
      var BuPu = ramp(scheme$a);
      var scheme$b = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(colors);
      var GnBu = ramp(scheme$b);
      var scheme$c = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(colors);
      var OrRd = ramp(scheme$c);
      var scheme$d = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(colors);
      var PuBuGn = ramp(scheme$d);
      var scheme$e = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(colors);
      var PuBu = ramp(scheme$e);
      var scheme$f = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(colors);
      var PuRd = ramp(scheme$f);
      var scheme$g = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(colors);
      var RdPu = ramp(scheme$g);
      var scheme$h = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(colors);
      var YlGnBu = ramp(scheme$h);
      var scheme$i = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(colors);
      var YlGn = ramp(scheme$i);
      var scheme$j = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(colors);
      var YlOrBr = ramp(scheme$j);
      var scheme$k = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(colors);
      var YlOrRd = ramp(scheme$k);
      var scheme$l = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(colors);
      var Blues = ramp(scheme$l);
      var scheme$m = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(colors);
      var Greens = ramp(scheme$m);
      var scheme$n = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(colors);
      var Greys = ramp(scheme$n);
      var scheme$o = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(colors);
      var Purples = ramp(scheme$o);
      var scheme$p = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(colors);
      var Reds = ramp(scheme$p);
      var scheme$q = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(colors);
      var Oranges = ramp(scheme$q);
      function cividis(t) {
        t = Math.max(0, Math.min(1, t));
        return "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - t * 2710.57))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - t * 67.37))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - t * 2475.67))))))) + ")";
      }
      var cubehelix = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(300, 0.5, 0), d3Color.cubehelix(-240, 0.5, 1));
      var warm = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(-100, 0.75, 0.35), d3Color.cubehelix(80, 1.5, 0.8));
      var cool = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(260, 0.75, 0.35), d3Color.cubehelix(80, 1.5, 0.8));
      var c = d3Color.cubehelix();
      function rainbow(t) {
        if (t < 0 || t > 1)
          t -= Math.floor(t);
        var ts = Math.abs(t - 0.5);
        c.h = 360 * t - 100;
        c.s = 1.5 - 1.5 * ts;
        c.l = 0.8 - 0.9 * ts;
        return c + "";
      }
      var c$1 = d3Color.rgb(), pi_1_3 = Math.PI / 3, pi_2_3 = Math.PI * 2 / 3;
      function sinebow(t) {
        var x;
        t = (0.5 - t) * Math.PI;
        c$1.r = 255 * (x = Math.sin(t)) * x;
        c$1.g = 255 * (x = Math.sin(t + pi_1_3)) * x;
        c$1.b = 255 * (x = Math.sin(t + pi_2_3)) * x;
        return c$1 + "";
      }
      function turbo(t) {
        t = Math.max(0, Math.min(1, t));
        return "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66))))))) + ")";
      }
      function ramp$1(range) {
        var n = range.length;
        return function(t) {
          return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
        };
      }
      var viridis = ramp$1(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
      var magma = ramp$1(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
      var inferno = ramp$1(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
      var plasma = ramp$1(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
      exports2.interpolateBlues = Blues;
      exports2.interpolateBrBG = BrBG;
      exports2.interpolateBuGn = BuGn;
      exports2.interpolateBuPu = BuPu;
      exports2.interpolateCividis = cividis;
      exports2.interpolateCool = cool;
      exports2.interpolateCubehelixDefault = cubehelix;
      exports2.interpolateGnBu = GnBu;
      exports2.interpolateGreens = Greens;
      exports2.interpolateGreys = Greys;
      exports2.interpolateInferno = inferno;
      exports2.interpolateMagma = magma;
      exports2.interpolateOrRd = OrRd;
      exports2.interpolateOranges = Oranges;
      exports2.interpolatePRGn = PRGn;
      exports2.interpolatePiYG = PiYG;
      exports2.interpolatePlasma = plasma;
      exports2.interpolatePuBu = PuBu;
      exports2.interpolatePuBuGn = PuBuGn;
      exports2.interpolatePuOr = PuOr;
      exports2.interpolatePuRd = PuRd;
      exports2.interpolatePurples = Purples;
      exports2.interpolateRainbow = rainbow;
      exports2.interpolateRdBu = RdBu;
      exports2.interpolateRdGy = RdGy;
      exports2.interpolateRdPu = RdPu;
      exports2.interpolateRdYlBu = RdYlBu;
      exports2.interpolateRdYlGn = RdYlGn;
      exports2.interpolateReds = Reds;
      exports2.interpolateSinebow = sinebow;
      exports2.interpolateSpectral = Spectral;
      exports2.interpolateTurbo = turbo;
      exports2.interpolateViridis = viridis;
      exports2.interpolateWarm = warm;
      exports2.interpolateYlGn = YlGn;
      exports2.interpolateYlGnBu = YlGnBu;
      exports2.interpolateYlOrBr = YlOrBr;
      exports2.interpolateYlOrRd = YlOrRd;
      exports2.schemeAccent = Accent;
      exports2.schemeBlues = scheme$l;
      exports2.schemeBrBG = scheme;
      exports2.schemeBuGn = scheme$9;
      exports2.schemeBuPu = scheme$a;
      exports2.schemeCategory10 = category10;
      exports2.schemeDark2 = Dark2;
      exports2.schemeGnBu = scheme$b;
      exports2.schemeGreens = scheme$m;
      exports2.schemeGreys = scheme$n;
      exports2.schemeOrRd = scheme$c;
      exports2.schemeOranges = scheme$q;
      exports2.schemePRGn = scheme$1;
      exports2.schemePaired = Paired;
      exports2.schemePastel1 = Pastel1;
      exports2.schemePastel2 = Pastel2;
      exports2.schemePiYG = scheme$2;
      exports2.schemePuBu = scheme$e;
      exports2.schemePuBuGn = scheme$d;
      exports2.schemePuOr = scheme$3;
      exports2.schemePuRd = scheme$f;
      exports2.schemePurples = scheme$o;
      exports2.schemeRdBu = scheme$4;
      exports2.schemeRdGy = scheme$5;
      exports2.schemeRdPu = scheme$g;
      exports2.schemeRdYlBu = scheme$6;
      exports2.schemeRdYlGn = scheme$7;
      exports2.schemeReds = scheme$p;
      exports2.schemeSet1 = Set1;
      exports2.schemeSet2 = Set2;
      exports2.schemeSet3 = Set3;
      exports2.schemeSpectral = scheme$8;
      exports2.schemeTableau10 = Tableau10;
      exports2.schemeYlGn = scheme$i;
      exports2.schemeYlGnBu = scheme$h;
      exports2.schemeYlOrBr = scheme$j;
      exports2.schemeYlOrRd = scheme$k;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-shape@2.1.0/node_modules/d3-shape/dist/d3-shape.js
var require_d3_shape = __commonJS({
  "node_modules/.pnpm/d3-shape@2.1.0/node_modules/d3-shape/dist/d3-shape.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_path()) : typeof define === "function" && define.amd ? define(["exports", "d3-path"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3));
    })(exports, function(exports2, d3Path) {
      "use strict";
      function constant(x2) {
        return function constant2() {
          return x2;
        };
      }
      var abs = Math.abs;
      var atan2 = Math.atan2;
      var cos = Math.cos;
      var max8 = Math.max;
      var min3 = Math.min;
      var sin = Math.sin;
      var sqrt = Math.sqrt;
      var epsilon = 1e-12;
      var pi = Math.PI;
      var halfPi = pi / 2;
      var tau = 2 * pi;
      function acos(x2) {
        return x2 > 1 ? 0 : x2 < -1 ? pi : Math.acos(x2);
      }
      function asin(x2) {
        return x2 >= 1 ? halfPi : x2 <= -1 ? -halfPi : Math.asin(x2);
      }
      function arcInnerRadius(d) {
        return d.innerRadius;
      }
      function arcOuterRadius(d) {
        return d.outerRadius;
      }
      function arcStartAngle(d) {
        return d.startAngle;
      }
      function arcEndAngle(d) {
        return d.endAngle;
      }
      function arcPadAngle(d) {
        return d && d.padAngle;
      }
      function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
        var x10 = x1 - x0, y10 = y1 - y0, x32 = x3 - x2, y32 = y3 - y2, t = y32 * x10 - x32 * y10;
        if (t * t < epsilon)
          return;
        t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
        return [x0 + t * x10, y0 + t * y10];
      }
      function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
        var x01 = x0 - x1, y01 = y0 - y1, lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x11 = x0 + ox, y11 = y0 + oy, x10 = x1 + ox, y10 = y1 + oy, x00 = (x11 + x10) / 2, y00 = (y11 + y10) / 2, dx = x10 - x11, dy = y10 - y11, d2 = dx * dx + dy * dy, r = r1 - rc, D = x11 * y10 - x10 * y11, d = (dy < 0 ? -1 : 1) * sqrt(max8(0, r * r * d2 - D * D)), cx0 = (D * dy - dx * d) / d2, cy0 = (-D * dx - dy * d) / d2, cx1 = (D * dy + dx * d) / d2, cy1 = (-D * dx + dy * d) / d2, dx0 = cx0 - x00, dy0 = cy0 - y00, dx1 = cx1 - x00, dy1 = cy1 - y00;
        if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1)
          cx0 = cx1, cy0 = cy1;
        return {
          cx: cx0,
          cy: cy0,
          x01: -ox,
          y01: -oy,
          x11: cx0 * (r1 / r - 1),
          y11: cy0 * (r1 / r - 1)
        };
      }
      function arc() {
        var innerRadius = arcInnerRadius, outerRadius = arcOuterRadius, cornerRadius = constant(0), padRadius = null, startAngle = arcStartAngle, endAngle = arcEndAngle, padAngle = arcPadAngle, context = null;
        function arc2() {
          var buffer, r, r0 = +innerRadius.apply(this, arguments), r1 = +outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) - halfPi, a1 = endAngle.apply(this, arguments) - halfPi, da = abs(a1 - a0), cw = a1 > a0;
          if (!context)
            context = buffer = d3Path.path();
          if (r1 < r0)
            r = r1, r1 = r0, r0 = r;
          if (!(r1 > epsilon))
            context.moveTo(0, 0);
          else if (da > tau - epsilon) {
            context.moveTo(r1 * cos(a0), r1 * sin(a0));
            context.arc(0, 0, r1, a0, a1, !cw);
            if (r0 > epsilon) {
              context.moveTo(r0 * cos(a1), r0 * sin(a1));
              context.arc(0, 0, r0, a1, a0, cw);
            }
          } else {
            var a01 = a0, a11 = a1, a00 = a0, a10 = a1, da0 = da, da1 = da, ap = padAngle.apply(this, arguments) / 2, rp = ap > epsilon && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)), rc = min3(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)), rc0 = rc, rc1 = rc, t0, t1;
            if (rp > epsilon) {
              var p0 = asin(rp / r0 * sin(ap)), p1 = asin(rp / r1 * sin(ap));
              if ((da0 -= p0 * 2) > epsilon)
                p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;
              else
                da0 = 0, a00 = a10 = (a0 + a1) / 2;
              if ((da1 -= p1 * 2) > epsilon)
                p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;
              else
                da1 = 0, a01 = a11 = (a0 + a1) / 2;
            }
            var x01 = r1 * cos(a01), y01 = r1 * sin(a01), x10 = r0 * cos(a10), y10 = r0 * sin(a10);
            if (rc > epsilon) {
              var x11 = r1 * cos(a11), y11 = r1 * sin(a11), x00 = r0 * cos(a00), y00 = r0 * sin(a00), oc;
              if (da < pi && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
                var ax = x01 - oc[0], ay = y01 - oc[1], bx = x11 - oc[0], by = y11 - oc[1], kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2), lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
                rc0 = min3(rc, (r0 - lc) / (kc - 1));
                rc1 = min3(rc, (r1 - lc) / (kc + 1));
              }
            }
            if (!(da1 > epsilon))
              context.moveTo(x01, y01);
            else if (rc1 > epsilon) {
              t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
              t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
              context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);
              if (rc1 < rc)
                context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
              else {
                context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
                context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
                context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
              }
            } else
              context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
            if (!(r0 > epsilon) || !(da0 > epsilon))
              context.lineTo(x10, y10);
            else if (rc0 > epsilon) {
              t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
              t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
              context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);
              if (rc0 < rc)
                context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
              else {
                context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
                context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
                context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
              }
            } else
              context.arc(0, 0, r0, a10, a00, cw);
          }
          context.closePath();
          if (buffer)
            return context = null, buffer + "" || null;
        }
        arc2.centroid = function() {
          var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a2 = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
          return [cos(a2) * r, sin(a2) * r];
        };
        arc2.innerRadius = function(_) {
          return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc2) : innerRadius;
        };
        arc2.outerRadius = function(_) {
          return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc2) : outerRadius;
        };
        arc2.cornerRadius = function(_) {
          return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc2) : cornerRadius;
        };
        arc2.padRadius = function(_) {
          return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc2) : padRadius;
        };
        arc2.startAngle = function(_) {
          return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc2) : startAngle;
        };
        arc2.endAngle = function(_) {
          return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc2) : endAngle;
        };
        arc2.padAngle = function(_) {
          return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc2) : padAngle;
        };
        arc2.context = function(_) {
          return arguments.length ? (context = _ == null ? null : _, arc2) : context;
        };
        return arc2;
      }
      var slice = Array.prototype.slice;
      function array(x2) {
        return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
      }
      function Linear(context) {
        this._context = context;
      }
      Linear.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._point = 0;
        },
        lineEnd: function() {
          if (this._line || this._line !== 0 && this._point === 1)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
              break;
            case 1:
              this._point = 2;
            default:
              this._context.lineTo(x2, y2);
              break;
          }
        }
      };
      function curveLinear(context) {
        return new Linear(context);
      }
      function x(p) {
        return p[0];
      }
      function y(p) {
        return p[1];
      }
      function line(x$1, y$1) {
        var defined = constant(true), context = null, curve = curveLinear, output = null;
        x$1 = typeof x$1 === "function" ? x$1 : x$1 === void 0 ? x : constant(x$1);
        y$1 = typeof y$1 === "function" ? y$1 : y$1 === void 0 ? y : constant(y$1);
        function line2(data) {
          var i, n = (data = array(data)).length, d, defined0 = false, buffer;
          if (context == null)
            output = curve(buffer = d3Path.path());
          for (i = 0; i <= n; ++i) {
            if (!(i < n && defined(d = data[i], i, data)) === defined0) {
              if (defined0 = !defined0)
                output.lineStart();
              else
                output.lineEnd();
            }
            if (defined0)
              output.point(+x$1(d, i, data), +y$1(d, i, data));
          }
          if (buffer)
            return output = null, buffer + "" || null;
        }
        line2.x = function(_) {
          return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), line2) : x$1;
        };
        line2.y = function(_) {
          return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), line2) : y$1;
        };
        line2.defined = function(_) {
          return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line2) : defined;
        };
        line2.curve = function(_) {
          return arguments.length ? (curve = _, context != null && (output = curve(context)), line2) : curve;
        };
        line2.context = function(_) {
          return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line2) : context;
        };
        return line2;
      }
      function area(x0, y0, y1) {
        var x1 = null, defined = constant(true), context = null, curve = curveLinear, output = null;
        x0 = typeof x0 === "function" ? x0 : x0 === void 0 ? x : constant(+x0);
        y0 = typeof y0 === "function" ? y0 : y0 === void 0 ? constant(0) : constant(+y0);
        y1 = typeof y1 === "function" ? y1 : y1 === void 0 ? y : constant(+y1);
        function area2(data) {
          var i, j, k2, n = (data = array(data)).length, d, defined0 = false, buffer, x0z = new Array(n), y0z = new Array(n);
          if (context == null)
            output = curve(buffer = d3Path.path());
          for (i = 0; i <= n; ++i) {
            if (!(i < n && defined(d = data[i], i, data)) === defined0) {
              if (defined0 = !defined0) {
                j = i;
                output.areaStart();
                output.lineStart();
              } else {
                output.lineEnd();
                output.lineStart();
                for (k2 = i - 1; k2 >= j; --k2) {
                  output.point(x0z[k2], y0z[k2]);
                }
                output.lineEnd();
                output.areaEnd();
              }
            }
            if (defined0) {
              x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
              output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
            }
          }
          if (buffer)
            return output = null, buffer + "" || null;
        }
        function arealine() {
          return line().defined(defined).curve(curve).context(context);
        }
        area2.x = function(_) {
          return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area2) : x0;
        };
        area2.x0 = function(_) {
          return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area2) : x0;
        };
        area2.x1 = function(_) {
          return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area2) : x1;
        };
        area2.y = function(_) {
          return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area2) : y0;
        };
        area2.y0 = function(_) {
          return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area2) : y0;
        };
        area2.y1 = function(_) {
          return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area2) : y1;
        };
        area2.lineX0 = area2.lineY0 = function() {
          return arealine().x(x0).y(y0);
        };
        area2.lineY1 = function() {
          return arealine().x(x0).y(y1);
        };
        area2.lineX1 = function() {
          return arealine().x(x1).y(y0);
        };
        area2.defined = function(_) {
          return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area2) : defined;
        };
        area2.curve = function(_) {
          return arguments.length ? (curve = _, context != null && (output = curve(context)), area2) : curve;
        };
        area2.context = function(_) {
          return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area2) : context;
        };
        return area2;
      }
      function descending$1(a2, b) {
        return b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
      }
      function identity(d) {
        return d;
      }
      function pie() {
        var value = identity, sortValues = descending$1, sort = null, startAngle = constant(0), endAngle = constant(tau), padAngle = constant(0);
        function pie2(data) {
          var i, n = (data = array(data)).length, j, k2, sum2 = 0, index = new Array(n), arcs = new Array(n), a0 = +startAngle.apply(this, arguments), da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)), a1, p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)), pa = p * (da < 0 ? -1 : 1), v;
          for (i = 0; i < n; ++i) {
            if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
              sum2 += v;
            }
          }
          if (sortValues != null)
            index.sort(function(i2, j2) {
              return sortValues(arcs[i2], arcs[j2]);
            });
          else if (sort != null)
            index.sort(function(i2, j2) {
              return sort(data[i2], data[j2]);
            });
          for (i = 0, k2 = sum2 ? (da - n * pa) / sum2 : 0; i < n; ++i, a0 = a1) {
            j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k2 : 0) + pa, arcs[j] = {
              data: data[j],
              index: i,
              value: v,
              startAngle: a0,
              endAngle: a1,
              padAngle: p
            };
          }
          return arcs;
        }
        pie2.value = function(_) {
          return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie2) : value;
        };
        pie2.sortValues = function(_) {
          return arguments.length ? (sortValues = _, sort = null, pie2) : sortValues;
        };
        pie2.sort = function(_) {
          return arguments.length ? (sort = _, sortValues = null, pie2) : sort;
        };
        pie2.startAngle = function(_) {
          return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie2) : startAngle;
        };
        pie2.endAngle = function(_) {
          return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie2) : endAngle;
        };
        pie2.padAngle = function(_) {
          return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie2) : padAngle;
        };
        return pie2;
      }
      var curveRadialLinear = curveRadial$1(curveLinear);
      function Radial(curve) {
        this._curve = curve;
      }
      Radial.prototype = {
        areaStart: function() {
          this._curve.areaStart();
        },
        areaEnd: function() {
          this._curve.areaEnd();
        },
        lineStart: function() {
          this._curve.lineStart();
        },
        lineEnd: function() {
          this._curve.lineEnd();
        },
        point: function(a2, r) {
          this._curve.point(r * Math.sin(a2), r * -Math.cos(a2));
        }
      };
      function curveRadial$1(curve) {
        function radial(context) {
          return new Radial(curve(context));
        }
        radial._curve = curve;
        return radial;
      }
      function lineRadial(l) {
        var c2 = l.curve;
        l.angle = l.x, delete l.x;
        l.radius = l.y, delete l.y;
        l.curve = function(_) {
          return arguments.length ? c2(curveRadial$1(_)) : c2()._curve;
        };
        return l;
      }
      function lineRadial$1() {
        return lineRadial(line().curve(curveRadialLinear));
      }
      function areaRadial() {
        var a2 = area().curve(curveRadialLinear), c2 = a2.curve, x0 = a2.lineX0, x1 = a2.lineX1, y0 = a2.lineY0, y1 = a2.lineY1;
        a2.angle = a2.x, delete a2.x;
        a2.startAngle = a2.x0, delete a2.x0;
        a2.endAngle = a2.x1, delete a2.x1;
        a2.radius = a2.y, delete a2.y;
        a2.innerRadius = a2.y0, delete a2.y0;
        a2.outerRadius = a2.y1, delete a2.y1;
        a2.lineStartAngle = function() {
          return lineRadial(x0());
        }, delete a2.lineX0;
        a2.lineEndAngle = function() {
          return lineRadial(x1());
        }, delete a2.lineX1;
        a2.lineInnerRadius = function() {
          return lineRadial(y0());
        }, delete a2.lineY0;
        a2.lineOuterRadius = function() {
          return lineRadial(y1());
        }, delete a2.lineY1;
        a2.curve = function(_) {
          return arguments.length ? c2(curveRadial$1(_)) : c2()._curve;
        };
        return a2;
      }
      function pointRadial(x2, y2) {
        return [(y2 = +y2) * Math.cos(x2 -= Math.PI / 2), y2 * Math.sin(x2)];
      }
      function linkSource(d) {
        return d.source;
      }
      function linkTarget(d) {
        return d.target;
      }
      function link(curve) {
        var source = linkSource, target = linkTarget, x$1 = x, y$1 = y, context = null;
        function link2() {
          var buffer, argv = slice.call(arguments), s2 = source.apply(this, argv), t = target.apply(this, argv);
          if (!context)
            context = buffer = d3Path.path();
          curve(context, +x$1.apply(this, (argv[0] = s2, argv)), +y$1.apply(this, argv), +x$1.apply(this, (argv[0] = t, argv)), +y$1.apply(this, argv));
          if (buffer)
            return context = null, buffer + "" || null;
        }
        link2.source = function(_) {
          return arguments.length ? (source = _, link2) : source;
        };
        link2.target = function(_) {
          return arguments.length ? (target = _, link2) : target;
        };
        link2.x = function(_) {
          return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), link2) : x$1;
        };
        link2.y = function(_) {
          return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), link2) : y$1;
        };
        link2.context = function(_) {
          return arguments.length ? (context = _ == null ? null : _, link2) : context;
        };
        return link2;
      }
      function curveHorizontal(context, x0, y0, x1, y1) {
        context.moveTo(x0, y0);
        context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
      }
      function curveVertical(context, x0, y0, x1, y1) {
        context.moveTo(x0, y0);
        context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
      }
      function curveRadial(context, x0, y0, x1, y1) {
        var p0 = pointRadial(x0, y0), p1 = pointRadial(x0, y0 = (y0 + y1) / 2), p2 = pointRadial(x1, y0), p3 = pointRadial(x1, y1);
        context.moveTo(p0[0], p0[1]);
        context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
      }
      function linkHorizontal() {
        return link(curveHorizontal);
      }
      function linkVertical() {
        return link(curveVertical);
      }
      function linkRadial() {
        var l = link(curveRadial);
        l.angle = l.x, delete l.x;
        l.radius = l.y, delete l.y;
        return l;
      }
      var circle = {
        draw: function(context, size) {
          var r = Math.sqrt(size / pi);
          context.moveTo(r, 0);
          context.arc(0, 0, r, 0, tau);
        }
      };
      var cross = {
        draw: function(context, size) {
          var r = Math.sqrt(size / 5) / 2;
          context.moveTo(-3 * r, -r);
          context.lineTo(-r, -r);
          context.lineTo(-r, -3 * r);
          context.lineTo(r, -3 * r);
          context.lineTo(r, -r);
          context.lineTo(3 * r, -r);
          context.lineTo(3 * r, r);
          context.lineTo(r, r);
          context.lineTo(r, 3 * r);
          context.lineTo(-r, 3 * r);
          context.lineTo(-r, r);
          context.lineTo(-3 * r, r);
          context.closePath();
        }
      };
      var tan30 = Math.sqrt(1 / 3), tan30_2 = tan30 * 2;
      var diamond = {
        draw: function(context, size) {
          var y2 = Math.sqrt(size / tan30_2), x2 = y2 * tan30;
          context.moveTo(0, -y2);
          context.lineTo(x2, 0);
          context.lineTo(0, y2);
          context.lineTo(-x2, 0);
          context.closePath();
        }
      };
      var ka = 0.8908130915292852, kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10), kx = Math.sin(tau / 10) * kr, ky = -Math.cos(tau / 10) * kr;
      var star = {
        draw: function(context, size) {
          var r = Math.sqrt(size * ka), x2 = kx * r, y2 = ky * r;
          context.moveTo(0, -r);
          context.lineTo(x2, y2);
          for (var i = 1; i < 5; ++i) {
            var a2 = tau * i / 5, c2 = Math.cos(a2), s2 = Math.sin(a2);
            context.lineTo(s2 * r, -c2 * r);
            context.lineTo(c2 * x2 - s2 * y2, s2 * x2 + c2 * y2);
          }
          context.closePath();
        }
      };
      var square = {
        draw: function(context, size) {
          var w = Math.sqrt(size), x2 = -w / 2;
          context.rect(x2, x2, w, w);
        }
      };
      var sqrt3 = Math.sqrt(3);
      var triangle = {
        draw: function(context, size) {
          var y2 = -Math.sqrt(size / (sqrt3 * 3));
          context.moveTo(0, y2 * 2);
          context.lineTo(-sqrt3 * y2, -y2);
          context.lineTo(sqrt3 * y2, -y2);
          context.closePath();
        }
      };
      var c = -0.5, s = Math.sqrt(3) / 2, k = 1 / Math.sqrt(12), a = (k / 2 + 1) * 3;
      var wye = {
        draw: function(context, size) {
          var r = Math.sqrt(size / a), x0 = r / 2, y0 = r * k, x1 = x0, y1 = r * k + r, x2 = -x1, y2 = y1;
          context.moveTo(x0, y0);
          context.lineTo(x1, y1);
          context.lineTo(x2, y2);
          context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
          context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
          context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
          context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
          context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
          context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
          context.closePath();
        }
      };
      var symbols = [
        circle,
        cross,
        diamond,
        square,
        star,
        triangle,
        wye
      ];
      function symbol(type, size) {
        var context = null;
        type = typeof type === "function" ? type : constant(type || circle);
        size = typeof size === "function" ? size : constant(size === void 0 ? 64 : +size);
        function symbol2() {
          var buffer;
          if (!context)
            context = buffer = d3Path.path();
          type.apply(this, arguments).draw(context, +size.apply(this, arguments));
          if (buffer)
            return context = null, buffer + "" || null;
        }
        symbol2.type = function(_) {
          return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol2) : type;
        };
        symbol2.size = function(_) {
          return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol2) : size;
        };
        symbol2.context = function(_) {
          return arguments.length ? (context = _ == null ? null : _, symbol2) : context;
        };
        return symbol2;
      }
      function noop() {
      }
      function point$3(that, x2, y2) {
        that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x2) / 6, (that._y0 + 4 * that._y1 + y2) / 6);
      }
      function Basis(context) {
        this._context = context;
      }
      Basis.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._y0 = this._y1 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 3:
              point$3(this, this._x1, this._y1);
            case 2:
              this._context.lineTo(this._x1, this._y1);
              break;
          }
          if (this._line || this._line !== 0 && this._point === 1)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
              this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
            default:
              point$3(this, x2, y2);
              break;
          }
          this._x0 = this._x1, this._x1 = x2;
          this._y0 = this._y1, this._y1 = y2;
        }
      };
      function basis(context) {
        return new Basis(context);
      }
      function BasisClosed(context) {
        this._context = context;
      }
      BasisClosed.prototype = {
        areaStart: noop,
        areaEnd: noop,
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 1: {
              this._context.moveTo(this._x2, this._y2);
              this._context.closePath();
              break;
            }
            case 2: {
              this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
              this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
              this._context.closePath();
              break;
            }
            case 3: {
              this.point(this._x2, this._y2);
              this.point(this._x3, this._y3);
              this.point(this._x4, this._y4);
              break;
            }
          }
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._x2 = x2, this._y2 = y2;
              break;
            case 1:
              this._point = 2;
              this._x3 = x2, this._y3 = y2;
              break;
            case 2:
              this._point = 3;
              this._x4 = x2, this._y4 = y2;
              this._context.moveTo((this._x0 + 4 * this._x1 + x2) / 6, (this._y0 + 4 * this._y1 + y2) / 6);
              break;
            default:
              point$3(this, x2, y2);
              break;
          }
          this._x0 = this._x1, this._x1 = x2;
          this._y0 = this._y1, this._y1 = y2;
        }
      };
      function basisClosed(context) {
        return new BasisClosed(context);
      }
      function BasisOpen(context) {
        this._context = context;
      }
      BasisOpen.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._y0 = this._y1 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          if (this._line || this._line !== 0 && this._point === 3)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
              var x0 = (this._x0 + 4 * this._x1 + x2) / 6, y0 = (this._y0 + 4 * this._y1 + y2) / 6;
              this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
              break;
            case 3:
              this._point = 4;
            default:
              point$3(this, x2, y2);
              break;
          }
          this._x0 = this._x1, this._x1 = x2;
          this._y0 = this._y1, this._y1 = y2;
        }
      };
      function basisOpen(context) {
        return new BasisOpen(context);
      }
      class Bump {
        constructor(context, x2) {
          this._context = context;
          this._x = x2;
        }
        areaStart() {
          this._line = 0;
        }
        areaEnd() {
          this._line = NaN;
        }
        lineStart() {
          this._point = 0;
        }
        lineEnd() {
          if (this._line || this._line !== 0 && this._point === 1)
            this._context.closePath();
          this._line = 1 - this._line;
        }
        point(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0: {
              this._point = 1;
              if (this._line)
                this._context.lineTo(x2, y2);
              else
                this._context.moveTo(x2, y2);
              break;
            }
            case 1:
              this._point = 2;
            default: {
              if (this._x)
                this._context.bezierCurveTo(this._x0 = (this._x0 + x2) / 2, this._y0, this._x0, y2, x2, y2);
              else
                this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y2) / 2, x2, this._y0, x2, y2);
              break;
            }
          }
          this._x0 = x2, this._y0 = y2;
        }
      }
      function bumpX(context) {
        return new Bump(context, true);
      }
      function bumpY(context) {
        return new Bump(context, false);
      }
      function Bundle(context, beta) {
        this._basis = new Basis(context);
        this._beta = beta;
      }
      Bundle.prototype = {
        lineStart: function() {
          this._x = [];
          this._y = [];
          this._basis.lineStart();
        },
        lineEnd: function() {
          var x2 = this._x, y2 = this._y, j = x2.length - 1;
          if (j > 0) {
            var x0 = x2[0], y0 = y2[0], dx = x2[j] - x0, dy = y2[j] - y0, i = -1, t;
            while (++i <= j) {
              t = i / j;
              this._basis.point(this._beta * x2[i] + (1 - this._beta) * (x0 + t * dx), this._beta * y2[i] + (1 - this._beta) * (y0 + t * dy));
            }
          }
          this._x = this._y = null;
          this._basis.lineEnd();
        },
        point: function(x2, y2) {
          this._x.push(+x2);
          this._y.push(+y2);
        }
      };
      var bundle = function custom(beta) {
        function bundle2(context) {
          return beta === 1 ? new Basis(context) : new Bundle(context, beta);
        }
        bundle2.beta = function(beta2) {
          return custom(+beta2);
        };
        return bundle2;
      }(0.85);
      function point$2(that, x2, y2) {
        that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x2), that._y2 + that._k * (that._y1 - y2), that._x2, that._y2);
      }
      function Cardinal(context, tension) {
        this._context = context;
        this._k = (1 - tension) / 6;
      }
      Cardinal.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 2:
              this._context.lineTo(this._x2, this._y2);
              break;
            case 3:
              point$2(this, this._x1, this._y1);
              break;
          }
          if (this._line || this._line !== 0 && this._point === 1)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
              break;
            case 1:
              this._point = 2;
              this._x1 = x2, this._y1 = y2;
              break;
            case 2:
              this._point = 3;
            default:
              point$2(this, x2, y2);
              break;
          }
          this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
          this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
        }
      };
      var cardinal = function custom(tension) {
        function cardinal2(context) {
          return new Cardinal(context, tension);
        }
        cardinal2.tension = function(tension2) {
          return custom(+tension2);
        };
        return cardinal2;
      }(0);
      function CardinalClosed(context, tension) {
        this._context = context;
        this._k = (1 - tension) / 6;
      }
      CardinalClosed.prototype = {
        areaStart: noop,
        areaEnd: noop,
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 1: {
              this._context.moveTo(this._x3, this._y3);
              this._context.closePath();
              break;
            }
            case 2: {
              this._context.lineTo(this._x3, this._y3);
              this._context.closePath();
              break;
            }
            case 3: {
              this.point(this._x3, this._y3);
              this.point(this._x4, this._y4);
              this.point(this._x5, this._y5);
              break;
            }
          }
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._x3 = x2, this._y3 = y2;
              break;
            case 1:
              this._point = 2;
              this._context.moveTo(this._x4 = x2, this._y4 = y2);
              break;
            case 2:
              this._point = 3;
              this._x5 = x2, this._y5 = y2;
              break;
            default:
              point$2(this, x2, y2);
              break;
          }
          this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
          this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
        }
      };
      var cardinalClosed = function custom(tension) {
        function cardinal2(context) {
          return new CardinalClosed(context, tension);
        }
        cardinal2.tension = function(tension2) {
          return custom(+tension2);
        };
        return cardinal2;
      }(0);
      function CardinalOpen(context, tension) {
        this._context = context;
        this._k = (1 - tension) / 6;
      }
      CardinalOpen.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          if (this._line || this._line !== 0 && this._point === 3)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
              this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
              break;
            case 3:
              this._point = 4;
            default:
              point$2(this, x2, y2);
              break;
          }
          this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
          this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
        }
      };
      var cardinalOpen = function custom(tension) {
        function cardinal2(context) {
          return new CardinalOpen(context, tension);
        }
        cardinal2.tension = function(tension2) {
          return custom(+tension2);
        };
        return cardinal2;
      }(0);
      function point$1(that, x2, y2) {
        var x1 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
        if (that._l01_a > epsilon) {
          var a2 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
          x1 = (x1 * a2 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
          y1 = (y1 * a2 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
        }
        if (that._l23_a > epsilon) {
          var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
          x22 = (x22 * b + that._x1 * that._l23_2a - x2 * that._l12_2a) / m;
          y22 = (y22 * b + that._y1 * that._l23_2a - y2 * that._l12_2a) / m;
        }
        that._context.bezierCurveTo(x1, y1, x22, y22, that._x2, that._y2);
      }
      function CatmullRom(context, alpha) {
        this._context = context;
        this._alpha = alpha;
      }
      CatmullRom.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
          this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 2:
              this._context.lineTo(this._x2, this._y2);
              break;
            case 3:
              this.point(this._x2, this._y2);
              break;
          }
          if (this._line || this._line !== 0 && this._point === 1)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          if (this._point) {
            var x23 = this._x2 - x2, y23 = this._y2 - y2;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
          }
          switch (this._point) {
            case 0:
              this._point = 1;
              this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
            default:
              point$1(this, x2, y2);
              break;
          }
          this._l01_a = this._l12_a, this._l12_a = this._l23_a;
          this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
          this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
          this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
        }
      };
      var catmullRom = function custom(alpha) {
        function catmullRom2(context) {
          return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
        }
        catmullRom2.alpha = function(alpha2) {
          return custom(+alpha2);
        };
        return catmullRom2;
      }(0.5);
      function CatmullRomClosed(context, alpha) {
        this._context = context;
        this._alpha = alpha;
      }
      CatmullRomClosed.prototype = {
        areaStart: noop,
        areaEnd: noop,
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
          this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 1: {
              this._context.moveTo(this._x3, this._y3);
              this._context.closePath();
              break;
            }
            case 2: {
              this._context.lineTo(this._x3, this._y3);
              this._context.closePath();
              break;
            }
            case 3: {
              this.point(this._x3, this._y3);
              this.point(this._x4, this._y4);
              this.point(this._x5, this._y5);
              break;
            }
          }
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          if (this._point) {
            var x23 = this._x2 - x2, y23 = this._y2 - y2;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
          }
          switch (this._point) {
            case 0:
              this._point = 1;
              this._x3 = x2, this._y3 = y2;
              break;
            case 1:
              this._point = 2;
              this._context.moveTo(this._x4 = x2, this._y4 = y2);
              break;
            case 2:
              this._point = 3;
              this._x5 = x2, this._y5 = y2;
              break;
            default:
              point$1(this, x2, y2);
              break;
          }
          this._l01_a = this._l12_a, this._l12_a = this._l23_a;
          this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
          this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
          this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
        }
      };
      var catmullRomClosed = function custom(alpha) {
        function catmullRom2(context) {
          return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
        }
        catmullRom2.alpha = function(alpha2) {
          return custom(+alpha2);
        };
        return catmullRom2;
      }(0.5);
      function CatmullRomOpen(context, alpha) {
        this._context = context;
        this._alpha = alpha;
      }
      CatmullRomOpen.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
          this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
        },
        lineEnd: function() {
          if (this._line || this._line !== 0 && this._point === 3)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          if (this._point) {
            var x23 = this._x2 - x2, y23 = this._y2 - y2;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
          }
          switch (this._point) {
            case 0:
              this._point = 1;
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
              this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
              break;
            case 3:
              this._point = 4;
            default:
              point$1(this, x2, y2);
              break;
          }
          this._l01_a = this._l12_a, this._l12_a = this._l23_a;
          this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
          this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
          this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
        }
      };
      var catmullRomOpen = function custom(alpha) {
        function catmullRom2(context) {
          return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
        }
        catmullRom2.alpha = function(alpha2) {
          return custom(+alpha2);
        };
        return catmullRom2;
      }(0.5);
      function LinearClosed(context) {
        this._context = context;
      }
      LinearClosed.prototype = {
        areaStart: noop,
        areaEnd: noop,
        lineStart: function() {
          this._point = 0;
        },
        lineEnd: function() {
          if (this._point)
            this._context.closePath();
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          if (this._point)
            this._context.lineTo(x2, y2);
          else
            this._point = 1, this._context.moveTo(x2, y2);
        }
      };
      function linearClosed(context) {
        return new LinearClosed(context);
      }
      function sign(x2) {
        return x2 < 0 ? -1 : 1;
      }
      function slope3(that, x2, y2) {
        var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
        return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
      }
      function slope2(that, t) {
        var h = that._x1 - that._x0;
        return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
      }
      function point(that, t0, t1) {
        var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
        that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
      }
      function MonotoneX(context) {
        this._context = context;
      }
      MonotoneX.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          switch (this._point) {
            case 2:
              this._context.lineTo(this._x1, this._y1);
              break;
            case 3:
              point(this, this._t0, slope2(this, this._t0));
              break;
          }
          if (this._line || this._line !== 0 && this._point === 1)
            this._context.closePath();
          this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          var t1 = NaN;
          x2 = +x2, y2 = +y2;
          if (x2 === this._x1 && y2 === this._y1)
            return;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
              point(this, slope2(this, t1 = slope3(this, x2, y2)), t1);
              break;
            default:
              point(this, this._t0, t1 = slope3(this, x2, y2));
              break;
          }
          this._x0 = this._x1, this._x1 = x2;
          this._y0 = this._y1, this._y1 = y2;
          this._t0 = t1;
        }
      };
      function MonotoneY(context) {
        this._context = new ReflectContext(context);
      }
      (MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x2, y2) {
        MonotoneX.prototype.point.call(this, y2, x2);
      };
      function ReflectContext(context) {
        this._context = context;
      }
      ReflectContext.prototype = {
        moveTo: function(x2, y2) {
          this._context.moveTo(y2, x2);
        },
        closePath: function() {
          this._context.closePath();
        },
        lineTo: function(x2, y2) {
          this._context.lineTo(y2, x2);
        },
        bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
          this._context.bezierCurveTo(y1, x1, y2, x2, y3, x3);
        }
      };
      function monotoneX(context) {
        return new MonotoneX(context);
      }
      function monotoneY(context) {
        return new MonotoneY(context);
      }
      function Natural(context) {
        this._context = context;
      }
      Natural.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x = [];
          this._y = [];
        },
        lineEnd: function() {
          var x2 = this._x, y2 = this._y, n = x2.length;
          if (n) {
            this._line ? this._context.lineTo(x2[0], y2[0]) : this._context.moveTo(x2[0], y2[0]);
            if (n === 2) {
              this._context.lineTo(x2[1], y2[1]);
            } else {
              var px = controlPoints(x2), py = controlPoints(y2);
              for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
                this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x2[i1], y2[i1]);
              }
            }
          }
          if (this._line || this._line !== 0 && n === 1)
            this._context.closePath();
          this._line = 1 - this._line;
          this._x = this._y = null;
        },
        point: function(x2, y2) {
          this._x.push(+x2);
          this._y.push(+y2);
        }
      };
      function controlPoints(x2) {
        var i, n = x2.length - 1, m, a2 = new Array(n), b = new Array(n), r = new Array(n);
        a2[0] = 0, b[0] = 2, r[0] = x2[0] + 2 * x2[1];
        for (i = 1; i < n - 1; ++i)
          a2[i] = 1, b[i] = 4, r[i] = 4 * x2[i] + 2 * x2[i + 1];
        a2[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x2[n - 1] + x2[n];
        for (i = 1; i < n; ++i)
          m = a2[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
        a2[n - 1] = r[n - 1] / b[n - 1];
        for (i = n - 2; i >= 0; --i)
          a2[i] = (r[i] - a2[i + 1]) / b[i];
        b[n - 1] = (x2[n] + a2[n - 1]) / 2;
        for (i = 0; i < n - 1; ++i)
          b[i] = 2 * x2[i + 1] - a2[i + 1];
        return [a2, b];
      }
      function natural(context) {
        return new Natural(context);
      }
      function Step(context, t) {
        this._context = context;
        this._t = t;
      }
      Step.prototype = {
        areaStart: function() {
          this._line = 0;
        },
        areaEnd: function() {
          this._line = NaN;
        },
        lineStart: function() {
          this._x = this._y = NaN;
          this._point = 0;
        },
        lineEnd: function() {
          if (0 < this._t && this._t < 1 && this._point === 2)
            this._context.lineTo(this._x, this._y);
          if (this._line || this._line !== 0 && this._point === 1)
            this._context.closePath();
          if (this._line >= 0)
            this._t = 1 - this._t, this._line = 1 - this._line;
        },
        point: function(x2, y2) {
          x2 = +x2, y2 = +y2;
          switch (this._point) {
            case 0:
              this._point = 1;
              this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
              break;
            case 1:
              this._point = 2;
            default: {
              if (this._t <= 0) {
                this._context.lineTo(this._x, y2);
                this._context.lineTo(x2, y2);
              } else {
                var x1 = this._x * (1 - this._t) + x2 * this._t;
                this._context.lineTo(x1, this._y);
                this._context.lineTo(x1, y2);
              }
              break;
            }
          }
          this._x = x2, this._y = y2;
        }
      };
      function step(context) {
        return new Step(context, 0.5);
      }
      function stepBefore(context) {
        return new Step(context, 0);
      }
      function stepAfter(context) {
        return new Step(context, 1);
      }
      function none$1(series, order) {
        if (!((n = series.length) > 1))
          return;
        for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
          s0 = s1, s1 = series[order[i]];
          for (j = 0; j < m; ++j) {
            s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
          }
        }
      }
      function none(series) {
        var n = series.length, o = new Array(n);
        while (--n >= 0)
          o[n] = n;
        return o;
      }
      function stackValue(d, key) {
        return d[key];
      }
      function stackSeries(key) {
        const series = [];
        series.key = key;
        return series;
      }
      function stack() {
        var keys = constant([]), order = none, offset = none$1, value = stackValue;
        function stack2(data) {
          var sz = Array.from(keys.apply(this, arguments), stackSeries), i, n = sz.length, j = -1, oz;
          for (const d of data) {
            for (i = 0, ++j; i < n; ++i) {
              (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
            }
          }
          for (i = 0, oz = array(order(sz)); i < n; ++i) {
            sz[oz[i]].index = i;
          }
          offset(sz, oz);
          return sz;
        }
        stack2.keys = function(_) {
          return arguments.length ? (keys = typeof _ === "function" ? _ : constant(Array.from(_)), stack2) : keys;
        };
        stack2.value = function(_) {
          return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack2) : value;
        };
        stack2.order = function(_) {
          return arguments.length ? (order = _ == null ? none : typeof _ === "function" ? _ : constant(Array.from(_)), stack2) : order;
        };
        stack2.offset = function(_) {
          return arguments.length ? (offset = _ == null ? none$1 : _, stack2) : offset;
        };
        return stack2;
      }
      function expand(series, order) {
        if (!((n = series.length) > 0))
          return;
        for (var i, n, j = 0, m = series[0].length, y2; j < m; ++j) {
          for (y2 = i = 0; i < n; ++i)
            y2 += series[i][j][1] || 0;
          if (y2)
            for (i = 0; i < n; ++i)
              series[i][j][1] /= y2;
        }
        none$1(series, order);
      }
      function diverging(series, order) {
        if (!((n = series.length) > 0))
          return;
        for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
          for (yp = yn = 0, i = 0; i < n; ++i) {
            if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) {
              d[0] = yp, d[1] = yp += dy;
            } else if (dy < 0) {
              d[1] = yn, d[0] = yn += dy;
            } else {
              d[0] = 0, d[1] = dy;
            }
          }
        }
      }
      function silhouette(series, order) {
        if (!((n = series.length) > 0))
          return;
        for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
          for (var i = 0, y2 = 0; i < n; ++i)
            y2 += series[i][j][1] || 0;
          s0[j][1] += s0[j][0] = -y2 / 2;
        }
        none$1(series, order);
      }
      function wiggle(series, order) {
        if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0))
          return;
        for (var y2 = 0, j = 1, s0, m, n; j < m; ++j) {
          for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
            var si = series[order[i]], sij0 = si[j][1] || 0, sij1 = si[j - 1][1] || 0, s3 = (sij0 - sij1) / 2;
            for (var k2 = 0; k2 < i; ++k2) {
              var sk = series[order[k2]], skj0 = sk[j][1] || 0, skj1 = sk[j - 1][1] || 0;
              s3 += skj0 - skj1;
            }
            s1 += sij0, s2 += s3 * sij0;
          }
          s0[j - 1][1] += s0[j - 1][0] = y2;
          if (s1)
            y2 -= s2 / s1;
        }
        s0[j - 1][1] += s0[j - 1][0] = y2;
        none$1(series, order);
      }
      function appearance(series) {
        var peaks = series.map(peak);
        return none(series).sort(function(a2, b) {
          return peaks[a2] - peaks[b];
        });
      }
      function peak(series) {
        var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
        while (++i < n)
          if ((vi = +series[i][1]) > vj)
            vj = vi, j = i;
        return j;
      }
      function ascending(series) {
        var sums = series.map(sum);
        return none(series).sort(function(a2, b) {
          return sums[a2] - sums[b];
        });
      }
      function sum(series) {
        var s2 = 0, i = -1, n = series.length, v;
        while (++i < n)
          if (v = +series[i][1])
            s2 += v;
        return s2;
      }
      function descending(series) {
        return ascending(series).reverse();
      }
      function insideOut(series) {
        var n = series.length, i, j, sums = series.map(sum), order = appearance(series), top = 0, bottom = 0, tops = [], bottoms = [];
        for (i = 0; i < n; ++i) {
          j = order[i];
          if (top < bottom) {
            top += sums[j];
            tops.push(j);
          } else {
            bottom += sums[j];
            bottoms.push(j);
          }
        }
        return bottoms.reverse().concat(tops);
      }
      function reverse(series) {
        return none(series).reverse();
      }
      exports2.arc = arc;
      exports2.area = area;
      exports2.areaRadial = areaRadial;
      exports2.curveBasis = basis;
      exports2.curveBasisClosed = basisClosed;
      exports2.curveBasisOpen = basisOpen;
      exports2.curveBumpX = bumpX;
      exports2.curveBumpY = bumpY;
      exports2.curveBundle = bundle;
      exports2.curveCardinal = cardinal;
      exports2.curveCardinalClosed = cardinalClosed;
      exports2.curveCardinalOpen = cardinalOpen;
      exports2.curveCatmullRom = catmullRom;
      exports2.curveCatmullRomClosed = catmullRomClosed;
      exports2.curveCatmullRomOpen = catmullRomOpen;
      exports2.curveLinear = curveLinear;
      exports2.curveLinearClosed = linearClosed;
      exports2.curveMonotoneX = monotoneX;
      exports2.curveMonotoneY = monotoneY;
      exports2.curveNatural = natural;
      exports2.curveStep = step;
      exports2.curveStepAfter = stepAfter;
      exports2.curveStepBefore = stepBefore;
      exports2.line = line;
      exports2.lineRadial = lineRadial$1;
      exports2.linkHorizontal = linkHorizontal;
      exports2.linkRadial = linkRadial;
      exports2.linkVertical = linkVertical;
      exports2.pie = pie;
      exports2.pointRadial = pointRadial;
      exports2.radialArea = areaRadial;
      exports2.radialLine = lineRadial$1;
      exports2.stack = stack;
      exports2.stackOffsetDiverging = diverging;
      exports2.stackOffsetExpand = expand;
      exports2.stackOffsetNone = none$1;
      exports2.stackOffsetSilhouette = silhouette;
      exports2.stackOffsetWiggle = wiggle;
      exports2.stackOrderAppearance = appearance;
      exports2.stackOrderAscending = ascending;
      exports2.stackOrderDescending = descending;
      exports2.stackOrderInsideOut = insideOut;
      exports2.stackOrderNone = none;
      exports2.stackOrderReverse = reverse;
      exports2.symbol = symbol;
      exports2.symbolCircle = circle;
      exports2.symbolCross = cross;
      exports2.symbolDiamond = diamond;
      exports2.symbolSquare = square;
      exports2.symbolStar = star;
      exports2.symbolTriangle = triangle;
      exports2.symbolWye = wye;
      exports2.symbols = symbols;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3-zoom@2.0.0/node_modules/d3-zoom/dist/d3-zoom.js
var require_d3_zoom = __commonJS({
  "node_modules/.pnpm/d3-zoom@2.0.0/node_modules/d3-zoom/dist/d3-zoom.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_d3_dispatch(), require_d3_drag(), require_d3_interpolate(), require_d3_selection(), require_d3_transition()) : typeof define === "function" && define.amd ? define(["exports", "d3-dispatch", "d3-drag", "d3-interpolate", "d3-selection", "d3-transition"], factory) : (global2 = global2 || self, factory(global2.d3 = global2.d3 || {}, global2.d3, global2.d3, global2.d3, global2.d3, global2.d3));
    })(exports, function(exports2, d3Dispatch, d3Drag, d3Interpolate, d3Selection, d3Transition) {
      "use strict";
      var constant = (x) => () => x;
      function ZoomEvent(type, {
        sourceEvent,
        target,
        transform: transform2,
        dispatch
      }) {
        Object.defineProperties(this, {
          type: { value: type, enumerable: true, configurable: true },
          sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
          target: { value: target, enumerable: true, configurable: true },
          transform: { value: transform2, enumerable: true, configurable: true },
          _: { value: dispatch }
        });
      }
      function Transform(k, x, y) {
        this.k = k;
        this.x = x;
        this.y = y;
      }
      Transform.prototype = {
        constructor: Transform,
        scale: function(k) {
          return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
        },
        translate: function(x, y) {
          return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
        },
        apply: function(point) {
          return [point[0] * this.k + this.x, point[1] * this.k + this.y];
        },
        applyX: function(x) {
          return x * this.k + this.x;
        },
        applyY: function(y) {
          return y * this.k + this.y;
        },
        invert: function(location) {
          return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
        },
        invertX: function(x) {
          return (x - this.x) / this.k;
        },
        invertY: function(y) {
          return (y - this.y) / this.k;
        },
        rescaleX: function(x) {
          return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
        },
        rescaleY: function(y) {
          return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
        },
        toString: function() {
          return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
        }
      };
      var identity = new Transform(1, 0, 0);
      transform.prototype = Transform.prototype;
      function transform(node) {
        while (!node.__zoom)
          if (!(node = node.parentNode))
            return identity;
        return node.__zoom;
      }
      function nopropagation(event) {
        event.stopImmediatePropagation();
      }
      function noevent(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      function defaultFilter(event) {
        return (!event.ctrlKey || event.type === "wheel") && !event.button;
      }
      function defaultExtent() {
        var e = this;
        if (e instanceof SVGElement) {
          e = e.ownerSVGElement || e;
          if (e.hasAttribute("viewBox")) {
            e = e.viewBox.baseVal;
            return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
          }
          return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
        }
        return [[0, 0], [e.clientWidth, e.clientHeight]];
      }
      function defaultTransform() {
        return this.__zoom || identity;
      }
      function defaultWheelDelta(event) {
        return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * (event.ctrlKey ? 10 : 1);
      }
      function defaultTouchable() {
        return navigator.maxTouchPoints || "ontouchstart" in this;
      }
      function defaultConstrain(transform2, extent5, translateExtent) {
        var dx0 = transform2.invertX(extent5[0][0]) - translateExtent[0][0], dx1 = transform2.invertX(extent5[1][0]) - translateExtent[1][0], dy0 = transform2.invertY(extent5[0][1]) - translateExtent[0][1], dy1 = transform2.invertY(extent5[1][1]) - translateExtent[1][1];
        return transform2.translate(dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1), dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1));
      }
      function zoom() {
        var filter = defaultFilter, extent5 = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = d3Interpolate.interpolateZoom, listeners = d3Dispatch.dispatch("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
        function zoom2(selection) {
          selection.property("__zoom", defaultTransform).on("wheel.zoom", wheeled).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
        }
        zoom2.transform = function(collection, transform2, point, event) {
          var selection = collection.selection ? collection.selection() : collection;
          selection.property("__zoom", defaultTransform);
          if (collection !== selection) {
            schedule(collection, transform2, point, event);
          } else {
            selection.interrupt().each(function() {
              gesture(this, arguments).event(event).start().zoom(null, typeof transform2 === "function" ? transform2.apply(this, arguments) : transform2).end();
            });
          }
        };
        zoom2.scaleBy = function(selection, k, p, event) {
          zoom2.scaleTo(selection, function() {
            var k0 = this.__zoom.k, k1 = typeof k === "function" ? k.apply(this, arguments) : k;
            return k0 * k1;
          }, p, event);
        };
        zoom2.scaleTo = function(selection, k, p, event) {
          zoom2.transform(selection, function() {
            var e = extent5.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
            return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
          }, p, event);
        };
        zoom2.translateBy = function(selection, x, y, event) {
          zoom2.transform(selection, function() {
            return constrain(this.__zoom.translate(typeof x === "function" ? x.apply(this, arguments) : x, typeof y === "function" ? y.apply(this, arguments) : y), extent5.apply(this, arguments), translateExtent);
          }, null, event);
        };
        zoom2.translateTo = function(selection, x, y, p, event) {
          zoom2.transform(selection, function() {
            var e = extent5.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
            return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(typeof x === "function" ? -x.apply(this, arguments) : -x, typeof y === "function" ? -y.apply(this, arguments) : -y), e, translateExtent);
          }, p, event);
        };
        function scale(transform2, k) {
          k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
          return k === transform2.k ? transform2 : new Transform(k, transform2.x, transform2.y);
        }
        function translate(transform2, p0, p1) {
          var x = p0[0] - p1[0] * transform2.k, y = p0[1] - p1[1] * transform2.k;
          return x === transform2.x && y === transform2.y ? transform2 : new Transform(transform2.k, x, y);
        }
        function centroid(extent6) {
          return [(+extent6[0][0] + +extent6[1][0]) / 2, (+extent6[0][1] + +extent6[1][1]) / 2];
        }
        function schedule(transition, transform2, point, event) {
          transition.on("start.zoom", function() {
            gesture(this, arguments).event(event).start();
          }).on("interrupt.zoom end.zoom", function() {
            gesture(this, arguments).event(event).end();
          }).tween("zoom", function() {
            var that = this, args = arguments, g = gesture(that, args).event(event), e = extent5.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform2 === "function" ? transform2.apply(that, args) : transform2, i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
            return function(t) {
              if (t === 1)
                t = b;
              else {
                var l = i(t), k = w / l[2];
                t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
              }
              g.zoom(null, t);
            };
          });
        }
        function gesture(that, args, clean) {
          return !clean && that.__zooming || new Gesture(that, args);
        }
        function Gesture(that, args) {
          this.that = that;
          this.args = args;
          this.active = 0;
          this.sourceEvent = null;
          this.extent = extent5.apply(that, args);
          this.taps = 0;
        }
        Gesture.prototype = {
          event: function(event) {
            if (event)
              this.sourceEvent = event;
            return this;
          },
          start: function() {
            if (++this.active === 1) {
              this.that.__zooming = this;
              this.emit("start");
            }
            return this;
          },
          zoom: function(key, transform2) {
            if (this.mouse && key !== "mouse")
              this.mouse[1] = transform2.invert(this.mouse[0]);
            if (this.touch0 && key !== "touch")
              this.touch0[1] = transform2.invert(this.touch0[0]);
            if (this.touch1 && key !== "touch")
              this.touch1[1] = transform2.invert(this.touch1[0]);
            this.that.__zoom = transform2;
            this.emit("zoom");
            return this;
          },
          end: function() {
            if (--this.active === 0) {
              delete this.that.__zooming;
              this.emit("end");
            }
            return this;
          },
          emit: function(type) {
            var d = d3Selection.select(this.that).datum();
            listeners.call(type, this.that, new ZoomEvent(type, {
              sourceEvent: this.sourceEvent,
              target: zoom2,
              type,
              transform: this.that.__zoom,
              dispatch: listeners
            }), d);
          }
        };
        function wheeled(event, ...args) {
          if (!filter.apply(this, arguments))
            return;
          var g = gesture(this, args).event(event), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = d3Selection.pointer(event);
          if (g.wheel) {
            if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
              g.mouse[1] = t.invert(g.mouse[0] = p);
            }
            clearTimeout(g.wheel);
          } else if (t.k === k)
            return;
          else {
            g.mouse = [p, t.invert(p)];
            d3Transition.interrupt(this);
            g.start();
          }
          noevent(event);
          g.wheel = setTimeout(wheelidled, wheelDelay);
          g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
          function wheelidled() {
            g.wheel = null;
            g.end();
          }
        }
        function mousedowned(event, ...args) {
          if (touchending || !filter.apply(this, arguments))
            return;
          var g = gesture(this, args, true).event(event), v = d3Selection.select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = d3Selection.pointer(event, currentTarget), currentTarget = event.currentTarget, x0 = event.clientX, y0 = event.clientY;
          d3Drag.dragDisable(event.view);
          nopropagation(event);
          g.mouse = [p, this.__zoom.invert(p)];
          d3Transition.interrupt(this);
          g.start();
          function mousemoved(event2) {
            noevent(event2);
            if (!g.moved) {
              var dx = event2.clientX - x0, dy = event2.clientY - y0;
              g.moved = dx * dx + dy * dy > clickDistance2;
            }
            g.event(event2).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = d3Selection.pointer(event2, currentTarget), g.mouse[1]), g.extent, translateExtent));
          }
          function mouseupped(event2) {
            v.on("mousemove.zoom mouseup.zoom", null);
            d3Drag.dragEnable(event2.view, g.moved);
            noevent(event2);
            g.event(event2).end();
          }
        }
        function dblclicked(event, ...args) {
          if (!filter.apply(this, arguments))
            return;
          var t0 = this.__zoom, p0 = d3Selection.pointer(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? 0.5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent5.apply(this, args), translateExtent);
          noevent(event);
          if (duration > 0)
            d3Selection.select(this).transition().duration(duration).call(schedule, t1, p0, event);
          else
            d3Selection.select(this).call(zoom2.transform, t1, p0, event);
        }
        function touchstarted(event, ...args) {
          if (!filter.apply(this, arguments))
            return;
          var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
          nopropagation(event);
          for (i = 0; i < n; ++i) {
            t = touches[i], p = d3Selection.pointer(t, this);
            p = [p, this.__zoom.invert(p), t.identifier];
            if (!g.touch0)
              g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
            else if (!g.touch1 && g.touch0[2] !== p[2])
              g.touch1 = p, g.taps = 0;
          }
          if (touchstarting)
            touchstarting = clearTimeout(touchstarting);
          if (started) {
            if (g.taps < 2)
              touchfirst = p[0], touchstarting = setTimeout(function() {
                touchstarting = null;
              }, touchDelay);
            d3Transition.interrupt(this);
            g.start();
          }
        }
        function touchmoved(event, ...args) {
          if (!this.__zooming)
            return;
          var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
          noevent(event);
          for (i = 0; i < n; ++i) {
            t = touches[i], p = d3Selection.pointer(t, this);
            if (g.touch0 && g.touch0[2] === t.identifier)
              g.touch0[0] = p;
            else if (g.touch1 && g.touch1[2] === t.identifier)
              g.touch1[0] = p;
          }
          t = g.that.__zoom;
          if (g.touch1) {
            var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
            t = scale(t, Math.sqrt(dp / dl));
            p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
            l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
          } else if (g.touch0)
            p = g.touch0[0], l = g.touch0[1];
          else
            return;
          g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
        }
        function touchended(event, ...args) {
          if (!this.__zooming)
            return;
          var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
          nopropagation(event);
          if (touchending)
            clearTimeout(touchending);
          touchending = setTimeout(function() {
            touchending = null;
          }, touchDelay);
          for (i = 0; i < n; ++i) {
            t = touches[i];
            if (g.touch0 && g.touch0[2] === t.identifier)
              delete g.touch0;
            else if (g.touch1 && g.touch1[2] === t.identifier)
              delete g.touch1;
          }
          if (g.touch1 && !g.touch0)
            g.touch0 = g.touch1, delete g.touch1;
          if (g.touch0)
            g.touch0[1] = this.__zoom.invert(g.touch0[0]);
          else {
            g.end();
            if (g.taps === 2) {
              t = d3Selection.pointer(t, this);
              if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
                var p = d3Selection.select(this).on("dblclick.zoom");
                if (p)
                  p.apply(this, arguments);
              }
            }
          }
        }
        zoom2.wheelDelta = function(_) {
          return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom2) : wheelDelta;
        };
        zoom2.filter = function(_) {
          return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom2) : filter;
        };
        zoom2.touchable = function(_) {
          return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom2) : touchable;
        };
        zoom2.extent = function(_) {
          return arguments.length ? (extent5 = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom2) : extent5;
        };
        zoom2.scaleExtent = function(_) {
          return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom2) : [scaleExtent[0], scaleExtent[1]];
        };
        zoom2.translateExtent = function(_) {
          return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom2) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
        };
        zoom2.constrain = function(_) {
          return arguments.length ? (constrain = _, zoom2) : constrain;
        };
        zoom2.duration = function(_) {
          return arguments.length ? (duration = +_, zoom2) : duration;
        };
        zoom2.interpolate = function(_) {
          return arguments.length ? (interpolate = _, zoom2) : interpolate;
        };
        zoom2.on = function() {
          var value = listeners.on.apply(listeners, arguments);
          return value === listeners ? zoom2 : value;
        };
        zoom2.clickDistance = function(_) {
          return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom2) : Math.sqrt(clickDistance2);
        };
        zoom2.tapDistance = function(_) {
          return arguments.length ? (tapDistance = +_, zoom2) : tapDistance;
        };
        return zoom2;
      }
      exports2.zoom = zoom;
      exports2.zoomIdentity = identity;
      exports2.zoomTransform = transform;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/d3@6.7.0/node_modules/d3/dist/d3.node.js
var require_d3_node = __commonJS({
  "node_modules/.pnpm/d3@6.7.0/node_modules/d3/dist/d3.node.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var d3Array = require_d3_array();
    var d3Axis = require_d3_axis();
    var d3Brush = require_d3_brush();
    var d3Chord = require_d3_chord();
    var d3Color = require_d3_color();
    var d3Contour = require_d3_contour();
    var d3Delaunay = require_d3_delaunay();
    var d3Dispatch = require_d3_dispatch();
    var d3Drag = require_d3_drag();
    var d3Dsv = require_d3_dsv();
    var d3Ease = require_d3_ease();
    var d3Fetch = require_d3_fetch();
    var d3Force = require_d3_force();
    var d3Format = require_d3_format();
    var d3Geo = require_d3_geo();
    var d3Hierarchy = require_d3_hierarchy();
    var d3Interpolate = require_d3_interpolate();
    var d3Path = require_d3_path();
    var d3Polygon = require_d3_polygon();
    var d3Quadtree = require_d3_quadtree();
    var d3Random = require_d3_random();
    var d3Scale = require_d3_scale();
    var d3ScaleChromatic = require_d3_scale_chromatic();
    var d3Selection = require_d3_selection();
    var d3Shape = require_d3_shape();
    var d3Time = require_d3_time();
    var d3TimeFormat = require_d3_time_format();
    var d3Timer = require_d3_timer();
    var d3Transition = require_d3_transition();
    var d3Zoom = require_d3_zoom();
    var version2 = "6.7.0";
    exports.version = version2;
    Object.keys(d3Array).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Array[k];
          }
        });
    });
    Object.keys(d3Axis).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Axis[k];
          }
        });
    });
    Object.keys(d3Brush).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Brush[k];
          }
        });
    });
    Object.keys(d3Chord).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Chord[k];
          }
        });
    });
    Object.keys(d3Color).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Color[k];
          }
        });
    });
    Object.keys(d3Contour).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Contour[k];
          }
        });
    });
    Object.keys(d3Delaunay).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Delaunay[k];
          }
        });
    });
    Object.keys(d3Dispatch).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Dispatch[k];
          }
        });
    });
    Object.keys(d3Drag).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Drag[k];
          }
        });
    });
    Object.keys(d3Dsv).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Dsv[k];
          }
        });
    });
    Object.keys(d3Ease).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Ease[k];
          }
        });
    });
    Object.keys(d3Fetch).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Fetch[k];
          }
        });
    });
    Object.keys(d3Force).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Force[k];
          }
        });
    });
    Object.keys(d3Format).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Format[k];
          }
        });
    });
    Object.keys(d3Geo).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Geo[k];
          }
        });
    });
    Object.keys(d3Hierarchy).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Hierarchy[k];
          }
        });
    });
    Object.keys(d3Interpolate).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Interpolate[k];
          }
        });
    });
    Object.keys(d3Path).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Path[k];
          }
        });
    });
    Object.keys(d3Polygon).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Polygon[k];
          }
        });
    });
    Object.keys(d3Quadtree).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Quadtree[k];
          }
        });
    });
    Object.keys(d3Random).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Random[k];
          }
        });
    });
    Object.keys(d3Scale).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Scale[k];
          }
        });
    });
    Object.keys(d3ScaleChromatic).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3ScaleChromatic[k];
          }
        });
    });
    Object.keys(d3Selection).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Selection[k];
          }
        });
    });
    Object.keys(d3Shape).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Shape[k];
          }
        });
    });
    Object.keys(d3Time).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Time[k];
          }
        });
    });
    Object.keys(d3TimeFormat).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3TimeFormat[k];
          }
        });
    });
    Object.keys(d3Timer).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Timer[k];
          }
        });
    });
    Object.keys(d3Transition).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Transition[k];
          }
        });
    });
    Object.keys(d3Zoom).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return d3Zoom[k];
          }
        });
    });
  }
});

// node_modules/.pnpm/midi-parser-js@4.0.4/node_modules/midi-parser-js/src/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/midi-parser-js@4.0.4/node_modules/midi-parser-js/src/main.js"(exports, module2) {
    (function() {
      "use strict";
      const _atob = function(string) {
        let b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        let b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
        string = string.replace(/^.*?base64,/, "");
        string = String(string).replace(/[\t\n\f\r ]+/g, "");
        if (!b64re.test(string))
          throw new TypeError("Failed to execute _atob() : The string to be decoded is not correctly encoded.");
        string += "==".slice(2 - (string.length & 3));
        let bitmap, result = "";
        let r1, r2, i = 0;
        for (; i < string.length; ) {
          bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 | (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));
          result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
        }
        return result;
      };
      const MidiParser = {
        debug: false,
        parse: function(input, _callback) {
          if (input instanceof Uint8Array)
            return MidiParser.Uint8(input);
          else if (typeof input === "string")
            return MidiParser.Base64(input);
          else if (input instanceof HTMLElement && input.type === "file")
            return MidiParser.addListener(input, _callback);
          else
            throw new Error("MidiParser.parse() : Invalid input provided");
        },
        addListener: function(_fileElement, _callback) {
          if (!File || !FileReader)
            throw new Error("The File|FileReader APIs are not supported in this browser. Use instead MidiParser.Base64() or MidiParser.Uint8()");
          if (_fileElement === void 0 || !(_fileElement instanceof HTMLElement) || _fileElement.tagName !== "INPUT" || _fileElement.type.toLowerCase() !== "file") {
            console.warn("MidiParser.addListener() : Provided element is not a valid FILE INPUT element");
            return false;
          }
          _callback = _callback || function() {
          };
          _fileElement.addEventListener("change", function(InputEvt) {
            if (!InputEvt.target.files.length)
              return false;
            console.log("MidiParser.addListener() : File detected in INPUT ELEMENT processing data..");
            let reader = new FileReader();
            reader.readAsArrayBuffer(InputEvt.target.files[0]);
            reader.onload = function(e) {
              _callback(MidiParser.Uint8(new Uint8Array(e.target.result)));
            };
          });
        },
        Base64: function(b64String) {
          b64String = String(b64String);
          let raw = _atob(b64String);
          let rawLength = raw.length;
          let t_array = new Uint8Array(new ArrayBuffer(rawLength));
          for (let i = 0; i < rawLength; i++)
            t_array[i] = raw.charCodeAt(i);
          return MidiParser.Uint8(t_array);
        },
        Uint8: function(FileAsUint8Array) {
          let file = {
            data: null,
            pointer: 0,
            movePointer: function(_bytes) {
              this.pointer += _bytes;
              return this.pointer;
            },
            readInt: function(_bytes) {
              _bytes = Math.min(_bytes, this.data.byteLength - this.pointer);
              if (_bytes < 1)
                return -1;
              let value = 0;
              if (_bytes > 1) {
                for (let i = 1; i <= _bytes - 1; i++) {
                  value += this.data.getUint8(this.pointer) * Math.pow(256, _bytes - i);
                  this.pointer++;
                }
              }
              value += this.data.getUint8(this.pointer);
              this.pointer++;
              return value;
            },
            readStr: function(_bytes) {
              let text = "";
              for (let char = 1; char <= _bytes; char++)
                text += String.fromCharCode(this.readInt(1));
              return text;
            },
            readIntVLV: function() {
              let value = 0;
              if (this.pointer >= this.data.byteLength) {
                return -1;
              } else if (this.data.getUint8(this.pointer) < 128) {
                value = this.readInt(1);
              } else {
                let FirstBytes = [];
                while (this.data.getUint8(this.pointer) >= 128) {
                  FirstBytes.push(this.readInt(1) - 128);
                }
                let lastByte = this.readInt(1);
                for (let dt = 1; dt <= FirstBytes.length; dt++) {
                  value += FirstBytes[FirstBytes.length - dt] * Math.pow(128, dt);
                }
                value += lastByte;
              }
              return value;
            }
          };
          file.data = new DataView(FileAsUint8Array.buffer, FileAsUint8Array.byteOffset, FileAsUint8Array.byteLength);
          if (file.readInt(4) !== 1297377380) {
            console.warn("Header validation failed (not MIDI standard or file corrupt.)");
            return false;
          }
          let headerSize = file.readInt(4);
          let MIDI = {};
          MIDI.formatType = file.readInt(2);
          MIDI.tracks = file.readInt(2);
          MIDI.track = [];
          let timeDivisionByte1 = file.readInt(1);
          let timeDivisionByte2 = file.readInt(1);
          if (timeDivisionByte1 >= 128) {
            MIDI.timeDivision = [];
            MIDI.timeDivision[0] = timeDivisionByte1 - 128;
            MIDI.timeDivision[1] = timeDivisionByte2;
          } else
            MIDI.timeDivision = timeDivisionByte1 * 256 + timeDivisionByte2;
          for (let t = 1; t <= MIDI.tracks; t++) {
            MIDI.track[t - 1] = { event: [] };
            let headerValidation = file.readInt(4);
            if (headerValidation === -1)
              break;
            if (headerValidation !== 1297379947)
              return false;
            file.readInt(4);
            let e = 0;
            let endOfTrack = false;
            let statusByte;
            let laststatusByte;
            while (!endOfTrack) {
              e++;
              MIDI.track[t - 1].event[e - 1] = {};
              MIDI.track[t - 1].event[e - 1].deltaTime = file.readIntVLV();
              statusByte = file.readInt(1);
              if (statusByte === -1)
                break;
              else if (statusByte >= 128)
                laststatusByte = statusByte;
              else {
                statusByte = laststatusByte;
                file.movePointer(-1);
              }
              if (statusByte === 255) {
                MIDI.track[t - 1].event[e - 1].type = 255;
                MIDI.track[t - 1].event[e - 1].metaType = file.readInt(1);
                let metaEventLength = file.readIntVLV();
                switch (MIDI.track[t - 1].event[e - 1].metaType) {
                  case 47:
                  case -1:
                    endOfTrack = true;
                    break;
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                  case 5:
                  case 7:
                  case 6:
                    MIDI.track[t - 1].event[e - 1].data = file.readStr(metaEventLength);
                    break;
                  case 33:
                  case 89:
                  case 81:
                    MIDI.track[t - 1].event[e - 1].data = file.readInt(metaEventLength);
                    break;
                  case 84:
                    MIDI.track[t - 1].event[e - 1].data = [];
                    MIDI.track[t - 1].event[e - 1].data[0] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[1] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[2] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[3] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[4] = file.readInt(1);
                    break;
                  case 88:
                    MIDI.track[t - 1].event[e - 1].data = [];
                    MIDI.track[t - 1].event[e - 1].data[0] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[1] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[2] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[3] = file.readInt(1);
                    break;
                  default:
                    if (this.customInterpreter !== null) {
                      MIDI.track[t - 1].event[e - 1].data = this.customInterpreter(MIDI.track[t - 1].event[e - 1].metaType, file, metaEventLength);
                    }
                    if (this.customInterpreter === null || MIDI.track[t - 1].event[e - 1].data === false) {
                      file.readInt(metaEventLength);
                      MIDI.track[t - 1].event[e - 1].data = file.readInt(metaEventLength);
                      if (this.debug)
                        console.info("Unimplemented 0xFF meta event! data block readed as Integer");
                    }
                }
              } else {
                statusByte = statusByte.toString(16).split("");
                if (!statusByte[1])
                  statusByte.unshift("0");
                MIDI.track[t - 1].event[e - 1].type = parseInt(statusByte[0], 16);
                MIDI.track[t - 1].event[e - 1].channel = parseInt(statusByte[1], 16);
                switch (MIDI.track[t - 1].event[e - 1].type) {
                  case 15: {
                    if (this.customInterpreter !== null) {
                      MIDI.track[t - 1].event[e - 1].data = this.customInterpreter(MIDI.track[t - 1].event[e - 1].type, file, false);
                    }
                    if (this.customInterpreter === null || MIDI.track[t - 1].event[e - 1].data === false) {
                      let event_length = file.readIntVLV();
                      MIDI.track[t - 1].event[e - 1].data = file.readInt(event_length);
                      if (this.debug)
                        console.info("Unimplemented 0xF exclusive events! data block readed as Integer");
                    }
                    break;
                  }
                  case 10:
                  case 11:
                  case 14:
                  case 8:
                  case 9:
                    MIDI.track[t - 1].event[e - 1].data = [];
                    MIDI.track[t - 1].event[e - 1].data[0] = file.readInt(1);
                    MIDI.track[t - 1].event[e - 1].data[1] = file.readInt(1);
                    break;
                  case 12:
                  case 13:
                    MIDI.track[t - 1].event[e - 1].data = file.readInt(1);
                    break;
                  case -1:
                    endOfTrack = true;
                    break;
                  default:
                    if (this.customInterpreter !== null) {
                      MIDI.track[t - 1].event[e - 1].data = this.customInterpreter(MIDI.track[t - 1].event[e - 1].metaType, file, false);
                    }
                    if (this.customInterpreter === null || MIDI.track[t - 1].event[e - 1].data === false) {
                      console.log("Unknown EVENT detected... reading cancelled!");
                      return false;
                    }
                }
              }
            }
          }
          return MIDI;
        },
        customInterpreter: null
      };
      if (typeof module2 !== "undefined")
        module2.exports = MidiParser;
      else {
        let _global = typeof window === "object" && window.self === window && window || typeof self === "object" && self.self === self && self || typeof global === "object" && global.global === global && global;
        _global.MidiParser = MidiParser;
      }
    })();
  }
});

// node_modules/.pnpm/@tonaljs+core@4.6.5/node_modules/@tonaljs/core/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/@tonaljs+core@4.6.5/node_modules/@tonaljs/core/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Core = {}));
    })(exports, function(exports2) {
      "use strict";
      var fillStr = function(s, n) {
        return Array(Math.abs(n) + 1).join(s);
      };
      function deprecate(original, alternative, fn) {
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          console.warn(original + " is deprecated. Use " + alternative + ".");
          return fn.apply(this, args);
        };
      }
      function isNamed(src) {
        return src !== null && typeof src === "object" && typeof src.name === "string" ? true : false;
      }
      function isPitch(pitch) {
        return pitch !== null && typeof pitch === "object" && typeof pitch.step === "number" && typeof pitch.alt === "number" ? true : false;
      }
      var FIFTHS = [0, 2, 4, -1, 1, 3, 5];
      var STEPS_TO_OCTS = FIFTHS.map(function(fifths) {
        return Math.floor(fifths * 7 / 12);
      });
      function encode(pitch) {
        var step = pitch.step, alt = pitch.alt, oct = pitch.oct, _a = pitch.dir, dir = _a === void 0 ? 1 : _a;
        var f = FIFTHS[step] + 7 * alt;
        if (oct === void 0) {
          return [dir * f];
        }
        var o = oct - STEPS_TO_OCTS[step] - 4 * alt;
        return [dir * f, dir * o];
      }
      var FIFTHS_TO_STEPS = [3, 0, 4, 1, 5, 2, 6];
      function decode(coord) {
        var f = coord[0], o = coord[1], dir = coord[2];
        var step = FIFTHS_TO_STEPS[unaltered(f)];
        var alt = Math.floor((f + 1) / 7);
        if (o === void 0) {
          return { step, alt, dir };
        }
        var oct = o + 4 * alt + STEPS_TO_OCTS[step];
        return { step, alt, oct, dir };
      }
      function unaltered(f) {
        var i = (f + 1) % 7;
        return i < 0 ? 7 + i : i;
      }
      var NoNote = { empty: true, name: "", pc: "", acc: "" };
      var cache$1 = /* @__PURE__ */ new Map();
      var stepToLetter = function(step) {
        return "CDEFGAB".charAt(step);
      };
      var altToAcc = function(alt) {
        return alt < 0 ? fillStr("b", -alt) : fillStr("#", alt);
      };
      var accToAlt = function(acc) {
        return acc[0] === "b" ? -acc.length : acc.length;
      };
      function note(src) {
        var cached = cache$1.get(src);
        if (cached) {
          return cached;
        }
        var value = typeof src === "string" ? parse$1(src) : isPitch(src) ? note(pitchName$1(src)) : isNamed(src) ? note(src.name) : NoNote;
        cache$1.set(src, value);
        return value;
      }
      var REGEX$1 = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;
      function tokenizeNote(str) {
        var m = REGEX$1.exec(str);
        return [m[1].toUpperCase(), m[2].replace(/x/g, "##"), m[3], m[4]];
      }
      function coordToNote(noteCoord) {
        return note(decode(noteCoord));
      }
      var mod = function(n, m) {
        return (n % m + m) % m;
      };
      var SEMI = [0, 2, 4, 5, 7, 9, 11];
      function parse$1(noteName) {
        var tokens = tokenizeNote(noteName);
        if (tokens[0] === "" || tokens[3] !== "") {
          return NoNote;
        }
        var letter = tokens[0];
        var acc = tokens[1];
        var octStr = tokens[2];
        var step = (letter.charCodeAt(0) + 3) % 7;
        var alt = accToAlt(acc);
        var oct = octStr.length ? +octStr : void 0;
        var coord = encode({ step, alt, oct });
        var name = letter + acc + octStr;
        var pc = letter + acc;
        var chroma = (SEMI[step] + alt + 120) % 12;
        var height = oct === void 0 ? mod(SEMI[step] + alt, 12) - 12 * 99 : SEMI[step] + alt + 12 * (oct + 1);
        var midi = height >= 0 && height <= 127 ? height : null;
        var freq = oct === void 0 ? null : Math.pow(2, (height - 69) / 12) * 440;
        return {
          empty: false,
          acc,
          alt,
          chroma,
          coord,
          freq,
          height,
          letter,
          midi,
          name,
          oct,
          pc,
          step
        };
      }
      function pitchName$1(props) {
        var step = props.step, alt = props.alt, oct = props.oct;
        var letter = stepToLetter(step);
        if (!letter) {
          return "";
        }
        var pc = letter + altToAcc(alt);
        return oct || oct === 0 ? pc + oct : pc;
      }
      var NoInterval = { empty: true, name: "", acc: "" };
      var INTERVAL_TONAL_REGEX = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})";
      var INTERVAL_SHORTHAND_REGEX = "(AA|A|P|M|m|d|dd)([-+]?\\d+)";
      var REGEX = new RegExp("^" + INTERVAL_TONAL_REGEX + "|" + INTERVAL_SHORTHAND_REGEX + "$");
      function tokenizeInterval(str) {
        var m = REGEX.exec("" + str);
        if (m === null) {
          return ["", ""];
        }
        return m[1] ? [m[1], m[2]] : [m[4], m[3]];
      }
      var cache = {};
      function interval(src) {
        return typeof src === "string" ? cache[src] || (cache[src] = parse2(src)) : isPitch(src) ? interval(pitchName(src)) : isNamed(src) ? interval(src.name) : NoInterval;
      }
      var SIZES = [0, 2, 4, 5, 7, 9, 11];
      var TYPES = "PMMPPMM";
      function parse2(str) {
        var tokens = tokenizeInterval(str);
        if (tokens[0] === "") {
          return NoInterval;
        }
        var num = +tokens[0];
        var q = tokens[1];
        var step = (Math.abs(num) - 1) % 7;
        var t = TYPES[step];
        if (t === "M" && q === "P") {
          return NoInterval;
        }
        var type = t === "M" ? "majorable" : "perfectable";
        var name = "" + num + q;
        var dir = num < 0 ? -1 : 1;
        var simple = num === 8 || num === -8 ? num : dir * (step + 1);
        var alt = qToAlt(type, q);
        var oct = Math.floor((Math.abs(num) - 1) / 7);
        var semitones = dir * (SIZES[step] + alt + 12 * oct);
        var chroma = (dir * (SIZES[step] + alt) % 12 + 12) % 12;
        var coord = encode({ step, alt, oct, dir });
        return {
          empty: false,
          name,
          num,
          q,
          step,
          alt,
          dir,
          type,
          simple,
          semitones,
          chroma,
          coord,
          oct
        };
      }
      function coordToInterval(coord, forceDescending) {
        var f = coord[0], _a = coord[1], o = _a === void 0 ? 0 : _a;
        var isDescending = f * 7 + o * 12 < 0;
        var ivl = forceDescending || isDescending ? [-f, -o, -1] : [f, o, 1];
        return interval(decode(ivl));
      }
      function qToAlt(type, q) {
        return q === "M" && type === "majorable" || q === "P" && type === "perfectable" ? 0 : q === "m" && type === "majorable" ? -1 : /^A+$/.test(q) ? q.length : /^d+$/.test(q) ? -1 * (type === "perfectable" ? q.length : q.length + 1) : 0;
      }
      function pitchName(props) {
        var step = props.step, alt = props.alt, _a = props.oct, oct = _a === void 0 ? 0 : _a, dir = props.dir;
        if (!dir) {
          return "";
        }
        var calcNum = step + 1 + 7 * oct;
        var num = calcNum === 0 ? step + 1 : calcNum;
        var d = dir < 0 ? "-" : "";
        var type = TYPES[step] === "M" ? "majorable" : "perfectable";
        var name = d + num + altToQ(type, alt);
        return name;
      }
      function altToQ(type, alt) {
        if (alt === 0) {
          return type === "majorable" ? "M" : "P";
        } else if (alt === -1 && type === "majorable") {
          return "m";
        } else if (alt > 0) {
          return fillStr("A", alt);
        } else {
          return fillStr("d", type === "perfectable" ? alt : alt + 1);
        }
      }
      function transpose(noteName, intervalName) {
        var note$1 = note(noteName);
        var interval$1 = interval(intervalName);
        if (note$1.empty || interval$1.empty) {
          return "";
        }
        var noteCoord = note$1.coord;
        var intervalCoord = interval$1.coord;
        var tr = noteCoord.length === 1 ? [noteCoord[0] + intervalCoord[0]] : [noteCoord[0] + intervalCoord[0], noteCoord[1] + intervalCoord[1]];
        return coordToNote(tr).name;
      }
      function distance(fromNote, toNote) {
        var from = note(fromNote);
        var to = note(toNote);
        if (from.empty || to.empty) {
          return "";
        }
        var fcoord = from.coord;
        var tcoord = to.coord;
        var fifths = tcoord[0] - fcoord[0];
        var octs = fcoord.length === 2 && tcoord.length === 2 ? tcoord[1] - fcoord[1] : -Math.floor(fifths * 7 / 12);
        var forceDescending = to.height === from.height && to.midi !== null && from.midi !== null && from.step > to.step;
        return coordToInterval([fifths, octs], forceDescending).name;
      }
      exports2.accToAlt = accToAlt;
      exports2.altToAcc = altToAcc;
      exports2.coordToInterval = coordToInterval;
      exports2.coordToNote = coordToNote;
      exports2.decode = decode;
      exports2.deprecate = deprecate;
      exports2.distance = distance;
      exports2.encode = encode;
      exports2.fillStr = fillStr;
      exports2.interval = interval;
      exports2.isNamed = isNamed;
      exports2.isPitch = isPitch;
      exports2.note = note;
      exports2.stepToLetter = stepToLetter;
      exports2.tokenizeInterval = tokenizeInterval;
      exports2.tokenizeNote = tokenizeNote;
      exports2.transpose = transpose;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+abc-notation@4.6.5/node_modules/@tonaljs/abc-notation/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/.pnpm/@tonaljs+abc-notation@4.6.5/node_modules/@tonaljs/abc-notation/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/core"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.AbcNotation = {}, global2.core));
    })(exports, function(exports2, core) {
      "use strict";
      var fillStr = function(character, times) {
        return Array(times + 1).join(character);
      };
      var REGEX = /^(_{1,}|=|\^{1,}|)([abcdefgABCDEFG])([,']*)$/;
      function tokenize(str) {
        var m = REGEX.exec(str);
        if (!m) {
          return ["", "", ""];
        }
        return [m[1], m[2], m[3]];
      }
      function abcToScientificNotation(str) {
        var _a = tokenize(str), acc = _a[0], letter = _a[1], oct = _a[2];
        if (letter === "") {
          return "";
        }
        var o = 4;
        for (var i = 0; i < oct.length; i++) {
          o += oct.charAt(i) === "," ? -1 : 1;
        }
        var a = acc[0] === "_" ? acc.replace(/_/g, "b") : acc[0] === "^" ? acc.replace(/\^/g, "#") : "";
        return letter.charCodeAt(0) > 96 ? letter.toUpperCase() + a + (o + 1) : letter + a + o;
      }
      function scientificToAbcNotation(str) {
        var n = core.note(str);
        if (n.empty || !n.oct && n.oct !== 0) {
          return "";
        }
        var letter = n.letter, acc = n.acc, oct = n.oct;
        var a = acc[0] === "b" ? acc.replace(/b/g, "_") : acc.replace(/#/g, "^");
        var l = oct > 4 ? letter.toLowerCase() : letter;
        var o = oct === 5 ? "" : oct > 4 ? fillStr("'", oct - 5) : fillStr(",", 4 - oct);
        return a + l + o;
      }
      function transpose(note, interval) {
        return scientificToAbcNotation(core.transpose(abcToScientificNotation(note), interval));
      }
      function distance(from, to) {
        return core.distance(abcToScientificNotation(from), abcToScientificNotation(to));
      }
      var index = {
        abcToScientificNotation,
        scientificToAbcNotation,
        tokenize,
        transpose,
        distance
      };
      exports2.abcToScientificNotation = abcToScientificNotation;
      exports2["default"] = index;
      exports2.distance = distance;
      exports2.scientificToAbcNotation = scientificToAbcNotation;
      exports2.tokenize = tokenize;
      exports2.transpose = transpose;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+array@4.6.5/node_modules/@tonaljs/array/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/.pnpm/@tonaljs+array@4.6.5/node_modules/@tonaljs/array/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/core"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Array = {}, global2.core));
    })(exports, function(exports2, core) {
      "use strict";
      function ascR(b, n) {
        var a = [];
        for (; n--; a[n] = n + b)
          ;
        return a;
      }
      function descR(b, n) {
        var a = [];
        for (; n--; a[n] = b - n)
          ;
        return a;
      }
      function range(from, to) {
        return from < to ? ascR(from, to - from + 1) : descR(from, from - to + 1);
      }
      function rotate(times, arr) {
        var len = arr.length;
        var n = (times % len + len) % len;
        return arr.slice(n, len).concat(arr.slice(0, n));
      }
      function compact(arr) {
        return arr.filter(function(n) {
          return n === 0 || n;
        });
      }
      function sortedNoteNames(notes) {
        var valid = notes.map(function(n) {
          return core.note(n);
        }).filter(function(n) {
          return !n.empty;
        });
        return valid.sort(function(a, b) {
          return a.height - b.height;
        }).map(function(n) {
          return n.name;
        });
      }
      function sortedUniqNoteNames(arr) {
        return sortedNoteNames(arr).filter(function(n, i, a) {
          return i === 0 || n !== a[i - 1];
        });
      }
      function shuffle(arr, rnd) {
        if (rnd === void 0) {
          rnd = Math.random;
        }
        var i;
        var t;
        var m = arr.length;
        while (m) {
          i = Math.floor(rnd() * m--);
          t = arr[m];
          arr[m] = arr[i];
          arr[i] = t;
        }
        return arr;
      }
      function permutations(arr) {
        if (arr.length === 0) {
          return [[]];
        }
        return permutations(arr.slice(1)).reduce(function(acc, perm) {
          return acc.concat(arr.map(function(e, pos) {
            var newPerm = perm.slice();
            newPerm.splice(pos, 0, arr[0]);
            return newPerm;
          }));
        }, []);
      }
      exports2.compact = compact;
      exports2.permutations = permutations;
      exports2.range = range;
      exports2.rotate = rotate;
      exports2.shuffle = shuffle;
      exports2.sortedNoteNames = sortedNoteNames;
      exports2.sortedUniqNoteNames = sortedUniqNoteNames;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+collection@4.6.2/node_modules/@tonaljs/collection/dist/index.js
var require_dist4 = __commonJS({
  "node_modules/.pnpm/@tonaljs+collection@4.6.2/node_modules/@tonaljs/collection/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Collection = {}));
    })(exports, function(exports2) {
      "use strict";
      function ascR(b, n) {
        var a = [];
        for (; n--; a[n] = n + b)
          ;
        return a;
      }
      function descR(b, n) {
        var a = [];
        for (; n--; a[n] = b - n)
          ;
        return a;
      }
      function range(from, to) {
        return from < to ? ascR(from, to - from + 1) : descR(from, from - to + 1);
      }
      function rotate(times, arr) {
        var len = arr.length;
        var n = (times % len + len) % len;
        return arr.slice(n, len).concat(arr.slice(0, n));
      }
      function compact(arr) {
        return arr.filter(function(n) {
          return n === 0 || n;
        });
      }
      function shuffle(arr, rnd) {
        if (rnd === void 0) {
          rnd = Math.random;
        }
        var i;
        var t;
        var m = arr.length;
        while (m) {
          i = Math.floor(rnd() * m--);
          t = arr[m];
          arr[m] = arr[i];
          arr[i] = t;
        }
        return arr;
      }
      function permutations(arr) {
        if (arr.length === 0) {
          return [[]];
        }
        return permutations(arr.slice(1)).reduce(function(acc, perm) {
          return acc.concat(arr.map(function(e, pos) {
            var newPerm = perm.slice();
            newPerm.splice(pos, 0, arr[0]);
            return newPerm;
          }));
        }, []);
      }
      var index = {
        compact,
        permutations,
        range,
        rotate,
        shuffle
      };
      exports2.compact = compact;
      exports2.default = index;
      exports2.permutations = permutations;
      exports2.range = range;
      exports2.rotate = rotate;
      exports2.shuffle = shuffle;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+pcset@4.6.5/node_modules/@tonaljs/pcset/dist/index.js
var require_dist5 = __commonJS({
  "node_modules/.pnpm/@tonaljs+pcset@4.6.5/node_modules/@tonaljs/pcset/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist4(), require_dist()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/collection", "@tonaljs/core"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Pcset = {}, global2.collection, global2.core));
    })(exports, function(exports2, collection, core) {
      "use strict";
      var _a;
      var EmptyPcset = {
        empty: true,
        name: "",
        setNum: 0,
        chroma: "000000000000",
        normalized: "000000000000",
        intervals: []
      };
      var setNumToChroma = function(num2) {
        return Number(num2).toString(2);
      };
      var chromaToNumber = function(chroma2) {
        return parseInt(chroma2, 2);
      };
      var REGEX = /^[01]{12}$/;
      function isChroma(set) {
        return REGEX.test(set);
      }
      var isPcsetNum = function(set) {
        return typeof set === "number" && set >= 0 && set <= 4095;
      };
      var isPcset = function(set) {
        return set && isChroma(set.chroma);
      };
      var cache = (_a = {}, _a[EmptyPcset.chroma] = EmptyPcset, _a);
      function get(src) {
        var chroma2 = isChroma(src) ? src : isPcsetNum(src) ? setNumToChroma(src) : Array.isArray(src) ? listToChroma(src) : isPcset(src) ? src.chroma : EmptyPcset.chroma;
        return cache[chroma2] = cache[chroma2] || chromaToPcset(chroma2);
      }
      var pcset = core.deprecate("Pcset.pcset", "Pcset.get", get);
      var chroma = function(set) {
        return get(set).chroma;
      };
      var intervals = function(set) {
        return get(set).intervals;
      };
      var num = function(set) {
        return get(set).setNum;
      };
      var IVLS = [
        "1P",
        "2m",
        "2M",
        "3m",
        "3M",
        "4P",
        "5d",
        "5P",
        "6m",
        "6M",
        "7m",
        "7M"
      ];
      function chromaToIntervals(chroma2) {
        var intervals2 = [];
        for (var i = 0; i < 12; i++) {
          if (chroma2.charAt(i) === "1")
            intervals2.push(IVLS[i]);
        }
        return intervals2;
      }
      function chromas() {
        return collection.range(2048, 4095).map(setNumToChroma);
      }
      function modes(set, normalize) {
        if (normalize === void 0) {
          normalize = true;
        }
        var pcs = get(set);
        var binary = pcs.chroma.split("");
        return collection.compact(binary.map(function(_, i) {
          var r = collection.rotate(i, binary);
          return normalize && r[0] === "0" ? null : r.join("");
        }));
      }
      function isEqual(s1, s2) {
        return get(s1).setNum === get(s2).setNum;
      }
      function isSubsetOf(set) {
        var s = get(set).setNum;
        return function(notes) {
          var o = get(notes).setNum;
          return s && s !== o && (o & s) === o;
        };
      }
      function isSupersetOf(set) {
        var s = get(set).setNum;
        return function(notes) {
          var o = get(notes).setNum;
          return s && s !== o && (o | s) === o;
        };
      }
      function isNoteIncludedIn(set) {
        var s = get(set);
        return function(noteName) {
          var n = core.note(noteName);
          return s && !n.empty && s.chroma.charAt(n.chroma) === "1";
        };
      }
      var includes = isNoteIncludedIn;
      function filter(set) {
        var isIncluded = isNoteIncludedIn(set);
        return function(notes) {
          return notes.filter(isIncluded);
        };
      }
      var index = {
        get,
        chroma,
        num,
        intervals,
        chromas,
        isSupersetOf,
        isSubsetOf,
        isNoteIncludedIn,
        isEqual,
        filter,
        modes,
        pcset
      };
      function chromaRotations(chroma2) {
        var binary = chroma2.split("");
        return binary.map(function(_, i) {
          return collection.rotate(i, binary).join("");
        });
      }
      function chromaToPcset(chroma2) {
        var setNum = chromaToNumber(chroma2);
        var normalizedNum = chromaRotations(chroma2).map(chromaToNumber).filter(function(n) {
          return n >= 2048;
        }).sort()[0];
        var normalized = setNumToChroma(normalizedNum);
        var intervals2 = chromaToIntervals(chroma2);
        return {
          empty: false,
          name: "",
          setNum,
          chroma: chroma2,
          normalized,
          intervals: intervals2
        };
      }
      function listToChroma(set) {
        if (set.length === 0) {
          return EmptyPcset.chroma;
        }
        var pitch;
        var binary = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < set.length; i++) {
          pitch = core.note(set[i]);
          if (pitch.empty)
            pitch = core.interval(set[i]);
          if (!pitch.empty)
            binary[pitch.chroma] = 1;
        }
        return binary.join("");
      }
      exports2.EmptyPcset = EmptyPcset;
      exports2.chromaToIntervals = chromaToIntervals;
      exports2.chromas = chromas;
      exports2["default"] = index;
      exports2.filter = filter;
      exports2.get = get;
      exports2.includes = includes;
      exports2.isEqual = isEqual;
      exports2.isNoteIncludedIn = isNoteIncludedIn;
      exports2.isSubsetOf = isSubsetOf;
      exports2.isSupersetOf = isSupersetOf;
      exports2.modes = modes;
      exports2.pcset = pcset;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+chord-type@4.6.5/node_modules/@tonaljs/chord-type/dist/index.js
var require_dist6 = __commonJS({
  "node_modules/.pnpm/@tonaljs+chord-type@4.6.5/node_modules/@tonaljs/chord-type/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist(), require_dist5()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/core", "@tonaljs/pcset"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.ChordType = {}, global2.core, global2.pcset));
    })(exports, function(exports2, core, pcset) {
      "use strict";
      var __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var CHORDS = [
        ["1P 3M 5P", "major", "M ^ "],
        ["1P 3M 5P 7M", "major seventh", "maj7 \u0394 ma7 M7 Maj7 ^7"],
        ["1P 3M 5P 7M 9M", "major ninth", "maj9 \u03949 ^9"],
        ["1P 3M 5P 7M 9M 13M", "major thirteenth", "maj13 Maj13 ^13"],
        ["1P 3M 5P 6M", "sixth", "6 add6 add13 M6"],
        ["1P 3M 5P 6M 9M", "sixth/ninth", "6/9 69 M69"],
        ["1P 3M 6m 7M", "major seventh flat sixth", "M7b6 ^7b6"],
        [
          "1P 3M 5P 7M 11A",
          "major seventh sharp eleventh",
          "maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"
        ],
        ["1P 3m 5P", "minor", "m min -"],
        ["1P 3m 5P 7m", "minor seventh", "m7 min7 mi7 -7"],
        [
          "1P 3m 5P 7M",
          "minor/major seventh",
          "m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7"
        ],
        ["1P 3m 5P 6M", "minor sixth", "m6 -6"],
        ["1P 3m 5P 7m 9M", "minor ninth", "m9 -9"],
        ["1P 3m 5P 7M 9M", "minor/major ninth", "mM9 mMaj9 -^9"],
        ["1P 3m 5P 7m 9M 11P", "minor eleventh", "m11 -11"],
        ["1P 3m 5P 7m 9M 13M", "minor thirteenth", "m13 -13"],
        ["1P 3m 5d", "diminished", "dim \xB0 o"],
        ["1P 3m 5d 7d", "diminished seventh", "dim7 \xB07 o7"],
        ["1P 3m 5d 7m", "half-diminished", "m7b5 \xF8 -7b5 h7 h"],
        ["1P 3M 5P 7m", "dominant seventh", "7 dom"],
        ["1P 3M 5P 7m 9M", "dominant ninth", "9"],
        ["1P 3M 5P 7m 9M 13M", "dominant thirteenth", "13"],
        ["1P 3M 5P 7m 11A", "lydian dominant seventh", "7#11 7#4"],
        ["1P 3M 5P 7m 9m", "dominant flat ninth", "7b9"],
        ["1P 3M 5P 7m 9A", "dominant sharp ninth", "7#9"],
        ["1P 3M 7m 9m", "altered", "alt7"],
        ["1P 4P 5P", "suspended fourth", "sus4 sus"],
        ["1P 2M 5P", "suspended second", "sus2"],
        ["1P 4P 5P 7m", "suspended fourth seventh", "7sus4 7sus"],
        ["1P 5P 7m 9M 11P", "eleventh", "11"],
        [
          "1P 4P 5P 7m 9m",
          "suspended fourth flat ninth",
          "b9sus phryg 7b9sus 7b9sus4"
        ],
        ["1P 5P", "fifth", "5"],
        ["1P 3M 5A", "augmented", "aug + +5 ^#5"],
        ["1P 3m 5A", "minor augmented", "m#5 -#5 m+"],
        ["1P 3M 5A 7M", "augmented seventh", "maj7#5 maj7+5 +maj7 ^7#5"],
        [
          "1P 3M 5P 7M 9M 11A",
          "major sharp eleventh (lydian)",
          "maj9#11 \u03949#11 ^9#11"
        ],
        ["1P 2M 4P 5P", "", "sus24 sus4add9"],
        ["1P 3M 5A 7M 9M", "", "maj9#5 Maj9#5"],
        ["1P 3M 5A 7m", "", "7#5 +7 7+ 7aug aug7"],
        ["1P 3M 5A 7m 9A", "", "7#5#9 7#9#5 7alt"],
        ["1P 3M 5A 7m 9M", "", "9#5 9+"],
        ["1P 3M 5A 7m 9M 11A", "", "9#5#11"],
        ["1P 3M 5A 7m 9m", "", "7#5b9 7b9#5"],
        ["1P 3M 5A 7m 9m 11A", "", "7#5b9#11"],
        ["1P 3M 5A 9A", "", "+add#9"],
        ["1P 3M 5A 9M", "", "M#5add9 +add9"],
        ["1P 3M 5P 6M 11A", "", "M6#11 M6b5 6#11 6b5"],
        ["1P 3M 5P 6M 7M 9M", "", "M7add13"],
        ["1P 3M 5P 6M 9M 11A", "", "69#11"],
        ["1P 3m 5P 6M 9M", "", "m69 -69"],
        ["1P 3M 5P 6m 7m", "", "7b6"],
        ["1P 3M 5P 7M 9A 11A", "", "maj7#9#11"],
        ["1P 3M 5P 7M 9M 11A 13M", "", "M13#11 maj13#11 M13+4 M13#4"],
        ["1P 3M 5P 7M 9m", "", "M7b9"],
        ["1P 3M 5P 7m 11A 13m", "", "7#11b13 7b5b13"],
        ["1P 3M 5P 7m 13M", "", "7add6 67 7add13"],
        ["1P 3M 5P 7m 9A 11A", "", "7#9#11 7b5#9 7#9b5"],
        ["1P 3M 5P 7m 9A 11A 13M", "", "13#9#11"],
        ["1P 3M 5P 7m 9A 11A 13m", "", "7#9#11b13"],
        ["1P 3M 5P 7m 9A 13M", "", "13#9"],
        ["1P 3M 5P 7m 9A 13m", "", "7#9b13"],
        ["1P 3M 5P 7m 9M 11A", "", "9#11 9+4 9#4"],
        ["1P 3M 5P 7m 9M 11A 13M", "", "13#11 13+4 13#4"],
        ["1P 3M 5P 7m 9M 11A 13m", "", "9#11b13 9b5b13"],
        ["1P 3M 5P 7m 9m 11A", "", "7b9#11 7b5b9 7b9b5"],
        ["1P 3M 5P 7m 9m 11A 13M", "", "13b9#11"],
        ["1P 3M 5P 7m 9m 11A 13m", "", "7b9b13#11 7b9#11b13 7b5b9b13"],
        ["1P 3M 5P 7m 9m 13M", "", "13b9"],
        ["1P 3M 5P 7m 9m 13m", "", "7b9b13"],
        ["1P 3M 5P 7m 9m 9A", "", "7b9#9"],
        ["1P 3M 5P 9M", "", "Madd9 2 add9 add2"],
        ["1P 3M 5P 9m", "", "Maddb9"],
        ["1P 3M 5d", "", "Mb5"],
        ["1P 3M 5d 6M 7m 9M", "", "13b5"],
        ["1P 3M 5d 7M", "", "M7b5"],
        ["1P 3M 5d 7M 9M", "", "M9b5"],
        ["1P 3M 5d 7m", "", "7b5"],
        ["1P 3M 5d 7m 9M", "", "9b5"],
        ["1P 3M 7m", "", "7no5"],
        ["1P 3M 7m 13m", "", "7b13"],
        ["1P 3M 7m 9M", "", "9no5"],
        ["1P 3M 7m 9M 13M", "", "13no5"],
        ["1P 3M 7m 9M 13m", "", "9b13"],
        ["1P 3m 4P 5P", "", "madd4"],
        ["1P 3m 5P 6m 7M", "", "mMaj7b6"],
        ["1P 3m 5P 6m 7M 9M", "", "mMaj9b6"],
        ["1P 3m 5P 7m 11P", "", "m7add11 m7add4"],
        ["1P 3m 5P 9M", "", "madd9"],
        ["1P 3m 5d 6M 7M", "", "o7M7"],
        ["1P 3m 5d 7M", "", "oM7"],
        ["1P 3m 6m 7M", "", "mb6M7"],
        ["1P 3m 6m 7m", "", "m7#5"],
        ["1P 3m 6m 7m 9M", "", "m9#5"],
        ["1P 3m 5A 7m 9M 11P", "", "m11A"],
        ["1P 3m 6m 9m", "", "mb6b9"],
        ["1P 2M 3m 5d 7m", "", "m9b5"],
        ["1P 4P 5A 7M", "", "M7#5sus4"],
        ["1P 4P 5A 7M 9M", "", "M9#5sus4"],
        ["1P 4P 5A 7m", "", "7#5sus4"],
        ["1P 4P 5P 7M", "", "M7sus4"],
        ["1P 4P 5P 7M 9M", "", "M9sus4"],
        ["1P 4P 5P 7m 9M", "", "9sus4 9sus"],
        ["1P 4P 5P 7m 9M 13M", "", "13sus4 13sus"],
        ["1P 4P 5P 7m 9m 13m", "", "7sus4b9b13 7b9b13sus4"],
        ["1P 4P 7m 10m", "", "4 quartal"],
        ["1P 5P 7m 9m 11P", "", "11b9"]
      ];
      var NoChordType = __assign(__assign({}, pcset.EmptyPcset), { name: "", quality: "Unknown", intervals: [], aliases: [] });
      var dictionary = [];
      var index = {};
      function get(type) {
        return index[type] || NoChordType;
      }
      var chordType = core.deprecate("ChordType.chordType", "ChordType.get", get);
      function names() {
        return dictionary.map(function(chord) {
          return chord.name;
        }).filter(function(x) {
          return x;
        });
      }
      function symbols() {
        return dictionary.map(function(chord) {
          return chord.aliases[0];
        }).filter(function(x) {
          return x;
        });
      }
      function keys() {
        return Object.keys(index);
      }
      function all() {
        return dictionary.slice();
      }
      var entries = core.deprecate("ChordType.entries", "ChordType.all", all);
      function removeAll() {
        dictionary = [];
        index = {};
      }
      function add(intervals, aliases, fullName) {
        var quality = getQuality(intervals);
        var chord = __assign(__assign({}, pcset.get(intervals)), { name: fullName || "", quality, intervals, aliases });
        dictionary.push(chord);
        if (chord.name) {
          index[chord.name] = chord;
        }
        index[chord.setNum] = chord;
        index[chord.chroma] = chord;
        chord.aliases.forEach(function(alias) {
          return addAlias(chord, alias);
        });
      }
      function addAlias(chord, alias) {
        index[alias] = chord;
      }
      function getQuality(intervals) {
        var has = function(interval) {
          return intervals.indexOf(interval) !== -1;
        };
        return has("5A") ? "Augmented" : has("3M") ? "Major" : has("5d") ? "Diminished" : has("3m") ? "Minor" : "Unknown";
      }
      CHORDS.forEach(function(_a) {
        var ivls = _a[0], fullName = _a[1], names2 = _a[2];
        return add(ivls.split(" "), names2.split(" "), fullName);
      });
      dictionary.sort(function(a, b) {
        return a.setNum - b.setNum;
      });
      var index$1 = {
        names,
        symbols,
        get,
        all,
        add,
        removeAll,
        keys,
        entries,
        chordType
      };
      exports2.add = add;
      exports2.addAlias = addAlias;
      exports2.all = all;
      exports2.chordType = chordType;
      exports2["default"] = index$1;
      exports2.entries = entries;
      exports2.get = get;
      exports2.keys = keys;
      exports2.names = names;
      exports2.removeAll = removeAll;
      exports2.symbols = symbols;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+chord-detect@4.6.5/node_modules/@tonaljs/chord-detect/dist/index.js
var require_dist7 = __commonJS({
  "node_modules/.pnpm/@tonaljs+chord-detect@4.6.5/node_modules/@tonaljs/chord-detect/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist6(), require_dist(), require_dist5()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/chord-type", "@tonaljs/core", "@tonaljs/pcset"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.ChordDetect = {}, global2.chordType, global2.core, global2.pcset));
    })(exports, function(exports2, chordType, core, pcset) {
      "use strict";
      var namedSet = function(notes) {
        var pcToName = notes.reduce(function(record, n) {
          var chroma = core.note(n).chroma;
          if (chroma !== void 0) {
            record[chroma] = record[chroma] || core.note(n).name;
          }
          return record;
        }, {});
        return function(chroma) {
          return pcToName[chroma];
        };
      };
      function detect(source) {
        var notes = source.map(function(n) {
          return core.note(n).pc;
        }).filter(function(x) {
          return x;
        });
        if (core.note.length === 0) {
          return [];
        }
        var found = findExactMatches(notes, 1);
        return found.filter(function(chord) {
          return chord.weight;
        }).sort(function(a, b) {
          return b.weight - a.weight;
        }).map(function(chord) {
          return chord.name;
        });
      }
      function findExactMatches(notes, weight) {
        var tonic = notes[0];
        var tonicChroma = core.note(tonic).chroma;
        var noteName = namedSet(notes);
        var allModes = pcset.modes(notes, false);
        var found = [];
        allModes.forEach(function(mode, index2) {
          var chordTypes2 = chordType.all().filter(function(chordType2) {
            return chordType2.chroma === mode;
          });
          chordTypes2.forEach(function(chordType2) {
            var chordName = chordType2.aliases[0];
            var baseNote = noteName(index2);
            var isInversion = index2 !== tonicChroma;
            if (isInversion) {
              found.push({
                weight: 0.5 * weight,
                name: "" + baseNote + chordName + "/" + tonic
              });
            } else {
              found.push({ weight: 1 * weight, name: "" + baseNote + chordName });
            }
          });
        });
        return found;
      }
      var index = { detect };
      exports2["default"] = index;
      exports2.detect = detect;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+scale-type@4.6.5/node_modules/@tonaljs/scale-type/dist/index.js
var require_dist8 = __commonJS({
  "node_modules/.pnpm/@tonaljs+scale-type@4.6.5/node_modules/@tonaljs/scale-type/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist(), require_dist5()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/core", "@tonaljs/pcset"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.ScaleType = {}, global2.core, global2.pcset));
    })(exports, function(exports2, core, pcset) {
      "use strict";
      var __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var SCALES = [
        ["1P 2M 3M 5P 6M", "major pentatonic", "pentatonic"],
        ["1P 3M 4P 5P 7M", "ionian pentatonic"],
        ["1P 3M 4P 5P 7m", "mixolydian pentatonic", "indian"],
        ["1P 2M 4P 5P 6M", "ritusen"],
        ["1P 2M 4P 5P 7m", "egyptian"],
        ["1P 3M 4P 5d 7m", "neopolitan major pentatonic"],
        ["1P 3m 4P 5P 6m", "vietnamese 1"],
        ["1P 2m 3m 5P 6m", "pelog"],
        ["1P 2m 4P 5P 6m", "kumoijoshi"],
        ["1P 2M 3m 5P 6m", "hirajoshi"],
        ["1P 2m 4P 5d 7m", "iwato"],
        ["1P 2m 4P 5P 7m", "in-sen"],
        ["1P 3M 4A 5P 7M", "lydian pentatonic", "chinese"],
        ["1P 3m 4P 6m 7m", "malkos raga"],
        ["1P 3m 4P 5d 7m", "locrian pentatonic", "minor seven flat five pentatonic"],
        ["1P 3m 4P 5P 7m", "minor pentatonic", "vietnamese 2"],
        ["1P 3m 4P 5P 6M", "minor six pentatonic"],
        ["1P 2M 3m 5P 6M", "flat three pentatonic", "kumoi"],
        ["1P 2M 3M 5P 6m", "flat six pentatonic"],
        ["1P 2m 3M 5P 6M", "scriabin"],
        ["1P 3M 5d 6m 7m", "whole tone pentatonic"],
        ["1P 3M 4A 5A 7M", "lydian #5P pentatonic"],
        ["1P 3M 4A 5P 7m", "lydian dominant pentatonic"],
        ["1P 3m 4P 5P 7M", "minor #7M pentatonic"],
        ["1P 3m 4d 5d 7m", "super locrian pentatonic"],
        ["1P 2M 3m 4P 5P 7M", "minor hexatonic"],
        ["1P 2A 3M 5P 5A 7M", "augmented"],
        ["1P 2M 3m 3M 5P 6M", "major blues"],
        ["1P 2M 4P 5P 6M 7m", "piongio"],
        ["1P 2m 3M 4A 6M 7m", "prometheus neopolitan"],
        ["1P 2M 3M 4A 6M 7m", "prometheus"],
        ["1P 2m 3M 5d 6m 7m", "mystery #1"],
        ["1P 2m 3M 4P 5A 6M", "six tone symmetric"],
        ["1P 2M 3M 4A 5A 7m", "whole tone", "messiaen's mode #1"],
        ["1P 2m 4P 4A 5P 7M", "messiaen's mode #5"],
        ["1P 3m 4P 5d 5P 7m", "minor blues", "blues"],
        ["1P 2M 3M 4P 5d 6m 7m", "locrian major", "arabian"],
        ["1P 2m 3M 4A 5P 6m 7M", "double harmonic lydian"],
        ["1P 2M 3m 4P 5P 6m 7M", "harmonic minor"],
        [
          "1P 2m 2A 3M 4A 6m 7m",
          "altered",
          "super locrian",
          "diminished whole tone",
          "pomeroy"
        ],
        ["1P 2M 3m 4P 5d 6m 7m", "locrian #2", "half-diminished", "aeolian b5"],
        [
          "1P 2M 3M 4P 5P 6m 7m",
          "mixolydian b6",
          "melodic minor fifth mode",
          "hindu"
        ],
        ["1P 2M 3M 4A 5P 6M 7m", "lydian dominant", "lydian b7", "overtone"],
        ["1P 2M 3M 4A 5P 6M 7M", "lydian"],
        ["1P 2M 3M 4A 5A 6M 7M", "lydian augmented"],
        [
          "1P 2m 3m 4P 5P 6M 7m",
          "dorian b2",
          "phrygian #6",
          "melodic minor second mode"
        ],
        ["1P 2M 3m 4P 5P 6M 7M", "melodic minor"],
        ["1P 2m 3m 4P 5d 6m 7m", "locrian"],
        [
          "1P 2m 3m 4d 5d 6m 7d",
          "ultralocrian",
          "superlocrian bb7",
          "superlocrian diminished"
        ],
        ["1P 2m 3m 4P 5d 6M 7m", "locrian 6", "locrian natural 6", "locrian sharp 6"],
        ["1P 2A 3M 4P 5P 5A 7M", "augmented heptatonic"],
        [
          "1P 2M 3m 4A 5P 6M 7m",
          "dorian #4",
          "ukrainian dorian",
          "romanian minor",
          "altered dorian"
        ],
        ["1P 2M 3m 4A 5P 6M 7M", "lydian diminished"],
        ["1P 2m 3m 4P 5P 6m 7m", "phrygian"],
        ["1P 2M 3M 4A 5A 7m 7M", "leading whole tone"],
        ["1P 2M 3M 4A 5P 6m 7m", "lydian minor"],
        ["1P 2m 3M 4P 5P 6m 7m", "phrygian dominant", "spanish", "phrygian major"],
        ["1P 2m 3m 4P 5P 6m 7M", "balinese"],
        ["1P 2m 3m 4P 5P 6M 7M", "neopolitan major"],
        ["1P 2M 3m 4P 5P 6m 7m", "aeolian", "minor"],
        ["1P 2M 3M 4P 5P 6m 7M", "harmonic major"],
        ["1P 2m 3M 4P 5P 6m 7M", "double harmonic major", "gypsy"],
        ["1P 2M 3m 4P 5P 6M 7m", "dorian"],
        ["1P 2M 3m 4A 5P 6m 7M", "hungarian minor"],
        ["1P 2A 3M 4A 5P 6M 7m", "hungarian major"],
        ["1P 2m 3M 4P 5d 6M 7m", "oriental"],
        ["1P 2m 3m 3M 4A 5P 7m", "flamenco"],
        ["1P 2m 3m 4A 5P 6m 7M", "todi raga"],
        ["1P 2M 3M 4P 5P 6M 7m", "mixolydian", "dominant"],
        ["1P 2m 3M 4P 5d 6m 7M", "persian"],
        ["1P 2M 3M 4P 5P 6M 7M", "major", "ionian"],
        ["1P 2m 3M 5d 6m 7m 7M", "enigmatic"],
        [
          "1P 2M 3M 4P 5A 6M 7M",
          "major augmented",
          "major #5",
          "ionian augmented",
          "ionian #5"
        ],
        ["1P 2A 3M 4A 5P 6M 7M", "lydian #9"],
        ["1P 2m 2M 4P 4A 5P 6m 7M", "messiaen's mode #4"],
        ["1P 2m 3M 4P 4A 5P 6m 7M", "purvi raga"],
        ["1P 2m 3m 3M 4P 5P 6m 7m", "spanish heptatonic"],
        ["1P 2M 3M 4P 5P 6M 7m 7M", "bebop"],
        ["1P 2M 3m 3M 4P 5P 6M 7m", "bebop minor"],
        ["1P 2M 3M 4P 5P 5A 6M 7M", "bebop major"],
        ["1P 2m 3m 4P 5d 5P 6m 7m", "bebop locrian"],
        ["1P 2M 3m 4P 5P 6m 7m 7M", "minor bebop"],
        ["1P 2M 3m 4P 5d 6m 6M 7M", "diminished", "whole-half diminished"],
        ["1P 2M 3M 4P 5d 5P 6M 7M", "ichikosucho"],
        ["1P 2M 3m 4P 5P 6m 6M 7M", "minor six diminished"],
        [
          "1P 2m 3m 3M 4A 5P 6M 7m",
          "half-whole diminished",
          "dominant diminished",
          "messiaen's mode #2"
        ],
        ["1P 3m 3M 4P 5P 6M 7m 7M", "kafi raga"],
        ["1P 2M 3M 4P 4A 5A 6A 7M", "messiaen's mode #6"],
        ["1P 2M 3m 3M 4P 5d 5P 6M 7m", "composite blues"],
        ["1P 2M 3m 3M 4A 5P 6m 7m 7M", "messiaen's mode #3"],
        ["1P 2m 2M 3m 4P 4A 5P 6m 6M 7M", "messiaen's mode #7"],
        ["1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M", "chromatic"]
      ];
      var NoScaleType = __assign(__assign({}, pcset.EmptyPcset), { intervals: [], aliases: [] });
      var dictionary = [];
      var index = {};
      function names() {
        return dictionary.map(function(scale) {
          return scale.name;
        });
      }
      function get(type) {
        return index[type] || NoScaleType;
      }
      var scaleType = core.deprecate("ScaleDictionary.scaleType", "ScaleType.get", get);
      function all() {
        return dictionary.slice();
      }
      var entries = core.deprecate("ScaleDictionary.entries", "ScaleType.all", all);
      function keys() {
        return Object.keys(index);
      }
      function removeAll() {
        dictionary = [];
        index = {};
      }
      function add(intervals, name, aliases) {
        if (aliases === void 0) {
          aliases = [];
        }
        var scale = __assign(__assign({}, pcset.get(intervals)), { name, intervals, aliases });
        dictionary.push(scale);
        index[scale.name] = scale;
        index[scale.setNum] = scale;
        index[scale.chroma] = scale;
        scale.aliases.forEach(function(alias) {
          return addAlias(scale, alias);
        });
        return scale;
      }
      function addAlias(scale, alias) {
        index[alias] = scale;
      }
      SCALES.forEach(function(_a) {
        var ivls = _a[0], name = _a[1], aliases = _a.slice(2);
        return add(ivls.split(" "), name, aliases);
      });
      var index$1 = {
        names,
        get,
        all,
        add,
        removeAll,
        keys,
        entries,
        scaleType
      };
      exports2.NoScaleType = NoScaleType;
      exports2.add = add;
      exports2.addAlias = addAlias;
      exports2.all = all;
      exports2["default"] = index$1;
      exports2.entries = entries;
      exports2.get = get;
      exports2.keys = keys;
      exports2.names = names;
      exports2.removeAll = removeAll;
      exports2.scaleType = scaleType;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+chord@4.6.5/node_modules/@tonaljs/chord/dist/index.js
var require_dist9 = __commonJS({
  "node_modules/.pnpm/@tonaljs+chord@4.6.5/node_modules/@tonaljs/chord/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist7(), require_dist6(), require_dist(), require_dist5(), require_dist8()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/chord-detect", "@tonaljs/chord-type", "@tonaljs/core", "@tonaljs/pcset", "@tonaljs/scale-type"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Chord = {}, global2.chordDetect, global2.chordType, global2.core, global2.pcset, global2.scaleType));
    })(exports, function(exports2, chordDetect, chordType, core, pcset, scaleType) {
      "use strict";
      var __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var NoChord = {
        empty: true,
        name: "",
        symbol: "",
        root: "",
        rootDegree: 0,
        type: "",
        tonic: null,
        setNum: NaN,
        quality: "Unknown",
        chroma: "",
        normalized: "",
        aliases: [],
        notes: [],
        intervals: []
      };
      var NUM_TYPES = /^(6|64|7|9|11|13)$/;
      function tokenize(name) {
        var _a = core.tokenizeNote(name), letter = _a[0], acc = _a[1], oct = _a[2], type = _a[3];
        if (letter === "") {
          return ["", name];
        }
        if (letter === "A" && type === "ug") {
          return ["", "aug"];
        }
        if (!type && (oct === "4" || oct === "5")) {
          return [letter + acc, oct];
        }
        if (NUM_TYPES.test(oct)) {
          return [letter + acc, oct + type];
        } else {
          return [letter + acc + oct, type];
        }
      }
      function get(src) {
        if (src === "") {
          return NoChord;
        }
        if (Array.isArray(src) && src.length === 2) {
          return getChord(src[1], src[0]);
        } else {
          var _a = tokenize(src), tonic = _a[0], type = _a[1];
          var chord_1 = getChord(type, tonic);
          return chord_1.empty ? getChord(src) : chord_1;
        }
      }
      function getChord(typeName, optionalTonic, optionalRoot) {
        var type = chordType.get(typeName);
        var tonic = core.note(optionalTonic || "");
        var root = core.note(optionalRoot || "");
        if (type.empty || optionalTonic && tonic.empty || optionalRoot && root.empty) {
          return NoChord;
        }
        var rootInterval = core.distance(tonic.pc, root.pc);
        var rootDegree = type.intervals.indexOf(rootInterval) + 1;
        if (!root.empty && !rootDegree) {
          return NoChord;
        }
        var intervals = Array.from(type.intervals);
        for (var i = 1; i < rootDegree; i++) {
          var num = intervals[0][0];
          var quality = intervals[0][1];
          var newNum = parseInt(num, 10) + 7;
          intervals.push("" + newNum + quality);
          intervals.shift();
        }
        var notes = tonic.empty ? [] : intervals.map(function(i2) {
          return core.transpose(tonic, i2);
        });
        typeName = type.aliases.indexOf(typeName) !== -1 ? typeName : type.aliases[0];
        var symbol = "" + (tonic.empty ? "" : tonic.pc) + typeName + (root.empty || rootDegree <= 1 ? "" : "/" + root.pc);
        var name = (optionalTonic ? tonic.pc + " " : "") + type.name + (rootDegree > 1 && optionalRoot ? " over " + root.pc : "");
        return __assign(__assign({}, type), { name, symbol, type: type.name, root: root.name, intervals, rootDegree, tonic: tonic.name, notes });
      }
      var chord = core.deprecate("Chord.chord", "Chord.get", get);
      function transpose(chordName, interval) {
        var _a = tokenize(chordName), tonic = _a[0], type = _a[1];
        if (!tonic) {
          return chordName;
        }
        return core.transpose(tonic, interval) + type;
      }
      function chordScales(name) {
        var s = get(name);
        var isChordIncluded = pcset.isSupersetOf(s.chroma);
        return scaleType.all().filter(function(scale) {
          return isChordIncluded(scale.chroma);
        }).map(function(scale) {
          return scale.name;
        });
      }
      function extended(chordName) {
        var s = get(chordName);
        var isSuperset = pcset.isSupersetOf(s.chroma);
        return chordType.all().filter(function(chord2) {
          return isSuperset(chord2.chroma);
        }).map(function(chord2) {
          return s.tonic + chord2.aliases[0];
        });
      }
      function reduced(chordName) {
        var s = get(chordName);
        var isSubset = pcset.isSubsetOf(s.chroma);
        return chordType.all().filter(function(chord2) {
          return isSubset(chord2.chroma);
        }).map(function(chord2) {
          return s.tonic + chord2.aliases[0];
        });
      }
      var index = {
        getChord,
        get,
        detect: chordDetect.detect,
        chordScales,
        extended,
        reduced,
        tokenize,
        transpose,
        chord
      };
      Object.defineProperty(exports2, "detect", {
        enumerable: true,
        get: function() {
          return chordDetect.detect;
        }
      });
      exports2.chord = chord;
      exports2.chordScales = chordScales;
      exports2["default"] = index;
      exports2.extended = extended;
      exports2.get = get;
      exports2.getChord = getChord;
      exports2.reduced = reduced;
      exports2.tokenize = tokenize;
      exports2.transpose = transpose;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+duration-value@4.6.2/node_modules/@tonaljs/duration-value/dist/index.js
var require_dist10 = __commonJS({
  "node_modules/.pnpm/@tonaljs+duration-value@4.6.2/node_modules/@tonaljs/duration-value/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.DurationValue = {}));
    })(exports, function(exports2) {
      "use strict";
      var __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var DATA = [
        [
          0.125,
          "dl",
          ["large", "duplex longa", "maxima", "octuple", "octuple whole"]
        ],
        [0.25, "l", ["long", "longa"]],
        [0.5, "d", ["double whole", "double", "breve"]],
        [1, "w", ["whole", "semibreve"]],
        [2, "h", ["half", "minim"]],
        [4, "q", ["quarter", "crotchet"]],
        [8, "e", ["eighth", "quaver"]],
        [16, "s", ["sixteenth", "semiquaver"]],
        [32, "t", ["thirty-second", "demisemiquaver"]],
        [64, "sf", ["sixty-fourth", "hemidemisemiquaver"]],
        [128, "h", ["hundred twenty-eighth"]],
        [256, "th", ["two hundred fifty-sixth"]]
      ];
      var VALUES = [];
      DATA.forEach(function(_a) {
        var denominator = _a[0], shorthand = _a[1], names2 = _a[2];
        return add(denominator, shorthand, names2);
      });
      var NoDuration = {
        empty: true,
        name: "",
        value: 0,
        fraction: [0, 0],
        shorthand: "",
        dots: "",
        names: []
      };
      function names() {
        return VALUES.reduce(function(names2, duration) {
          duration.names.forEach(function(name) {
            return names2.push(name);
          });
          return names2;
        }, []);
      }
      function shorthands() {
        return VALUES.map(function(dur) {
          return dur.shorthand;
        });
      }
      var REGEX = /^([^.]+)(\.*)$/;
      function get(name) {
        var _a = REGEX.exec(name) || [];
        _a[0];
        var simple = _a[1], dots = _a[2];
        var base = VALUES.find(function(dur) {
          return dur.shorthand === simple || dur.names.includes(simple);
        });
        if (!base) {
          return NoDuration;
        }
        var fraction2 = calcDots(base.fraction, dots.length);
        var value2 = fraction2[0] / fraction2[1];
        return __assign(__assign({}, base), { name, dots, value: value2, fraction: fraction2 });
      }
      var value = function(name) {
        return get(name).value;
      };
      var fraction = function(name) {
        return get(name).fraction;
      };
      var index = { names, shorthands, get, value, fraction };
      function add(denominator, shorthand, names2) {
        VALUES.push({
          empty: false,
          dots: "",
          name: "",
          value: 1 / denominator,
          fraction: denominator < 1 ? [1 / denominator, 1] : [1, denominator],
          shorthand,
          names: names2
        });
      }
      function calcDots(fraction2, dots) {
        var pow = Math.pow(2, dots);
        var numerator = fraction2[0] * pow;
        var denominator = fraction2[1] * pow;
        var base = numerator;
        for (var i = 0; i < dots; i++) {
          numerator += base / Math.pow(2, i + 1);
        }
        while (numerator % 2 === 0 && denominator % 2 === 0) {
          numerator /= 2;
          denominator /= 2;
        }
        return [numerator, denominator];
      }
      exports2.default = index;
      exports2.fraction = fraction;
      exports2.get = get;
      exports2.names = names;
      exports2.shorthands = shorthands;
      exports2.value = value;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+interval@4.6.5/node_modules/@tonaljs/interval/dist/index.js
var require_dist11 = __commonJS({
  "node_modules/.pnpm/@tonaljs+interval@4.6.5/node_modules/@tonaljs/interval/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/core"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Interval = {}, global2.core));
    })(exports, function(exports2, core) {
      "use strict";
      function names() {
        return "1P 2M 3M 4P 5P 6m 7m".split(" ");
      }
      var get = core.interval;
      var name = function(name2) {
        return core.interval(name2).name;
      };
      var semitones = function(name2) {
        return core.interval(name2).semitones;
      };
      var quality = function(name2) {
        return core.interval(name2).q;
      };
      var num = function(name2) {
        return core.interval(name2).num;
      };
      function simplify(name2) {
        var i = core.interval(name2);
        return i.empty ? "" : i.simple + i.q;
      }
      function invert(name2) {
        var i = core.interval(name2);
        if (i.empty) {
          return "";
        }
        var step = (7 - i.step) % 7;
        var alt = i.type === "perfectable" ? -i.alt : -(i.alt + 1);
        return core.interval({ step, alt, oct: i.oct, dir: i.dir }).name;
      }
      var IN = [1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7];
      var IQ = "P m M m M P d P m M m M".split(" ");
      function fromSemitones(semitones2) {
        var d = semitones2 < 0 ? -1 : 1;
        var n = Math.abs(semitones2);
        var c = n % 12;
        var o = Math.floor(n / 12);
        return d * (IN[c] + 7 * o) + IQ[c];
      }
      var distance = core.distance;
      var add = combinator(function(a, b) {
        return [a[0] + b[0], a[1] + b[1]];
      });
      var addTo = function(interval) {
        return function(other) {
          return add(interval, other);
        };
      };
      var substract = combinator(function(a, b) {
        return [a[0] - b[0], a[1] - b[1]];
      });
      function transposeFifths(interval, fifths) {
        var ivl = get(interval);
        if (ivl.empty)
          return "";
        var _a = ivl.coord, nFifths = _a[0], nOcts = _a[1], dir = _a[2];
        return core.coordToInterval([nFifths + fifths, nOcts, dir]).name;
      }
      var index = {
        names,
        get,
        name,
        num,
        semitones,
        quality,
        fromSemitones,
        distance,
        invert,
        simplify,
        add,
        addTo,
        substract,
        transposeFifths
      };
      function combinator(fn) {
        return function(a, b) {
          var coordA = core.interval(a).coord;
          var coordB = core.interval(b).coord;
          if (coordA && coordB) {
            var coord = fn(coordA, coordB);
            return core.coordToInterval(coord).name;
          }
        };
      }
      exports2.add = add;
      exports2.addTo = addTo;
      exports2["default"] = index;
      exports2.distance = distance;
      exports2.fromSemitones = fromSemitones;
      exports2.get = get;
      exports2.invert = invert;
      exports2.name = name;
      exports2.names = names;
      exports2.num = num;
      exports2.quality = quality;
      exports2.semitones = semitones;
      exports2.simplify = simplify;
      exports2.substract = substract;
      exports2.transposeFifths = transposeFifths;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+midi@4.6.5/node_modules/@tonaljs/midi/dist/index.js
var require_dist12 = __commonJS({
  "node_modules/.pnpm/@tonaljs+midi@4.6.5/node_modules/@tonaljs/midi/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/core"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Midi = {}, global2.core));
    })(exports, function(exports2, core) {
      "use strict";
      function isMidi(arg) {
        return +arg >= 0 && +arg <= 127;
      }
      function toMidi(note) {
        if (isMidi(note)) {
          return +note;
        }
        var n = core.note(note);
        return n.empty ? null : n.midi;
      }
      function midiToFreq(midi, tuning) {
        if (tuning === void 0) {
          tuning = 440;
        }
        return Math.pow(2, (midi - 69) / 12) * tuning;
      }
      var L2 = Math.log(2);
      var L440 = Math.log(440);
      function freqToMidi(freq) {
        var v = 12 * (Math.log(freq) - L440) / L2 + 69;
        return Math.round(v * 100) / 100;
      }
      var SHARPS2 = "C C# D D# E F F# G G# A A# B".split(" ");
      var FLATS = "C Db D Eb E F Gb G Ab A Bb B".split(" ");
      function midiToNoteName(midi, options) {
        if (options === void 0) {
          options = {};
        }
        if (isNaN(midi) || midi === -Infinity || midi === Infinity)
          return "";
        midi = Math.round(midi);
        var pcs = options.sharps === true ? SHARPS2 : FLATS;
        var pc = pcs[midi % 12];
        if (options.pitchClass) {
          return pc;
        }
        var o = Math.floor(midi / 12) - 1;
        return pc + o;
      }
      var index = { isMidi, toMidi, midiToFreq, midiToNoteName, freqToMidi };
      exports2["default"] = index;
      exports2.freqToMidi = freqToMidi;
      exports2.isMidi = isMidi;
      exports2.midiToFreq = midiToFreq;
      exports2.midiToNoteName = midiToNoteName;
      exports2.toMidi = toMidi;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+note@4.6.5/node_modules/@tonaljs/note/dist/index.js
var require_dist13 = __commonJS({
  "node_modules/.pnpm/@tonaljs+note@4.6.5/node_modules/@tonaljs/note/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist(), require_dist12()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/core", "@tonaljs/midi"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Note = {}, global2.core, global2.midi$1));
    })(exports, function(exports2, core, midi$1) {
      "use strict";
      var NAMES = ["C", "D", "E", "F", "G", "A", "B"];
      var toName = function(n) {
        return n.name;
      };
      var onlyNotes = function(array) {
        return array.map(core.note).filter(function(n) {
          return !n.empty;
        });
      };
      function names(array) {
        if (array === void 0) {
          return NAMES.slice();
        } else if (!Array.isArray(array)) {
          return [];
        } else {
          return onlyNotes(array).map(toName);
        }
      }
      var get = core.note;
      var name = function(note) {
        return get(note).name;
      };
      var pitchClass = function(note) {
        return get(note).pc;
      };
      var accidentals = function(note) {
        return get(note).acc;
      };
      var octave = function(note) {
        return get(note).oct;
      };
      var midi = function(note) {
        return get(note).midi;
      };
      var freq = function(note) {
        return get(note).freq;
      };
      var chroma = function(note) {
        return get(note).chroma;
      };
      function fromMidi(midi2) {
        return midi$1.midiToNoteName(midi2);
      }
      function fromFreq(freq2) {
        return midi$1.midiToNoteName(midi$1.freqToMidi(freq2));
      }
      function fromFreqSharps(freq2) {
        return midi$1.midiToNoteName(midi$1.freqToMidi(freq2), { sharps: true });
      }
      function fromMidiSharps(midi2) {
        return midi$1.midiToNoteName(midi2, { sharps: true });
      }
      var transpose = core.transpose;
      var tr = core.transpose;
      var transposeBy = function(interval) {
        return function(note) {
          return transpose(note, interval);
        };
      };
      var trBy = transposeBy;
      var transposeFrom = function(note) {
        return function(interval) {
          return transpose(note, interval);
        };
      };
      var trFrom = transposeFrom;
      function transposeFifths(noteName, fifths) {
        var note = get(noteName);
        if (note.empty) {
          return "";
        }
        var _a = note.coord, nFifths = _a[0], nOcts = _a[1];
        var transposed = nOcts === void 0 ? core.coordToNote([nFifths + fifths]) : core.coordToNote([nFifths + fifths, nOcts]);
        return transposed.name;
      }
      var trFifths = transposeFifths;
      var ascending = function(a, b) {
        return a.height - b.height;
      };
      var descending = function(a, b) {
        return b.height - a.height;
      };
      function sortedNames(notes, comparator) {
        comparator = comparator || ascending;
        return onlyNotes(notes).sort(comparator).map(toName);
      }
      function sortedUniqNames(notes) {
        return sortedNames(notes, ascending).filter(function(n, i, a) {
          return i === 0 || n !== a[i - 1];
        });
      }
      var simplify = function(noteName) {
        var note = get(noteName);
        if (note.empty) {
          return "";
        }
        return midi$1.midiToNoteName(note.midi || note.chroma, {
          sharps: note.alt > 0,
          pitchClass: note.midi === null
        });
      };
      function enharmonic(noteName, destName) {
        var src = get(noteName);
        if (src.empty) {
          return "";
        }
        var dest = get(destName || midi$1.midiToNoteName(src.midi || src.chroma, {
          sharps: src.alt < 0,
          pitchClass: true
        }));
        if (dest.empty || dest.chroma !== src.chroma) {
          return "";
        }
        if (src.oct === void 0) {
          return dest.pc;
        }
        var srcChroma = src.chroma - src.alt;
        var destChroma = dest.chroma - dest.alt;
        var destOctOffset = srcChroma > 11 || destChroma < 0 ? -1 : srcChroma < 0 || destChroma > 11 ? 1 : 0;
        var destOct = src.oct + destOctOffset;
        return dest.pc + destOct;
      }
      var index = {
        names,
        get,
        name,
        pitchClass,
        accidentals,
        octave,
        midi,
        ascending,
        descending,
        sortedNames,
        sortedUniqNames,
        fromMidi,
        fromMidiSharps,
        freq,
        fromFreq,
        fromFreqSharps,
        chroma,
        transpose,
        tr,
        transposeBy,
        trBy,
        transposeFrom,
        trFrom,
        transposeFifths,
        trFifths,
        simplify,
        enharmonic
      };
      exports2.accidentals = accidentals;
      exports2.ascending = ascending;
      exports2.chroma = chroma;
      exports2["default"] = index;
      exports2.descending = descending;
      exports2.enharmonic = enharmonic;
      exports2.freq = freq;
      exports2.fromFreq = fromFreq;
      exports2.fromFreqSharps = fromFreqSharps;
      exports2.fromMidi = fromMidi;
      exports2.fromMidiSharps = fromMidiSharps;
      exports2.get = get;
      exports2.midi = midi;
      exports2.name = name;
      exports2.names = names;
      exports2.octave = octave;
      exports2.pitchClass = pitchClass;
      exports2.simplify = simplify;
      exports2.sortedNames = sortedNames;
      exports2.sortedUniqNames = sortedUniqNames;
      exports2.tr = tr;
      exports2.trBy = trBy;
      exports2.trFifths = trFifths;
      exports2.trFrom = trFrom;
      exports2.transpose = transpose;
      exports2.transposeBy = transposeBy;
      exports2.transposeFifths = transposeFifths;
      exports2.transposeFrom = transposeFrom;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+roman-numeral@4.6.5/node_modules/@tonaljs/roman-numeral/dist/index.js
var require_dist14 = __commonJS({
  "node_modules/.pnpm/@tonaljs+roman-numeral@4.6.5/node_modules/@tonaljs/roman-numeral/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/core"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.RomanNumeral = {}, global2.core));
    })(exports, function(exports2, core) {
      "use strict";
      var NoRomanNumeral = { empty: true, name: "", chordType: "" };
      var cache = {};
      function get(src) {
        return typeof src === "string" ? cache[src] || (cache[src] = parse2(src)) : typeof src === "number" ? get(NAMES[src] || "") : core.isPitch(src) ? fromPitch(src) : core.isNamed(src) ? get(src.name) : NoRomanNumeral;
      }
      var romanNumeral = core.deprecate("RomanNumeral.romanNumeral", "RomanNumeral.get", get);
      function names(major) {
        if (major === void 0) {
          major = true;
        }
        return (major ? NAMES : NAMES_MINOR).slice();
      }
      function fromPitch(pitch) {
        return get(core.altToAcc(pitch.alt) + NAMES[pitch.step]);
      }
      var REGEX = /^(#{1,}|b{1,}|x{1,}|)(IV|I{1,3}|VI{0,2}|iv|i{1,3}|vi{0,2})([^IViv]*)$/;
      function tokenize(str) {
        return REGEX.exec(str) || ["", "", "", ""];
      }
      var ROMANS = "I II III IV V VI VII";
      var NAMES = ROMANS.split(" ");
      var NAMES_MINOR = ROMANS.toLowerCase().split(" ");
      function parse2(src) {
        var _a = tokenize(src), name = _a[0], acc = _a[1], roman = _a[2], chordType = _a[3];
        if (!roman) {
          return NoRomanNumeral;
        }
        var upperRoman = roman.toUpperCase();
        var step = NAMES.indexOf(upperRoman);
        var alt = core.accToAlt(acc);
        var dir = 1;
        return {
          empty: false,
          name,
          roman,
          interval: core.interval({ step, alt, dir }).name,
          acc,
          chordType,
          alt,
          step,
          major: roman === upperRoman,
          oct: 0,
          dir
        };
      }
      var index = {
        names,
        get,
        romanNumeral
      };
      exports2["default"] = index;
      exports2.get = get;
      exports2.names = names;
      exports2.tokenize = tokenize;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+key@4.6.5/node_modules/@tonaljs/key/dist/index.js
var require_dist15 = __commonJS({
  "node_modules/.pnpm/@tonaljs+key@4.6.5/node_modules/@tonaljs/key/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist(), require_dist13(), require_dist14()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/core", "@tonaljs/note", "@tonaljs/roman-numeral"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Key = {}, global2.core, global2.note, global2.romanNumeral));
    })(exports, function(exports2, core, note, romanNumeral) {
      "use strict";
      var __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var Empty = Object.freeze([]);
      var NoKey = {
        type: "major",
        tonic: "",
        alteration: 0,
        keySignature: ""
      };
      var NoKeyScale = {
        tonic: "",
        grades: Empty,
        intervals: Empty,
        scale: Empty,
        chords: Empty,
        chordsHarmonicFunction: Empty,
        chordScales: Empty
      };
      var NoMajorKey = __assign(__assign(__assign({}, NoKey), NoKeyScale), { type: "major", minorRelative: "", scale: Empty, secondaryDominants: Empty, secondaryDominantsMinorRelative: Empty, substituteDominants: Empty, substituteDominantsMinorRelative: Empty });
      var NoMinorKey = __assign(__assign({}, NoKey), { type: "minor", relativeMajor: "", natural: NoKeyScale, harmonic: NoKeyScale, melodic: NoKeyScale });
      var mapScaleToType = function(scale, list, sep) {
        if (sep === void 0) {
          sep = "";
        }
        return list.map(function(type, i) {
          return "" + scale[i] + sep + type;
        });
      };
      function keyScale(grades, chords, harmonicFunctions, chordScales) {
        return function(tonic) {
          var intervals = grades.map(function(gr) {
            return romanNumeral.get(gr).interval || "";
          });
          var scale = intervals.map(function(interval) {
            return core.transpose(tonic, interval);
          });
          return {
            tonic,
            grades,
            intervals,
            scale,
            chords: mapScaleToType(scale, chords),
            chordsHarmonicFunction: harmonicFunctions.slice(),
            chordScales: mapScaleToType(scale, chordScales, " ")
          };
        };
      }
      var distInFifths = function(from, to) {
        var f = core.note(from);
        var t = core.note(to);
        return f.empty || t.empty ? 0 : t.coord[0] - f.coord[0];
      };
      var MajorScale = keyScale("I II III IV V VI VII".split(" "), "maj7 m7 m7 maj7 7 m7 m7b5".split(" "), "T SD T SD D T D".split(" "), "major,dorian,phrygian,lydian,mixolydian,minor,locrian".split(","));
      var NaturalScale = keyScale("I II bIII IV V bVI bVII".split(" "), "m7 m7b5 maj7 m7 m7 maj7 7".split(" "), "T SD T SD D SD SD".split(" "), "minor,locrian,major,dorian,phrygian,lydian,mixolydian".split(","));
      var HarmonicScale = keyScale("I II bIII IV V bVI VII".split(" "), "mMaj7 m7b5 +maj7 m7 7 maj7 o7".split(" "), "T SD T SD D SD D".split(" "), "harmonic minor,locrian 6,major augmented,lydian diminished,phrygian dominant,lydian #9,ultralocrian".split(","));
      var MelodicScale = keyScale("I II bIII IV V VI VII".split(" "), "m6 m7 +maj7 7 7 m7b5 m7b5".split(" "), "T SD T SD D  ".split(" "), "melodic minor,dorian b2,lydian augmented,lydian dominant,mixolydian b6,locrian #2,altered".split(","));
      function majorKey(tonic) {
        var pc = core.note(tonic).pc;
        if (!pc)
          return NoMajorKey;
        var keyScale2 = MajorScale(pc);
        var alteration = distInFifths("C", pc);
        var romanInTonic = function(src) {
          var r = romanNumeral.get(src);
          if (r.empty)
            return "";
          return core.transpose(tonic, r.interval) + r.chordType;
        };
        return __assign(__assign({}, keyScale2), { type: "major", minorRelative: core.transpose(pc, "-3m"), alteration, keySignature: core.altToAcc(alteration), secondaryDominants: "- VI7 VII7 I7 II7 III7 -".split(" ").map(romanInTonic), secondaryDominantsMinorRelative: "- IIIm7b5 IV#m7 Vm7 VIm7 VIIm7b5 -".split(" ").map(romanInTonic), substituteDominants: "- bIII7 IV7 bV7 bVI7 bVII7 -".split(" ").map(romanInTonic), substituteDominantsMinorRelative: "- IIIm7 Im7 IIbm7 VIm7 IVm7 -".split(" ").map(romanInTonic) });
      }
      function minorKey(tnc) {
        var pc = core.note(tnc).pc;
        if (!pc)
          return NoMinorKey;
        var alteration = distInFifths("C", pc) - 3;
        return {
          type: "minor",
          tonic: pc,
          relativeMajor: core.transpose(pc, "3m"),
          alteration,
          keySignature: core.altToAcc(alteration),
          natural: NaturalScale(pc),
          harmonic: HarmonicScale(pc),
          melodic: MelodicScale(pc)
        };
      }
      function majorTonicFromKeySignature(sig) {
        if (typeof sig === "number") {
          return note.transposeFifths("C", sig);
        } else if (typeof sig === "string" && /^b+|#+$/.test(sig)) {
          return note.transposeFifths("C", core.accToAlt(sig));
        }
        return null;
      }
      var index = { majorKey, majorTonicFromKeySignature, minorKey };
      exports2["default"] = index;
      exports2.majorKey = majorKey;
      exports2.majorTonicFromKeySignature = majorTonicFromKeySignature;
      exports2.minorKey = minorKey;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+mode@4.6.5/node_modules/@tonaljs/mode/dist/index.js
var require_dist16 = __commonJS({
  "node_modules/.pnpm/@tonaljs+mode@4.6.5/node_modules/@tonaljs/mode/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist4(), require_dist(), require_dist11(), require_dist5(), require_dist8()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/collection", "@tonaljs/core", "@tonaljs/interval", "@tonaljs/pcset", "@tonaljs/scale-type"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Mode = {}, global2.collection, global2.core, global2.interval, global2.pcset, global2.scaleType));
    })(exports, function(exports2, collection, core, interval, pcset, scaleType) {
      "use strict";
      var __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var MODES = [
        [0, 2773, 0, "ionian", "", "Maj7", "major"],
        [1, 2902, 2, "dorian", "m", "m7"],
        [2, 3418, 4, "phrygian", "m", "m7"],
        [3, 2741, -1, "lydian", "", "Maj7"],
        [4, 2774, 1, "mixolydian", "", "7"],
        [5, 2906, 3, "aeolian", "m", "m7", "minor"],
        [6, 3434, 5, "locrian", "dim", "m7b5"]
      ];
      var NoMode = __assign(__assign({}, pcset.EmptyPcset), { name: "", alt: 0, modeNum: NaN, triad: "", seventh: "", aliases: [] });
      var modes = MODES.map(toMode);
      var index = {};
      modes.forEach(function(mode2) {
        index[mode2.name] = mode2;
        mode2.aliases.forEach(function(alias) {
          index[alias] = mode2;
        });
      });
      function get(name) {
        return typeof name === "string" ? index[name.toLowerCase()] || NoMode : name && name.name ? get(name.name) : NoMode;
      }
      var mode = core.deprecate("Mode.mode", "Mode.get", get);
      function all() {
        return modes.slice();
      }
      var entries = core.deprecate("Mode.mode", "Mode.all", all);
      function names() {
        return modes.map(function(mode2) {
          return mode2.name;
        });
      }
      function toMode(mode2) {
        var modeNum = mode2[0], setNum = mode2[1], alt = mode2[2], name = mode2[3], triad = mode2[4], seventh = mode2[5], alias = mode2[6];
        var aliases = alias ? [alias] : [];
        var chroma = Number(setNum).toString(2);
        var intervals = scaleType.get(name).intervals;
        return {
          empty: false,
          intervals,
          modeNum,
          chroma,
          normalized: chroma,
          name,
          setNum,
          alt,
          triad,
          seventh,
          aliases
        };
      }
      function notes(modeName, tonic) {
        return get(modeName).intervals.map(function(ivl) {
          return core.transpose(tonic, ivl);
        });
      }
      function chords(chords2) {
        return function(modeName, tonic) {
          var mode2 = get(modeName);
          if (mode2.empty)
            return [];
          var triads2 = collection.rotate(mode2.modeNum, chords2);
          var tonics = mode2.intervals.map(function(i) {
            return core.transpose(tonic, i);
          });
          return triads2.map(function(triad, i) {
            return tonics[i] + triad;
          });
        };
      }
      var triads = chords(MODES.map(function(x) {
        return x[4];
      }));
      var seventhChords = chords(MODES.map(function(x) {
        return x[5];
      }));
      function distance(destination, source) {
        var from = get(source);
        var to = get(destination);
        if (from.empty || to.empty)
          return "";
        return interval.simplify(interval.transposeFifths("1P", to.alt - from.alt));
      }
      function relativeTonic(destination, source, tonic) {
        return core.transpose(tonic, distance(destination, source));
      }
      var index$1 = {
        get,
        names,
        all,
        distance,
        relativeTonic,
        notes,
        triads,
        seventhChords,
        entries,
        mode
      };
      exports2.all = all;
      exports2["default"] = index$1;
      exports2.distance = distance;
      exports2.entries = entries;
      exports2.get = get;
      exports2.mode = mode;
      exports2.names = names;
      exports2.notes = notes;
      exports2.relativeTonic = relativeTonic;
      exports2.seventhChords = seventhChords;
      exports2.triads = triads;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+progression@4.6.5/node_modules/@tonaljs/progression/dist/index.js
var require_dist17 = __commonJS({
  "node_modules/.pnpm/@tonaljs+progression@4.6.5/node_modules/@tonaljs/progression/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist9(), require_dist(), require_dist14()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/chord", "@tonaljs/core", "@tonaljs/roman-numeral"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Progression = {}, global2.chord, global2.core, global2.romanNumeral));
    })(exports, function(exports2, chord, core, romanNumeral) {
      "use strict";
      function fromRomanNumerals(tonic, chords) {
        var romanNumerals = chords.map(romanNumeral.get);
        return romanNumerals.map(function(rn) {
          return core.transpose(tonic, core.interval(rn)) + rn.chordType;
        });
      }
      function toRomanNumerals(tonic, chords) {
        return chords.map(function(chord$1) {
          var _a = chord.tokenize(chord$1), note = _a[0], chordType = _a[1];
          var intervalName = core.distance(tonic, note);
          var roman = romanNumeral.get(core.interval(intervalName));
          return roman.name + chordType;
        });
      }
      var index = { fromRomanNumerals, toRomanNumerals };
      exports2["default"] = index;
      exports2.fromRomanNumerals = fromRomanNumerals;
      exports2.toRomanNumerals = toRomanNumerals;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+range@4.6.5/node_modules/@tonaljs/range/dist/index.js
var require_dist18 = __commonJS({
  "node_modules/.pnpm/@tonaljs+range@4.6.5/node_modules/@tonaljs/range/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist4(), require_dist12()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/collection", "@tonaljs/midi"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Range = {}, global2.collection, global2.midi));
    })(exports, function(exports2, collection, midi) {
      "use strict";
      function numeric(notes) {
        var midi$1 = collection.compact(notes.map(midi.toMidi));
        if (!notes.length || midi$1.length !== notes.length) {
          return [];
        }
        return midi$1.reduce(function(result, note) {
          var last = result[result.length - 1];
          return result.concat(collection.range(last, note).slice(1));
        }, [midi$1[0]]);
      }
      function chromatic(notes, options) {
        return numeric(notes).map(function(midi$1) {
          return midi.midiToNoteName(midi$1, options);
        });
      }
      var index = { numeric, chromatic };
      exports2.chromatic = chromatic;
      exports2["default"] = index;
      exports2.numeric = numeric;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+scale@4.6.5/node_modules/@tonaljs/scale/dist/index.js
var require_dist19 = __commonJS({
  "node_modules/.pnpm/@tonaljs+scale@4.6.5/node_modules/@tonaljs/scale/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist6(), require_dist4(), require_dist(), require_dist13(), require_dist5(), require_dist8()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/chord-type", "@tonaljs/collection", "@tonaljs/core", "@tonaljs/note", "@tonaljs/pcset", "@tonaljs/scale-type"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Scale = {}, global2.chordType, global2.collection, global2.core, global2.note, global2.pcset, global2.scaleType));
    })(exports, function(exports2, chordType, collection, core, note, pcset, scaleType) {
      "use strict";
      var __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var NoScale = {
        empty: true,
        name: "",
        type: "",
        tonic: null,
        setNum: NaN,
        chroma: "",
        normalized: "",
        aliases: [],
        notes: [],
        intervals: []
      };
      function tokenize(name) {
        if (typeof name !== "string") {
          return ["", ""];
        }
        var i = name.indexOf(" ");
        var tonic = core.note(name.substring(0, i));
        if (tonic.empty) {
          var n = core.note(name);
          return n.empty ? ["", name] : [n.name, ""];
        }
        var type = name.substring(tonic.name.length + 1);
        return [tonic.name, type.length ? type : ""];
      }
      var names = scaleType.names;
      function get(src) {
        var tokens = Array.isArray(src) ? src : tokenize(src);
        var tonic = core.note(tokens[0]).name;
        var st = scaleType.get(tokens[1]);
        if (st.empty) {
          return NoScale;
        }
        var type = st.name;
        var notes = tonic ? st.intervals.map(function(i) {
          return core.transpose(tonic, i);
        }) : [];
        var name = tonic ? tonic + " " + type : type;
        return __assign(__assign({}, st), { name, type, tonic, notes });
      }
      var scale = core.deprecate("Scale.scale", "Scale.get", get);
      function scaleChords(name) {
        var s = get(name);
        var inScale = pcset.isSubsetOf(s.chroma);
        return chordType.all().filter(function(chord) {
          return inScale(chord.chroma);
        }).map(function(chord) {
          return chord.aliases[0];
        });
      }
      function extended(name) {
        var s = get(name);
        var isSuperset = pcset.isSupersetOf(s.chroma);
        return scaleType.all().filter(function(scale2) {
          return isSuperset(scale2.chroma);
        }).map(function(scale2) {
          return scale2.name;
        });
      }
      function reduced(name) {
        var isSubset = pcset.isSubsetOf(get(name).chroma);
        return scaleType.all().filter(function(scale2) {
          return isSubset(scale2.chroma);
        }).map(function(scale2) {
          return scale2.name;
        });
      }
      function scaleNotes(notes) {
        var pcset2 = notes.map(function(n) {
          return core.note(n).pc;
        }).filter(function(x) {
          return x;
        });
        var tonic = pcset2[0];
        var scale2 = note.sortedUniqNames(pcset2);
        return collection.rotate(scale2.indexOf(tonic), scale2);
      }
      function modeNames(name) {
        var s = get(name);
        if (s.empty) {
          return [];
        }
        var tonics = s.tonic ? s.notes : s.intervals;
        return pcset.modes(s.chroma).map(function(chroma, i) {
          var modeName = get(chroma).name;
          return modeName ? [tonics[i], modeName] : ["", ""];
        }).filter(function(x) {
          return x[0];
        });
      }
      function getNoteNameOf(scale2) {
        var names2 = Array.isArray(scale2) ? scaleNotes(scale2) : get(scale2).notes;
        var chromas = names2.map(function(name) {
          return core.note(name).chroma;
        });
        return function(noteOrMidi) {
          var currNote = typeof noteOrMidi === "number" ? core.note(note.fromMidi(noteOrMidi)) : core.note(noteOrMidi);
          var height = currNote.height;
          if (height === void 0)
            return void 0;
          var chroma = height % 12;
          var position = chromas.indexOf(chroma);
          if (position === -1)
            return void 0;
          return note.enharmonic(currNote.name, names2[position]);
        };
      }
      function rangeOf(scale2) {
        var getName = getNoteNameOf(scale2);
        return function(fromNote, toNote) {
          var from = core.note(fromNote).height;
          var to = core.note(toNote).height;
          if (from === void 0 || to === void 0)
            return [];
          return collection.range(from, to).map(getName).filter(function(x) {
            return x;
          });
        };
      }
      var index = {
        get,
        names,
        extended,
        modeNames,
        reduced,
        scaleChords,
        scaleNotes,
        tokenize,
        rangeOf,
        scale
      };
      exports2["default"] = index;
      exports2.extended = extended;
      exports2.get = get;
      exports2.modeNames = modeNames;
      exports2.names = names;
      exports2.rangeOf = rangeOf;
      exports2.reduced = reduced;
      exports2.scale = scale;
      exports2.scaleChords = scaleChords;
      exports2.scaleNotes = scaleNotes;
      exports2.tokenize = tokenize;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+time-signature@4.6.2/node_modules/@tonaljs/time-signature/dist/index.js
var require_dist20 = __commonJS({
  "node_modules/.pnpm/@tonaljs+time-signature@4.6.2/node_modules/@tonaljs/time-signature/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.TimeSignature = {}));
    })(exports, function(exports2) {
      "use strict";
      var NONE = {
        empty: true,
        name: "",
        upper: void 0,
        lower: void 0,
        type: void 0,
        additive: []
      };
      var NAMES = ["4/4", "3/4", "2/4", "2/2", "12/8", "9/8", "6/8", "3/8"];
      function names() {
        return NAMES.slice();
      }
      var REGEX = /^(\d?\d(?:\+\d)*)\/(\d)$/;
      var CACHE = /* @__PURE__ */ new Map();
      function get(literal) {
        var cached = CACHE.get(literal);
        if (cached) {
          return cached;
        }
        var ts = build(parse2(literal));
        CACHE.set(literal, ts);
        return ts;
      }
      function parse2(literal) {
        if (typeof literal === "string") {
          var _a = REGEX.exec(literal) || [];
          _a[0];
          var up_1 = _a[1], low = _a[2];
          return parse2([up_1, low]);
        }
        var up = literal[0], down = literal[1];
        var denominator = +down;
        if (typeof up === "number") {
          return [up, denominator];
        }
        var list = up.split("+").map(function(n) {
          return +n;
        });
        return list.length === 1 ? [list[0], denominator] : [list, denominator];
      }
      var index = { names, parse: parse2, get };
      function build(_a) {
        var up = _a[0], down = _a[1];
        var upper = Array.isArray(up) ? up.reduce(function(a, b) {
          return a + b;
        }, 0) : up;
        var lower = down;
        if (upper === 0 || lower === 0) {
          return NONE;
        }
        var name = Array.isArray(up) ? up.join("+") + "/" + down : up + "/" + down;
        var additive = Array.isArray(up) ? up : [];
        var type = lower === 4 || lower === 2 ? "simple" : lower === 8 && upper % 3 === 0 ? "compound" : "irregular";
        return {
          empty: false,
          name,
          type,
          upper,
          lower,
          additive
        };
      }
      exports2.default = index;
      exports2.get = get;
      exports2.names = names;
      exports2.parse = parse2;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/@tonaljs+tonal@4.6.5/node_modules/@tonaljs/tonal/dist/index.js
var require_dist21 = __commonJS({
  "node_modules/.pnpm/@tonaljs+tonal@4.6.5/node_modules/@tonaljs/tonal/dist/index.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_dist2(), require_dist3(), require_dist9(), require_dist6(), require_dist4(), require_dist(), require_dist10(), require_dist11(), require_dist15(), require_dist12(), require_dist16(), require_dist13(), require_dist5(), require_dist17(), require_dist18(), require_dist14(), require_dist19(), require_dist8(), require_dist20()) : typeof define === "function" && define.amd ? define(["exports", "@tonaljs/abc-notation", "@tonaljs/array", "@tonaljs/chord", "@tonaljs/chord-type", "@tonaljs/collection", "@tonaljs/core", "@tonaljs/duration-value", "@tonaljs/interval", "@tonaljs/key", "@tonaljs/midi", "@tonaljs/mode", "@tonaljs/note", "@tonaljs/pcset", "@tonaljs/progression", "@tonaljs/range", "@tonaljs/roman-numeral", "@tonaljs/scale", "@tonaljs/scale-type", "@tonaljs/time-signature"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Tonal = {}, global2.abcNotation, global2.array, global2.chord, global2.ChordType, global2.collection, global2.Core, global2.durationValue, global2.interval, global2.key, global2.midi, global2.mode, global2.note, global2.Pcset, global2.progression, global2.range, global2.romanNumeral, global2.scale, global2.ScaleType, global2.timeSignature));
    })(exports, function(exports2, abcNotation, array, chord, ChordType, collection, Core, durationValue, interval, key, midi, mode, note, Pcset, progression, range, romanNumeral, scale, ScaleType, timeSignature) {
      "use strict";
      function _interopDefaultLegacy(e) {
        return e && typeof e === "object" && "default" in e ? e : { "default": e };
      }
      function _interopNamespace(e) {
        if (e && e.__esModule)
          return e;
        var n = /* @__PURE__ */ Object.create(null);
        if (e) {
          Object.keys(e).forEach(function(k) {
            if (k !== "default") {
              var d = Object.getOwnPropertyDescriptor(e, k);
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: function() {
                  return e[k];
                }
              });
            }
          });
        }
        n["default"] = e;
        return Object.freeze(n);
      }
      var abcNotation__default = /* @__PURE__ */ _interopDefaultLegacy(abcNotation);
      var array__namespace = /* @__PURE__ */ _interopNamespace(array);
      var chord__default = /* @__PURE__ */ _interopDefaultLegacy(chord);
      var ChordType__default = /* @__PURE__ */ _interopDefaultLegacy(ChordType);
      var collection__default = /* @__PURE__ */ _interopDefaultLegacy(collection);
      var Core__namespace = /* @__PURE__ */ _interopNamespace(Core);
      var durationValue__default = /* @__PURE__ */ _interopDefaultLegacy(durationValue);
      var interval__default = /* @__PURE__ */ _interopDefaultLegacy(interval);
      var key__default = /* @__PURE__ */ _interopDefaultLegacy(key);
      var midi__default = /* @__PURE__ */ _interopDefaultLegacy(midi);
      var mode__default = /* @__PURE__ */ _interopDefaultLegacy(mode);
      var note__default = /* @__PURE__ */ _interopDefaultLegacy(note);
      var Pcset__default = /* @__PURE__ */ _interopDefaultLegacy(Pcset);
      var progression__default = /* @__PURE__ */ _interopDefaultLegacy(progression);
      var range__default = /* @__PURE__ */ _interopDefaultLegacy(range);
      var romanNumeral__default = /* @__PURE__ */ _interopDefaultLegacy(romanNumeral);
      var scale__default = /* @__PURE__ */ _interopDefaultLegacy(scale);
      var ScaleType__default = /* @__PURE__ */ _interopDefaultLegacy(ScaleType);
      var timeSignature__default = /* @__PURE__ */ _interopDefaultLegacy(timeSignature);
      var Tonal = Core__namespace;
      var PcSet = Pcset__default["default"];
      var ChordDictionary = ChordType__default["default"];
      var ScaleDictionary = ScaleType__default["default"];
      Object.defineProperty(exports2, "AbcNotation", {
        enumerable: true,
        get: function() {
          return abcNotation__default["default"];
        }
      });
      exports2.Array = array__namespace;
      Object.defineProperty(exports2, "Chord", {
        enumerable: true,
        get: function() {
          return chord__default["default"];
        }
      });
      Object.defineProperty(exports2, "ChordType", {
        enumerable: true,
        get: function() {
          return ChordType__default["default"];
        }
      });
      Object.defineProperty(exports2, "Collection", {
        enumerable: true,
        get: function() {
          return collection__default["default"];
        }
      });
      exports2.Core = Core__namespace;
      Object.defineProperty(exports2, "DurationValue", {
        enumerable: true,
        get: function() {
          return durationValue__default["default"];
        }
      });
      Object.defineProperty(exports2, "Interval", {
        enumerable: true,
        get: function() {
          return interval__default["default"];
        }
      });
      Object.defineProperty(exports2, "Key", {
        enumerable: true,
        get: function() {
          return key__default["default"];
        }
      });
      Object.defineProperty(exports2, "Midi", {
        enumerable: true,
        get: function() {
          return midi__default["default"];
        }
      });
      Object.defineProperty(exports2, "Mode", {
        enumerable: true,
        get: function() {
          return mode__default["default"];
        }
      });
      Object.defineProperty(exports2, "Note", {
        enumerable: true,
        get: function() {
          return note__default["default"];
        }
      });
      Object.defineProperty(exports2, "Pcset", {
        enumerable: true,
        get: function() {
          return Pcset__default["default"];
        }
      });
      Object.defineProperty(exports2, "Progression", {
        enumerable: true,
        get: function() {
          return progression__default["default"];
        }
      });
      Object.defineProperty(exports2, "Range", {
        enumerable: true,
        get: function() {
          return range__default["default"];
        }
      });
      Object.defineProperty(exports2, "RomanNumeral", {
        enumerable: true,
        get: function() {
          return romanNumeral__default["default"];
        }
      });
      Object.defineProperty(exports2, "Scale", {
        enumerable: true,
        get: function() {
          return scale__default["default"];
        }
      });
      Object.defineProperty(exports2, "ScaleType", {
        enumerable: true,
        get: function() {
          return ScaleType__default["default"];
        }
      });
      Object.defineProperty(exports2, "TimeSignature", {
        enumerable: true,
        get: function() {
          return timeSignature__default["default"];
        }
      });
      exports2.ChordDictionary = ChordDictionary;
      exports2.PcSet = PcSet;
      exports2.ScaleDictionary = ScaleDictionary;
      exports2.Tonal = Tonal;
      Object.keys(Core).forEach(function(k) {
        if (k !== "default" && !exports2.hasOwnProperty(k))
          Object.defineProperty(exports2, k, {
            enumerable: true,
            get: function() {
              return Core[k];
            }
          });
      });
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// src/index.js
var src_exports = {};
__export(src_exports, {
  Alignment: () => Alignment_exports,
  Canvas: () => Canvas_exports,
  Chords: () => Chords_exports,
  DiffAlignment: () => DiffAlignment_exports,
  Drums: () => Drums_exports,
  Guitar: () => Guitar_exports,
  GuitarNote: () => GuitarNote_default,
  HarmonicaNote: () => HarmonicaNote_default,
  Lamellophone: () => Lamellophone_exports,
  Matching: () => Matching_exports,
  Midi: () => Midi_exports,
  MidiInputManager: () => MidiInputManager_default,
  MusicPiece: () => MusicPiece_default,
  Note: () => Note_default,
  NoteArray: () => NoteArray_default,
  Piano: () => Piano_exports,
  PitchSequence: () => PitchSequence_default,
  PriorityMatching: () => PriorityMatching_exports,
  Recording: () => Recording_default,
  SimilarSections: () => SimilarSections_exports,
  Similarity: () => Similarity_exports,
  StringBased: () => stringBased_exports,
  Utils: () => utils_exports,
  getVersion: () => getVersion,
  recordAudio: () => recordAudio,
  recordMidi: () => recordMidi
});

// package.json
var version = "0.54.0";

// src/fileFormats/Midi.js
var Midi_exports = {};
__export(Midi_exports, {
  MIDI_COMMANDS: () => MIDI_COMMANDS,
  MIDI_NOTES: () => MIDI_NOTES,
  MIDI_NOTE_RANGES: () => MIDI_NOTE_RANGES,
  NOTE_NAMES: () => NOTE_NAMES,
  NOTE_NAMES_FLAT: () => NOTE_NAMES_FLAT,
  SHARPS: () => SHARPS,
  flatToSharp: () => flatToSharp,
  getMidiDrumNoteByNr: () => getMidiDrumNoteByNr,
  getMidiInstrumentByNr: () => getMidiInstrumentByNr,
  getMidiInstrumentByNrL2: () => getMidiInstrumentByNrL2,
  getMidiNoteByLabel: () => getMidiNoteByLabel,
  getMidiNoteByNameAndOctave: () => getMidiNoteByNameAndOctave,
  getMidiNoteByNr: () => getMidiNoteByNr,
  getNoteNameFromNoteNr: () => getNoteNameFromNoteNr,
  isSharp: () => isSharp,
  sharpToFlat: () => sharpToFlat
});
var MidiNoteByPitch = /* @__PURE__ */ new Map();
var MidiNoteByLabel = /* @__PURE__ */ new Map();
var MidiInstrumentByNumber = /* @__PURE__ */ new Map();
var MidiInstrumentByNumberLev2 = /* @__PURE__ */ new Map();
function getMidiNoteByNr(nr) {
  return MidiNoteByPitch.get(nr);
}
function getMidiNoteByLabel(label) {
  return MidiNoteByLabel.get(label);
}
function getMidiNoteByNameAndOctave(name, octave) {
  return MidiNoteByLabel.get(`${name}${octave}`);
}
function getMidiInstrumentByNr(nr) {
  return MidiInstrumentByNumber.get(nr);
}
function getMidiInstrumentByNrL2(nr, subNr) {
  const key = `${nr}-${subNr}`;
  return MidiInstrumentByNumberLev2.get(key);
}
function getMidiDrumNoteByNr(nr) {
  return GENERAL_MIDI_DRUM_NOTE_NUMBERS.get(nr);
}
function isSharp(nr) {
  const chroma = nr % 12;
  return chroma === 1 || chroma === 3 || chroma === 6 || chroma === 8 || chroma === 10;
}
function getNoteNameFromNoteNr(nr) {
  return NOTE_NAMES[nr % 12];
}
var flatToSharp = /* @__PURE__ */ new Map([
  ["Cb", "B"],
  ["Db", "C#"],
  ["Eb", "D#"],
  ["Fb", "E"],
  ["Gb", "F#"],
  ["Ab", "G#"],
  ["Bb", "A#"]
]);
var sharpToFlat = /* @__PURE__ */ new Map([
  ["C#", "Db"],
  ["D#", "Eb"],
  ["E#", "F"],
  ["F#", "Gb"],
  ["G#", "Ab"],
  ["A#", "Bb"],
  ["B#", "C"]
]);
var NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];
var NOTE_NAMES_FLAT = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B"
];
var MIDI_NOTES = [
  { pitch: 0, name: "C", octave: -1, label: "C-1", frequency: 8.176 },
  { pitch: 1, name: "C#", octave: -1, label: "C#-1", frequency: 8.662 },
  { pitch: 2, name: "D", octave: -1, label: "D-1", frequency: 9.177 },
  { pitch: 3, name: "D#", octave: -1, label: "D#-1", frequency: 9.723 },
  { pitch: 4, name: "E", octave: -1, label: "E-1", frequency: 10.301 },
  { pitch: 5, name: "F", octave: -1, label: "F-1", frequency: 10.913 },
  { pitch: 6, name: "F#", octave: -1, label: "F#-1", frequency: 11.562 },
  { pitch: 7, name: "G", octave: -1, label: "G-1", frequency: 12.25 },
  { pitch: 8, name: "G#", octave: -1, label: "G#-1", frequency: 12.978 },
  { pitch: 9, name: "A", octave: -1, label: "A-1", frequency: 13.75 },
  { pitch: 10, name: "A#", octave: -1, label: "A#-1", frequency: 14.568 },
  { pitch: 11, name: "B", octave: -1, label: "B-1", frequency: 15.434 },
  { pitch: 12, name: "C", octave: 0, label: "C0", frequency: 16.352 },
  { pitch: 13, name: "C#", octave: 0, label: "C#0", frequency: 17.324 },
  { pitch: 14, name: "D", octave: 0, label: "D0", frequency: 18.354 },
  { pitch: 15, name: "D#", octave: 0, label: "D#0", frequency: 19.445 },
  { pitch: 16, name: "E", octave: 0, label: "E0", frequency: 20.602 },
  { pitch: 17, name: "F", octave: 0, label: "F0", frequency: 21.827 },
  { pitch: 18, name: "F#", octave: 0, label: "F#0", frequency: 23.125 },
  { pitch: 19, name: "G", octave: 0, label: "G0", frequency: 24.5 },
  { pitch: 20, name: "G#", octave: 0, label: "G#0", frequency: 25.957 },
  { pitch: 21, name: "A", octave: 0, label: "A0", frequency: 27.5 },
  { pitch: 22, name: "A#", octave: 0, label: "A#0", frequency: 29.135 },
  { pitch: 23, name: "B", octave: 0, label: "B0", frequency: 30.868 },
  { pitch: 24, name: "C", octave: 1, label: "C1", frequency: 32.703 },
  { pitch: 25, name: "C#", octave: 1, label: "C#1", frequency: 34.648 },
  { pitch: 26, name: "D", octave: 1, label: "D1", frequency: 36.708 },
  { pitch: 27, name: "D#", octave: 1, label: "D#1", frequency: 38.891 },
  { pitch: 28, name: "E", octave: 1, label: "E1", frequency: 41.203 },
  { pitch: 29, name: "F", octave: 1, label: "F1", frequency: 43.654 },
  { pitch: 30, name: "F#", octave: 1, label: "F#1", frequency: 46.249 },
  { pitch: 31, name: "G", octave: 1, label: "G1", frequency: 48.999 },
  { pitch: 32, name: "G#", octave: 1, label: "G#1", frequency: 51.913 },
  { pitch: 33, name: "A", octave: 1, label: "A1", frequency: 55 },
  { pitch: 34, name: "A#", octave: 1, label: "A#1", frequency: 58.27 },
  { pitch: 35, name: "B", octave: 1, label: "B1", frequency: 61.735 },
  { pitch: 36, name: "C", octave: 2, label: "C2", frequency: 65.406 },
  { pitch: 37, name: "C#", octave: 2, label: "C#2", frequency: 69.296 },
  { pitch: 38, name: "D", octave: 2, label: "D2", frequency: 73.416 },
  { pitch: 39, name: "D#", octave: 2, label: "D#2", frequency: 77.782 },
  { pitch: 40, name: "E", octave: 2, label: "E2", frequency: 82.407 },
  { pitch: 41, name: "F", octave: 2, label: "F2", frequency: 87.307 },
  { pitch: 42, name: "F#", octave: 2, label: "F#2", frequency: 92.499 },
  { pitch: 43, name: "G", octave: 2, label: "G2", frequency: 97.999 },
  { pitch: 44, name: "G#", octave: 2, label: "G#2", frequency: 103.826 },
  { pitch: 45, name: "A", octave: 2, label: "A2", frequency: 110 },
  { pitch: 46, name: "A#", octave: 2, label: "A#2", frequency: 116.541 },
  { pitch: 47, name: "B", octave: 2, label: "B2", frequency: 123.471 },
  { pitch: 48, name: "C", octave: 3, label: "C3", frequency: 130.813 },
  { pitch: 49, name: "C#", octave: 3, label: "C#3", frequency: 138.591 },
  { pitch: 50, name: "D", octave: 3, label: "D3", frequency: 146.832 },
  { pitch: 51, name: "D#", octave: 3, label: "D#3", frequency: 155.563 },
  { pitch: 52, name: "E", octave: 3, label: "E3", frequency: 164.814 },
  { pitch: 53, name: "F", octave: 3, label: "F3", frequency: 174.614 },
  { pitch: 54, name: "F#", octave: 3, label: "F#3", frequency: 184.997 },
  { pitch: 55, name: "G", octave: 3, label: "G3", frequency: 195.998 },
  { pitch: 56, name: "G#", octave: 3, label: "G#3", frequency: 207.652 },
  { pitch: 57, name: "A", octave: 3, label: "A3", frequency: 220 },
  { pitch: 58, name: "A#", octave: 3, label: "A#3", frequency: 233.082 },
  { pitch: 59, name: "B", octave: 3, label: "B3", frequency: 246.942 },
  { pitch: 60, name: "C", octave: 4, label: "C4", frequency: 261.626 },
  { pitch: 61, name: "C#", octave: 4, label: "C#4", frequency: 277.183 },
  { pitch: 62, name: "D", octave: 4, label: "D4", frequency: 293.665 },
  { pitch: 63, name: "D#", octave: 4, label: "D#4", frequency: 311.127 },
  { pitch: 64, name: "E", octave: 4, label: "E4", frequency: 329.628 },
  { pitch: 65, name: "F", octave: 4, label: "F4", frequency: 349.228 },
  { pitch: 66, name: "F#", octave: 4, label: "F#4", frequency: 369.994 },
  { pitch: 67, name: "G", octave: 4, label: "G4", frequency: 391.995 },
  { pitch: 68, name: "G#", octave: 4, label: "G#4", frequency: 415.305 },
  { pitch: 69, name: "A", octave: 4, label: "A4", frequency: 440 },
  { pitch: 70, name: "A#", octave: 4, label: "A#4", frequency: 466.164 },
  { pitch: 71, name: "B", octave: 4, label: "B4", frequency: 493.883 },
  { pitch: 72, name: "C", octave: 5, label: "C5", frequency: 523.251 },
  { pitch: 73, name: "C#", octave: 5, label: "C#5", frequency: 554.365 },
  { pitch: 74, name: "D", octave: 5, label: "D5", frequency: 587.33 },
  { pitch: 75, name: "D#", octave: 5, label: "D#5", frequency: 622.254 },
  { pitch: 76, name: "E", octave: 5, label: "E5", frequency: 659.255 },
  { pitch: 77, name: "F", octave: 5, label: "F5", frequency: 698.456 },
  { pitch: 78, name: "F#", octave: 5, label: "F#5", frequency: 739.989 },
  { pitch: 79, name: "G", octave: 5, label: "G5", frequency: 783.991 },
  { pitch: 80, name: "G#", octave: 5, label: "G#5", frequency: 830.609 },
  { pitch: 81, name: "A", octave: 5, label: "A5", frequency: 880 },
  { pitch: 82, name: "A#", octave: 5, label: "A#5", frequency: 932.328 },
  { pitch: 83, name: "B", octave: 5, label: "B5", frequency: 987.767 },
  { pitch: 84, name: "C", octave: 6, label: "C6", frequency: 1046.502 },
  { pitch: 85, name: "C#", octave: 6, label: "C#6", frequency: 1108.731 },
  { pitch: 86, name: "D", octave: 6, label: "D6", frequency: 1174.659 },
  { pitch: 87, name: "D#", octave: 6, label: "D#6", frequency: 1244.508 },
  { pitch: 88, name: "E", octave: 6, label: "E6", frequency: 1318.51 },
  { pitch: 89, name: "F", octave: 6, label: "F6", frequency: 1396.913 },
  { pitch: 90, name: "F#", octave: 6, label: "F#6", frequency: 1479.978 },
  { pitch: 91, name: "G", octave: 6, label: "G6", frequency: 1567.982 },
  { pitch: 92, name: "G#", octave: 6, label: "G#6", frequency: 1661.219 },
  { pitch: 93, name: "A", octave: 6, label: "A6", frequency: 1760 },
  { pitch: 94, name: "A#", octave: 6, label: "A#6", frequency: 1864.655 },
  { pitch: 95, name: "B", octave: 6, label: "B6", frequency: 1975.533 },
  { pitch: 96, name: "C", octave: 7, label: "C7", frequency: 2093.005 },
  { pitch: 97, name: "C#", octave: 7, label: "C#7", frequency: 2217.461 },
  { pitch: 98, name: "D", octave: 7, label: "D7", frequency: 2349.318 },
  { pitch: 99, name: "D#", octave: 7, label: "D#7", frequency: 2489.016 },
  { pitch: 100, name: "E", octave: 7, label: "E7", frequency: 2637.02 },
  { pitch: 101, name: "F", octave: 7, label: "F7", frequency: 2793.826 },
  { pitch: 102, name: "F#", octave: 7, label: "F#7", frequency: 2959.955 },
  { pitch: 103, name: "G", octave: 7, label: "G7", frequency: 3135.963 },
  { pitch: 104, name: "G#", octave: 7, label: "G#7", frequency: 3322.438 },
  { pitch: 105, name: "A", octave: 7, label: "A7", frequency: 3520 },
  { pitch: 106, name: "A#", octave: 7, label: "A#7", frequency: 3729.31 },
  { pitch: 107, name: "B", octave: 7, label: "B7", frequency: 3951.066 },
  { pitch: 108, name: "C", octave: 8, label: "C8", frequency: 4186.009 },
  { pitch: 109, name: "C#", octave: 8, label: "C#8", frequency: 4434.922 },
  { pitch: 110, name: "D", octave: 8, label: "D8", frequency: 4698.636 },
  { pitch: 111, name: "D#", octave: 8, label: "D#8", frequency: 4978.032 },
  { pitch: 112, name: "E", octave: 8, label: "E8", frequency: 5274.041 },
  { pitch: 113, name: "F", octave: 8, label: "F8", frequency: 5587.652 },
  { pitch: 114, name: "F#", octave: 8, label: "F#8", frequency: 5919.911 },
  { pitch: 115, name: "G", octave: 8, label: "G8", frequency: 6271.927 },
  { pitch: 116, name: "G#", octave: 8, label: "G#8", frequency: 6644.875 },
  { pitch: 117, name: "A", octave: 8, label: "A8", frequency: 7040 },
  { pitch: 118, name: "A#", octave: 8, label: "A#8", frequency: 7458.62 },
  { pitch: 119, name: "B", octave: 8, label: "B8", frequency: 7902.133 },
  { pitch: 120, name: "C", octave: 9, label: "C9", frequency: 8372.018 },
  { pitch: 121, name: "C#", octave: 9, label: "C#9", frequency: 8869.844 },
  { pitch: 122, name: "D", octave: 9, label: "D9", frequency: 9397.273 },
  { pitch: 123, name: "D#", octave: 9, label: "D#9", frequency: 9956.063 },
  { pitch: 124, name: "E", octave: 9, label: "E9", frequency: 10548.08 },
  { pitch: 125, name: "F", octave: 9, label: "F9", frequency: 11175.3 },
  { pitch: 126, name: "F#", octave: 9, label: "F#9", frequency: 11839.82 },
  { pitch: 127, name: "G", octave: 9, label: "G9", frequency: 12543.85 }
];
var SHARPS = /* @__PURE__ */ new Set([
  1,
  3,
  6,
  8,
  10,
  13,
  15,
  18,
  20,
  22,
  25,
  27,
  30,
  32,
  34,
  37,
  39,
  42,
  44,
  46,
  49,
  51,
  54,
  56,
  58,
  61,
  63,
  66,
  68,
  70,
  73,
  75,
  78,
  80,
  82,
  85,
  87,
  90,
  92,
  94,
  97,
  99,
  102,
  104,
  106,
  109,
  111,
  114,
  116,
  118,
  121,
  123,
  126
]);
var MIDI_COMMANDS = /* @__PURE__ */ new Map([
  [128, { name: "noteOff", description: "Note-off", params: ["key", "velocity"] }],
  [144, { name: "noteOn", description: "Note-on", params: ["key", "velocity"] }],
  [160, { name: "aftertouch", description: "Aftertouch", params: ["key", "touch"] }],
  [176, { name: "continuousController", description: "Continuous controller", params: ["controller #", "controller value"] }],
  [192, { name: "patchChange", description: "Patch change", params: ["instrument number", "instrument number"] }],
  [208, { name: "channelPressure", description: "Channel Pressure", params: ["pressure"] }],
  [224, { name: "pitchBend", description: "Pitch bend", params: ["lsb (7 bits)", "msb (7 bits)"] }],
  [240, { name: "sysExStart", description: "start of system exclusive message" }],
  [241, { name: "timeCodeQuarter", description: "MIDI Time Code Quarter Frame (Sys Common)" }],
  [242, { name: "posPointer", description: "Song Position Pointer (Sys Common)" }],
  [243, { name: "songSelect", description: "Song Select (Sys Common)" }],
  [244, { name: "unknown1", description: "???" }],
  [245, { name: "unknown2", description: "???" }],
  [246, { name: "tuneRequest", description: "Tune Request (Sys Common)" }],
  [247, { name: "syExEnd", description: "end of system exclusive message 0" }],
  [248, { name: "timingClock", description: "Timing Clock (Sys Realtime)" }],
  [250, { name: "start", description: "Start (Sys Realtime)" }],
  [251, { name: "continue", description: "Continue (Sys Realtime)" }],
  [252, { name: "stop", description: "Stop (Sys Realtime)" }],
  [253, { name: "unknwon3", description: "???" }],
  [254, { name: "activeSensing", description: "Active Sensing (Sys Realtime)" }],
  [255, { name: "systemReset", description: "System Reset (Sys Realtime)" }]
]);
var MIDI_INSTRUMENTS = [
  { number: 0, group: "Piano", label: "Acoustic Grand Piano" },
  { number: 1, group: "Piano", label: "Bright Acoustic Piano" },
  { number: 2, group: "Piano", label: "Electric Grand Piano" },
  { number: 3, group: "Piano", label: "Honky-tonk Piano" },
  { number: 4, group: "Piano", label: "Electric Piano 1" },
  { number: 5, group: "Piano", label: "Electric Piano 2" },
  { number: 6, group: "Piano", label: "Harpsichord" },
  { number: 7, group: "Piano", label: "Clavinet" },
  { number: 8, group: "Chromatic Percussion", label: "Celesta" },
  { number: 9, group: "Chromatic Percussion", label: "Glockenspiel" },
  { number: 10, group: "Chromatic Percussion", label: "Music Box" },
  { number: 11, group: "Chromatic Percussion", label: "Vibraphone" },
  { number: 12, group: "Chromatic Percussion", label: "Marimba" },
  { number: 13, group: "Chromatic Percussion", label: "Xylophone" },
  { number: 14, group: "Chromatic Percussion", label: "Tubular Bells" },
  { number: 15, group: "Chromatic Percussion", label: "Dulcimer" },
  { number: 16, group: "Organ", label: "Drawbar Organ" },
  { number: 17, group: "Organ", label: "Percussive Organ" },
  { number: 18, group: "Organ", label: "Rock Organ" },
  { number: 19, group: "Organ", label: "Church Organ" },
  { number: 20, group: "Organ", label: "Reed Organ" },
  { number: 21, group: "Organ", label: "Accordion" },
  { number: 22, group: "Organ", label: "Harmonica" },
  { number: 23, group: "Organ", label: "Tango Accordion" },
  { number: 24, group: "Guitar", label: "Acoustic Guitar(nylon)" },
  { number: 25, group: "Guitar", label: "Acoustic Guitar(steel)" },
  { number: 26, group: "Guitar", label: "Electric Guitar(jazz)" },
  { number: 27, group: "Guitar", label: "Electric Guitar(clean)" },
  { number: 28, group: "Guitar", label: "Electric Guitar(muted)" },
  { number: 29, group: "Guitar", label: "Overdriven Guitar" },
  { number: 30, group: "Guitar", label: "Distortion Guitar" },
  { number: 31, group: "Guitar", label: "Guitar harmonics" },
  { number: 32, group: "Bass", label: "Acoustic Bass" },
  { number: 33, group: "Bass", label: "Electric Bass(finger)" },
  { number: 34, group: "Bass", label: "Electric Bass(pick)" },
  { number: 35, group: "Bass", label: "Fretless Bass" },
  { number: 36, group: "Bass", label: "Slap Bass 1" },
  { number: 37, group: "Bass", label: "Slap Bass 2" },
  { number: 38, group: "Bass", label: "Synth Bass 1" },
  { number: 39, group: "Bass", label: "Synth Bass 2" },
  { number: 40, group: "Strings", label: "Violin" },
  { number: 41, group: "Strings", label: "Viola" },
  { number: 42, group: "Strings", label: "Cello" },
  { number: 43, group: "Strings", label: "Contrabass" },
  { number: 44, group: "Strings", label: "Tremolo Strings" },
  { number: 45, group: "Strings", label: "Pizzicato Strings" },
  { number: 46, group: "Strings", label: "Orchestral Harp" },
  { number: 47, group: "Strings", label: "Timpani" },
  { number: 48, group: "Strings (continued)", label: "String Ensemble 1" },
  { number: 49, group: "Strings (continued)", label: "String Ensemble 2" },
  { number: 50, group: "Strings (continued)", label: "Synth Strings 1" },
  { number: 51, group: "Strings (continued)", label: "Synth Strings 2" },
  { number: 52, group: "Strings (continued)", label: "Choir Aahs" },
  { number: 53, group: "Strings (continued)", label: "Voice Oohs" },
  { number: 54, group: "Strings (continued)", label: "Synth Voice" },
  { number: 55, group: "Strings (continued)", label: "Orchestra Hit" },
  { number: 56, group: "Brass", label: "Trumpet" },
  { number: 57, group: "Brass", label: "Trombone" },
  { number: 58, group: "Brass", label: "Tuba" },
  { number: 59, group: "Brass", label: "Muted Trumpet" },
  { number: 60, group: "Brass", label: "French Horn" },
  { number: 61, group: "Brass", label: "Brass Section" },
  { number: 62, group: "Brass", label: "Synth Brass 1" },
  { number: 63, group: "Brass", label: "Synth Brass 2" },
  { number: 64, group: "Reed", label: "Soprano Sax" },
  { number: 65, group: "Reed", label: "Alto Sax" },
  { number: 66, group: "Reed", label: "Tenor Sax" },
  { number: 67, group: "Reed", label: "Baritone Sax" },
  { number: 68, group: "Reed", label: "Oboe" },
  { number: 69, group: "Reed", label: "English Horn" },
  { number: 70, group: "Reed", label: "Bassoon" },
  { number: 71, group: "Reed", label: "Clarinet" },
  { number: 72, group: "Pipe", label: "Piccolo" },
  { number: 73, group: "Pipe", label: "Flute" },
  { number: 74, group: "Pipe", label: "Recorder" },
  { number: 75, group: "Pipe", label: "Pan Flute" },
  { number: 76, group: "Pipe", label: "Blown Bottle" },
  { number: 77, group: "Pipe", label: "Shakuhachi" },
  { number: 78, group: "Pipe", label: "Whistle" },
  { number: 79, group: "Pipe", label: "Ocarina" },
  { number: 80, group: "Synth Lead", label: "Lead 1(square)" },
  { number: 81, group: "Synth Lead", label: "Lead 2(sawtooth)" },
  { number: 82, group: "Synth Lead", label: "Lead 3(calliope)" },
  { number: 83, group: "Synth Lead", label: "Lead 4(chiff)" },
  { number: 84, group: "Synth Lead", label: "Lead 5(charang)" },
  { number: 85, group: "Synth Lead", label: "Lead 6(voice)" },
  { number: 86, group: "Synth Lead", label: "Lead 7(fifths)" },
  { number: 87, group: "Synth Lead", label: "Lead 8(bass + lead)" },
  { number: 88, group: "Synth Pad", label: "Pad 1(new age)" },
  { number: 89, group: "Synth Pad", label: "Pad 2(warm)" },
  { number: 90, group: "Synth Pad", label: "Pad 3(polysynth)" },
  { number: 91, group: "Synth Pad", label: "Pad 4(choir)" },
  { number: 92, group: "Synth Pad", label: "Pad 5(bowed)" },
  { number: 93, group: "Synth Pad", label: "Pad 6(metallic)" },
  { number: 94, group: "Synth Pad", label: "Pad 7(halo)" },
  { number: 95, group: "Synth Pad", label: "Pad 8(sweep)" },
  { number: 96, group: "Synth Effects", label: "FX 1(rain)" },
  { number: 97, group: "Synth Effects", label: "FX 2(soundtrack)" },
  { number: 98, group: "Synth Effects", label: "FX 3(crystal)" },
  { number: 99, group: "Synth Effects", label: "FX 4(atmosphere)" },
  { number: 100, group: "Synth Effects", label: "FX 5(brightness)" },
  { number: 101, group: "Synth Effects", label: "FX 6(goblins)" },
  { number: 102, group: "Synth Effects", label: "FX 7(echoes)" },
  { number: 103, group: "Synth Effects", label: "FX 8(sci-fi)" },
  { number: 104, group: "Ethnic", label: "Sitar" },
  { number: 105, group: "Ethnic", label: "Banjo" },
  { number: 106, group: "Ethnic", label: "Shamisen" },
  { number: 107, group: "Ethnic", label: "Koto" },
  { number: 108, group: "Ethnic", label: "Kalimba" },
  { number: 109, group: "Ethnic", label: "Bag pipe" },
  { number: 110, group: "Ethnic", label: "Fiddle" },
  { number: 111, group: "Ethnic", label: "Shanai" },
  { number: 112, group: "Percussive", label: "Tinkle Bell" },
  { number: 113, group: "Percussive", label: "Agogo" },
  { number: 114, group: "Percussive", label: "Steel Drums" },
  { number: 115, group: "Percussive", label: "Woodblock" },
  { number: 116, group: "Percussive", label: "Taiko Drum" },
  { number: 117, group: "Percussive", label: "Melodic Tom" },
  { number: 118, group: "Percussive", label: "Synth Drum" },
  { number: 119, group: "Sound Effects", label: "Reverse Cymbal" },
  { number: 120, group: "Sound Effects", label: "Guitar Fret Noise" },
  { number: 121, group: "Sound Effects", label: "Breath Noise" },
  { number: 122, group: "Sound Effects", label: "Seashore" },
  { number: 123, group: "Sound Effects", label: "Bird Tweet" },
  { number: 124, group: "Sound Effects", label: "Telephone Ring" },
  { number: 125, group: "Sound Effects", label: "Helicopter" },
  { number: 126, group: "Sound Effects", label: "Applause" },
  { number: 127, group: "Sound Effects", label: "Gunshot" }
];
var MIDI_INSTRUMENTS_LEV2 = [
  { number: 1, subnumber: 0, group: "Piano", label: "Acoustic Grand Piano" },
  { number: 1, subnumber: 1, group: "Piano", label: "Wide Acoustic Grand" },
  { number: 1, subnumber: 2, group: "Piano", label: "Dark Acoustic Grand" },
  { number: 2, subnumber: 0, group: "Piano", label: "Bright Acoustic Piano" },
  { number: 2, subnumber: 1, group: "Piano", label: "Wide Bright Acoustic" },
  { number: 3, subnumber: 0, group: "Piano", label: "Electric Grand Piano" },
  { number: 3, subnumber: 1, group: "Piano", label: "Wide Electric Grand" },
  { number: 4, subnumber: 0, group: "Piano", label: "Honky-tonk Piano" },
  { number: 4, subnumber: 1, group: "Piano", label: "Wide Honky-tonk" },
  { number: 5, subnumber: 0, group: "Piano", label: "Rhodes Piano" },
  { number: 5, subnumber: 1, group: "Piano", label: "Detuned Electric Piano 1" },
  { number: 5, subnumber: 2, group: "Piano", label: "Electric Piano 1 Variation" },
  { number: 5, subnumber: 3, group: "Piano", label: "60's Electric Piano" },
  { number: 6, subnumber: 0, group: "Piano", label: "Chorused Electric Piano" },
  { number: 6, subnumber: 1, group: "Piano", label: "Detuned Electric Piano 2" },
  { number: 6, subnumber: 2, group: "Piano", label: "Electric Piano 2 Variation" },
  { number: 6, subnumber: 3, group: "Piano", label: "Electric Piano Legend" },
  { number: 6, subnumber: 4, group: "Piano", label: "Electric Piano Phase" },
  { number: 7, subnumber: 0, group: "Piano", label: "Harpsichord" },
  { number: 7, subnumber: 1, group: "Piano", label: "Coupled Harpsichord" },
  { number: 7, subnumber: 2, group: "Piano", label: "Wide Harpsichord" },
  { number: 7, subnumber: 3, group: "Piano", label: "Open Harpsichord" },
  { number: 8, subnumber: 0, group: "Piano", label: "Clavinet" },
  { number: 8, subnumber: 1, group: "Piano", label: "Pulse Clavinet" },
  { number: 9, subnumber: 0, group: "Chromatic Percussion", label: "Celesta" },
  { number: 10, subnumber: 0, group: "Chromatic Percussion", label: "Glockenspiel" },
  { number: 11, subnumber: 0, group: "Chromatic Percussion", label: "Music Box" },
  { number: 12, subnumber: 0, group: "Chromatic Percussion", label: "Vibraphone" },
  { number: 12, subnumber: 1, group: "Chromatic Percussion", label: "Wet Vibraphone" },
  { number: 13, subnumber: 0, group: "Chromatic Percussion", label: "Marimba" },
  { number: 13, subnumber: 1, group: "Chromatic Percussion", label: "Wide Marimba" },
  { number: 14, subnumber: 0, group: "Chromatic Percussion", label: "Xylophone" },
  { number: 15, subnumber: 0, group: "Chromatic Percussion", label: "Tubular Bells" },
  { number: 15, subnumber: 1, group: "Chromatic Percussion", label: "Church Bells" },
  { number: 15, subnumber: 2, group: "Chromatic Percussion", label: "Carillon" },
  { number: 16, subnumber: 0, group: "Chromatic Percussion", label: "Dulcimer / Santur" },
  { number: 17, subnumber: 0, group: "Organ", label: "Hammond Organ" },
  { number: 17, subnumber: 1, group: "Organ", label: "Detuned Organ 1" },
  { number: 17, subnumber: 2, group: "Organ", label: "60's Organ 1" },
  { number: 17, subnumber: 3, group: "Organ", label: "Organ 4" },
  { number: 18, subnumber: 0, group: "Organ", label: "Percussive Organ" },
  { number: 18, subnumber: 1, group: "Organ", label: "Detuned Organ 2" },
  { number: 18, subnumber: 2, group: "Organ", label: "Organ 5" },
  { number: 19, subnumber: 0, group: "Organ", label: "Rock Organ" },
  { number: 20, subnumber: 0, group: "Organ", label: "Church Organ 1" },
  { number: 20, subnumber: 1, group: "Organ", label: "Church Organ 2" },
  { number: 20, subnumber: 2, group: "Organ", label: "Church Organ 3" },
  { number: 21, subnumber: 0, group: "Organ", label: "Reed Organ" },
  { number: 21, subnumber: 1, group: "Organ", label: "Puff Organ" },
  { number: 22, subnumber: 0, group: "Organ", label: "French Accordion" },
  { number: 22, subnumber: 1, group: "Organ", label: "Italian Accordion" },
  { number: 23, subnumber: 0, group: "Organ", label: "Harmonica" },
  { number: 24, subnumber: 0, group: "Organ", label: "Bandoneon" },
  { number: 25, subnumber: 0, group: "Guitar", label: "Nylon-String Guitar" },
  { number: 25, subnumber: 1, group: "Guitar", label: "Ukelele" },
  { number: 25, subnumber: 2, group: "Guitar", label: "Open Nylon Guitar" },
  { number: 25, subnumber: 3, group: "Guitar", label: "Nylon Guitar 2" },
  { number: 26, subnumber: 0, group: "Guitar", label: "Steel-String Guitar" },
  { number: 26, subnumber: 1, group: "Guitar", label: "12-String Guitar" },
  { number: 26, subnumber: 2, group: "Guitar", label: "Mandolin" },
  { number: 26, subnumber: 3, group: "Guitar", label: "Steel + Body" },
  { number: 27, subnumber: 0, group: "Guitar", label: "Jazz Guitar" },
  { number: 27, subnumber: 1, group: "Guitar", label: "Hawaiian Guitar" },
  { number: 28, subnumber: 0, group: "Guitar", label: "Clean Electric Guitar" },
  { number: 28, subnumber: 1, group: "Guitar", label: "Chorus Guitar" },
  { number: 28, subnumber: 2, group: "Guitar", label: "Mid Tone Guitar" },
  { number: 29, subnumber: 0, group: "Guitar", label: "Muted Electric Guitar" },
  { number: 29, subnumber: 1, group: "Guitar", label: "Funk Guitar" },
  { number: 29, subnumber: 2, group: "Guitar", label: "Funk Guitar 2" },
  { number: 29, subnumber: 3, group: "Guitar", label: "Jazz Man" },
  { number: 30, subnumber: 0, group: "Guitar", label: "Overdriven Guitar" },
  { number: 30, subnumber: 1, group: "Guitar", label: "Guitar Pinch" },
  { number: 31, subnumber: 0, group: "Guitar", label: "Distortion Guitar" },
  { number: 31, subnumber: 1, group: "Guitar", label: "Feedback Guitar" },
  { number: 31, subnumber: 2, group: "Guitar", label: "Distortion Rtm Guitar" },
  { number: 32, subnumber: 0, group: "Guitar", label: "Guitar Harmonics" },
  { number: 32, subnumber: 1, group: "Guitar", label: "Guitar Feedback" },
  { number: 33, subnumber: 0, group: "Bass", label: "Acoustic Bass" },
  { number: 34, subnumber: 0, group: "Bass", label: "Fingered Bass" },
  { number: 34, subnumber: 1, group: "Bass", label: "Finger Slap" },
  { number: 35, subnumber: 0, group: "Bass", label: "Picked Bass" },
  { number: 36, subnumber: 0, group: "Bass", label: "Fretless Bass" },
  { number: 37, subnumber: 0, group: "Bass", label: "Slap Bass 1" },
  { number: 38, subnumber: 0, group: "Bass", label: "Slap Bass 2" },
  { number: 39, subnumber: 0, group: "Bass", label: "Synth Bass 1" },
  { number: 39, subnumber: 1, group: "Bass", label: "Synth Bass 101" },
  { number: 39, subnumber: 2, group: "Bass", label: "Synth Bass 3" },
  { number: 39, subnumber: 3, group: "Bass", label: "Clavi Bass" },
  { number: 39, subnumber: 4, group: "Bass", label: "Hammer" },
  { number: 40, subnumber: 0, group: "Bass", label: "Synth Bass 2" },
  { number: 40, subnumber: 1, group: "Bass", label: "Synth Bass 4" },
  { number: 40, subnumber: 2, group: "Bass", label: "Rubber Bass" },
  { number: 40, subnumber: 3, group: "Bass", label: "Attack Pulse" },
  { number: 41, subnumber: 0, group: "Strings", label: "Violin" },
  { number: 41, subnumber: 1, group: "Strings", label: "Slow Violin" },
  { number: 42, subnumber: 0, group: "Strings", label: "Viola" },
  { number: 43, subnumber: 0, group: "Strings", label: "Cello" },
  { number: 44, subnumber: 0, group: "Strings", label: "Contrabass" },
  { number: 45, subnumber: 0, group: "Strings", label: "Tremolo Strings" },
  { number: 46, subnumber: 0, group: "Strings", label: "Pizzicato Strings" },
  { number: 47, subnumber: 0, group: "Strings", label: "Harp" },
  { number: 47, subnumber: 1, group: "Strings", label: "Yang Qin" },
  { number: 48, subnumber: 0, group: "Strings", label: "Timpani" },
  { number: 49, subnumber: 0, group: "Orchestral Ensemble", label: "String Ensemble" },
  { number: 49, subnumber: 1, group: "Orchestral Ensemble", label: "Orchestra Strings" },
  { number: 49, subnumber: 2, group: "Orchestral Ensemble", label: "60's Strings" },
  { number: 50, subnumber: 0, group: "Orchestral Ensemble", label: "Slow String Ensemble" },
  { number: 51, subnumber: 0, group: "Orchestral Ensemble", label: "Synth Strings 1" },
  { number: 51, subnumber: 1, group: "Orchestral Ensemble", label: "Synth Strings 3" },
  { number: 52, subnumber: 0, group: "Orchestral Ensemble", label: "Synth Strings 2" },
  { number: 53, subnumber: 0, group: "Orchestral Ensemble", label: "Choir Aahs" },
  { number: 53, subnumber: 1, group: "Orchestral Ensemble", label: "Choir Aahs 2" },
  { number: 54, subnumber: 0, group: "Orchestral Ensemble", label: "Voice Oohs" },
  { number: 54, subnumber: 1, group: "Orchestral Ensemble", label: "Humming" },
  { number: 55, subnumber: 0, group: "Orchestral Ensemble", label: "Synth Voice" },
  { number: 55, subnumber: 1, group: "Orchestral Ensemble", label: "Analog Voice" },
  { number: 56, subnumber: 0, group: "Orchestral Ensemble", label: "Orchestra Hit" },
  { number: 56, subnumber: 1, group: "Orchestral Ensemble", label: "Bass Hit" },
  { number: 56, subnumber: 2, group: "Orchestral Ensemble", label: "6th Hit" },
  { number: 56, subnumber: 3, group: "Orchestral Ensemble", label: "Euro Hit" },
  { number: 57, subnumber: 0, group: "Brass", label: "Trumpet" },
  { number: 57, subnumber: 1, group: "Brass", label: "Dark Trumpet" },
  { number: 58, subnumber: 0, group: "Brass", label: "Trombone" },
  { number: 58, subnumber: 1, group: "Brass", label: "Trombone 2" },
  { number: 58, subnumber: 2, group: "Brass", label: "Bright Trombone" },
  { number: 59, subnumber: 0, group: "Brass", label: "Tuba" },
  { number: 60, subnumber: 0, group: "Brass", label: "Muted Trumpet" },
  { number: 60, subnumber: 1, group: "Brass", label: "Muted Trumpet 2" },
  { number: 61, subnumber: 0, group: "Brass", label: "French Horn" },
  { number: 61, subnumber: 1, group: "Brass", label: "French Horn 2" },
  { number: 62, subnumber: 0, group: "Brass", label: "Brass Section" },
  { number: 62, subnumber: 1, group: "Brass", label: "Brass Section" },
  { number: 63, subnumber: 0, group: "Brass", label: "Synth Brass 1" },
  { number: 63, subnumber: 1, group: "Brass", label: "Synth Brass 3" },
  { number: 63, subnumber: 2, group: "Brass", label: "Analog Brass 1" },
  { number: 63, subnumber: 3, group: "Brass", label: "Jump Brass" },
  { number: 64, subnumber: 0, group: "Brass", label: "Synth Brass 2" },
  { number: 64, subnumber: 1, group: "Brass", label: "Synth Brass 4" },
  { number: 64, subnumber: 2, group: "Brass", label: "Analog Brass 2" },
  { number: 65, subnumber: 0, group: "Reed", label: "Soprano Sax" },
  { number: 66, subnumber: 0, group: "Reed", label: "Alto Sax" },
  { number: 67, subnumber: 0, group: "Reed", label: "Tenor Sax" },
  { number: 68, subnumber: 0, group: "Reed", label: "Baritone Sax" },
  { number: 69, subnumber: 0, group: "Reed", label: "Oboe" },
  { number: 70, subnumber: 0, group: "Reed", label: "English Horn" },
  { number: 71, subnumber: 0, group: "Reed", label: "Bassoon" },
  { number: 72, subnumber: 0, group: "Reed", label: "Clarinet" },
  { number: 73, subnumber: 0, group: "Wind", label: "Piccolo" },
  { number: 74, subnumber: 0, group: "Wind", label: "Flute" },
  { number: 75, subnumber: 0, group: "Wind", label: "Recorder" },
  { number: 76, subnumber: 0, group: "Wind", label: "Pan Flute" },
  { number: 77, subnumber: 0, group: "Wind", label: "Blown Bottle" },
  { number: 78, subnumber: 0, group: "Wind", label: "Shakuhachi" },
  { number: 79, subnumber: 0, group: "Wind", label: "Whistle" },
  { number: 80, subnumber: 0, group: "Wind", label: "Ocarina" },
  { number: 81, subnumber: 0, group: "Lead", label: "Square Lead" },
  { number: 81, subnumber: 1, group: "Lead", label: "Square Wave" },
  { number: 81, subnumber: 2, group: "Lead", label: "Sine Wave" },
  { number: 82, subnumber: 0, group: "Lead", label: "Saw Lead" },
  { number: 82, subnumber: 1, group: "Lead", label: "Saw Wave" },
  { number: 82, subnumber: 2, group: "Lead", label: "Doctor Solo" },
  { number: 82, subnumber: 3, group: "Lead", label: "Natural Lead" },
  { number: 82, subnumber: 4, group: "Lead", label: "Sequenced Saw" },
  { number: 83, subnumber: 0, group: "Lead", label: "Synth Calliope" },
  { number: 84, subnumber: 0, group: "Lead", label: "Chiffer Lead" },
  { number: 85, subnumber: 0, group: "Lead", label: "Charang" },
  { number: 85, subnumber: 1, group: "Lead", label: "Wire Lead" },
  { number: 86, subnumber: 0, group: "Lead", label: "Solo Synth Vox" },
  { number: 87, subnumber: 0, group: "Lead", label: "5th Saw Wave" },
  { number: 88, subnumber: 0, group: "Lead", label: "Bass & Lead" },
  { number: 88, subnumber: 1, group: "Lead", label: "Delayed Lead" },
  { number: 89, subnumber: 0, group: "Synth Pad", label: "Fantasia Pad" },
  { number: 90, subnumber: 0, group: "Synth Pad", label: "Warm Pad" },
  { number: 90, subnumber: 1, group: "Synth Pad", label: "Sine Pad" },
  { number: 91, subnumber: 0, group: "Synth Pad", label: "Polysynth Pad" },
  { number: 92, subnumber: 0, group: "Synth Pad", label: "Space Voice Pad" },
  { number: 92, subnumber: 1, group: "Synth Pad", label: "Itopia" },
  { number: 93, subnumber: 0, group: "Synth Pad", label: "Bowed Glass Pad" },
  { number: 94, subnumber: 0, group: "Synth Pad", label: "Metal Pad" },
  { number: 95, subnumber: 0, group: "Synth Pad", label: "Halo Pad" },
  { number: 96, subnumber: 0, group: "Synth Pad", label: "Sweep Pad" },
  { number: 97, subnumber: 0, group: "Synth Effects", label: "Ice Rain" },
  { number: 98, subnumber: 0, group: "Synth Effects", label: "Soundtrack" },
  { number: 99, subnumber: 0, group: "Synth Effects", label: "Crystal" },
  { number: 99, subnumber: 1, group: "Synth Effects", label: "Synth Mallet" },
  { number: 100, subnumber: 0, group: "Synth Effects", label: "Atmosphere" },
  { number: 101, subnumber: 0, group: "Synth Effects", label: "Brightness" },
  { number: 102, subnumber: 0, group: "Synth Effects", label: "Goblin" },
  { number: 103, subnumber: 0, group: "Synth Effects", label: "Echo Drops" },
  { number: 103, subnumber: 1, group: "Synth Effects", label: "Echo Bell" },
  { number: 103, subnumber: 2, group: "Synth Effects", label: "Echo Pan" },
  { number: 104, subnumber: 0, group: "Synth Effects", label: "Star Theme" },
  { number: 105, subnumber: 0, group: "Ethnic", label: "Sitar" },
  { number: 105, subnumber: 1, group: "Ethnic", label: "Sitar 2" },
  { number: 106, subnumber: 0, group: "Ethnic", label: "Banjo" },
  { number: 107, subnumber: 0, group: "Ethnic", label: "Shamisen" },
  { number: 108, subnumber: 0, group: "Ethnic", label: "Koto" },
  { number: 108, subnumber: 1, group: "Ethnic", label: "Taisho Koto" },
  { number: 109, subnumber: 0, group: "Ethnic", label: "Kalimba" },
  { number: 110, subnumber: 0, group: "Ethnic", label: "Bagpipe" },
  { number: 111, subnumber: 0, group: "Ethnic", label: "Fiddle" },
  { number: 112, subnumber: 0, group: "Ethnic", label: "Shanai" },
  { number: 113, subnumber: 0, group: "Percussive", label: "Tinkle Bell" },
  { number: 114, subnumber: 0, group: "Percussive", label: "Agogo" },
  { number: 115, subnumber: 0, group: "Percussive", label: "Steel Drums" },
  { number: 116, subnumber: 0, group: "Percussive", label: "Woodblock" },
  { number: 116, subnumber: 1, group: "Percussive", label: "Castanets" },
  { number: 117, subnumber: 0, group: "Percussive", label: "Taiko Drum" },
  { number: 117, subnumber: 1, group: "Percussive", label: "Concert Bass Drum" },
  { number: 118, subnumber: 0, group: "Percussive", label: "Melodic Tom 1" },
  { number: 118, subnumber: 1, group: "Percussive", label: "Melodic Tom 2" },
  { number: 119, subnumber: 0, group: "Percussive", label: "Synth Drum" },
  { number: 119, subnumber: 1, group: "Percussive", label: "808 Tom" },
  { number: 119, subnumber: 2, group: "Percussive", label: "Electric Percussion" },
  { number: 120, subnumber: 0, group: "Percussive", label: "Reverse Cymbal" },
  { number: 121, subnumber: 0, group: "Sound Effects", label: "Guitar Fret Noise" },
  { number: 121, subnumber: 1, group: "Sound Effects", label: "Guitar Cut Noise" },
  { number: 121, subnumber: 2, group: "Sound Effects", label: "String Slap" },
  { number: 122, subnumber: 0, group: "Sound Effects", label: "Breath Noise" },
  { number: 122, subnumber: 1, group: "Sound Effects", label: "Flute Key Click" },
  { number: 123, subnumber: 0, group: "Sound Effects", label: "Seashore" },
  { number: 123, subnumber: 1, group: "Sound Effects", label: "Rain" },
  { number: 123, subnumber: 2, group: "Sound Effects", label: "Thunder" },
  { number: 123, subnumber: 3, group: "Sound Effects", label: "Wind" },
  { number: 123, subnumber: 4, group: "Sound Effects", label: "Stream" },
  { number: 123, subnumber: 5, group: "Sound Effects", label: "Bubble" },
  { number: 124, subnumber: 0, group: "Sound Effects", label: "Bird Tweet" },
  { number: 124, subnumber: 1, group: "Sound Effects", label: "Dog" },
  { number: 124, subnumber: 2, group: "Sound Effects", label: "Horse Gallop" },
  { number: 124, subnumber: 3, group: "Sound Effects", label: "Bird 2" },
  { number: 125, subnumber: 0, group: "Sound Effects", label: "Telephone 1" },
  { number: 125, subnumber: 1, group: "Sound Effects", label: "Telephone 2" },
  { number: 125, subnumber: 2, group: "Sound Effects", label: "Door Creaking" },
  { number: 125, subnumber: 3, group: "Sound Effects", label: "Door Closing" },
  { number: 125, subnumber: 4, group: "Sound Effects", label: "Scratch" },
  { number: 125, subnumber: 5, group: "Sound Effects", label: "Wind Chimes" },
  { number: 126, subnumber: 0, group: "Sound Effects", label: "Helicopter" },
  { number: 126, subnumber: 1, group: "Sound Effects", label: "Car Engine" },
  { number: 126, subnumber: 2, group: "Sound Effects", label: "Car Stop" },
  { number: 126, subnumber: 3, group: "Sound Effects", label: "Car Pass" },
  { number: 126, subnumber: 4, group: "Sound Effects", label: "Car Crash" },
  { number: 126, subnumber: 5, group: "Sound Effects", label: "Siren" },
  { number: 126, subnumber: 6, group: "Sound Effects", label: "Train" },
  { number: 126, subnumber: 7, group: "Sound Effects", label: "Jetplane" },
  { number: 126, subnumber: 8, group: "Sound Effects", label: "Starship" },
  { number: 126, subnumber: 9, group: "Sound Effects", label: "Burst Noise" },
  { number: 127, subnumber: 0, group: "Sound Effects", label: "Applause" },
  { number: 127, subnumber: 1, group: "Sound Effects", label: "Laughing" },
  { number: 127, subnumber: 2, group: "Sound Effects", label: "Screaming" },
  { number: 127, subnumber: 3, group: "Sound Effects", label: "Punch" },
  { number: 127, subnumber: 4, group: "Sound Effects", label: "Heart Beat" },
  { number: 127, subnumber: 5, group: "Sound Effects", label: "Footsteps" },
  { number: 128, subnumber: 0, group: "Sound Effects", label: "Gun Shot" },
  { number: 128, subnumber: 1, group: "Sound Effects", label: "Machine Gun" },
  { number: 128, subnumber: 2, group: "Sound Effects", label: "Lasergun" },
  { number: 128, subnumber: 3, group: "Sound Effects", label: "Explosion" }
];
var GENERAL_MIDI_DRUM_NOTE_NUMBERS = /* @__PURE__ */ new Map([
  [27, "High Q(GM2)"],
  [28, "Slap(GM2)"],
  [29, "Scratch Push(GM2)"],
  [30, "Scratch Pull(GM2)"],
  [31, "Sticks(GM2)"],
  [32, "Square Click(GM2)"],
  [33, "Metronome Click(GM2)"],
  [34, "Metronome Bell(GM2)"],
  [35, "Bass Drum 2"],
  [36, "Bass Drum 1"],
  [37, "Side Stick"],
  [38, "Snare Drum 1"],
  [39, "Hand Clap"],
  [40, "Snare Drum 2"],
  [41, "Low Tom 2"],
  [42, "Closed Hi-hat"],
  [43, "Low Tom 1"],
  [44, "Pedal Hi-hat"],
  [45, "Mid Tom 2"],
  [46, "Open Hi-hat"],
  [47, "Mid Tom 1"],
  [48, "High Tom 2"],
  [49, "Crash Cymbal 1"],
  [50, "High Tom 1"],
  [51, "Ride Cymbal 1"],
  [52, "Chinese Cymbal"],
  [53, "Ride Bell"],
  [54, "Tambourine"],
  [55, "Splash Cymbal"],
  [56, "Cowbell"],
  [57, "Crash Cymbal 2"],
  [58, "Vibra Slap"],
  [59, "Ride Cymbal 2"],
  [60, "High Bongo"],
  [61, "Low Bongo"],
  [62, "Mute High Conga"],
  [63, "Open High Conga"],
  [64, "Low Conga"],
  [65, "High Timbale"],
  [66, "Low Timbale"],
  [67, "High Agogo"],
  [68, "Low Agogo"],
  [69, "Cabasa"],
  [70, "Maracas"],
  [71, "Short Whistle"],
  [72, "Long Whistle"],
  [73, "Short Guiro"],
  [74, "Long Guiro"],
  [75, "Claves"],
  [76, "High Wood Block"],
  [77, "Low Wood Block"],
  [78, "Mute Cuica"],
  [79, "Open Cuica"],
  [80, "Mute Triangle"],
  [81, "Open Triangle"],
  [82, "Shaker(GM2)"],
  [83, "Jingle Bell(GM2)"],
  [84, "Belltree(GM2)"],
  [85, "Castanets(GM2)"],
  [86, "Mute Surdo(GM2)"],
  [87, "Open Surdo(GM2)"]
]);
var MIDI_NOTE_RANGES = [
  { instrNr: 40, nrL2: -1, subNrL2: -1, label: "Violin", min: 55, max: 103 },
  { instrNr: 41, nrL2: -1, subNrL2: -1, label: "Viola", min: 48, max: 91 },
  { instrNr: 42, nrL2: -1, subNrL2: -1, label: "Cello", min: 36, max: 76 },
  { instrNr: -1, nrL2: -1, subNrL2: -1, label: "Double Bass", min: 28, max: 67 },
  { instrNr: -1, nrL2: -1, subNrL2: -1, label: "Bass Guitar", min: 28, max: 67 },
  { instrNr: -1, nrL2: -1, subNrL2: -1, label: "Acoustic Guitar", min: 40, max: 88 },
  { instrNr: 58, nrL2: 59, subNrL2: 0, label: "Tuba", min: 28, max: 58 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Bass Trombone", min: 34, max: 67 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "French Horn", min: 34, max: 77 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Trombone", min: 40, max: 72 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Trumpet", min: 55, max: 82 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Piccolo", min: 74, max: 102 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Flute", min: 60, max: 96 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Oboe", min: 58, max: 91 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Alto Flute", min: 55, max: 91 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Cor Anglais (English Horn)", min: 52, max: 81 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Clarinet", min: 50, max: 94 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Bass Clarinet", min: 38, max: 77 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Bassoon", min: 34, max: 75 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Contrabassoon", min: 22, max: 53 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Soprano Recorder", min: 72, max: 98 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Alto Recorder", min: 65, max: 91 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Tenor Recorder", min: 60, max: 86 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Bass Recorder", min: 53, max: 79 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Baritone Sax", min: 36, max: 69 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Tenor Sax", min: 44, max: 76 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Alto Sax", min: 49, max: 81 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Soprano Sax", min: 56, max: 88 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Glockenspiel", min: 79, max: 108 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Xylophone", min: 65, max: 108 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Vibraphone", min: 53, max: 89 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Marimba", min: 45, max: 96 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Bass Marimba", min: 33, max: 81 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Celeste", min: 60, max: 108 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Tubular Bells", min: 60, max: 77 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Timpani", min: 40, max: 55 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Harpsichord", min: 29, max: 89 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Kalimba", min: 60, max: 88 },
  { instrNr: 0, nrL2: -1, subNrL2: -1, label: "Harp", min: 24, max: 103 }
];
for (const note of MIDI_NOTES) {
  MidiNoteByPitch.set(note.pitch, note);
  MidiNoteByLabel.set(note.label, note);
}
for (const instrument of MIDI_INSTRUMENTS) {
  MidiInstrumentByNumber.set(instrument.number, instrument);
}
for (const instrument of MIDI_INSTRUMENTS_LEV2) {
  const key = `${instrument.number}-${instrument.subnumber}`;
  MidiInstrumentByNumberLev2.set(key, instrument);
}

// src/types/Note.js
var Note = class {
  constructor(pitch = 0, start = 0, velocity = 127, channel = 0, end = null) {
    if (pitch < 0 || pitch > 127) {
      throw new Error(`Invalid pitch ${pitch}`);
    }
    try {
      this.name = getMidiNoteByNr(pitch).label;
    } catch {
      throw new Error(`Invalid pitch ${pitch}`);
    }
    this.pitch = pitch;
    this.start = start;
    this.velocity = velocity;
    this.channel = channel;
    this.end = end;
  }
  static from(object) {
    let {
      pitch = 0,
      start = 0,
      velocity = 127,
      channel = 0,
      end = null,
      duration = null
    } = object;
    if (typeof pitch === "string" && Number.isNaN(+pitch)) {
      const note = getMidiNoteByLabel(pitch);
      if (note === null || note === void 0) {
        throw new Error("Invalid pitch for Note.from()");
      }
      pitch = note.pitch;
    }
    if ((end === void 0 || end === null) && duration !== null && !Number.isNaN(duration)) {
      end = start + duration;
    }
    return new Note(pitch, start, velocity, channel, end);
  }
  clone() {
    return new Note(this.pitch, this.start, this.velocity, this.channel, this.end);
  }
  getDuration() {
    if (this.end === null) {
      return 0;
    }
    return this.end - this.start;
  }
  getName() {
    return this.name;
  }
  getLetter() {
    return getMidiNoteByNr(this.pitch).name;
  }
  getOctave() {
    return getMidiNoteByNr(this.pitch).octave;
  }
  shiftTime(addedSeconds) {
    const n = this.clone();
    n.start += addedSeconds;
    n.end = n.end === null ? null : n.end + addedSeconds;
    return n;
  }
  scaleTime(factor) {
    const n = this.clone();
    n.start *= factor;
    n.end = n.end === null ? null : n.end * factor;
    return n;
  }
  overlapsInTime(otherNote) {
    return this.start >= otherNote.start && this.start <= otherNote.end || this.end >= otherNote.start && this.end <= otherNote.end;
  }
  overlapInSeconds(otherNote) {
    if (!this.overlapsInTime(otherNote)) {
      return 0;
    }
    const laterStart = Math.max(this.start, otherNote.start);
    const earlierEnd = Math.min(this.end, otherNote.end);
    return earlierEnd - laterStart;
  }
  equals(otherNote) {
    if (!(otherNote instanceof Note)) {
      return false;
    }
    return this.pitch === otherNote.pitch && this.start === otherNote.start && this.velocity === otherNote.velocity && this.channel === otherNote.channel && this.end === otherNote.end;
  }
  toString(short = false) {
    if (short) {
      return `Note(n: ${this.name}, p: ${this.pitch}, s: ${this.start}, e: ${this.end}, v: ${this.velocity}, c: ${this.channel})`;
    }
    return `Note(name: ${this.name}, pitch: ${this.pitch}, start: ${this.start}, end: ${this.end}, velocity: ${this.velocity}, channel: ${this.channel})`;
  }
};
var Note_default = Note;

// src/types/GuitarNote.js
var GuitarNote = class extends Note_default {
  constructor(pitch = 0, start = 0, velocity = 127, channel = 0, end = null, string = null, fret = null) {
    super(pitch, start, velocity, channel, end);
    this.string = string;
    this.fret = fret;
  }
  static from(object) {
    let {
      pitch = 0,
      start = 0,
      velocity = 127,
      channel = 0,
      end = null,
      string = null,
      fret = null
    } = object;
    if (typeof pitch === "string" && Number.isNaN(+pitch)) {
      const note = getMidiNoteByLabel(pitch);
      if (note === null || note === void 0) {
        throw new Error("Invalid pitch for GuitarNote.from()");
      }
      pitch = note.pitch;
    }
    return new GuitarNote(pitch, start, velocity, channel, end, string, fret);
  }
  static fromNote(note, string, fret) {
    return new GuitarNote(note.pitch, note.start, note.velocity, note.channel, note.end, string, fret);
  }
  toNote() {
    return new Note_default(this.pitch, this.start, this.velocity, this.channel, this.end);
  }
  clone() {
    return new GuitarNote(this.pitch, this.start, this.velocity, this.channel, this.end, this.string, this.fret);
  }
  equals(otherNote) {
    if (!(otherNote instanceof GuitarNote)) {
      return false;
    }
    return this.pitch === otherNote.pitch && this.start === otherNote.start && this.velocity === otherNote.velocity && this.channel === otherNote.channel && this.end === otherNote.end && this.string === otherNote.string && this.fret === otherNote.fret;
  }
  toString(short = false) {
    if (short) {
      return `GuitarNote(n: ${this.name}, p: ${this.pitch}, s: ${this.start}, e: ${this.end}, v: ${this.velocity}, c: ${this.channel}, s: ${this.string}, f: ${this.fret})`;
    }
    return `GuitarNote(name: ${this.name}, pitch: ${this.pitch}, start: ${this.start}, end: ${this.end}, velocity: ${this.velocity}, channel: ${this.channel}, string: ${this.string}, fret: ${this.fret})`;
  }
};
var GuitarNote_default = GuitarNote;

// src/types/HarmonicaNote.js
var HarmonicaNote = class extends Note_default {
  constructor(pitch = 0, start = 0, velocity = 127, channel = 0, end = null, hole = null, instruction = null) {
    super(pitch, start, velocity, channel, end);
    this.hole = hole;
    this.instruction = instruction;
  }
  static from(object) {
    let {
      pitch = 0,
      start = 0,
      velocity = 127,
      channel = 0,
      end = null,
      hole = null,
      instruction = null
    } = object;
    if (typeof pitch === "string" && Number.isNaN(+pitch)) {
      const note = getMidiNoteByLabel(pitch);
      if (note === null || note === void 0) {
        throw new Error("Invalid pitch for HarmonicaNote.from()");
      }
      pitch = note.pitch;
    }
    return new HarmonicaNote(pitch, start, velocity, channel, end, hole, instruction);
  }
  static fromNote(note, hole, instruction) {
    return new HarmonicaNote(note.pitch, note.start, note.velocity, note.channel, note.end, hole, instruction);
  }
  toNote() {
    return new Note_default(this.pitch, this.start, this.velocity, this.channel, this.end);
  }
  clone() {
    return new HarmonicaNote(this.pitch, this.start, this.velocity, this.channel, this.end, this.hole, this.instruction);
  }
  equals(otherNote) {
    if (!(otherNote instanceof HarmonicaNote)) {
      return false;
    }
    return this.pitch === otherNote.pitch && this.start === otherNote.start && this.velocity === otherNote.velocity && this.channel === otherNote.channel && this.end === otherNote.end && this.hole === otherNote.hole && this.instruction === otherNote.instruction;
  }
  toString(short = false) {
    if (short) {
      return `HarmonicaNote(n: ${this.name}, p: ${this.pitch}, s: ${this.start}, e: ${this.end}, v: ${this.velocity}, c: ${this.channel}, h: ${this.hole}, i: ${this.instruction})`;
    }
    return `HarmonicaNote(name: ${this.name}, pitch: ${this.pitch}, start: ${this.start}, end: ${this.end}, velocity: ${this.velocity}, channel: ${this.channel}, hole: ${this.hole}, instruction: ${this.instruction})`;
  }
};
var HarmonicaNote_default = HarmonicaNote;

// src/types/NoteArray.js
var import_d3 = __toESM(require_d3_node(), 1);

// src/utils/MathUtils.js
var d3 = __toESM(require_d3_node(), 1);
function randFloat(min3 = 0, max8 = 1) {
  return Math.random() * (max8 - min3) + min3;
}
function choose(array) {
  const index = d3.randomInt(0, array.length)();
  return array[index];
}
function clipValue(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(maxValue, value));
}
function roundToNDecimals(number, n) {
  return +number.toFixed(n);
}
function swapSoSmallerFirst(x, y) {
  if (x <= y) {
    return [x, y];
  }
  return [y, x];
}
function countOnesOfBinary(integer) {
  let count = 0;
  while (integer !== 0) {
    integer = integer & integer - 1;
    count++;
  }
  return count;
}
function findLocalMaxima(array) {
  if (array.length <= 1) {
    return [];
  }
  if (array.length === 2) {
    if (array[0] > array[1]) {
      return [0];
    }
    if (array[1] > array[0]) {
      return [1];
    }
    return [];
  }
  const maximaIndices = [];
  if (array[0] > array[1]) {
    maximaIndices.push(0);
  }
  let last = array[0];
  let current = array[1];
  for (let index = 1; index < array.length - 1; index++) {
    const next = array[index + 1];
    if (current > last && current > next) {
      maximaIndices.push(index);
    }
    last = current;
    current = next;
  }
  const lastIndex = array.length - 1;
  if (array[lastIndex] > array[lastIndex - 1]) {
    maximaIndices.push(array.length - 1);
  }
  return maximaIndices;
}

// src/types/NoteArray.js
var NoteArray = class {
  constructor(notes = [], reUseNotes = false) {
    if (reUseNotes) {
      this._notes = notes;
    } else {
      this._notes = notes.map((d) => {
        if (d.string !== void 0 && d.fret !== void 0) {
          return GuitarNote_default.from(d);
        }
        return Note_default.from(d);
      });
    }
  }
  getNotes() {
    return this._notes;
  }
  setNotes(notes) {
    this._notes = notes;
    return this;
  }
  *[Symbol.iterator]() {
    for (const note of this._notes) {
      yield note;
    }
  }
  addNotes(notes, sort = true) {
    this._notes = [...this._notes, ...notes];
    if (sort) {
      this.sortByTime();
    }
    return this;
  }
  concat(noteArray) {
    this._notes = [...this._notes, ...noteArray._notes];
    return this;
  }
  append(noteArray, gap = 0) {
    const duration = this.getDuration();
    const clone = noteArray.clone();
    clone.shiftTime(duration + gap);
    this._notes = [...this._notes, ...clone._notes];
    this.sortByTime();
    return this;
  }
  repeat(times) {
    const result = this.clone();
    if (times < 1) {
      return new NoteArray();
    }
    if (times === 1) {
      return result;
    }
    const copy = this.clone();
    const duration = this.getDuration();
    for (let index = 1; index < times; index++) {
      copy.shiftTime(duration);
      result.concat(copy);
    }
    return result;
  }
  length() {
    return this._notes.length;
  }
  getStartTime() {
    return (0, import_d3.min)(this._notes, (d) => d.start);
  }
  getDuration() {
    let duration = 0;
    for (const note of this._notes) {
      const noteEnd = note.end === null ? note.start : note.end;
      if (noteEnd > duration) {
        duration = noteEnd;
      }
    }
    return duration;
  }
  scaleTime(factor) {
    this._notes = this._notes.map((n) => n.scaleTime(factor));
    return this;
  }
  shiftTime(addedSeconds) {
    this._notes = this._notes.map((n) => n.shiftTime(addedSeconds));
    return this;
  }
  shiftToStartAt(startTime) {
    this.sortByTime();
    const firstNoteStart = this._notes[0].start;
    const offset = firstNoteStart - startTime;
    this._notes.forEach((n) => {
      n.start -= offset;
      if (n.end !== null) {
        n.end -= offset;
      }
    });
    return this;
  }
  forEach(func) {
    this._notes.forEach((element, index, array) => func(element, index, array));
    return this;
  }
  sort(sortFunction) {
    this._notes = this._notes.sort(sortFunction);
    return this;
  }
  sortByTime() {
    this._notes = this._notes.sort((a, b) => a.start - b.start);
    return this;
  }
  map(mapFunction) {
    this._notes = this._notes.map((element, index, array) => mapFunction(element, index, array));
    return this;
  }
  slice(start, end) {
    this._notes = this._notes.slice(start, end);
    return this;
  }
  sliceTime(startTime, endTime, mode = "contained") {
    const start = startTime;
    const end = endTime;
    let filterFunc;
    if (mode === "start") {
      filterFunc = (n) => n.start >= start && n.start < end;
    } else if (mode === "end") {
      filterFunc = (n) => n.end !== null && n.end >= start && n.end < end;
    } else if (mode === "contained") {
      filterFunc = (n) => n.end !== null && n.start >= start && n.end < end;
    } else if (mode === "touched") {
      filterFunc = (n) => n.start >= start && n.start <= end || n.end !== null && n.end >= start && n.end <= end;
    } else if (mode === "touched-included") {
      filterFunc = (n) => n.start >= start && n.start <= end || n.end !== null && n.end >= start && n.end <= end || n.end !== null && n.start <= start && n.end >= end;
    } else {
      throw new Error("Invalid slicing mode");
    }
    this._notes = this._notes.filter(filterFunc);
    return this;
  }
  sliceAtTimes(times, mode, reUseNotes = false) {
    if (times.length === 0) {
      return [this._notes];
    }
    const duration = this.getDuration();
    if (Math.max(...times) <= duration) {
      times.push(duration + 1);
    }
    const slices = [];
    let lastTime = 0;
    for (const time of times) {
      slices.push(new NoteArray(this._notes, reUseNotes).sliceTime(lastTime, time, mode).getNotes());
      lastTime = time;
    }
    return slices;
  }
  segmentAtGaps(gapDuration, mode) {
    if (this._notes.length < 2) {
      return [this._notes];
    }
    if (mode === "start-start") {
      const notes = this.clone().sortByTime().getNotes();
      const cuts = [];
      for (let index = 1; index < notes.length; index++) {
        if (notes[index].start - notes[index - 1].start >= gapDuration) {
          cuts.push(notes[index].start);
        }
      }
      return this.sliceAtTimes(cuts, "start");
    } else {
      const occupiedTimes = [];
      for (const note of this._notes) {
        const { start, end } = note;
        const collisions = [];
        for (let index = 0; index < occupiedTimes.length; index++) {
          const [s, e] = occupiedTimes[index];
          if (s >= start && s <= end || e >= start && e <= end) {
            occupiedTimes.splice(index, 1);
            collisions.push([s, e]);
          }
        }
        if (collisions.length === 0) {
          occupiedTimes.push([start, end]);
        } else {
          const newStart = Math.min(start, ...collisions.map((d) => d[0]));
          const newEnd = Math.max(end, ...collisions.map((d) => d[1]));
          occupiedTimes.push([newStart, newEnd]);
        }
      }
      if (occupiedTimes.length === 1) {
        return [this._notes];
      }
      const cuts = [];
      for (let index = 1; index < occupiedTimes.length; index++) {
        const currentStart = occupiedTimes[index][0];
        const lastEnd = occupiedTimes[index - 1][1];
        if (currentStart - lastEnd >= gapDuration) {
          cuts.push(currentStart);
        }
      }
      return this.sliceAtTimes(cuts, "start");
    }
  }
  segmentAtIndices(indices) {
    const segments = [];
    let lastIndex = 0;
    for (const index of indices) {
      segments.push(this._notes.slice(lastIndex, index));
      lastIndex = index;
    }
    return segments;
  }
  filter(filterFunction) {
    this._notes = this._notes.filter((element, index, array) => filterFunction(element, index, array));
    return this;
  }
  filterPitches(pitches) {
    if (!(pitches instanceof Set)) {
      pitches = new Set(pitches);
    }
    this._notes = this._notes.filter((n) => pitches.has(n.pitch));
    return this;
  }
  transpose(steps) {
    this._notes = this._notes.map((n) => Note_default.from(__spreadProps(__spreadValues({}, n), {
      pitch: clipValue(n.pitch + steps, 0, 127)
    })));
    return this;
  }
  removeOctaves() {
    this._notes = this._notes.map((note) => Note_default.from(__spreadProps(__spreadValues({}, note), {
      pitch: note.pitch % 12
    })));
    return this;
  }
  reverse() {
    const duration = this.getDuration();
    this._notes = this._notes.map((n) => {
      const newNote = n.clone();
      newNote.start = duration - n.end;
      newNote.end = newNote.start + n.getDuration();
      return newNote;
    });
    this.sortByTime();
    return this;
  }
  equals(otherNoteArray) {
    if (!(otherNoteArray instanceof NoteArray)) {
      return false;
    }
    const notes = otherNoteArray.getNotes();
    if (this._notes.length !== notes.length) {
      return false;
    }
    for (const [index, note] of notes.entries()) {
      if (!this._notes[index].equals(note)) {
        return false;
      }
    }
    return true;
  }
  clone() {
    return new NoteArray(this._notes);
  }
};
var NoteArray_default = NoteArray;

// src/utils/ArrayUtils.js
var d32 = __toESM(require_d3_node(), 1);
function arrayShallowEquals(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (const [index, element] of a.entries()) {
    if (element !== b[index]) {
      return false;
    }
  }
  return true;
}
function arrayHasSameElements(a, b, checkLength = true) {
  if (checkLength && a.length !== b.length) {
    return false;
  }
  const setA = new Set(a);
  const setB = new Set(b);
  for (const element of setA) {
    if (!setB.has(element)) {
      return false;
    }
  }
  for (const element of setB) {
    if (!setA.has(element)) {
      return false;
    }
  }
  return true;
}
function jaccardIndex(set1, set2) {
  if (set1.length === 0 && set2.length === 0) {
    return 1;
  }
  return d32.intersection(set1, set2).size / d32.union(set1, set2).size;
}
function kendallTau(ranking1, ranking2, normalize = true) {
  if (ranking1.length !== ranking2.length) {
    throw new Error("Ranking length must be equal");
  }
  if (ranking1.length === 0) {
    return 0;
  }
  let inversions = 0;
  const n = ranking1.length;
  for (let a = 0; a < n; a++) {
    for (let b = a + 1; b < n; b++) {
      const r1smaller = ranking1[a] < ranking1[b];
      const r2smaller = ranking2[a] < ranking2[b];
      if (r1smaller !== r2smaller) {
        inversions++;
      }
    }
  }
  if (normalize) {
    inversions /= n * (n - 1) / 2;
  }
  return inversions;
}
function removeDuplicates(array) {
  return [...new Set(array)];
}
function arrayContainsArray(a, b) {
  if (a.length < b.length) {
    return false;
  }
  for (const [index, element] of b.entries()) {
    if (a[index] !== element) {
      return false;
    }
  }
  return true;
}
function arraySlicesEqual(a, b, length, startA = 0, startB = 0) {
  if (length === null || length === void 0) {
    throw new Error("undefined length");
  }
  if (startA < 0 || startB < 0) {
    throw new Error("start < 0");
  }
  if (a.length < startA + length || b.length < startB + length) {
    return false;
  }
  for (let offset = 0; offset < length; offset++) {
    if (a[startA + offset] !== b[startB + offset]) {
      return false;
    }
  }
  return true;
}
function arrayIndexOf(haystack, needle, startIndex = 0) {
  if (needle.length === 0) {
    return -1;
  }
  for (let index = startIndex; index < haystack.length - needle.length + 1; ++index) {
    if (haystack[index] === needle[0]) {
      let found = true;
      for (let offset = 1; offset < needle.length; ++offset) {
        if (haystack[index + offset] !== needle[offset]) {
          found = false;
          break;
        }
      }
      if (found) {
        return index;
      }
    }
  }
  return -1;
}
function getArrayMax(array) {
  return d32.max(array.flat(Number.POSITIVE_INFINITY));
}
function normalizeNdArray(array) {
  const max8 = d32.max(array.flat(Number.POSITIVE_INFINITY));
  const normalize = (array_, maxValue) => array_.map((d) => {
    return d.length !== void 0 ? normalize(d, maxValue) : d / maxValue;
  });
  return normalize(array, max8);
}
function euclideanDistance(matrixA, matrixB) {
  const valuesA = matrixA.flat();
  const valuesB = matrixB.flat();
  const diffs = valuesA.map((d, i) => d - valuesB[i]);
  return Math.hypot(...diffs);
}
function formatMatrix(matrix, colSeparator = ", ", rowSeparator = "\n", formatter) {
  if (!matrix || matrix.length === 0) {
    return "";
  }
  if (formatter) {
    matrix = matrix.map((row) => row.map((value) => formatter(value)));
  }
  return matrix.map((row) => row.join(colSeparator)).join(rowSeparator);
}
function binarySearch(array, value, accessor = (d) => d) {
  if (array.length <= 3) {
    let closest = null;
    let diff = Number.POSITIVE_INFINITY;
    for (const element of array) {
      const value_ = accessor(element);
      const diff2 = Math.abs(value - value_);
      if (diff2 < diff) {
        closest = element;
        diff = diff2;
      }
    }
    return closest;
  }
  const pivotPosition = Math.floor(array.length / 2);
  const pivotElement = array[pivotPosition];
  const pivotValue = accessor(pivotElement);
  if (value === pivotValue) {
    return pivotElement;
  }
  if (value < pivotValue) {
    return binarySearch(array.slice(0, pivotPosition + 1), value, accessor);
  }
  if (value > pivotValue) {
    return binarySearch(array.slice(pivotPosition - 1), value, accessor);
  }
}
function findStreaks(values, accessor = (d) => d, equality = (a, b) => a === b) {
  let startIndex = 0;
  const result = [];
  let startValue = accessor(values[0]);
  for (const [index, value] of values.entries()) {
    const v = accessor(value);
    if (!equality(startValue, v)) {
      result.push({
        startIndex,
        endIndex: index - 1,
        length: index - startIndex
      });
      startIndex = index;
      startValue = v;
    }
  }
  if (values.length > 0) {
    result.push({
      startIndex,
      endIndex: values.length - 1,
      length: values.length - startIndex
    });
  }
  return result;
}
function findRepeatedIndices(sequence, equals = (a, b) => a === b) {
  return sequence.map((element) => {
    for (const [index2, element2] of sequence.entries()) {
      if (equals(element, element2)) {
        return index2;
      }
    }
    return null;
  });
}

// src/types/Recording.js
var Recording = class extends NoteArray_default {
  constructor(name, date, notes, speed = 1, selectedTrack = 0, timeSelection = null, comment = "") {
    super(notes);
    this.name = name;
    this.date = date;
    this.dateString = date.toISOString().slice(0, 19).replace("T", " ");
    this.speed = +speed;
    this.selectedTrack = +selectedTrack;
    this.timeSelection = timeSelection;
    this.comment = comment;
    this.sortByTime();
  }
  clone() {
    return new Recording(this.name, this.date, this.getNotes().map((d) => d.clone()), this.speed, this.selectedTrack, this.timeSelection === null ? null : [...this.timeSelection], this.comment);
  }
  equals(otherRecording) {
    if (!(otherRecording instanceof Recording)) {
      return false;
    }
    if (this.name !== otherRecording.name) {
      return false;
    }
    if (this.date.getTime() !== otherRecording.date.getTime()) {
      return false;
    }
    if (this.speed !== otherRecording.speed) {
      return false;
    }
    if (this.selectedTrack !== otherRecording.selectedTrack) {
      return false;
    }
    if (this.timeSelection !== otherRecording.timeSelection) {
      if (this.timeSelection === null || otherRecording.timeSelection === null) {
        return false;
      }
      if (!arrayShallowEquals(this.timeSelection, otherRecording.timeSelection)) {
        return false;
      }
    }
    const notes1 = this.getNotes();
    const notes2 = otherRecording.getNotes();
    if (notes1.length !== notes2.length) {
      return false;
    }
    for (const [index, element] of notes1.entries()) {
      if (!element.equals(notes2[index])) {
        return false;
      }
    }
    if (this.comment !== otherRecording.comment) {
      return false;
    }
    return true;
  }
  toSimpleObject() {
    return {
      name: this.name,
      date: this.date,
      notes: this.getNotes(),
      speed: this.speed,
      selectedTrack: this.selectedTrack,
      timeSelection: this.timeSelection,
      comment: this.comment
    };
  }
  static from(object) {
    let { name, date, notes } = object;
    const values = [name, date, notes];
    const names = ["name", "date", "notes"];
    for (const [index, value] of values.entries()) {
      if (value === void 0 || value === null) {
        throw new Error(`Cannot create Recording with undefined ${names[index]}`);
      }
    }
    if (typeof date === "string") {
      date = new Date(Date.parse(date));
    }
    const { speed, selectedTrack, timeSelection, comment } = object;
    return new Recording(name, date, notes, speed, selectedTrack, timeSelection, comment);
  }
};
var Recording_default = Recording;

// src/types/MusicPiece.js
var midiParser = __toESM(require_main(), 1);

// src/fileFormats/MusicXmlParser.js
var import_d32 = __toESM(require_d3_node(), 1);
var ROUNDING_PRECISION = 5;
function preprocessMusicXmlData(xml, log = false) {
  if (log) {
    console.groupCollapsed("[MusicXmlParser] Parsing MusicXML");
    console.log(xml);
  }
  const partNameElements = xml.querySelectorAll("part-name");
  const instruments = xml.querySelectorAll("score-instrument");
  const partNames = [];
  const instrumentNames = [];
  for (const p of partNameElements) {
    partNames.push(p.innerHTML);
  }
  for (const index of instruments) {
    instrumentNames.push(index.children[0].innerHTML);
  }
  const drumInstrumentMap = getDrumInstrumentMap(xml);
  const parts = xml.querySelectorAll("part");
  const parsedParts = [];
  for (const part of parts) {
    parsedParts.push(preprocessMusicXmlPart(part, drumInstrumentMap));
  }
  const result = {
    parts: parsedParts,
    partNames,
    instruments: instrumentNames,
    totalTime: (0, import_d32.max)(parsedParts, (d) => d.totalTime)
  };
  if (log) {
    console.log(result);
    console.groupEnd();
  }
  return result;
}
function preprocessMusicXmlPart(part, drumInstrumentMap) {
  var _a, _b, _c;
  part = handleStaveAndTab(part);
  let measures = part.children;
  measures = duplicateRepeatedMeasures(measures);
  const xmlNotes = part.querySelectorAll("note");
  const xmlNoteIndexMap = new Map([...xmlNotes].map((d, i) => [d, i]));
  const xmlNoteIndices = [];
  let currentTime = 0;
  let divisions;
  let tempo = 120;
  let beats = 4;
  let beatType = 4;
  const defaultVelocity = 90;
  const velocityFactor = 64 / 71;
  let velocity = Math.round(defaultVelocity * velocityFactor);
  const tempoChanges = [];
  const beatTypeChanges = [];
  const keySignatureChanges = [];
  const noteObjs = [];
  const measureRehearsalMap = /* @__PURE__ */ new Map();
  const noteLyricsMap = /* @__PURE__ */ new Map();
  const measureLinePositions = [];
  const measureIndices = [];
  for (const measure of measures) {
    const currentTimeRounded = roundToNDecimals(currentTime, ROUNDING_PRECISION);
    try {
      const soundElements = measure.querySelectorAll("sound");
      for (const element of soundElements) {
        const tempoValue = element.getAttribute("tempo");
        if (tempoValue !== null) {
          tempo = roundToNDecimals(+tempoValue, 3);
          tempoChanges.push({
            time: currentTimeRounded,
            tempo
          });
        }
        break;
      }
    } catch {
    }
    try {
      divisions = +measure.querySelectorAll("divisions")[0].innerHTML;
    } catch {
    }
    try {
      beats = +measure.querySelectorAll("beats")[0].innerHTML;
      beatType = +measure.querySelectorAll("beat-type")[0].innerHTML;
      beatTypeChanges.push({
        time: currentTimeRounded,
        beats,
        beatType
      });
    } catch {
    }
    const secondsPerBeat = 1 / (tempo / 60);
    try {
      const fifths = +measure.querySelectorAll("fifths")[0].innerHTML;
      const { key, scale } = keySignatureMap.get(fifths);
      keySignatureChanges.push({
        time: currentTimeRounded,
        key,
        scale
      });
    } catch {
    }
    if (measure.querySelectorAll("note").length === 0) {
      const measureDuration = beats * (beatType / 4) * secondsPerBeat;
      currentTime += measureDuration;
    }
    let lastNoteDuration = 0;
    for (const child of measure.children) {
      if (child.nodeName === "backup") {
        const duration = +child.querySelectorAll("duration")[0].innerHTML;
        const durationInSeconds = getDurationInSeconds(duration, divisions, secondsPerBeat);
        currentTime -= durationInSeconds;
      } else if (child.nodeName === "forward") {
        const duration = +child.querySelectorAll("duration")[0].innerHTML;
        const durationInSeconds = getDurationInSeconds(duration, divisions, secondsPerBeat);
        currentTime += durationInSeconds;
      } else if (child.nodeName === "direction") {
        for (const direction of child.children) {
          if (direction.nodeName === "sound" && direction.getAttribute("dynamics")) {
            velocity = Math.round(velocityFactor * +direction.getAttribute("dynamics"));
          }
          if (child.querySelectorAll("rehearsal").length > 0) {
            const rehearsals = child.querySelectorAll("rehearsal");
            const marks = [];
            for (const r of rehearsals) {
              if (r.textContent !== "") {
                marks.push(r.textContent);
              }
            }
            if (marks.length > 0) {
              let text = marks.join(" ");
              const measureIndex = measureIndices.length;
              if (measureRehearsalMap.has(measureIndex)) {
                const oldText = measureRehearsalMap.get(measureIndex);
                text = `${oldText} ${text}`;
              }
              measureRehearsalMap.set(measureIndex, text);
            }
          }
        }
      } else if (child.nodeName === "note") {
        const note = child;
        try {
          let durationInSeconds;
          if (note.querySelectorAll("grace").length > 0) {
            const type = note.querySelectorAll("type").textContent;
            if (type === "64th") {
              durationInSeconds = secondsPerBeat / 16;
            } else if (type === "32nd") {
              durationInSeconds = secondsPerBeat / 8;
            } else if (type === "16th") {
              durationInSeconds = secondsPerBeat / 4;
            } else if (type === "eighth") {
              durationInSeconds = secondsPerBeat / 2;
            } else if (type === "quarter") {
              durationInSeconds = secondsPerBeat;
            } else if (type === "half") {
              durationInSeconds = secondsPerBeat * 2;
            } else {
              durationInSeconds = 0.01;
            }
          } else {
            const duration = +note.querySelectorAll("duration")[0].innerHTML;
            durationInSeconds = getDurationInSeconds(duration, divisions, secondsPerBeat);
          }
          const isRest = note.querySelectorAll("rest").length > 0;
          if (isRest) {
            currentTime += durationInSeconds;
            continue;
          }
          const isUnpitched = note.querySelectorAll("unpitched").length > 0;
          let pitch;
          if (isUnpitched) {
            const instrumentId = note.querySelectorAll("instrument")[0].id;
            pitch = drumInstrumentMap.get(part.id).get(instrumentId);
          } else {
            const alter = +(((_a = note.querySelectorAll("alter")[0]) == null ? void 0 : _a.innerHTML) ?? 0);
            const step = note.querySelectorAll("step")[0].innerHTML;
            const octave = +note.querySelectorAll("octave")[0].innerHTML;
            pitch = getMidiNoteByNameAndOctave(step, octave).pitch + alter;
          }
          const dynamicsTag = (_b = note.querySelectorAll("dynamics")[0]) == null ? void 0 : _b.children[0];
          if (dynamicsTag) {
            velocity = dynamicsMap.get(dynamicsTag.nodeName);
          }
          const isChord = note.querySelectorAll("chord").length > 0;
          if (isChord) {
            currentTime -= lastNoteDuration;
          }
          const tieElement = note.querySelectorAll("tie")[0];
          if (tieElement && tieElement.getAttribute("type") === "stop") {
            const noteEnd = currentTime + durationInSeconds;
            for (let index = noteObjs.length - 1; index > 0; index--) {
              const noteObject = noteObjs[index];
              if (noteObject.pitch === pitch) {
                noteObject.end = noteEnd;
                const lyrics = getLyricsFromNote(note);
                if (lyrics.length > 0) {
                  const oldLyrics = noteLyricsMap.get(index) ?? "";
                  const newLyrics = `${oldLyrics} ${lyrics}`;
                  noteLyricsMap.set(index, newLyrics);
                }
                xmlNoteIndices[index].push(xmlNoteIndexMap.get(note));
                break;
              }
            }
          } else {
            xmlNoteIndices.push([xmlNoteIndexMap.get(note)]);
            const staff = +(((_c = note.querySelectorAll("staff")[0]) == null ? void 0 : _c.innerHTML) ?? 1);
            const startTime = roundToNDecimals(currentTime, ROUNDING_PRECISION);
            const endTime = roundToNDecimals(currentTime + durationInSeconds, ROUNDING_PRECISION);
            let string = null;
            let fret = null;
            try {
              fret = +note.querySelectorAll("fret")[0].innerHTML;
              string = +note.querySelectorAll("string")[0].innerHTML;
            } catch {
            }
            if (string !== null && fret !== null) {
              noteObjs.push(new GuitarNote_default(pitch, startTime, velocity, string, endTime, string, fret));
            } else {
              noteObjs.push(new Note_default(pitch, startTime, velocity, staff - 1, endTime));
            }
            const lyrics = getLyricsFromNote(note);
            if (lyrics.length > 0) {
              noteLyricsMap.set(noteObjs.length - 1, lyrics);
            }
          }
          lastNoteDuration = durationInSeconds;
          currentTime += durationInSeconds;
        } catch (error) {
          console.warn("[MusicXmlParser] Cannot parse MusicXML note", error, note);
        }
      }
    }
    measureLinePositions.push(roundToNDecimals(currentTime, ROUNDING_PRECISION));
    measureIndices.push(noteObjs.length);
  }
  if (tempoChanges.length === 0 || tempoChanges[0].time > 0) {
    tempoChanges.unshift({ tempo: 120, time: 0 });
  }
  if (beatTypeChanges.length === 0 || beatTypeChanges[0].time > 0) {
    beatTypeChanges.unshift({ beats: 4, beatType: 4, time: 0 });
  }
  if (keySignatureChanges.length === 0 || keySignatureChanges[0].time > 0) {
    keySignatureChanges.unshift({ key: "C", scale: "major", time: 0 });
  }
  const result = {
    noteObjs,
    totalTime: currentTime,
    measureLinePositions,
    measureIndices,
    measureRehearsalMap,
    xmlNoteIndices,
    tempoChanges,
    beatTypeChanges,
    keySignatureChanges,
    tuning: getTuningPitches(measures),
    noteLyricsMap
  };
  return result;
}
function getLyricsFromNote(note) {
  const lyric = note.querySelectorAll("lyric");
  const texts = [];
  for (const l of lyric) {
    texts.push(l.querySelectorAll("text")[0].textContent);
  }
  const text = texts.join(" ");
  return text;
}
function getDurationInSeconds(duration, divisions, secondsPerBeat) {
  const durationInBeats = duration / divisions;
  const durationInSeconds = durationInBeats * secondsPerBeat;
  return durationInSeconds;
}
function duplicateRepeatedMeasures(measures) {
  var _a, _b;
  let resultMeasures = [];
  let currentRepeatedSection = [];
  let isAlternativeEndingOne = false;
  for (const measure of measures) {
    const endingMarks = measure.querySelectorAll("ending");
    if (+((_a = endingMarks[0]) == null ? void 0 : _a.getAttribute("number")) === 1 && ((_b = endingMarks[0]) == null ? void 0 : _b.getAttribute("type")) === "start") {
      isAlternativeEndingOne = true;
    }
    const repetitionMarks = measure.querySelectorAll("repeat");
    if (repetitionMarks.length === 2) {
      const times = repetitionMarks[1].getAttribute("times") || 2;
      const repetition = Array.from({ length: +times }).fill(measure);
      if (currentRepeatedSection.length === 0) {
        resultMeasures = [...resultMeasures, ...repetition];
      } else {
        currentRepeatedSection = [...currentRepeatedSection, ...repetition];
      }
    } else if (repetitionMarks.length === 1) {
      const direction = repetitionMarks[0].getAttribute("direction");
      if (direction === "forward") {
        currentRepeatedSection.push(measure);
      } else if (direction === "backward") {
        const times = repetitionMarks[0].getAttribute("times") || 2;
        if (currentRepeatedSection.length > 0) {
          if (!isAlternativeEndingOne) {
            currentRepeatedSection.push(measure);
            for (let index = 0; index < times; index++) {
              resultMeasures = [...resultMeasures, ...currentRepeatedSection];
            }
          } else {
            const firstRepetition = [...currentRepeatedSection, measure];
            resultMeasures = [...resultMeasures, ...firstRepetition];
            for (let index = 1; index < times; index++) {
              resultMeasures = [...resultMeasures, ...currentRepeatedSection];
            }
          }
          currentRepeatedSection = [];
        } else {
          const allMeasuresUntilHere = [...resultMeasures];
          for (let index = 1; index < times; index++) {
            resultMeasures = [...resultMeasures, ...allMeasuresUntilHere];
          }
        }
      }
    } else {
      if (!isAlternativeEndingOne) {
        if (currentRepeatedSection.length === 0) {
          resultMeasures.push(measure);
        } else {
          currentRepeatedSection.push(measure);
        }
      }
    }
    if (isAlternativeEndingOne) {
      for (const endingMark of endingMarks) {
        if (+endingMark.getAttribute("number") === 1 && endingMark.getAttribute("type") === "stop") {
          isAlternativeEndingOne = false;
        }
      }
    }
  }
  return resultMeasures;
}
function handleStaveAndTab(track) {
  const notes = track.querySelectorAll("note");
  let hasStringFretNotes = false;
  for (const note of notes) {
    if (note.querySelectorAll("string").length > 0 && note.querySelectorAll("fret").length > 0) {
      hasStringFretNotes = true;
      break;
    }
  }
  if (hasStringFretNotes) {
    for (const note of notes) {
      const voice = +(note.querySelectorAll("voice")[0].innerHTML ?? 1);
      const isFirstVoiceRest = note.querySelectorAll("rest").length > 0 && voice === 1;
      if (!isFirstVoiceRest && note.querySelectorAll("fret").length === 0) {
        note.remove();
      }
    }
    const backups = track.querySelectorAll("backup");
    for (const backup of backups) {
      backup.remove();
    }
  }
  return track;
}
function getTuningPitches(measures) {
  for (const measure of measures) {
    try {
      const tuningPitches = [];
      const staffTunings = measure.querySelectorAll("staff-tuning");
      for (const st of staffTunings) {
        const tuningNote = st.querySelectorAll("tuning-step")[0].innerHTML;
        const tuningOctave = +st.querySelectorAll("tuning-octave")[0].innerHTML;
        tuningPitches.push(getMidiNoteByNameAndOctave(tuningNote, tuningOctave).pitch);
      }
      return tuningPitches;
    } catch {
    }
  }
  return [];
}
function getDrumInstrumentMap(xml) {
  var _a, _b;
  const partMap = /* @__PURE__ */ new Map();
  const scoreParts = (_a = xml.querySelectorAll("part-list")[0]) == null ? void 0 : _a.querySelectorAll("score-part");
  if (!scoreParts) {
    return partMap;
  }
  for (const scorePart of scoreParts) {
    const partId = scorePart.id;
    const instruMap = /* @__PURE__ */ new Map();
    const midiInstrs = scorePart.querySelectorAll("midi-instrument");
    for (const midiInstr of midiInstrs) {
      const instrId = midiInstr.id;
      const pitch = (_b = midiInstr.querySelectorAll("midi-unpitched")[0]) == null ? void 0 : _b.innerHTML;
      if (pitch) {
        instruMap.set(instrId, +pitch);
      }
    }
    partMap.set(partId, instruMap);
  }
  return partMap;
}
var keySignatureMap = /* @__PURE__ */ new Map([
  [-7, { key: "Cb", scale: "major" }],
  [-6, { key: "Gb", scale: "major" }],
  [-5, { key: "Db", scale: "major" }],
  [-4, { key: "Ab", scale: "major" }],
  [-3, { key: "Eb", scale: "major" }],
  [-2, { key: "Bb", scale: "major" }],
  [-1, { key: "F", scale: "major" }],
  [0, { key: "C", scale: "major" }],
  [1, { key: "G", scale: "major" }],
  [2, { key: "D", scale: "major" }],
  [3, { key: "A", scale: "major" }],
  [4, { key: "E", scale: "major" }],
  [5, { key: "B", scale: "major" }],
  [6, { key: "F#", scale: "major" }],
  [7, { key: "C#", scale: "major" }]
]);
var dynamicsMap = /* @__PURE__ */ new Map([
  ["ppp", 25],
  ["pp", 38],
  ["p", 51],
  ["mp", 64],
  ["mf", 76],
  ["f", 89],
  ["ff", 102],
  ["fff", 114]
]);

// src/fileFormats/MidiParser.js
var import_d33 = __toESM(require_d3_node(), 1);

// src/utils/MusicUtils.js
function bpmToSecondsPerBeat(bpm) {
  return 1 / (bpm / 60);
}
function freqToApproxMidiNr(frequency) {
  return 12 * Math.log2(frequency / 440) + 69;
}
function midiToFrequency(midi) {
  return 2 ** ((midi - 69) / 12) * 440;
}
function chordToInteger(notes) {
  let value = 0;
  for (const note of notes) {
    const chroma = note.pitch % 12;
    const noteInteger = 1 << chroma;
    value = value | noteInteger;
  }
  return value;
}
function chordIntegerJaccardIndex(chord1, chord2) {
  if (chord1 === chord2) {
    return 1;
  }
  const intersection3 = chord1 & chord2;
  const union2 = chord1 | chord2;
  const intersectionSize = countOnesOfBinary(intersection3);
  const unionSize = countOnesOfBinary(union2);
  return intersectionSize / unionSize;
}
var noteTypeDurationRatios = [];
var baseDurations = [2, 1, 1 / 2, 1 / 4, 1 / 8, 1 / 16, 1 / 32, 1 / 64];
for (const d of baseDurations) {
  for (let dots = 0; dots < 4; dots++) {
    let duration = d;
    let toAdd = d;
    for (let dot = 0; dot < dots; dot++) {
      toAdd /= 2;
      duration += toAdd;
    }
    noteTypeDurationRatios.push({
      type: d,
      dots,
      duration
    });
  }
}
noteTypeDurationRatios.sort((a, b) => a.duration - b.duration);
function noteDurationToNoteType(duration, bpm) {
  const quarterDuration = bpmToSecondsPerBeat(bpm);
  const ratio = duration / quarterDuration / 4;
  return binarySearch(noteTypeDurationRatios, ratio, (d) => d.duration);
}
var CIRCLE_OF_5THS = [
  [0, "C", "C", 0, 0],
  [7, "G", "G", 1, 0],
  [2, "D", "D", 2, 0],
  [9, "A", "A", 3, 0],
  [4, "E", "E", 4, 0],
  [11, "B", "B", 5, 7],
  [6, "F#", "Gb", 6, 6],
  [1, "C#", "Db", 7, 5],
  [8, "G#", "Ab", 0, 4],
  [3, "D#", "Eb", 0, 3],
  [10, "A#", "Bb", 0, 2],
  [5, "F", "F", 0, 1]
];
var INTERVALS = /* @__PURE__ */ new Map([
  [1, "unison"],
  [1, "m2"],
  [2, "M2"],
  [3, "m3"],
  [4, "M3"],
  [5, "P4"],
  [6, "aug4"],
  [7, "P5"],
  [8, "m6"],
  [9, "M6"],
  [10, "m7"],
  [11, "M7"],
  [12, "P8"]
]);
function metronomeTrackFromTempoAndMeter(tempo = 120, meter = [4, 4], duration = 60) {
  const track = [];
  const secondsPerBeat = bpmToSecondsPerBeat(tempo) / (meter[1] / 4);
  let currentTime = 0;
  while (currentTime <= duration) {
    for (let beat = 0; beat < meter[0]; beat++) {
      track.push({
        time: roundToNDecimals(currentTime, 4),
        accent: beat % meter[0] === 0
      });
      currentTime += secondsPerBeat;
      if (currentTime > duration) {
        return track;
      }
    }
  }
}
function metronomeTrackFromMusicPiece(musicPiece, tempoFactor = 1) {
  const { duration, tempos, timeSignatures } = musicPiece;
  const track = [];
  let currentTime = 0;
  const initialTimeSig = timeSignatures[0].signature ?? [4, 4];
  let [beatCount, beatType] = initialTimeSig;
  const timeSigsTodo = timeSignatures.slice(1);
  const initialTempo = tempos[0].bpm ?? 120;
  let secondsPerBeat = bpmToSecondsPerBeat(initialTempo) / (beatType / 4);
  const temposTodo = tempos.slice(1);
  while (currentTime <= duration) {
    const lookahead = currentTime + secondsPerBeat;
    if (timeSigsTodo.length > 0 && timeSigsTodo[0].time <= lookahead) {
      [beatCount, beatType] = timeSigsTodo[0].signature;
      timeSigsTodo.shift();
    }
    if (temposTodo.length > 0 && temposTodo[0].time <= lookahead) {
      secondsPerBeat = bpmToSecondsPerBeat(temposTodo[0].bpm) / (beatType / 4);
      temposTodo.shift();
    }
    for (let beat = 0; beat < beatCount; beat++) {
      track.push({
        time: roundToNDecimals(currentTime / tempoFactor, 3),
        accent: beat === 0
      });
      currentTime += secondsPerBeat;
      if (currentTime > duration) {
        return track;
      }
    }
  }
  return track;
}

// src/fileFormats/MidiParser.js
var ROUNDING_PRECISION2 = 5;
function preprocessMidiFileData(data, splitFormat0IntoTracks = true, log = false) {
  if (data === null || data === void 0) {
    return;
  }
  if (!data.track) {
    console.warn("[MidiParser] MIDI data has no track");
    return;
  }
  if (log) {
    console.groupCollapsed("[MidiParser] Preprocessing MIDI file data");
  }
  let parsedTracks = [];
  const { tempoChanges, beatTypeChanges, keySignatureChanges } = getSignatureChanges(data.track);
  for (const track of data.track) {
    const t = parseMidiTrack(track, data.timeDivision, tempoChanges, beatTypeChanges, keySignatureChanges, log);
    if (t !== null) {
      parsedTracks.push(t);
    }
  }
  if (data.formatType === 0 && splitFormat0IntoTracks && parsedTracks.length === 1) {
    parsedTracks = splitFormat0(parsedTracks);
  }
  const totalTime = (0, import_d33.max)(parsedTracks, (d) => (d == null ? void 0 : d.totalTime) ?? 0);
  const measureLinePositions = getMeasureLines(tempoChanges, beatTypeChanges, totalTime);
  for (const track of parsedTracks) {
    track.measureIndices = getMeasureIndices(track.noteObjs, measureLinePositions);
  }
  const result = {
    tracks: parsedTracks,
    totalTime,
    tempoChanges,
    beatTypeChanges,
    keySignatureChanges,
    measureLinePositions
  };
  if (log) {
    console.log(`Got ${parsedTracks.length} MIDI tracks`, result);
    console.groupEnd();
  }
  return result;
}
function parseMidiTrack(track, timeDivision, tempoChanges, beatTypeChanges, keySignatureChanges, log) {
  var _a;
  const notes = [];
  let tempo = ((_a = tempoChanges[0]) == null ? void 0 : _a.tempo) ?? 120;
  let currentTick = 0;
  let currentTime;
  let milliSecondsPerTick = getMillisecondsPerTick(tempo, timeDivision);
  let tickOfLastTempoChange = 0;
  let timeOfLastTempoChange = 0;
  const unfinishedNotes = /* @__PURE__ */ new Map();
  for (const event of track.event) {
    const type = event.type;
    if (type === EVENT_TYPES.meta) {
      continue;
    }
    currentTick += event.deltaTime;
    for (const btc of beatTypeChanges) {
      if (btc.time === void 0 && btc.tick <= currentTick) {
        const t = (btc.tick - tickOfLastTempoChange) * milliSecondsPerTick / 1e3 + timeOfLastTempoChange;
        btc.time = roundToNDecimals(t, ROUNDING_PRECISION2);
      }
    }
    for (const ksc of keySignatureChanges) {
      if (ksc.time === void 0 && ksc.tick <= currentTick) {
        const t = (ksc.tick - tickOfLastTempoChange) * milliSecondsPerTick / 1e3 + timeOfLastTempoChange;
        ksc.time = roundToNDecimals(t, ROUNDING_PRECISION2);
      }
    }
    let mostRecentTempoChange;
    if (tempoChanges.length > 0 && currentTick > tempoChanges[tempoChanges.length - 1].tick) {
      mostRecentTempoChange = tempoChanges[tempoChanges.length - 1];
    }
    for (let index = 1; index < tempoChanges.length; index++) {
      const tick = tempoChanges[index].tick;
      if (tick > currentTick) {
        const change = tempoChanges[index - 1];
        mostRecentTempoChange = change;
        break;
      }
    }
    if (mostRecentTempoChange && mostRecentTempoChange.tempo !== tempo) {
      const tick = mostRecentTempoChange.tick;
      timeOfLastTempoChange = (tick - tickOfLastTempoChange) * milliSecondsPerTick / 1e3 + timeOfLastTempoChange;
      tickOfLastTempoChange = tick;
      mostRecentTempoChange.time = roundToNDecimals(timeOfLastTempoChange, ROUNDING_PRECISION2);
      tempo = mostRecentTempoChange.tempo;
      milliSecondsPerTick = getMillisecondsPerTick(tempo, timeDivision);
    }
    currentTime = (currentTick - tickOfLastTempoChange) * milliSecondsPerTick / 1e3 + timeOfLastTempoChange;
    if (type !== EVENT_TYPES.noteOn && type !== EVENT_TYPES.noteOff) {
      continue;
    }
    const [pitch, velocity] = event.data;
    const channel = event.channel;
    const key = `${pitch} ${channel}`;
    if (type === EVENT_TYPES.noteOff || type === EVENT_TYPES.noteOn && velocity === 0) {
      if (unfinishedNotes.has(key)) {
        unfinishedNotes.get(key).end = roundToNDecimals(currentTime, ROUNDING_PRECISION2);
        unfinishedNotes.delete(key);
      } else {
        if (log) {
          console.warn("Did not find an unfinished note for note-off event!");
          console.log(event);
        }
      }
    } else if (type === EVENT_TYPES.noteOn) {
      const newNote = new Note_default(pitch, roundToNDecimals(currentTime, ROUNDING_PRECISION2), velocity, channel);
      notes.push(newNote);
      unfinishedNotes.set(key, newNote);
    } else {
      continue;
    }
  }
  const neededToFix = [];
  for (const note of notes) {
    if (note.end === -1) {
      note.end = roundToNDecimals(currentTime, ROUNDING_PRECISION2);
      neededToFix.push(note);
    }
  }
  if (neededToFix.length > 0) {
    console.warn(`had to fix ${neededToFix.length} notes`);
    console.log(neededToFix);
  }
  const { trackName, instrument, instrumentName } = getInstrumentAndTrackName(track);
  if (notes.length > 0) {
    const parsedTrack = {
      noteObjs: notes,
      totalTime: currentTime,
      trackName: trackName ?? "Track",
      instrument,
      instrumentName: instrumentName ?? "Unknown instrument"
    };
    return parsedTrack;
  } else {
    return null;
  }
}
function getInstrumentAndTrackName(track) {
  let trackName = null;
  let instrument = null;
  let instrumentName = null;
  for (const event of track.event) {
    if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.trackName) {
      trackName = event.data;
    }
    if (event.type === EVENT_TYPES.programChange) {
      instrument = event.data;
    }
    if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.instrumentName) {
      instrumentName = event.data;
    }
  }
  return {
    trackName,
    instrument,
    instrumentName
  };
}
function getMeasureLines(tempoChanges, beatTypeChanges, totalTime) {
  const measureLines = [];
  let tempo = 120;
  let beats = 4;
  let beatType = 4;
  let currentTime = 0;
  let currentBeatsInMeasure = 0;
  let timeOfLastTempoChange = 0;
  let timeSinceLastTempoChange = 0;
  while (currentTime < totalTime) {
    let mostRecentTempoChange;
    for (const t of tempoChanges) {
      if (t.time <= currentTime) {
        mostRecentTempoChange = t.tempo;
      }
    }
    if (mostRecentTempoChange && mostRecentTempoChange !== tempo) {
      timeOfLastTempoChange = currentTime;
      timeSinceLastTempoChange = 0;
      tempo = mostRecentTempoChange;
    }
    for (const b of beatTypeChanges) {
      if (b.time <= currentTime) {
        beats = b.beats;
        beatType = b.beatType;
      }
    }
    currentBeatsInMeasure++;
    const secondsPerBeat = bpmToSecondsPerBeat(tempo) / (beatType / 4);
    timeSinceLastTempoChange += secondsPerBeat;
    currentTime = timeOfLastTempoChange + timeSinceLastTempoChange;
    if (currentBeatsInMeasure >= beats) {
      currentBeatsInMeasure = 0;
      measureLines.push(roundToNDecimals(currentTime, ROUNDING_PRECISION2));
    }
  }
  return measureLines;
}
function getMeasureIndices(notes, measureTimes) {
  const measureIndices = [];
  const todo = [...measureTimes];
  for (const [index, note] of notes.entries()) {
    if (note.start >= todo[0]) {
      todo.shift();
      measureIndices.push(index);
    }
  }
  return measureIndices;
}
function splitFormat0(tracks) {
  if (tracks.length > 1) {
    console.warn("Splitting a format 0 file with more than 1 track will result in all but the first beeing lost!");
  }
  const grouped = (0, import_d33.group)(tracks[0].noteObjs, (d) => d.channel);
  const splittedTracks = [];
  for (const notes of grouped.values()) {
    splittedTracks.push(__spreadProps(__spreadValues({}, tracks[0]), {
      noteObjs: notes
    }));
  }
  return splittedTracks;
}
function getMillisecondsPerTick(tempo, timeDivision) {
  const milliSecondsPerBeat = 1 / tempo * 6e4;
  const milliSecondsPerTick = milliSecondsPerBeat / timeDivision;
  return milliSecondsPerTick;
}
function getSignatureChanges(tracks) {
  const tempoChanges = [];
  const beatTypeChanges = [];
  const keySignatureChanges = [];
  let currentTick = 0;
  let lastTempo = null;
  for (const track of tracks) {
    for (const event of track.event) {
      currentTick += event.deltaTime;
      if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.setTempo) {
        const milliSecondsPerQuarter = event.data / 1e3;
        const tempo = Math.round(1 / (milliSecondsPerQuarter / 6e4));
        if (tempo !== lastTempo) {
          tempoChanges.push({
            tick: currentTick,
            tempo,
            time: currentTick === 0 ? 0 : void 0
          });
          lastTempo = tempo;
        }
      }
      if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.timeSignature) {
        const d = event.data;
        const beats = d[0];
        const beatType = 2 ** d[1];
        const newEntry = {
          tick: currentTick,
          beats,
          beatType
        };
        if (beatTypeChanges.length === 0) {
          beatTypeChanges.push(newEntry);
        } else {
          const last = beatTypeChanges[beatTypeChanges.length - 1];
          if (last.beats !== beats || last.beatType !== beatType) {
            beatTypeChanges.push(newEntry);
          }
        }
      }
      if (event.type === EVENT_TYPES.meta && event.metaType === META_TYPES.keySignature) {
        const d = event.data;
        if (!KEY_SIG_MAP.has(d)) {
          console.warn("[MidiParser] Invalid key signature", d);
        } else {
          const { key, scale } = KEY_SIG_MAP.get(d);
          const newEntry = {
            tick: currentTick,
            key,
            scale
          };
          if (keySignatureChanges.length === 0) {
            keySignatureChanges.push(newEntry);
          } else {
            const last = keySignatureChanges[keySignatureChanges.length - 1];
            if (last.key !== key || last.scale !== scale) {
              keySignatureChanges.push(newEntry);
            }
          }
        }
      }
    }
  }
  if (tempoChanges.length === 0 || tempoChanges[0].time > 0) {
    tempoChanges.unshift({ tempo: 120, time: 0 });
  }
  if (beatTypeChanges.length === 0 || beatTypeChanges[0].time > 0) {
    beatTypeChanges.unshift({ beats: 4, beatType: 4, time: 0 });
  }
  if (keySignatureChanges.length === 0 || keySignatureChanges[0].time > 0) {
    keySignatureChanges.unshift({ key: "C", scale: "major", time: 0 });
  }
  return { tempoChanges, beatTypeChanges, keySignatureChanges };
}
var EVENT_TYPES = {
  noteOff: 8,
  noteOn: 9,
  noteAftertouch: 10,
  controller: 11,
  programChange: 12,
  channelAftertouch: 13,
  pitchBend: 14,
  meta: 255
};
var META_TYPES = {
  sequenceNumber: 0,
  textEvent: 1,
  copyright: 2,
  trackName: 3,
  instrumentName: 4,
  lyrics: 5,
  marker: 6,
  cuePoint: 7,
  channelPrefix: 32,
  endOfTrack: 47,
  setTempo: 81,
  smpteOffset: 84,
  timeSignature: 88,
  keySignature: 89,
  sequencerSpecific: 127
};
var KEY_SIG_MAP = /* @__PURE__ */ new Map([
  [63744, { key: "Cb", scale: "major" }],
  [64e3, { key: "Gb", scale: "major" }],
  [64256, { key: "Db", scale: "major" }],
  [64512, { key: "Ab", scale: "major" }],
  [64768, { key: "Eb", scale: "major" }],
  [65024, { key: "Bb", scale: "major" }],
  [65280, { key: "F", scale: "major" }],
  [0, { key: "C", scale: "major" }],
  [256, { key: "G", scale: "major" }],
  [512, { key: "D", scale: "major" }],
  [768, { key: "A", scale: "major" }],
  [1024, { key: "E", scale: "major" }],
  [1280, { key: "B", scale: "major" }],
  [1536, { key: "F#", scale: "major" }],
  [1792, { key: "C#", scale: "major" }],
  [63745, { key: "Ab", scale: "minor" }],
  [64001, { key: "Eb", scale: "minor" }],
  [64257, { key: "Bb", scale: "minor" }],
  [64513, { key: "F", scale: "minor" }],
  [64769, { key: "C", scale: "minor" }],
  [65025, { key: "G", scale: "minor" }],
  [65281, { key: "D", scale: "minor" }],
  [1, { key: "A", scale: "minor" }],
  [257, { key: "E", scale: "minor" }],
  [513, { key: "B", scale: "minor" }],
  [769, { key: "F#", scale: "minor" }],
  [1025, { key: "C#", scale: "minor" }],
  [1281, { key: "G#", scale: "minor" }],
  [1537, { key: "D#", scale: "minor" }],
  [1793, { key: "A#", scale: "minor" }]
]);

// src/types/MusicPiece.js
var MusicPiece = class {
  constructor(name, tempos, timeSignatures, keySignatures, measureTimes, tracks) {
    if (!tracks || tracks.length === 0) {
      throw new Error("No or invalid tracks given! Use .fromMidi or .fromMusicXml?");
    }
    this.name = name;
    this.measureTimes = measureTimes;
    this.tracks = tracks;
    this.duration = Math.max(...this.tracks.map((d) => d.duration));
    this.tempos = tempos.slice(0, 1);
    let currentTempo = tempos[0];
    for (const tempo of tempos) {
      if (tempo.string !== currentTempo.string) {
        currentTempo = tempo;
        this.tempos.push(tempo);
      }
    }
    this.timeSignatures = timeSignatures.slice(0, 1);
    let currentTimeSig = timeSignatures[0];
    for (const timeSignature of timeSignatures) {
      if (timeSignature.string !== currentTimeSig.string) {
        currentTimeSig = timeSignature;
        this.timeSignatures.push(timeSignature);
      }
    }
    this.keySignatures = keySignatures.slice(0, 1);
    let currentKeySig = keySignatures[0];
    for (const keySignature of keySignatures) {
      if (keySignature.string !== currentKeySig.string) {
        currentKeySig = keySignature;
        this.keySignatures.push(keySignature);
      }
    }
  }
  static fromMidi(name, midiFile) {
    if (!midiFile) {
      throw new Error("No MIDI file content given");
    }
    const midi = midiParser.parse(midiFile);
    const parsed = preprocessMidiFileData(midi);
    let tempos = [];
    let timeSignatures = [];
    let keySignatures = [];
    let measureTimes = [];
    if (parsed.tracks.length > 0) {
      tempos = parsed.tempoChanges.map((d) => new TempoDefinition(d.time, d.tempo));
      timeSignatures = parsed.beatTypeChanges.map((d) => new TimeSignature(d.time, [d.beats, d.beatType]));
      keySignatures = parsed.keySignatureChanges.map((d) => new KeySignature(d.time, d.key, d.scale));
      measureTimes = parsed.measureLinePositions;
    }
    const tracks = parsed.tracks.map((track) => new Track(track.trackName, track.instrumentName, track.noteObjs, null, track.measureIndices, /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()));
    return new MusicPiece(name, tempos, timeSignatures, keySignatures, measureTimes, tracks);
  }
  static fromMusicXml(name, xmlFile) {
    if (!xmlFile) {
      throw new Error("No MusicXML file content given");
    }
    let xmlDocument = xmlFile;
    if (typeof xmlDocument === "string") {
      const parser = new DOMParser();
      xmlDocument = parser.parseFromString(xmlFile, "text/xml");
    }
    const parsed = preprocessMusicXmlData(xmlDocument);
    let tempos = [];
    let timeSignatures = [];
    let keySignatures = [];
    if (parsed.parts.length > 0) {
      tempos = parsed.parts[0].tempoChanges.map((d) => new TempoDefinition(d.time, d.tempo));
      timeSignatures = parsed.parts[0].beatTypeChanges.map((d) => new TimeSignature(d.time, [d.beats, d.beatType]));
      keySignatures = parsed.parts[0].keySignatureChanges.map((d) => new KeySignature(d.time, d.key, d.scale));
    }
    let measureTimes = [];
    if (parsed.parts.length > 0) {
      measureTimes = parsed.parts[0].measureLinePositions;
    }
    const tracks = parsed.parts.map((track, index) => {
      for (const n of track.noteObjs) {
        n.channel = index;
      }
      return new Track(parsed.partNames[index], parsed.instruments[index], track.noteObjs, track.tuning, track.measureIndices, track.measureRehearsalMap, track.noteLyricsMap, track.xmlNoteIndices);
    });
    return new MusicPiece(name, tempos, timeSignatures, keySignatures, measureTimes, tracks);
  }
  static fromJson(json) {
    json = typeof json === "string" ? JSON.parse(json) : json;
    const name = json.name;
    const tempos = json.tempos.map((d) => new TempoDefinition(d.time, d.bpm));
    const timeSignatures = json.timeSignatures.map((d) => new TimeSignature(d.time, d.signature));
    const keySignatures = json.keySignatures.map((d) => new KeySignature(d.time, d.key, d.scale));
    const measureTimes = json.measureTimes;
    const tracks = json.tracks.map((track) => Track.from(track));
    return new MusicPiece(name, tempos, timeSignatures, keySignatures, measureTimes, tracks);
  }
  toJson(pretty = false) {
    const _this = __spreadProps(__spreadValues({}, this), {
      tracks: this.tracks.map((d) => d.toObject())
    });
    return JSON.stringify(_this, void 0, pretty ? 2 : 0);
  }
  getAllNotes(sortByTime = false) {
    const notes = this.tracks.flatMap((t) => t.notes);
    if (sortByTime) {
      notes.sort((a, b) => a.start - b.start);
    }
    return notes;
  }
  getNotesFromTracks(indices = "all", sortByTime = false) {
    let notes = [];
    if (indices === "all") {
      notes = this.tracks.flatMap((t) => t.notes);
    } else if (Array.isArray(indices)) {
      notes = this.tracks.filter((d, i) => indices.includes(i)).flatMap((t) => t.notes);
    } else {
      notes = this.tracks[indices].notes;
      sortByTime = false;
    }
    if (sortByTime) {
      notes.sort((a, b) => a.start - b.start);
    }
    return notes;
  }
  transpose(steps = 0, tracks = "all") {
    const newTracks = this.tracks.map((track, index) => {
      const change = tracks === "all" || Array.isArray(tracks) && tracks.includes(index) || tracks === index;
      const na = new NoteArray_default(track.notes);
      let tuning = track.tuningPitches;
      if (change) {
        na.transpose(steps);
        tuning = track.tuningPitches.map((d) => d + steps);
      }
      return new Track(track.name, track.instrument, na.getNotes(), tuning, track.measureIndices);
    });
    return new MusicPiece(this.name, [...this.tempos], [...this.timeSignatures], [...this.keySignatures], [...this.measureTimes], newTracks);
  }
};
var Track = class {
  constructor(name, instrument, notes, tuningPitches = null, measureIndices = null, measureRehearsalMap, noteLyricsMap, xmlNoteIndices = null) {
    name = !(name == null ? void 0 : name.length) ? "unnamed" : name.replace("\0", "");
    this.name = name;
    this.instrument = instrument;
    if (!notes || notes.length === void 0) {
      throw new Error("Notes are undefined or not an array");
    }
    this.notes = notes.sort((a, b) => a.start - b.start);
    this.tuningPitches = tuningPitches;
    this.measureIndices = measureIndices;
    this.measureRehearsalMap = measureRehearsalMap;
    this.noteLyricsMap = noteLyricsMap;
    this.xmlNoteIndices = xmlNoteIndices;
    this.duration = new NoteArray_default(notes).getDuration();
    this.hasStringFret = false;
    for (const note of notes) {
      if (note.string !== void 0 && note.fret !== void 0) {
        this.hasStringFret = true;
        break;
      }
    }
  }
  toObject() {
    return __spreadProps(__spreadValues({}, this), {
      measureRehearsalMap: [...this.measureRehearsalMap],
      noteLyricsMap: [...this.noteLyricsMap]
    });
  }
  static from(object) {
    const notes = object.notes.map((note) => {
      return note.string !== void 0 && note.fret !== void 0 ? GuitarNote_default.from(note) : Note_default.from(note);
    });
    const measureRehearsalMap = new Map(object.measureRehearsalMap);
    const noteLyricsMap = new Map(object.noteLyricsMap);
    return new Track(object.name, object.instrument, notes, object.tuningPitches, object.measureIndices, measureRehearsalMap, noteLyricsMap, object.xmlNoteIndices);
  }
};
var TempoDefinition = class {
  constructor(time, bpm) {
    this.time = time;
    this.bpm = bpm;
    this.string = `${bpm} bpm`;
  }
};
var TimeSignature = class {
  constructor(time, signature) {
    this.time = time;
    this.signature = signature;
    this.string = signature.join("/");
  }
};
var KeySignature = class {
  constructor(time, key, scale) {
    this.time = time;
    this.key = key;
    this.scale = scale;
    this.string = `${key} ${scale}`;
  }
};
var MusicPiece_default = MusicPiece;

// src/types/PitchSequence.js
var PitchSequence = class {
  constructor(pitches = []) {
    this._pitches = pitches;
  }
  static fromNotes(notes = []) {
    const pitches = [...notes].sort((a, b) => {
      if (a.start === b.start) {
        return a.pitch - b.pitch;
      }
      return a.start - b.start;
    }).map((d) => d.pitch);
    return new PitchSequence(pitches);
  }
  static fromCharString(string) {
    if (!string || string.length === 0) {
      return new PitchSequence();
    }
    const pitches = [...string].map((d, index) => string.charCodeAt(index));
    return new PitchSequence(pitches);
  }
  getPitches() {
    return this._pitches;
  }
  length() {
    return this._pitches.length;
  }
  toCharString() {
    if (!this._pitches || this._pitches.length === 0) {
      return "";
    }
    return String.fromCharCode(...this._pitches);
  }
  toNoteNameString() {
    return this._pitches.map((p) => getMidiNoteByNr(p).label).join(" ");
  }
  reverse() {
    this._pitches = this._pitches.reverse();
    return this;
  }
  removeOctaves() {
    this._pitches = this._pitches.map((d) => d % 12);
    return this;
  }
  toIntervals() {
    const p = this._pitches;
    if (!p || p.length === 0 || p.length < 2) {
      return [];
    }
    const result = Array.from({ length: p.length - 1 });
    for (let index = 1; index < p.length; index++) {
      result[index - 1] = p[index] - p[index - 1];
    }
    return result;
  }
  clone() {
    return new PitchSequence(this._pitches);
  }
  equals(otherPitchSequence) {
    if (!(otherPitchSequence instanceof PitchSequence)) {
      return false;
    }
    const p = otherPitchSequence.getPitches();
    if (this._pitches.length !== p.length) {
      return false;
    }
    for (const [index, element] of p.entries()) {
      if (this._pitches[index] !== element) {
        return false;
      }
    }
    return true;
  }
};
var PitchSequence_default = PitchSequence;

// src/graphics/Canvas.js
var Canvas_exports = {};
__export(Canvas_exports, {
  drawArc: () => drawArc,
  drawAssymetricArc: () => drawAssymetricArc,
  drawBezierConnectorX: () => drawBezierConnectorX,
  drawBezierConnectorY: () => drawBezierConnectorY,
  drawBowRight: () => drawBowRight,
  drawBracketH: () => drawBracketH,
  drawCircle: () => drawCircle,
  drawColorRamp: () => drawColorRamp,
  drawCornerLine: () => drawCornerLine,
  drawDiamond: () => drawDiamond,
  drawFilledCircle: () => drawFilledCircle,
  drawHLine: () => drawHLine,
  drawHexagon: () => drawHexagon,
  drawLine: () => drawLine,
  drawMatrix: () => drawMatrix,
  drawNoteTrapezoid: () => drawNoteTrapezoid,
  drawNoteTrapezoidUpwards: () => drawNoteTrapezoidUpwards,
  drawRoundedCorner: () => drawRoundedCorner,
  drawRoundedCornerLine: () => drawRoundedCornerLine,
  drawRoundedCornerLineRightLeft: () => drawRoundedCornerLineRightLeft,
  drawRoundedRect: () => drawRoundedRect,
  drawTriangle: () => drawTriangle,
  drawVLine: () => drawVLine,
  drawX: () => drawX,
  setupCanvas: () => setupCanvas
});
var d33 = __toESM(require_d3_node(), 1);
function setupCanvas(canvas) {
  if (!window) {
    return;
  }
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const context = canvas.getContext("2d");
  context.scale(dpr, dpr);
  return context;
}
function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}
function drawHLine(context, x1, y, x2) {
  context.beginPath();
  context.moveTo(x1, y);
  context.lineTo(x2, y);
  context.stroke();
}
function drawVLine(context, x, y1, y2) {
  context.beginPath();
  context.moveTo(x, y1);
  context.lineTo(x, y2);
  context.stroke();
}
function drawBowRight(context, x1, y1, x2, y2, strength = 0.5) {
  const middleX = (x1 + x2) / 2;
  const middleY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const normalX = -dy;
  const normalY = dx;
  const cx = middleX + strength * normalX;
  const cy = middleY + strength * normalY;
  context.beginPath();
  context.moveTo(x1, y1);
  context.bezierCurveTo(cx, cy, cx, cy, x2, y2);
  context.stroke();
}
function drawCircle(context, x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.stroke();
}
function drawFilledCircle(context, x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
}
function drawTriangle(context, x, y, halfSize) {
  context.beginPath();
  context.moveTo(x - halfSize, y + halfSize);
  context.lineTo(x + halfSize, y + halfSize);
  context.lineTo(x, y - halfSize);
  context.closePath();
  context.fill();
}
function drawDiamond(context, x, y, halfSize) {
  context.beginPath();
  context.moveTo(x - halfSize, y);
  context.lineTo(x, y - halfSize);
  context.lineTo(x + halfSize, y);
  context.lineTo(x, y + halfSize);
  context.closePath();
  context.fill();
}
function drawX(context, x, y, halfSize) {
  context.save();
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(x - halfSize, y - halfSize);
  context.lineTo(x + halfSize, y + halfSize);
  context.moveTo(x - halfSize, y + halfSize);
  context.lineTo(x + halfSize, y - halfSize);
  context.stroke();
  context.restore();
}
function drawNoteTrapezoid(context, x, y, width, height, height2) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x, y + height);
  context.lineTo(x + width, y + (height / 2 + height2 / 2));
  context.lineTo(x + width, y + (height / 2 - height2 / 2));
  context.closePath();
  context.fill();
}
function drawNoteTrapezoidUpwards(context, x, y, width, height, width2) {
  context.beginPath();
  context.lineTo(x, y + height);
  context.lineTo(x + width, y + height);
  context.lineTo(x + (width / 2 + width2 / 2), y);
  context.lineTo(x + (width / 2 - width2 / 2), y);
  context.closePath();
  context.fill();
}
function drawRoundedRect(context, x, y, width, height, radius) {
  if (width < 0) {
    return;
  }
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}
function drawCornerLine(context, x1, y1, x2, y2, xFirst = true) {
  context.beginPath();
  context.moveTo(x1, y1);
  xFirst ? context.lineTo(x2, y1) : context.lineTo(x1, y2);
  context.lineTo(x2, y2);
  context.stroke();
}
function drawRoundedCornerLine(context, x1, y1, x2, y2, maxRadius = 25) {
  const xDist = Math.abs(x2 - x1);
  const yDist = Math.abs(y2 - y1);
  const radius = Math.min(xDist, yDist, maxRadius);
  const cx = x1 < x2 ? x2 - radius : x2 + radius;
  const cy = y1 < y2 ? y1 + radius : y1 - radius;
  context.beginPath();
  context.moveTo(x1, y1);
  if (x1 < x2) {
    context.arc(cx, cy, radius, 1.5 * Math.PI, 2 * Math.PI);
  } else {
    context.arc(cx, cy, radius, 1.5 * Math.PI, Math.PI, true);
  }
  context.lineTo(x2, y2);
  context.stroke();
}
function drawRoundedCornerLineRightLeft(context, x1, y1, x2, y2, maxRadius = 25) {
  const xDist = Math.abs(x2 - x1);
  const yDist = Math.abs(y2 - y1);
  const radius = Math.min(xDist, yDist, maxRadius);
  const cx = x1 < x2 ? x1 + radius : x1 - radius;
  const cy = y1 < y2 ? y2 - radius : y2 + radius;
  context.beginPath();
  context.moveTo(x1, y1);
  if (y1 < y2) {
    context.arc(cx, cy, radius, 0, 0.5 * Math.PI);
  } else {
    context.arc(cx, cy, radius, 0, 1.5 * Math.PI, true);
  }
  context.lineTo(x2, y2);
  context.stroke();
}
function drawHexagon(context, cx, cy, radius) {
  context.beginPath();
  for (let index = 0; index < 6; index++) {
    const angle = (60 * index + 30) / 180 * Math.PI;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (index === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }
  context.closePath();
}
function drawBezierConnectorX(context, x1, y1, x2, y2) {
  const deltaX = (x2 - x1) / 2;
  context.beginPath();
  context.moveTo(x1, y1);
  context.bezierCurveTo(x1 + deltaX, y1, x1 + deltaX, y2, x2, y2);
  context.stroke();
}
function drawBezierConnectorY(context, x1, y1, x2, y2) {
  const deltaY = (y2 - y1) / 2;
  context.beginPath();
  context.moveTo(x1, y1);
  context.bezierCurveTo(x1, y1 + deltaY, x2, y1 + deltaY, x2, y2);
  context.stroke();
}
function drawRoundedCorner(context, x1, y1, x2, y2, turnLeft = true, roundness = 1) {
  context.beginPath();
  context.moveTo(x1, y1);
  if (x1 === x2 || y1 === y2) {
    context.lineTo(x2, y2);
    context.stroke();
    return;
  }
  const radius = Math.abs(x2 - x1) * roundness;
  let cx;
  let cy;
  if (turnLeft) {
    if (x1 < x2 && y1 < y2) {
      cx = x1 + radius;
      cy = y2 - radius;
      context.arc(cx, cy, radius, 1 * Math.PI, 0.5 * Math.PI, true);
    } else if (x1 > x2 && y1 < y2) {
      cx = x2 + radius;
      cy = y1 + radius;
      context.arc(cx, cy, radius, 1.5 * Math.PI, 1 * Math.PI, true);
    } else if (x1 > x2 && y1 > y2) {
      cx = x1 - radius;
      cy = y2 + radius;
      context.arc(cx, cy, radius, 0, 1.5 * Math.PI, true);
    } else {
      cx = x2 - radius;
      cy = y1 - radius;
      context.arc(cx, cy, radius, 0.5 * Math.PI, 0, true);
    }
  } else {
    if (x1 < x2 && y1 < y2) {
      cx = x2 - radius;
      cy = y1 + radius;
      context.arc(cx, cy, radius, 1.5 * Math.PI, 0);
    } else if (x1 > x2 && y1 < y2) {
      cx = x1 - radius;
      cy = y2 - radius;
      context.arc(cx, cy, radius, 0, 0.5 * Math.PI);
    } else if (x1 > x2 && y1 > y2) {
      cx = x2 + radius;
      cy = y1 - radius;
      context.arc(cx, cy, radius, 0.5 * Math.PI, 1 * Math.PI, false);
    } else {
      cx = x1 + radius;
      cy = y2 + radius;
      context.arc(cx, cy, radius, Math.PI, 1.5 * Math.PI, false);
    }
  }
  context.lineTo(x2, y2);
  context.stroke();
}
function drawArc(context, startX1, startX2, length, yBottom) {
  const radius = (startX2 - startX1) / 2;
  const cx = startX1 + radius + length / 2;
  context.lineWidth = length;
  context.beginPath();
  context.arc(cx, yBottom, radius, Math.PI, 2 * Math.PI);
  context.stroke();
}
function drawAssymetricArc(context, startX1, endX1, startX2, endX2, yBottom) {
  const radiusTop = (endX2 - startX1) / 2;
  if (radiusTop < 0) {
    return;
  }
  let radiusBottom = (startX2 - endX1) / 2;
  if (radiusBottom < 0) {
    radiusBottom = 0;
  }
  const cxTop = startX1 + radiusTop;
  const cxBottom = endX1 + radiusBottom;
  context.beginPath();
  context.moveTo(startX1, yBottom);
  context.arc(cxTop, yBottom, radiusTop, Math.PI, 2 * Math.PI);
  context.lineTo(startX2, yBottom);
  context.arc(cxBottom, yBottom, radiusBottom, 2 * Math.PI, Math.PI, true);
  context.closePath();
  context.fill();
}
function drawBracketH(context, x, y, w, h) {
  context.beginPath();
  context.moveTo(x, y + h);
  context.lineTo(x, y);
  context.lineTo(x + w, y);
  context.lineTo(x + w, y + h);
  context.stroke();
}
function drawMatrix(context, matrix, x = 0, y = 0, size = 400, colorScale, colorMap = d33.interpolateViridis) {
  const cellSize = size / matrix.length;
  const paddedSize = cellSize * 1.01;
  colorScale = colorScale || d33.scaleLinear().domain(d33.extent(matrix.flat())).range([1, 0]);
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      context.fillStyle = colorMap(colorScale(matrix[row][col]));
      context.fillRect(x, y, paddedSize, paddedSize);
      x += cellSize;
    }
    y += cellSize;
  }
}
function drawColorRamp(context, w = 100, h = 10, colorMap = d33.interpolateRainbow) {
  const scaleColor = d33.scaleLinear().domain([0, w]);
  for (let x = 0; x < w; ++x) {
    context.fillStyle = colorMap(scaleColor(x));
    context.fillRect(x, 0, 1.1, h);
  }
}

// src/input/AudioRecorder.js
var recordAudio = () => {
  return new Promise(async (resolve) => {
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      console.warn("[AudioInput] Cannot access audio", error);
      return;
    }
    const options = {
      audioBitsPerSecond: 128e3
    };
    const mediaRecorder = new MediaRecorder(stream, options);
    let audioChunks = [];
    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });
    const start = () => {
      if (!mediaRecorder) {
        console.warn("[AudioInput] Cannot record audio, no microphone?");
        return;
      }
      if (mediaRecorder.state === "recording") {
        return;
      }
      console.log(`[AudioInput] Recording @ ${mediaRecorder.audioBitsPerSecond} b/s`);
      audioChunks = [];
      mediaRecorder.start();
    };
    const stop = () => new Promise((resolve2) => {
      if (!mediaRecorder) {
        return;
      }
      console.log("[AudioInput] Stopping audio recording");
      mediaRecorder.addEventListener("stop", () => {
        const blobOptions = { type: mediaRecorder.mimeType };
        const audioBlob = new Blob(audioChunks, blobOptions);
        resolve2(audioBlob);
      });
      mediaRecorder.stop();
    });
    resolve({ start, stop });
  });
};

// src/input/MidiRecorder.js
var recordMidi = (onMessage) => {
  return new Promise(async (resolve) => {
    let midiAccess;
    try {
      midiAccess = await navigator.requestMIDIAccess();
    } catch (error) {
      console.warn("[MidiInput] Cannot access MIDI", error);
      return;
    }
    let messages = [];
    const addMessage = (message) => {
      if (onMessage) {
        onMessage(message);
      }
      messages.push(message);
    };
    const start = () => {
      if (!midiAccess) {
        console.warn("[MidiInput] Cannot record MIDI");
        return;
      }
      for (const input of midiAccess.inputs.values()) {
        input.onmidimessage = addMessage;
      }
      console.log("[MidiInput] Starting recording");
      messages = [];
    };
    const stop = () => {
      if (!midiAccess) {
        return;
      }
      console.log("[MidiInput] Stopping recording");
      const notes = processMidiMessagesToNotes(messages);
      return notes;
    };
    resolve({ start, stop });
  });
};
function processMidiMessagesToNotes(messages) {
  const currentNotes = /* @__PURE__ */ new Map();
  const notes = [];
  for (const message of messages) {
    const device = message.target.name;
    const time = message.timeStamp;
    const commandAndChannel = message.data[0];
    const channel = commandAndChannel % 16;
    const command = commandAndChannel - channel;
    const pitch = message.data[1];
    const velocity = message.data.length > 2 ? message.data[2] : 0;
    switch (command) {
      case 128:
        noteOff(notes, currentNotes, device, time, pitch, channel);
        break;
      case 144:
        if (velocity > 0) {
          noteOn(currentNotes, device, time, pitch, channel, velocity);
        } else {
          noteOff(notes, currentNotes, device, time, pitch, channel);
        }
        break;
      case 224:
        break;
      default:
    }
  }
  if (currentNotes.size > 0) {
    console.warn(`[MidiInput] Got ${currentNotes.size} unfinished notes`);
  }
  notes.sort((a, b) => a.start - b.start);
  return notes;
}
function noteOn(currentNotes, device, time, pitch, channel, velocity) {
  const note = new Note_default(pitch, time / 1e3, velocity, channel);
  const key = `${device}-${channel}-${pitch}`;
  currentNotes.set(key, note);
}
function noteOff(notes, currentNotes, device, time, pitch, channel) {
  const key = `${device}-${channel}-${pitch}`;
  if (!currentNotes.has(key)) {
    console.warn(`[MidiInput] Missing note-on for note-off with key ${key}`);
    return;
  }
  const note = currentNotes.get(key);
  note.end = time / 1e3;
  notes.push(note);
  currentNotes.delete(key);
}

// src/input/MidiInputManager.js
var MidiInputManager = class {
  constructor(getMidiLiveData, setMidiLiveData, addCurrentNote = () => {
  }, removeCurrentNote = () => {
  }) {
    this._getMidiLiveData = getMidiLiveData;
    this._setMidiLiveData = setMidiLiveData;
    this._addCurrentNote = addCurrentNote;
    this._removeCurrentNote = removeCurrentNote;
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(this._onMIDISuccess, this._onMIDIFailure);
    } else {
      console.error("[MidiInput] WebMIDI is not supported in this browser.");
      throw new Error("Browser does not support WebMIDI");
    }
  }
  _onMIDISuccess(midiAccess) {
    console.groupCollapsed(`[MidiInput] ${midiAccess.inputs.size} input devices`);
    for (const input of midiAccess.inputs.values()) {
      console.log(` - ${input.name}`);
      input.onmidimessage = this._handleMIDIMessage;
    }
    console.groupEnd();
  }
  _onMIDIFailure(error) {
    console.error("[MidiInput] Cannot access MIDI devices.", error);
  }
  _handleMIDIMessage(message) {
    const device = message.target.name;
    const commandAndChannel = message.data[0];
    const channel = commandAndChannel % 16;
    const command = commandAndChannel - channel;
    const time = message.timeStamp;
    const pitch = message.data[1];
    const velocity = message.data.length > 2 ? message.data[2] : 0;
    switch (command) {
      case 128:
        this._noteOff(device, time, pitch, channel);
        break;
      case 144:
        if (velocity > 0) {
          this._noteOn(device, time, pitch, channel, velocity);
        } else {
          this._noteOff(device, time, pitch, channel);
        }
        break;
      case 224:
        break;
      default:
    }
  }
  _noteOn(device, time, pitch, channel, velocity) {
    const note = new Note_default(pitch, time / 1e3, velocity, channel);
    this._addCurrentNote(note);
    let midiData = this._getMidiLiveData();
    midiData = [...midiData, note];
    this._setMidiLiveData(midiData);
  }
  _noteOff(device, time, pitch, channel) {
    const midiData = this._getMidiLiveData();
    if (midiData.length === 0) {
      setTimeout(() => this._noteOff(time, pitch), 10);
    }
    let index = midiData.length - 1;
    while (midiData[index].pitch !== pitch || midiData[index].channel !== channel) {
      index--;
      if (index < 0) {
        console.warn("[MidiInput] Did not find note-on event for note-off event!");
        break;
      }
    }
    if (index >= 0) {
      midiData[index].end = time / 1e3;
      this._setMidiLiveData(midiData);
      this._removeCurrentNote(pitch);
    }
  }
};
var MidiInputManager_default = MidiInputManager;

// src/instruments/Drums.js
var Drums_exports = {};
__export(Drums_exports, {
  DRUM_ACTIONS: () => DRUM_ACTIONS,
  DRUM_PARTS: () => DRUM_PARTS,
  DRUM_PARTS_ACTIONS: () => DRUM_PARTS_ACTIONS,
  drumPitchReplacementMapMPS850: () => drumPitchReplacementMapMPS850,
  generateDrumVariation: () => generateDrumVariation,
  getPitch2PositionMap: () => getPitch2PositionMap,
  simplifyDrumPitches: () => simplifyDrumPitches
});
var import_d34 = __toESM(require_d3_node(), 1);
var DRUM_PARTS = {
  Agogo: "DRUM_PARTS.Agogo",
  Cabasa: "DRUM_PARTS.Cabasa",
  Castanets: "DRUM_PARTS.Castanets",
  China: "DRUM_PARTS.China",
  Claves: "DRUM_PARTS.Claves",
  Conga: "DRUM_PARTS.Conga",
  Cowbell: "DRUM_PARTS.Cowbell",
  Crash: "DRUM_PARTS.Crash",
  Cuica: "DRUM_PARTS.Cuica",
  Cymbal: "DRUM_PARTS.Cymbal",
  Golpe: "DRUM_PARTS.Golpe",
  Grancassa: "DRUM_PARTS.Grancassa",
  Guiro: "DRUM_PARTS.Guiro",
  Hand_Clap: "DRUM_PARTS.Hand Clap",
  Hand: "DRUM_PARTS.Hand",
  Hi_Hat: "DRUM_PARTS.Hi Hat",
  High_Floor_Tom: "DRUM_PARTS.High Floor Tom",
  High_Tom: "DRUM_PARTS.High Tom",
  Kick: "DRUM_PARTS.Kick",
  Low_Floor_Tom: "DRUM_PARTS.Low Floor Tom",
  Low_Tom: "DRUM_PARTS.Low Tom",
  Mid_Tom: "DRUM_PARTS.Mid Tom",
  Pedal_Hi_Hat: "DRUM_PARTS.Pedal Hi Hat",
  Ride: "DRUM_PARTS.Ride",
  Right_Maraca: "DRUM_PARTS.Right Maraca",
  Shaker: "DRUM_PARTS.Shaker",
  Snare: "DRUM_PARTS.Snare",
  Splash: "DRUM_PARTS.Splash",
  Surdo: "DRUM_PARTS.Surdo",
  Timbale: "DRUM_PARTS.Timbale",
  Tinkle_Bell: "DRUM_PARTS.Tinkle Bell",
  Triangle: "DRUM_PARTS.Triangle",
  Vibraslap: "DRUM_PARTS.Vibraslap",
  Whistle_high: "DRUM_PARTS.Whistle high",
  Whistle_low: "DRUM_PARTS.Whistle low",
  Woodblock_high: "DRUM_PARTS.Woodblock high",
  Woodblock_low: "DRUM_PARTS.Woodblock low"
};
var DRUM_ACTIONS = {
  choke: "DRUM_ACTIONS.choke",
  finger: "DRUM_ACTIONS.finger",
  hit: "DRUM_ACTIONS.hit",
  mute: "DRUM_ACTIONS.mute",
  return: "DRUM_ACTIONS.return",
  scrapReturn: "DRUM_ACTIONS.scrapReturn",
  sideStick: "DRUM_ACTIONS.sideStick",
  slap: "DRUM_ACTIONS.slap"
};
var DRUM_PARTS_ACTIONS = {
  Agogo_high_hit: "DRUM_PARTS_ACTIONS.Agogo high (hit)",
  Agogo_low_hit: "DRUM_PARTS_ACTIONS.Agogo low (hit)",
  Cabasa_return: "DRUM_PARTS_ACTIONS.Cabasa (return)",
  Castanets_hit: "DRUM_PARTS_ACTIONS.Castanets (hit)",
  China_choke: "DRUM_PARTS_ACTIONS.China (choke)",
  Claves_hit: "DRUM_PARTS_ACTIONS.Claves (hit)",
  Conga_high_slap: "DRUM_PARTS_ACTIONS.Conga high (slap)",
  Conga_low_mute: "DRUM_PARTS_ACTIONS.Conga low (mute)",
  Cowbell_high_tip: "DRUM_PARTS_ACTIONS.Cowbell high (tip)",
  Crash_medium_choke: "DRUM_PARTS_ACTIONS.Crash medium (choke)",
  Cuica_mute: "DRUM_PARTS_ACTIONS.Cuica (mute)",
  Cuica_open: "DRUM_PARTS_ACTIONS.Cuica (open)",
  Cymbal_hit: "DRUM_PARTS_ACTIONS.Cymbal (hit)",
  Golpe_finger: "DRUM_PARTS_ACTIONS.Golpe (finger)",
  Grancassa_hit: "DRUM_PARTS_ACTIONS.Grancassa (hit)",
  Guiro_hit: "DRUM_PARTS_ACTIONS.Guiro (hit)",
  Guiro_scrap_return: "DRUM_PARTS_ACTIONS.Guiro (scrap-return)",
  Hand_Clap_hit: "DRUM_PARTS_ACTIONS.Hand Clap (hit)",
  Hand_slap: "DRUM_PARTS_ACTIONS.Hand (slap)",
  Hi_Hat_closed: "DRUM_PARTS_ACTIONS.Hi-Hat (closed)",
  Hi_Hat_open: "DRUM_PARTS_ACTIONS.Hi-Hat (open)",
  High_Floor_Tom_hit: "DRUM_PARTS_ACTIONS.High Floor Tom (hit)",
  High_Tom_hit: "DRUM_PARTS_ACTIONS.High Tom (hit)",
  Kick_hit: "DRUM_PARTS_ACTIONS.Kick (hit)",
  Low_Floor_Tom_hit: "DRUM_PARTS_ACTIONS.Low Floor Tom (hit)",
  Low_Tom_hit: "DRUM_PARTS_ACTIONS.Low Tom (hit)",
  Mid_Tom_hit: "DRUM_PARTS_ACTIONS.Mid Tom (hit)",
  Pedal_Hi_Hat_hit: "DRUM_PARTS_ACTIONS.Pedal Hi-Hat (hit)",
  Ride_choke: "DRUM_PARTS_ACTIONS.Ride (choke)",
  Right_Maraca_return: "DRUM_PARTS_ACTIONS.Right Maraca (return)",
  Shaker_return: "DRUM_PARTS_ACTIONS.Shaker (return)",
  Snare_hit: "DRUM_PARTS_ACTIONS.Snare (hit)",
  Snare_side_stick: "DRUM_PARTS_ACTIONS.Snare (side stick)",
  Splash_choke: "DRUM_PARTS_ACTIONS.Splash (choke)",
  Surdo_hit: "DRUM_PARTS_ACTIONS.Surdo (hit)",
  Surdo_mute: "DRUM_PARTS_ACTIONS.Surdo (mute)",
  Timbale_high_hit: "DRUM_PARTS_ACTIONS.Timbale high (hit)",
  Timbale_low_hit: "DRUM_PARTS_ACTIONS.Timbale low (hit)",
  Tinkle_Bell_hit: "DRUM_PARTS_ACTIONS.Tinkle Bell (hit)",
  Triangle_hit: "DRUM_PARTS_ACTIONS.Triangle (hit)",
  Triangle_mute: "DRUM_PARTS_ACTIONS.Triangle (mute)",
  Vibraslap_hit: "DRUM_PARTS_ACTIONS.Vibraslap (hit)",
  Whistle_high_hit: "DRUM_PARTS_ACTIONS.Whistle high (hit)",
  Whistle_low_hit: "DRUM_PARTS_ACTIONS.Whistle low (hit)",
  Woodblock_high_hit: "DRUM_PARTS_ACTIONS.Woodblock high (hit)",
  Woodblock_low_hit: "DRUM_PARTS_ACTIONS.Woodblock low (hit)"
};
var drumPitchReplacementMapMPS850 = /* @__PURE__ */ new Map([
  [49, { repPitch: 49, zone: 1, order: 10, line: -1, shape: "o", label: "CC1", name: "Crash Cymbal 1" }],
  [55, { repPitch: 49, zone: 2, order: 11, line: -1, shape: "o", label: "CC1", name: "Crash Cymbal 1" }],
  [52, { repPitch: 57, zone: 1, order: 20, line: 0, shape: "o", label: "CC2", name: "Crash Cymbal 2" }],
  [57, { repPitch: 57, zone: 2, order: 21, line: 0, shape: "o", label: "CC2", name: "Crash Cymbal 2" }],
  [22, { repPitch: 46, zone: 1, order: 30, line: 0, shape: "<>", label: "HHS", name: "Hi-Hat" }],
  [26, { repPitch: 46, zone: 2, order: 31, line: 0, shape: "<>", label: "HHS", name: "Hi-Hat" }],
  [42, { repPitch: 46, zone: 3, order: 32, line: 0, shape: "<>", label: "HHS", name: "Hi-Hat" }],
  [46, { repPitch: 46, zone: 4, order: 33, line: 0, shape: "<>", label: "HHS", name: "Hi-Hat" }],
  [44, { repPitch: 44, zone: 1, order: 40, line: 9, shape: "o", label: "HHP", name: "Hi-Hat Pedal" }],
  [51, { repPitch: 51, zone: 1, order: 50, line: 1, shape: "x", label: "Rd", name: "Ride Cymbal" }],
  [53, { repPitch: 51, zone: 2, order: 51, line: 1, shape: "x", label: "Rd", name: "Ride Cymbal" }],
  [59, { repPitch: 51, zone: 3, order: 52, line: 1, shape: "x", label: "Rd", name: "Ride Cymbal" }],
  [38, { repPitch: 38, zone: 1, order: 60, line: 4, shape: "o", label: "SN", name: "Snare" }],
  [40, { repPitch: 38, zone: 2, order: 61, line: 4, shape: "o", label: "SN", name: "Snare" }],
  [48, { repPitch: 48, zone: 1, order: 90, line: 2, shape: "o", label: "T1", name: "Tom 1" }],
  [50, { repPitch: 48, zone: 2, order: 91, line: 2, shape: "o", label: "T1", name: "Tom 1" }],
  [45, { repPitch: 45, zone: 1, order: 100, line: 3, shape: "o", label: "T2", name: "Tom 2" }],
  [47, { repPitch: 45, zone: 2, order: 101, line: 3, shape: "o", label: "T2", name: "Tom 2" }],
  [43, { repPitch: 43, zone: 1, order: 70, line: 5, shape: "o", label: "ST1", name: "Stand Tom 1" }],
  [58, { repPitch: 43, zone: 2, order: 71, line: 5, shape: "o", label: "ST1", name: "Stand Tom 1" }],
  [39, { repPitch: 41, zone: 1, order: 80, line: 6, shape: "o", label: "ST2", name: "Stand Tom 2" }],
  [41, { repPitch: 41, zone: 2, order: 81, line: 6, shape: "o", label: "ST2", name: "Stand Tom 2" }],
  [35, { repPitch: 36, zone: 1, order: 110, line: 8, shape: "o", label: "BD", name: "Bass Drum" }],
  [36, { repPitch: 36, zone: 2, order: 111, line: 8, shape: "o", label: "BD", name: "Bass Drum" }]
]);
function generateDrumVariation(data, deviation2 = 1, pAdd = 0.1, pRemove = 0.1) {
  const usedPitches = /* @__PURE__ */ new Set();
  for (const note of data) {
    usedPitches.add(note.pitch);
  }
  const pitches = [...usedPitches];
  const randVelocity = (0, import_d34.randomInt)(15, 128);
  const randTime = (0, import_d34.randomNormal)(0, deviation2);
  const variation = [];
  for (const note of data) {
    if (randFloat(0, 1) < pAdd) {
      const start = note.start + randFloat(0, 1);
      const end = start + randFloat(0, 1);
      const velocity = randVelocity();
      const pitch = choose(pitches);
      variation.push(new Note_default(pitch, start, velocity, 0, end));
    }
    if (randFloat(0, 1) < pRemove) {
    } else {
      const start = note.start + randTime();
      const end = note.end + randTime();
      const newNote = Note_default.from(note);
      newNote.start = Math.min(start, end);
      newNote.end = Math.max(start, end);
      variation.push(newNote);
    }
  }
  variation.sort((a, b) => a.start - b.start);
  return variation;
}
function simplifyDrumPitches(notes, replacementMap) {
  if (!replacementMap || !(replacementMap instanceof Map)) {
    throw new Error("No replacement map given!");
  }
  const errors = /* @__PURE__ */ new Set();
  const simplified = notes.map((note) => {
    const oldPitch = note.pitch;
    let newPitch = oldPitch;
    if (!replacementMap.has(oldPitch)) {
      errors.add(oldPitch);
    } else {
      newPitch = replacementMap.get(oldPitch).repPitch;
    }
    const newNote = Note_default.from(__spreadProps(__spreadValues({}, note), { pitch: newPitch }));
    return newNote;
  });
  return simplified;
}
function getPitch2PositionMap(replacementMap) {
  const result = /* @__PURE__ */ new Map();
  const uniqeRows = [...(0, import_d34.group)([...replacementMap], (d) => d[1].repPitch)];
  uniqeRows.sort((a, b) => a[1][0][1].order - b[1][0][1].order);
  for (const [index, d] of uniqeRows.entries()) {
    result.set(d[0], index);
  }
  return result;
}

// src/instruments/Guitar.js
var Guitar_exports = {};
__export(Guitar_exports, {
  StringedTuning: () => StringedTuning,
  fretboardPositionsFromMidi: () => fretboardPositionsFromMidi,
  generateExampleData: () => generateExampleData,
  getFretboardPositionsFromNoteName: () => getFretboardPositionsFromNoteName,
  getFretboardPositionsFromPitch: () => getFretboardPositionsFromPitch,
  getNoteInfoFromFretboardPos: () => getNoteInfoFromFretboardPos,
  getPitchFromFretboardPos: () => getPitchFromFretboardPos,
  getTuningFromPitches: () => getTuningFromPitches,
  getTuningPitchRange: () => getTuningPitchRange,
  guitarNoteFromNote: () => guitarNoteFromNote,
  stringColors: () => stringColors,
  stringedTunings: () => stringedTunings
});
var import_d35 = __toESM(require_d3_node(), 1);
var StringedTuning = class {
  constructor(name, notes) {
    this.name = name;
    this.notes = notes;
    this.short = notes.join(" ");
    this.pitches = notes.map((note) => getMidiNoteByLabel(note).pitch);
    this.stringCount = notes.length;
  }
};
var stringedTunings = /* @__PURE__ */ new Map([
  ["Guitar", /* @__PURE__ */ new Map([
    [6, [
      new StringedTuning("E stand.", ["E2", "A2", "D3", "G3", "B3", "E4"]),
      new StringedTuning("Drop D", ["D2", "A2", "D3", "G3", "B3", "E4"]),
      new StringedTuning("Drop C", ["C2", "G2", "C3", "F3", "A3", "D4"]),
      new StringedTuning("1/2 down", ["D#2", "G#2", "C#3", "F#3", "A#3", "D#4"]),
      new StringedTuning("1 down", ["D2", "G2", "C3", "F3", "A3", "D4"]),
      new StringedTuning("1 1/2 down", ["C#2", "F#2", "B2", "E3", "G#3", "C#4"]),
      new StringedTuning("2 down", ["C2", "F2", "A#2", "D#3", "G3", "C4"]),
      new StringedTuning("DADGAG", ["D2", "A2", "D3", "G3", "A3", "D4"])
    ]],
    [7, [
      new StringedTuning("B stand.", ["B1", "E2", "A2", "D3", "G3", "B3", "E4"]),
      new StringedTuning("Drop A", ["A1", "E2", "A2", "D3", "G3", "B3", "E4"]),
      new StringedTuning("1/2 down", ["A#1", "D#2", "G#2", "C#3", "F#3", "A#3", "D#4"]),
      new StringedTuning("1 down", ["A1", "D2", "G2", "C3", "F3", "A3", "D4"]),
      new StringedTuning("1 1/2 down", ["G#1", "C#2", "F#2", "B2", "E3", "G#3", "C#4"]),
      new StringedTuning("2 down", ["G1", "C2", "F2", "A#2", "D#3", "G3", "C4"])
    ]],
    [8, [
      new StringedTuning("F# stand.", ["F#1", "B1", "E2", "A2", "D3", "G3", "B3", "E4"]),
      new StringedTuning("Drop E", ["E1", "B1", "E2", "A2", "D3", "G3", "B3", "E4"]),
      new StringedTuning("1/2 down", ["F1", "A#1", "D#2", "G#2", "C#3", "F#3", "A#3", "D#4"]),
      new StringedTuning("1 down", ["E1", "A1", "D2", "G2", "C3", "F3", "A3", "D4"]),
      new StringedTuning("1 1/2 down", ["D#1", "G#1", "C#2", "F#2", "B2", "E3", "G#3", "C#4"]),
      new StringedTuning("2 down", ["D1", "G1", "C2", "F2", "A#2", "D#3", "G3", "C4"])
    ]]
  ])],
  ["Bass", /* @__PURE__ */ new Map([
    [4, [
      new StringedTuning("E stand.", ["E1", "A1", "D2", "G2"]),
      new StringedTuning("Drop D", ["D1", "A1", "D2", "G2"]),
      new StringedTuning("1/2 down", ["D#1", "G#1", "C#2", "F#2"]),
      new StringedTuning("1 down", ["D1", "G1", "C2", "F2"]),
      new StringedTuning("1 1/2 down", ["C#1", "F#1", "B1", "E2"]),
      new StringedTuning("2 down", ["C1", "F1", "A#1", "D#2"])
    ]],
    [5, [
      new StringedTuning("B stand.", ["B0", "E1", "A1", "D2", "G2"]),
      new StringedTuning("Drop A", ["A0", "D1", "A1", "D2", "G2"]),
      new StringedTuning("1/2 down", ["A#0", "D#1", "G#1", "C#2", "F#2"]),
      new StringedTuning("1 down", ["A0", "D1", "G1", "C2", "F2"]),
      new StringedTuning("1 1/2 down", ["G#0", "C#1", "F#1", "B1", "E2"]),
      new StringedTuning("2 down", ["G0", "C1", "F1", "A#1", "D#2"])
    ]],
    [6, [
      new StringedTuning("F# stand.", ["F#0", "B0", "E1", "A1", "D2", "G2"]),
      new StringedTuning("Drop E", ["E0", "A0", "D1", "A1", "D2", "G2"]),
      new StringedTuning("1/2 down", ["F0", "A#0", "D#1", "G#1", "C#2", "F#2"]),
      new StringedTuning("1 down", ["E1", "A0", "D1", "G1", "C2", "F2"]),
      new StringedTuning("1 1/2 down", ["D#0", "G#0", "C#1", "F#1", "B1", "E2"]),
      new StringedTuning("2 down", ["D0", "G0", "C1", "F1", "A#1", "D#2"])
    ]]
  ])],
  ["Ukulele", /* @__PURE__ */ new Map([
    [4, [
      new StringedTuning("Hawaii", ["G4", "C4", "E4", "A4"]),
      new StringedTuning("Low G", ["G3", "C4", "E4", "A4"]),
      new StringedTuning("D-tuning", ["A4", "D4", "F#4", "B4"]),
      new StringedTuning("Canadian", ["A3", "D4", "F#4", "B4"]),
      new StringedTuning("Bariton", ["D3", "G3", "B3", "E4"])
    ]]
  ])]
]);
function guitarNoteFromNote(note, tuning) {
  const string = note.channel;
  const reversedString = tuning.stringCount - string - 1;
  const fret = note.pitch - tuning.pitches[reversedString];
  return GuitarNote_default.fromNote(note, string, fret);
}
function getTuningFromPitches(pitches) {
  const stringCount = pitches.length;
  for (const stringCountMap of stringedTunings.values()) {
    if (stringCountMap.has(stringCount)) {
      const tunings = stringCountMap.get(stringCount);
      for (const t of tunings) {
        if (arrayShallowEquals(t.pitches, pitches)) {
          return t;
        }
      }
    }
  }
  return null;
}
function getTuningPitchRange(tuning, fretCount = 24) {
  const openMax = tuning.pitches[tuning.stringCount - 1];
  const openMin = tuning.pitches[0];
  return [openMin, openMax + fretCount];
}
var stringColors = [
  "#888",
  "#d122e9",
  "#31eb1c",
  "#f37c14",
  "#10edfc",
  "#ffeb09",
  "#ff210d",
  "silver",
  "gold"
];
function getPitchFromFretboardPos(string, fret, tuning) {
  const reversedString = tuning.stringCount - string + 1;
  const openPitch = tuning.pitches[reversedString - 1];
  return openPitch + fret;
}
function getNoteInfoFromFretboardPos(string, fret, tuning) {
  const pitch = getPitchFromFretboardPos(string, fret, tuning);
  return getMidiNoteByNr(pitch);
}
function getFretboardPositionsFromPitch(pitch, tuning, fretCount) {
  const positions = [];
  const stringCount = tuning.stringCount;
  for (let string = 0; string < stringCount; string++) {
    const openPitch = tuning.pitches[string];
    if (pitch < openPitch) {
      continue;
    }
    if (pitch > openPitch + fretCount) {
      continue;
    }
    positions.push({
      string: stringCount - string,
      fret: pitch - openPitch
    });
  }
  return positions;
}
function getFretboardPositionsFromNoteName(name, tuning, fretCount = 24) {
  const n = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  if (!n.includes(name)) {
    return null;
  }
  const positions = [];
  const lowestPitch = n.indexOf(name);
  const stringCount = tuning.stringCount;
  for (let string = 0; string < stringCount; string++) {
    const openPitch = tuning.pitches[string];
    let fret = lowestPitch - openPitch % 12;
    if (fret < 0) {
      fret += 12;
    }
    while (fret <= fretCount) {
      positions.push({
        string: stringCount - string,
        fret
      });
      fret += 12;
    }
  }
  return positions;
}
function generateExampleData(startTime = 0, count = 50, tuning) {
  let currentTime = startTime;
  return Array.from({ length: count }).map(() => {
    const start = currentTime + randFloat(0, 1);
    currentTime = start + randFloat(0, 1);
    const string = (0, import_d35.randomInt)(1, 7)();
    const fret = (0, import_d35.randomInt)(0, 25)();
    const pitch = getPitchFromFretboardPos(string, fret, tuning);
    const velocity = (0, import_d35.randomInt)(15, 127)();
    return new GuitarNote_default(pitch, start, velocity, string, currentTime, string, fret);
  });
}
function fretboardPositionsFromMidi(notes, tuning, fretCount = 24) {
  if (!notes || notes.length === 0) {
    return [];
  }
  if (!tuning || !tuning.pitches) {
    console.warn("Invalid tuning parameter!");
    return [];
  }
  const [minPitch, maxPitch] = getTuningPitchRange(tuning, fretCount);
  const possibleNotes = [];
  const errorPitches = [];
  for (const note of notes) {
    if (note.pitch < minPitch || note.pitch > maxPitch) {
      errorPitches.push(note.pitch);
    } else {
      possibleNotes.push(note);
    }
  }
  const result = [];
  for (const note of possibleNotes) {
    const positions = getFretboardPositionsFromPitch(note.pitch, tuning, 24);
    let bestPos = positions[0];
    for (const pos of positions) {
      if (pos.fret < bestPos.fret) {
        bestPos = pos;
      }
    }
    const { string, fret } = bestPos;
    result.push(GuitarNote_default.fromNote(note, string, fret));
  }
  if (errorPitches.length > 0) {
    const [minDataPitch, maxDataPitch] = (0, import_d35.extent)(notes, (d) => d.pitch);
    let advice = "";
    if (minDataPitch < minPitch) {
      advice += `Transpose by ${minPitch - minDataPitch} semitones`;
    }
    if (maxPitch < maxDataPitch) {
      advice += `Transpose by ${maxPitch - maxDataPitch} semitones`;
    }
    console.warn(`Cannot find a fretboard position for ${errorPitches.length} pitches, try another tuning instead:
`, errorPitches, `
Current tuning's pitch range is ${minPitch} - ${maxPitch}`, `
data pitch range is ${minDataPitch} - ${maxDataPitch}
`, advice);
  }
  return result;
}

// src/instruments/Lamellophone.js
var Lamellophone_exports = {};
__export(Lamellophone_exports, {
  LamellophoneTuning: () => LamellophoneTuning,
  bestTransposition: () => bestTransposition,
  convertNotesToHtmlTab: () => convertNotesToHtmlTab,
  convertNotesToTab: () => convertNotesToTab,
  convertNumbersToLetters: () => convertNumbersToLetters,
  convertTabToNotes: () => convertTabToNotes,
  lamellophoneTunings: () => lamellophoneTunings
});
var import_d37 = __toESM(require_d3_node(), 1);

// src/chords/Chords.js
var Chords_exports = {};
__export(Chords_exports, {
  detectChordsByExactStart: () => detectChordsByExactStart,
  detectChordsByOverlap: () => detectChordsByOverlap,
  detectChordsBySimilarStart: () => detectChordsBySimilarStart,
  getChordName: () => getChordName,
  getChordType: () => getChordType
});
var import_d36 = __toESM(require_d3_node(), 1);
var import_tonal = __toESM(require_dist21(), 1);
function detectChordsByExactStart(notes) {
  const grouped = (0, import_d36.group)(notes, (d) => d.start);
  const chords = [...grouped].map((d) => d[1]).sort((a, b) => a[0].start - b[0].start).map((chord) => chord.sort((a, b) => a.pitch - b.pitch));
  return chords;
}
function detectChordsBySimilarStart(notes, threshold = 0.02) {
  const chords = [];
  let currentChord = [];
  let currentChordStartTime = 0;
  let currentChordPitches = /* @__PURE__ */ new Set();
  for (const note of notes) {
    if (note.start - currentChordStartTime <= threshold) {
      if (!currentChordPitches.has(note.pitch)) {
        currentChord.push(note);
        currentChordPitches.add(note.pitch);
      }
    } else {
      if (currentChord.length > 0) {
        chords.push(currentChord);
      }
      currentChord = [note];
      currentChordStartTime = note.start;
      currentChordPitches = /* @__PURE__ */ new Set([note.pitch]);
    }
  }
  if (currentChord.length > 0) {
    chords.push(currentChord);
  }
  return chords;
}
function detectChordsByOverlap(notes, sortByPitch = true) {
  if (!notes || notes.length === 0) {
    return [];
  }
  if (notes.length === 1) {
    return [[notes[0]]];
  }
  const sorted = [...notes].sort((a, b) => a.start !== b.start ? a.start - b.start : a.pitch - b.pitch);
  const notesTodo = new Set(sorted);
  const chords = [];
  while (notesTodo.size > 0) {
    const note1 = notesTodo.values().next().value;
    notesTodo.delete(note1);
    let chord = [note1];
    for (const note2 of notesTodo.values()) {
      if (note1.overlapInSeconds(note2) >= 0.5 * note1.getDuration()) {
        chord.push(note2);
        notesTodo.delete(note2);
      }
    }
    if (sortByPitch) {
      chord = chord.sort((a, b) => a.pitch - b.pitch);
    }
    chords.push(chord);
  }
  return chords;
}
var chordTypes = /* @__PURE__ */ new Map([
  [
    1,
    [
      { steps: [5], name: "Inverted power chord", suffix: "?" },
      { steps: [7], name: "Power chord", suffix: "5" }
    ]
  ],
  [
    2,
    [
      { steps: [2, 7], name: "Suspended second", suffix: "sus2" },
      { steps: [3, 6], name: "Diminished", suffix: "dim" },
      { steps: [3, 7], name: "Minor", suffix: "min" },
      { steps: [4, 10], name: "Seventh", suffix: "7" },
      { steps: [4, 7], name: "Major", suffix: "" },
      { steps: [4, 8], name: "Augmented", suffix: "aug" },
      { steps: [4, 9], name: "Sixth", suffix: "6" },
      { steps: [5, 7], name: "Suspended fourth", suffix: "sus4" }
    ]
  ],
  [
    3,
    [
      { steps: [2, 3, 7], name: "Minor, added ninth", suffix: "m(add9)" },
      { steps: [2, 4, 7], name: "Added ninth", suffix: "add9" },
      { steps: [3, 6, 10], name: "Minor seventh, flat fifth", suffix: "m7b5" },
      { steps: [3, 7, 10], name: "Minor seventh", suffix: "m7" },
      { steps: [3, 7, 11], name: "Minor, major seventh", suffix: "m(Maj7)" },
      { steps: [3, 7, 8], name: "Minor, flat sixth", suffix: "mb6" },
      { steps: [3, 7, 9], name: "Minor sixth", suffix: "m6" },
      { steps: [4, 5, 11], name: "Major eleventh (no fifth, no ninth)", suffix: "Maj11" },
      { steps: [4, 5, 7], name: "Added fourth", suffix: "add4" },
      { steps: [4, 7, 10], name: "Dominant seventh", suffix: "7" },
      { steps: [4, 7, 11], name: "Major seventh", suffix: "Maj7" },
      { steps: [4, 7, 9], name: "Major Sixth", suffix: "Maj6" }
    ]
  ],
  [
    4,
    [
      { steps: [2, 3, 6, 10], name: "Minor ninth flat fifth", suffix: "m9b5" },
      { steps: [2, 3, 7, 10], name: "Minor ninth", suffix: "m9" },
      { steps: [2, 3, 7, 11], name: "Minor ninth, major seventh", suffix: "m9(Maj7)" },
      { steps: [2, 3, 7, 9], name: "Minor sixth, added ninth", suffix: "m6/9" },
      { steps: [2, 4, 7, 11], name: "Major ninth", suffix: "Maj9" },
      { steps: [2, 4, 7, 9], name: "Sixth, added ninth", suffix: "6/9" },
      { steps: [4, 5, 7, 11], name: "Major eleventh (no ninth)", suffix: "Maj11" },
      { steps: [4, 6, 7, 10], name: "Seventh, sharp eleventh", suffix: "7#11" },
      { steps: [4, 6, 7, 11], name: "Major seventh, sharp eleventh", suffix: "Maj7#11" }
    ]
  ],
  [
    5,
    [
      { steps: [2, 4, 5, 7, 11], name: "Major eleventh", suffix: "Maj11" },
      { steps: [2, 4, 7, 9, 11], name: "Major thirteen", suffix: "Maj13" }
    ]
  ],
  [
    6,
    [
      { steps: [2, 3, 4, 6, 7, 10], name: "Minor thirteen", suffix: "m13" }
    ]
  ]
]);
function getChordType(notes) {
  if (!notes || notes.length === 0) {
    return { name: "No note" };
  }
  if (notes.length === 1) {
    return { name: "Single note" };
  }
  let steps = [];
  const lowest = notes[0].pitch;
  for (let index = 1; index < notes.length; index++) {
    steps.push(notes[index].pitch - lowest);
  }
  steps = steps.map((d) => d % 12);
  steps = [...new Set(steps)];
  steps = steps.filter((d) => d !== 0);
  if (steps.length === 0) {
    return { name: "Octave" };
  }
  steps.sort((a, b) => a - b);
  const candidates = chordTypes.get(steps.length);
  if (candidates) {
    for (const cand of candidates) {
      if (arrayShallowEquals(steps, cand.steps)) {
        return cand;
      }
    }
  }
  return { name: "Unknown chord type" };
}
function getChordName(notes) {
  const noteLetters = notes.sort((a, b) => a.pitch - b.pitch).map((d) => d.getLetter());
  const chords = import_tonal.Chord.detect(noteLetters);
  return chords;
}

// src/instruments/Lamellophone.js
var LamellophoneTuning = class {
  constructor(name, notes) {
    this.name = name;
    this.notes = notes;
    this.short = notes.join(" ");
    this.pitches = notes.map((note) => getMidiNoteByLabel(note).pitch);
    this.pitchesSorted = [...this.pitches].sort((a, b) => a - b);
    this.keyCount = notes.length;
  }
  getNumbers() {
    const pitches = this.pitchesSorted;
    const numbers = /* @__PURE__ */ new Map();
    for (const [index, pitch] of pitches.entries()) {
      let number = index + 1;
      let ending = "";
      let lowerOctave = pitch - 12;
      while (lowerOctave > 0 && numbers.has(lowerOctave)) {
        number = numbers.get(lowerOctave).number;
        ending += "\xB0";
        lowerOctave -= 12;
      }
      numbers.set(pitch, { number, numberString: `${number}${ending}` });
    }
    return [...numbers.values()].map((d) => d.numberString);
  }
  getLetters() {
    const pitches = this.pitchesSorted;
    const numbers = /* @__PURE__ */ new Map();
    for (const [index, pitch] of pitches.entries()) {
      let number = index + 1;
      let ending = "";
      let lowerOctave = pitch - 12;
      while (lowerOctave > 0 && numbers.has(lowerOctave)) {
        number = numbers.get(lowerOctave).number;
        ending += "\xB0";
        lowerOctave -= 12;
      }
      const letter = getMidiNoteByNr(pitch).name;
      numbers.set(pitch, { number, letterString: `${letter}${ending}` });
    }
    return [...numbers.values()].map((d) => d.letterString);
  }
};
var lamellophoneTunings = /* @__PURE__ */ new Map([
  ["Kalimba", /* @__PURE__ */ new Map([
    [
      "9 A Major",
      new LamellophoneTuning("9 A Major", ["A5", "C#6", "C#5", "A5", "A4", "F#5", "E5", "E6", "B5"])
    ],
    [
      "9 A Minor",
      new LamellophoneTuning("9 A Minor", ["A5", "C6", "C5", "A5", "A4", "F5", "E5", "E6", "B5"])
    ],
    [
      "9 A Minor 7",
      new LamellophoneTuning("9 A Minor 7", ["A5", "C6", "C5", "A5", "A4", "F#5", "E5", "E6", "B5"])
    ],
    [
      "9 A Ake Bono",
      new LamellophoneTuning("9 A Ake Bono", ["A5", "D6", "D5", "A5", "A4", "F5", "E5", "E6", "A#5"])
    ],
    [
      "9 A Hijaz",
      new LamellophoneTuning("9 A Hijaz", ["G5", "D6", "D5", "A5", "A4", "F#5", "D#5", "D#6", "A#5"])
    ],
    [
      "9 A Pygmy",
      new LamellophoneTuning("9 A Pygmy", ["G5", "C6", "C5", "G5", "G4", "D#5", "D5", "D#6", "A#5"])
    ],
    [
      "17 C Major",
      new LamellophoneTuning("17 C Major", ["D6", "B5", "G5", "E5", "C5", "A4", "F4", "D4", "C4", "E4", "G4", "B4", "D5", "F5", "A5", "C6", "E6"])
    ],
    [
      "21 C Major",
      new LamellophoneTuning("21 C Major", ["D6", "B5", "G5", "E5", "C5", "A4", "F4", "D4", "B3", "G3", "F3", "A3", "C4", "E4", "G4", "B4", "D5", "F5", "A5", "C6", "E6"])
    ]
  ])]
]);
function convertTabToNotes(tab, tuning, tempo = 120) {
  if (!tab || tab.length === 0) {
    return [];
  }
  const symbolToPitchMap = /* @__PURE__ */ new Map();
  const symbols = tuning.getLetters();
  for (let index = 0; index < tuning.keyCount; index++) {
    symbolToPitchMap.set(symbols[index], tuning.pitchesSorted[index]);
  }
  const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const noteNamesSet = new Set(noteNames);
  const lowestNote = tuning.pitchesSorted[0];
  const startOct = getMidiNoteByNr(lowestNote).octave;
  const secondsPerBeat = bpmToSecondsPerBeat(tempo);
  let insideChord = false;
  let insideNote = false;
  let currentTime = 0;
  let currentPitch = 0;
  let currentOctOffset = 0;
  const notes = [];
  tab = `${tab.toUpperCase().replaceAll("\n", " \n")} `;
  const finishNote = () => {
    try {
      notes.push(Note_default.from({
        pitch: currentPitch + 12 * (startOct + 1 + currentOctOffset),
        start: currentTime,
        end: currentTime + secondsPerBeat
      }));
      currentOctOffset = 0;
      if (!insideChord) {
        currentTime += secondsPerBeat;
      }
    } catch {
      console.log(currentPitch);
    }
    insideNote = false;
  };
  for (const char of tab) {
    if (char === "(") {
      if (insideChord) {
        insideChord = false;
      }
      if (insideNote) {
        finishNote();
      }
      insideChord = true;
    } else if (noteNamesSet.has(char)) {
      if (insideNote) {
        finishNote();
      }
      insideNote = true;
      currentPitch = noteNames.indexOf(char);
    } else if (char === "#") {
      currentPitch++;
    } else if (char === "\xB0") {
      currentOctOffset++;
    } else if (char === " " || char === "\n" || char === ")") {
      if (char === ")") {
        insideChord = false;
      }
      if (char === "\n") {
        insideChord = false;
        currentTime += secondsPerBeat;
      }
      if (insideNote) {
        finishNote();
      }
    }
  }
  return notes;
}
function convertNotesToTab(notes, tuning, mode = "letter", restSize = 0.1) {
  if (!notes || notes.length === 0) {
    return [];
  }
  const pitchToSymbolMap = /* @__PURE__ */ new Map();
  const symbols = mode === "letter" ? tuning.getLetters() : tuning.getNumbers();
  for (let index = 0; index < tuning.keyCount; index++) {
    pitchToSymbolMap.set(tuning.pitchesSorted[index], symbols[index]);
  }
  const chords = detectChordsByExactStart(notes);
  let tab = "";
  let previousEnd = 0;
  for (const chord of chords) {
    let chordString = chord.map((note) => {
      var _a;
      if (pitchToSymbolMap.has(note.pitch)) {
        return pitchToSymbolMap.get(note.pitch) || `[${note.pitch}]`;
      } else {
        return mode === "letter" ? ((_a = getMidiNoteByNr(note.pitch)) == null ? void 0 : _a.name) ?? note.pitch : note.pitch;
      }
    }).join(" ");
    if (chord.length > 1) {
      chordString = `(${chordString})`;
    }
    tab = chord[0].start - previousEnd > restSize ? `${tab}
${chordString}` : `${tab} ${chordString}`;
    previousEnd = (0, import_d37.max)(chord, (n) => n.end);
  }
  return tab.slice(1);
}
function convertNotesToHtmlTab(notes, tuning, mode = "letter", restSize = 0.1, colormap = () => "black") {
  if (!notes || notes.length === 0) {
    return [];
  }
  const pitchToSymbolMap = /* @__PURE__ */ new Map();
  const symbols = mode === "letter" ? tuning.getLetters() : tuning.getNumbers();
  for (let index = 0; index < tuning.keyCount; index++) {
    pitchToSymbolMap.set(tuning.pitches[index], symbols[index]);
  }
  const chords = detectChordsByExactStart(notes);
  let tab = "";
  let previousEnd = 0;
  for (const chord of chords) {
    let chordString = chord.map((note) => {
      var _a;
      let string;
      if (pitchToSymbolMap.has(note.pitch)) {
        string = pitchToSymbolMap.get(note.pitch) || `[${note.pitch}]`;
      } else {
        string = mode === "letter" ? ((_a = getMidiNoteByNr(note.pitch)) == null ? void 0 : _a.name) ?? note.pitch : note.pitch;
      }
      const color2 = colormap(note.pitch);
      return `<span class='note' style='background-color: ${color2}'>${string}</span>`;
    }).join("\n");
    if (chord.length > 1) {
      chordString = `<span class='chord'>${chordString}</span>`;
    }
    tab = chord[0].start - previousEnd > restSize ? `${tab}<br/>${chordString}` : `${tab}${chordString}`;
    previousEnd = (0, import_d37.max)(chord, (n) => n.end);
  }
  return tab;
}
function convertNumbersToLetters(numberTab, numberLetterMap) {
  if (!numberTab || numberTab.length === 0) {
    return "";
  }
  numberTab = numberTab.replaceAll("'", "\xB0");
  numberTab = numberTab.replaceAll("\u2019", "\xB0");
  numberTab = numberTab.replaceAll("*", "\xB0");
  numberTab = numberTab.replaceAll("\xBA", "\xB0");
  numberTab = numberTab.replaceAll("^", "\xB0");
  for (const [key, value] of numberLetterMap.entries()) {
    numberTab = numberTab.replaceAll(key, value);
  }
  return numberTab;
}
function bestTransposition(notes, tuning) {
  if (!notes || notes.length === 0) {
    return { transpose: 0, retune: /* @__PURE__ */ new Map() };
  }
  const occuringPitches = new Set(notes.map((n) => n.pitch));
  if (occuringPitches.size > tuning.keyCount) {
  }
  const notePitches = [...occuringPitches];
  if ((0, import_d37.difference)(notePitches, tuning.pitches).size === 0) {
    return { transpose: 0, retune: /* @__PURE__ */ new Map() };
  }
  const [minPitch, maxPitch] = (0, import_d37.extent)(notePitches);
  const transpose = (array, steps) => array.map((d) => d + steps);
  let bestSteps = 0;
  let bestTransposed;
  let commonPitches;
  for (let steps = -minPitch; steps <= 127 - maxPitch; steps++) {
    const transposed = transpose(notePitches, steps);
    const common = (0, import_d37.intersection)(transposed, tuning.pitches);
    if (!commonPitches || common.size > commonPitches.size) {
      bestSteps = steps;
      bestTransposed = transposed;
    }
  }
  bestTransposed = new Set(bestTransposed);
  const uncommon = (0, import_d37.difference)(bestTransposed, tuning.pitches);
  console.log(uncommon);
  const freePitches = /* @__PURE__ */ new Set();
  const neededPitches = [];
  for (const p of uncommon) {
    if (bestTransposed.has(p)) {
      neededPitches.push(p);
    } else {
      freePitches.add(p);
    }
  }
  console.log(neededPitches);
  console.log(freePitches);
  if (neededPitches.length === 0) {
    return {
      transpose: bestSteps,
      retune: /* @__PURE__ */ new Map()
    };
  }
  if (freePitches.size === 0) {
    return {
      transpose: bestSteps,
      retune: /* @__PURE__ */ new Map()
    };
  }
  const retune = /* @__PURE__ */ new Map();
  for (const neededPitch of neededPitches) {
    let bestMatch = null;
    const bestDiff = Number.POSITIVE_INFINITY;
    let freePitch;
    for (freePitch of freePitches) {
      const diff = Math.abs(neededPitch - freePitch);
      if (diff < bestDiff) {
        bestMatch = freePitch;
      }
    }
    freePitches.delete(bestMatch);
    retune.set(freePitch, neededPitch);
  }
  return {
    transpose: bestSteps,
    retune
  };
}

// src/instruments/Piano.js
var Piano_exports = {};
__export(Piano_exports, {
  pianoPitchRange: () => pianoPitchRange
});
var pianoPitchRange = /* @__PURE__ */ new Map([
  [72, { minPitch: 24, maxPitch: 95 }],
  [88, { minPitch: 21, maxPitch: 108 }],
  [128, { minPitch: 0, maxPitch: 127 }]
]);

// src/alignment/Alignment.js
var Alignment_exports = {};
__export(Alignment_exports, {
  alignNoteArrays: () => alignNoteArrays,
  alignNoteArrays2: () => alignNoteArrays2,
  alignNoteArrays3: () => alignNoteArrays3,
  alignmentBenchmark: () => alignmentBenchmark,
  testAlignment: () => testAlignment
});

// src/comparison/Matching.js
var Matching_exports = {};
__export(Matching_exports, {
  getMatchingError: () => getMatchingError,
  getMatchingSection: () => getMatchingSection,
  getMatchingSliceError: () => getMatchingSliceError,
  getMultiMatchingErrorPerNote: () => getMultiMatchingErrorPerNote,
  matchGtAndMultipleRecordings: () => matchGtAndMultipleRecordings,
  matchGtAndRecordingNotes: () => matchGtAndRecordingNotes
});
var import_d38 = __toESM(require_d3_node(), 1);

// src/utils/index.js
var utils_exports = {};
__export(utils_exports, {
  CIRCLE_OF_5THS: () => CIRCLE_OF_5THS,
  INTERVALS: () => INTERVALS,
  alignNotesToBpm: () => alignNotesToBpm,
  arrayContainsArray: () => arrayContainsArray,
  arrayHasSameElements: () => arrayHasSameElements,
  arrayIndexOf: () => arrayIndexOf,
  arrayShallowEquals: () => arrayShallowEquals,
  arraySlicesEqual: () => arraySlicesEqual,
  averageColor: () => averageColor,
  averageRecordings: () => averageRecordings,
  averageRecordings2: () => averageRecordings2,
  binarySearch: () => binarySearch,
  blobToBase64: () => blobToBase64,
  blobToFileExtension: () => blobToFileExtension,
  bpmToSecondsPerBeat: () => bpmToSecondsPerBeat,
  choose: () => choose,
  chordIntegerJaccardIndex: () => chordIntegerJaccardIndex,
  chordToInteger: () => chordToInteger,
  clipRecordingsPitchesToGtFretboardRange: () => clipRecordingsPitchesToGtFretboardRange,
  clipRecordingsPitchesToGtRange: () => clipRecordingsPitchesToGtRange,
  clipValue: () => clipValue,
  confidenceInterval: () => confidenceInterval,
  countOnesOfBinary: () => countOnesOfBinary,
  deepCloneFlatObjectMap: () => deepCloneFlatObjectMap,
  delay: () => delay,
  differenceMap: () => differenceMap,
  differenceMapErrorAreas: () => differenceMapErrorAreas,
  euclideanDistance: () => euclideanDistance,
  filterRecordingNoise: () => filterRecordingNoise,
  findLocalMaxima: () => findLocalMaxima,
  findNearest: () => findNearest,
  findRepeatedIndices: () => findRepeatedIndices,
  findStreaks: () => findStreaks,
  formatDate: () => formatDate,
  formatMatrix: () => formatMatrix,
  formatSongTitle: () => formatSongTitle,
  formatTime: () => formatTime,
  freqToApproxMidiNr: () => freqToApproxMidiNr,
  getArrayMax: () => getArrayMax,
  getBoxplotCharacteristics: () => getBoxplotCharacteristics,
  getColorLightness: () => getColorLightness,
  getObjectFromLocalStorage: () => getObjectFromLocalStorage,
  groupNotesByPitch: () => groupNotesByPitch,
  jaccardIndex: () => jaccardIndex,
  kendallTau: () => kendallTau,
  kernelDensityEstimator: () => kernelDensityEstimator,
  kernelEpanechnikov: () => kernelEpanechnikov,
  kernelGauss: () => kernelGauss,
  metronomeTrackFromMusicPiece: () => metronomeTrackFromMusicPiece,
  metronomeTrackFromTempoAndMeter: () => metronomeTrackFromTempoAndMeter,
  midiToFrequency: () => midiToFrequency,
  normalizeNdArray: () => normalizeNdArray,
  noteColorFromPitch: () => noteColorFromPitch,
  noteDurationToNoteType: () => noteDurationToNoteType,
  pearsonCorrelation: () => pearsonCorrelation,
  pingMidiDevice: () => pingMidiDevice,
  randFloat: () => randFloat,
  recordingsHeatmap: () => recordingsHeatmap,
  removeDuplicates: () => removeDuplicates,
  reverseString: () => reverseString,
  roundToNDecimals: () => roundToNDecimals,
  setOpacity: () => setOpacity,
  storeObjectInLocalStorage: () => storeObjectInLocalStorage,
  swapSoSmallerFirst: () => swapSoSmallerFirst
});

// src/utils/BlobUtils.js
function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
function blobToFileExtension(blob) {
  return blob.type.split("/")[1].split(";")[0];
}

// src/utils/ColorUtils.js
var d34 = __toESM(require_d3_node(), 1);
function getColorLightness(color2) {
  const { r, g, b } = d34.color(color2).rgb();
  const Y = r + r + r + b + g + g + g + g >> 3;
  return Y / 2.55;
}
function averageColor(colors) {
  let mR = 0;
  let mG = 0;
  let mB = 0;
  for (const c of colors) {
    const { r, g, b } = d34.color(c).rgb();
    mR += r;
    mG += g;
    mB += b;
  }
  mR = Math.round(mR / colors.length);
  mG = Math.round(mG / colors.length);
  mB = Math.round(mB / colors.length);
  return `rgb(${mR}, ${mG}, ${mB})`;
}
function setOpacity(color2, opacity = 1) {
  const { r, g, b } = d34.color(color2).rgb();
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// src/utils/FormattingUtils.js
function formatTime(seconds, includeMillis = true) {
  if (seconds === void 0 || seconds === null) {
    return includeMillis ? "--:--.---" : "--:--";
  }
  const s = Math.floor(seconds);
  let min3 = Math.floor(s / 60).toString();
  let sec = (s % 60).toString();
  min3 = min3.length < 2 ? `0${min3}` : min3;
  sec = sec.length < 2 ? `0${sec}` : sec;
  if (!includeMillis) {
    return `${min3}:${sec}`;
  }
  let ms = Math.round((seconds - s) * 1e3).toString();
  if (ms.length < 2) {
    ms = `00${ms}`;
  } else if (ms.length < 3) {
    ms = `0${ms}`;
  }
  return `${min3}:${sec}.${ms}`;
}
function formatDate(date, replaceT = false, keepMillis = true) {
  let string = date.toISOString().split(":").join("-");
  if (!keepMillis) {
    string = string.slice(0, string.indexOf("."));
  }
  if (replaceT) {
    string = string.replace("T", " ");
  }
  return string;
}
function formatSongTitle(title, maxLength = 30) {
  if (!title) {
    return "[No Song]";
  }
  if (title.lastIndexOf(".") !== -1) {
    title = title.slice(0, title.lastIndexOf("."));
  }
  if (title.length > maxLength) {
    title = `${title.slice(0, maxLength - 3)}...`;
  }
  return title;
}

// src/utils/LocalStorageUtils.js
function storeObjectInLocalStorage(key, object) {
  const string = JSON.stringify(object);
  localStorage.setItem(key, string);
}
function getObjectFromLocalStorage(key) {
  const string = localStorage.getItem(key);
  if (string === null) {
    return null;
  }
  try {
    return JSON.parse(string);
  } catch {
    return null;
  }
}

// src/utils/MiscUtils.js
var d35 = __toESM(require_d3_node(), 1);
function deepCloneFlatObjectMap(map) {
  const result = /* @__PURE__ */ new Map();
  for (const [key, value] of map.entries()) {
    result.set(key, __spreadValues({}, value));
  }
  return result;
}
function groupNotesByPitch(tracks) {
  const allNotes = tracks.flat();
  if (allNotes.length === 0) {
    return /* @__PURE__ */ new Map();
  }
  return d35.group(allNotes, (d) => d.pitch);
}
function reverseString(s) {
  return [...s].reverse().join("");
}
function findNearest(notes, targetNote) {
  if (!notes || notes.length === 0 || !targetNote) {
    return null;
  }
  let nearest = null;
  let dist = Number.POSITIVE_INFINITY;
  const targetStart = targetNote.start;
  for (const n of notes) {
    const newDist = Math.abs(n.start - targetStart);
    if (newDist < dist) {
      dist = newDist;
      nearest = n;
    }
  }
  return nearest;
}
function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1e3);
  });
}

// src/utils/NoteColorUtils.js
var d36 = __toESM(require_d3_node(), 1);
var noteColormap = [
  "#ff0000",
  "#ff4e00",
  "#db7b00",
  "#ffcc00",
  "#e4ed00",
  "#81d700",
  "#00ffb4",
  "#00ffea",
  "#00baff",
  "#3c00ff",
  "#a800ff",
  "#ff00fd"
].map((d) => {
  const c = d36.hsl(d);
  c.s = 0.5;
  return c.toString();
});
var noteColormapAccessible = [
  "#6699ff",
  "#66ffff",
  "#000000",
  "#647878",
  "#993366",
  "#ff0000",
  "#ffcc99",
  "#ffff01",
  "#ff9900",
  "#009900",
  "#66ff99",
  "#0000cc"
];
var colorInterpolator = d36.interpolateRgb("black", "steelblue");
var noteColormapGradientArray = Array.from({ length: 12 }).map((d, index) => colorInterpolator(index / 11));
function noteColorFromPitch(pitch, colormap = "default") {
  switch (colormap) {
    case "accessible":
      return noteColormapAccessible[pitch % 12];
    case "gradient":
      return noteColormapGradientArray[pitch % 12];
    default:
      return noteColormap[pitch % 12];
  }
}

// src/utils/RecordingsUtils.js
var d38 = __toESM(require_d3_node(), 1);

// src/utils/StatisticsUtils.js
var d37 = __toESM(require_d3_node(), 1);
function pearsonCorrelation(x, y) {
  if (!x || !y || !x.length || !y.length || x.length !== y.length) {
    throw new Error("Invalid data, must be two arrays with same length");
  }
  if (x.length < 2) {
    throw new Error("Invalid data, length must be >= 2");
  }
  let n = x.length;
  let nn = 0;
  for (let i = 0; i < n; i++, nn++) {
    if (!x[i] && x[i] !== 0 || !y[i] && y[i] !== 0) {
      nn--;
      continue;
    }
    x[nn] = x[i];
    y[nn] = y[i];
  }
  if (n !== nn) {
    x = x.splice(0, nn);
    y = y.splice(0, nn);
    n = nn;
  }
  const meanX = d37.mean(x);
  const meanY = d37.mean(y);
  const calc = (v, mean2) => Math.sqrt(v.reduce((s, a) => s + a * a, 0) - n * mean2 * mean2);
  return (x.map((e, i) => ({ x: e, y: y[i] })).reduce((v, a) => v + a.x * a.y, 0) - n * meanX * meanY) / (calc(x, meanX) * calc(y, meanY));
}
function confidenceInterval(values) {
  const n = values.length;
  const m = d37.mean(values);
  const s = d37.deviation(values);
  const z = 1.96;
  const part = z * (s / Math.sqrt(n));
  const low = m - part;
  const high = m + part;
  return { mean: m, low, high };
}
function getBoxplotCharacteristics(values) {
  values.sort((a, b) => a - b);
  const minValue = values[0];
  const maxValue = values[values.length - 1];
  const q1 = d37.quantile(values, 0.25);
  const q2 = d37.quantile(values, 0.5);
  const q3 = d37.quantile(values, 0.75);
  const iqr = q3 - q1;
  const r0 = Math.max(minValue, q1 - iqr * 1.5);
  const r1 = Math.min(maxValue, q3 + iqr * 1.5);
  return { q1, q2, q3, r0, r1 };
}
function kernelDensityEstimator(kernel, X) {
  const estimator = (V) => {
    return X.map((x) => [
      x,
      d37.mean(V, (v) => kernel(x - v))
    ]);
  };
  return estimator;
}
function kernelEpanechnikov(k) {
  const epKernel = (v) => Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  return epKernel;
}
function kernelGauss(k) {
  const gaKernel = (v) => Math.abs(v / k) <= 1 ? 1 / Math.sqrt(2 * Math.PI) * Math.E ** (-1 / 2 * v * v) : 0;
  return gaKernel;
}

// src/utils/RecordingsUtils.js
function filterRecordingNoise(recording, velocityThreshold = 0, durationThreshold = 0) {
  const result = recording.clone().filter((note) => {
    if (note.velocity < velocityThreshold) {
      return false;
    }
    if (note.getDuration() < durationThreshold) {
      return false;
    }
    return true;
  });
  return result;
}
function clipRecordingsPitchesToGtRange(recordings, groundTruth) {
  const pitchRanges = /* @__PURE__ */ new Map();
  for (const [index, part] of groundTruth.entries()) {
    const pitchExtent = d38.extent(part, (d) => d.pitch);
    pitchRanges.set(index, pitchExtent);
  }
  return recordings.map((recording) => {
    const track = recording.selectedTrack;
    const [minPitch, maxPitch] = pitchRanges.get(track);
    return recording.clone().filter((note) => note.pitch >= minPitch && note.pitch <= maxPitch);
  });
}
function clipRecordingsPitchesToGtFretboardRange(recordings, groundTruth, mode = "exact") {
  if (mode === "exact") {
    const occuringPositions = /* @__PURE__ */ new Map();
    for (const [index, part] of groundTruth.entries()) {
      const positions = new Set(part.map((note) => `${note.string} ${note.fret}`));
      occuringPositions.set(index, positions);
    }
    return recordings.map((recording) => {
      const track = recording.selectedTrack;
      const validPositions = occuringPositions.get(track);
      return recording.clone().filter((note) => validPositions.has(`${note.string} ${note.fret}`));
    });
  } else {
    const positionRanges = /* @__PURE__ */ new Map();
    for (const [index, part] of groundTruth.entries()) {
      const stringExtent = d38.extent(part, (d) => d.string);
      const fretExtent = d38.extent(part, (d) => d.fret);
      positionRanges.set(index, { stringExtent, fretExtent });
    }
    return recordings.map((recording) => {
      const track = recording.selectedTrack;
      const { stringExtent, fretExtent } = positionRanges.get(track);
      const [minString, maxString] = stringExtent;
      const [minFret, maxFret] = fretExtent;
      return recording.clone().filter((note) => {
        return note.string >= minString && note.string <= maxString && note.fret >= minFret && note.fret <= maxFret;
      });
    });
  }
}
function alignNotesToBpm(notes, bpm, timeDivision = 16) {
  const secondsPerBeat = bpmToSecondsPerBeat(bpm);
  const secondsPerDivision = secondsPerBeat / timeDivision;
  return notes.map((note) => {
    const n = note.clone();
    n.start = Math.round(n.start / secondsPerDivision) * secondsPerDivision;
    n.end = Math.round(n.end / secondsPerDivision) * secondsPerDivision;
    return n;
  });
}
function recordingsHeatmap(recNotes, nRecs, binSize = 10, attribute = "pitch") {
  let groupedByAttribute;
  if (attribute === "pitch") {
    groupedByAttribute = d38.group(recNotes, (d) => d.pitch);
  } else if (attribute === "channel") {
    groupedByAttribute = d38.group(recNotes, (d) => d.channel);
  } else {
    console.warn(`Invalid attribute parameter '${attribute}'`);
  }
  const heatmapByAttribute = /* @__PURE__ */ new Map();
  for (const [attribute_, notes] of groupedByAttribute.entries()) {
    const maxTime = d38.max(notes, (d) => d.end);
    const nBins = Math.ceil(maxTime * 1e3 / binSize) + 1;
    const heatmap = Array.from({ length: nBins }).fill(0);
    for (const note of notes) {
      const start = Math.round(note.start * 1e3 / binSize);
      const end = Math.round(note.end * 1e3 / binSize);
      for (let bin = start; bin <= end; bin++) {
        heatmap[bin] += 1;
      }
    }
    for (let bin = 0; bin < heatmap.length; bin++) {
      heatmap[bin] /= nRecs;
    }
    heatmapByAttribute.set(attribute_, heatmap);
  }
  return heatmapByAttribute;
}
function averageRecordings(heatmapByPitch, binSize, threshold = 0.8) {
  const newNotes = [];
  for (const [pitch, heatmap] of heatmapByPitch.entries()) {
    for (let bin = 0; bin < heatmap.length; bin++) {
      heatmap[bin] = heatmap[bin] > threshold;
    }
    let currentNote = null;
    for (let bin = 0; bin < heatmap.length; bin++) {
      if (!currentNote && heatmap[bin]) {
        const time = bin * binSize / 1e3;
        currentNote = new Note_default(pitch, time, 127, 0);
      }
      if (currentNote && (!heatmap[bin] || bin === heatmap.length - 1)) {
        const time = bin * binSize / 1e3;
        currentNote.end = time;
        newNotes.push(currentNote);
        currentNote = null;
      }
    }
  }
  newNotes.sort((a, b) => a.start - b.start);
  return newNotes;
}
function averageRecordings2(recNotes, bandwidth = 0.01, ticksPerSecond, threshold) {
  const groupedByPitch = d38.group(recNotes, (d) => d.pitch);
  const newNotes = [];
  for (const [pitch, notes] of groupedByPitch.entries()) {
    const starts = notes.map((d) => d.start);
    const ends = notes.map((d) => d.end);
    const duration = d38.max(ends);
    const ticks = Math.ceil(ticksPerSecond * duration);
    const x = d38.scaleLinear().domain([0, duration]).range([0, duration]);
    const kde = kernelDensityEstimator(kernelEpanechnikov(bandwidth), x.ticks(ticks));
    const estimateStarts = kde(starts);
    const estimateEnds = kde(ends);
    const maximaStarts = findLocalMaxima(estimateStarts.map((d) => d[1]));
    const maximaEnds = findLocalMaxima(estimateEnds.map((d) => d[1]));
    const chosenStarts = maximaStarts.filter((d) => estimateStarts[d][1] > threshold).map((d) => estimateStarts[d][0]);
    const chosenEnds = maximaEnds.filter((d) => estimateEnds[d][1] > threshold).map((d) => estimateEnds[d][0]);
    while (chosenStarts.length > 0) {
      const nextStart = chosenStarts.shift();
      while (chosenEnds.length > 0 && chosenEnds[0] < nextStart) {
        chosenEnds.shift();
      }
      const nextEnd = chosenEnds.shift();
      while (chosenStarts.length > 0 && chosenStarts[0] < nextEnd) {
        chosenStarts.shift();
      }
      newNotes.push(new Note_default(pitch, nextStart, 127, 0, nextEnd));
    }
  }
  newNotes.sort((a, b) => a.start - b.start);
  return newNotes;
}
function differenceMap(gtNotes, recNotes, binSize) {
  const recHeatmap = recordingsHeatmap(recNotes, 1, binSize);
  const gtHeatmap = recordingsHeatmap(gtNotes, 1, binSize);
  const allPitches = [.../* @__PURE__ */ new Set([
    ...recHeatmap.keys(),
    ...gtHeatmap.keys()
  ])];
  const resultMap = /* @__PURE__ */ new Map();
  for (const pitch of allPitches) {
    let result;
    if (!recHeatmap.has(pitch)) {
      result = gtHeatmap.get(pitch).map((d) => d !== 0 ? 1 : 0);
    } else if (!gtHeatmap.has(pitch)) {
      result = recHeatmap.get(pitch).map((d) => d !== 0 ? 2 : 0);
    } else {
      const recH = recHeatmap.get(pitch);
      const gtH = gtHeatmap.get(pitch);
      const nBins = Math.max(recH.length, gtH.length);
      result = Array.from({ length: nBins }).fill(0);
      for (let index = 0; index < result.length; index++) {
        const gtValue = gtH[index] || 0;
        const recValue = recH[index] || 0;
        if (gtValue === 0 && recValue === 0) {
          result[index] = 0;
        }
        if (gtValue !== 0 && recValue === 0) {
          result[index] = 1;
        }
        if (gtValue === 0 && recValue !== 0) {
          result[index] = 2;
        }
        if (gtValue !== 0 && recValue !== 0) {
          result[index] = 3;
        }
      }
    }
    resultMap.set(pitch, result);
  }
  return resultMap;
}
function differenceMapErrorAreas(differenceMap2) {
  let missingBins = 0;
  let additionalBins = 0;
  let correctBins = 0;
  for (const diffMap of differenceMap2.values()) {
    for (const bin of diffMap) {
      if (bin === 1) {
        missingBins++;
      } else if (bin === 2) {
        additionalBins++;
      } else if (bin === 3) {
        correctBins++;
      }
    }
  }
  const maxLength = d38.max([...differenceMap2], (d) => d[1].length);
  const totalArea = differenceMap2.size * maxLength;
  return {
    missing: missingBins / totalArea,
    additional: additionalBins / totalArea,
    correct: correctBins / totalArea
  };
}

// src/utils/WebMidiUtils.js
function pingMidiDevice(deviceName, howOften = 1) {
  if (!navigator.requestMIDIAccess) {
    console.error("MIDI: WebMIDI is not supported in this browser.");
  } else {
    let sentCount = 0;
    let sentTime;
    let totalTime = 0;
    const receiveFunction = () => {
      const ping = Date.now() - sentTime;
      totalTime += ping;
      const avg = totalTime / sentCount;
      console.log(`Received MIDI from ${deviceName} after ${ping} ms (avg: ${avg})`);
    };
    navigator.requestMIDIAccess().then((midiAccess) => {
      for (const input of midiAccess.inputs.values()) {
        if (deviceName === input.name) {
          input.onmidimessage = receiveFunction;
        }
      }
      let outputDevice = null;
      for (const output of midiAccess.outputs.values()) {
        if (deviceName === output.name) {
          outputDevice = output;
        }
      }
      if (!outputDevice) {
        console.error(`Cannot ping output device ${deviceName} because it is not there`);
      }
      const pingFunction = () => {
        if (sentCount < howOften) {
          sentCount++;
          console.log(`Ping ${sentCount}/${howOften} Sending MIDI ping to ${deviceName}`);
          sentTime = new Date();
          outputDevice.send([144, 69, 127]);
          setTimeout(pingFunction, 1e3);
        }
      };
      setTimeout(pingFunction, 1e3);
    }, () => console.error("Cannot get MIDI access"));
  }
}

// src/comparison/Matching.js
function matchGtAndRecordingNotes(recNotes, gtNotes) {
  const groupedByPitch = (0, import_d38.group)(gtNotes, (d) => d.pitch);
  const groupedByPitchRec = (0, import_d38.group)(recNotes, (d) => d.pitch);
  const result = /* @__PURE__ */ new Map();
  for (const [pitch, gtNotes2] of groupedByPitch.entries()) {
    const gtRecMap = /* @__PURE__ */ new Map();
    const additionalNotes = [];
    const missingNotes = [];
    for (const n of gtNotes2) {
      gtRecMap.set(n.start, null);
    }
    if (!groupedByPitchRec.has(pitch)) {
      result.set(pitch, {
        gtRecMap: /* @__PURE__ */ new Map(),
        additionalNotes: [],
        missingNotes: gtNotes2,
        gtNotes: gtNotes2
      });
      continue;
    }
    const recNotes2 = groupedByPitchRec.get(pitch);
    for (const r of recNotes2) {
      const nearest = findNearest(gtNotes2, r);
      const currentEntry = gtRecMap.get(nearest.start);
      if (currentEntry === null) {
        gtRecMap.set(nearest.start, r);
      } else {
        if (Math.abs(nearest.start - r.start) < Math.abs(currentEntry.start - r.start)) {
          gtRecMap.set(nearest.start, r);
          additionalNotes.push(currentEntry);
        } else {
          additionalNotes.push(r);
        }
      }
    }
    for (const n of gtNotes2) {
      if (gtRecMap.get(n.start) === null) {
        missingNotes.push(n);
      }
    }
    result.set(pitch, {
      gtRecMap,
      additionalNotes,
      missingNotes,
      gtNotes: gtNotes2
    });
  }
  for (const [pitch, recNotes2] of groupedByPitchRec.entries()) {
    if (!groupedByPitch.has(pitch)) {
      result.set(pitch, {
        gtRecMap: /* @__PURE__ */ new Map(),
        additionalNotes: recNotes2,
        missingNotes: [],
        gtNotes: []
      });
    }
  }
  return result;
}
function matchGtAndMultipleRecordings(recordings, gtNotes) {
  const allRecNotes = recordings.flatMap((d) => d.notes);
  const groupedByPitch = (0, import_d38.group)(gtNotes, (d) => d.pitch);
  const groupedByPitchRec = (0, import_d38.group)(allRecNotes, (d) => d.pitch);
  const result = /* @__PURE__ */ new Map();
  for (const [pitch, gtNotes2] of groupedByPitch.entries()) {
    const gtRecMap = /* @__PURE__ */ new Map();
    for (const n of gtNotes2) {
      gtRecMap.set(n.start, []);
    }
    if (!groupedByPitchRec.has(pitch)) {
      result.set(pitch, /* @__PURE__ */ new Map());
      continue;
    }
    const recNotes = groupedByPitchRec.get(pitch);
    for (const r of recNotes) {
      const nearest = findNearest(gtNotes2, r);
      const currentEntry = gtRecMap.get(nearest.start);
      currentEntry.push(r);
      gtRecMap.set(nearest.start, currentEntry);
    }
    result.set(pitch, gtRecMap);
  }
  return result;
}
function getMultiMatchingErrorPerNote(multiMatching, errorThreshold = 3) {
  const result = /* @__PURE__ */ new Map();
  for (const [pitch, gtRecMap] of multiMatching.entries()) {
    const gtErrorMap = /* @__PURE__ */ new Map();
    let maxError = 0;
    for (const [gtStart, matchedRecNotes] of gtRecMap.entries()) {
      let error = 0;
      if (matchedRecNotes.length > 0) {
        for (const note of matchedRecNotes) {
          const error_ = Math.abs(note.start - gtStart);
          if (error_ <= errorThreshold) {
            error += error_;
          }
        }
        error /= matchedRecNotes.length;
        if (error > maxError) {
          maxError = error;
        }
      }
      gtErrorMap.set(gtStart, error);
    }
    result.set(pitch, {
      gtErrorMap,
      maxError
    });
  }
  return result;
}
function getMatchingError(matching, addPenalty, missPenalty, timingPenalty, timeThreshold = 0) {
  const result = {
    total: 0,
    totalAdd: 0,
    totalMiss: 0,
    totalCorrect: 0,
    totalTime: 0,
    totalNumberOfGtNotes: 0,
    perPitch: /* @__PURE__ */ new Map()
  };
  for (const [pitch, m] of matching.entries()) {
    const { gtRecMap, additionalNotes, missingNotes, gtNotes } = m;
    const addError = additionalNotes.length * addPenalty;
    const missError = missingNotes.length * missPenalty;
    let correct = 0;
    let timeError = 0;
    for (const [gtStart, matchedRecNote] of gtRecMap.entries()) {
      if (matchedRecNote !== null) {
        correct++;
        const error = Math.abs(matchedRecNote.start - gtStart);
        if (error > timeThreshold) {
          timeError += error;
        }
      }
    }
    const total = addError + missError + timeError * timingPenalty;
    result.perPitch.set(pitch, {
      total,
      addError,
      missError,
      correct,
      timeError,
      numberOfGtNotes: gtNotes.length
    });
    result.totalAdd += addError;
    result.totalMiss += missError;
    result.totalCorrect += correct;
    result.totalTime += timeError;
    result.total += total;
    result.totalNumberOfGtNotes += gtNotes.length;
  }
  return result;
}
function getMatchingSection(matching, start, end) {
  const result = /* @__PURE__ */ new Map();
  for (const [pitch, m] of matching.entries()) {
    const { gtRecMap, additionalNotes, missingNotes, gtNotes } = m;
    const newGtRecMap = /* @__PURE__ */ new Map();
    for (const [gtStart, matchedRecNote] of gtRecMap.entries()) {
      if (matchedRecNote !== null && gtStart >= start && gtStart < end) {
        newGtRecMap.set(gtStart, matchedRecNote);
      }
    }
    result.set(pitch, {
      gtRecMap: newGtRecMap,
      additionalNotes: additionalNotes.filter((d) => d.start >= start && d.start < end),
      missingNotes: missingNotes.filter((d) => d.start >= start && d.start < end),
      gtNotes
    });
  }
  return result;
}
function getMatchingSliceError(matching, start, end, addPenalty, missPenalty, timingPenalty) {
  const section = getMatchingSection(matching, start, end);
  const error = getMatchingError(section, addPenalty, missPenalty, timingPenalty);
  return error;
}

// src/alignment/Alignment.js
var import_d39 = __toESM(require_d3_node(), 1);
function alignNoteArrays(gt, rec) {
  rec = rec.clone();
  const f = alignmentForce(gt.getNotes(), rec.getNotes());
  rec = rec.shiftTime(f);
  return {
    aligned: rec,
    timeDifference: f
  };
}
function alignNoteArrays2(gt, rec) {
  let timeDifference = 0;
  let tries = 0;
  rec = rec.clone();
  while (tries < 25) {
    const matching = matchGtAndRecordingNotes(rec.getNotes(), gt.getNotes());
    let timeDiff = 0;
    let count = 0;
    for (const m of matching.values()) {
      const { gtRecMap } = m;
      for (const [gtStart, matchedRecNote] of gtRecMap.entries()) {
        if (matchedRecNote !== null) {
          count++;
          timeDiff += gtStart - matchedRecNote.start;
        }
      }
    }
    timeDiff /= count;
    rec.shiftTime(timeDiff);
    timeDifference += timeDiff;
    if (Math.abs(timeDiff) < 5e-4) {
      break;
    }
    tries++;
  }
  return {
    aligned: rec,
    timeDifference
  };
}
function alignNoteArrays3(gt, rec) {
  let timeDifference = 0;
  let tries = 0;
  rec = rec.clone();
  while (tries < 25) {
    const matching = matchGtAndRecordingNotes(rec.getNotes(), gt.getNotes());
    const timeDiffs = [];
    for (const m of matching.values()) {
      for (const [gtStart, matchedRecNote] of m.gtRecMap.entries()) {
        if (matchedRecNote !== null) {
          timeDiffs.push(gtStart - matchedRecNote.start);
        }
      }
    }
    const shift = (0, import_d39.median)(timeDiffs);
    rec.shiftTime(shift);
    timeDifference += shift;
    if (Math.abs(shift) < 1e-4) {
      break;
    }
    tries++;
  }
  return {
    aligned: rec,
    timeDifference
  };
}
function alignmentForce(a, b) {
  let difference2 = 0;
  let count = 0;
  for (const noteA of a) {
    let distance = Number.POSITIVE_INFINITY;
    let diff = Number.POSITIVE_INFINITY;
    for (const noteB of b) {
      if (noteA.pitch === noteB.pitch) {
        const dist = Math.abs(noteA.start - noteB.start);
        if (dist < distance) {
          distance = dist;
          diff = noteA.start - noteB.start;
        }
      }
    }
    if (distance < Number.POSITIVE_INFINITY) {
      difference2 += diff;
      count++;
    }
  }
  return difference2 / count;
}
function testAlignment() {
  const test = (a2, b2, title) => {
    console.log(title);
    console.log(b2.getNotes().map((n) => n.start));
    const aligned = alignNoteArrays(a2, b2);
    console.log(aligned.getNotes().map((n) => n.start));
  };
  const a = new NoteArray_default([
    new Note_default(69, 0, 127, 0, 1),
    new Note_default(70, 1, 127, 0, 2),
    new Note_default(71, 2, 127, 0, 3)
  ]);
  console.log(a.getNotes().map((n) => n.start));
  let b;
  b = a.clone().shiftTime(2);
  test(a, b, "shifted by 2");
  b = a.clone().shiftTime(-2);
  test(a, b, "shifted by -2");
  b = a.clone().shiftTime(3).addNotes([new Note_default(72, 2, 127, 0, 3)]);
  test(a, b, "shifted by 3, added note");
  b = a.clone().repeat(2);
  test(a, b, "repeated");
  b = a.clone().repeat(2).shiftTime(3);
  test(a, b, "repeated, shifted by 3");
}
function alignmentBenchmark() {
  const seed = 0.44871573888282423;
  const rand127 = import_d39.randomInt.source((0, import_d39.randomLcg)(seed))(0, 127);
  const maxTime = 500;
  const randTime = import_d39.randomUniform.source((0, import_d39.randomLcg)(seed))(0, maxTime);
  const randDuration = import_d39.randomUniform.source((0, import_d39.randomLcg)(seed))(1 / 64, 2);
  const randomNotes = Array.from({ length: 200 }).fill(0).map(() => {
    const start = randTime();
    return new Note_default(rand127(), start, 127, 0, start + randDuration());
  });
  const notes = new NoteArray_default(randomNotes).sortByTime();
  console.log("true notes", notes.getNotes());
  const shift = 3;
  const shifted = notes.clone().shiftTime(shift);
  console.log("shifted", shifted);
  const deviation2 = 0.1;
  const pAdd = 0.1;
  const pRemove = 0.1;
  let variation = generateDrumVariation(shifted.getNotes(), deviation2, pAdd, pRemove);
  variation = new NoteArray_default(variation);
  console.log("variation", variation);
  const funcs = [alignNoteArrays, alignNoteArrays2, alignNoteArrays3];
  console.log(`True time shift: ${shift} seconds`);
  console.log("Only shifted");
  for (const f of funcs) {
    const { timeDifference } = f(notes, shifted);
    const error = Math.abs(timeDifference - -shift);
    console.log(`${f.name}
shift: ${timeDifference.toFixed(3)} 
Error ${error.toFixed(3)}`);
  }
  console.log("Shifted & variation");
  for (const f of funcs) {
    const { timeDifference } = f(notes, variation);
    const error = Math.abs(timeDifference - -shift);
    console.log(`${f.name}
shift: ${timeDifference.toFixed(3)} 
Error ${error.toFixed(3)}`);
  }
}

// src/alignment/DiffAlignment.js
var DiffAlignment_exports = {};
__export(DiffAlignment_exports, {
  activationMap: () => activationMap,
  agreement: () => agreement,
  alignGtAndRecToMinimizeDiffError: () => alignGtAndRecToMinimizeDiffError,
  alignRecordingSectionsToBestFit: () => alignRecordingSectionsToBestFit,
  alignRecordingToBestFit: () => alignRecordingToBestFit
});
var import_d310 = __toESM(require_d3_node(), 1);
function alignRecordingToBestFit(gtNotes, recording, binSize = 100) {
  const recNotes = recording.getNotes();
  const bestFit = alignGtAndRecToMinimizeDiffError(gtNotes, recNotes, binSize)[0];
  const newRec = recording.clone().shiftToStartAt(bestFit.offsetMilliseconds / 1e3);
  return newRec;
}
function alignRecordingSectionsToBestFit(gtNotes, recording, binSize, gapDuration = 3, gapMode = "start-start") {
  const sections = Recording_default.segmentAtGaps(gapDuration, gapMode);
  const alignedSections = sections.map((section) => {
    const bestFit = alignGtAndRecToMinimizeDiffError(gtNotes, section, binSize)[0];
    return bestFit;
  });
  const newRec = recording.clone();
  newRec.setNotes(alignedSections.flat());
  return newRec;
}
function alignGtAndRecToMinimizeDiffError(gtNotes, recNotes, binSize) {
  gtNotes = new NoteArray_default(gtNotes);
  recNotes = new NoteArray_default(recNotes).shiftToStartAt(0);
  const gtDuration = gtNotes.getDuration();
  const recDuration = recNotes.getDuration();
  const nBins = Math.ceil(gtDuration * 1e3 / binSize) + 1;
  const nRecBins = Math.ceil(recDuration * 1e3 / binSize) + 1;
  if (nRecBins > nBins) {
    console.warn("Cannot compare GT and rec if rec is longer");
  }
  const gtActivation = activationMap(gtNotes.getNotes(), binSize);
  const recActivation = activationMap(recNotes.getNotes(), binSize);
  const agreementsPerOffset = [];
  for (let offset = 0; offset < nBins - nRecBins + 1; offset++) {
    const currentAgreement = agreement(gtActivation, recActivation, offset);
    agreementsPerOffset.push({
      offsetBins: offset,
      offsetMilliseconds: offset * binSize,
      agreement: currentAgreement
    });
  }
  const sorted = agreementsPerOffset.sort((a, b) => b.agreement - a.agreement);
  return sorted;
}
function activationMap(allNotes, binSize = 100) {
  const activationMap2 = /* @__PURE__ */ new Map();
  for (const [pitch, notes] of (0, import_d310.group)(allNotes, (d) => d.pitch).entries()) {
    const maxTime = (0, import_d310.max)(notes, (d) => d.end);
    const nBins = Math.ceil(maxTime * 1e3 / binSize) + 1;
    const pitchActivationMap = Array.from({ length: nBins }).fill(0);
    for (const note of notes) {
      const start = Math.round(note.start * 1e3 / binSize);
      const end = Math.round(note.end * 1e3 / binSize);
      for (let bin = start; bin <= end; bin++) {
        pitchActivationMap[bin] = 1;
      }
    }
    activationMap2.set(pitch, pitchActivationMap);
  }
  return activationMap2;
}
function agreement(gtActivations, recActivations, offset) {
  const allPitches = [.../* @__PURE__ */ new Set([
    ...gtActivations.keys(),
    ...recActivations.keys()
  ])];
  let agreement2 = 0;
  for (const pitch of allPitches) {
    if (!gtActivations.has(pitch)) {
    } else if (!recActivations.has(pitch)) {
    } else {
      const gtA = gtActivations.get(pitch);
      const recA = recActivations.get(pitch);
      for (let index = 0; index < recA.length; index++) {
        const gtValue = gtA[index + offset] || 0;
        const recValue = recA[index] || 0;
        if (gtValue === 1 && recValue === 1) {
          agreement2++;
        }
      }
    }
  }
  return agreement2;
}

// src/comparison/PriorityMatching.js
var PriorityMatching_exports = {};
__export(PriorityMatching_exports, {
  balancedNoteDistance: () => balancedNoteDistance,
  errorFromPriorityMatching: () => errorFromPriorityMatching,
  getMatrixMinPosition: () => getMatrixMinPosition,
  priorityMatching: () => priorityMatching
});
var import_d311 = __toESM(require_d3_node(), 1);
function priorityMatching(itemsA, itemsB, distanceFunction) {
  const matrix = Array.from({ length: itemsA.length }).map(() => Array.from({ length: itemsB.length }));
  for (const [indexA, gtNote] of itemsA.entries()) {
    for (let indexB = indexA; indexB < itemsB.length; indexB++) {
      const dist = distanceFunction(gtNote, itemsB[indexB]);
      matrix[indexA][indexB] = dist;
      if (matrix[indexB] !== void 0) {
        matrix[indexB][indexA] = dist;
      }
    }
  }
  const matching = /* @__PURE__ */ new Map();
  const numberOfMatches = Math.min(itemsA.length, itemsB.length);
  for (let match = 0; match < numberOfMatches; match++) {
    const [a, b] = getMatrixMinPosition(matrix);
    matching.set(a, b);
    if (match >= numberOfMatches - 1) {
      break;
    }
    for (let index = 0; index < itemsA.length; index++) {
      matrix[index][b] = null;
    }
    for (let index = 0; index < itemsB.length; index++) {
      matrix[a][index] = null;
    }
  }
  return matching;
}
function errorFromPriorityMatching(gtNotes, recNotes, distanceFunction) {
  const matching = priorityMatching(gtNotes, recNotes, distanceFunction);
  const errors = /* @__PURE__ */ new Map();
  for (const [gt, rec] of matching.entries()) {
    const gtNote = gtNotes[gt];
    const recNote = recNotes[rec];
    const error = distanceFunction(gtNote, recNote);
    errors.set(gtNote, error);
  }
  return errors;
}
function balancedNoteDistance(a, b) {
  let dist = 0;
  dist += Math.abs(a.pitch - b.pitch);
  dist += Math.abs(a.pitch % 12 - b.pitch % 12);
  dist += Math.abs(a.start - b.start);
  dist += 0.5 * Math.abs(a.getDuration() - b.getDuration());
  dist += Math.abs(a.channel - b.channel);
  return dist;
}
function getMatrixMinPosition(matrix) {
  const minPerRow = matrix.map((row) => {
    const minInd = (0, import_d311.minIndex)(row);
    return [
      minInd,
      row[minInd]
    ];
  });
  const minRowIndex = (0, import_d311.minIndex)(minPerRow, (d) => d[1]);
  const minColIndex = minPerRow[minRowIndex][0];
  return [minRowIndex, minColIndex];
}

// src/comparison/Similarity.js
var Similarity_exports = {};
__export(Similarity_exports, {
  discretizeTime: () => discretizeTime,
  getSimilarParts: () => getSimilarParts,
  getTrackSimilarity: () => getTrackSimilarity
});
var import_d312 = __toESM(require_d3_node(), 1);
function getSimilarParts(track, selectedInterval, stride, threshold, secondsPerBin = 1 / 16, distance = "euclidean") {
  console.log(`Searching for similar parts based on selection, using ${distance}`);
  if (track === void 0 || track.length === 0) {
    console.warn("No or empty track given");
    return;
  }
  const minTime = (0, import_d312.min)(track, (d) => d.start);
  const maxTime = (0, import_d312.max)(track, (d) => d.end);
  const binCount = Math.ceil((maxTime - minTime) / secondsPerBin);
  const discrTrack = discretizeTime(track, secondsPerBin);
  const startBin = Math.floor((selectedInterval[0] - minTime) / secondsPerBin);
  const endBin = Math.ceil((selectedInterval[1] - minTime) / secondsPerBin);
  const selection = sliceDiscretizedTrack(discrTrack, startBin, endBin);
  const selectionSize = endBin - startBin;
  const similarParts = [];
  for (let pos = 0; pos < binCount - selectionSize; pos += stride) {
    const pos2 = pos + selectionSize;
    if (!(pos >= startBin && pos <= endBin) && !(pos2 >= startBin && pos2 <= endBin)) {
      const part = sliceDiscretizedTrack(discrTrack, pos, pos2);
      const dist = getTrackSimilarity(selection, part, distance);
      if (dist <= threshold) {
        similarParts.push({
          startBin: pos,
          endBin: pos2,
          startTime: minTime + pos * secondsPerBin,
          endTime: minTime + pos2 * secondsPerBin,
          dist
        });
      }
    }
  }
  return {
    selection: {
      startBin,
      endBin,
      startTime: minTime + startBin * secondsPerBin,
      endTime: minTime + endBin * secondsPerBin
    },
    similarParts
  };
}
function getTrackSimilarity(discrA, discrB, distance) {
  const common = [];
  for (const key of discrA.keys()) {
    if (discrB.has(key)) {
      common.push(key);
    }
  }
  let totalDist = 0;
  for (const pitch of common) {
    const binsA = discrA.get(pitch);
    const binsB = discrB.get(pitch);
    let dist;
    if (distance === "dtw") {
    } else if (distance === "euclidean") {
      dist = euclideanDistanceSquared(binsA, binsB);
    } else if (distance === "nearest") {
      dist = neirestNeighborDistance(binsA, binsB);
    }
    const weight = 1;
    totalDist += weight * dist;
  }
  let penaltyWeight = 0;
  for (const discr of [discrA, discrB]) {
    for (const key of discr.keys()) {
      if (!common.includes(key)) {
        penaltyWeight += countActiveNoteBins(discr.get(key));
      }
    }
  }
  return totalDist + penaltyWeight;
}
function discretizeTime(track, secondsPerBin) {
  const minTime = (0, import_d312.min)(track, (d) => d.start);
  const maxTime = (0, import_d312.max)(track, (d) => d.end);
  const binCount = Math.ceil((maxTime - minTime) / secondsPerBin);
  const result = /* @__PURE__ */ new Map();
  for (const note of track) {
    const startBin = Math.round((note.start - minTime) / secondsPerBin);
    const endBin = Math.round((note.end - minTime) / secondsPerBin);
    const pitch = note.pitch;
    const binArray = result.has(pitch) ? result.get(pitch) : Array.from({ length: binCount }).fill(0);
    for (let bin = startBin; bin <= endBin; bin++) {
      binArray[bin] = 1;
    }
    result.set(pitch, binArray);
  }
  return result;
}
function countActiveNoteBins(binArray) {
  let count = 0;
  for (const bin of binArray) {
    if (bin === 1) {
      count++;
    }
  }
  return count;
}
function sliceDiscretizedTrack(trackMap, startBin, endBin) {
  const slice = /* @__PURE__ */ new Map();
  for (const [key, value] of trackMap.entries()) {
    slice.set(key, value.slice(startBin, endBin));
  }
  return slice;
}
function euclideanDistanceSquared(A, B) {
  const maxBins = Math.max(A.length, B.length);
  let sum = 0;
  for (let index = 0; index < maxBins; index++) {
    const a = A[index] || 0;
    const b = B[index] || 0;
    const diff = a - b;
    sum += diff * diff;
  }
  return sum;
}
function neirestNeighborDistance(A, B) {
  const maxBins = Math.max(A.length, B.length);
  const maxOffset = Math.round(maxBins / 4);
  let sum = 0;
  for (let index = 0; index < maxBins; index++) {
    let offset = 0;
    const a = A[index] || 0;
    const b = B[index] || 0;
    if (a === b) {
    } else if (a === 0 && b === 1) {
      while (offset <= maxOffset) {
        offset++;
        if (a[index - offset] === 1 || a[index + offset === 1]) {
          break;
        }
      }
    } else if (a === 1 && b === 0) {
      while (offset <= maxOffset) {
        offset++;
        if (b[index - offset] === 1 || b[index + offset === 1]) {
          break;
        }
      }
    }
    sum += offset;
  }
  return sum;
}

// src/comparison/SimilarSections.js
var SimilarSections_exports = {};
__export(SimilarSections_exports, {
  findSimilarNoteSections: () => findSimilarNoteSections,
  findSimilarStringSections: () => findSimilarStringSections
});

// src/stringBased/Levenshtein.js
var Levenshtein_exports = {};
__export(Levenshtein_exports, {
  damerauLevenshtein: () => damerauLevenshtein,
  levenshtein: () => levenshtein
});
function levenshtein(a, b, normalize = false) {
  if (a.length === 0 && b.length === 0) {
    return 0;
  }
  if (a.length === 0) {
    return normalize ? 1 : b.length;
  }
  if (b.length === 0) {
    return normalize ? 1 : a.length;
  }
  let i, j, previous, value;
  if (a.length > b.length) {
    const temporary = a;
    a = b;
    b = temporary;
  }
  const row = Array.from({ length: a.length + 1 });
  for (i = 0; i <= a.length; i++) {
    row[i] = i;
  }
  for (i = 1; i <= b.length; i++) {
    previous = i;
    for (j = 1; j <= a.length; j++) {
      value = b[i - 1] === a[j - 1] ? row[j - 1] : Math.min(row[j - 1] + 1, Math.min(previous + 1, row[j] + 1));
      row[j - 1] = previous;
      previous = value;
    }
    row[a.length] = previous;
  }
  const result = row[a.length];
  return normalize ? result / Math.max(a.length, b.length) : result;
}
function damerauLevenshtein(a, b, normalize = false) {
  if (a.length === 0 && b.length === 0) {
    return 0;
  }
  if (a.length === 0) {
    return normalize ? 1 : b.length;
  }
  if (b.length === 0) {
    return normalize ? 1 : a.length;
  }
  const d = Array.from({ length: a.length + 1 }).map(() => Array.from({ length: b.length }));
  for (let i = 0; i <= a.length; i++) {
    d[i][0] = i;
  }
  for (let i = 0; i <= b.length; i++) {
    d[0][i] = i;
  }
  let cost;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  const result = d[a.length][b.length];
  return normalize ? result / Math.max(a.length, b.length) : result;
}

// src/comparison/SimilarSections.js
function findSimilarNoteSections(notes, startTime, endTime, threshold = 0.5) {
  const selectedNotes = notes.filter((d) => d.start >= startTime && d.end <= endTime);
  const dataString = PitchSequence_default.fromNotes(notes).getPitches();
  const searchString = PitchSequence_default.fromNotes(selectedNotes).getPitches();
  const length = searchString.length;
  if (length < 3) {
    return [];
  }
  const matches = findSimilarStringSections(dataString, searchString, threshold);
  return matches.map((m) => {
    const { index } = m;
    const note1 = notes[index];
    const note2 = notes[index + length];
    return __spreadProps(__spreadValues({}, m), {
      startTime: note1.start,
      endTime: note2.end
    });
  });
}
function findSimilarStringSections(dataString, searchString, threshold = 0.5) {
  const length = searchString.length;
  const matches = [];
  for (let index = 0; index < dataString.length - length; index++) {
    const slice = dataString.slice(index, index + length);
    const distance = levenshtein(searchString, slice) / length;
    if (distance < threshold) {
      matches.push({ index, distance });
    }
  }
  const filtered = [];
  matches.sort((a, b) => a.distance - b.distance);
  const occupied = Array.from({ length: dataString.length }).fill(false);
  for (const m of matches) {
    const { index } = m;
    let occ = false;
    for (let i = index; i < index + length; i++) {
      if (occupied[i]) {
        occ = true;
        break;
      }
    }
    if (!occ) {
      filtered.push(m);
      for (let i = index; i < index + length; i++) {
        occupied[i] = true;
      }
    }
  }
  return filtered;
}

// src/stringBased/index.js
var stringBased_exports = {};
__export(stringBased_exports, {
  Gotoh: () => Gotoh_exports,
  ImmediateRepetitionCompression: () => ImmediateRepetitionCompression_exports,
  Levenshtein: () => Levenshtein_exports,
  LongestCommonSubsequence: () => LongestCommonSubsequence_exports,
  NGrams: () => NGrams_exports,
  NeedlemanWunsch: () => NeedlemanWunsch_default,
  SuffixTree: () => SuffixTree_exports
});

// src/stringBased/LongestCommonSubsequence.js
var LongestCommonSubsequence_exports = {};
__export(LongestCommonSubsequence_exports, {
  lcs: () => lcs,
  lcsLength: () => lcsLength,
  normalizedLcsLength: () => normalizedLcsLength
});
function lcs(a, b) {
  const m = a.length;
  const n = b.length;
  if (a.length === 0) {
    return a;
  }
  if (b.length === 0) {
    return b;
  }
  let i;
  let j;
  let row = [];
  let left;
  let diagonal;
  let latch;
  const lcs2 = [];
  const c = [];
  for (j = 0; j < n; row[j++] = 0)
    ;
  for (i = 0; i < m; i++) {
    c[i] = row = [...row];
    for (diagonal = 0, j = 0; j < n; j++, diagonal = latch) {
      latch = row[j];
      if (a[i] === b[j]) {
        row[j] = diagonal + 1;
      } else {
        left = row[j - 1] || 0;
        if (left > row[j]) {
          row[j] = left;
        }
      }
    }
  }
  i--;
  j--;
  while (i > -1 && j > -1) {
    switch (c[i][j]) {
      default:
        j--;
        lcs2.unshift(a[i]);
      case (i && c[i - 1][j]):
        i--;
        continue;
      case (j && c[i][j - 1]):
        j--;
    }
  }
  return Array.isArray(a) || Array.isArray(b) ? lcs2 : lcs2.join("");
}
function lcsLength(a, b) {
  const m = a.length;
  const n = b.length;
  if (a.length === 0) {
    return 0;
  }
  if (b.length === 0) {
    return 0;
  }
  let i;
  let j;
  let row = [];
  let left;
  let diagonal;
  let latch;
  const c = [];
  for (j = 0; j < n; row[j++] = 0)
    ;
  for (i = 0; i < m; i++) {
    c[i] = row = [...row];
    for (diagonal = 0, j = 0; j < n; j++, diagonal = latch) {
      latch = row[j];
      if (a[i] === b[j]) {
        row[j] = diagonal + 1;
      } else {
        left = row[j - 1] || 0;
        if (left > row[j]) {
          row[j] = left;
        }
      }
    }
  }
  i--;
  j--;
  return row[j];
}
function normalizedLcsLength(a, b) {
  const longerLength = Math.max(a.length, b.length);
  if (longerLength === 0) {
    return 0;
  }
  return lcsLength(a, b) / longerLength;
}

// src/stringBased/Gotoh.js
var Gotoh_exports = {};
__export(Gotoh_exports, {
  differenceSimilarity: () => differenceSimilarity,
  gotoh: () => gotoh,
  matchMissmatchSimilarity: () => matchMissmatchSimilarity,
  normalizedGotoh: () => normalizedGotoh
});
function gotoh(seqA, seqB, similarityFunction = matchMissmatchSimilarity, gapPenaltyStart = -1, gapPenaltyExtend = -0.1) {
  if (seqA.length === 0 && seqB.length === 0) {
    return 0;
  }
  const gap = (index) => gapPenaltyStart + (index - 1) * gapPenaltyExtend;
  const lengthA = seqA.length;
  const lengthB = seqB.length;
  const a = Array.from({ length: lengthA + 1 }).map(() => Array.from({ length: lengthB + 1 }));
  const b = Array.from({ length: lengthA + 1 }).map(() => Array.from({ length: lengthB + 1 }));
  const c = Array.from({ length: lengthA + 1 }).map(() => Array.from({ length: lengthB + 1 }));
  a[0][0] = 0;
  b[0][0] = 0;
  c[0][0] = 0;
  for (let i = 1; i <= lengthA; i++) {
    a[i][0] = c[i][0] = Number.NEGATIVE_INFINITY;
    b[i][0] = gap(i);
  }
  for (let i = 1; i <= lengthB; i++) {
    a[0][i] = b[0][i] = Number.NEGATIVE_INFINITY;
    c[0][i] = gap(i);
  }
  for (let i = 1; i <= lengthA; i++) {
    for (let j = 1; j <= lengthB; j++) {
      const sim = similarityFunction(seqA[i - 1], seqB[j - 1]);
      a[i][j] = Math.max(a[i - 1][j - 1], b[i - 1][j - 1], c[i - 1][j - 1]) + sim;
      b[i][j] = Math.max(a[i - 1][j] + gapPenaltyStart, b[i - 1][j] + gapPenaltyExtend, c[i - 1][j] + gapPenaltyStart);
      c[i][j] = Math.max(a[i][j - 1] + gapPenaltyStart, b[i][j - 1] + gapPenaltyStart, c[i][j - 1] + gapPenaltyExtend);
    }
  }
  return Math.max(a[lengthA][lengthB], b[lengthA][lengthB], c[lengthA][lengthB]);
}
function normalizedGotoh(seqA, seqB, similarityFunction = matchMissmatchSimilarity, gapPenaltyStart = -1, gapPenaltyExtend = -0.1) {
  const similarity = gotoh(seqA, seqB, similarityFunction, gapPenaltyStart, gapPenaltyExtend);
  const longer = seqA.length >= seqB.length ? seqA : seqB;
  const maxSimilarity = gotoh(longer, longer, similarityFunction, gapPenaltyStart, gapPenaltyExtend);
  if (maxSimilarity === 0) {
    return similarity;
  }
  return similarity / maxSimilarity;
}
function matchMissmatchSimilarity(a, b) {
  return a === b ? 1 : -1;
}
function differenceSimilarity(a, b) {
  return -Math.abs(a - b);
}

// src/stringBased/SuffixTree.js
var SuffixTree_exports = {};
__export(SuffixTree_exports, {
  default: () => SuffixTree_default
});
var SuffixTree = class {
  constructor(array) {
    if (typeof array === "string") {
      array = array.split("");
    }
    this.node = new TreeNode();
    if (array && array.length > 0) {
      for (let index = 0; index < array.length; index++) {
        this.node.addSuffix(array.slice(index));
      }
    }
  }
  getLongestRepeatedSubString() {
    return this.node.getLongestRepeatedSubString();
  }
  toString() {
    return this.node.toString();
  }
  toJson() {
    return JSON.stringify(this.node);
  }
};
var TreeNode = class {
  constructor() {
    this.value = [];
    this.leaves = [];
    this.nodes = [];
  }
  checkNodes(suf) {
    let node;
    for (let index = 0; index < this.nodes.length; index++) {
      node = this.nodes[index];
      if (arrayShallowEquals(node.value, [suf[0]])) {
        node.addSuffix(suf.slice(1));
        return true;
      }
    }
    return false;
  }
  checkLeaves(suf) {
    let node, leaf;
    for (let index = 0; index < this.leaves.length; index++) {
      leaf = this.leaves[index];
      if (leaf[0] === suf[0]) {
        node = new TreeNode();
        node.value = [leaf[0]];
        node.addSuffix(suf.slice(1));
        node.addSuffix(leaf.slice(1));
        this.nodes.push(node);
        this.leaves.splice(index, 1);
        return;
      }
    }
    this.leaves.push(suf);
  }
  addSuffix(suf) {
    if (suf.length === 0) {
      return;
    }
    if (!this.checkNodes(suf)) {
      this.checkLeaves(suf);
    }
  }
  getLongestRepeatedSubString() {
    let array = [];
    let temporary = [];
    for (let index = 0; index < this.nodes.length; index++) {
      temporary = this.nodes[index].getLongestRepeatedSubString();
      if (temporary.length > array.length) {
        array = temporary;
      }
    }
    return this.value.concat(array);
  }
  toString(indent = 1) {
    const ind = " |".repeat(indent);
    let string = "";
    string += this.value.length > 0 ? `-N '${this.value}'` : "root";
    if (this.nodes.length > 0) {
      for (let index = 0; index < this.nodes.length; index++) {
        string += `
${ind}${this.nodes[index].toString(indent + 1)}`;
      }
    }
    if (this.leaves.length > 0) {
      for (let index = 0; index < this.leaves.length; index++) {
        string += `
${ind}-L ${this.leaves[index]}`;
      }
    }
    return string;
  }
};
var SuffixTree_default = SuffixTree;

// src/stringBased/NGrams.js
var NGrams_exports = {};
__export(NGrams_exports, {
  getNGrams: () => getNGrams,
  getNGramsForArray: () => getNGramsForArray
});
function getNGrams(string, length) {
  if (length <= 0) {
    return /* @__PURE__ */ new Map();
  }
  length = Math.min(length, string.length);
  const nGrams = /* @__PURE__ */ new Map();
  for (let index = 0; index < string.length - length + 1; index++) {
    const subString = string.slice(index, index + length);
    if (nGrams.has(subString)) {
      nGrams.set(subString, nGrams.get(subString) + 1);
    } else {
      nGrams.set(subString, 1);
    }
  }
  return nGrams;
}
function getNGramsForArray(array, length) {
  if (length <= 0) {
    return /* @__PURE__ */ new Map();
  }
  length = Math.min(length, array.length);
  const nGrams = /* @__PURE__ */ new Map();
  for (let index = 0; index < array.length - length + 1; index++) {
    const subArray = array.slice(index, index + length);
    const key = subArray.join(" ");
    let count = 1;
    if (nGrams.has(key)) {
      count = nGrams.get(key).count + 1;
    }
    nGrams.set(key, {
      value: subArray,
      count
    });
  }
  return nGrams;
}

// src/stringBased/ImmediateRepetitionCompression.js
var ImmediateRepetitionCompression_exports = {};
__export(ImmediateRepetitionCompression_exports, {
  compress: () => compress,
  compressionRate: () => compressionRate,
  decompress: () => decompress,
  getImmediateRepetitions: () => getImmediateRepetitions,
  summary: () => summary,
  toString: () => toString
});
function compress(sequence) {
  if (!sequence || sequence.length === 0) {
    return null;
  }
  const longestReps = getImmediateRepetitions(sequence);
  if (longestReps === null) {
    return sequence;
  }
  const { seq, rep, length: len, pos } = longestReps[0];
  const preSeq = sequence.slice(0, pos);
  const postSeq = sequence.slice(pos + len * rep);
  const repetition = compress(seq);
  const pre = compress(preSeq);
  const post = compress(postSeq);
  const depth = Math.max((pre == null ? void 0 : pre.depth) ?? 0, (repetition == null ? void 0 : repetition.depth) ?? 0 + 1, (post == null ? void 0 : post.depth) ?? 0);
  const length = ((pre == null ? void 0 : pre.length) ?? 0) + ((repetition == null ? void 0 : repetition.length) ?? 0) + ((post == null ? void 0 : post.length) ?? 0);
  return {
    pre,
    seq: repetition,
    rep,
    post,
    depth,
    length,
    content: sequence
  };
}
function getImmediateRepetitions(sequence = []) {
  const foundReps = [];
  for (let length = Math.floor(sequence.length / 2); length > 0; --length) {
    for (let pos = 0; pos < sequence.length - length; ++pos) {
      let numberOfReps = 0;
      while (true) {
        const startPos = pos + (numberOfReps + 1) * length;
        const found = arraySlicesEqual(sequence, sequence, length, pos, startPos);
        if (!found) {
          break;
        } else {
          numberOfReps++;
        }
        if (numberOfReps > 0) {
          const rep = numberOfReps + 1;
          const seq = sequence.slice(pos, pos + length);
          foundReps.push({
            length,
            pos,
            rep,
            seq,
            totalLength: length * rep
          });
        }
      }
    }
  }
  if (foundReps.length > 0) {
    return foundReps.sort((a, b) => {
      return a.totalLength === b.totalLength ? b.rep - a.rep : b.totalLength - a.totalLength;
    });
  }
  return null;
}
function decompress(tree) {
  if (!tree) {
    return [];
  }
  if (tree.join) {
    return tree;
  }
  const seq = decompress(tree.seq);
  const repetition = Array.from({ length: tree.rep }).map(() => seq);
  return [
    ...decompress(tree.pre),
    ...repetition.flat(),
    ...decompress(tree.post)
  ];
}
function summary(tree) {
  if (!tree) {
    return [];
  }
  if (tree.join) {
    return tree;
  }
  return [
    ...summary(tree.pre),
    ...summary(tree.seq),
    ...summary(tree.post)
  ];
}
function toString(tree, separator = " ") {
  if (!tree) {
    return "";
  }
  if (tree.join) {
    return tree.join(separator);
  }
  const seq = toString(tree.seq);
  const repetition = `(${tree.rep}x ${seq})`;
  return [
    toString(tree.pre),
    repetition,
    toString(tree.post)
  ].join(separator).trim();
}
function compressionRate(compressed) {
  var _a;
  if (!(compressed == null ? void 0 : compressed.length) || !((_a = compressed == null ? void 0 : compressed.content) == null ? void 0 : _a.length)) {
    throw new Error("Invalid hierarchy");
  }
  return compressed.length / compressed.content.length;
}

// src/stringBased/NeedlemanWunsch.js
var NeedlemanWunsch = class {
  constructor(seq1, seq2, matchScore = 1, mismatchPenalty = -1, gapPenalty = -1) {
    this.seq1 = seq1;
    this.seq2 = seq2;
    this.matchScore = matchScore;
    this.mismatchPenalty = mismatchPenalty;
    this.gapPenalty = gapPenalty;
    this.I = [];
    this.S = [];
    this.T = [];
    this.finalAlignments = [];
    this.calcScoresAndTracebacks();
  }
  calcScoresAndTracebacks() {
    this.S.push([0]);
    this.I.push([[null, null, null]]);
    this.T.push([[false, false, false]]);
    for (let i = 1; i < this.seq2.length + 1; i++) {
      this.S[0].push(this.S[0][this.S[0].length - 1] + this.gapPenalty);
      this.I[0].push([null, null, null]);
      this.T[0].push([true, false, false]);
    }
    for (let i = 1; i < this.seq1.length + 1; i++) {
      this.S.push([this.S[i - 1][0] + this.gapPenalty]);
      this.I.push([[null, null, null]]);
      this.T.push([[false, false, true]]);
      for (let j = 1; j < this.seq2.length + 1; j++) {
        const insert = this.S[i][j - 1] + this.gapPenalty;
        const del = this.S[i - 1][j] + this.gapPenalty;
        const simScore = this.seq1[i - 1] === this.seq2[j - 1] ? this.matchScore : this.mismatchPenalty;
        const match = this.S[i - 1][j - 1] + simScore;
        const intermediateScores = [insert, match, del];
        const score = Math.max(...intermediateScores);
        const tracebackTypeStatus = intermediateScores.map((entry) => entry === score);
        this.S[i].push(score);
        this.I[i].push(intermediateScores);
        this.T[i].push(tracebackTypeStatus);
      }
    }
    const lastRow = this.S[this.S.length - 1];
    this.score = lastRow[lastRow.length - 1];
  }
  alignmentChildren(pos) {
    const [i, j] = pos;
    const children = [];
    const tracebackTypeStatus = this.T[i][j];
    if (tracebackTypeStatus[0]) {
      children.push({ pos: [i, j - 1], tracebackType: 0 });
    }
    if (tracebackTypeStatus[1]) {
      children.push({ pos: [i - 1, j - 1], tracebackType: 1 });
    }
    if (tracebackTypeStatus[2]) {
      children.push({ pos: [i - 1, j], tracebackType: 2 });
    }
    return children;
  }
  alignmentTraceback() {
    const finalAlignments = [];
    const root = {
      next: null,
      pos: [this.seq1.length, this.seq2.length],
      alignment: {
        seq1: "",
        seq2: ""
      }
    };
    let current, child, children, length, alignment, pos, t;
    current = root;
    while (current) {
      pos = current.pos;
      alignment = current.alignment;
      children = this.alignmentChildren(current.pos);
      if (children.length === 0) {
        finalAlignments.push(alignment);
      }
      current = current.next;
      for (t = 0, length = children.length; t < length; t++) {
        child = children[t];
        child.alignment = {
          seq1: alignment.seq1.concat(child.tracebackType === 0 ? "-" : this.seq1[pos[0] - 1]),
          seq2: alignment.seq2.concat(child.tracebackType === 2 ? "-" : this.seq2[pos[1] - 1])
        };
        child.next = current;
        current = child;
      }
    }
    return finalAlignments;
  }
};
var NeedlemanWunsch_default = NeedlemanWunsch;

// src/index.js
function getVersion() {
  return version;
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Alignment,
  Canvas,
  Chords,
  DiffAlignment,
  Drums,
  Guitar,
  GuitarNote,
  HarmonicaNote,
  Lamellophone,
  Matching,
  Midi,
  MidiInputManager,
  MusicPiece,
  Note,
  NoteArray,
  Piano,
  PitchSequence,
  PriorityMatching,
  Recording,
  SimilarSections,
  Similarity,
  StringBased,
  Utils,
  getVersion,
  recordAudio,
  recordMidi
});
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
//# sourceMappingURL=musicvislib.node.js.map
