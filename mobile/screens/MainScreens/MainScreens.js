import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";

const MainTabs = () => {
  Promise.all([
    Icon.getImageSource("md-home", 30),
    Icon.getImageSource("md-search", 30),
    Icon.getImageSource("md-person", 30)
  ]).then(sources => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
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
                name: "yeteneksenin.screens.ProfileScreen",
                options: {
                  bottomTab: {
                    icon: sources[2]
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
            title: {
              text: "Logging"
            }
          }
        }
      }
    }
  });
};
export { MainTabs, AuthTabs, InitTab };
