import React, { Component } from "react";
import { View, Platform } from "react-native";
import HeadingText from "../../../src/components/HeadingText/headingText";
import MainText from "../../../src/components/MainText/MainText";
import styles from "./styles";
import CustomButton from "../../../src/components/CustomButton/CustomButton";
import { connect } from "react-redux";
import { addUser } from "../../../src/store/user/userActionCreator";
import { nameRegex, validateRegex } from "../../../RegExp/regex";
import Icon from "react-native-vector-icons/Ionicons";
import AweIcon from "react-native-vector-icons/FontAwesome5";
import { Input, Button } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import {
  COLOR_PRIMARY,
  COLOR_PINK,
  COLOR_BACKGROUND
} from "../../../src/styles/const";

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstname: "",
        surname: "",
        gender: "u"
      },
      colors: {
        firstnameColor: COLOR_PRIMARY,
        surnameColor: COLOR_PRIMARY,
        iconColorMale: COLOR_PRIMARY,
        backColorMale: COLOR_BACKGROUND,
        iconColorFemale: COLOR_PINK,
        backColorFemale: COLOR_BACKGROUND
      }
    };
  }

  InputHandler = (typeRegex, input, inputName, inputColor) => {
    let { data, colors } = this.state;
    let validate = validateRegex(typeRegex, input);
    if (validate) {
      this.setState({
        data: { ...data, [inputName]: input },
        colors: { ...colors, [inputColor]: "green" }
      });
    } else this.setState({ colors: { ...colors, [inputColor]: "red" } });
  };
  // true geldiğinde erkek false ise kadın
  switchGender = genderType => {
    let { data, colors } = this.state;
    if (genderType == "m") {
      this.setState({
        data: { ...data, gender: "m" },
        colors: {
          ...colors,
          backColorMale: COLOR_PRIMARY,
          iconColorMale: COLOR_BACKGROUND,
          backColorFemale: COLOR_BACKGROUND,
          iconColorFemale: COLOR_PINK
        }
      });
    } else {
      this.setState({
        data: { ...data, gender: "f" },
        colors: {
          ...colors,
          backColorMale: COLOR_BACKGROUND,
          iconColorMale: COLOR_PRIMARY,
          backColorFemale: COLOR_PINK,
          iconColorFemale: COLOR_BACKGROUND
        }
      });
    }
  };
  continue = () => {
    let user = { ...this.props.getUser, ...this.state.data };
    this.props.addUser(user);
    Navigation.push(this.props.componentId, {
      component: {
        id: "SignUpScreen2",
        name: "yeteneksenin.screens.SignUpScreen2",
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
    let icon = Platform.OS === "android" ? "md-contact" : "ios-contact";
    let { colors } = this.state;
    let validate =
      colors.firstnameColor === "green" && colors.surnameColor === "green";

    let isClickable = validate ? true : false;
    let opacity = validate ? 1.0 : 0.2;
    return (
      <View style={styles.containerLogin}>
        <View style={styles.flex2}>
          <MainText>
            <HeadingText>Kayıt Ol</HeadingText>
          </MainText>
        </View>

        <View style={styles.SignUpform}>
          <Input
            inputContainerStyle={{
              borderColor: colors.firstnameColor
            }}
            inputStyle={{ paddingLeft: 20, fontSize: 16 }}
            leftIcon={<Icon name={icon} size={24} color={COLOR_PRIMARY} />}
            underlineColorAndroid="transparent"
            placeholder="İsim"
            onChangeText={firstname =>
              this.InputHandler(
                nameRegex,
                firstname,
                "firstname",
                "firstnameColor"
              )
            }
          />
          <Input
            inputContainerStyle={{
              borderColor: colors.surnameColor
            }}
            inputStyle={{ paddingLeft: 20, fontSize: 16 }}
            leftIcon={<Icon name={icon} size={24} color={COLOR_PRIMARY} />}
            underlineColorAndroid="transparent"
            placeholder="Soyisim"
            onChangeText={surname =>
              this.InputHandler(nameRegex, surname, "surname", "surnameColor")
            }
          />
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() => this.switchGender("m")}
            buttonStyle={{
              borderWidth: 1,
              borderColor: colors.iconColorMale,
              backgroundColor: colors.backColorMale
            }}
            icon={
              <AweIcon name="mars" color={colors.iconColorMale} size={26} />
            }
          />

          <Button
            onPress={() => this.switchGender("f")}
            buttonStyle={{
              borderWidth: 1,
              borderColor: colors.iconColorFemale,
              backgroundColor: colors.backColorFemale
            }}
            icon={
              <AweIcon name="venus" color={colors.iconColorFemale} size={27} />
            }
          />
        </View>
        <View style={styles.flex2}>
          <CustomButton
            style={{ opacity }}
            disabled={!isClickable}
            onPress={this.continue}
          >
            Devam et
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
)(SignUpScreen);
