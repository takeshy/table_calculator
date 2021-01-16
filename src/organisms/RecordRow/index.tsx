import React from "react";
import { Formula } from "../../types/state";
import { delimitalize } from "../../libs/Util";

export interface RecordRowProcProps {
  editRow: (formula: Formula) => void;
  removeRow: (formulaID: number) => void;
}

export interface RecordRowStateProps {
  no: number;
  formula: Formula;
  result: number;
}

interface RecordRowProps extends RecordRowProcProps, RecordRowStateProps {}

export default (props: RecordRowProps) => {
  return (
    <tr>
      <td>{props.no}</td>
      <td>{props.formula.item} 様</td>
      <td>{delimitalize(props.formula.num)}</td>
      <td>{props.formula.remark}</td>
      <td>{delimitalize(props.result)}</td>
      <td>
        <button className="btn" onClick={() => props.editRow(props.formula)}>
          編集
        </button>
        <button
          className="btn"
          onClick={() => {
            if (
              window.confirm(
                `${props.formula.item}のレコードを削除していいですか?`
              )
            ) {
              props.removeRow(props.formula.id);
            }
          }}
        >
          削除
        </button>
      </td>
    </tr>
  );
};
