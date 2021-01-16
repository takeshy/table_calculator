import { Formula, StoreState } from "./types/state";
import * as React from "react";
import { Dispatch } from "react";
export const RECOVER_DATA = "RECOVER_DATA";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const APPEND_ROW = "APPEND_ROW";
export const UPDATE_ROW = "UPDATE_ROW";
export const REMOVE_ROW = "REMOVE_ROW";

export const recoverData = (state: { formulas: Formula[] }) => {
  return {
    type: RECOVER_DATA as typeof RECOVER_DATA,
    payload: { ...state }
  };
};

export const appendRec = (formula: Formula) => {
  return {
    type: APPEND_ROW as typeof APPEND_ROW,
    payload: {
      formula
    }
  };
};

export const updateRec = (formula: Formula) => {
  return {
    type: UPDATE_ROW as typeof UPDATE_ROW,
    payload: {
      formula
    }
  };
};

export const removeRec = (id: number) => {
  return {
    type: REMOVE_ROW as typeof REMOVE_ROW,
    payload: { id }
  };
};


export function loginSuccess(id: string) {
  return {
    type: LOGIN_SUCCESS as typeof LOGIN_SUCCESS,
    payload: { id }
  };
}

export type Actions =
  | ReturnType<typeof recoverData>
  | ReturnType<typeof appendRec>
  | ReturnType<typeof updateRec>
  | ReturnType<typeof removeRec>
  | ReturnType<typeof loginSuccess>;

type ContextState = {
  state: AppState;
  dispatch(action: Actions): void;
};

export interface AppState {
    formulas: Formula[];
    auth: { id: null|string, recovered: boolean}
}
export const InitialState:AppState = {
    formulas:[],
    auth: { id: null, recovered: false }
}

export const reducer = (state = InitialState, action: Actions): AppState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
        return { ...state, auth: {...state.auth, id: action.payload.id }};
    case RECOVER_DATA: {
      return {auth: {...state.auth, recovered:true}, formulas: action.payload.formulas};
    }
    case APPEND_ROW: {
      return {
          ...state,
          formulas: [
        ...state.formulas,
        {
          ...action.payload.formula,
          id: state.formulas.length === 0 ? 1 : state.formulas[state.formulas.length - 1].id + 1
        }
      ]};
    }
    case REMOVE_ROW: {
      return {...state, formulas: state.formulas.filter(formula => formula.id !== action.payload.id)}
    }
    case UPDATE_ROW: {
      return {...state, formulas: state.formulas.map(formula =>
        action.payload.formula.id === formula.id
          ? action.payload.formula
          : formula
      )};
    }
    default: {
      return state;
    }
  }
};
export const Context = React.createContext<ContextState>({
  state: InitialState,
  dispatch(_) {
    console.warn("Context.Provider外からの呼び出し");
  },
});

