/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput, Platform,
    StyleSheet, Image, Text
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {SecurityText, ActionPay, Loading} from '../../components';
import {crowd_order, crowd_wx_pay, crowd_wx_paid_result} from '../../services/CrowdDao';
import {isWXAppInstalled, showToast, alertOrderChat, isEmptyObject, idCardStatus} from '../../utils/ComonHelper';
import {Verified} from '../../configs/Status'

export default class SubscriptionConfirmPage extends PureComponent {
    state = {
        clickImg: false,
        order: {},
        isInstall: false
    };

    componentDidMount() {
        isWXAppInstalled(isInstall => {
            this.setState({
                isInstall: isInstall
            })
        });
    }

    submitBtn = () => {
        const {order_info, verified} = this.props;
        const {number, stock_unit_price} = order_info;
        order_info.user_extra_id = verified.id;
        if (this.state.clickImg) {

            this.loading.open();
            crowd_order(order_info, data => {
                crowd_wx_pay(data, ret => {
                    this.loading.close();
                    let order = {
                        price: stock_unit_price * number,
                        order_number: data.order_number
                    };

                    let payOrder = {
                        order,
                        wxPay: ret
                    };

                    this.actionPay.open(payOrder);
                }, err => {
                    this.loading.close();
                });

            }, err => {
                showToast(err)
                this.loading.close();
            })
        } else {
            showToast('必须同意扑客协议')
        }

    };

    total_prize = (number, stock_unit_price) => {
        if (isNaN(number) || isNaN(stock_unit_price)) {
            return 0
        }
        return number * stock_unit_price;
    };

    render() {

        const {order_info, verified} = this.props;
        const {number, player_id, stock_unit_price, race_name} = order_info;
        console.log(order_info)
        let sumMoney = this.total_prize(number, stock_unit_price);
        const {cert_no, real_name} = verified;
        return (
            <View style={ApplicationStyles.bgContainer}>

                <View style={styles.page}>
                    <View style={styles.title}>
                        <Text style={styles.titleTxt}>{I18n.t('order_msg')}</Text>
                    </View>

                    <View style={[styles.message, {paddingTop: 15}]}>
                        <Text style={styles.messageTxt1}>{I18n.t('order_price')}</Text>

                        <Text style={styles.messageTxt2}>¥{stock_unit_price}</Text>
                    </View>
                    <View style={[styles.message, {marginTop: 6, paddingBottom: 13}]}>
                        <Text style={styles.messageTxt1}>{I18n.t('purchase_copies')}</Text>

                        <Text style={styles.messageTxt1}>X{number}</Text>
                    </View>

                </View>

                <View style={styles.buy}>
                    <Text style={styles.messageTxt2}>¥{sumMoney}</Text>
                    <Text style={styles.messageTxt1}>{I18n.t('payment')}</Text>

                </View>

                <View
                    style={{
                        height: 67,
                        flexDirection: 'row', alignItems: 'center',
                        backgroundColor: 'white',
                        paddingLeft: 17,
                        paddingRight: 17,
                        marginTop: 5
                    }}>
                    <View style={{flex: 1}}>
                        <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 10}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize: 15, color: Colors.txt_666, marginRight: 9}}>
                                    {I18n.t('real_name')}:</Text>
                                <Text style={{fontSize: 15, color: Colors.txt_666}}>
                                    {verified.real_name}</Text>

                                <Text style={this.statusStyle(verified.status)}>
                                    {idCardStatus(verified.status)}
                                </Text>
                            </View>

                        </View>

                        <View style={{flexDirection: 'row', marginTop: 8}}>
                            <Text style={{fontSize: 15, color: Colors.txt_666, marginRight: 9}}>
                                {verified.cert_type === 'chinese_id' ? I18n.t('ID_card') : I18n.t('password_card')}</Text>
                            <SecurityText
                                securityOptions={{
                                    isSecurity: true,
                                    startIndex: 3,
                                    endIndex: 12,
                                }}
                                style={{fontSize: 15, color: Colors.txt_666}}>
                                {verified.cert_no}</SecurityText>
                        </View>
                    </View>


                </View>

                <View style={styles.read}>
                    <View style={{marginLeft: 17, marginRight: 17}}>
                        <Text style={styles.readTxt1}>我是投资人本人{real_name}，身份证号码<SecurityText
                            securityOptions={{
                                isSecurity: true,
                                startIndex: 3,
                                endIndex: 15,
                            }}>
                            {cert_no}
                        </SecurityText>，我已认真阅读并同意
                            <Text style={{color: '#438EE6'}}
                                  onPress={() => {
                                      global.router.toRiskWarningPage(sumMoney, order_info, this.state.clickImg, this.state.order)
                                  }}>《风险提示》</Text>
                            及其他相关条款和协议，自愿认购{race_name}众筹项目，并支付众筹款项
                            <Text style={{color: Colors._F34}}>{sumMoney}元</Text>。</Text>

                    </View>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 12,
                            marginLeft: 17,
                            marginRight: 17
                        }}
                        onPress={() => {
                            this.setState({
                                clickImg: !this.state.clickImg
                            })
                        }}>
                        <Image style={styles.img} source={this.state.clickImg ? Images.clickImgBlue : Images.clickImg}
                               alt=""/>
                        <Text style={styles.txt}>{I18n.t('promise_message')}</Text>
                    </TouchableOpacity>
                </View>


                <ActionPay
                    ref={ref => this.actionPay = ref}
                    callback={(order) => {
                        crowd_wx_paid_result(order, ret => {
                            global.router.replaceCrowdOrder(order.order_number)
                        }, err => {

                        })

                    }}
                    pay_ways={[
                        {
                            icon: Images.wx_pay,
                            title: I18n.t('pay_weixin'),
                            memo: I18n.t('pay_weixin_support'),
                            index: 0

                        }
                    ]}
                />

                <Loading ref={ref => this.loading = ref}/>
            </View>


        );
    }

    statusStyle = (status) => {
        switch (status) {
            case Verified.PENDING:
                return styles.pendingStatus;
            case Verified.PASSED:
                return [styles.pendingStatus, {
                    borderColor: '#34BA3C',
                    color: '#34BA3C'
                }];
            case Verified.FAILED:
                return [styles.pendingStatus, {
                    borderColor: '#F34A4A',
                    color: '#F34A4A',
                }];
        }
    }
}


const styles = StyleSheet.create({
    page: {
        marginTop: 5,
        backgroundColor: 'white'
    },
    title: {
        height: 40,
        paddingLeft: 17,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors._ECE
    },
    titleTxt: {
        fontSize: 14,
        color: Colors._333,
        fontWeight: 'bold'

    },
    message: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 17,
        paddingRight: 17
    },

    messageTxt1: {
        fontSize: 14,
        color: '#333333'
    },
    messageTxt2: {
        fontSize: 18,
        color: '#F34A4A'
    },
    buy: {
        marginTop: 1,
        paddingLeft: 17,
        paddingTop: 11,
        paddingBottom: 11,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    read: {
        marginTop: 10,
        paddingTop: 18,
        paddingBottom: 15,
        backgroundColor: '#ECECEE'
    },
    readTxt1: {
        fontSize: 14,
        color: '#444444',
        lineHeight: 20
    },
    readTxt2: {
        fontSize: 14,
        color: '#F34A4A'
    },
    readTxt3: {
        fontSize: 14,
        color: '#438EE6'
    },
    img: {
        width: 16,
        height: 16
    },
    txt: {
        fontSize: 14,
        color: '#444444',
        marginLeft: 10
    },
    pendingStatus: {
        fontSize: 11,
        paddingTop: 3,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 1,
        borderWidth: 1,
        borderColor: '#6DB0FF',
        color: '#6DB0FF',
        borderRadius: 2,
        textAlign: 'center',
        marginLeft: 13
    }


});