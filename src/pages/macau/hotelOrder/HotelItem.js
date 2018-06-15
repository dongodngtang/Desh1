import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {NavigationBar} from '../../../components';
import ImageLoad from "../../../components/ImageLoad";
import {isEmptyObject, showToast} from "../../../utils/ComonHelper";

const item = {
    number: 213218467238,
    status: '待付款',
    title: '澳门名苑大酒店',
    time: '2018-06-13至2018-06-20',
    notes: ['7晚', '2间', '城市观景双人房 '],
    price: 2345
};

export default class HotelItem extends PureComponent {
    state = {};
    _line = () => {
        return (
            <View style={{height: 1, width: '100%', backgroundColor: "#F3F3F3"}}/>
        )
    };

    _notes = (notes) => {
        return <View style={styles.notes}>
            {notes.map((item, i) => {
               return  <Text style={{color:"#AAAAAA",fontSize:12,marginRight:12}} key={i}>{item}</Text>
            })}
        </View>
    };

    render() {
        const {number, status, title, time, notes, price} = item;
        return (
            <View style={styles.itemView}>
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
        marginLeft: 14,
        marginTop:2
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