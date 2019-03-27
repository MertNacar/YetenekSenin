import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import Card from "./Card";




export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      err: false,
      loading:true
    };
  }
  
   async componentDidMount() {
  
    try {
      const url = 'http://192.168.0.30:8080/'; 
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.err == true) throw new Error("Hata")

      else {
        this.setState({ items: data.gelen, loading:false })
      }

    } catch {
      this.setState({ err: true , loading:false})
     
    }
  }


  render() {
    if (this.state.items.length == 0 || this.state.loading || this.state.err) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <FlatList
        data={this.state.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Card item={item} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

