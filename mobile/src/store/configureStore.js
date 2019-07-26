import { createStore, combineReducers } from "redux";
import * as reducers from "./reducers/index";

const rootReducer = combineReducers({
  videos: reducers.videoReducer
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
