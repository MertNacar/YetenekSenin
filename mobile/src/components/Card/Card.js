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
          <Text style={styles.childUp}>Video Title</Text>
          <Text style={styles.childUpRight}>Video Türü</Text>
        </View>

        <TouchableOpacity style={styles.image} onLongPress={this.ClickImage}>
          <Image
            style={styles.image}
            source={{ uri: 'https://di-uploads-pod12.dealerinspire.com/universitydodgeram/uploads/2017/10/University-Dodge-Challenger-AWD-Charger-AWD.jpg' }} />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.childDown}>ProfileName</Text>
          <Button title="Takip et" buttonStyle={styles.button} type="clear" />
        </View>

        <View style={styles.row}>
          <Text style={styles.childDown}>DescriptionssDescriptionDescriptionDescriptionDescriptionDescription</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.childDown}>İzlenme Sayısı</Text>
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