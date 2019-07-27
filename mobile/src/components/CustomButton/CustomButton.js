import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "../../styles/styles";

const CustomButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.4} disabled={props.disabled} onPress={props.onPress}>
      <View style={[styles.button, props.style]}>
        <Text style={styles.mainText}> {props.children} </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
