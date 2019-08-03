import React, { Component } from "react";
import { View } from "react-native";
import CardList from "../../../src/components/Card/CardList";
import { connect } from "react-redux";
import MainText from "../../../src/components/MainText/MainText";

class HomeScreen extends Component {
  render() {
    let user = this.props.getUser;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MainText>{user.username}</MainText>
        </View>
        <CardList />
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};
export default connect(mapStateToProps)(HomeScreen);
