import React, {Component, PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import PayCountDown from '../../../components/PayCountDown';
import {HotelStatus} from "../../../configs/Status";
import {util, payWx, isWXAppInstalled, call, alertOrder, showToast, alertOrderChat} from '../../../utils/ComonHelper';
import {DeShangPhone} from '../../../configs/Constants';
import {getHotelWxPaidResult, postHotelWxPay} from "../../../services/MacauDao";


export default class CompletedBottom extends Component {


    render() {
        const {orderItem} = this.props;
        const {total_price} = orderItem.order;
        return (
            <View style={styles.page}>
                <Text style={{color: "#333333", marginLeft: 14, fontSize: 14}}>合计：<Text
                    style={{color: "#E54A2E", fontSize: 18}}>{total_price}</Text></Text>
                <View style={{flex: 1}}/>
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
                return <UnpaidBottom/>;
        }
    };


    renderPay = (item) => {
        const {order_number} = item;
        return (
            <UnpaidBottom/>
        )
    };

    paidOrder = () => {

        return <View style={styles.UnpaidBottom}>
            <TouchableOpacity
                onPress={() => {
                    console.log("ppppp:",DeShangPhone)
                    call(DeShangPhone)
                }}
                style={styles.returnedBottom}>
                <Text style={styles.orderSubmitTxt}>{I18n.t('contact_customer_service')}</Text>
            </TouchableOpacity>

        </View>
    };

}

export class UnpaidBottom extends PureComponent {
    _formatTime = (diff) => {

        let min = 0;

        if (diff >= 60) {
            min = Math.floor(diff / 60);
            diff -= min * 60;

        }

        return `${I18n.t('pay')} ${min}:${diff}`
    };
    render() {
        const {order_number} = this.props;
        return (
            <View style={styles.UnpaidBottom}>
                <TouchableOpacity
                    style={styles.cancelView}
                    // onPress={() => {
                    //     alertOrder("确认取消？", () => {
                    //         cancelMallOrder({order_number: order_number}, ret => {
                    //             if (this.props.refresh)
                    //                 this.props.refresh();
                    //         }, err => {
                    //         })
                    //     });
                    // }}
                >
                    <Text style={styles.payment}>取消订单</Text>
                </TouchableOpacity>


                <View style={styles.payView}>
                    <PayCountDown
                        frameStyle={styles.payCount}
                        beginText='倒计时'
                        endText='付款失效'
                        count={60 * 30}
                        pressAction={() => {
                            this.wxPay({order_number});
                        }}
                        changeWithCount={(count) => `${this._formatTime(count)}`}
                        id={order_number}
                        ref={(e) => {
                            this.countDownButton = e
                        }}/>

                </View>

            </View>
        )
    }


    wxPay = (data) => {

        isWXAppInstalled(installed => {
            if (installed) {
                postHotelWxPay(data, ret => {
                    payWx(ret, () => {
                        getHotelWxPaidResult(data, result => {

                            this.props.refresh && this.props.refresh();

                        }, err => {
                            showToast('支付成功，系统正在处理')
                        }, () => {
                        })

                    }, () => {
                        global.router.toOrderStatusPage(data.order_number)
                    })
                }, err => {

                });
            } else {
                alertOrderChat("支付需要安装微信")
            }

        })
    }
}

const styles = StyleSheet.create({
    payCount: {
        height: 36,
        backgroundColor: '#F34A4A',
        alignItems: 'flex-start'
    },
    page: {
        flexDirection: 'row', backgroundColor: 'white', paddingTop: 7, paddingBottom: 7, alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F3F3F3'
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
    cancelView: {
        width: 103,
        height: 36,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#888888'
    },
    UnpaidBottom: {
        marginRight: 17,
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