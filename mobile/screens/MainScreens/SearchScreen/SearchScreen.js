import React, { Component } from "react";
import { View, Button, TouchableOpacity } from "react-native";
import styles from "./styles";
import InputHandler from "../../../src/components/InputHandler/InputHandler";
import SearchCardList from "../../../src/components/SearchCard/SearchCardList";
import { SearchBar } from "react-native-elements";
import * as Http from "../../../utils/httpHelper";
import { connect } from "react-redux";
import MainText from "../../../src/components/MainText/MainText";
class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      value: null,
      loading: null,
      err: false,
      users: null
    };
  }

  search = async value => {
    this.setState({ loading: true, value });
    let token = this.props.getUser.token;
    try {
      let data = await Http.post("/search/user", value, token);
      if (data.err) throw new Error();
      else {
        this.setState({
          users: [...data.users],
          loading: false,
          err: false
        });
      }
    } catch {
      this.setState({
        err: true,
        loading: false
      });
    }
  };

  render() {
    let { users, err, value } = this.state;
    let display = err ? (
      <MainText>Aradığınız kişiyi bulamadık.</MainText>
    ) : (
      <SearchCardList data={users} />
    );
    return (
      <View style={{ flex: 1 }}>
          <SearchBar
            placeholder="Yetenekli Bul"
            onChangeText={value => this.search(value)}
            value={value}
            //lightTheme={true}
          />
        <View style={{ flex: 24 }}>{display}</View>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};

export default connect(mapStateToProps)(SearchScreen);
