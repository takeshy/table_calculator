import React from "react";

export type Operator = "+" | "-";
export interface Formula {
  id: number;
  operator: Operator;
  num: number;
  result: number;
}
export interface CalcRowProcProps {
  changeOperator: (operator: Operator) => void;
  changeNum: (num: number) => void;
  appendRow: () => void;
}
export interface CalcRowStateProps {
  formula: Formula;
}
const style = {
  fontWeight: "bold" as "bold",
  margin: "10px"
};
interface CalcRowProps extends CalcRowProcProps, CalcRowStateProps {}
const CalcRow: React.FC<CalcRowProps> = (props: CalcRowProps) => {
  if (props.formula.id === 0) {
    return (
      <tr>
        <td />
        <td style={{ width: "120px" }}>
          <form
            className="pure-form"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <label style={style} htmlFor={"plus"}>
              +
            </label>
            <input
              type="radio"
              id="plus"
              checked={props.formula.operator === "+"}
              onChange={() => props.changeOperator("+")}
            />
            <label style={style} htmlFor={"minus"}>
              -
            </label>
            <input
              type="radio"
              id="minus"
              checked={props.formula.operator === "-"}
              onChange={() => props.changeOperator("-")}
            />
          </form>
        </td>
        <td>
          <form
            className="pure-form"
            onSubmit={e => {
              e.preventDefault();
              props.appendRow();
            }}
          >
            <input
              type="text"
              value={props.formula.num ? props.formula.num : ""}
              onChange={e => {
                if (e.target.value === "-") {
                  props.changeOperator("-");
                } else if (e.target.value === "+") {
                  props.changeOperator("+");
                } else if (Number(e.target.value)) {
                  props.changeNum(Number(e.target.value));
                }
              }}
            />
          </form>
        </td>
        <td>{props.formula.result}</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{props.formula.id}</td>
      <td>{props.formula.operator}</td>
      <td>{props.formula.num}</td>
      <td>{props.formula.result}</td>
    </tr>
  );
};

export default CalcRow;
