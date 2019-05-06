import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Video from 'react-native-video';
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
    /*let nowDay = new Date().getFullYear();
    let createdDate = this.props.item.createdAt;
    let finalDate = Math.abs(now - createdDate);
    */
    return (
      <View style={styles.container}>

        <View style={styles.row}>
          <Text style={styles.childUp}>{this.props.item.videoTitle}</Text>
          <Text style={styles.childUp}>{this.props.item.tblSubTalent.subTalentName}</Text>
        </View>

        <TouchableOpacity style={styles.image} onLongPress={this.ClickImage}>
          <Video
            style={styles.image}
            repeat={true}
            source={{ uri:this.props.item.videoPath}} />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.childDown}>{this.props.item.tblUser.username}</Text>
          <Text style={styles.childDown}>{this.props.item.videoWatchCount}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.childDown}>{this.props.item.videoDescription}</Text>
          <Button title="Takip et" buttonStyle={styles.button} type="clear" />
        </View>

        <View style={styles.row}>
          <Text style={styles.childDown}>{this.props.item.createdAt}</Text>
        </View>

      </View>
    );
  }
}

let fullHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    marginTop: fullHeight / 64,
    marginBottom: fullHeight / 64,
    height: fullHeight / 1.7,
    //flex : 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: fullHeight / 42
  },

  image: {
    height: fullHeight / 3,
    alignSelf: 'stretch',
  },

  childUp: {
    fontFamily: 'sans-serif-medium',
    flex: 1,
    height: fullHeight / 32,
  },

  childDown: {
    fontFamily: 'sans-serif-medium',
    flex: 1,
    height: fullHeight / 22,
    paddingBottom: fullHeight / 64,
    alignItems: 'flex-end',
  },
  button:{
    flex: 1,
    height: fullHeight / 21,
    paddingBottom: fullHeight / 64,
  }
 

});