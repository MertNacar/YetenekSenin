import React, { Component } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import CompetitionCard from "./CompetitionCard";
import styles from "./styles";
import * as Http from "../../../utils/httpHelper";
import { getTokenStorage } from "../../AsyncStorage";
import { connect, Provider } from "react-redux";
import { addUser } from "../../store/user/userActionCreator";
import store from "../../store/configureStore";
import { addCompetition } from "../../store/competition/competitionActionCreator";

class CompetitionCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userID: this.props.getUser.userID,
      token: this.props.getUser.token,
      competitions: this.props.getCompetitions
    };
  }

  async componentDidMount() {
    let { token } = this.state
    this.getData(token);
  }

  getData = async (token) => {
    try {
      let { userID } = this.state
      let data = await Http.get(`/home/competitions?userID=${userID}`, token);
      if (data.err === true) throw new Error("Hata");
      else {
        this.setState({
          competitions: data.competitions,
          loading: false,
        });
        this.props.addCompetition(data.competitions)
      }
    } catch {
      this.setState({ loading: true });
    }
  };

  render() {
    console.log("hey",this.props.getCompetitions)
    let { loading, competitions } = this.state;
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <Provider store={store}>
          <FlatList
            data={competitions}
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
    getUser: state.user,
    getCompetitions: state.competitions
  };
};

mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user)),
    addCompetition: comp => dispatch(addCompetition(comp))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompetitionCardList);
