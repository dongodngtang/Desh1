import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import ImageLoad from "../../components/ImageLoad";
import {isEmptyObject, showToast, convertDate} from "../../utils/ComonHelper";
import {ImageMessage, Message} from './HotelRoomListPage';
import ReservationBottom from "./ReservationBottom";
import PaymentDetail from './PaymentDetail';
import {postRoomReservation} from "../../services/MacauDao";

const info = "该订单确认后不可被取消修改，若未入住将收取您全额房费。我们会根据您的付款方式进行授予权或扣除房费，如订单不确认将解除预授权或全额退款至您的付款账户。附加服务费用将与房费同时扣除货返还。"
const prompt = "2018-06-12至2018-06-12订单一经确认，不可更改或添入住人姓名。 未满18岁的小孩需有成人陪同才可入住。"

export default class RoomReservationPage extends PureComponent {
    state = {
        room_num: 1,
        tempStock: 6,
        detailsShow: false,
        roomReservation: [],
        total_price: 0
    };

    componentDidMount() {
        this.refresh()
    }

    refresh = () => {
        this.container && this.container.open();
        const {item, date} = this.props.params;
        postRoomReservation({
            checkin_date: date.begin_date,
            checkout_date: date.end_date,
            hotel_room_id: item.id,
            room_num: this.state.room_num
        }, data => {
            console.log("roomReservation:", data)
            this.setState({
                roomReservation: data,
                total_price: this.state.room_num * data.order.total_price
            })
        }, err => {

        })
    };

    _detailsShow = (temp) => {
        this.setState({
            detailsShow: !this.state.detailsShow
        })
    };

    roomQuantity = (price, room_num) => {

        const styleCutDisable = {
            backgroundColor: '#FBFAFA'
        };
        const styleCut = {
            backgroundColor: '#F6F5F5'
        };
        let {tempStock} = this.state;

        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                    style={[styles.buyTouch, room_num === 1 ? styleCutDisable : styleCut]}
                    onPress={() => {
                        if (room_num > 1) {
                            this.setState({
                                room_num: --room_num,
                                total_price: room_num * price
                            })
                        }

                    }}>
                    <Image style={styles.buyImgCut} source={Images.cut}/>
                </TouchableOpacity>

                <View style={styles.buyInput}>
                    <Text>{room_num}</Text>
                </View>

                <TouchableOpacity
                    style={styles.buyTouch}
                    onPress={() => {
                        if (room_num < tempStock) {
                            this.setState({
                                room_num: ++room_num,
                                total_price: room_num * price
                            })
                        } else {
                            showToast("房间数量不足")
                        }

                    }}>
                    <Image style={styles.buyImgAdd} source={Images.add}/>
                </TouchableOpacity>
            </View>
        )
    };
    line = () => {
        return (
            <View style={{width: '90%', backgroundColor: '#F3F3F3', height: 1.5}}/>
        )
    };

    render() {
        const {detailsShow, roomReservation, room_num, total_price} = this.state;
        if (isEmptyObject(roomReservation)) {
            return null;
        }
        const {order, room} = roomReservation;
        const {images, notes, tags, title} = room;
        let persons=[{last_name:'LI',first_name:'MENG'},
            {last_name:'LI',first_name:'MENG'},
            {last_name:'LI',first_name:'MENG'}];
        return (
            <View style={ApplicationStyles.bgContainer}>

                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title="房间预订"
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                <ScrollView style={{flexDirection: 'column', paddingBottom: 90}}>

                    <View style={styles.barView}>
                        <View style={styles.bar}>
                            <ImageMessage images={images}/>
                            <Message item={room}/>
                        </View>
                    </View>

                    <Prompt/>
                    <ReservationTime
                        date={this.props.params.date}/>
                    <RoomMessage
                        room_num={room_num}
                        roomQuantity={this.roomQuantity}
                        price={order.total_price}/>

                    <TouchableOpacity style={styles.offerView}>
                        <View style={{
                            width: 14, height: 14, alignItems: 'center',
                            justifyContent: 'center', backgroundColor: '#E54A2E', marginLeft: 14
                        }}>
                            <Text style={{color: "#FFFFFF", fontSize: 12}}>减</Text>
                        </View>
                        <View style={{flexDirection: 'column', marginLeft: 6, justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: "#444444", fontSize: 14}}>已减</Text>
                                <Text style={{color: "#E54A2E", fontSize: 14, marginLeft: 12}}>¥650</Text>
                            </View>
                            <Text style={{marginTop: 8, color: '#AAAAAA', fontSize: 12}}>立减金额已从房费中等额扣减</Text>
                        </View>
                        <View style={{flex: 1}}/>
                        <Image style={{width: 10, height: 20, marginRight: 14, alignSelf: 'center'}}
                               source={Images.macau.right}/>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'column', marginTop: 23, marginLeft: 15, marginRight: 15}}>
                        <Text style={styles.info}><Text style={styles.prompt}>扣款说明：</Text>{info}</Text>

                        <Text style={[styles.info, {marginTop: 5}]}><Text style={styles.prompt}>特别提示：：</Text>{prompt}
                        </Text>
                    </View>
                </ScrollView>
                {detailsShow ? <PaymentDetail
                    _detailsShow={this._detailsShow}
                    order={order}/> : null}
                <ReservationBottom
                    _detailsShow={this._detailsShow}
                    total_price={total_price}
                    refresh={this.refresh}
                    roomReservation={roomReservation}
                    date={this.props.params.date}
                    persons={persons}/>
            </View>
        )
    }
}

export class RoomMessage extends PureComponent {
    render() {
        const {price, room_num} = this.props;
        return (
            <View style={styles.personMessage}>
                <View style={styles.roomView}>
                    <Text style={styles.rooms}>房间数</Text>
                    <View style={{flex: 1}}/>
                    {this.props.roomQuantity(price, room_num)}
                </View>

                <View style={styles.Roomcounts}>
                    <Text style={styles.rooms}>入住人</Text>
                    <View style={{flex: 1}}/>
                    <View style={styles.nameView}>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            paddingBottom: 14,
                            borderBottomWidth: 1,
                            borderColor: '#F3F3F3'
                        }}>
                            <Text style={styles.txt}>JI</Text>
                            <Text style={[styles.txt2, {marginLeft: 73, marginRight: 10}]}>／</Text>
                            <Text style={styles.txt}>KUANG</Text>
                        </View>
                        <Text style={[styles.txt2, {marginTop: 11}]}>姓（例：LI）<Text
                            style={{marginRight: 10}}>／</Text> 名（例：XIAOMING）</Text>
                    </View>
                </View>

                <View style={styles.phoneView}>
                    <Text style={[styles.txt2, {marginLeft: 14}]}>手机号</Text>
                    <TextInput
                        maxLength={12}
                        numberOfLines={1}/>
                </View>

            </View>
        )
    }

}

export class Prompt extends PureComponent {
    render() {
        return (
            <View style={styles.confirm}>
                <Image style={{marginLeft: 17, width: 20, height: 20}} source={Images.macau.night}/>
                <Text style={{color: "#4A90E2", fontSize: 14, marginLeft: 10}}>订单确认后将为您保留整晚 </Text>
            </View>
        )
    }
}

export class ReservationTime extends PureComponent {
    render() {
        const {begin_date, end_date, counts} = this.props.date;
        return (
            <View style={styles.timeView}>
                <Text style={{
                    marginLeft: 14,
                    color: '#444444',
                    fontSize: 14
                }}>入住时间：{convertDate(begin_date, 'M月DD日')} </Text>
                <Text style={{
                    marginLeft: 10,
                    color: '#444444',
                    fontSize: 14
                }}>离店时间：{convertDate(end_date, 'M月DD日')} </Text>
                <Text style={{marginLeft: 6, color: '#AAAAAA', fontSize: 14}}>共{counts}天</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    info: {
        color: "#AAAAAA",
        fontSize: 12,
        lineHeight: 18
    },
    prompt: {
        color: "#666666",
        fontSize: 12,
        marginTop: 5,
        lineHeight: 18
    },
    offerView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 6,
        paddingTop: 7,
        paddingBottom: 11
    },
    phoneView: {
        flexDirection: 'row',
        paddingTop: 11,
        paddingBottom: 11,
        flex: 1
    },
    txt2: {
        color: "#CCCCCC",
        fontSize: 15
    },
    txt: {
        color: "#444444",
        fontSize: 15
    },
    nameView: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 24
    },
    buyImgCut: {
        width: 12,
        height: 2
    },
    buyImgAdd: {
        width: 12,
        height: 12,
    },
    buyTouch: {
        width: 33,
        height: 30,
        backgroundColor: '#F6F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyInput: {
        width: 38,
        height: 30,
        borderRadius: 1,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: '#F6F5F5',
        alignItems: 'center',
        justifyContent: 'center'
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
    counts: {
        width: 22,
        height: 11,
        backgroundColor: "#000000",
        borderRadius: 2,
        opacity: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 2,
        marginBottom: 1
    },
    confirm: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 13,
        paddingBottom: 11,
        alignItems: 'center'
    },
    timeView: {
        marginTop: 4,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    personMessage: {
        flexDirection: 'column',
        marginTop: 10,
        backgroundColor: 'white'
    },
    roomView: {
        flexDirection: 'row',
        paddingTop: 7,
        paddingBottom: 7,
        alignItems: 'center',
        marginLeft: 14,
        marginRight: 14,
        borderBottomWidth: 1,
        borderColor: "#F3F3F3"
    },
    Roomcounts: {
        flexDirection: 'row',
        paddingTop: 14,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderColor: "#F3F3F3",
        marginLeft: 14,
        marginRight: 14
    },
    rooms: {color: "#AAAAAA", fontSize: 14}
})