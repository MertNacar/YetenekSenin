import React ,{ Component } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import Navigate from "./src/components/Navigate/Navigate";
import {LoginScreen,SignUpScreen} from "./src/pages/index";

export default class App extends Component {
  constructor() {
    super();
    state = {};
  }

  render() {
    return (
      <LoginScreen />
    );
  }
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});*/
