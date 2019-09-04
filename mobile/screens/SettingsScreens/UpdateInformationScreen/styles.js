import { StyleSheet } from "react-native";
import { COLOR_PRIMARY, COLOR_BACKGROUND } from "../../../src/styles/const";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  body: {
    flex: 5
  },
  row: {
    flex: 8,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  rowItems: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical:5,
  },
  rowSingle: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  info: {
    flex: 5,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderColor: COLOR_PRIMARY,
    marginBottom: 10
  },
  infoWords: {
    fontSize: 16,
    padding: 5
  },
  button: {
    flex: 5,
    marginTop: 20,
    marginBottom: 15
  },
  singleInput: {
    width: "97%"
  }
});

export default styles;
