import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
//import { createMaterialBottomTabNavigator } from 'react-navigation';
export default class App extends Component {
  render() {
    return (
      //<TabNavigator />
      <View>
        <Text>mERHABA</Text>
      </View>
    );
  }
}

/*
const TabNavigator = createMaterialBottomTabNavigator({
  Home: { screen: HomeScreen, title: "Mert" },
  Library: { screen: LibraryScreen },
  Settings: { screen: SettingsScreen },
}, {
  initialRouteName: 'Home',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
});
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
