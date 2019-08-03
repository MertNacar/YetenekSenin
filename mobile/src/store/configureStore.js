import { createStore, combineReducers } from "redux";
import * as reducers from "./index";
const rootReducer = combineReducers({
  videos: reducers.videoReducer,
  user: reducers.userReducer
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
