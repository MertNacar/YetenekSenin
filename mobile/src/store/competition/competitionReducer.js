import actions from "./competitionAction";

const initialState = [];

const competitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_COMPETITION:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default competitionReducer;
