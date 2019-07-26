import React, { Component } from "react";
import { Text, View, Button, ImageBackground } from "react-native";
import InputHandler from "../../src/components/InputHandler/InputHandler";
import { storeDataStorage } from "../../src/AsyncStorage/index";
import * as Http from "../../utils/httpHelper";
import HeadingText from "../../src/components/HeadingText/headingText";
import MainText from "../../src/components/MainText/MainText";
import { MainTabs } from "../AllScreens";
import backgroundImage from "../../src/assets/image.jpg";
import styles from "../../src/styles/styles";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        password: "",
        firstname: "",
        surname: "",
        email: "",
        birthday: "2012-02-21 18:10:00.000"
      },
      errMessage: "",
      err: true
    };
  }

  post = async () => {
    try {
      let body = this.state.data
      let data = await Http.post("/signup", body);
      if (data === null || data.err) throw new Error(data.message);
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
    let { errMessage } = err === true ? this.state : "";
    if (err === null || err) {
      return (
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
        >
          <View>
            <MainText style={{ color: "red", textAlign: "center" }}>
              {errMessage}
            </MainText>
            <MainText style={{ textAlign: "center" }}>
              <HeadingText>SIGN UP</HeadingText>
            </MainText>
            <InputHandler
              placeholder="Ad"
              onChangeText={firstname => this.setState({ data : {...this.state.data, firstname} })}
            />
            <InputHandler
              placeholder="Soyad"
              onChangeText={surname => this.setState({ data : {...this.state.data, surname} })}
            />
            <InputHandler
              placeholder="Kullanıcı Adı"
              onChangeText={username => this.setState({ data : {...this.state.data, username} })}
            />
            <InputHandler
              placeholder="Sifre"
              onChangeText={password => this.setState({ data : {...this.state.data, password} })}
            />
            <InputHandler
              placeholder="Email"
              onChangeText={email => this.setState({ data : {...this.state.data, email} })}
            />
            <InputHandler
              placeholder="Birthday"
              onChangeText={birthday => this.setState({ data : {...this.state.data, birthday} })}
            />

            <Button title="Entry" onPress={this.post} />
          </View>
        </ImageBackground>
      );
    }
  }
}
