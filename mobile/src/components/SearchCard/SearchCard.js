import React, { Component } from "react";
import { View, Image } from "react-native";
import MainText from "../MainText/MainText";
import styles from "./styles";

export default class SearchCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={this.props.item.profilePhoto} style={styles.Image} />
        <MainText>username: {this.props.item.username}</MainText>
        <MainText>talent: {this.props.item.talentName}</MainText>
      </View>
    );
  }
}
