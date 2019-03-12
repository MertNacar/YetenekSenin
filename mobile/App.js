import React  from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, ProfileScreen,SettingsScreen } from './src/model/';
import Icon from 'react-native-vector-icons/Ionicons';

 
const Navigator = createBottomTabNavigator({
  Home: { screen: HomeScreen ,
  navigationOptions:{
    tabBarLabel:'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-beer" color={tintColor} size={24} />
    )
  }},
  Profile: { screen: ProfileScreen ,
    navigationOptions:{
      tabBarLabel:'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-bookmarks" color={tintColor} size={24} />
      )
    }},
  Settings: { screen: SettingsScreen ,
    navigationOptions:{
      tabBarLabel:'Settings',
      tabBarIcon: ( {tintColor} ) => (
        <Icon name="md-bus" color={tintColor} size={24} />
      )
    }}
  },{
    initialRouteName: 'Home',
    order: ['Home','Profile','Settings'],
      navigationOptions:{
        tabBarVisible: true
      },
      tabBarOptions:{
        activeTintColor:'red',
        inactiveTintColor:'gray'
      }
    }
);


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


const App = createAppContainer(Navigator);

export default App;
