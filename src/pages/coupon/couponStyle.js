import {StyleSheet} from 'react-native'
import {Colors, Metrics} from "../../Themes";

export default StyleSheet.create({
    sameView:{
        flexDirection:'row',
        backgroundColor:"white",
        alignItems:'center'
    },
    itemView:{
        marginTop:15,
        marginBottom:13,
        marginLeft:23,
        marginRight:18
    },
    itemLeft:{
        flexDirection:'column'
    },
    txt1:{
        color:"#AAAAAA",
        fontSize:12
    },
    touchView:{
        width:81,
        height:32,
        backgroundColor:"#FF4C4C",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:16

    }
})