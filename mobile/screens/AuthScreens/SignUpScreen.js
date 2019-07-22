import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import InputHandler from "../../src/components/Input/InputHandler";
import { storeDataStorage } from "../../src/AsyncStorage/index";
import * as Http from "../../utils/httpHelper";
import { MainTabs } from "../AllScreens";
export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "tessnssssdasssss10",
        password: "ssasdassssssss",
        email: "aaashkba@sssdsh",
        birthday: "2012-02-21 18:10:00.000",
        firstname: "mertsmert",
        surname: "ncaasr"
      },
      errMessage: "",
      err: null
    };
  }

  post = async () => {
    try {
      let body = this.state.data;
      let data = await Http.post("/signup", body);
      console.warn(data);
      if (data.err) throw new Error(data.message);
      else {
        await storeDataStorage(data.token);
        return MainTabs();
      }
    } catch (err) {
      this.setState({ err: true, errMessage: err.message });
    }
  };

  render() {
    let { err } = this.state;
    let { errMessage } = err ? this.state : "";
    if (err === null || err) {
      return (
        <View>
          <Text> {errMessage} </Text>
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

          <Button title="Entry" onPress={this.post} />
        </View>
      );
    }
  }
}
