import React from "react";
import { Text } from "react-native";
import styles from "./styles";

const mainText = props => {
  return <Text style={[styles.mainText, props.style]}>{props.children}</Text>;
};

export default mainText;
