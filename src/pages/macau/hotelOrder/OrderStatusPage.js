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
import {UnpaidBottom} from "./CompletedBottom";
import {HotelStatus} from "../../../configs/Status";

const intro = "该订单确认后不可被取消修改，若未入住将收取您全额房费。我们会根据您的付款方式进行授予权或扣除房费，如订单不确认将解除预授权或全额退款至您的付款账户。附加服务费用将与房费同时扣除货返还。"

export default class OrderStatusPage extends PureComponent {
    state = {};

    _intro = () => {
        return (
            <View style={{marginTop: 19, marginLeft: 16, marginRight: 16, paddingBottom: 80}}>
                <Text style={{color: "#AAAAAA", fontSize: 12, lineHeight: 17}}><Text
                    style={{color: "#666666", fontSize: 12}}>扣款说明：</Text>{intro}</Text>
            </View>
        )
    }

    _person = (persons) => {
        return (
            <View style={{flexDirection: 'column', width: '100%', justifyContent: 'center'}}>
                {persons.map((item, i) => {
                    return (
                        <View key={i} style={{
                            flexDirection: 'row',
                            paddingTop: i === 0 ? 0 : 14,
                            paddingBottom: 14,
                            borderBottomColor: '#F3F3F3',
                            borderBottomWidth: i === persons.length - 1 ? 0 : 1
                        }}>
                            <TextInput style={[styles.room_num, {width: 100}]}
                                       editable={false}
                                       value={item.last_name}/>
                            <Text style={[styles.txt]}>/</Text>
                            <TextInput style={[styles.room_num, {marginLeft: 10, width: 100}]}
                                       editable={false}
                                       value={item.first_name}/>
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
    };

    paidOrder = () => {
        return (
            <TouchableOpacity
                style={[styles.btn_book, {backgroundColor: Colors._E54}]}>
                <Text style={[styles.btn_book_txt, {color: "#444444"}]}>删除订单</Text>
            </TouchableOpacity>
        )
    }

    statusBottom = () => {
        let status = HotelStatus.paid;
        switch (status) {
            case HotelStatus.unpaid:
                return (
                    <View style={styles.bottomsView}>
                        <Text style={{color: "#333333", marginLeft: 14, fontSize: 14}}>合计：<Text
                            style={{color: "#E54A2E", fontSize: 18}}>1184.4</Text></Text>
                        <View style={{flex: 1}}/>
                        <UnpaidBottom/>
                    </View>
                );
            case HotelStatus.paid:
                return this.paidOrder();

            default:
                return this.paidOrder();
        }
    }

    render() {
        const {phone, order_number} = this.props.params;
        const {order, room} = this.props.params.items;
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
                        <Text style={[styles.infoTxt2, {marginTop: 25}]}>订单编号：{order_number}</Text>
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
                            <Text style={[styles.txt]}>入住人</Text>
                            {this._person(this.props.params.persons)}
                        </View>

                        <View style={styles.txtView}>
                            <Text style={styles.txt}>手机号</Text>
                            <Text style={styles.room_num}>{phone}</Text>
                        </View>
                    </View>

                    <View style={{
                        marginTop: 17,
                        paddingTop: 10,
                        paddingBottom: 23,
                        backgroundColor: 'white',
                        flexDirection: 'column'
                    }}>
                        <Text style={[styles.infoTxt, {marginBottom: 10}]}>订单明细</Text>
                        <View style={{width: '100%', height: 1, backgroundColor: '#F3F3F3'}}/>

                        <FlatList
                            style={{marginLeft: 30, marginRight: 22, marginTop: 26}}
                            showsHorizontalScrollIndicator={false}
                            data={order.items}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index + "item"}
                        />
                        <View style={{
                            marginLeft: 30,
                            marginRight: 22,
                            marginTop: 17,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={styles.infoTxt}>应付金额</Text>
                            <View style={{flex: 1}}/>
                            <Text style={{color: "#E54A2E", fontSize: 14}}>¥12433</Text>
                        </View>
                    </View>
                    {this._intro()}

                </ScrollView>
                {this.statusBottom()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    btn_book: {
        marginTop: 33,
        marginLeft: 14,
        marginRight: 14,
        marginBottom: 100,
        width: '90%',
        paddingTop: 12,
        paddingBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#DDDDDD'
    },
    btn_book_txt: {
        fontSize: 18
    },
    bottomsView: {
        paddingTop: 9,
        paddingBottom: 9,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 0,
        zIndex: 9999,

    },
    personView: {
        flexDirection: 'row',
        paddingTop: 14,
        marginLeft: 14,
        marginRight: 13,
        paddingBottom: 14,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F3F3F3'

    },
    room_num: {
        color: '#444444',
        fontSize: 15,
        marginLeft: 30
    },
    txtView: {
        marginLeft: 14,
        marginBottom: 14,
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
        paddingTop: 10,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    infoTxt2: {
        color: "#333333",
        fontSize: 14,
        marginLeft: 17,
        lineHeight: 20
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
        paddingBottom: 20,
        borderRadius: 3
    },
})