import React, {Component} from 'react';
import {
    View,
    FlatList,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    ListView,
    TextInput
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, BaseComponent} from '../../components';
import ImageLoad from "../../components/ImageLoad";
import styles from './couponStyle'
import {delHotelOrder, getInfoCoupons, postReceiveCoupons} from "../../services/MacauDao";
import {mul, DateDiff, showToast, alertOrder} from '../../utils/ComonHelper'

export default class CouponReceivePage extends Component {

    state = {
        info_coupons: []
    };

    componentDidMount() {
        this.refresh()
    };

    refresh = () => {
        getInfoCoupons({id:this.props.params.id}, data => {
            console.log("info_coupons:", data);
            this.setState({
                info_coupons: data.items
            });
        }, err => {

        })


    };


    _separator = () => {
        return (
            <View style={{backgroundColor: "#F3F3F3", height: 5, width: '100%'}}/>
        )
    };

    _clickCoupon = (item) => {
        console.log("dhsjds",item)
        alertOrder("确认领取？", () => {
            postReceiveCoupons({coupon_id: item.item.id}, data => {
                showToast("领取成功");
                this.refresh();
            }, err => {

            })
        });

    };

    _renderItem = (item) => {
        const {id, name, short_desc, coupon_type, discount_type, reduce_price, limite_price, discount, begin_date, end_date, user_received} = item.item;
        const {selectId} = this.state;
        return (
            <ImageBackground
                style={styles.sameView}
                source={Images.coupon.background}>
                <View style={styles.itemView}>
                    <View style={[styles.itemLeft]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {discount_type === 'rebate' ?
                                <Text style={{
                                    color: selectId === 0 ? "#F34247" : "#AAAAAA",
                                    fontSize: 40,
                                    fontWeight: 'bold',
                                    width: 100
                                }}>{mul(discount, 10)}<Text
                                    style={{
                                        color: selectId === 0 ? "#F34247" : "#AAAAAA",
                                        fontSize: 18,
                                        fontWeight: 'bold'
                                    }}>折</Text></Text> :

                                <Text style={{
                                    color: selectId === 0 ? "#F34247" : "#AAAAAA",
                                    fontSize: 18,
                                    width: 100
                                }}>¥<Text
                                    style={{
                                        fontSize: reduce_price < 1000 ? 40 : 26,
                                        fontWeight: 'bold'
                                    }}>{reduce_price}</Text></Text>}

                            <View style={{width: 125, flexDirection: 'column'}}>
                                <Text
                                    style={{color: selectId === 0 ? "#444444" : "#AAAAAA", fontSize: 20}}>{name}</Text>
                            </View>

                        </View>
                        <Text style={[styles.txt1, {marginTop: 10}]}>{short_desc}</Text>
                        <Text style={[styles.txt1, {marginTop: 1}]}>{`有限期：${begin_date}至${end_date}`}</Text>

                    </View>
                    <View style={{flex: 1}}/>

                    <View style={[styles.itemLeft, {alignItems: 'center'}]}>
                        <TouchableOpacity
                            style={[styles.touchView, {backgroundColor: user_received ? '#DDDDDD' : '#4CB6FF'}]}
                            onPress={() => {
                                if (!user_received) {
                                    this._clickCoupon(item)
                                }
                            }}>
                            <Text style={{color: "#FFFFFF", fontSize: 14}}>{user_received ? '已领取' : '领取'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    };

    render() {
        const {info_coupons} = this.state;
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    titleStyle={{fontSize: 17, color: Colors._161817}}
                    toolbarStyle={{backgroundColor: Colors._FFF}}
                    title={'领取优惠券'}
                    leftBtnIcon={Images.coupon.return_hei}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        router.pop()
                    }}
                />
                <ScrollView>
                    <FlatList
                        style={{marginTop: 15, marginLeft: 17, marginRight: 17}}
                        data={info_coupons}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => `coupon${index}`}
                    />
                    <View style={{height: 80}}/>
                </ScrollView>

            </View>
        )
    }
}
