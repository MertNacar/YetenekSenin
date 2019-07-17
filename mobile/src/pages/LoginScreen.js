import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",
      autoLogin: false,
      loading: true,
      err: false
    };
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem("tokenJWT");
      if (value !== null) {
        this.setState({
          token: value
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
        err: e.message
      });
    }
  };

  storeData = async token => {
    try {
      await AsyncStorage.setItem("tokenJWT", token);
    } catch (e) {
      this.setState({
        tokenErr: e.messeage
      });
    }
  };

  async componentDidMount() {
    await this.getData()
    try {
      if (true) {
        let res = await fetch("http://192.168.1.24:8000/login/immediately", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: this.state.token
          })
        });
        
        let data = await res.json();

        if (data.err == true) throw new Error(data.message);
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
    try {
      let response = await fetch("http://192.168.0.30:8080/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      let data = await response.json();

      if (data.err && !data.status) {
        throw new Error("Hata");
      } else {
        this.setState(
          {
            err: false,
            token: data.token
          },
          () => {
            this.storeData(data.token);
          }
        );
      }
    } catch {
      this.setState({ err: true });
    }
  };

  render() {
    let { autoLogin, err, loading } = this.state;
    if (loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (!loading && autoLogin) {
      //YÖNLENDİRME
      return (
        <View>
          <Text>YÖNLENDİRİLDİNİZ</Text>
        </View>
      );
    } else if (err) {
      return (
        <View style={styles.container}>
          <Text>Log In</Text>
          <Text>Kullanıcı Adı şifre yanlıştır.</Text>
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
          <Button title="Entry" onPress={this.post()} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Log In</Text>

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
          <Button title="Entry" onPress={this.post()} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
