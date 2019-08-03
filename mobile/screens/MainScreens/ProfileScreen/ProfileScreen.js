import React, { Component } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthTabs } from "../../MainTabs";
import MainText from "../../../src/components/MainText/MainText";
import {connect} from 'react-redux'
class ProfileScreen extends Component {
  render() {
    let user = this.props.getUser;
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
          <MainText>Birthday : {user.Birthday}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>loginDate : {user.loginDate}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="Cıkıs Yap"
            onPress={() => {
              AsyncStorage.clear();
              AuthTabs();
            }}
          />
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
