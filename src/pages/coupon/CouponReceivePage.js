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
import {getPersonCoupons} from "../../services/MacauDao";
import {mul, DateDiff} from '../../utils/ComonHelper'

export default class CouponReceivePage extends Component {

    state = {
        person_coupons: [],
        using_coupons: [],
        expired_coupons: [],
        selectId: 0
    };

    componentDidMount() {
        this.refresh()
    };

    refresh = () => {
        getPersonCoupons({}, data => {
            console.log("person_personCoupons:", data);
            let using_coupons = [];
            let expired_coupons = [];
            data.items.forEach((item) => {
                if (item.status === 'unused' || item.status === 'refund') {
                    using_coupons.push(item)
                } else if (item.status === 'expired' || item.status === 'used') {
                    expired_coupons.push(item)
                }
            });
            this.setState({
                person_coupons: data.items,
                using_coupons: using_coupons,
                expired_coupons: expired_coupons
            });
        }, err => {

        })


    };


    _separator = () => {
        return (
            <View style={{backgroundColor: "#F3F3F3", height: 5, width: '100%'}}/>
        )
    };

    _clickCoupon=()=>{

    };

    _renderItem = (item) => {
        const {begin_date, discount, discount_type, cover_link, end_date, name, short_desc, reduce_price, limit_price, coupon_type} = item.item;
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
                        {/*<Text style={{color: "#666666", fontSize: 16}}>剩{DateDiff(begin_date,end_date)}日</Text>*/}
                        {selectId === 0 ? <TouchableOpacity
                                style={[styles.touchView, {backgroundColor: '#4CB6FF'}]}
                                onPress={() => {
                                    this._clickCoupon(item)
                                }}>
                                <Text style={{color: "#FFFFFF", fontSize: 14}}>领取</Text>
                            </TouchableOpacity> :
                            <Image style={{height: 37, width: 45}} source={Images.coupon.coupon_used}/>}


                    </View>
                </View>
            </ImageBackground>
        )
    };

    render() {
        const {person_coupons, using_coupons, expired_coupons, selectId} = this.state;

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
                        data={using_coupons}
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
