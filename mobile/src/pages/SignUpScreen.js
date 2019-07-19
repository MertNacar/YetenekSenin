import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import InputHandler from "../components/Input/InputHandler";
import { storeDataStorage } from "../components/AsyncStorage/index";
import * as Http from "../../utils/httpHelper";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "ten10",
        password: "sssssssssssss",
        email: "aaa@h",
        birthday: "2012-02-21 18:10:00.000",
        firstname: "mertmert",
        surname: "ncaar"
      },
      errMessage: "",
      err: false
    };
  }

  post = async () => {
    try {
      let body = this.state.data;

      let data = await Http.post("/signup", body);

      if (data.err) {
        throw new Error(data.message);
      } else {
        let store = await storeDataStorage(data.token);

        if (store.err) {
          this.setState({ err: true });
          throw new Error(store.message);
        } else {
          this.setState({
            autoLogin: true,
            loading: false
          });
        }
      }
    } catch (err) {
      this.setState({ err: true, errMessage: err.message });
    }
  };

  render() {
    if (false) {
      <View>
        <Text> {this.state.errMessage} </Text>
        <Text> SIGN UP </Text>
        <InputHandler
          textHolder="Ad"
          textChange={firstname => this.setState({ firstname })}
        />
        <InputHandler
          textHolder="Soyad"
          textChange={surname => this.setState({ surname })}
        />
        <InputHandler
          textHolder="Kullanıcı Adı"
          textChange={username => this.setState({ username })}
        />
        <InputHandler
          textHolder="Sifre"
          textChange={password => this.setState({ password })}
        />
        <InputHandler
          textHolder="Email"
          textChange={email => this.setState({ email })}
        />
        <InputHandler
          textHolder="Birthday"
          textChange={birthday => this.setState({ birthday })}
        />

        <Button title="Entry" onPress={this.post()} />
      </View>;
    } else {
      return (
        <View>
          <Text> SIGN UP </Text>
          <Text> SIGN UP </Text>
          <Text> SIGN UP </Text>
          <Text> SIGN UP </Text>
          <Text> SIGN UP </Text>
          <Text> SIGN UP </Text>
          <Button onPress={this.post} title="Learn More" />
        </View>
      );
    }
  }
}
