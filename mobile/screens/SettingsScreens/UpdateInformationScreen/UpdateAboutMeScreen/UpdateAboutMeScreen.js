import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { editUser } from "../../../../src/store/user/userActionCreator";
class UpdateAboutMeScreen extends Component {
  render() {
    return (
      <View>
        <Text> UpdateAbout </Text>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};
mapDispatchToProps = dispatch => {
  return {
    editUser: user => dispatch(editUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateAboutMeScreen);
