import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import SearchCard from "./SearchCard";
import { Provider, connect } from "react-redux";
import store from "../../store/configureStore";
import { Navigation } from "react-native-navigation";

class SearchCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      token: this.props.getUser.token
    };
    Navigation.events().bindComponent(this, "SearchScreen");
  }

  componentDidAppear() {
    this.setState({ pressed: false })
  };

  goProfile = userID => {
    let { pressed, token } = this.state
    if (!pressed) {
      this.setState({ pressed: true }, () => {
        Navigation.push("SearchScreen", {
          component: {
            name: "yeteneksenin.screens.ViewProfileScreen",
            passProps: {
              userID,
              token
            },
            options: {
              bottomTab: {
                visible: false
              },
              topBar: {
                visible: false,
                drawBehind: true
              }
            }
          }
        })
      });
    }
  }
  render() {
    return (
      <Provider store={store}>
        <FlatList
          data={this.props.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <SearchCard
              item={item}
              onPress={() => this.goProfile(item.userID)}
            />
          )}
        />
      </Provider>
    );
  };
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};

export default connect(
  mapStateToProps
)(SearchCardList);
