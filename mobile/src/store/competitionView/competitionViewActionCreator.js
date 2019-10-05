import actions from "./competitionViewAction";
const viewCompetition = view => {
  return {
    type: actions.VIEW_COMPETITION,
    payload: view
  };
};

export { viewCompetition };
