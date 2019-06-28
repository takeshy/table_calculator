import * as Action from "../actions";
import { Auth } from "../types/state";

const initialState: Auth = { id: null, recovered: false };

export default (state = initialState, action: Action.Actions) => {
  switch (action.type) {
    case Action.LOGIN_SUCCESS:
      return { ...state, id: action.payload.id };
    case Action.RECOVER_DATA:
      return { ...state, recovered: true };
    default: {
      return state;
    }
  }
};
