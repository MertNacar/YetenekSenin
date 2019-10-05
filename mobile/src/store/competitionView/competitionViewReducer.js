import actions from "./competitionViewAction";

const initialState = [];

const competitionViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.VIEW_COMPETITION:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default competitionViewReducer;
