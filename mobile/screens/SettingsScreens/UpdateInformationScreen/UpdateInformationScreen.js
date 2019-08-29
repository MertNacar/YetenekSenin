import React, { Component } from "react";
import { View, ScrollView } from "react-native";
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
import moment from "moment";
import {
  usernameRegex,
  emailRegex,
  nameRegex,
  validateRegex
} from "../../../RegExp/regex";
import { Navigation } from "react-native-navigation";
class UpdateInformationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.getUser,
      data: {
        firstname: "",
        surname: "",
        username: "",
        email: "",
        talentName: "",
        subTalentName: "",
        phone: "",
        aboutMe: "",
        city: ""
      },
      colors: {
        firstnameColor: COLOR_PRIMARY,
        surnameColor: COLOR_PRIMARY,
        usernameColor: COLOR_PRIMARY,
        emailColor: COLOR_PRIMARY,
        socialMediaColor: COLOR_PRIMARY, //FARKLI
        birthdayColor: COLOR_PRIMARY, //
        cityColor: COLOR_PRIMARY, //
        aboutMeColor: COLOR_PRIMARY, //Sayfalar
        phoneColor: COLOR_PRIMARY // Açılacak
      }
    };
  }
  editProfilePost = async () => {
    let token = this.state.user.token;
    try {
      let user = { ...this.state.data };
      let data = await Http.post("/profile/update/", user, token);
      if (data == null || data.err) throw new Error();
      else {
        this.props.editUser(user);
        Navigation.push(this.props.componentId, {
          component: {
            id: "ProfileScreen",
            name: "yeteneksenin.screens.ProfileScreen",
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
      }
    } catch (err) {}
  };

  goUpdatePage = screenID => {
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

  InputHandler = (typeRegex, input, inputName, inputColor) => {
    let { data, colors } = this.state;
    let validate = validateRegex(typeRegex, input);
    if (validate) {
      this.setState({
        data: { data, [inputName]: input },
        colors: { colors, [inputColor]: "green" }
      });
    } else this.setState({ colors: { colors, [inputColor]: "red" } });
  };

  render() {
    let { user, colors } = this.state;
    console.warn(user);
    return (
      <ScrollView contentContainerStyle={styles.container}>
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
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  paddingTop: 25
                }}
              >
                <Button
                  buttonStyle={{
                    borderWidth: 1,
                    borderColor: COLOR_PRIMARY,
                    backgroundColor: COLOR_BACKGROUND
                  }}
                  icon={<Icon name="mars" color={COLOR_PRIMARY} size={26} />}
                />
                <Button
                  buttonStyle={{
                    borderWidth: 1,
                    borderColor: COLOR_PINK,
                    backgroundColor: COLOR_BACKGROUND
                  }}
                  icon={<Icon name="venus" color={COLOR_PINK} size={27} />}
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

            <View style={styles.button}>
              <Button
                buttonStyle={{ backgroundColor: "green" }}
                titleStyle={{ marginLeft: 7 }}
                title="Kaydet"
              />
            </View>
          </View>
        </View>
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

/*<View style={styles.rowSingle}>
              <Input
                containerStyle={styles.singleInput}
                placeholder="About Me"
                value={user.aboutMe}
                underlineColorAndroid="transparent"
                leftIcon={
                  <Icon name="address-card" size={24} color={COLOR_PRIMARY} />
                }
                inputStyle={{ paddingLeft: 15, fontSize: 15 }}
                inputContainerStyle={{
                  borderColor: colors.aboutMeColor
                }}
              />
            </View>*/

/*

 <View style={styles.info}>
              <MainText style={styles.infoWords}>Diğer İşlemler</MainText>
            </View>





            <View style={styles.row}>
              <Input
                containerStyle={{ width: "50%" }}
                placeholder="Phone"
                value={user.phone}
                underlineColorAndroid="transparent"
                leftIcon={<Icon name="phone" size={24} color={COLOR_PRIMARY} />}
                inputStyle={{ paddingLeft: 15, fontSize: 15 }}
                inputContainerStyle={{
                  borderColor: colors.phoneColor
                }}
                onChangeText={phone =>
                  this.InputHandler(phoneRegex, phone, "phone", "phoneColor")
                }
                />

                <Input
                  containerStyle={{ width: "45%" }}
                  placeholder="Şehir"
                  value={user.city}
                  underlineColorAndroid="transparent"
                  leftIcon={<Icon name="city" size={24} color={COLOR_PRIMARY} />}
                  inputStyle={{ paddingLeft: 15, fontSize: 15 }}
                  inputContainerStyle={{
                    borderColor: colors.cityColor
                  }}
                />
              </View>
  
              <View style={styles.row}>
                <Input
                  containerStyle={{ width: "50%" }}
                  placeholder="Birthday"
                  value={moment(user.birthday).calendar()}
                  underlineColorAndroid="transparent"
                  leftIcon={
                    <Icon name="birthday-cake" size={24} color={COLOR_PRIMARY} />
                  }
                  inputStyle={{ paddingLeft: 15, fontSize: 15 }}
                  inputContainerStyle={{
                    borderColor: colors.birthdayColor
                  }}
                />
  
                <Input
                  containerStyle={{ width: "45%" }}
                  placeholder="Social Media"
                  value={user.socialMedia}
                  underlineColorAndroid="transparent"
                  leftIcon={
                    <Icon name="instagram" size={24} color={COLOR_PRIMARY} />
                  }
                  inputStyle={{ paddingLeft: 15, fontSize: 15 }}
                  inputContainerStyle={{
                    borderColor: colors.socialMediaColor
                  }}
                />
              </View>
  
             






*/
