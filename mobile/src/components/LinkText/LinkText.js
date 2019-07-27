import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../../styles/styles";

const LinkText = props => {
  return (
    <TouchableOpacity
      style={[styles.LinkView, props.style]}
      onPress={props.onPress}
    >
      <Text style={[styles.LinkText, props.style]}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default LinkText;
