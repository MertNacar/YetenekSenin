import React, { Component } from "react";
import { Text, View, Picker } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { editUser } from "../../../../src/store/user/userActionCreator";
import * as Http from "../../../../utils/httpHelper";
import { COLOR_PRIMARY, COLOR_BACKGROUND } from "../../../../src/styles/const";
import styles from "./styles";
class UpdateTalentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      talents: [],
      subTalents: [],
      pickerEnabled: false,
      data: {
        fTalentID: "",
        fSubTalentID: ""
      },
      colors: {
        subTalentColor: COLOR_PRIMARY,
        talentColor: COLOR_PRIMARY
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

    /*let user = { ...this.props.getUser, ...data };
    this.props.addUser(user);
    Navigation.pop("ProfileScreen");*/
  };

  render() {
    let { colors, data, talents, subTalents, pickerEnabled } = this.state;
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
        <View style={{ borderWidth: 2, borderColor: colors.talentColor }}>
          <Picker
            selectedValue={data.fTalentID}
            onValueChange={itemID => this.pickerTalentHandler(itemID)}
          >
            <Picker.Item label="Branş Seçiniz" value={0} />
            {talentItems}
          </Picker>
        </View>

        <View style={{ borderWidth: 2, borderColor: colors.subTalentColor }}>
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
            //onPress={() => this.editProfilePost()}
            buttonStyle={{ backgroundColor: "green" }}
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
