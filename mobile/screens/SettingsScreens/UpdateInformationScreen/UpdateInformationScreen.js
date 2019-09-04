import React, { Component } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { Input, Avatar, Button } from "react-native-elements";
import * as Http from "../../../utils/httpHelper";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";
import MainText from "../../../src/components/MainText/MainText";
import {
  COLOR_PRIMARY,
  COLOR_BACKGROUND,
  COLOR_PINK
} from "../../../src/styles/const";
import {
  usernameRegex,
  emailRegex,
  nameRegex,
  validateRegex
} from "../../../RegExp/regex";
import { Navigation } from "react-native-navigation";
import { editUser } from "../../../src/store/user/userActionCreator";
class UpdateInformationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldUser: this.props.getUser,
      oldUsername: this.props.getUser.username,
      oldEmail: this.props.getUser.email,
      user: this.props.getUser,
      colors: {
        firstnameColor: COLOR_PRIMARY,
        surnameColor: COLOR_PRIMARY,
        usernameColor: COLOR_PRIMARY,
        emailColor: COLOR_PRIMARY
      }
    };

    Navigation.events().bindComponent(this);
  }

  async componentDidAppear() {
    this.setState({ user: this.props.getUser });
  }

  // YAPILACAK
  editProfilePost = async () => {
    try {
      let { user } = this.state;
      let token = user.token;
      delete user.token;
      delete user.loginDate;
      let data = await Http.put("/profile/update/all", user, token);
      if (data == null || data.err) throw new Error();
      else {
        user.token = token;
        this.props.editUser(user);
        Navigation.pop("ProfileScreen");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // YAPILACAK
  cancelProfilePost = () => {
    let { oldUser } = this.state;
    this.props.editUser(oldUser);
    Navigation.pop("ProfileScreen");
  };

  goUpdatePage = screenID => {
    let { user } = this.state;
    console.log("updateki user", user);
    console.log("update öncesi state", this.props.getUser);
    this.props.editUser(user);
    console.log("update sonrası state", this.props.getUser);

    Navigation.push("ProfileScreen", {
      component: {
        id: screenID,
        name: `yeteneksenin.screens.${screenID}`,
        options: {
          bottomTab: {
            visible: false
          },
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  };

  InputHandlerUsernameEmail = async (
    typeRegex,
    input,
    inputName,
    inputColor
  ) => {
    let { colors, user, oldUsername, oldEmail } = this.state;
    let validate = validateRegex(typeRegex, input);
    try {
      if (input === oldUsername || input === oldEmail) {
        this.setState({
          user: { ...user, [inputName]: input },
          colors: { ...colors, [inputColor]: "green" }
        });
      } else if (validate) {
        let confirm = await Http.postWithoutToken(
          `/signup/validate/${inputName}`,
          input
        );
        if (!confirm.err) {
          this.setState({
            user: { ...user, [inputName]: input },
            colors: { ...colors, [inputColor]: "green" }
          });
        } else throw new Error();
      } else throw new Error();
    } catch {
      this.setState({ colors: { ...colors, [inputColor]: "red" } });
    }
  };

  InputHandler = (typeRegex, input, inputName, inputColor) => {
    let { user, colors } = this.state;
    let validate = validateRegex(typeRegex, input);
    if (validate) {
      this.setState({
        user: { ...user, [inputName]: input },
        colors: { ...colors, [inputColor]: "green" }
      });
    } else this.setState({ colors: { ...colors, [inputColor]: "red" } });
  };

  render() {
    let { user, colors } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          enabled={false}
          behavior="padding"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Avatar
                rounded
                source={{
                  uri: user.profilePhoto
                }}
                size="large"
                title="YS"
                showEditButton
                onPress={() => console.warn("Profile Photo Works!")}
              />
            </View>

            <View style={styles.body}>
              <View style={styles.info}>
                <MainText style={styles.infoWords}>Kişisel Bilgiler</MainText>
              </View>
              <View style={styles.row}>
                <Input
                  containerStyle={{ width: "50%" }}
                  placeholder="İsim"
                  underlineColorAndroid="transparent"
                  leftIcon={
                    <Icon name="user-circle" size={24} color={COLOR_PRIMARY} />
                  }
                  inputStyle={{ paddingLeft: 15, fontSize: 15 }}
                  inputContainerStyle={{
                    borderColor: colors.firstnameColor
                  }}
                  onChangeText={firstname =>
                    this.InputHandler(
                      nameRegex,
                      firstname,
                      "firstname",
                      "firstnameColor"
                    )
                  }
                >
                  {user.firstname}
                </Input>

                <Input
                  containerStyle={{ width: "45%" }}
                  placeholder="Soyad"
                  underlineColorAndroid="transparent"
                  inputStyle={{ paddingLeft: 15, fontSize: 15 }}
                  inputContainerStyle={{
                    borderColor: colors.surnameColor
                  }}
                  onChangeText={surname =>
                    this.InputHandler(
                      nameRegex,
                      surname,
                      "surname",
                      "surnameColor"
                    )
                  }
                >
                  {user.surname}
                </Input>
              </View>
              <View style={styles.row}>
                <Input
                  containerStyle={{ width: "70%" }}
                  placeholder="Kullanıcı Adı"
                  underlineColorAndroid="transparent"
                  leftIcon={
                    <Icon name="id-card" size={24} color={COLOR_PRIMARY} />
                  }
                  inputStyle={{ paddingLeft: 15, fontSize: 15 }}
                  inputContainerStyle={{
                    borderColor: colors.usernameColor
                  }}
                  onChangeText={username =>
                    this.InputHandlerUsernameEmail(
                      usernameRegex,
                      username,
                      "username",
                      "usernameColor"
                    )
                  }
                >
                  {user.username}
                </Input>
                <View
                  style={{
                    width: "25%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    paddingTop: 25
                  }}
                >
                  <Button
                    onPress={() => this.goUpdatePage("UpdateGenderScreen")}
                    buttonStyle={{
                      borderWidth: 1,
                      borderColor: COLOR_PRIMARY,
                      backgroundColor: COLOR_BACKGROUND
                    }}
                    icon={
                      <Icon name="venus-mars" color={COLOR_PRIMARY} size={28} />
                    }
                  />
                </View>
              </View>
              <View style={styles.rowSingle}>
                <Input
                  containerStyle={styles.singleInput}
                  placeholder="Email"
                  underlineColorAndroid="transparent"
                  leftIcon={
                    <Icon name="envelope" size={24} color={COLOR_PRIMARY} />
                  }
                  inputStyle={{ paddingLeft: 15, fontSize: 15 }}
                  inputContainerStyle={{
                    borderColor: colors.emailColor
                  }}
                  onChangeText={email =>
                    this.InputHandlerUsernameEmail(
                      emailRegex,
                      email,
                      "email",
                      "emailColor"
                    )
                  }
                >
                  {user.email}
                </Input>
              </View>

              <View style={styles.button}>
                <Button
                  onPress={() => this.goUpdatePage("UpdateOtherScreen")}
                  icon={<Icon name="bars" size={15} color="white" />}
                  titleStyle={{ marginLeft: 7 }}
                  title="Diğer Bilgiler"
                />
              </View>

              <View style={styles.button}>
                <Button
                  onPress={() => this.goUpdatePage("UpdateTalentScreen")}
                  icon={<Icon name="futbol" size={15} color="white" />}
                  titleStyle={{ marginLeft: 7 }}
                  title="Yeteneğini Değiştir"
                />
              </View>

              <View style={styles.button}>
                <Button
                  onPress={() => this.goUpdatePage("UpdateAboutMeScreen")}
                  icon={<Icon name="address-card" size={15} color="white" />}
                  titleStyle={{ marginLeft: 7 }}
                  title="Hakkımda"
                />
              </View>

              <View style={styles.rowItems}>
                <Button
                  onPress={() => this.cancelProfilePost()}
                  buttonStyle={{ backgroundColor: "red", width: "90%" }}
                  title="İptal"
                />

                <Button
                  onPress={() => this.editProfilePost()}
                  buttonStyle={{ backgroundColor: "green", width: "90%" }}
                  title="Kaydet"
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
)(UpdateInformationScreen);

/* <View style={styles.button}>
              <Button
                onPress={() => this.editProfilePost()}
                buttonStyle={{ backgroundColor: "green" }}
                title="Kaydet"
              />
            </View>*/
