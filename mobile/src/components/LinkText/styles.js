import { StyleSheet } from "react-native";
import { COLOR_PRIMARY } from "../../styles/const";
const styles = StyleSheet.create({
  LinkView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  LinkText: {
    textAlign: "center",
    color: COLOR_PRIMARY,
    backgroundColor: "transparent"
  }
});

export default styles;
