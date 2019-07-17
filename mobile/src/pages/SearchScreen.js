import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Search</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1
  }
});
