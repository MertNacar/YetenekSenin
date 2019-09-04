import React, { Component } from "react";
import { Text, View, Picker } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { editUser } from "../../../../src/store/user/userActionCreator";
import * as Http from "../../../../utils/httpHelper";
import { COLOR_PRIMARY, COLOR_BACKGROUND } from "../../../../src/styles/const";
import styles from "./styles";
import { Navigation } from "react-native-navigation";
class UpdateTalentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      talents: [],
      subTalents: [],
      pickerEnabled: true,
      data: {
        fTalentID: this.props.getUser.fTalentID,
        fSubTalentID: this.props.getUser.fSubTalentID
      },
      colors: {
        subTalentColor: "green",
        talentColor: "green"
      }
    };
  }

  saveTalents = () => {
    console.log("önce state", this.props.getUser);
    let data = this.setTalentNames();
    let newUser = {
      ...this.props.getUser,
      ...data
    };
    console.log("sonra state", newUser);
    this.props.editUser(newUser);
    Navigation.pop("ProfileScreen");
  };

  async componentDidMount() {
    try {
      let { data } = this.state;
      let talents = await Http.getWithoutToken("/signup/talent");
      let subTalents = await Http.postWithoutToken(
        "/signup/subTalent",
        data.fTalentID
      );
      if (talents.err) throw new Error();
      else {
        this.setState({
          talents: [...talents.data],
          subTalents: [...subTalents.data]
        });
      }
    } catch {
      return;
    }
  }

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

  setTalentNames = () => {
    let { data, talents, subTalents } = this.state;
    let selectedTalent = talents.find(item => {
      return item.talentID === data.fTalentID;
    });
    let selectedSubTalent = subTalents.find(item => {
      return item.subTalentID === data.fSubTalentID;
    });
    data.talentName = selectedTalent.talentName;
    data.subTalentName = selectedSubTalent.subTalentName;
    return data;
  };

  render() {
    let { colors, data, talents, subTalents, pickerEnabled } = this.state;
    let validate =
      colors.subTalentColor === "green" && colors.talentColor === "green"
        ? true
        : false;
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
    return (
      <View style={styles.container}>
        <View
          style={{
            paddingTop: 15,
            borderBottomWidth: 2,
            borderColor: colors.talentColor
          }}
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
          style={{
            paddingTop: 15,
            borderBottomWidth: 2,
            borderColor: colors.subTalentColor
          }}
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

        <View style={styles.button}>
          <Button
            style={{ opacity: 1 }}
            disabledStyle={{ opacity: 0.3, backgroundColor: COLOR_PRIMARY }}
            disabled={!validate}
            onPress={() => this.saveTalents()}
            title="Bitti"
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
)(UpdateTalentScreen);
