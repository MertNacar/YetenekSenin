import { StyleSheet } from "react-native";
import { COLOR_PRIMARY } from "../../styles/const";
const styles = StyleSheet.create({
  rowSingle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor:COLOR_PRIMARY
  },
  flex1:{
    flex:1
  },
  flex4: {
    flex: 4,
    paddingLeft:10
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    height: "25%",
    width: "20%",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLOR_PRIMARY,
    alignItems: "center",
    justifyContent: "center"
  },
  checkedButton: {
    height: "85%",
    width: "80%",
    borderRadius: 6
  }
});

export default styles;
