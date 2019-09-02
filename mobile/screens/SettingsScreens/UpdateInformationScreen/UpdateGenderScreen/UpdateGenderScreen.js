import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { editUser } from "../../../../src/store/user/userActionCreator";
import { Input } from "react-native-elements";
import * as Http from "../../../../utils/httpHelper";
import styles from "./styles";
import { COLOR_PRIMARY, COLOR_BACKGROUND } from "../../../../src/styles/const";
const products = [
  {
    id: "m",
    text: "Erkek"
  },
  {
    id: "f",
    text: "Kadın"
  },
  {
    id: "u",
    text: "Söylemek İstemiyorum"
  }
];

class UpdateGenderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: this.props.getUser.gender,
    };
  }

  selectGender = gender => {
    this.setState({
      gender
    });
  };
  render() {
    let { gender, selectedRadio } = this.state;
    console.log("GENDER", gender);
    let Buttons = products.map(item => {
      let selected =
        item.id == gender ? COLOR_PRIMARY : COLOR_BACKGROUND;
      return (
        <TouchableOpacity
          key={item.id}
          style={styles.rowSingle}
          onPress={() => this.selectGender(item.id)}
        >
          <View style={{ flex: 4 }}>
            <Text>{item.text}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                height: "25%",
                width: "20%",
                borderRadius: 50,
                borderWidth: 2,
                borderColor: COLOR_PRIMARY,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  height: "85%",
                  width: "80%",
                  borderRadius: 50,
                  backgroundColor: selected
                }}
              ></View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
    return (
      <View style={styles.container}>
        {Buttons}
        <View style={{ flex: 6 }}></View>
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
)(UpdateGenderScreen);
