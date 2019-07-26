import {
  LoginScreen,
  ProfileScreen,
  HomeScreen,
  SearchScreen,
  SignUpScreen,
  InitScreen,
  AddVideoScreen,
  InitTab
} from "./screens/AllScreens";
/*import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore";

const store = configureStore();*/

import { Navigation } from "react-native-navigation";

Navigation.registerComponent(
  "yeteneksenin.screens.LoginScreen",
  () => LoginScreen
);
Navigation.registerComponent(
  "yeteneksenin.screens.SignUpScreen",
  () => SignUpScreen
);
Navigation.registerComponent(
  "yeteneksenin.screens.AddVideoScreen",
  () => AddVideoScreen
);
Navigation.registerComponent(
  "yeteneksenin.screens.ProfileScreen",
  () => ProfileScreen
);
Navigation.registerComponent(
  "yeteneksenin.screens.HomeScreen",
  () => HomeScreen
);
Navigation.registerComponent(
  "yeteneksenin.screens.SearchScreen",
  () => SearchScreen
);
Navigation.registerComponent(
  "yeteneksenin.screens.InitScreen",
  () => InitScreen
);

InitTab();
