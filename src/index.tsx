import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./containers/App";
import * as Action from "./actions";
import reducer from "./reducers";
import saveState from "./middlewares/saveState";
import firebase, { providerGoogle } from "./firebase";
import {
  compose,
  applyMiddleware,
  createStore,
  StoreEnhancerStoreCreator
} from "redux";

export interface CustomWindow extends Window {
  // tslint:disable-next-line
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (
    middleware: any
  ) => StoreEnhancerStoreCreator<{}, {}>;
}
declare let window: CustomWindow;

let composeEnhancers;
let store: any;
if (providerGoogle) {
  composeEnhancers = compose(applyMiddleware(thunk));
  store = createStore(reducer, {}, composeEnhancers);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      store.dispatch(Action.loginSuccess(user.uid));
      store.dispatch(Action.fetchFormulas(user.uid) as any);
    } else {
      firebase
        .auth()
        .signInWithRedirect(providerGoogle as firebase.auth.GoogleAuthProvider);
    }
  });
} else {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(thunk, saveState)
      ) as typeof compose)
    : compose(applyMiddleware(thunk, saveState));
  store = createStore(reducer, {}, composeEnhancers);
  const state = sessionStorage.getItem("app_state") || '{"formulas": []}';
  store.dispatch(Action.recoverData(JSON.parse(state)));
  store.dispatch(Action.loginSuccess("develop"));
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
