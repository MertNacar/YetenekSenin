import React, { PureComponent } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import moment from "moment";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import Modal, { ModalContent, ModalTitle, ModalButton, ModalFooter, SlideAnimation } from 'react-native-modals';
import MainText from "../MainText/MainText";
import { Provider, connect } from "react-redux";
import store from "../../store/configureStore";
import * as Http from "../../../utils/httpHelper";

class Card extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.getUser.userID,
      token: this.props.getUser.token,
      item: {
        username: this.props.item.tblUser.username,
        videoID: this.props.item.videoID,
        videoTitle: this.props.item.videoTitle,
        videoDescription: this.props.item.videoDescription,
        videoPath: this.props.item.videoPath,
        videoStarCount: this.props.item.videoStarCount,
        videoWatchCount: this.props.item.videoWatchCount,
        createdAt: this.props.item.createdAt,
        talentName: this.props.item.tblTalent.talentName,
        subTalentName: this.props.item.tblSubTalent.subTalentName,
        isLike: this.props.item.tblStarVideos[0].isLike,
        isFollow: this.props.item.tblUser.tblFollowers[0].isFollow
      },
      visible: false
    };
  }

  openComplaintMenu = () => {
    this.setState({
      visible: true
    })


  };

  toggleStar = async (videoID, isLike) => {
    let { token, userID, item } = this.state;
    let body = { userID, videoID, isLike };
    try {
      let star = await Http.post("/home/toggleStar", body, token);
      if (star.err) throw new Error();
      else {
        this.setState({ item: { ...item, isLike: !isLike } });
      }
    } catch (err) {
      console.log("hata", err.message);
    }
  };

  toggleCommentArea = () => { };

  toggleFollow = async (followerID, isFollow) => {
    let { token, userID, item } = this.state;
    let body = { userID, followerID, isFollow };
    try {
      let follow = await Http.post("/home/toggleFollow", body, token);
      console.log(follow);
      if (follow.err) throw new Error();
      else {
        this.setState({ item: { ...item, isFollow: !isFollow } });
      }
    } catch (err) {
      console.log("hata", err.message);
    }
  };

  render() {
    let { item, userID } = this.state;
    let starIcon = item.isLike ? "md-star" : "md-star-outline";
    let followIcon = item.isFollow ? "md-checkmark" : "md-add";
    let time = moment(item.createdAt).fromNow();
    console.log("data", item);
    return (
      <Provider store={store}>
        <View style={styles.containerCard}>
          <View style={styles.rowCardHeader}>
            <View style={styles.UserBar}>
              <View style={styles.positionLeft}>
                <Icon name="md-contact" size={22} color="black" />
              </View>
              <TouchableOpacity onPress={() => this.toggleFollow()}>
                <MainText style={styles.positionLeft}>{item.username}</MainText>
              </TouchableOpacity>
              <View style={styles.positionLeft}>
                <Icon name={followIcon} size={22} color="black" />
              </View>
            </View>
            <View style={styles.subTalent}>
              <View style={styles.positionRight}>
                <Icon name="md-football" size={25} color="black" />
              </View>
              <View style={styles.positionRight}>
                <TouchableOpacity onPress={() => this.openComplaintMenu()}>
                  <Icon name="md-alert" size={25} color="black" />
                </TouchableOpacity>

                <View style={styles.container}>
                  {/* <Modal
                    visible={this.state.visible}
                    swipeDirection={['up', 'down']} // can be string or an array
                    swipeThreshold={100} // default 100
                    modalTitle={<ModalTitle title="Şikayet Bildirimi" />}
                    onSwipeOut={(event) => {
                      this.setState({ visible: false });
                    }}
                  > */}
                  <Modal
                    visible={this.state.visible}
                    footer={
                      <ModalFooter>
                        <ModalButton
                          text="Takibi Bırak"
                          onPress={() => { }}
                          style={styles.modalButton}
                        />
                        <ModalButton
                          text="Şikayet et"
                          onPress={() => { }}
                          style={styles.modalButton}
                        />
                        <ModalButton
                          text="Paylaş"
                          onPress={() => { }}
                          style={styles.modalButton}
                        />
                        <ModalButton
                          text="Gönderi bildirimlerini aç"
                          onPress={() => { }}
                          style={styles.modalButton}
                        />
                      </ModalFooter>
                    }
                    onTouchOutside={() => {
                      this.setState({ visible: false });
                    }}
                    modalAnimation={new SlideAnimation({
                      slideFrom: 'bottom',
                    })}
                  >

                  </Modal>
                </View>
              </View>
            </View>
          </View>
          <Video
            source={{ uri: item.videoPath }}
            repeat={true}
            onBuffer={this.onBuffer}
            style={styles.rowCardBody}
            resizeMode="cover"
          />

          <View style={styles.rowCardFooter}>
            <View style={styles.cardIcons}>
              <TouchableOpacity
                onPress={() => this.toggleStar(item.videoID, item.isLike)}
              >
                <Icon name={starIcon} size={26} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleCommentArea()}>
                <Icon name="ios-text" size={26} color="black" />
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

mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);

/*
<TouchableOpacity
                onPress={() => this.toggleFollow(userID, item.isFollow)}
              >
                <Icon name={followIcon} size={26} color="black" />
              </TouchableOpacity>*/
