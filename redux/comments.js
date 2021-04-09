import * as ActionTypes from "./ActionTypes";

export const Comments = (state = { errMess: null, comments: [] }, action) => {
  //onsole.log("from reducer" + state.comments);
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMMENT:
      const comment = action.payload; // The new comment in the addComment action creator
      comment.id = state.comments.length; //giving the new comment an id which is the length of the comments array
      return {
        ...state,
        errMess: null,
        comments: comment,
        comments: state.comments.concat(comment),
      };

    default:
      return state;
  }
};
