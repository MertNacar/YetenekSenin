import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import {
  storeTokenStorage,
  storeUserStorage
} from "../../../src/AsyncStorage/index";
import { MainTabs } from "../../MainTabs";
import styles from "./styles";
import * as Http from "../../../utils/httpHelper";
import { Navigation } from "react-native-navigation";
import HeadingText from "../../../src/components/HeadingText/headingText";
import MainText from "../../../src/components/MainText/MainText";
import LinkText from "../../../src/components/LinkText/LinkText";
import CustomButton from "../../../src/components/CustomButton/CustomButton";
import {
  passwordRegex,
  usernameRegex,
  validateRegex
} from "../../../RegExp/regex";
import { connect } from "react-redux";
import { addUser } from "../../../src/store/user/userActionCreator";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { COLOR_PRIMARY } from "../../../src/styles/const";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        password: ""
      },
      colors: {
        usernameColor: COLOR_PRIMARY,
        passwordColor: COLOR_PRIMARY
      },
      err: null
    };
  }

  post = async () => {
    let body = this.state.data;
    try {
      let data = await Http.postWithoutToken("/login/", body);
      console.log("data", data);
      if (data.err) throw new Error();
      else {
        let storeUser = await storeUserStorage(body.username);
        let storeToken = await storeTokenStorage(data.user.token);
        if (storeToken.err || storeUser.err) {
          throw new Error();
        } else {
          this.props.addUser(data.user);
          MainTabs();
        }
      }
    } catch (err) {
      console.log(err.message);
      this.setState({ err: true });
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

  goSignup = () => {
    Navigation.push(this.props.componentId, {
      component: {
        id: "SignUpScreen",
        name: "yeteneksenin.screens.SignUpScreen",
        options: {
          topBar: {
            visible: false,
            title: {
              text: "Yetenek Senin"
            }
          }
        }
      }
    });
  };
  render() {
    let { err, colors } = this.state;
    let validate =
      colors.usernameColor === "green" && colors.passwordColor === "green";
    let isClickable = validate ? true : false;
    let opacity = validate ? 1.0 : 0.2;
    if (err === null || err) {
      return (
        <View style={styles.containerLogin}>
          <View style={styles.flex1}>
            <MainText>
              <HeadingText>Log In</HeadingText>
            </MainText>
          </View>

          <View style={[styles.errMessage, { display: err ? "flex" : "none" }]}>
            <MainText style={{ color: "red" }}>
              Hatalı giriş yaptınız lütfen tekrar deneyiniz.
            </MainText>
          </View>

          <View style={styles.LoginForm}>
            <Input
              placeholder="Kullanıcı Adı"
              underlineColorAndroid="transparent"
              leftIcon={
                <Icon name="md-contact" size={24} color={COLOR_PRIMARY} />
              }
              inputStyle={{ paddingLeft: 20, fontSize: 16 }}
              inputContainerStyle={{
                borderColor: this.state.colors.usernameColor
              }}
              onChangeText={username =>
                this.InputHandler(
                  usernameRegex,
                  username,
                  "username",
                  "usernameColor"
                )
              }
            />
            <MainText>*En az 8 karakterden oluşan bir değer giriniz.</MainText>
            <Input
              secureTextEntry={true}
              placeholder="Sifre"
              underlineColorAndroid="transparent"
              inputStyle={{ paddingLeft: 20, fontSize: 16 }}
              leftIcon={<Icon name="md-lock" size={24} color={COLOR_PRIMARY} />}
              inputContainerStyle={{
                borderColor: this.state.colors.passwordColor
              }}
              onChangeText={password =>
                this.InputHandler(
                  passwordRegex,
                  password,
                  "password",
                  "passwordColor"
                )
              }
            />
            <MainText>
              *En az 1 büyük ve küçük harf, 1 sayı ve 1 özel karakterden oluşan
              değer giriniz.
            </MainText>
          </View>

          <View style={styles.flex1}>
            <CustomButton
              style={{ opacity }}
              disabled={!isClickable}
              onPress={this.post}
            >
              Log In
            </CustomButton>
            <LinkText onPress={this.goSignup}>
              Hala kayıt olmadınız mı ?
            </LinkText>
          </View>
        </View>
      );
    }
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
)(LoginScreen);
