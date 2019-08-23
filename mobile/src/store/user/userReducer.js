import actions from "./userAction";

const initialState = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_USER:
      return Object.assign({}, state, action.payload);
    case actions.EDIT_USER:
      return Object.assign({},state,action.payload);
    default:
      return state;
  }
};



export default userReducer;
