import {
  LoginScreen,
  ProfileScreen,
  HomeScreen,
  SearchScreen,
  SignUpScreen,
  SignUpScreen2,
  SignUpScreen3,
  InitScreen,
  AddVideoScreen,
  SideDrawer
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
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.SignUpScreen2",
  () => SignUpScreen2,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.SignUpScreen3",
  () => SignUpScreen3,
  Provider,
  store
);
Navigation.registerComponent(
  "yeteneksenin.screens.AddVideoScreen",
  () => AddVideoScreen
);
Navigation.registerComponent(
  "yeteneksenin.screens.SideDrawer",
  () => SideDrawer
);
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.ProfileScreen",
  () => ProfileScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.SearchScreen",
  () => SearchScreen,
  Provider,
  store
);

InitTab();
