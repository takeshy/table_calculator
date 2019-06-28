import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import * as Act from "../actions";
import App, { AppProcProps, AppStateProps } from "../components/App";
import { Formula, StoreState } from "../types/state";

export const mapStateToProps = function(state: StoreState): AppStateProps {
  return {
    formulas: state.formulas
  };
};

export const mapDispatchToProps = function(
  dispatch: Dispatch<Action<{}>>
): AppProcProps {
  return {
    appendRow: (formula: Formula) => dispatch(Act.appendRow(formula) as any),
    updateRow: (formula: Formula) => dispatch(Act.updateRow(formula) as any),
    removeRow: (id: number) => dispatch(Act.removeRow(id) as any)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
