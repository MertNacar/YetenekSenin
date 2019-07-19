import React, { Component } from "react";
import { View, Text, Button, TextInput, ActivityIndicator } from "react-native";
import InputHandler from "../components/Input/InputHandler";
import {
  getDataStorage,
  storeDataStorage
} from "../components/AsyncStorage/index";
import styles from "../styles/styles";
import * as Http from "../../utils/httpHelper";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        password: ""
      },
      token: "",
      autoLogin: false,
      loading: true,
      err: false
    };
  }

  async componentDidMount() {
    let getData = await getDataStorage();
    if (getData.err) return;
    try {
      if (getData.value) {
        let data = await Http.post("/login/immediately", {
          token: getData.value
        });
        if (data.err === true) throw new Error(data.message);
        else {
          this.setState({
            autoLogin: true,
            loading: false
          });
        }
      } else {
        return;
      }
    } catch {
      return;
    }
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
          throw new Error(store.message);
        } else {
          this.setState({
            autoLogin: true,
            loading: false
          });
        }
      }
    } catch {
      this.setState({ err: true });
    }
  };

  render() {
    let { autoLogin, err, loading } = this.state;
    if (loading) {
      return (
        <View style={[styles.containerLogin, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (!loading && autoLogin) {
      return (
        <View>
          <Text>YONLENDIRILDIN</Text>
        </View>
      );
    } else if (err) {
      return (
        <View style={styles.containerLogin}>
          <Text>Log In</Text>
          <InputHandler
            textHolder="Kullanıcı Adı"
            textChange={username => this.setState({ username })}
          />
          <InputHandler
            textHolder="Sifre"
            textChange={password => this.setState({ password })}
          />

          <Button title="Entry" onPress={this.post()} />
        </View>
      );
    } else {
      return (
        <View style={styles.containerLogin}>
          <Text>Log In</Text>
          <InputHandler
            textHolder="Kullanıcı Adı"
            textChange={username => this.setState({ username })}
          />
          <InputHandler
            textHolder="Sifre"
            textChange={password => this.setState({ password })}
          />

          <Button title="Entry" onPress={this.post()} />
        </View>
      );
    }
  }
}
