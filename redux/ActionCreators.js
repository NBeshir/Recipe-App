import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchRecipes = () => (dispatch) => {
  dispatch(recipesLoading());

  return fetch(baseUrl + "RECIPES")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((recipes) => dispatch(addRecipes(recipes)))
    .catch((error) => dispatch(recipesFailed(error.message)));
};

export const recipesLoading = () => ({
  type: ActionTypes.LOAD_RECIPES,
});

export const recipesFailed = (errMess) => ({
  type: ActionTypes.RECIPES_FAILED,
  payload: errMess,
});

export const addRecipes = (recipes) => ({
  type: ActionTypes.ADD_RECIPES,
  payload: recipes,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())

    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const postComment = (recipeId, rating, author, text) => (dispatch) => {
  const newComment = {
    recipeId,
    rating,
    author,
    text,
    date: new Date().toISOString(),
  };

  setTimeout(() => {
    dispatch(addComment(newComment));
  }, 2000);
};

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postFavorite = (recipeId) => (dispatch) => {
  setTimeout(() => {
    dispatch(addFavorite(recipeId));
  }, 2000);
};

export const addFavorite = (recipeId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: recipeId,
});

export const deleteFavorite = (recipeId) => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: recipeId,
});
