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
              drawBehind: false,
              animate: false,
              titleDisplayMode: "alwaysHide"
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
                  topBar: { visible: false, drawBehind: true },
                  bottomTab: {
                    animate: false,
                    selectedIconColor: "red",
                    icon: sources[0]
                  }
                }
              }
            },
            {
              component: {
                name: "yeteneksenin.screens.SearchScreen",
                options: {
                  topBar: { visible: false, drawBehind: true },
                  bottomTab: {
                    animate: false,
                    selectedIconColor: "red",
                    icon: sources[1]
                  }
                }
              }
            },
            {
              component: {
                name: "yeteneksenin.screens.AddVideoScreen",
                options: {
                  topBar: { visible: false, drawBehind: true },
                  bottomTab: {
                    animate: false,
                    selectedIconColor: "red",
                    icon: sources[2]
                  }
                }
              }
            },
            {
              component: {
                name: "yeteneksenin.screens.ProfileScreen",
                options: {
                  topBar: { visible: false, drawBehind: true },
                  bottomTab: {
                    animate: false,
                    selectedIconColor: "red",
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
            /*height: 40, // TopBar height in dp
            backButton: {
              color: "white"
            },
            background: {
              color: "black"
            },
            elevation: 1.5, // TopBar elevation in dp
            title: {
              text: "Yetenek Senin",
              color: "white",
              height: 30, // TitleBar height in dp
              alignment: "center" // Center title
            }*/
            visible: false,
            drawBehind: true
          }
        },
        children: [
          {
            component: {
              name: "yeteneksenin.screens.LoginScreen",
              options: {
                topBar: {
                  title: "Yetenek Senin"
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
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        },
        children: [
          {
            component: {
              name: "yeteneksenin.screens.InitScreen"
            }
          }
        ],
        options: {
          topBar: {
            title: "Logging"
          }
        }
      }
    }
  });
};
export { MainTabs, AuthTabs, InitTab };
