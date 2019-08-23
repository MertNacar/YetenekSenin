import actions from "./userAction";
const addUser = user => {
  return {
    type: actions.ADD_USER,
    payload: user
  };
};
const editUser = user => {
  return {
    type: actions.EDIT_USER,
    payload: user
  };
};

export { addUser,editUser };
