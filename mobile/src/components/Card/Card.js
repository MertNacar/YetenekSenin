import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Video from 'react-native-video';
import moment from 'moment';
import styles from "../../styles/styles"

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
      <View style={styles.containerCard}>

        <View style={styles.rowCard}>
          <Text style={styles.childUp}>{item.videoTitle}</Text>
          <Text style={styles.childUp}>{item.subTalentName}</Text>
        </View>

        <TouchableOpacity style={styles.imageCard} onLongPress={this.ClickImage}>
          <Video
            style={styles.imageCard}
            repeat={true}
            source={{ uri:item.videoPath}} />
        </TouchableOpacity>

        <View style={styles.rowCard}>
          <Text style={styles.childDown}>{item.username}</Text>
          <Text style={styles.childDown}>{item.videoWatchCount}</Text>
        </View>

        <View style={styles.rowCard}>
          <Text style={styles.childDown}>{item.videoDescription}</Text>
          <Button title="Takip et" buttonStyle={styles.buttonCard} type="clear" />
        </View>

        <View style={styles.rowCard}>
          <Text style={styles.childDown}>{time}</Text>
        </View>

      </View>
    );
  }
}


