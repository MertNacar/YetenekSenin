import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { getDataStorage } from "../../src/AsyncStorage/index";
import styles from "../../src/styles/styles";
import * as Http from "../../utils/httpHelper";
import { MainTabs, AuthTabs } from "../AllScreens";

export default class initScreen extends Component {
  render() {
    return (
      <View style={[styles.containerLogin, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  async componentDidMount() {
    try {
      let getData = await getDataStorage();
      if (getData.err) AuthTabs();
      else {
        let data = await Http.post("/login/immediately/", {}, getData.value);
        if (data.err) AuthTabs();
        else MainTabs();
      }
    } catch {
      AuthTabs();
    }
  }
}
