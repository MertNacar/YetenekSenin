import React, { Component } from "react";
import { Text, View } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import ProfileCard from "./ProfileCard";
export default class ProfileCardList extends Component {
  render() {
    console.log(this.props.items);
    return (
      <FlatGrid
        spacing={2}
        itemDimension={120}
        items={this.props.items}
        renderItem={({ item }) => <ProfileCard item={item} />}
      />
    );
  }
}
