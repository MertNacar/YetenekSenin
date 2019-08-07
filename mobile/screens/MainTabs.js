import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { Platform, Dimensions } from "react-native";
let getWidth = Dimensions.get("window").width;
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
    ),
    Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30)
  ]).then(sources => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          options: {
            sideMenu: {
              right: {
                width: getWidth * 0.5
              }
            }
          },
          center: {
            bottomTabs: {
              options: {
                bottomTabs: {
                  visible: true,
                  drawBehind: false,
                  animate: false,
                  titleDisplayMode: "alwaysHide"
                },
                topBar: {
                  visible: false,
                  drawBehind: true
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
                        animate: false,
                        selectedIconColor: "red",
                        icon: sources[0]
                      },
                      topBar: {
                        visible: false,
                        drawBehind: true
                      }
                    }
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: "yeteneksenin.screens.SearchScreen"
                        }
                      }
                    ],
                    options: {
                      bottomTab: {
                        animate: false,
                        selectedIconColor: "red",
                        icon: sources[1]
                      },
                      topBar: {
                        visible: false,
                        drawBehind: true
                      }
                    }
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: "yeteneksenin.screens.AddVideoScreen"
                        }
                      }
                    ],
                    options: {
                      bottomTab: {
                        animate: false,
                        selectedIconColor: "red",
                        icon: sources[2]
                      },
                      topBar: {
                        visible: false,
                        drawBehind: true
                      }
                    }
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: "yeteneksenin.screens.ProfileScreen"
                        }
                      }
                    ],
                    options: {
                      bottomTab: {
                        animate: false,
                        selectedIconColor: "red",
                        icon: sources[3]
                      },
                      topBar: {
                        visible: true,
                        //animate:false,
                        //rightButtonDisabledColor:"red",
                        rightButtons: [
                          {
                            icon: sources[4],
                            id: "toggleSideMenu"
                          }
                        ]
                      }
                    }
                  }
                }
              ]
            }
          },
          right: {
            component: {
              name: "yeteneksenin.screens.SideDrawer"
            }
          }
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
            visible: false,
            drawBehind: true
          }
        },
        children: [
          {
            component: {
              name: "yeteneksenin.screens.LoginScreen"
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
            visible: false,
            drawBehind: true
          }
        }
      }
    }
  });
};
export { MainTabs, AuthTabs, InitTab };