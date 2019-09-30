import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { connect } from "react-redux";
import { viewUser } from "../../../src/store/userView/userViewActionCreator";
import styles from './styles'
import * as Http from '../../../utils/httpHelper'
class ViewProfileScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            user: null
        }
    }
    async componentDidMount() {
        try {
            let { token, userID } = this.props
            let data = await Http.get(`/profile/show?userID=${userID}`, token);
            if (data.err) throw new Error();
            else {
                this.props.viewUser(data.user);
                this.setState({ user: data.user, loading: false })
            }
        } catch (err) {
            this.setState({ loading: true })
        }
    }

    render() {
        let { loading, user } = this.state;
        if (loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        else {
            return (
                <View>
                    <Text> {user.tblUser.firstname} </Text>
                    <Text> {user.tblUser.surname} </Text>
                    <Text> {user.tblUser.username} </Text>
                    <Text> {user.tblUser.email} </Text>
                    <Text> {user.tblUser.phone} </Text>
                    <Text> {user.tblUser.profilePhoto} </Text>
                    <Text> {user.tblUser.socialMedia} </Text>
                    <Text> {user.tblUser.city} </Text>
                </View>
            )
        }
    }
}

mapDispatchToProps = dispatch => {
    return {
        viewUser: userView => dispatch(viewUser(userView))
    };
};


mapStateToProps = state => {
    return {
        getUser: state.userView
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileScreen);