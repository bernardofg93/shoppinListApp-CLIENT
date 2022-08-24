import { SET_USER_DATA } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
