import React from "react";
import { Formula } from "../types/state";
import { delimitalize } from "../lib/util";

export interface RecordRowProcProps {
  editRow: (formula: Formula) => void;
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
      <td>
        {props.no}
        <button className="btn" onClick={() => props.editRow(props.formula)}>
          編集
        </button>
      </td>
      <td>{props.formula.item} 様</td>
      <td>{delimitalize(props.formula.num)}</td>
      <td>{props.formula.remark}</td>
      <td>{delimitalize(props.result)}</td>
    </tr>
  );
};
