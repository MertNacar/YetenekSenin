import React, { Component } from "react";
import { TextInput } from "react-native";
import styles from "../../styles/styles";

const InputHandler = props => {
  return (
    <TextInput
      secureTextEntry={props.secureTextEntry}
      style={[styles.inputHandler, props.style]}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      underlineColorAndroid="transparent"
    />
  );
};

export default InputHandler;
