import * as Action from "../actions";
import { Formula } from "../types/state";

const initialState: Formula[] = [];

export default (state = initialState, action: Action.Actions): Formula[] => {
  switch (action.type) {
    case Action.RECOVER_DATA: {
      return action.payload.formulas;
    }
    case Action.APPEND_ROW: {
      return [
        ...state,
        {
          ...action.payload.formula,
          id: state.length === 0 ? 1 : state[state.length - 1].id + 1
        }
      ];
    }
    case Action.REMOVE_ROW: {
      return state.filter(formula => formula.id !== action.payload.id);
    }
    case Action.UPDATE_ROW: {
      return state.map(formula =>
        action.payload.formula.id === formula.id
          ? action.payload.formula
          : formula
      );
    }
    default: {
      return state;
    }
  }
};
