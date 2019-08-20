import React, { Component } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import Card from "./Card";
import styles from "./styles";
import * as Http from "../../../utils/httpHelper";
import { getTokenStorage } from "../../AsyncStorage";

export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      let { items, page, token } = this.state;

      let data = await Http.get(`/home/?page=${page}`, token);

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
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
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
