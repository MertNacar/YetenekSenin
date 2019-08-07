import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthTabs } from "../../MainTabs";
import styles from "./styles";
import MainText from "../../../src/components/MainText/MainText";
export default class SideDrawer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerMenu}>
          <MainText> Bilgileri Güncelle </MainText>

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
