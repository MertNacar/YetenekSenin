import React  from 'react';
import { Platform, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, ProfileScreen,SettingsScreen, SearchScreen } from './src/pages/';
import Icon from 'react-native-vector-icons/Ionicons';

 
const Navigator = createBottomTabNavigator({
  Home: { screen: HomeScreen ,
  navigationOptions:{
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-home" color={tintColor} size={24} />
    )
  }},
  Profile: { screen: ProfileScreen ,
    navigationOptions:{
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-contacts" color={tintColor} size={24} />
      )
    }},
    Search: { screen: SearchScreen ,
      navigationOptions:{
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-search" color={tintColor} size={24} />
        )
      }},
  Settings: { screen: SettingsScreen ,
    navigationOptions:{
      tabBarIcon: ( {tintColor} ) => (
        <Icon name="md-settings" color={tintColor} size={24} />
      )
    }} 
  },{
    initialRouteName: 'Home',
    order: ['Home','Search','Profile','Settings'],
      navigationOptions:{
        tabBarVisible: true
      },
      tabBarOptions:{
        showLabel:false,
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
