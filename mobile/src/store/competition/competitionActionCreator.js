import actions from "./competitionAction";
const addCompetition = comp => {
  return {
    type: actions.ADD_COMPETITION,
    payload: comp
  };
};

export { addCompetition };
