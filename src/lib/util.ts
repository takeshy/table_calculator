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
