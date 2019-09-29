import React, { Component } from "react";
import { View, Platform, Picker } from "react-native";
import * as Http from "../../../utils/httpHelper";
import MainText from "../../../src/components/MainText/MainText";
import styles from "./styles";
import CustomButton from "../../../src/components/CustomButton/CustomButton";
import { connect } from "react-redux";
import { addUser } from "../../../src/store/user/userActionCreator";
import {
  usernameRegex,
  phoneRegex,
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
        username: "",
        phone: "",
      },
      colors: {
        usernameColor: COLOR_PRIMARY,
        phoneColor: COLOR_PRIMARY
      }
    };
  }

  InputHandlerUsernamePhone = async (
    typeRegex,
    input,
    inputName,
    inputColor
  ) => {
    let { colors, data } = this.state;
    let validate = validateRegex(typeRegex, input);
    try {
      if (validate) {
        let confirm = await Http.postWithoutToken(
          `/signup/validate/${inputName}`,
          input
        );
        if (!confirm.err) {
          this.setState({
            data: { ...data, [inputName]: input },
            colors: { ...colors, [inputColor]: "green" }
          });
        } else throw new Error();
      } else throw new Error();
    } catch {
      this.setState({ colors: { ...colors, [inputColor]: "red" } });
    }
  };

  continue = () => {
    let { data } = this.state;
    let user = { ...this.props.getUser, ...data };
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
    let { colors, data } = this.state;
    let iconUser = Platform.OS === "android" ? "md-contact" : "ios-contact";
    let iconPhone = Platform.OS === "android" ? "md-phone" : "ios-phone";
    let isClickable =
      colors.usernameColor === "green" &&
      colors.phoneColor === "green";

    let opacity = isClickable ? 1.0 : 0.2;
    return (
      <View style={styles.containerLogin}>
        <View style={styles.SignUpform}>
          <Input
            inputContainerStyle={{
              borderColor: colors.usernameColor
            }}
            inputStyle={{ paddingLeft: 20, fontSize: 16 }}
            leftIcon={<Icon name={iconUser} size={24} color={COLOR_PRIMARY} />}
            underlineColorAndroid="transparent"
            placeholder="Kullanıcı Adı"
            onChangeText={username =>
              this.InputHandlerUsernamePhone(
                usernameRegex,
                username,
                "username",
                "usernameColor"
              )
            }
          />
          <MainText>* En az 8 karakter içeren bir değer giriniz.</MainText>
          <Input
            inputContainerStyle={{
              borderColor: colors.phoneColor
            }}
            inputStyle={{ paddingLeft: 20, fontSize: 16 }}
            leftIcon={<Icon name={iconPhone} size={24} color={COLOR_PRIMARY} />}
            underlineColorAndroid="transparent"
            placeholder="+90 (555) 555 55 55"
            onChangeText={phone =>
              this.InputHandlerUsernamePhone(
                phoneRegex,
                phone,
                "phone",
                "phoneColor"
              )
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
