import actions from '../actions/actionTypes'

const initialState = {
  videosTitle:["hey","deneme","redux"]
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_VIDEO:
      return [...state,action.payload]
      case actions.DELETE_VIDEO: 
      return [...state]
    default:
      return state;
  }
};

export default videoReducer;
