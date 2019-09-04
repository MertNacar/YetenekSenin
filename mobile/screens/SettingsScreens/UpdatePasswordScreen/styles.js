import { StyleSheet } from "react-native";
import { COLOR_BACKGROUND } from "../../../src/styles/const";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: COLOR_BACKGROUND
  },
  inputRow: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    width:"100%"
  },
  buttons: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end"
  }
});

export default styles;
