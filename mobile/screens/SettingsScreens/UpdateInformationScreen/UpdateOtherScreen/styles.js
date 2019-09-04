import { StyleSheet } from "react-native";
import { COLOR_PRIMARY, COLOR_BACKGROUND } from "../../../../src/styles/const";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    justifyContent: "flex-start"
  },
  rowItems: {
    flex: 10,
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  rowSingle: {
    flex: 1,
    margin: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  cityIcon: {
    flex: 1,
    paddingRight: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  cityPicker: {
    flex: 9,
    paddingLeft: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  datepicker: {
    flex: 15,
    paddingLeft: 5,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  dateIcon: {
    flex: 10,
    paddingRight: 5,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  button: {
    flex: 1,
    justifyContent: "flex-end"
  }
});

export default styles;
