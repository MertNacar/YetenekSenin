import { StyleSheet } from "react-native";
import { COLOR_PRIMARY, COLOR_BACKGROUND } from "../../../../src/styles/const";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    justifyContent:"flex-start"
  },
  rowSingle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth:1
  }
});

export default styles;
