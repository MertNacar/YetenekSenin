import React, { Component } from 'react'
import { TextInput } from 'react-native'

export default class InputHandler extends Component {
    render() {
        return (
            <TextInput
            placeholder={this.props.textHolder}
            onChangeText={this.props.textChange}
            underlineColorAndroid="transparent"
          />
        )
    }
}
