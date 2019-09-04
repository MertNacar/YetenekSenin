import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { connect } from "react-redux";
import { Input, Button } from "react-native-elements";
import * as Http from "../../../utils/httpHelper";
import styles from "./styles";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR_PRIMARY } from "../../../src/styles/const";
import { validateRegex, passwordRegex } from "../../../RegExp/regex";
class UpdatePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        userID: this.props.getUser.userID
      },
      colors: {
        oldPasswordColor: COLOR_PRIMARY,
        newPasswordColor: COLOR_PRIMARY,
        confirmNewPasswordColor: COLOR_PRIMARY
      },
      token: this.props.getUser.token
    };
  }
  postPassword = async () => {
    let { user, token } = this.state;
    try {
      let data = await Http.put("/profile/update/password", user, token);
      console.log(data);
      if (data.err) throw new Error();
      else {
        //POP UP CIKACAK
        console.log(data);
        Navigation.pop("ProfileScreen");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  cancelPassword = () => {
    //POP UP CIKACAK
    Navigation.pop("ProfileScreen");
  };

  passwordHandler = (input, inputName, inputColor) => {
    let { user, colors } = this.state;
    let validate = validateRegex(passwordRegex, input);
    if (validate) {
      this.setState({
        user: { ...user, [inputName]: input },
        colors: { ...colors, [inputColor]: "green" }
      });
    } else this.setState({ colors: { ...colors, [inputColor]: "red" } });
  };

  verifyPassword = input => {
    let { user, colors } = this.state;
    if (input === user.newPassword) {
      this.setState({
        user: { ...user, confirmNewPassword: input },
        colors: { ...colors, confirmNewPasswordColor: "green" }
      });
    } else
      this.setState({ colors: { ...colors, confirmNewPasswordColor: "red" } });
  };

  render() {
    let { colors } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <Input
            secureTextEntry={true}
            placeholder="Eski Şifre"
            underlineColorAndroid="transparent"
            leftIcon={<Icon name="lock" size={24} color={COLOR_PRIMARY} />}
            inputStyle={{ paddingLeft: 15, fontSize: 15 }}
            inputContainerStyle={{
              borderColor: colors.oldPasswordColor
            }}
            onChangeText={oldPassword =>
              this.passwordHandler(
                oldPassword,
                "oldPassword",
                "oldPasswordColor"
              )
            }
          />
        </View>
        <View style={styles.inputRow}>
          <Input
            secureTextEntry={true}
            placeholder="Yeni Şifre"
            underlineColorAndroid="transparent"
            leftIcon={<Icon name="lock" size={24} color={COLOR_PRIMARY} />}
            inputStyle={{ paddingLeft: 15, fontSize: 15 }}
            inputContainerStyle={{
              borderColor: colors.newPasswordColor
            }}
            onChangeText={newPassword =>
              this.passwordHandler(
                newPassword,
                "newPassword",
                "newPasswordColor"
              )
            }
          />
        </View>
        <View style={styles.inputRow}>
          <Input
            secureTextEntry={true}
            placeholder="Şifre Onayla"
            underlineColorAndroid="transparent"
            leftIcon={<Icon name="lock" size={24} color={COLOR_PRIMARY} />}
            inputStyle={{ paddingLeft: 15, fontSize: 15 }}
            inputContainerStyle={{
              borderColor: colors.confirmNewPasswordColor
            }}
            onChangeText={confirmNewPassword =>
              this.verifyPassword(confirmNewPassword)
            }
          />
        </View>
        <View style={styles.buttons}>
          <Button
            buttonStyle={{ backgroundColor: "red" }}
            onPress={() => this.cancelPassword()}
            title="İptal"
          />
          <Button
            buttonStyle={{ backgroundColor: COLOR_PRIMARY }}
            onPress={() => this.postPassword()}
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
)(UpdatePasswordScreen);
