import React, { Component } from "react";
import { View, Button } from "react-native";
import MainText from "../../../src/components/MainText/MainText";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  navigationButtonPressed(event) {
    Navigation.mergeOptions(event.componentId, {
      sideMenu: {
        right: {
          visible: true
        }
      }
    });
  }
  render() {
    let user = this.props.getUser;
    console.log(user)
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MainText>username : {user.username}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>firstname : {user.firstname}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>surname : {user.surname}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>email : {user.email}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>city : {user.city}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>phone : {user.phone}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>aboutMe : {user.aboutMe}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>socialMedia : {user.socialMedia}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>Birthday : {user.birthday}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>loginDate : {user.loginDate}</MainText>
        </View>
        <View style={{ flex: 1 }}> 
        </View>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};
export default connect(mapStateToProps)(ProfileScreen);
