import React, { Component } from "react";
import { View, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import Card from "./Card";
import styles from "./styles";
import * as Http from "../../../utils/httpHelper";
import { getTokenStorage } from "../../AsyncStorage";
import { connect, Provider } from "react-redux";
import { addUser } from "../../store/user/userActionCreator";
import store from "../../store/configureStore";
import MainText from "../MainText/MainText";

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.getUser.userID,
      competitionID: this.props.competitionView[this.props.competitionView.length - 1].competitionID,
      items: [],
      token: "",
      itemLength: 0,
      err: false,
      loading: true,
      page: 0,
      threshold: 0.5,
      refreshing: false
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
      let { items, page, token, userID, competitionID } = this.state;
      let data = await Http.get(`/home/competitions/videos?competitionID=${competitionID}&page=${page}&userID=${userID}`, token);
      if (data.err === true) throw new Error("Hata");
      else {
        this.setState({
          items: [...items, ...data.videos],
          loading: false,
          itemLength: data.videosLen,
          refreshing: false
        });
      }
    } catch {
      this.setState({ err: true, loading: false, refreshing: false });
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

  onRefresh = () => {
    this.setState({ items: [], page: 0, threshold: 0.5, loading: true, itemLength: 0, refreshing: true }, () => {
      this.getData();
    });
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
    let { loading, items, err, threshold, refreshing } = this.state;
    if (items.length == 0 || loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    else if (err) {
      <View style={styles.container}>
        <MainText>
          Bir Hatayla Karşılaştık, üzgünüz...
        </MainText>
      </View>
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh}
          />}
      />
    );
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user,
    competitionView: state.competitionView
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
