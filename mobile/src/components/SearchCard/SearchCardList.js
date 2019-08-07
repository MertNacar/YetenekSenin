import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import SearchCard from "./SearchCard";
export default (SearchCardList = props => {
  return (
    <FlatList
      data={props.data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <SearchCard item={item} />}
    />
  );
});
