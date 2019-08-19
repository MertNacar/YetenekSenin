import React, { Component } from "react";
import { Text, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import { Navigation } from "react-native-navigation";
import * as Http from "../../../utils/httpHelper";
import options from "./options";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
class AddVideoScreen extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  AddVideo = async () => {
    let data = {
      username: "HiatusGG",
      talentName: "Dans",
      subTalentName: "Vals",
      video: {
        videoDescription: "desc",
        videoTitle: "nab",
        videoPath: "gsda",
        videoWatchCount: 0
      }
    };
    let token = this.props.getUser.token;
    try {
      let result = await Http.post("/video/add", data, token);
      if (result.err) throw new Error();
      else console.log("başarılı");
    } catch(err) {
      console.log("başarısız",err.message);
    }
  };
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
        <Button title="video ekle" onPress={() => this.AddVideo()} />
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};
export default connect(mapStateToProps)(AddVideoScreen);
