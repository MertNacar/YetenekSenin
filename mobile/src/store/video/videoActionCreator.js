import actions from "./videoAction";

const addVideoCreator = (videoTitle, videoDescription) => {
  return {
    type: actions.ADD_VIDEO,
    payload: {
      videoTitle,
      videoDescription
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

export { addVideoCreator, deleteVideoCreator };
