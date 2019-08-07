import React from "react";
import { View, TextInput } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";

const InputHandler = props => {
  return (
    <View>
      <View styles={styles.container}>
        <View style={styles.icon}> 
          <Icon size={22} name={props.icon} />
          </View>
        <TextInput
          secureTextEntry={props.secureTextEntry}
          style={[styles.inputHandler, props.style]}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={[styles.inputBar, props.styleBar]} />
    </View>
  );
};

export default InputHandler;
