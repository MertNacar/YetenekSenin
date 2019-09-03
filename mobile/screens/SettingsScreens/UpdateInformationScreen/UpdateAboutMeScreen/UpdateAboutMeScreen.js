import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { editUser } from "../../../../src/store/user/userActionCreator";
import styles from "./styles";
import { COLOR_PRIMARY } from "../../../../src/styles/const";
import { validateRegex, aboutMeRegex } from "../../../../RegExp/regex";
import { Navigation } from "react-native-navigation";
class UpdateAboutMeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutMe: this.props.getUser.aboutMe,
      aboutMeColor: "green"
    };
  }

  saveAboutMe = () => {
    let { aboutMe } = this.state;
    let newUser = { ...this.props.getUser, aboutMe };
    this.props.editUser(newUser);
    Navigation.pop("ProfileScreen");
  };

  InputHandler = aboutMe => {
    console.log("ABOUT", aboutMe);
    let validate = validateRegex(aboutMeRegex, aboutMe);
    if (validate) {
      this.setState({
        aboutMe,
        aboutMeColor: "green"
      });
    } else
      this.setState({
        aboutMe,
        aboutMeColor: "red"
      });
  };

  render() {
    let { aboutMe, aboutMeColor } = this.state;
    let validate = aboutMeColor === "green" ? true : false;
    return (
      <View style={styles.container}>
        <View style={styles.rowSingle}>
          <Input
            maxLength={240}
            textAlignVertical="top"
            multiline={true}
            placeholder="About Me"
            value={aboutMe}
            underlineColorAndroid="transparent"
            leftIcon={
              <Icon name="address-card" size={24} color={COLOR_PRIMARY} />
            }
            inputStyle={{ paddingLeft: 15, fontSize: 15 }}
            inputContainerStyle={{
              borderColor: aboutMeColor
            }}
            onChangeText={value => this.InputHandler(value)}
          />
        </View>
        <View style={styles.button}>
          <Button
            style={{ opacity: 1 }}
            disabledStyle={{ opacity: 0.3, backgroundColor: COLOR_PRIMARY }}
            disabled={!validate}
            onPress={() => this.saveAboutMe("UpdateTalentScreen")}
            title="Bitti"
          />
        </View>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};
mapDispatchToProps = dispatch => {
  return {
    editUser: user => dispatch(editUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateAboutMeScreen);
