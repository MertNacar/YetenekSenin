import { createStore, combineReducers } from "redux";
import * as reducers from "./reducers/index";
const rootReducer = combineReducers({
  videos: reducers.videoReducer,
  user: reducers.userReducer
});

const configureStore = () => {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default configureStore;
