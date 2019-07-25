import { StyleSheet, Dimensions } from "react-native";

let fullHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: "center"
  },
  containerSearch: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  containerCard: {
    marginTop: fullHeight / 64,
    marginBottom: fullHeight / 64,
    height: fullHeight / 1.7
    //flex : 1
  },
  rowCard: {
    flex: 1,
    flexDirection: "row",
    margin: fullHeight / 42
  },

  imageCard: {
    height: fullHeight / 3,
    alignSelf: "stretch"
  },

  childUp: {
    fontFamily: "sans-serif-medium",
    flex: 1,
    height: fullHeight / 32
  },

  childDown: {
    fontFamily: "sans-serif-medium",
    flex: 1,
    height: fullHeight / 22,
    paddingBottom: fullHeight / 64,
    alignItems: "flex-end"
  },
  buttonCard: {
    flex: 1,
    height: fullHeight / 21,
    paddingBottom: fullHeight / 64
  }
});

export default styles;