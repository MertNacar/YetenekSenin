import { StyleSheet } from "react-native";
import { COLOR_PRIMARY } from "../../styles/const";
const styles = StyleSheet.create({
  mainText: {
    color: "black",
    backgroundColor: "transparent",
    textAlign: "center"
  },

  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: COLOR_PRIMARY
  }
});

export default styles;
