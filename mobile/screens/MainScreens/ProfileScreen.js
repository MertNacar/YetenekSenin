import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthTabs } from "./MainScreens";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Button
          title="Cıkıs Yap"
          onPress={() => {
            AsyncStorage.clear();
            AuthTabs();
          }}
        />
      </View>
    );
  }
}
