export type Operator = "+" | "-" | "*" | "/";
export interface Formula {
  id: number;
  operator: Operator;
  num: number;
  item: string;
  remark: string;
}

export interface Auth {
  id: string | null;
}

export interface StoreState {
  formulas: Formula[];
  auth: Auth;
}
