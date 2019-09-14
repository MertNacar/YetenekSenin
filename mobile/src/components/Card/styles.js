import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  containerCard: {
    flex: 1,
    marginBottom: 20
  },
  modalButton:{
    flex:1,
    backgroundColor:"#9a8888"
  },

  rowCardHeader: {
    marginTop: 10,
    flex: 2,
    flexDirection: "row"
  },

  UserBar: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  positionLeft: {
    textAlign: "left",
    paddingLeft: 5
  },
  subTalent: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  positionRight: {
    textAlign: "right",
    paddingRight: 5
  },

  rowCardBody: {
    marginTop: 10,
    aspectRatio: 1.3,
    width: "100%"
  },
  rowCardFooter: {
    marginTop: 10,
    paddingLeft: 5,
    flex: 2,
    flexDirection: "row"
  },

  rowCardFooterTime: {
    flex: 2,
    justifyContent: "flex-start"
  },

  cardIcons: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  watching: {
    flex: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

export default styles;
