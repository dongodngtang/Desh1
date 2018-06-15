import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import PayCountDown from '../../../components/PayCountDown';
import {cancelMallOrder, postWxPay, getWxPaidResult, postOrderConfirm, deleteMall} from "../../../services/MallDao";
import {HotelStatus} from "../../../configs/Status";
import {util, payWx, isWXAppInstalled, call, alertOrder, showToast} from '../../../utils/ComonHelper';
import {DeShangPhone} from '../../../configs/Constants';


export default class CompletedBottom extends Component {


    state = {
        isInstall: false
    };

    componentDidMount() {
        isWXAppInstalled(isInstall => {
            this.setState({
                isInstall: isInstall
            })
        });
    }

    render() {
        const {orderItem} = this.props;
        return (
            <View style={styles.page}>
                <Text style={{color:"#333333",marginLeft:14,fontSize:14}}>合计：<Text style={{color:"#E54A2E",fontSize:18}}>1184.4</Text></Text>
                <View style={{flex:1}}/>
                {this.switchOrder(orderItem)}
            </View>
        )
    }

    switchOrder = (orderItem) => {
        const {status} = orderItem;
        switch (status) {
            case HotelStatus.unpaid:
                return this.renderPay(orderItem);
            case HotelStatus.paid:
                return this.paidOrder(orderItem);

            default:
                return this.renderPay(orderItem);
        }
    };


    wxPay = (order_number) => {
        if (this.state.isInstall) {
            let data = {order_number: order_number};
            postWxPay(data, ret => {
                payWx(ret, () => {
                    getWxPaidResult(data, result => {
                        if (this.props.refresh)
                            this.props.refresh();
                    }, err => {
                        showToast('支付成功，系统正在处理')
                    })

                }, () => {

                })
            }, err => {

            });
        }
        else
            alertOrder('need_weChat', () => {
            })
    };


    renderPay = (item) => {
        const {order_number} = item;
        return (
            <View style={styles.bottomView}>
                <TouchableOpacity
                    style={styles.cancelView}
                    onPress={() => {
                        alertOrder("确认取消？", () => {
                            cancelMallOrder({order_number: order_number}, ret => {
                                if (this.props.refresh)
                                    this.props.refresh();
                            }, err => {
                            })
                        });
                    }}
                    >
                    <Text style={styles.payment}>取消订单</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.payView}
                                  onPress={() => {
                                      this.wxPay(order_number);
                                  }}>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={{fontSize: 14, color: '#FFFFFF', zIndex: 999}}>付款</Text>
                    </View>

                </TouchableOpacity>

            </View>
        )
    };

    paidOrder = () => {

        return <View style={styles.bottomView}>
            <TouchableOpacity
                onPress={() => {
                    call(DeShangPhone)
                }}
                style={styles.returnedBottom}>
                <Text style={styles.orderSubmitTxt}>{I18n.t('contact_customer_service')}</Text>
            </TouchableOpacity>

        </View>
    };

}


const styles = StyleSheet.create({
    page:{
        flexDirection:'row',backgroundColor:'white',paddingTop:7,paddingBottom:7,alignItems:'center',
        borderTopWidth:1,
        borderTopColor:'#F3F3F3'
    },
    payView: {
        height: 36,
        width: 103,
        borderRadius: 4,
        backgroundColor: '#F34A4A',
        marginLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelView:{
        width:103,
        height:36,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
        borderWidth:1,
        borderColor:'#888888'
    },
    bottomView: {
        marginRight:17,
        flexDirection: 'row',
        alignItems: 'center'
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
    returnedBottom2: {
        borderWidth: 1,
        borderColor: '#F34A4A',
        borderRadius: 4,
        width: 90,
        height: 37,
        marginRight: 17,
        alignItems: 'center',
        justifyContent: 'center'
    },
    customer: {
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 4,
        width: 90,
        height: 37,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    payment: {
        fontSize: 14,
        color: '#333333'
    }
})