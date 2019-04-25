import React, { Component } from 'react';
import { StyleSheet,View, Text,Button,TextInput } from 'react-native';


export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      err:null,
    };
  }

     async post(){
      //istek yolladık cevap geldi serverdan(vtabanı kontrolü)
      try{
        let response= await fetch('http://192.168.0.30:8080/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          }),
        });
       
       let data = await response.json();

   //cevap kontrol yapmak için let data      
       if(!data || data.err){
        throw new Error("Hata")
       } 
       else {
          this.setState({
            err:false
          })
        }
      }catch{      
        this.setState({err:true})
      }
 }
  

  render() {
    
    let control = this.state.err
    if (control)
    {
      return(
        <View style={styles.container} >   
       <Text>Log In</Text>
       <Text>Kullanıcı Adı şifre yanlıştır.</Text>
       <TextInput placeholder="Kullanıcı Adı" onChangeText={(username) => this.setState({username})} underlineColorAndroid="transparent"/>
       <TextInput placeholder="Sifre" onChangeText={(password) => this.setState({password})}  underlineColorAndroid="transparent"/>
       <Button title="Entry" onPress={this.post.bind(this)}/>
     </View>

      );

    }else if(control == false){
      return(
        <View>
          <Text>Başarılı Gİriş</Text>
          
           </View>
      );
    }

    else{

      return (  
        <View style={styles.container} >
       <Text>Log In</Text>
       

       <TextInput placeholder="Kullanıcı Adı" onChangeText={(username) => this.setState({username})} underlineColorAndroid="transparent"/>
       <TextInput placeholder="Sifre" onChangeText={(password) => this.setState({password})}  underlineColorAndroid="transparent"/>
       <Button title="Entry" onPress={this.post.bind(this)}/>
     </View>
    );
  }
  }
}

const styles=StyleSheet.create({
  container:{
   borderColor:"red",
   borderWidth:1
  },
  inputContainer:{
    flex:1,
    flexDirection:"column",
    justifyContent:"space-between"
  }
});