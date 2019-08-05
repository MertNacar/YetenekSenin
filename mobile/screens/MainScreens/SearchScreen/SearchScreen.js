import React, { Component } from "react";
import { View, Button,TouchableOpacity } from "react-native";
import styles from "./styles";
import InputHandler from "../../../src/components/InputHandler/InputHandler";
import SearchCardList from "../../../src/components/SearchCard/SearchCardList";
import Icon from "react-native-vector-icons/Ionicons";
import * as Http from "../../../utils/httpHelper";
import { connect } from "react-redux";

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
  searchHandler = value => {
    this.setState({ value });
  };

  search = async () => {
    this.setState({ loading: true });
    let { value } = this.state;
    let token = this.props.getUser.token;
    try {
      let data = await Http.post("/search/user", value, token);
      console.warn("data",data)
      if (data.err) throw new Error();
      else {
        this.setState({
          users: [...data.users],
          loading: false
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
    let { users } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.searchBar}>
          <InputHandler
            style={styles.input}
            placeholder="Kullanıcı adı ile ara"
            onChangeText={value => this.searchHandler(value)}
          />
          <TouchableOpacity onPress={() => this.search()}>
            <View>
              <Icon size={25} name="md-search" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 12 }}>
          <SearchCardList data={users} />
        </View>
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
