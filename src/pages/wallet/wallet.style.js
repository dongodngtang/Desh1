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
    }
})