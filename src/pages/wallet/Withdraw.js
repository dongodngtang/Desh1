/**
 * Withdraw.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/7/12.
 *
 */

import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text, Image,
    View,
} from 'react-native';
import {Images, Colors, Metrics} from '../../Themes';
import styles from './wallet.style'
import {BaseComponent, NavigationBar, Input} from '../../components'
import PopAction from "../comm/PopAction";
import I18n from "react-native-i18n";

const list = [{id: 0, name: '支付宝'}, {id: 1, name: '微信'}, {id: 2, name: '银行卡'}];

export default class Withdraw extends Component {

    state = {
        way: '支付宝',

    }

    render() {
        const {way} = this.state;
        return <BaseComponent>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors._E54}}
                title="提现"
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>


            <View style={styles.card2}>
                <Text style={styles.txt_withdraw}>提现金额</Text>
                <View style={styles.item_input}>
                    <Text style={[styles.money, {marginRight: 8}]}>¥</Text>
                    <Input
                        others={
                            {
                                keyboardType: 'numeric'
                            }}
                        style={styles.money}
                        placeholder={'输入提现金额'}/>
                </View>
                <View style={styles.view_can}>
                    <Text style={styles.can_money}>{`可提现￥0.00元`}</Text>
                    <Text style={styles.all_get}>全部提现</Text>
                </View>

            </View>

            <View style={styles.view_desc}>
                <Text style={styles.lb_around}>最低提现50元，最高提现¥1000元</Text>
            </View>

            <View style={styles.card3}>
                <TouchableOpacity style={styles.item_way} onPress={() => {
                    this.popAction && this.popAction.toggle();
                }}>
                    <Text style={styles.txt_withdraw}>提现方式</Text>
                    <View style={{flex: 1}}/>
                    <Text style={[styles.txt_pay, {marginRight: 12}]}>{way}</Text>
                    <Image style={styles.right}
                           source={Images.adr_right}/>
                </TouchableOpacity>

                <Text style={[styles.txt_pay, {marginTop: 34}]}>{way}号</Text>

                <View style={styles.view_pay}>

                    <Input
                        others={
                            {
                                keyboardType: 'numeric'
                            }}
                        style={styles.txt_pay}
                        placeholder={`填写${way}号`}/>
                </View>

                <Text style={[styles.txt_pay, {marginTop: 34}]}>真实姓名</Text>

                <View style={styles.view_pay}>

                    <Input
                        others={
                            {
                                keyboardType: 'numeric'
                            }}
                        style={styles.txt_pay}
                        placeholder={'填写真实姓名'}/>
                </View>

                <TouchableOpacity style={styles.btn_cash}>

                    <Text style={styles.txt_cash}>立即提现</Text>
                </TouchableOpacity>
            </View>


            <PopAction
                ref={ref => this.popAction = ref}
                btnArray={this.popActions()}/>

        </BaseComponent>
    }

    report = (data) => {
        this.setState({
            way: data.name
        })
        this.popAction && this.popAction.toggle()
    };

    //弹窗
    popActions = () => {
        let resultArray = [];
        list.forEach((data, index) => {
            let item = {name: data.name, txtStyle: {color: '#444444'}, onPress: () => this.report(data)};
            resultArray.push(item);
        });
        // resultArray.push({
        //     name: I18n.t('cancel'),
        //     txtStyle: {color: Colors._AAA},
        //     onPress: () => this.popAction.toggle()
        // });

        return resultArray;
    };

}