import React, { Component } from "react";
import CompetitionCardList from "../../../src/components/CompetitionCard/CompetitionCardList";
import { connect } from "react-redux";

class HomeScreen extends Component {
  render() {
    return <CompetitionCardList />;
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};
export default connect(mapStateToProps)(HomeScreen);
