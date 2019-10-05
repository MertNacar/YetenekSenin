import { createStore, combineReducers } from "redux";
import * as reducers from "./index";
const rootReducer = combineReducers({
  videos: reducers.videoReducer,
  user: reducers.userReducer,
  userView: reducers.userViewReducer,
  competitions: reducers.competitionReducer
});

let store = createStore(rootReducer);

export default store;
