import {StyleSheet} from 'react-native'
import {Colors, Metrics} from "../../Themes";

export default StyleSheet.create({
    sameView:{
        flexDirection:'row',
        alignItems:'center'
    },
    itemView:{
        flexDirection:'row',
        alignItems:'center',
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
        justifyContent:'center',
        alignItems:'center',
        borderRadius:16,
        marginTop:7


    }
})