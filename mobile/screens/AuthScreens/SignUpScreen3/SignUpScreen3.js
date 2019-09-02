import React, { Component } from "react";
import { View, Platform, DatePickerAndroid, DatePickerIOS } from "react-native";
import {
  storeTokenStorage,
  storeUserStorage
} from "../../../src/AsyncStorage/index";
import * as Http from "../../../utils/httpHelper";
import MainText from "../../../src/components/MainText/MainText";
import { MainTabs } from "../../MainTabs";
import styles from "./styles";
import CustomButton from "../../../src/components/CustomButton/CustomButton";
import { connect } from "react-redux";
import { addUser } from "../../../src/store/user/userActionCreator";
import { passwordRegex, validateRegex } from "../../../RegExp/regex";
import { COLOR_PRIMARY } from "../../../src/styles/const";
import Icon from "react-native-vector-icons/Ionicons";
import { Input, Button } from "react-native-elements";
import moment from "moment";

class SignUpScreen3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDay()
      },
      datePickerTitle: "Doğum günü",
      data: {
        password: "",
        confirmPassword: "",
        birthday: ""
      },
      colors: {
        passwordColor: COLOR_PRIMARY,
        confirmPasswordColor: COLOR_PRIMARY,
        birthdayColor: COLOR_PRIMARY
      },
      err: null
    };
  }

  createNowDate = (year, month, day) => {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let calendar = moment({ year, month, day }).calendar();
    let birthday = moment({ year, month, day, hour, minute, second }).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    return { calendar, birthday };
  };

  DatePickerAndroid = async () => {
    let { date, data, colors } = this.state;
    console.log("date", date);
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        maxDate: new Date(date.year - 12, date.month, date.day),
        date: new Date(date.year - 15, date.month, date.day)
      });
      if (action === DatePickerAndroid.dateSetAction) {
        let result = this.createNowDate(year, month, day);
        console.log("birthday", result.birthday);

        this.setState({
          datePickerTitle: result.calendar,
          data: { ...data, birthday: result.birthday },
          colors: { ...colors, birthdayColor: "green" }
        });
      } else if (action === DatePickerAndroid.dismissedAction) {
        this.setState({
          datePickerTitle: "Doğum günü",
          colors: { ...colors, birthdayColor: "red" }
        });
      } else throw new Error();
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  post = async () => {
    try {
      let user = { ...this.props.getUser, ...this.state.data };
      delete user.confirmPassword;
      console.log("son",user)
      let data = await Http.postWithoutToken("/signup/", user);
      if (data === null || data.err) throw new Error();
      else {
        let storeUser = await storeUserStorage(data.user.username);
        let storeToken = await storeTokenStorage(data.user.token);
        if (storeToken.err || storeUser.err) {
          throw new Error();
        } else {
          console.log("3",user)
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
    let { err, colors, datePickerTitle } = this.state;
    let icon = Platform.OS === "android" ? "md-lock" : "ios-lock";
    let calendar = Platform.OS === "android" ? "md-calendar" : "ios-calendar";
    let validate =
      colors.passwordColor === "green" &&
      colors.confirmPasswordColor === "green" &&
      colors.birthdayColor === "green";

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
          <View style={styles.inputs}>
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
          <View style={styles.horizontal}>
            <View style={{ paddingRight: 10 }}>
              <Icon name={calendar} size={30} color={colors.birthdayColor} />
            </View>

            <Button
              title={datePickerTitle}
              onPress={() => this.DatePickerAndroid()}
            />
          </View>
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
