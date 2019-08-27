import React, { Component } from "react";
import { View, Image, Text  } from "react-native";
import { connect } from "react-redux";
import { Input } from "react-native-elements";
import * as Http from "../../../utils/httpHelper";
import styles from "./styles";
import CustomButton from "../../../src/components/CustomButton/CustomButton";
class UpdateSettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstname: "",
        surname: "",
        username: "",
        phone: "",
        aboutMe: "",
        city: "",
        email: ""
      }
    };
  }
  editProfilePost = async () => {
    let token = props.getUser.token;
    try {
      let user = { ...this.state.data };
      let data = await Http.post("/profile/update/", user, token);
      if (data == null || data.err) throw new Error();
      else {
        this.props.editUser(user);
        Navigation.push(this.props.componentId, {
          component: {
            id: "ProfileScreen",
            name: "yeteneksenin.screens.ProfileScreen",
            options: {
              topBar: {
                visible: false,
                title: {
                  text: "Yetenek Senin"
                }
              }
            }
          }
        });
      }
    } catch (err) {}
  };
  InputChange = (input, inputName) => {
    this.setState({
      data: { ...this.state.data, [inputName]: input }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>UPDATE Settings</Text>
      </View>
    );
  }
}

/*mapDispatchToProps = dispatch => {
    return {
      viewUser: userView => dispatch(viewUser(userView))
    };
  };*/

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};
mapDispatchToProps = dispatch => {
  return {
    editUser: user => dispatch(editUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateSettingsScreen);
