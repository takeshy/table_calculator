import { Formula, StoreState } from "../types/state";
import { Dispatch } from "react";
import { db } from "../firebase";
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

export const appendRow = (formula: Formula) => {
  return (dispatch: Dispatch<any>, getState: () => StoreState) => {
    const state = getState();
    const userId = state.auth.id;
    const id =
      state.formulas.length === 0
        ? 1
        : state.formulas[state.formulas.length - 1].id + 1;
    dispatch(appendRec({ ...formula, id }));
    if (db) {
      db.doc(`users/${userId}`)
        .collection("formulas")
        .doc(id.toString())
        .set({ ...formula, id });
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

export const updateRow = (formula: Formula) => {
  return (dispatch: Dispatch<any>, getState: () => StoreState) => {
    const state = getState();
    const userId = state.auth.id;
    dispatch(updateRec(formula));
    if (db) {
      db.doc(`users/${userId}`)
        .collection("formulas")
        .doc(formula.id.toString())
        .set(formula);
    }
  };
};

export const removeRec = (id: number) => {
  return {
    type: REMOVE_ROW as typeof REMOVE_ROW,
    payload: { id }
  };
};

export const removeRow = (id: number) => {
  return (dispatch: Dispatch<any>, getState: () => StoreState) => {
    const state = getState();
    const userId = state.auth.id;
    dispatch(removeRec(id));
    if (db) {
      db.doc(`users/${userId}`)
        .collection("formulas")
        .doc(id.toString())
        .delete();
    }
  };
};

export function loginSuccess(id: string) {
  return {
    type: LOGIN_SUCCESS as typeof LOGIN_SUCCESS,
    payload: { id }
  };
}

export function fetchFormulas(userId: string) {
  return (dispatch: Dispatch<any>, getState: () => StoreState) => {
    if (db) {
      db.doc(`users/${userId}`)
        .collection("formulas")
        .get()
        .then(querySnapshot => {
          const data: Formula[] = [];
          querySnapshot.forEach(function(doc) {
            data.push(doc.data() as Formula);
          });
          dispatch(recoverData({ formulas: data }));
        });
    }
  };
}

export type Actions =
  | ReturnType<typeof recoverData>
  | ReturnType<typeof appendRec>
  | ReturnType<typeof updateRec>
  | ReturnType<typeof removeRec>
  | ReturnType<typeof loginSuccess>;
