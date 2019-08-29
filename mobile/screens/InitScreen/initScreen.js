import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { getTokenStorage, getUserStorage } from "../../src/AsyncStorage/index";
import styles from "./styles";
import * as Http from "../../utils/httpHelper";
import { MainTabs, AuthTabs } from "../MainTabs";
import { connect } from "react-redux";
import { addUser } from "../../src/store/user/userActionCreator";

class initScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  async componentDidMount() {
    try {
      let token = await getTokenStorage();
      let username = await getUserStorage();
      if (token.err || username.err) AuthTabs();
      else {
        let data = await Http.post("/login/immediately/",username.value , token.value);
        console.log("ınıt",data)
        if (data.err) AuthTabs();
        else {
          this.props.addUser(data.user);
          MainTabs();
        }
      }
    } catch (err){
      console.log("ınıt err",err.message)
      AuthTabs();
    }
  }
}

mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(initScreen);
