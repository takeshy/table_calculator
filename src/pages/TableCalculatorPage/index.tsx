import * as React from "react";
import firebase, { db, providerGoogle } from "../../firebase";
import {
  Context,
  removeRec,
  appendRec,
  updateRec,
  loginSuccess,
  recoverData,
} from "../../store";
import TableCalculator from "../../templates/TableCalculator";
import { Formula } from "../../types/state";

export const TableCalculatorPage = (props: {}) => {
  const { state, dispatch } = React.useContext(Context);
  React.useEffect(() => {
    if (providerGoogle) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch(loginSuccess(user.uid));
          if (db) {
            db.doc(`users/${user.uid}`)
              .collection("formulas")
              .get()
              .then((querySnapshot) => {
                const data: Formula[] = [];
                querySnapshot.forEach(function (doc) {
                  data.push(doc.data() as Formula);
                });
                dispatch(recoverData({ formulas: data }));
              });
          }
        } else {
          firebase
            .auth()
            .signInWithRedirect(
              providerGoogle as firebase.auth.GoogleAuthProvider
            );
        }
      });
    } else {
      const state = sessionStorage.getItem("app_state") || '{"formulas": []}';
      dispatch(recoverData(JSON.parse(state)));
      dispatch(loginSuccess("develop"));
    }
  }, [dispatch]);

  const appendRowFunc = React.useCallback(
    (formula: Formula) => {
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
    },
    [dispatch, state.auth.id, state.formulas]
  );
  const updateRowFunc = React.useCallback(
    (formula: Formula) => {
      const userId = state.auth.id;
      dispatch(updateRec(formula));
      if (db) {
        db.doc(`users/${userId}`)
          .collection("formulas")
          .doc(formula.id.toString())
          .set(formula);
      }
    },
    [dispatch, state.auth.id]
  );
  const removeRowFunc = React.useCallback(
    (id: number) => {
      const userId = state.auth.id;
      dispatch(removeRec(id));
      if (db) {
        db.doc(`users/${userId}`)
          .collection("formulas")
          .doc(id.toString())
          .delete();
      }
    },
    [dispatch, state.auth.id]
  );

  return (
    <TableCalculator
      formulas={state.formulas}
      isVisible={state.auth.recovered}
      appendRow={appendRowFunc}
      updateRow={updateRowFunc}
      removeRow={removeRowFunc}
    />
  );
};

export default TableCalculatorPage;
