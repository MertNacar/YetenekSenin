import actions from "./userViewAction";

const initialState = [];

const userViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.VIEW_USER:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default userViewReducer;
