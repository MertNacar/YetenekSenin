import { StyleSheet } from "react-native";
import { COLOR_PRIMARY } from "../../styles/const";
const styles = StyleSheet.create({
  container: {
    flexDirection:"row"
  },
  inputHandler: {
    width: "100%",
    textAlign: "left",
    backgroundColor: "transparent",
  },
  inputBar:{
    backgroundColor:"black",
    borderTopWidth: 1,
    width:"100%",
  }
});

export default styles;
