import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {NavigationBar} from '../../../components';
import ImageLoad from "../../../components/ImageLoad";
import {isEmptyObject, showToast} from "../../../utils/ComonHelper";

const item = [{
    number: 213218467238,
    status: '待付款',
    title: '澳门名苑大酒店',
    time: '2018-06-13至2018-06-20',
    notes: {count1: 7, count2: 2, nature: '城市观景双人房 '},
    price: 2345
}, {
    number: 213218467238,
    status: '待付款',
    title: '澳门名苑大酒店',
    time: '2018-06-13至2018-06-20',
    notes: {count1: 7, count2: 2, nature: '城市观景双人房 '},
    price: 2345
}, {
    number: 213218467238,
    status: '待付款',
    title: '澳门名苑大酒店',
    time: '2018-06-13至2018-06-20',
    notes: {count1: 7, count2: 2, nature: '城市观景双人房 '},
    price: 2345
}, {
    number: 213218467238,
    status: '已付款',
    title: '澳门大酒店',
    time: '2017-06-13至2018-06-20',
    notes: {count1: 2, count2: 1, nature: '城市观景双人房 '},
    price: 6666
}];

export default class HotelItem extends PureComponent {
    state = {};
    _color = (status) => {
        if (status === '待付款') {
            return "#E54A2E"
        } else if (status === '已取消') {
            return "#333333"
        } else if (status === '待入住') {
            return "#4A90E2"
        } else if (status === '已完成') {
            return "#333333"
        }
    };
    _line = () => {
        return (
            <View style={{height: 1, width: '100%', backgroundColor: "#F3F3F3"}}/>
        )
    };

    _notes = (notes) => {
        return <View style={styles.notes}>
            {notes.map((item, i) => {
               return  <Text styl={{color:"#AAAAAA",fontSize:12,marginRight:12}} key={i}>{item}</Text>
            })}
        </View>
    };

    render() {
        const {number, status, title, time, notes, price} = item;
        return (
            <View style={styles.itemView}>
                <View style={styles.statusView}>
                    <Text style={{color: "#333333", fontSize: 14}}>订单编号：{number}</Text>
                    <View style={{flex: 1}}/>
                    <Text style={{fontSize: 14, color: this._color(status)}}>{status}</Text>
                </View>
                {this._line}
                <View style={styles.item}>
                    <ImageLoad
                        style={{width: 100, height: 96}}
                        source={Images.APPbanner}/>
                    <View style={styles.message}>
                        <Text style={{color: "#333333", fontSize: 16}}>{title}</Text>
                        <Text style={{color: "#666666", fontSize: 12, marginTop: 7}}>{time}</Text>
                        {!isEmptyObject(notes) ? this._notes(notes) : null}
                    </View>
                </View>
                {this._line}

            </View>
        )
    }
}


const styles = StyleSheet.create({
    notes:{
        flexDirection: 'row',
        marginTop:10
    },
    message: {
        flexDirection: 'column',
        marginLeft: 14
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
    }
})