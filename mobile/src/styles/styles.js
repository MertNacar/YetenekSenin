import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  SignUpform: {
    flex: 4,
    justifyContent: "space-evenly",
    width: "75%"
  },
  LoginForm: {
    flex: 3,
    justifyContent: "space-evenly",
    width: "75%"
  },
  errMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  flex2: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  inputHandler: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 7,
    borderColor: "#29aaf4",
    padding: 5,
    margin: 8
  },

  textHeadingLogin: {
    fontSize: 22,
    fontWeight: "bold"
  },
  LinkView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  LinkText: {
    textAlign: "center",
    color: "blue",
    backgroundColor: "transparent"
  },
  mainText: {
    color: "black",
    backgroundColor: "transparent",
    textAlign: "center"
  },

  backgroundImage: {
    flex: 1
  },

  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#29aaf4"
  },

  containerCard: {
    flex: 1,
    marginBottom: 20
  },

  rowCardHeader: {
    marginTop: 10,
    flex: 2,
    flexDirection: "row"
  },

  VideoTitle: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  positionLeft: {
    paddingLeft: 5
  },
  positionRight: {
    paddingRight: 5
  },
  subTalent: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  rowCardBody: {
    marginTop: 10,
    aspectRatio: 2,
    width: "100%"
  },
  rowCardFooter: {
    marginTop: 10,
    paddingLeft: 5,
    flex: 2,
    flexDirection: "row"
  },

  rowCardFooterTime: {
    paddingLeft: 5,
    flex: 2
  },

  cardIcons: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  watching: {
    flex: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  cardTime: {
    flex: 2,
    justifyContent: "flex-start"
  }
});

export default styles;
