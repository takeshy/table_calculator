import React, { FormEvent, useRef, useEffect } from "react";
import { Formula } from "../types/state";
import { calcFormula, delimitalize } from "../lib/util";

export interface EditFormula extends Formula {
  strNum: string;
}

export interface CalcRowProcProps {
  setFormula: (formula: EditFormula) => void;
  save: (formula: Formula) => void;
  cancel: () => void;
}

export interface CalcRowStateProps {
  result: number;
  formula: EditFormula;
}

interface CalcRowProps extends CalcRowProcProps, CalcRowStateProps {}
const CalcRow: React.FC<CalcRowProps> = (props: CalcRowProps) => {
  const numEl = useRef<HTMLInputElement>(null);
  const itemEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    itemEl.current && itemEl.current.focus();
  }, [props.formula.item]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (props.formula.num !== Number(props.formula.strNum.replace(/,/, ""))) {
      alert("正しい数字をセットしてください");
      numEl.current && numEl.current.focus();
      return;
    }
    if (!props.formula.item) {
      alert("名前をセットしてください");
      itemEl.current && itemEl.current.focus();
      return;
    }
    props.save(props.formula);
  };
  return (
    <>
      <tr>
        <td />
        <td>
          <form className="pure-form" onSubmit={handleSubmit}>
            <input
              type="text"
              autoComplete="off"
              ref={itemEl}
              style={{ width: "130px" }}
              value={props.formula.item}
              onChange={e => {
                props.setFormula({ ...props.formula, item: e.target.value });
              }}
            />
          </form>
        </td>
        <td>
          <form className="pure-form" onSubmit={handleSubmit}>
            <input
              type="number"
              autoComplete="off"
              value={props.formula.num}
              style={{ width: "100px" }}
              ref={numEl}
              onChange={e => {
                const num = Number(e.target.value.replace(/,/g, ""));
                if (isNaN(num)) {
                  props.setFormula({
                    ...props.formula,
                    num: 0,
                    strNum: e.target.value
                  });
                } else {
                  props.setFormula({
                    ...props.formula,
                    num: num,
                    strNum: e.target.value
                  });
                }
              }}
            />
          </form>
        </td>
        <td>
          <form className="pure-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={props.formula.remark}
              onChange={e => {
                props.setFormula({ ...props.formula, remark: e.target.value });
              }}
            />
          </form>
        </td>
        <td style={{ width: "80px" }}>
          <div>{delimitalize(calcFormula(props.result, props.formula))}</div>
        </td>
        <td>
          <button onClick={handleSubmit} className="btn primary">
            保存
          </button>
          {props.formula.id ? (
            <button onClick={props.cancel} className="btn secondary">
              キャンセル
            </button>
          ) : (
            ""
          )}
        </td>
      </tr>
    </>
  );
};
export default CalcRow;
