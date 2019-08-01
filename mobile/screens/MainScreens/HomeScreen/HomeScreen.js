import React, { Component } from "react";
import { View, Text } from "react-native";
import CardList from "../../../src/components/Card/CardList";
import { connect } from "react-redux";
import MainText from "../../../src/components/MainText/MainText";
import { getUserStorage } from "../../../src/AsyncStorage";
import { AuthTabs } from "../../MainTabs";
import AsyncStorage from "@react-native-community/async-storage";

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: ""
    };
  }
  async componentDidMount() {
    try {
      let username = await getUserStorage();
      if (username.err) throw new Error();
      else {
        this.setState({
          username: username.value
        });
      }
    } catch {
      AsyncStorage.clear();
      AuthTabs();
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MainText>{this.state.username}</MainText>
        </View>
        <CardList />
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user.username
  };
};
export default connect(
  mapStateToProps,
  null
)(HomeScreen);
