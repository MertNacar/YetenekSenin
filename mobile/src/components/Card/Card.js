import React, { Component } from "react";
import { View, Text } from "react-native";
import Video from "react-native-video";
import moment from "moment";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import MainText from "../MainText/MainText";
export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    item = this.props.item;
    console.log("username", item);
    let time = moment(item.createdAt).fromNow();
    return (
      <View style={styles.containerCard}>
        <View style={styles.rowCardHeader}>
          <View style={styles.UserBar}>
            <View style={styles.positionLeft}>
              <Icon name="md-contact" size={22} color="black" />
            </View>
            <MainText style={styles.positionLeft}>
              {item.tblUser.username}
            </MainText>
          </View>
          <View style={styles.subTalent}>
            <View style={styles.positionRight}>
              <Icon name="md-football" size={25} color="black" />
            </View>
            <View style={styles.positionRight}>
              <Icon name="md-alert" size={25} color="black" />
            </View>
          </View>
        </View>

        <Video
          source={{ uri: item.videoPath }}
          repeat={true}
          style={styles.rowCardBody}
          resizeMode="cover"
        />

        <View style={styles.rowCardFooter}>
          <View style={styles.cardIcons}>
            <Icon name="md-star-outline" size={26} color="black" />
            <Icon name="ios-text" size={26} color="black" />
            <Icon name="md-person-add" size={26} color="black" />
          </View>

          <View style={styles.watching}>
            <View style={styles.positionRight}>
              <Icon name="md-eye" size={22} color="black" />
            </View>
            <Text style={styles.positionRight}>{item.videoWatchCount}</Text>
          </View>
        </View>
        <View style={styles.rowCardFooter}>
          <MainText>{item.videoTitle}</MainText>
        </View>
        <View style={styles.rowCardFooterTime}>
          <MainText style={styles.positionLeft}>{time}</MainText>
        </View>
      </View>
    );
  }
}
