/**
 * wallet.style.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/7/12.
 *
 */

import {
    StyleSheet,
} from 'react-native';
import {Images, Colors, Metrics, ApplicationStyles} from '../../Themes';

export default StyleSheet.create({
    my_amount: {
        height: 82,
        width: Metrics.screenWidth,
        paddingLeft: 18
    },
    lb_amount: {
        fontSize: 12,
        color: Colors.txt_444,
        marginTop: 12
    },
    txt_amount: {
        fontSize: 28,
        color: Colors.txt_444,
        marginTop: 8
    },
    card: {
        backgroundColor: 'white',
        alignItems: 'center'
    },
    wallet_item: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        width: Metrics.screenWidth - 34,
        borderTopColor: Colors._ECE,
        borderTopWidth: 1
    },
    right: {
        height: 18.5,
        width: 10
    },
    txt_item_name: {
        fontSize: 14,
        color: Colors.txt_444
    },
    card2: {
        backgroundColor: 'white',
        paddingLeft: 17,
        paddingTop: 14
    },
    txt_withdraw: {
        fontSize: 18,
        color: Colors.txt_444,
        fontWeight: 'bold'
    },
    item_input: {
        height: 50,
        width: Metrics.screenWidth - 34,
        borderBottomColor: Colors._ECE,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24
    },
    money: {
        fontSize: 20,
        color: Colors.txt_444,
        fontWeight: 'bold'
    },
    can_money: {
        fontSize: 12,
        color: Colors._AAA,
    },
    view_can: {
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    all_get: {
        fontSize: 12,
        color: '#4A90E2',
        marginRight: 17
    },
    view_desc: {
        height: 62,
        width: '100%',
        paddingTop: 11,
        paddingLeft: 17
    },
    lb_around: {
        fontSize: 12,
        color: Colors._CCC
    },
    card3: {
        backgroundColor: 'white',
        paddingLeft: 17,
        flex: 1
    },
    item_way: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        width: Metrics.screenWidth - 34,
        borderBottomColor: Colors._ECE,
        borderBottomWidth: 1,
    },
    txt_pay: {
        fontSize: 14,
        color: Colors.txt_444,
        fontWeight:'bold'
    },
    view_pay: {
        height: 30,
        width: Metrics.screenWidth - 34,
        borderBottomColor: Colors._ECE,
        borderBottomWidth: 1,
        marginTop: 10
    },
    btn_cash: {
        height: 44,
        width: Metrics.screenWidth - 34,
        backgroundColor: '#E54A2E',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius:2
    },
    txt_cash: {
        color: 'white',
        fontSize: 14
    }
})