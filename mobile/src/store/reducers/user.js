import actions from "../actions/actionTypes";

const initialState = [{ username: "Mert" }];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_USER:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default userReducer;
