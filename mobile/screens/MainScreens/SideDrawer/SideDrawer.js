import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import MainText from "../../../src/components/MainText/MainText";
export default class SideDrawer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MainText> Bilgileri Güncelle </MainText>

        <MainText> Şifre değiştir </MainText>

        <MainText> Ayarlarım </MainText>

        <MainText> Çıkış Yap </MainText>
      </View>
    );
  }
}
