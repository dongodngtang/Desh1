//退换货申请页面
import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, Alert, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {NavigationBar, BaseComponent} from '../../../components';
import {postTempImg, postMallRefund} from '../../../services/MallDao';
import {strNotNull, showToast, getFileName, util, alertOrder} from '../../../utils/ComonHelper';
import ImageLoad from "../../../components/ImageLoad";
import I18n from "react-native-i18n";

export default class ReturnHotelPage extends Component {


    render(){
        const {hotel_logo, hotel_title, order} = this.props.params.item;
        const {checkin_date, checkout_date, status, total_price,order_number} = order;

        return(
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    toolbarStyle={{
                        position: 'absolute',
                        top: 0,
                        backgroundColor: 'rgba(229,74,46,' + this.state.opacity + ')'
                    }}
                    title={'申请退换货'}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <View style={styles.itemView}>
                    {this._line()}
                    <View style={styles.item}>
                        <ImageLoad
                            style={{width: 100, height: 96}}
                            source={{uri: hotel_logo}}/>
                        <View style={styles.message}>
                            <Text style={{color: "#333333", fontSize: 16}}>{hotel_title}</Text>
                            <Text style={{color: "#666666", fontSize: 12, marginTop: 7}}>{time}</Text>
                            {this._notes(this.props.item)}
                        </View>
                    </View>
                    <View style={styles.returnPriceView}>
                        <Text style={{color:'#333333',fontSize:14}}>退款金额：</Text>
                        <Text style={{color:'#F24A4A',fontSize:18}}>¥1027823</Text>
                    </View>
                    <View style={styles.returnPriceView}>
                        <Text style={{color:'#333333',fontSize:14}}>退款说明：</Text>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={text => {
                                this.setState({
                                    memo: text
                                })
                            }}
                            underlineColorAndroid='transparent'
                            numberOfLines={1}
                        />
                    </View>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    inputText: {
        height: 40,
        fontSize: 14,
        flex: 1,
        marginTop: 5
    },
    returnedBottom: {
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 4,
        width: 90,
        height: 37,
        marginRight: 17,
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderSubmitTxt: {
        fontSize: 14,
        color: '#333333'
    },
    page: {
        flex: 1,
        height: 50,
        flexDirection:'row',
        alignItems:'center'
    },
    notes: {
        flexDirection: 'row',
        marginTop: 10
    },
    message: {
        flexDirection: 'column',
        marginLeft: 14,
        marginTop: 2
    },
    item: {
        flexDirection: 'row',
        marginLeft: 17,
        marginRight: 17,
        marginTop: 12,
        marginBottom: 12
    },
    itemView: {
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    statusView: {
        marginLeft: 17,
        marginRight: 17,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    returnPriceView:{
        marginTop:11,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        paddingTop:12,
        paddingBottom:12
    }
})