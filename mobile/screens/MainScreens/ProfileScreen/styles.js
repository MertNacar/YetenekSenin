import { StyleSheet } from "react-native";
import { COLOR_PRIMARY } from "../../../src/styles/const";
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_PRIMARY
  },
  avatar: {
    flex: 3.5,
    width:70,
    height:null,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white"
  },
  username:{
    flex: 2,
    justifyContent:"flex-start"
  },
  fullName: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  infoHeader: {
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  },
  infoCard: {
    flex:1,
    height:"100%",
    justifyContent:"center",
    alignItems:"center",
    borderWidth: 1,
    borderColor: "gray"
    
  },
  infoIcon: {},
  body: {
    flex: 4,
  },
  bodyContent: {
    flex: 3,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF"
  },
  description: {
    fontSize: 16,
    color: "#696969",
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#00BFFF"
  }
});

export default styles;
