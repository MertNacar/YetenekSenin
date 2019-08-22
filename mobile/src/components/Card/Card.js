import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import moment from "moment";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import MainText from "../MainText/MainText";
import { Provider, connect } from "react-redux";
import store from "../../store/configureStore";
import * as Http from "../../../utils/httpHelper";

class Card extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.getUser.userID,
      token: this.props.getUser.token
    };
  }

  openComplaintMenu = () => {};

  toggleStar = async videoID => {
    let { token, userID } = this.state;
    let body = { userID, videoID };

    console.log(body);
    console.log(token);
    try {
      let star = await Http.post("/home/giveStar", body, token);
      if(star.err) throw new Error()
      else {
        
      }
    } catch {}
  };

  toggleCommentArea = () => {};
  toggleFollow = userID => {};

  render() {
    item = this.props.item;
    let time = moment(item.createdAt).fromNow();
    return (
      <Provider store={store}>
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
                <TouchableOpacity onPress={() => this.openComplaintMenu()}>
                  <Icon name="md-alert" size={25} color="black" />
                </TouchableOpacity>
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
              <TouchableOpacity onPress={() => this.toggleStar(item.videoID)}>
                <Icon name="md-star" size={26} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleCommentArea()}>
                <Icon name="ios-text" size={26} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.toggleFollow(item.tblUser.userID)}
              >
                <Icon name="md-person-add" size={26} color="black" />
              </TouchableOpacity>
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
      </Provider>
    );
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};

export default connect(mapStateToProps)(Card);
