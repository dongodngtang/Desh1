import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import ImageLoad from "../../components/ImageLoad";
import {isEmptyObject, showToast} from "../../utils/ComonHelper";
import I18n from "react-native-i18n";

export default class ReservationBottom extends PureComponent {

    render() {
        return (
            <View style={styles.mallBottom}>
                <Text style={styles.payment}>在线支付：<Text style={{color: "#F24A4A",fontSize: 18}}>¥2182.8</Text></Text>

                <View style={{flex: 1}}/>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{color: "#AAAAAA",fontSize: 12}} >明细</Text>
                    <Image style={{width:10,height:5,marginLeft:6}} source={Images.macau.down}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.orderView}
                    onPress={() => {

                    }}>
                    <Text style={{color:"#FFFFFF",fontSize:14}}>提交订单</Text>

                </TouchableOpacity>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    orderView:{
        width:89,
        height:37,
        backgroundColor:'#F24A4A',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:7,
        paddingBottom:6,
        marginRight:17,
        marginLeft:10,
        borderRadius:4
    },
    mallBottom: {
        height: 50,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        zIndex: 99
    },
    payment: {
        marginLeft: 17,
        color: "#333333",
        fontSize: 14
    }
})