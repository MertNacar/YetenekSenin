import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  profileHeader: {
    flex: 1.2,
    flexDirection: "row"
  },
  photoSection: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },
  image: {
    resizeMode: "contain",
    width: 75,
    height: 75
  },
  talentSection: {
    flex: 2,
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  profileBody: {
    flex: 2,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    paddingLeft: 5
  },
  profileFooter: {
    flex: 2
  }
});

export default styles;
