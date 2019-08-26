import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import MainText from "../../../src/components/MainText/MainText";
import { connect } from "react-redux";
import styles from "./styles";
import { Navigation } from "react-native-navigation";
import profilePhoto from "../../../src/assets/profile_photo.jpg";
import Icon from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import ProfileCardList from "../../../src/components/ProfileCard/ProfileCardList";
import * as Http from "../../../utils/httpHelper";
import { COLOR_PRIMARY } from "../../../src/styles/const";
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...this.props.getUser, allStars: 0 },
      videos: []
    };
    Navigation.events().bindComponent(this);
  }
  navigationButtonPressed(event) {
    Navigation.mergeOptions(event.componentId, {
      sideMenu: {
        right: {
          visible: true
        }
      }
    });
  }

  async componentDidAppear() {
    let { user } = this.state;
    try {
      let res = await Http.get(
        `/profile/videos?username=${user.username}`,
        user.token
      );
      console.log("res", res);
      if (res.err) throw new Error();
      else {
        this.setState({
          user: { ...user, allStars: res.videos[0].tblUser.allStars },
          videos: res.videos
        });
      }
    } catch {}
  }

  render() {
    let { user, videos } = this.state;
    console.log("user profile", user);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
            }}
          />
          <View style={styles.fullName}>
            <MainText>{user.firstname}</MainText>
            <MainText> </MainText>
            <MainText>{user.surname}</MainText>
          </View>
          <View style={styles.username}>
            <MainText>@{user.username}</MainText>
          </View>
        </View>
        <View style={styles.infoHeader}>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Icon size={22} color={COLOR_PRIMARY} name="birthday-cake" />
            </View>
            <MainText>
              {moment().diff(user.birthday, "years") + " years"}
            </MainText>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Icon size={22} color={COLOR_PRIMARY} name="city" />
            </View>
            <MainText>{user.city}</MainText>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Icon size={22} color={COLOR_PRIMARY} name="envelope" />
            </View>
            <MainText> {user.email} </MainText>
          </View>
        </View>
        <View style={styles.infoHeader}>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Icon size={22} color={COLOR_PRIMARY} name="star" />
            </View>
            <MainText>{user.allStars}</MainText>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Icon size={22} color={COLOR_PRIMARY} name="phone" />
            </View>
            <MainText>{user.phone}</MainText>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Icon size={22} color={COLOR_PRIMARY} name="futbol" />
            </View>
            <MainText> TALENT </MainText>
          </View>
        </View>
        <View style={styles.body}>
          <ProfileCardList items={videos} />
        </View>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};
export default connect(mapStateToProps)(ProfileScreen);
