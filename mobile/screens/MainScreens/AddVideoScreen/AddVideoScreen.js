import React, { Component } from "react";
import { Text, View, Picker } from "react-native";
import ImagePicker from "react-native-image-picker";
import { Navigation } from "react-native-navigation";
import * as Http from "../../../utils/httpHelper";
import options from "./options";
import { connect } from "react-redux";
import { Button, Input } from "react-native-elements";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import Video from "react-native-video";
import { COLOR_PRIMARY } from "../../../src/styles/const";
import { validateRegex, aboutMeRegex } from "../../../RegExp/regex";
class AddVideoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.getUser.token,
      competitions: [],
      data: {
        videoDescription: null,
        videoTitle: null,
        videoPath: null
      },
      userCompetition: {
        competitionID: 0,
        userID: this.props.getUser.userID,
      },
      colors: {
        subTalentColor: COLOR_PRIMARY,
        competitionColor: COLOR_PRIMARY,
        videoTitleColor: COLOR_PRIMARY,
        videoDescriptionColor: COLOR_PRIMARY
      }
    };
    Navigation.events().bindComponent(this);
  }

  async componentDidAppear() {
    try {
      let { token, userCompetition } = this.state
      let data = await Http.get(`/video/competitions?userID=${userCompetition.userID}`, token);
      if (data.err) throw new Error();
      else {
        this.setState({
          competitions: [...data.competitions]
        });
      }
    } catch {
      return;
    }
  }

  InputHandler = (input, inputName, inputColor) => {
    let { data, colors } = this.state;
    let validate = validateRegex(aboutMeRegex, input);
    if (validate) {
      this.setState({
        data: { ...data, [inputName]: input },
        colors: { ...colors, [inputColor]: "green" }
      });
    } else this.setState({ colors: { ...colors, [inputColor]: "red" } });
  };

  pickerCompetitionHandler = async itemID => {
    let { colors, userCompetition } = this.state;
    try {
      if (itemID !== 0) {
        this.setState({
          userCompetition: { ...userCompetition, competitionID: itemID },
          colors: { ...colors, competitionColor: "green" },
        });
      } else throw new Error();
    } catch {
      this.setState({
        userCompetition: { ...userCompetition, competitionID: 0 },
        colors: { ...colors, competitionColor: COLOR_PRIMARY },
      });
    }
  };

  AddVideo = async () => {
    try {
      let { data, userCompetition, token } = this.state;
      let video = { data, userCompetition };
      let res = await Http.post("/video/add", video, token);
      if (res.err) throw new Error();
      else {
        this.setState({
          competitions: [],
          userCompetition: {
            competitionID: 0,
            userID: this.props.getUser.userID,
          },
          colors: {
            subTalentColor: COLOR_PRIMARY,
            competitionColor: COLOR_PRIMARY,
            videoTitleColor: COLOR_PRIMARY,
            videoDescriptionColor: COLOR_PRIMARY
          }
        })
      }
    } catch (err) {
      console.log("başarısız", err.message);
    }
  };

  launchCamera = () => {
    let { data } = this.state
    ImagePicker.launchCamera(options, response => {
      // Same code as in above section!
      console.warn("Response = ", response);
      if (response.didCancel) {
        //console.warn("User cancelled image picker");
      } else if (response.error) {
        //console.warn("ImagePicker Error: ", response.error);
      } else {
        this.setState({
          data: { ...data, videoPath: response.uri },
        });
      }
    });
  };

  openGallery = () => {
    let { data } = this.state
    ImagePicker.launchImageLibrary(options, response => {
      console.warn("Response = ", response);
      if (response.didCancel) {
        //console.warn("User cancelled image picker");
      } else if (response.error) {
        //console.warn("ImagePicker Error: ", response.error);
      } else {
        this.setState({
          data: { ...data, videoPath: response.uri },
        });
      }
    });
  };

  render() {
    let {
      colors,
      data,
      competitions,
      userCompetition
    } = this.state;
    let videoBorderColor = data.videoPath !== null ? "green" : "red";
    let competitionItems = competitions.map((item, index) => {
      return (
        <Picker.Item
          key={index}
          label={item.competitionTitle}
          value={item.competitionID}
        />
      );
    });
    let validate =
      videoBorderColor === "green" &&
        colors.videoTitleColor === "green" &&
        colors.videoDescriptionColor === "green" &&
        colors.competitionColor === "green"
        ? true
        : false;
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
        <View style={styles.inputRow}>
          <Input
            placeholder="Başlık"
            underlineColorAndroid="transparent"
            inputContainerStyle={{
              borderColor: colors.videoTitleColor
            }}
            onChangeText={videoTitle =>
              this.InputHandler(videoTitle, "videoTitle", "videoTitleColor")
            }
          />
        </View>
        <View style={styles.inputRow}>
          <Input
            /* maxLength={60}
            textAlignVertical="top"
            multiline={true}*/
            placeholder="Açıklama"
            underlineColorAndroid="transparent"
            inputContainerStyle={{
              borderColor: colors.videoDescriptionColor
            }}
            onChangeText={videoDescription =>
              this.InputHandler(
                videoDescription,
                "videoDescription",
                "videoDescriptionColor"
              )
            }
          />
        </View>
        <View style={{ flex: 2, alignItems: "center" }}>
          <View
            style={{
              flex: 2,
              width: "75%",
              justifyContent: "center",
              borderBottomWidth: 2,
              borderColor: colors.competitionColor
            }}
          >
            <Picker
              style={{ flex: 1 }}
              selectedValue={userCompetition.competitionID}
              onValueChange={itemID => this.pickerCompetitionHandler(itemID)}
            >
              <Picker.Item label="Yarışma Seçiniz" value={0} />
              {competitionItems}
            </Picker>
          </View>
        </View>

        <Video
          source={{ uri: data.videoPath }}
          repeat={true}
          style={[styles.video, { borderColor: videoBorderColor }]}
          resizeMode="cover"
        />

        <Button
          title="video ekle"
          style={{ opacity: 1 }}
          disabledStyle={{ opacity: 0.3, backgroundColor: COLOR_PRIMARY }}
          disabled={!validate}
          onPress={() => this.AddVideo()}
        />
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
