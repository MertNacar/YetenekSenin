import React, { PureComponent } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import moment from "moment";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import Modal, {
  ModalContent,
  ModalTitle,
  ModalButton,
  ModalFooter,
  SlideAnimation
} from "react-native-modals";
import MainText from "../MainText/MainText";
import { Provider, connect } from "react-redux";
import store from "../../store/configureStore";
import * as Http from "../../../utils/httpHelper";
import { Navigation } from 'react-native-navigation'

class Card extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visiblePopup: false,
      userID: this.props.getUser.userID,
      competitionID: this.props.competitionID,
      token: this.props.getUser.token,
      item: {
        followerID: this.props.item.tblUser.userID,
        username: this.props.item.tblUser.username,
        voteVideoID: this.props.item.voteVideoID,
        videoID: this.props.item.upload.videoID,
        videoTitle: this.props.item.upload.videoTitle,
        videoDescription: this.props.item.upload.videoDescription,
        videoPath: this.props.item.upload.videoPath,
        videoStarCount: this.props.item.upload.videoStarCount,
        videoWatchCount: this.props.item.upload.videoWatchCount,
        createdAt: this.props.item.upload.createdAt,
      },
      visible: false
    };
  }

  openComplaintMenu = () => {
    this.setState({
      visible: true
    });
  };

  toggleVote = async () => {
    try {
      let { token, userID, competitionID, item } = this.state;
      let body = { userID, videoID: item.videoID, competitionID };
      let vote = await Http.post("/home/toggleVote", body, token);
      if (vote.err) throw new Error();
      else if (vote.callback) this.setState({ visiblePopup: true })
      else {
        this.setState({ item: { ...item, voteVideoID: vote.voteVideoID } });
      }
    } catch{
      alert("Bir hatayla karşılaştık");
    }
  };

  forceVote = async () => {
    try {
      let { token, userID, competitionID, item } = this.state;
      let body = { userID, videoID: item.videoID, competitionID };
      let vote = await Http.post("/home/forceVote", body, token);
      if (vote.err) throw new Error();
      else {
        this.setState({ visiblePopup: false, item: { ...item, voteVideoID: vote.voteVideoID } });
      }
    } catch {
      this.setState({ visiblePopup: false }, () => {
        alert("Bir hatayla karşılaştık");
      })
    }
  }

  toggleCommentArea = () => { };

  goProfile = () => {
    let { item, token } = this.state
    Navigation.push("HomeScreen", {
      component: {
        name: "yeteneksenin.screens.ViewProfileScreen",
        passProps: {
          userID: item.followerID,
          token
        },
        options: {
          bottomTab: {
            visible: false
          },
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    })
  }

  goComment = () => {
    Navigation.push("HomeScreen", {
      component: {
        name: "yeteneksenin.screens.CommentScreen",
        /*passProps: {
          userID,
          token
        },*/
        options: {
          bottomTab: {
            visible: false
          },
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    })
  }

  /*toggleFollow = async (followerID, isFollow) => {
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
  };*/

  render() {
    let { item } = this.state;
    let voteIcon = item.voteVideoID !== null ? "md-star" : "md-star-outline";
    let time = moment(item.createdAt).fromNow();
    return (
      <Provider store={store}>
        <View style={styles.containerCard}>
          <View style={styles.rowCardHeader}>
            <View style={styles.UserBar}>
              <TouchableOpacity style={styles.UserBar} onPress={() => this.goProfile()}>
                <View style={styles.positionLeft}>
                  <Icon name="md-contact" size={22} color="black" />
                </View>
                <MainText style={styles.positionLeft}>{item.username}</MainText>
              </TouchableOpacity>
            </View>
            <View style={styles.subTalent}>
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
                          text="Şikayet et"
                          //onPress={() => { }}
                          style={styles.modalButton}
                        />
                        <ModalButton
                          text="Paylaş"
                          //onPress={() => { }}
                          style={styles.modalButton}
                        />
                        <ModalButton
                          text="Gönderi bildirimlerini aç"
                          //onPress={() => { }}
                          style={styles.modalButton}
                        />
                      </ModalFooter>
                    }
                    onTouchOutside={() => {
                      this.setState({ visible: false });
                    }}
                    modalAnimation={
                      new SlideAnimation({
                        slideFrom: "bottom"
                      })
                    }
                  >
                    <ModalContent>
                      <Text>{item.username}</Text>
                    </ModalContent>
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
            ref={ref => this.player = ref}
            onBuffer={this._onBuffer}
            resizeMode="stretch"
          //poster="URL" yğklenirken bekleme ekranı
          //posterResizeMode kullan
          />

          <View style={styles.rowCardFooter}>
            <View style={styles.cardIcons}>
              <TouchableOpacity
                onPress={() => this.toggleVote()}
              >
                <Icon name={voteIcon} size={26} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.goComment()}>
                <Icon name="ios-text" size={26} color="black" />
              </TouchableOpacity>
              <View style={styles.container}>
                <Modal
                  visible={this.state.visiblePopup}
                  footer={
                    <ModalFooter>
                      <ModalButton
                        text="Hayır"
                        onPress={() => {
                          this.setState({ visiblePopup: false });
                        }}
                      />
                      <ModalButton
                        text="Evet"
                        onPress={() => this.forceVote()}
                      />
                    </ModalFooter>
                  }
                >
                  <ModalContent>
                    <Text>Zaten bir videoyaya oy kullandınız.</Text>
                    <Text>Oyunuzu bu video için değiştirmek mi istiyorsunuz ?</Text>
                  </ModalContent>
                </Modal>
              </View>
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
