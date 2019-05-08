import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Video from 'react-native-video';
import moment from 'moment';


export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items : {
        videoTitle: this.props.item.videoTitle,
        subTalentName: this.props.item.tblSubTalent.subTalentName,
        videoPath: this.props.item.videoPath,
        username: this.props.item.tblUser.username,
        videoWatchCount: this.props.item.videoWatchCount,
        videoDescription: this.props.item.videoDescription,
        createdAt: this.props.item.createdAt
      } 
    };
  }

  ClickImage() {
    //
  }



  render() {
    item = this.state.items
    let time = moment(item.createdAt).fromNow();
    return (
      <View style={styles.container}>

        <View style={styles.row}>
          <Text style={styles.childUp}>{item.videoTitle}</Text>
          <Text style={styles.childUp}>{item.subTalentName}</Text>
        </View>

        <TouchableOpacity style={styles.image} onLongPress={this.ClickImage}>
          <Video
            style={styles.image}
            repeat={true}
            source={{ uri:item.videoPath}} />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.childDown}>{item.username}</Text>
          <Text style={styles.childDown}>{item.videoWatchCount}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.childDown}>{item.videoDescription}</Text>
          <Button title="Takip et" buttonStyle={styles.button} type="clear" />
        </View>

        <View style={styles.row}>
          <Text style={styles.childDown}>{time}</Text>
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