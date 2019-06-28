export type Operator = "+" | "-" | "*" | "/";
export interface Formula {
  id: number;
  operator: Operator;
  num: number;
  item: string;
  remark: string;
}

export interface StoreState {
  formulas: Formula[];
}
