import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from "react-redux";
 class ViewProfileScreen extends Component {
    render() {
        let len = this.props.getUser.length
        let user = this.props.getUser[len-1]
        return (
            <View>
                <Text> {user.firstname} </Text>
                <Text> {user.surname} </Text>
                <Text> {user.username} </Text>
                <Text> {user.email} </Text>
                <Text> {user.phone} </Text>
                <Text> {user.profilePhoto} </Text>
                <Text> {user.socialMedia} </Text>
                <Text> {user.city} </Text>
                
            </View>
        )
    }
}

mapStateToProps = state => {
    return {
      getUser: state.userView
    };
  };
  
  export default connect(mapStateToProps)(ViewProfileScreen);