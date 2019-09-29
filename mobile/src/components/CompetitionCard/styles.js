import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal:5,
    paddingVertical:10,
  },
  logo: {
    flex: 1,
  },
  banner: {
    flex: 7,
    justifyContent:"center",
    alignItems:"flex-start"
  },
  description : {
    flex:7,
    flexDirection:"row",
    justifyContent:"space-between"
  }
});

export default styles;
