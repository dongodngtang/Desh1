import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {NavigationBar} from '../../../components';
import ImageLoad from "../../../components/ImageLoad";
import {isEmptyObject, showToast} from "../../../utils/ComonHelper";
import {ImageMessage, Message} from '../HotelRoomListPage';
import {Prompt, ReservationTime} from '../RoomReservationPage';
import {RenderItem} from '../PaymentDetail';

export default class OrderStatusPage extends PureComponent {
    state = {};

    _person = (person) => {
        return (
            <View style={{flexDirection: 'column'}}>
                {person.map((item, i) => {
                    return (
                        <View key={i} style={{
                            width: '100%',
                            flexDirection: 'row',
                            paddingBottom: 15,
                            borderBottomColor: '#F3F3F3',
                            borderBottomWidth: 1
                        }}>
                            <Text style={styles.room_num}>{item.last_name}</Text>
                            <Text style={styles.txt}>/</Text>
                            <Text style={[styles.room_num, {marginLeft: 11}]}>{item.last_name}</Text>
                        </View>
                    )
                })}
            </View>
        )
    };
    _renderItem = ({item, index}) => {
        return (
            <RenderItem key={index} item={{item}}/>
        )
    }

    render() {
        const {order, room, persons} = this.props.params.items;
        return (
            <View style={ApplicationStyles.bgContainer}>

                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title="待入住"
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                <ScrollView style={{flexDirection: 'column', paddingBottom: 90}}>

                    <View style={styles.barView}>
                        <View style={styles.bar}>
                            <ImageMessage images={room.images}/>
                            <Message item={room}/>
                        </View>
                    </View>

                    <Prompt/>
                    <ReservationTime
                        date={this.props.params.date}/>
                    <View style={styles.orderInfo}>
                        <Text style={styles.infoTxt}>订单信息</Text>
                        <Text style={[styles.infoTxt2, {marginTop: 25}]}>订单编号：</Text>
                        <Text style={[styles.infoTxt2, {marginTop: 6}]}>下单时间：</Text>
                        <Text style={[styles.infoTxt2, {marginTop: 6}]}>订单状态：</Text>
                    </View>

                    <View style={styles.reservationInfo}>
                        <Text style={[styles.infoTxt, {marginBottom: 10}]}>预订信息</Text>
                        <View style={{width: '100%', height: 1, backgroundColor: '#F3F3F3'}}/>
                        <View style={styles.txtView}>
                            <Text style={styles.txt}>房间数</Text>
                            <Text style={styles.room_num}>{order.room_num}</Text>
                        </View>
                        <View style={styles.personView}>
                            <Text style={[styles.txt, {marginRight: 24}]}>入住人</Text>
                            {this._person(persons)}
                        </View>

                        <View style={styles.txtView}>
                            <Text style={styles.txt}>手机号</Text>
                            <Text style={styles.room_num}>12343434</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 17, paddingTop: 10,paddingBottom:23, backgroundColor: 'white', flexDirection: 'column'}}>
                        <Text style={[styles.infoTxt, {marginBottom: 10}]}>订单明细</Text>
                        <View style={{width: '100%', height: 1, backgroundColor: '#F3F3F3'}}/>

                        <FlatList
                            style={{marginLeft: 30,marginRight: 22,marginTop:26}}
                            showsHorizontalScrollIndicator={false}
                            data={order.items}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index + "item"}
                        />
                        <View style={{marginLeft: 30,marginRight: 22,marginTop:17}}>
                            <Text style={styles.infoTxt}>应付金额</Text>
                            <View style={{flex:1}}/>
                            <Text style={{color:"#E54A2E",fontSize:14}}>¥12433</Text>
                        </View>
                    </View>

                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    personView: {
        flexDirection: 'row',
        marginTop: 14,
        marginLeft: 14,
        marginRight: 13,
        paddingBottom: 14,
        backgroundColor: 'white',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F3F3F3'

    },
    room_num: {
        color: '#444444',
        fontSize: 15,
        marginLeft: 39
    },
    txtView: {
        marginLeft: 14,
        flexDirection: 'row',
        marginTop: 14,
        alignItems: 'center'
    },
    txt: {
        color: '#AAAAAA',
        fontSize: 14
    },
    reservationInfo: {
        marginTop: 5,
        paddingTop:10,
        flexDirection: 'column'
    },
    infoTxt2: {
        color: "#333333",
        fontSize: 14,
        marginLeft: 17
    },
    infoTxt: {
        color: "#333333",
        fontSize: 14,
        marginLeft: 17,
        marginTop: 10,
        fontWeight: 'bold'
    },
    orderInfo: {
        marginTop: 5,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingBottom: 22
    },
    barView: {
        width: '100%',
        backgroundColor: Colors._E54,
        marginTop: 0,
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: "center",
        alignItems: 'center'
    },
    bar: {
        marginLeft: 17,
        marginRight: 17,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20
    },
})