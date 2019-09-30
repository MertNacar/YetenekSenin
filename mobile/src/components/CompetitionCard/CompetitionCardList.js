import React, { Component } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import CompetitionCard from "./CompetitionCard";
import styles from "./styles";
import * as Http from "../../../utils/httpHelper";
import { getTokenStorage } from "../../AsyncStorage";
import { connect, Provider } from "react-redux";
import { addUser } from "../../store/user/userActionCreator";
import store from "../../store/configureStore";

class CompetitionCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      userID: this.props.getUser.userID,
      token: this.props.getUser.token
    };
  }

  async componentDidMount() {
    let { token } = this.state
    this.getData(token);
  }

  getData = async (token) => {
    try {
      let { userID } = this.state
      let data = await Http.get(`/home/competitions?userID=1`, token);
      if (data.err === true) throw new Error("Hata");
      else {
        this.setState({
          items: data.competitions,
          loading: false,
        });
      }
    } catch {
      this.setState({ loading: true });
    }
  };

  render() {
    let { loading, items } = this.state;
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <Provider store={store}>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <CompetitionCard item={item} />}
            showsVerticalScrollIndicator={false}
          />
        </Provider>
      );
    }
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};

mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompetitionCardList);
