import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import MainText from "../MainText/MainText";
import styles from "./styles";
import { ListItem } from "react-native-elements";
import photo from "../../assets/profile_photo.jpg";
import Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR_PRIMARY } from "../../styles/const";
export default class SearchCard extends Component {
  render() {
    let item = this.props.item;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <ListItem
          title={item.username}
          /*subtitleStyle={{ color: COLOR_PRIMARY }}
          subtitle={item.tblSubTalent.subTalentName}*/
          leftAvatar={{ source: { uri: item.profilePhoto } }}
          rightIcon={<Icon name="futbol" color={COLOR_PRIMARY} size={22} />}
        />
      </TouchableOpacity>
    );
  }
}
