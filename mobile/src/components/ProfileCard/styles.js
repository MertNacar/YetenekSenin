import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowCardBody: {
    aspectRatio: 1,
    width: "100%"
  },
  rowIcon: {
    backgroundColor: "black",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  watch: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center"
  },
  star: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center"
  },
  white: { color: "white" }
});

export default styles;
