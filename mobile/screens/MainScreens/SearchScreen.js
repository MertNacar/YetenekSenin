import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "../../src/styles/styles";

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.containerSearch}>
        <Text>Search</Text>
      </View>
    );
  }
}
