import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CardList from '../components/Card/CardList';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <CardList />
    );
  }
}


