import * as Action from "../actions";
import { Auth } from "../types/state";

const initialState: Auth = { id: null };

export default (state = initialState, action: Action.Actions) => {
  switch (action.type) {
    case Action.LOGIN_SUCCESS:
      return { id: action.payload.id };
    default: {
      return state;
    }
  }
};
