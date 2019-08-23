import React, { Component } from "react";
import { Text,TextInput, View, StyleSheet,Image,TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Input } from "react-native-elements";
import * as Http from "../../../utils/httpHelper";
import CustomButton from "../../../src/components/CustomButton/CustomButton";
class UpdateInformationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstname:"",
        surname:"",
        username:"",
        phone:"",
        aboutMe:"",
        city:"",
        email:"",
      }
    }
    
  }
 editProfilePost = async () => {
  let token = props.getUser.token
  try {
    let user = { ...this.state.data}
    let data = await Http.post("/profile/update/",user,token);
    if(data==null || data.err) throw new Error();
    else {
      this.props.editUser(user);
      Navigation.push(this.props.componentId, {
        component: {
          id:"ProfileScreen",
          name: "yeteneksenin.screens.ProfileScreen",
          options: {
            topBar: {
              visible: false,
              title: {
                text: "Yetenek Senin"
              }
            }
          }
        }
      });
    }
    
  }
  catch(err){
    
  }
}
InputChange = (input, inputName) => {
 
    this.setState({
      data: { ...this.state.data, [inputName]: input },
      });
     
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        <View style={styles.body}>
        
        <Input
        inputStyle={styles.buttonContainer}
        onChangeText={firstname =>
        this.InputChange(firstname,"firstname")
        }
        
        > {this.props.getUser.firstname} </Input>
        
        <Input 
          inputStyle={styles.buttonContainer}
          onChangeText={surname =>
          this.InputChange(surname,"surname")
          }> {this.props.getUser.surname} </Input>
        <Input
        inputStyle={styles.buttonContainer}
        onChangeText={username =>
        this.InputChange(username,"username")
        }
        
        > {this.props.getUser.username} </Input>
        <Input
        inputStyle={styles.buttonContainer}
         onChangeText={phone =>
          this.InputChange(phone,"phone")
          }> 
        
         {this.props.getUser.phone} </Input>
        <Input
        inputStyle={styles.buttonContainer}
        onChangeText={aboutMe =>
        this.InputChange(aboutMe,"aboutMe")
        }
        
        > {this.props.getUser.aboutMe} </Input>
        <Input
        inputStyle={styles.buttonContainer}
        onChangeText={city =>
        this.InputChange(city,"city")
        }
        
        > {this.props.getUser.city} </Input>
        
        
        <Input
          inputStyle={styles.buttonContainer}
          onChangeText={email =>
          this.InputChange(email,"email")
          }> {this.props.getUser.email} 
         </Input>     
         <CustomButton onPress={this.editProfilePost}> Güncelle </CustomButton>
         </View>
         
      </View>
    );
  }
}

/*mapDispatchToProps = dispatch => {
    return {
      viewUser: userView => dispatch(viewUser(userView))
    };
  };*/

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};
mapDispatchToProps = dispatch => {
  return {
    editUser: user => dispatch(editUser(user))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(UpdateInformationScreen);

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