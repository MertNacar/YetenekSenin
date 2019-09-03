import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { editUser } from "../../../../src/store/user/userActionCreator";
import { Input } from "react-native-elements";
import * as Http from "../../../../utils/httpHelper";
import styles from "./styles";
import { COLOR_PRIMARY, COLOR_BACKGROUND } from "../../../../src/styles/const";
import RadioButton from "../../../../src/components/RadioButton/RadioButton";
import { genders } from "./genders";
import { Navigation } from "react-native-navigation";
class UpdateGenderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: this.props.getUser.gender
    };
  }

  saveGender = () => {
    let { gender } = this.state;
    let newUser = { ...this.props.getUser, gender };
    this.props.editUser(newUser);
    Navigation.pop("ProfileScreen");
  };

  selectGender = gender => {
    this.setState({
      gender
    });
  };
  render() {
    let { gender } = this.state;
    let buttons = genders.map((item, index) => {
      let selected = item.id == gender ? COLOR_PRIMARY : COLOR_BACKGROUND;
      return (
        <RadioButton
          key={index}
          text={item.text}
          selected={selected}
          onPress={() => this.selectGender(item.id)}
        />
      );
    });
    return (
      <View style={styles.container}>
        {buttons}
        <View style={{ flex: 4.5 }}></View>
        <View style={styles.button}>
          <Button onPress={() => this.saveGender()} title="Bitti" />
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
)(UpdateGenderScreen);
