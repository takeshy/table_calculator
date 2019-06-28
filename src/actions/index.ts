import { Formula, StoreState } from "../types/state";
export const RECOVER_DATA = "RECOVER_DATA";
export const APPEND_ROW = "APPEND_ROW";
export const UPDATE_ROW = "UPDATE_ROW";

export const recoverData = (state: StoreState) => {
  return {
    type: RECOVER_DATA as typeof RECOVER_DATA,
    payload: { ...state }
  };
};

export const appendRow = (formula: Formula) => {
  return {
    type: APPEND_ROW as typeof APPEND_ROW,
    payload: {
      formula
    }
  };
};

export const updateRow = (formula: Formula) => {
  return {
    type: UPDATE_ROW as typeof UPDATE_ROW,
    payload: {
      formula
    }
  };
};

export type Actions =
  | ReturnType<typeof recoverData>
  | ReturnType<typeof appendRow>
  | ReturnType<typeof updateRow>;
