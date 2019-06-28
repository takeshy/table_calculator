import React, { useState, ChangeEvent } from "react";
import "../styles/pure.css";
import CalcRow, { EditFormula } from "./CalcRow";
import { Formula } from "../types/state";
import { calcFormula, delimitalize } from "../lib/util";
import RecordRow from "./RecordRow";
import style from "../styles/calculator.module.css";

export interface AppProcProps {
  appendRow: (formula: Formula) => void;
  updateRow: (formula: Formula) => void;
  removeRow: (id: number) => void;
}
export interface AppStateProps {
  formulas: Formula[];
}
interface AppProps extends AppProcProps, AppStateProps {}

type Sort = "" | "▼" | "▲";

const initSort: Sort = "";

const initFormula: EditFormula = {
  id: 0,
  operator: "+",
  num: 0,
  item: "",
  remark: "",
  strNum: delimitalize(0)
};

type Condition = {
  include: string;
  exclude: string;
};
const initialCondition: Condition = { include: "", exclude: "" };
const App: React.FC<AppProps> = (props: AppProps) => {
  let total = 0;
  const [editFormula, setEditFormula] = useState(initFormula);
  const [sort, setSort] = useState(initSort as Sort);
  const [condition, setCondition] = useState(initialCondition);

  const save = (f: Formula) => {
    if (f.id) {
      props.updateRow(f);
    } else {
      props.appendRow(f);
    }
    setEditFormula(initFormula);
  };

  const removeRow = (id: number) => {
    props.removeRow(id);
  };
  const cancel = () => {
    setEditFormula(initFormula);
  };

  const setFormula = (f: EditFormula) => {
    setEditFormula(f);
  };

  const editRow = (f: Formula) => {
    setEditFormula({
      ...f,
      strNum: delimitalize(f.num)
    });
  };
  const sortNumber = () => {
    const s: Sort = sort === "" ? "▼" : sort === "▼" ? "▲" : "";
    setSort(s);
  };

  const editInclude = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCondition({ ...condition, include: e.target.value });
  };

  const editExclude = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCondition({ ...condition, exclude: e.target.value });
  };

  const includes = condition.include
    .split(/\s/)
    .filter(s => s)
    .map(s => new RegExp(s));
  const excludes = condition.exclude
    .split(/\s/)
    .filter(s => s)
    .map(s => new RegExp(s));
  const searchedFormulas = props.formulas.filter(formula => {
    return (
      includes.filter(
        include =>
          !!formula.item.match(include) || !!formula.remark.match(include)
      ).length === includes.length &&
      excludes.filter(
        exclude =>
          !formula.item.match(exclude) && !formula.remark.match(exclude)
      ).length === excludes.length
    );
  });
  const formulas =
    sort === ""
      ? searchedFormulas
      : sort === "▼"
      ? searchedFormulas.sort((a, b) => b.num - a.num)
      : searchedFormulas.sort((a, b) => a.num - b.num);

  return (
    <>
      <form className="pure-form" onSubmit={e => e.preventDefault()}>
        <fieldset>
          <input type="text" placeholder="対象文字列" onChange={editInclude} />
          を含む
          <input type="text" placeholder="除外文字列" onChange={editExclude} />
          を含まない
          <div style={{ fontSize: "0.8em" }}>※複数の場合は空白で区切る</div>
        </fieldset>
      </form>
      <table className="pure-table">
        <thead>
          <tr>
            <th>#</th>
            <th>名前</th>
            <th className={style.hover} onClick={sortNumber}>
              {sort}金額
            </th>
            <th>備考</th>
            <th>累計</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {formulas.map((formula: Formula, idx: number) => {
            const beforeTotal = total;
            if (editFormula.id === formula.id) {
              total = calcFormula(total, editFormula);
              return (
                <CalcRow
                  key={formula.id}
                  setFormula={setFormula}
                  formula={editFormula}
                  result={beforeTotal}
                  save={save}
                  cancel={cancel}
                />
              );
            } else {
              total = calcFormula(total, formula);
              return (
                <RecordRow
                  no={idx + 1}
                  key={formula.id}
                  formula={formula}
                  result={total}
                  editRow={editRow}
                  removeRow={removeRow}
                />
              );
            }
          })}
          {editFormula.id === 0 && (
            <CalcRow
              formula={editFormula}
              setFormula={setFormula}
              result={total}
              cancel={cancel}
              save={save}
            />
          )}
        </tbody>
      </table>
    </>
  );
};

export default App;
