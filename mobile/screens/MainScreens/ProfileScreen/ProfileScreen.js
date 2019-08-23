import React, { Component } from "react";
import { View, Button, Image, StyleSheet,TouchableOpacity } from "react-native";
import MainText from "../../../src/components/MainText/MainText";
import { connect } from "react-redux";
import { Input } from "react-native-elements";
import { Navigation } from "react-native-navigation";
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
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        <View style={styles.body}>
        
        <Input
        inputStyle={styles.buttonContainer}
        > {user.firstname} </Input>
        
        <Input 
          inputStyle={styles.buttonContainer}
        > {user.surname} </Input>
        <Input
        inputStyle={styles.buttonContainer}
 
        > {user.username} </Input>
        <Input
        inputStyle={styles.buttonContainer}
         > 
        
         {user.phone} </Input>
        <Input
        inputStyle={styles.buttonContainer}
        > {user.aboutMe} </Input>
        <Input
        inputStyle={styles.buttonContainer}
        
        > {user.city} </Input>
        
        
        <Input
          inputStyle={styles.buttonContainer}
          > {user.email} 
         </Input>     
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
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:80
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:60,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:5,
    height:25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width:150,
    borderRadius:20,
    backgroundColor: "#00BFFF",
  },
});

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
       