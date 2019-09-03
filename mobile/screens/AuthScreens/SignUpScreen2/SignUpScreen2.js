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
  emailRegex,
  validateRegex
} from "../../../RegExp/regex";
import { COLOR_PRIMARY } from "../../../src/styles/const";
import Icon from "react-native-vector-icons/Ionicons";
import { Input } from "react-native-elements";
import { Navigation } from "react-native-navigation";

class SignUpScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      talents: [],
      subTalents: [],
      pickerEnabled: false,
      data: {
        username: "",
        email: "",
        fTalentID: "",
        fSubTalentID: ""
      },
      colors: {
        subTalentColor: COLOR_PRIMARY,
        talentColor: COLOR_PRIMARY,
        usernameColor: COLOR_PRIMARY,
        emailColor: COLOR_PRIMARY
      }
    };
  }

  async componentDidMount() {
    try {
      let talents = await Http.getWithoutToken("/signup/talent");
      if (talents.err) throw new Error();
      else {
        this.setState({
          talents: [...talents.data]
        });
      }
    } catch {
      return;
    }
  }

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

  pickerTalentHandler = async itemID => {
    let { colors, data } = this.state;
    try {
      if (itemID !== 0) {
        let subTalents = await Http.postWithoutToken(
          "/signup/subTalent",
          itemID
        );
        if (subTalents.err) throw new Error();
        else {
          this.setState({
            colors: { ...colors, talentColor: "green" },
            data: { ...data, fTalentID: itemID },
            subTalents: [...subTalents.data],
            pickerEnabled: true
          });
        }
      } else throw new Error();
    } catch {
      this.setState({
        data: { ...data, fTalentID: 0 },
        colors: { ...colors, talentColor: COLOR_PRIMARY },
        pickerEnabled: false
      });
    }
  };

  pickerSubTalentHandler = itemID => {
    let { colors, data } = this.state;
    if (itemID !== 0) {
      this.setState({
        data: { ...data, fSubTalentID: itemID },
        colors: { ...colors, subTalentColor: "green" }
      });
    } else {
      this.setState({
        data: { ...data, fSubTalentID: 0 },
        colors: { ...colors, subTalentColor: COLOR_PRIMARY }
      });
    }
  };

  continue = () => {
    let { data, talents, subTalents } = this.state;
    talents.find(item => {
      return item.talentID === data.fTalentID;
    });
    subTalents.find(item => {
      return item.subTalentID === data.fSubTalentID;
    });
    data.talentName = talents[0].talentName;
    data.subTalentName = subTalents[0].subTalentName;
    let user = { ...this.props.getUser, ...data };
    console.log("2", user);
    this.props.addUser(user);
    Navigation.push(this.props.componentId, {
      component: {
        id: "SignUpScreen3",
        name: "yeteneksenin.screens.SignUpScreen3",
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
    let { colors, talents, subTalents, pickerEnabled, data } = this.state;
    let talentItems = talents.map((item, index) => {
      return (
        <Picker.Item
          key={index}
          label={item.talentName}
          value={item.talentID}
        />
      );
    });
    let subTalentItems = subTalents.map((item, index) => {
      return (
        <Picker.Item
          key={index}
          label={item.subTalentName}
          value={item.subTalentID}
        />
      );
    });
    let iconUser = Platform.OS === "android" ? "md-contact" : "ios-contact";
    let iconMail = Platform.OS === "android" ? "md-mail" : "ios-mail";
    let validate =
      colors.usernameColor === "green" &&
      colors.emailColor === "green" &&
      colors.talentColor === "green" &&
      colors.subTalentColor === "green";

    let isClickable = validate ? true : false;
    let opacity = validate ? 1.0 : 0.2;
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
              this.InputHandlerUsernameEmail(
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
              borderColor: colors.emailColor
            }}
            inputStyle={{ paddingLeft: 20, fontSize: 16 }}
            leftIcon={<Icon name={iconMail} size={24} color={COLOR_PRIMARY} />}
            underlineColorAndroid="transparent"
            placeholder="E-mail"
            onChangeText={email =>
              this.InputHandlerUsernameEmail(
                emailRegex,
                email,
                "email",
                "emailColor"
              )
            }
          />

          <View
            style={{ borderBottomWidth: 2, borderColor: colors.talentColor }}
          >
            <Picker
              selectedValue={data.fTalentID}
              onValueChange={itemID => this.pickerTalentHandler(itemID)}
            >
              <Picker.Item label="Branş Seçiniz" value={0} />
              {talentItems}
            </Picker>
          </View>

          <View
            style={{ borderBottomWidth: 2, borderColor: colors.subTalentColor }}
          >
            <Picker
              enabled={pickerEnabled}
              selectedValue={data.fSubTalentID}
              onValueChange={itemID => this.pickerSubTalentHandler(itemID)}
            >
              <Picker.Item label="Alt Branş Seçiniz" value={0} />
              {subTalentItems}
            </Picker>
          </View>
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
)(SignUpScreen2);
