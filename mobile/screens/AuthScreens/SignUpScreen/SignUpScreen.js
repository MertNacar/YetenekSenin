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
import {
  nameRegex,
  usernameRegex,
  passwordRegex,
  emailRegex,
  validateRegex
} from "../../../RegExp/regex";
import { COLOR_PRIMARY } from "../../../src/styles/const";
import Icon from "react-native-vector-icons/Ionicons";
import { Input } from "react-native-elements";
import { Navigation } from "react-native-navigation";
class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstname: "",
        surname: ""
        // birthday: "2012-02-21 18:10:00.000"
      },
      colors: {
        firstnameColor: COLOR_PRIMARY,
        surnameColor: COLOR_PRIMARY
      }
    };
  }

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

  continue = () => {
    let user = { ...this.props.getUser, ...this.state.data };
    this.props.addUser(user);
    console.log("1", user);
    Navigation.push(this.props.componentId, {
      component: {
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
        <View style={styles.flex1}>
          <MainText>
            <HeadingText>SIGN UP</HeadingText>
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
        <View style={styles.flex1}>
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

/*
<Input
              inputContainerStyle={{
                borderColor: this.state.colors.passwordColor
              }}
              inputStyle={{paddingLeft:20,fontSize:16}}
              leftIcon={
                <Icon name="md-lock" size={24} color={COLOR_PRIMARY} />
              }
              underlineColorAndroid="transparent"
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



 <CustomButton
            style={{ opacity }}
            disabled={!isClickable}
            onPress={this.post}
          >
            Sign Up
          </CustomButton>


<Input
              inputContainerStyle={{
                borderColor: this.state.colors.emailColor
              }}
              inputStyle={{paddingLeft:20}}
              leftIcon={
                <Icon name="md-mail" size={24} color={COLOR_PRIMARY} />
              }
              underlineColorAndroid="transparent"
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
            
            
            
            
            InputHandlerUsernameEmail = async (
    typeRegex,
    input,
    inputName,
    inputColor
  ) => {
    let validate = validateRegex(typeRegex, input);
    try {
      if (validate) {
        console.log(inputName);
        let confirm = await Http.postWithoutToken(
          `/signup/validate/${inputName}`,
          input
        );
        console.log(validate);
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
          this.props.addUser(data.user);
          MainTabs();
        }
      }
    } catch (err) {
      this.setState({ err: true });
    }
  };     
            
            
            
            
            
            
            
            
            */
