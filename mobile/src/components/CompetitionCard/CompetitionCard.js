import React, { PureComponent } from "react";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
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
class CompetitionCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.getUser.userID,
      token: this.props.getUser.token,
      item: this.props.item,
      visible: false
    };
  }

  goCompetition = () => {
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
    let { item, userID } = this.state;
    let starIcon = item.tblUserCompetitions[0].voteVideoID !== null ? "md-star" : "md-star-outline";
    let time = moment(item.competitionFinishDate).fromNow();
    console.warn("data", item);
    return (
      <Provider store={store}>
        <TouchableOpacity onPress={() => this.goCompetition()} style={styles.container}>
          <View style={styles.logo}>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}
            />
            <Text>
              finale {time}
            </Text>
          </View>
          <View style={styles.banner}>
            <View style={styles.description}>
              <Text>{item.competitionTitle}</Text>
              <Icon name={starIcon} color="yellow" size={24} />
            </View>
            <View style={styles.description}>
              <Text>{item.competitionDescription}</Text>
              <Icon name="md-football" color="black" size={24} />
            </View>
          </View>
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
    addUser: user => dispatch(addUser(user))
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
