import React from "react";
import "../styles/pure.css";
import CalcRow, { CalcRowProcProps, Formula } from "./CalcRow";

export interface AppProcProps extends CalcRowProcProps {}
export interface AppStateProps {
  formulas: Formula[];
}
interface AppProps extends AppProcProps, AppStateProps {}

const App: React.FC<AppProps> = (props: AppProps) => {
  return (
    <table className="pure-table">
      <thead>
        <tr>
          <th>#</th>
          <th>演算子</th>
          <th>数字</th>
          <th>結果</th>
        </tr>
      </thead>
      <tbody>
        {props.formulas.map(formula => {
          return (
            <CalcRow
              key={formula.id}
              changeNum={props.changeNum}
              changeOperator={props.changeOperator}
              appendRow={props.appendRow}
              formula={formula}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default App;
