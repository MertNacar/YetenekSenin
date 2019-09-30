import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import SearchCard from "./SearchCard";
import * as Http from "../../../utils/httpHelper";
import { Provider, connect } from "react-redux";
import store from "../../store/configureStore";
import { Navigation } from "react-native-navigation";
SearchCardList = props => {
  goProfile = userID => {
    let token = props.getUser.token;
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
    });
  }
  return (
    <Provider store={store}>
      <FlatList
        data={props.data}
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
mapStateToProps = state => {
  return {
    getUser: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchCardList);
