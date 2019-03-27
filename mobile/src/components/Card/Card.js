import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  ClickImage() {
    //
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={styles.row}>
          <Text style={styles.childUp}>{this.props.item.videoTitle}</Text>
          <Text style={styles.childUpRight}>{this.props.item.tblUser.tblSubTalent.subTalentName}</Text>
        </View>

        <TouchableOpacity style={styles.image} onLongPress={this.ClickImage}>
          <Image
            style={styles.image}
            source={{ uri:this.props.item.videoPath}} />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.childDown}>{this.props.item.tblUser.username}</Text>
          <Button title="Takip et" buttonStyle={styles.button} type="clear" />
        </View>

        <View style={styles.row}>
          <Text style={styles.childDown}>{this.props.item.videoDescription}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.childDown}>{this.props.item.videoWatchCount}</Text>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    marginBottom:10,
    height: 380
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    margin:15
  },

  image: {
    height: 220,
    alignSelf: 'stretch',
  },
  childUp: {
    fontFamily: 'sans-serif-medium',
    flex: 1,
    height: 20,
  },
  childUpRight: {
    fontFamily: 'sans-serif-medium',
    flex: 1,
    height: 20,
  },
  childDown: {
    fontFamily: 'sans-serif-medium',
    flex: 1,
    height: 25,
    paddingBottom:10,
    justifyContent: 'center',
  },
  button:{
    flex: 1,
    height: 30,
    paddingBottom:10,
  }
 

});