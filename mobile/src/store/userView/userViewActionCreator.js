import actions from "./userViewAction";
const viewUser = view => {
  return {
    type: actions.VIEW_USER,
    payload: view
  };
};

export { viewUser };
