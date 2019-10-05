import React, { PureComponent } from "react";
import { View, Text, Button, TouchableOpacity, Image, ImageBackground } from "react-native";
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
import { Navigation } from "react-native-navigation";
import {viewCompetition} from "../../store/competitionView/competitionViewActionCreator";
class CompetitionCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.getUser.token,
      item: this.props.item,
      visible: false
    };
  }

  goCompetition = () => {
    let { item } = this.state;
    this.props.viewCompetition(item)
    Navigation.push("HomeScreen", {
      component: {
        name: "yeteneksenin.screens.VideosScreen",
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
    });
  }
  render() {
    let { item } = this.state;
    let starIcon = item.tblUserCompetitions[0].voteVideoID !== null ? "md-star" : "md-star-outline";
    let time = moment(item.competitionFinishDate).fromNow();
    return (
      <Provider store={store}>
        <TouchableOpacity onPress={() => this.goCompetition()} style={styles.container}>
          <ImageBackground style={{ flex: 1 }} source={require('../../assets/coca-cola-banner.jpg')}>
            <View style={styles.logo}>
              <Image
                style={{ flex: 1, width: 50, height: 50 }}
                source={require('../../assets/cola-logo.png')}
              />
              <MainText style={{color:"white"}}>
                finale {time}
              </MainText>
            </View>
            <View style={styles.banner}>
              <View style={styles.description}>
                <Text>{item.competitionTitle}</Text>
                <Icon name={starIcon} color="white" size={24} />
              </View>
              <View style={styles.description}>
                <Text>{item.competitionDescription}</Text>
                <Icon name="md-football" color="white" size={24} />
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
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
    viewCompetition: comp => dispatch(viewCompetition(comp))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompetitionCard);

/*
<TouchableOpacity
                onPress={() => this.toggleFollow(userID, item.isFollow)}
              >
                <Icon name={followIcon} size={26} color="black" />
              </TouchableOpacity>*/
