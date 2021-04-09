import * as ActionTypes from "./ActionTypes";

const initialState = { isLoading: true, errMess: null, recipes: [] };

export const Recipes = (state = initialState, action) => {
  console.log(state.recipes);
  switch (action.type) {
    case ActionTypes.ADD_RECIPES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        recipes: action.payload,
      };

    case ActionTypes.LOAD_RECIPES:
      return { ...state, isLoading: true, errMess: null, recipes: [] };

    case ActionTypes.RECIPES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
