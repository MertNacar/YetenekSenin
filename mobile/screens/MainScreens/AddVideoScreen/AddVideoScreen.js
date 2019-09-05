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
      talents: [],
      subTalents: [],
      pickerEnabled: false,
      uri: null,
      isNull: true,
      data: {
        fUserID: this.props.getUser.userID,
        videoDescription: null,
        videoTitle: null,
        fVTalentID: null,
        fVSubTalentID: null,
      },
      colors: {
        subTalentColor: COLOR_PRIMARY,
        talentColor: COLOR_PRIMARY,
        videoTitleColor: COLOR_PRIMARY,
        videoDescriptionColor: COLOR_PRIMARY
      }
    };
    // Navigation.events().bindComponent(this);
  }

  async componentDidMount() {
    try {
      let talents = await Http.getWithoutToken("/signup/talent");
      if (talents.err) throw new Error();
      else {
        this.setState({
          talents: [...talents.data]
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

  pickerTalentHandler = async itemID => {
    let { colors, data } = this.state;
    try {
      if (itemID !== 0) {
        let subTalents = await Http.postWithoutToken(
          "/signup/subTalent",
          itemID
        );
        if (subTalents.err) throw new Error();
        else {
          this.setState({
            colors: { ...colors, talentColor: "green" },
            data: { ...data, fVTalentID: itemID },
            subTalents: [...subTalents.data],
            pickerEnabled: true
          });
        }
      } else throw new Error();
    } catch {
      this.setState({
        data: { ...data, fVTalentID: 0 },
        colors: { ...colors, talentColor: COLOR_PRIMARY },
        pickerEnabled: false
      });
    }
  };

  pickerSubTalentHandler = itemID => {
    let { colors, data } = this.state;
    if (itemID !== 0) {
      this.setState({
        data: { ...data, fVSubTalentID: itemID },
        colors: { ...colors, subTalentColor: "green" }
      });
    } else {
      this.setState({
        data: { ...data, fVSubTalentID: 0 },
        colors: { ...colors, subTalentColor: COLOR_PRIMARY }
      });
    }
  };

  AddVideo = async () => {
    let { data, uri, token } = this.state;
    data.videoPath = uri;
    try {
      let res = await Http.post("/video/add", data, token);
      console.log("res",res)
      if (res.err) throw new Error();
      //Navigation.pop()
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

  render() {
    let {
      isNull,
      uri,
      colors,
      data,
      talents,
      subTalents,
      pickerEnabled
    } = this.state;
    let display = isNull === true ? "none" : "flex";
    let videoBorderColor = uri !== null ? "green" : "red";
    let talentItems = talents.map((item, index) => {
      return (
        <Picker.Item
          key={index}
          label={item.talentName}
          value={item.talentID}
        />
      );
    });
    let subTalentItems = subTalents.map((item, index) => {
      return (
        <Picker.Item
          key={index}
          label={item.subTalentName}
          value={item.subTalentID}
        />
      );
    });
    let validate =
      videoBorderColor === "green" &&
      colors.videoTitleColor === "green" &&
      colors.videoDescriptionColor === "green" &&
      colors.talentColor === "green" &&
      colors.subTalentColor === "green"
        ? true
        : false;
    /*console.warn(uri);
    console.warn("null", isNull);*/
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
              borderColor: colors.talentColor
            }}
          >
            <Picker
              style={{ flex: 1 }}
              selectedValue={data.fVTalentID}
              onValueChange={itemID => this.pickerTalentHandler(itemID)}
            >
              <Picker.Item label="Branş Seçiniz" value={0} />
              {talentItems}
            </Picker>
          </View>

          <View
            style={{
              flex: 2,
              width: "75%",
              justifyContent: "center",

              borderBottomWidth: 2,
              borderColor: colors.subTalentColor
            }}
          >
            <Picker
              enabled={pickerEnabled}
              selectedValue={data.fVSubTalentID}
              onValueChange={itemID => this.pickerSubTalentHandler(itemID)}
            >
              <Picker.Item label="Alt Branş Seçiniz" value={0} />
              {subTalentItems}
            </Picker>
          </View>
        </View>

        <Video
          source={{ uri }}
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
