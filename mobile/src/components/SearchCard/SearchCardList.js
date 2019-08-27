import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import SearchCard from "./SearchCard";
import * as Http from "../../../utils/httpHelper";
import { Provider, connect } from "react-redux";
import store from "../../store/configureStore";
import { Navigation } from "react-native-navigation";
import { viewUser } from "../../store/userView/userViewActionCreator";
SearchCardList = props => {
  goProfile = async username => {
    let token = props.getUser.token;
    try {
      let data = await Http.get(`/profile/show?user=${username}`, token);
      if (data.err) throw new Error();
      else {
        props.viewUser(data.user);
        Navigation.push(props.componentId, {
          component: {
            name: "yeteneksenin.screens.ViewProfileScreen",
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
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Provider store={store}>
      <FlatList
        data={props.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SearchCard
            item={item}
            onPress={() => this.goProfile(item.username)}
          />
        )}
      />
    </Provider>
  );
};

mapDispatchToProps = dispatch => {
  return {
    viewUser: userView => dispatch(viewUser(userView))
  };
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
