import React, { Component } from "react";
import { View, Button, Image } from "react-native";
import MainText from "../../../src/components/MainText/MainText";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import styles from "./styles";
import profilePhoto from "../../../src/assets/profile_photo.jpg";
import Icon from "react-native-vector-icons/FontAwesome5";
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
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
  render() {
    let user = this.props.getUser;
    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.photoSection}>
            <Image style={styles.image} source={profilePhoto} />
          </View>
          <View style={styles.talentSection}>
            <MainText>
              <Icon name="user-alt" size={22} /> {user.username}
            </MainText>

            <MainText>
              <Icon name="star" size={22} /> {user.firstname}
            </MainText>

            <MainText>
              <Icon name="eye" size={22} /> {user.firstname}
            </MainText>

            <MainText>
              <Icon name="futbol" size={22} /> {user.firstname}
            </MainText>
          </View>
        </View>

        <View style={styles.profileBody}>
          <MainText>
            <Icon name="id-card-alt" size={22} /> {user.firstname}{" "}
            {user.surname}
          </MainText>
          <MainText>
            <Icon name="city" size={22} /> {user.city}
          </MainText>
          <MainText>
            <Icon name="mobile" size={22} /> {user.phone}
          </MainText>
          <MainText>
            <Icon name="birthday-cake" size={22} /> {user.birthday}
          </MainText>
          <MainText>
            <Icon name="info" size={22} /> {user.aboutMe}
          </MainText>
        </View>

        <View style={styles.profileFooter}>
          <MainText>VİDEOLARIN</MainText>
          <MainText>BULUNDUGU GRID VIEW YER ALACAK</MainText>
          <MainText>INSTAGRAMDAKİ GİBİ</MainText>
          <MainText>IZGARA GORUNUM YADA ALT ALTA GORUNUM</MainText>
          <MainText>VERILECEK</MainText>
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

/*
<View style={{ flex: 1 }}>
          <MainText>username : {user.username}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>firstname : {user.firstname}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>surname : {user.surname}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>email : {user.email}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>city : {user.city}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>phone : {user.phone}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>aboutMe : {user.aboutMe}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>socialMedia : {user.socialMedia}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>Birthday : {user.birthday}</MainText>
        </View>
        <View style={{ flex: 1 }}>
          <MainText>loginDate : {user.loginDate}</MainText>
        </View>
        <View style={{ flex: 1 }}> 
        </View>
        */
