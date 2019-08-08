import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:"#D7E1E9"
  },

  SignUpform: {
    flex: 5,
    justifyContent: "space-evenly",
    width: "75%"
  },
  horizontal: {
    flex:5,
    flexDirection:"row",
    justifyContent:"center",
    alignItems: "center"
  },
  inputs: {
    flex:25,
    justifyContent:"space-evenly",
    alignItems: "center"
  },
  errMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  flex1: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    flex: 1
  },
});

export default styles;
