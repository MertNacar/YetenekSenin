import React, { Component } from "react";
import CardList from "../../../../src/components/Card/CardList";
import { connect } from "react-redux";

class VideosScreen extends Component {
  render() {
    return <CardList/>
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};
export default connect(mapStateToProps)(VideosScreen);
