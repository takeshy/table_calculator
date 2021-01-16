import { diff } from "./libs/Util";
import { reducer, Context, InitialState, AppState, Actions } from "./store";
import ModalProvider from "./libs/ModalProvider";
import TableCalculatorPage from "./pages/TableCalculatorPage";
import { useReducer } from "react";

const reducerForApp =
  process.env.NODE_ENV === "production"
    ? reducer
    : (state: AppState, action: Actions) => {
        console.groupCollapsed(action.type);
        console.log("action", action);
        const result = reducer(state, action);
        console.log("diff", diff(state, result));
        console.log("prevState", state);
        console.log("currentState", result);
        console.groupEnd();
        return result;
      };

export const App = (props: any) => {
  const [state, dispatch] = useReducer(reducerForApp, InitialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <ModalProvider>
        <TableCalculatorPage />
      </ModalProvider>
    </Context.Provider>
  );
};

export default App;
