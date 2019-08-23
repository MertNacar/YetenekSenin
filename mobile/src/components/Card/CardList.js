import React, { Component } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import Card from "./Card";
import styles from "./styles";
import * as Http from "../../../utils/httpHelper";
import { getTokenStorage } from "../../AsyncStorage";
import { connect, Provider } from "react-redux";
import { addUser } from "../../store/user/userActionCreator";
import store from "../../store/configureStore";

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.getUser.userID,
      items: [],
      token: "",
      itemLength: 0,
      err: false,
      loading: true,
      page: 0,
      threshold: 0.5
    };
  }

  async componentDidMount() {
    let token = await getTokenStorage();
    this.setState(
      {
        token: token.value
      },
      () => {
        this.getData();
      }
    );
  }

  getData = async () => {
    try {
      let { items, page, token, userID } = this.state;

      let data = await Http.get(`/home/?page=${page}&userID=${userID}`, token);

      if (data.err === true) throw new Error("Hata");
      else {
        this.setState({
          items: [...items, ...data.gelen],
          loading: false,
          itemLength: data.gelenLen
        });
      }
    } catch {
      this.setState({ err: true, loading: false });
    }
  };

  handleLoadMore = () => {
    let { itemLength, page } = this.state;
    if (itemLength > 0) {
      this.setState({ page: page + 1 }, this.getData);
    } else {
      this.setState({
        threshold: null
      });
    }
  };

  renderFooter = () => {
    let { loading } = this.state;
    return loading ? (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    ) : null;
  };

  render() {
    let { loading, items, err, threshold } = this.state;
    if (items.length == 0 || loading || err) {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Provider>
      );
    }
    return (
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Card item={item} />}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={threshold}
        ListFooterComponent={this.renderFooter}
        showsVerticalScrollIndicator={false}
      />
    );
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
)(CardList);
