import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthTabs } from "../../MainTabs";
import styles from "./styles";
import MainText from "../../../src/components/MainText/MainText";
import { Navigation } from "react-native-navigation";
export default class SideDrawer extends Component {
  goUpdate = () => {
    Navigation.mergeOptions("SideDrawer", {
      sideMenu: {
        right: {
          visible: false
        }
      }
    });
    Navigation.push("ProfileScreen", {
      component: {
        id: "UpdateInformationScreen",
        name: "yeteneksenin.screens.UpdateInformationScreen",
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
          <Button title="Bilgileri Güncelle" onPress={() => this.goUpdate()} />

          <MainText> Şifre değiştir </MainText>

          <MainText> Ayarlarım </MainText>
        </View>
        <View style={styles.containerButton}>
          <Button
            title="Cıkıs Yap"
            onPress={() => {
              AsyncStorage.clear();
              AuthTabs();
            }}
          />
        </View>
      </View>
    );
  }
}
