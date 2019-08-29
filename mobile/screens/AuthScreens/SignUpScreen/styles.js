import { StyleSheet } from "react-native";
import { COLOR_BACKGROUND } from "../../../src/styles/const";
const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLOR_BACKGROUND
  },

  SignUpform: {
    flex: 3,
    justifyContent: "space-evenly",
    width: "75%"
  },

  flex2: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },

  backgroundImage: {
    flex: 1
  },
  buttons: {
    flex: 1,
    width:"30%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});

export default styles;
