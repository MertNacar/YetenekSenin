import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
class UpdateInformationScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text> {this.props.getUser.username} </Text>
      </View>
    );
  }
}

/*mapDispatchToProps = dispatch => {
    return {
      viewUser: userView => dispatch(viewUser(userView))
    };
  };*/

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};

export default connect(mapStateToProps)(UpdateInformationScreen);
