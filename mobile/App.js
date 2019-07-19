import React, { Component } from "react";
import { ActivityIndicator, View, Text } from "react-native";

import { LoginScreen, SignUpScreen } from "./src/pages/index";

export default class App extends Component {
  constructor() {
    super();
    state = {};
  }

  render() {
    return <SignUpScreen />;
  }
}
