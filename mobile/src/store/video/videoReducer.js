import actions from "./videoAction";

const initialState = {
  videosTitle: []
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_VIDEO:
      return [...state, action.payload];
    case actions.DELETE_VIDEO:
      return [...state];
    default:
      return state;
  }
};

export default videoReducer;
