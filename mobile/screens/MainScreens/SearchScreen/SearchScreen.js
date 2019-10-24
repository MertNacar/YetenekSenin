import React, { Component } from "react";
import { View, Button, TouchableOpacity } from "react-native";
import styles from "./styles";
import InputHandler from "../../../src/components/InputHandler/InputHandler";
import SearchCardList from "../../../src/components/SearchCard/SearchCardList";
import { SearchBar } from "react-native-elements";
import * as Http from "../../../utils/httpHelper";
import { connect } from "react-redux";
import MainText from "../../../src/components/MainText/MainText";
import { Navigation } from "react-native-navigation";
class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      loading: null,
      err: false,
      users: null,
      token: this.props.getUser.token
    };
    Navigation.events().bindComponent(this, "SearchScreen");
  }

  componentDidAppear() {
    this.searchImmediately();
  }

  searchImmediately = async () => {
    try {
      let { token } = this.state
      this.setState({ loading: true });
      let data = await Http.get(`/search/user/recommendation`, token);
      if (data.err) throw new Error();
      else {
        this.setState({
          users: [...data.users],
          loading: false,
        });
      }
    } catch {
      this.setState({
        loading: false
      });
    }

  }

  search = async value => {
    try {
      this.setState({ loading: true, value })
      let { token } = this.state
      let data = await Http.get(`/search/user?username=${value}`, token);
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
          containerStyle={styles.containerSearch}
          inputContainerStyle={styles.inputContainerSearch}
          onChangeText={value => this.search(value)}
          value={value}
          lightTheme={true}
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
