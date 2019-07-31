import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { getTokenStorage } from "../../src/AsyncStorage/index";
import styles from "../../src/styles/styles";
import * as Http from "../../utils/httpHelper";
import { MainTabs, AuthTabs, InitScreen } from "../AllScreens";
import { connect } from "react-redux";
import { addUser } from "../../src/store/actions/actionCreators";

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
      let getData = await getTokenStorage();
      if (getData.err) AuthTabs();
      else {
        let data = await Http.post("/login/immediately/", {}, getData.value);
        if (data.err) AuthTabs();
        else {
          //this.props.addUser();
          MainTabs();
        }
      }
    } catch {
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
