import * as ActionTypes from "./ActionTypes";

export const Favorites = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE:
      if (state.includes(action.payload)) {
        return state; // check if id exists in the state(is already favorated)
      }
      return state.concat(action.payload); //if we don't find id in the array, we return a array with favorite id concatenated to it

    case ActionTypes.DELETE_FAVORITE:
      return state.filter((favorite) => favorite !== action.payload);
    default:
      return state;
  }
};
