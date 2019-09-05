import { StyleSheet } from "react-native";
import { COLOR_BACKGROUND } from "../../../src/styles/const";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: COLOR_BACKGROUND
  },
  buttons: {
    paddingTop: 42,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  inputRow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  pickerRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  video: {
    flex: 3,
    borderWidth: 1,
    width: "100%"
  }
});

export default styles;
