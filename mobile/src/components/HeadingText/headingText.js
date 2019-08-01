import React from "react";
import { Text } from "react-native";
import styles from "./styles";
const HeadingText = props => {
  return (
    <Text style={[styles.textHeadingLogin, props.style]}>{props.children}</Text>
  );
};

export default HeadingText;
