import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthTabs } from "../../MainTabs";
import Modal, {
  ModalFooter,
  ModalButton,
  ModalContent
} from "react-native-modals";
import styles from "./styles";
import MainText from "../../../src/components/MainText/MainText";
import { Navigation } from "react-native-navigation";
export default class SideDrawer extends Component {
  state = {
    visiblePopup: false
  };
  goUpdate = screenID => {
    Navigation.mergeOptions("SideDrawer", {
      sideMenu: {
        right: {
          visible: false
        }
      }
    });
    Navigation.push("ProfileScreen", {
      component: {
        id: screenID,
        name: `yeteneksenin.screens.${screenID}`,
        options: {
          bottomTab: {
            visible: false
          },
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerMenu}>
          <Button
            title="Bilgileri Güncelle"
            onPress={() => this.goUpdate("UpdateInformationScreen")}
          />

          <Button
            title="Şifre Değiştir"
            onPress={() => this.goUpdate("UpdatePasswordScreen")}
          />

          <Button
            title="Ayarlarım"
            onPress={() => this.goUpdate("UpdateSettingsScreen")}
          />
        </View>
        <View style={styles.containerButton}>
          <Modal
            visible={this.state.visiblePopup}
            footer={
              <ModalFooter>
                <ModalButton
                  text="Hayır"
                  onPress={() => {
                    this.setState({ visiblePopup: false });
                  }}
                />
                <ModalButton
                  text="Evet"
                  onPress={() => {
                    AsyncStorage.clear();
                    AuthTabs();
                  }}
                />
              </ModalFooter>
            }
          >
            <ModalContent>
              <Text>Çıkış yapmak istediğinize emin misiniz?</Text>
            </ModalContent>
          </Modal>
          <View style={styles.containerButton}>
            <Button
              title="Çıkış Yap"
              color="red"
              onPress={() => {
                Navigation.mergeOptions("SideDrawer", {
                  sideMenu: {
                    right: {
                      visible: false
                    }
                  }
                });
                this.setState({
                  visiblePopup: true
                });
              }}
            ></Button>
          </View>
        </View>
      </View>
    );
  }
}
