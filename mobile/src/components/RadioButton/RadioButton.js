import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
export default class RadioButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.rowSingle} onPress={this.props.onPress}>
        <View style={[styles.flex4, this.props.inputContainerStyle]}>
          <Text>{this.props.text}</Text>
        </View>
        <View style={[styles.row, this.props.inputContainerStyle]}>
          <View style={[styles.button, this.props.buttonContainerStyle]}>
            <View
              style={[
                styles.checkedButton,
                this.props.checkedButtonStyle,
                { backgroundColor: this.props.selected }
              ]}
            ></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
