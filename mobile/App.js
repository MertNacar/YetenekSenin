import {
  LoginScreen,
  ProfileScreen,
  HomeScreen,
  SearchScreen,
  SignUpScreen,
  InitScreen,
  AddVideoScreen
} from "./screens/AllScreens";
import { InitTab } from "./screens/MainTabs";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore";

const store = configureStore();
console.log("store", store.getState());
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.LoginScreen",
  () => LoginScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.HomeScreen",
  () => HomeScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.InitScreen",
  () => InitScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.SignUpScreen",
  () => SignUpScreen,
  Provider,
  store
);
Navigation.registerComponent(
  "yeteneksenin.screens.AddVideoScreen",
  () => AddVideoScreen
);
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.ProfileScreen",
  () => ProfileScreen,
  Provider,
  store
);
Navigation.registerComponent(
  "yeteneksenin.screens.SearchScreen",
  () => SearchScreen
);

InitTab();
