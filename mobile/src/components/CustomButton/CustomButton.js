import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "../../styles/styles";

const CustomButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.button, props.style]}>
        <Text> {props.children} </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
