import React, { Component } from "react";
import { View, Image, Text, RefreshControl, ScrollView } from "react-native";
import MainText from "../../../src/components/MainText/MainText";
import { connect } from "react-redux";
import { Avatar } from "react-native-elements";
import styles from "./styles";
import { Navigation } from "react-native-navigation";
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
      videos: [],
      refreshing: false
    };
    Navigation.events().bindComponent(this, "ProfileScreen");
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

  getData = async () => {
    try {
      let user = this.props.getUser
      let res = await Http.get(
        `/profile/videos?username=${user.username}`,
        user.token
      );
      if (res.err) throw new Error();
      else {
        this.setState({
          user: { ...user, allStars: res.videos[0].tblStarVideos[0].tblUser.allStars },
          videos: res.videos,
          refreshing: false
        });
      }
    } catch {
      this.setState({ refreshing: false });
    }
  }

  componentDidAppear() {
    this.getData();
  }

  onRefresh = () => {
    this.setState({ videos: [], user: {}, refreshing: true }, () => {
      this.getData();
    });
  };

  render() {
    let { user, videos, refreshing } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh} />
          }
        >
          <View style={styles.header}>
            <Avatar
              rounded
              title="YS"
              size="large"
              source={{
                uri: user.profilePhoto
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
        </ScrollView>
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
