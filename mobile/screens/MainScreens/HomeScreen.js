import React, { Component } from "react";
import CardList from "../../src/components/Card/CardList";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <CardList />;
  }
}
