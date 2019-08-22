import React, { Component } from "react";
import { Text, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import { Navigation } from "react-native-navigation";
import * as Http from "../../../utils/httpHelper";
import options from "./options";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import Video from "react-native-video";
class AddVideoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: "source",
      isNull: true
    };
    // Navigation.events().bindComponent(this);
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
    } catch (err) {
      console.log("başarısız", err.message);
    }
  };

  launchCamera = () => {
    ImagePicker.launchCamera(options, response => {
      // Same code as in above section!
      console.warn("Response = ", response);
      if (response.didCancel) {
        //console.warn("User cancelled image picker");
      } else if (response.error) {
        //console.warn("ImagePicker Error: ", response.error);
      } else {
        this.setState({
          uri: response.uri,
          isNull: false
        });
      }
    });
  };

  openGallery = () => {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        //console.warn("User cancelled image picker");
      } else if (response.error) {
        //console.warn("ImagePicker Error: ", response.error);
      } else {
        this.setState({
          uri: response.uri,
          isNull: false
        });
      }
    });
  };

  render() {
    let { isNull, uri } = this.state;
    let display = isNull === true ? "none" : "flex";
    console.warn(uri);
    console.warn("null", isNull);
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button
            titleStyle={{ marginHorizontal: 5 }}
            title="Çek"
            icon={<Icon name="camera-retro" size={22} color="white" />}
            onPress={() => this.launchCamera()}
          />
          <Button
            titleStyle={{ marginHorizontal: 5 }}
            title="Yükle"
            icon={<Icon name="film" size={22} color="white" />}
            onPress={() => this.openGallery()}
          />
        </View>
        <View style={display}>
          <Video
            source={{ uri: uri }}
            repeat={true}
            style={styles.video}
            resizeMode="cover"
          />
        </View>

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
