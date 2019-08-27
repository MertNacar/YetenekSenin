import {
  HomeScreen,
  SearchScreen,
  AddVideoScreen,
  ProfileScreen,
  ViewProfileScreen,
  LoginScreen,
  SignUpScreen,
  SignUpScreen2,
  SignUpScreen3,
  InitScreen,
  SideDrawer,
  UpdateInformationScreen,
  UpdatePasswordScreen,
  UpdateSettingsScreen
} from "./screens/AllScreens";
import { InitTab } from "./screens/MainTabs";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import store from "./src/store/configureStore";

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
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.AddVideoScreen",
  () => AddVideoScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.SideDrawer",
  () => SideDrawer,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.UpdateInformationScreen",
  () => UpdateInformationScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.UpdateSettingsScreen",
  () => UpdateSettingsScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.UpdatePasswordScreen",
  () => UpdatePasswordScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "yeteneksenin.screens.ViewProfileScreen",
  () => ViewProfileScreen,
  Provider,
  store
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
