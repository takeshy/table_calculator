import { Operator } from "../types/state";

export function calcFormula(
  total: number,
  formula: { operator: Operator; num: number }
) {
  switch (formula.operator) {
    case "+":
      return total + formula.num;
    case "-":
      return total - formula.num;
    case "*":
      return total * formula.num;
    case "/":
      return total / formula.num;
  }
}

export function delimitalize(x: string | number) {
  if (x.toString() === "0") {
    return "";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Check if two arrays are equal
 * @param  {Array}   arr1 The first array
 * @param  {Array}   arr2 The second array
 * @return {Array}   different element array
 */
function arraysMissMatch(arr1: any[], arr2: any[]) {
  const arr = [];
  // Check if all items exist and are in the same order
  for (let i = 0; i < arr1.length; i++) {
    const d = diff(arr1[i], arr2[i]);
    if (typeof d !== "object" || Object.keys(d).length > 0) {
      arr.push(d);
    }
  }
  if (arr1.length < arr2.length) {
    for (let i = arr1.length; i < arr2.length; i++) {
      arr.push(arr2[i]);
    }
  }
  // Otherwise, return true
  return arr;
}
/**
 * Compare two items and push non-matches to object
 * @param  {*}      item1 The first item
 * @param  {*}      item2 The second item
 * @param  {String} key   The key in our object
 */
function compare(item1: any, item2: any, key: string) {
  const type1 = Object.prototype.toString.call(item1);
  const type2 = Object.prototype.toString.call(item2);
  const diffs: { [key: string]: any } = {};

  if (type1 !== type2) {
    diffs[key] = item2;
    return diffs;
  }

  if (item1 instanceof Date && item2 instanceof Date) {
    if (item1.getTime() !== item2.getTime()) {
      diffs[key] = item2;
    }
    return diffs;
  }

  if (type1 === "[object Object]") {
    var objDiff = diff(item1, item2);
    if (typeof objDiff !== "object" || Object.keys(objDiff).length > 0) {
      diffs[key] = objDiff;
    }
    return diffs;
  }

  if (type1 === "[object Array]") {
    const missMatch = arraysMissMatch(item1, item2);
    if (missMatch.length > 0) {
      diffs[key] = missMatch;
    }
    return diffs;
  }

  if (type1 === "[object Function]") {
    if (item1.toString() !== item2.toString()) {
      diffs[key] = item2;
    }
    return diffs;
  }

  if (item1 !== item2) {
    diffs[key] = item2;
  }
  return diffs;
}
export function diff(obj1: any, obj2: any) {
  let diffs: { [key: string]: any } = {};
  let key: string;

  if (obj1 === obj2) {
    return diffs;
  }
  if (typeof obj1 === "number" && typeof obj2 === "number") {
    if (obj1 !== obj2) {
      return obj2;
    }
    return diffs;
  }
  if (typeof obj1 === "string" && typeof obj2 === "string") {
    if (obj1 !== obj2) {
      return obj2;
    }
    return diffs;
  }
  if (typeof obj1 === "undefined" || obj1 === null) {
    if (typeof obj2 === "undefined" || obj2 === null) {
      return diffs;
    }
    return obj2;
  }

  if (Object.prototype.toString.call(obj1) === "[object Function]") {
    if (obj1.toString() === obj2.toString()) {
      return diffs;
    }
    return obj2;
  }

  if (obj1 instanceof Date && obj2 instanceof Date) {
    if (obj1.getTime() !== obj2.getTime()) {
      return obj2;
    }
    return diffs;
  }

  for (key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (obj2) {
        diffs = { ...diffs, ...compare(obj1[key], obj2[key], key) };
      } else {
        diffs[key] = undefined;
      }
    }
  }
  for (key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (!obj1.hasOwnProperty(key)) {
        diffs[key] = obj2[key];
      }
    }
  }
  return diffs;
}

