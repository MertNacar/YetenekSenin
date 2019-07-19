/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import App from "./App";
import { LoginScreen, ProfileScreen, HomeScreen, SearchScreen, SignUpScreen } from "./src/pages";

Navigation.registerComponent("yeteneksenin.screens.App", () => App);
Navigation.registerComponent("yeteneksenin.screens.LoginScreen", () => LoginScreen);
Navigation.registerComponent("yeteneksenin.screens.ProfileScreen", () => ProfileScreen);
Navigation.registerComponent("yeteneksenin.screens.HomeScreen", () => HomeScreen);
Navigation.registerComponent("yeteneksenin.screens.SearchScreen", () => SearchScreen);
Navigation.registerComponent("yeteneksenin.screens.SignUpScreen", () => SignUpScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "yeteneksenin.screens.App"
      }
    }
  });
});
