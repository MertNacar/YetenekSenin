import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons";
import { editUser } from "../../../../src/store/user/userActionCreator";
import styles from "./styles";
import { COLOR_PRIMARY } from "../../../../src/styles/const";
import { validateRegex, usernameRegex } from "../../../../RegExp/regex";
class UpdateAboutMeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutMe: "this.props.getUser.aboutMe", 
      aboutMeColor: COLOR_PRIMARY
    };
  }

  InputHandler = aboutMe => {
    let validate = validateRegex(usernameRegex, input);
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
    let opacity = validate ? 1.0 : 0.2;
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
            style={{ opacity }}
            disabled={!validate}
            //onPress={() => this.goUpdatePage("UpdateTalentScreen")}
            title="Kaydet"
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
