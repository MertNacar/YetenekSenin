import React, { Component } from "react";
import { View, Image } from "react-native";
import MainText from "../MainText/MainText";
import styles from "./styles";
import { ListItem } from 'react-native-elements'
import photo from '../../assets/profile_photo.jpg'
export default class SearchCard extends Component {
  render() {
    let item = this.props.item
    return (
      <ListItem
      title={item.username}
      subtitle={item.tblSubTalent.subTalentName}
      leftAvatar={{ source:  photo/*{ uri:  item.profilePhoto }*/ }}
    />
    );
  }
}
