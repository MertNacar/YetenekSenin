import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { HomeScreen, ProfileScreen, SearchScreen } from "../../pages/index";
import Icon from "react-native-vector-icons/Ionicons";

const Navigator = createBottomTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="md-home" color={tintColor} size={24} />
          )
        }
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="md-contact" color={tintColor} size={24} />
          )
        }
      },
      Search: {
        screen: SearchScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="md-search" color={tintColor} size={24} />
          )
        }
      }
    },
    {
      initialRouteName: "Home",
      order: ["Home", "Search", "Profile"],
      navigationOptions: {
        tabBarVisible: true
      },
      tabBarOptions: {
        showLabel: false,
        activeTintColor: "red",
        inactiveTintColor: "gray"
      }
    }
  );
  
  export default createAppContainer(Navigator);