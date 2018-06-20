import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {NavigationBar} from '../../../components';
import ImageLoad from "../../../components/ImageLoad";
import {isEmptyObject, showToast} from "../../../utils/ComonHelper";

export default class HotelItem extends PureComponent {

    _line = () => {
        return (
            <View style={{height: 1, width: '100%', backgroundColor: "#F3F3F3"}}/>
        )
    };

    _notes = (item) => {
        const {room_title,order} = item;
        const {nights_num,room_num} = order;
        return <View style={styles.notes}>
            <Text style={{color:"#AAAAAA",fontSize:12,marginRight:12}}>{nights_num}晚</Text>
            <Text style={{color:"#AAAAAA",fontSize:12,marginRight:12}} >{room_num}间</Text>
            <Text style={{color:"#AAAAAA",fontSize:12,marginRight:12}} >{room_title}</Text>
        </View>
    };

    render() {
        const {hotel_logo, hotel_title,order} = this.props.item;

        const {checkin_date,checkout_date} = order;
        let time = `${checkin_date}至${checkout_date}`

        return (
            <View style={styles.itemView}>
                {this._line()}
                <View style={styles.item}>
                    <ImageLoad
                        style={{width: 100, height: 96}}
                        source={{uri:hotel_logo}}/>
                    <View style={styles.message}>
                        <Text style={{color: "#333333", fontSize: 16}}>{hotel_title}</Text>
                        <Text style={{color: "#666666", fontSize: 12, marginTop: 7}}>{time}</Text>
                        { this._notes( this.props.item)}
                    </View>
                </View>
                {this._line()}

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