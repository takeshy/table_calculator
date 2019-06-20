import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/App";
import reducer from "./reducers";
import { compose, createStore, StoreEnhancerStoreCreator } from "redux";

export interface CustomWindow extends Window {
  // tslint:disable-next-line
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancerStoreCreator<{}, {}>;
}
declare let window: CustomWindow;
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION__() as typeof compose) || compose;

const store = createStore(reducer, composeEnhancers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
