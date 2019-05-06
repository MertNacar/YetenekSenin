import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import Card from "./Card";



export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      err: false,
      loading:true,
      page:0
    };
  }
  
   async componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const url = 'http://192.168.0.30:8080/?page=' + this.state.page; 
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.err == true) throw new Error("Hata")

      else {
        this.setState({ items:[...this.state.items, ...data.gelen], loading:false })
      }

    } catch {
      this.setState({ err: true , loading:false})
     
    }
  }

  handleLoadMore = () => {
    this.setState(
      {page: this.state.page + 1 },
      this.getData
    )
  }

  renderFooter = () => {
    return(
      this.state.loading ?
      <View style={styles.container}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View> : null
    )
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
        renderItem={({ item }) => <Card item={item}/>}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.5} 
        ListFooterComponent={this.renderFooter}
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

