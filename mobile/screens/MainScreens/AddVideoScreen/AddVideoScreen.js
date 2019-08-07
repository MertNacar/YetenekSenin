import React, { Component } from "react";
import { Text, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import { Navigation } from "react-native-navigation";
import options from './options'

export default class AddVideoScreen extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    ImagePicker.showImagePicker(options, response => {
      console.warn("Response = ", response);

      if (response.didCancel) {
        console.warn("User cancelled image picker");
      } else if (response.error) {
        console.warn("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
    return (
      <View>
        <Text> ADD VIDEO SCREEN </Text>
      </View>
    );
  }
}
