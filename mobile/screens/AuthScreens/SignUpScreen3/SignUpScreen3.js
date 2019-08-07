import React, { Component } from "react";
import { View, Platform } from "react-native";
import {
  storeTokenStorage,
  storeUserStorage
} from "../../../src/AsyncStorage/index";
import * as Http from "../../../utils/httpHelper";
import HeadingText from "../../../src/components/HeadingText/headingText";
import MainText from "../../../src/components/MainText/MainText";
import { MainTabs } from "../../MainTabs";
import styles from "./styles";
import CustomButton from "../../../src/components/CustomButton/CustomButton";
import { connect } from "react-redux";
import { addUser } from "../../../src/store/user/userActionCreator";
import { passwordRegex, validateRegex } from "../../../RegExp/regex";
import { COLOR_PRIMARY } from "../../../src/styles/const";
import Icon from "react-native-vector-icons/Ionicons";
import { Input } from "react-native-elements";
class SignUpScreen3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        password: "",
        confirmPassword: "",
        birthday: "2012-02-21 18:10:00.000"
      },
      colors: {
        passwordColor: COLOR_PRIMARY,
        confirmPasswordColor: COLOR_PRIMARY
      },
      err: null
    };
  }

  post = async () => {
    try {
      let user = { ...this.props.getUser, ...this.state.data };
      delete user.confirmPassword;
      let data = await Http.postWithoutToken("/signup/", user);
      if (data === null || data.err) throw new Error();
      else {
        let storeUser = await storeUserStorage(data.user.username);
        let storeToken = await storeTokenStorage(data.user.token);
        if (storeToken.err || storeUser.err) {
          throw new Error();
        } else {
          this.props.addUser(user);
          MainTabs();
        }
      }
    } catch (err) {
      this.setState({ err: true });
    }
  };

  passwordHandler = input => {
    let { data, colors } = this.state;
    let validate = validateRegex(passwordRegex, input);
    if (validate) {
      this.setState({
        data: { ...data, password: input },
        colors: { ...colors, passwordColor: "green" }
      });
    } else this.setState({ colors: { ...colors, passwordColor: "red" } });
  };

  verifyPassword = input => {
    let { data, colors } = this.state;
    if (input === data.password) {
      this.setState({
        data: { ...data, confirmPassword: input },
        colors: { ...colors, confirmPasswordColor: "green" }
      });
    } else
      this.setState({ colors: { ...colors, confirmPasswordColor: "red" } });
  };

  render() {
    let icon = Platform.OS === "android" ? "md-lock" : "ios-lock";
    let { err, colors } = this.state;
    let validate =
      colors.passwordColor === "green" &&
      colors.confirmPasswordColor === "green";

    let isClickable = validate ? true : false;
    let opacity = validate ? 1.0 : 0.2;
    return (
      <View style={styles.containerLogin}>
        <View style={[styles.errMessage, { display: err ? "flex" : "none" }]}>
          <MainText style={{ color: "red" }}>
            Kayıt olamadınız lütfen tekrar deneyiniz.
          </MainText>
        </View>

        <View style={styles.SignUpform}>
          <Input
            secureTextEntry={true}
            inputContainerStyle={{
              borderColor: colors.passwordColor
            }}
            inputStyle={{ paddingLeft: 20, fontSize: 16 }}
            leftIcon={<Icon name={icon} size={24} color={COLOR_PRIMARY} />}
            underlineColorAndroid="transparent"
            placeholder="Şifre"
            onChangeText={password => this.passwordHandler(password)}
          />

          <MainText>
            *En az 1 büyük ve küçük harf, 1 sayı ve 1 özel karakterden oluşan
            değer giriniz.
          </MainText>

          <Input
            secureTextEntry={true}
            inputContainerStyle={{
              borderColor: colors.confirmPasswordColor
            }}
            inputStyle={{ paddingLeft: 20, fontSize: 16 }}
            leftIcon={<Icon name={icon} size={24} color={COLOR_PRIMARY} />}
            underlineColorAndroid="transparent"
            placeholder="şifre tekrar"
            onChangeText={confirmPassword =>
              this.verifyPassword(confirmPassword)
            }
          />
        </View>
        <View style={styles.flex1}>
          <CustomButton
            style={{ opacity }}
            disabled={!isClickable}
            onPress={this.post}
          >
            Kaydol
          </CustomButton>
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
    addUser: user => dispatch(addUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen3);
