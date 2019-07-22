import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import InputHandler from "../../src/components/Input/InputHandler";
import { storeDataStorage } from "../../src/AsyncStorage/index";
import { MainTabs } from "../AllScreens";
import styles from "../../src/styles/styles";
import * as Http from "../../utils/httpHelper";
import { Navigation } from "react-native-navigation";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        password: ""
      },
      err: null
    };
  }

  post = async () => {
    let body = this.state.data;
    try {
      let data = await Http.post("/login", body);

      if (!data.status) {
        throw new Error(data.message);
      } else {
        let store = await storeDataStorage(data.token);

        if (store.err) {
          this.setState({ err: true });
          throw new Error("Bir hatayla karşılaştık");
        } else {
          MainTabs();
        }
      }
    } catch {
      this.setState({ err: true });
    }
  };
  goSignup = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "yeteneksenin.screens.SignUpScreen",
        passProps: {
          text: "Pushed screen"
        },
        options: {
          topBar: {
            visible: true,
            title: {
              text: "SIGN UP"
            }
          }
        }
      }
    });
  };
  render() {
    let { err } = this.state;
    if (err === null || err) {
      return (
        <View style={styles.containerLogin}>
          <View style={{ display: err ? "flex" : "none" }}>
            <Text>Hatalı giriş yaptınız lütfen tekrar deneyiniz.</Text>
          </View>
          <Text>Log In</Text>
          <InputHandler
            textHolder="Kullanıcı Adı"
            textChange={username => this.setState({ username })}
          />
          <InputHandler
            textHolder="Sifre"
            textChange={password => this.setState({ password })}
          />

          <Button title="Entry" onPress={this.post} />

          <Button title="Kayıt Ol" onPress={this.goSignup} />
        </View>
      );
    }
  }
}
