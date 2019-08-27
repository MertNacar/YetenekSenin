import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#00BFFF",
        height:150,
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:80
      },
      name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
      },
      body:{
        marginTop:60,
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
      },
      name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
      },
      info:{
        fontSize:16,
        color: "#00BFFF",
        marginTop:10
      },
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
      },
      buttonContainer: {
        marginTop:5,
        height:25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        width:150,
        borderRadius:20,
        backgroundColor: "#00BFFF",
      }
});

export default styles;
