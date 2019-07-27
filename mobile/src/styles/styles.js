import { StyleSheet, Dimensions } from "react-native";

let fullHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: "space-between",
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
  errMessage:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
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
  //////////////////////////
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
