import { StyleSheet } from "react-native";
import { COLOR_PRIMARY,COLOR_BACKGROUND } from "../../../src/styles/const";
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
    flex: 3
  },
  row: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  rowSingle: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  info: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderColor: COLOR_PRIMARY,
    marginVertical: 10
  },
  infoWords: {
    fontSize: 16,
    padding: 5
  },
  button: {
    flex: 2,
    marginTop: 20,
    marginBottom: 15
  },
  singleInput: {
    width: "97%"
  },
  footer: {}
});

export default styles;
