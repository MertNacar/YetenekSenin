import React, { Component } from "react";
import { Text, View } from "react-native";
import Video from "react-native-video";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import MainText from "../MainText/MainText";
export default ProfileCard = props => {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: props.item.videoPath }}
        style={styles.rowCardBody}
        resizeMode="cover"
        onBuffer={this.onBuffer}
        paused={true}
      />
      <View style={styles.rowIcon}>
        <View style={styles.watch}>
          <Icon name="eye" color="white" size={12} />
          <MainText style={styles.white}>{props.item.videoWatchCount}</MainText>
        </View>
        <View style={styles.star}>
          <Icon name="star" color="yellow" size={12} />
          <MainText style={styles.white}>{props.item.videoStarCount}</MainText>
        </View>
      </View>
    </View>
  );
};
