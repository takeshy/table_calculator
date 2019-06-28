import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./containers/App";
import * as Action from "./actions";
import reducer from "./reducers";
import saveState from "./middlewares/saveState";
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
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
      applyMiddleware(thunk, saveState)
    ) as typeof compose)
  : compose(applyMiddleware(thunk, saveState));

const store = createStore(reducer, {}, composeEnhancers);
const state = sessionStorage.getItem("app_state");
if (state) {
  store.dispatch(Action.recoverData(JSON.parse(state)));
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
