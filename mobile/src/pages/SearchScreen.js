import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  post(){
    fetch('http://192.168.0.30:8080/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'ME',
        password: 'sifre',
      }),
    });

  }
  render() {
    return (
      <View>
        <Text> Profile </Text>
        <Button onPress={this.post}>Post</Button>
      </View>
    );
  }
}
