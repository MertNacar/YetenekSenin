import actions from "./actionTypes";

const addVideoCreator = (videoTitle, videoDescription) => {
  return {
    type: actions.ADD_VIDEO,
    payload: {
      videoTitle,
      videoDescription
    }
  };
};

const addUser = username => {
  return {
    type: actions.ADD_USER,
    payload: {
      username
    }
  };
};
const deleteVideoCreator = index => {
  return {
    type: actions.DELETE_VIDEO,
    payload: {
      index
    }
  };
};

export { addUser, addVideoCreator, deleteVideoCreator };
