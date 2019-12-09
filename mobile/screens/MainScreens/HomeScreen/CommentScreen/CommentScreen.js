import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from 'react-native'
class CommentScreen extends Component {
  render() {
    return (
      <View>
        <Text>Comment</Text>
        <Text>Comment</Text>
        <Text>Comment</Text>
        <Text>Comment</Text>
        <Text>Comment</Text>
        <Text>Comment</Text>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};
export default connect(mapStateToProps)(CommentScreen);
