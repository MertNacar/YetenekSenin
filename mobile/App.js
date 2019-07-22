import {
  LoginScreen,
  ProfileScreen,
  HomeScreen,
  SearchScreen,
  SignUpScreen,
  InitScreen,
  InitTab
} from "./screens/AllScreens";
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
