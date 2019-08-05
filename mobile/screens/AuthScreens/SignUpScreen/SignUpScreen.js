import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import InputHandler from "../../../src/components/InputHandler/InputHandler";
import {
  storeTokenStorage,
  storeUserStorage
} from "../../../src/AsyncStorage/index";
import * as Http from "../../../utils/httpHelper";
import HeadingText from "../../../src/components/HeadingText/headingText";
import MainText from "../../../src/components/MainText/MainText";
import { MainTabs } from "../../MainTabs";
import backgroundImage from "../../../src/assets/image.jpg";
import styles from "./styles";
import CustomButton from "../../../src/components/CustomButton/CustomButton";
import { connect } from "react-redux";
import { addUser } from "../../../src/store/user/userActionCreator";
import {
  emailRegex,
  passwordRegex,
  usernameRegex,
  nameRegex,
  validateRegex
} from "../../../RegExp/regex";

  class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        password: "",
        firstname: "",
        surname: "",
        email: "",
        birthday: "2012-02-21 18:10:00.000"
      },
      colors: {
        firstnameColor: "#29aaf4",
        surnameColor: "#29aaf4",
        usernameColor: "#29aaf4",
        passwordColor: "#29aaf4",
        emailColor: "#29aaf4"
      },
      err: null
    };
  }

  InputHandlerUsernameEmail = async (
    typeRegex,
    input,
    inputName,
    inputColor
  ) => {
    let validate = validateRegex(typeRegex, input);
    console.log("hey")
    try {
      if (validate) {
        console.log("hey2")
        console.log(inputName)
        let confirm = await Http.postWithoutToken(
          `/signup/validate/${inputName}`,
          input
        );
        console.log(validate)
        if (!confirm.err) {
          this.setState({
            data: { ...this.state.data, [inputName]: input },
            colors: { ...this.state.colors, [inputColor]: "green" }
          });
        } else throw new Error();
      } else throw new Error();
    } catch {
      this.setState({ colors: { ...this.state.colors, [inputColor]: "red" } });
    }
  };

  InputHandler = (typeRegex, input, inputName, inputColor) => {
    let validate = validateRegex(typeRegex, input);
    if (validate) {
      this.setState({
        data: { ...this.state.data, [inputName]: input },
        colors: { ...this.state.colors, [inputColor]: "green" }
      });
    } else
      this.setState({ colors: { ...this.state.colors, [inputColor]: "red" } });
  };

  post = async () => {
    try {
      let body = this.state.data;
      let data = await Http.postWithoutToken("/signup/", body);
      if (data === null || data.err) throw new Error();
      else {
        let storeUser = await storeUserStorage(body.username);
        let storeToken = await storeTokenStorage(data.user.token);
        if (storeToken.err || storeUser.err) {
          throw new Error();
        } else {
          this.props.addUser(data.user)
          MainTabs();
        }
      }
    } catch (err) {
      this.setState({ err: true });
    }
  };

  render() {
    let { err, colors } = this.state;
    let validate =
      colors.usernameColor === "green" &&
      colors.passwordColor === "green" &&
      colors.firstnameColor === "green" &&
      colors.surnameColor === "green" &&
      colors.emailColor === "green";
    let isClickable = validate ? true : false;
    let opacity = validate ? 1.0 : 0.2;
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.containerLogin}>
          <View style={styles.flex2}>
            <MainText>
              <HeadingText>SIGN UP</HeadingText>
            </MainText>
          </View>
          <View style={[styles.errMessage, { display: err ? "flex" : "none" }]}>
            <MainText style={{ color: "red" }}>
              Kayıt olamadınız lütfen tekrar deneyiniz.
            </MainText>
          </View>

          <View style={styles.SignUpform}>
            <InputHandler
              style={{ borderColor: this.state.colors.firstnameColor }}
              placeholder="Ad"
              onChangeText={firstname =>
                this.InputHandler(
                  nameRegex,
                  firstname,
                  "firstname",
                  "firstnameColor"
                )
              }
            />
            <InputHandler
              style={{ borderColor: this.state.colors.surnameColor }}
              placeholder="Soyad"
              onChangeText={surname =>
                this.InputHandler(nameRegex, surname, "surname", "surnameColor")
              }
            />
            <InputHandler
              style={{ borderColor: this.state.colors.usernameColor }}
              placeholder="Kullanıcı Adı"
              onChangeText={username =>
                this.InputHandlerUsernameEmail(
                  usernameRegex,
                  username,
                  "username",
                  "usernameColor"
                )
              }
            />
            <InputHandler
              style={{ borderColor: this.state.colors.passwordColor }}
              secureTextEntry={true}
              placeholder="Sifre"
              onChangeText={password =>
                this.InputHandler(
                  passwordRegex,
                  password,
                  "password",
                  "passwordColor"
                )
              }
            />
            <InputHandler
              style={{ borderColor: this.state.colors.emailColor }}
              placeholder="Email"
              onChangeText={email =>
                this.InputHandlerUsernameEmail(
                  emailRegex,
                  email,
                  "email",
                  "emailColor"
                )
              }
            />
          </View>
          <View style={styles.flex2}>
            <CustomButton
              style={{ opacity }}
              disabled={!isClickable}
              onPress={this.post}
            >
              Sign Up
            </CustomButton>
          </View>
        </View>
      </ImageBackground>
    );
  }
}


mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignUpScreen);