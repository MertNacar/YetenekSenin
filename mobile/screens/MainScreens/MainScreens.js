import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
const MainTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === "android" ? "md-home" : "ios-home", 30),
    Icon.getImageSource(
      Platform.OS === "android" ? "md-search" : "ios-search",
      30
    ),
    Icon.getImageSource(
      Platform.OS === "android" ? "md-videocam" : "ios-videocam",
      30
    ),
    Icon.getImageSource(
      Platform.OS === "android" ? "md-person" : "ios-person",
      30
    )
  ]).then(sources => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          options: {
            bottomTabs: {
              visible: true,
              drawBehind: false
            }
          },
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: "yeteneksenin.screens.HomeScreen"
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    icon: sources[0]
                  }
                }
              }
            },
            {
              component: {
                name: "yeteneksenin.screens.SearchScreen",
                options: {
                  bottomTab: {
                    icon: sources[1]
                  }
                }
              }
            },
            {
              component: {
                name: "yeteneksenin.screens.AddVideoScreen",
                options: {
                  bottomTab: {
                    icon: sources[2]
                  }
                }
              }
            },
            {
              component: {
                name: "yeteneksenin.screens.ProfileScreen",
                options: {
                  bottomTab: {
                    icon: sources[3]
                  }
                }
              }
            }
          ]
        }
      }
    });
  });
};

const AuthTabs = () => {
  Navigation.setRoot({
    root: {
      stack: {
        options: {
          topBar: {
            visible: false
          }
        },
        children: [
          {
            component: {
              name: "yeteneksenin.screens.LoginScreen",
              options: {
                topBar: {
                  title: "LOGIN"
                }
              }
            }
          }
        ]
      }
    }
  });
};

const InitTab = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "yeteneksenin.screens.InitScreen"
            }
          }
        ],
        options: {
          topBar: {
            title:"Logging"
          }
        }
      }
    }
  });
};
export { MainTabs, AuthTabs, InitTab };
