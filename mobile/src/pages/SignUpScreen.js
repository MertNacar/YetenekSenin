import React, { Component } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Button } from "react-native-elements";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
      firstname: "",
      surname: "",
      errMessage: "",
      err: false
    };
  }

  storeData = async token => {
    try {
      await AsyncStorage.setItem("tokenJWT", token);
    } catch (e) {
      this.setState({
        tokenErr: e.messeage
      });
    }
  };

  post = async () => {
    try {
      let response = await fetch("http://192.168.0.30:8080/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          firstname: this.state.firstname,
          surname: this.state.surname,
          birthday: this.state.birthday,
          email: this.state.email
        })
      });

      let data = await response.json();

      if (!data || data.err) {
        throw new Error("Email veya kullanıcı adınızı değiştiriniz.");
      } else {
        this.setState({
          err: false
        });
        this.storeData(data.token);
      }
    } catch (err) {
      this.setState({ err: true, errMessage: err.message });
    }
  };

  render() {
    if (err) {
      <View>
        <Text> {this.state.errMessage} </Text>
        <Text> SIGN UP </Text>
        <TextInput
          placeholder="Ad"
          onChangeText={firstname => this.setState({ firstname })}
          underlineColorAndroid="transparent"
        />
        <TextInput
          placeholder="Soyad"
          onChangeText={surname => this.setState({ surname })}
          underlineColorAndroid="transparent"
        />
        <TextInput
          placeholder="Kullanıcı Adı"
          onChangeText={username => this.setState({ username })}
          underlineColorAndroid="transparent"
        />
        <TextInput
          placeholder="Sifre"
          onChangeText={password => this.setState({ password })}
          underlineColorAndroid="transparent"
        />
        <TextInput
          placeholder="email"
          onChangeText={email => this.setState({ email })}
          underlineColorAndroid="transparent"
        />
        <TextInput
          placeholder="birthday"
          onChangeText={birthday => this.setState({ birthday })}
          underlineColorAndroid="transparent"
        />

        <Button title="Entry" onPress={this.post()} />
      </View>;
    } else {
      return (
        <View>
          <Text> SIGN UP </Text>
          <TextInput
            placeholder="Ad"
            onChangeText={firstname => this.setState({ firstname })}
            underlineColorAndroid="transparent"
          />
          <TextInput
            placeholder="Soyad"
            onChangeText={surname => this.setState({ surname })}
            underlineColorAndroid="transparent"
          />
          <TextInput
            placeholder="Kullanıcı Adı"
            onChangeText={username => this.setState({ username })}
            underlineColorAndroid="transparent"
          />
          <TextInput
            placeholder="Sifre"
            onChangeText={password => this.setState({ password })}
            underlineColorAndroid="transparent"
          />
          <TextInput
            placeholder="email"
            onChangeText={email => this.setState({ email })}
            underlineColorAndroid="transparent"
          />
          <TextInput
            placeholder="birthday"
            onChangeText={birthday => this.setState({ birthday })}
            underlineColorAndroid="transparent"
          />

          <Button title="Entry" onPress={this.post()} />
        </View>
      );
    }
  }
}
