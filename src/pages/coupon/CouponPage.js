//退换货申请页面
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
import I18n from "react-native-i18n";

export default class CouponPage extends Component {

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

    _renderItem = (item) => {
        const {begin_date, coupon_type, cover_link, end_date, name, short_desc,reduce_price,limit_price} = item.item;
        const {selectId} = this.state;
        return (
            <ImageBackground
                style={styles.sameView}
                source={Images.coupon.background}>
                <View style={styles.itemView}>
                    <View style={[styles.itemLeft]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: "#F34247", fontSize: 18}}>¥<Text
                                style={{fontSize: 40, fontWeight: 'bold'}}>{reduce_price}</Text></Text>
                            <View style={{width: 120,flexDirection:'column'}}>
                                <Text style={{color: "#444444", fontSize: 20, marginLeft: 16}}>{name}</Text>
                            </View>

                        </View>
                        <Text style={[styles.txt1, {marginTop: 10}]}>{short_desc}</Text>
                        <Text style={[styles.txt1, {marginTop: 1}]}>{`有限期：${begin_date}至${end_date}`}</Text>

                    </View>
                    <View style={{flex: 1}}/>
                    <View style={[styles.itemLeft, {alignItems: 'center'}]}>
                        {/*<Text style={{color: "#666666", fontSize: 16}}>剩30日</Text>*/}
                        <TouchableOpacity
                            style={[styles.touchView, {backgroundColor: selectId === 0 ? "#FF4C4C" : "#ECECEE"}]}
                            onPress={() => {
                                if (selectId === 0) {
                                    router.pop();
                                    global.router.toSelectTimePage();
                                }
                            }}>
                            <Text style={{color: "#FFFFFF", fontSize: 14}}>去使用</Text>
                        </TouchableOpacity>
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
                    title={'优惠券'}
                    leftBtnIcon={Images.coupon.return_hei}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        router.pop()
                    }}
                />
                <View style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                selectId: 0
                            })
                        }}
                        style={{marginLeft: 95, flexDirection: 'column', alignItems: 'center', width: 46}}>
                        <Text style={{color: selectId === 0 ? "#161718" : "#AAAAAA", fontSize: 14}}>未使用</Text>
                        {selectId === 0 ?
                            <View style={{width: 46, height: 2, marginTop: 9, backgroundColor: '#E54A2E'}}/> : null}
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                selectId: 1
                            })
                        }}
                        style={{marginRight: 95, flexDirection: 'column', alignItems: 'center', width: 46}}>
                        <Text style={{color: selectId === 1 ? "#161718" : "#AAAAAA", fontSize: 14}}>已失效</Text>
                        {selectId === 1 ?
                            <View style={{width: 46, height: 2, marginTop: 9, backgroundColor: '#E54A2E'}}/> : null}
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <FlatList
                        style={{marginTop: 15, marginLeft: 17, marginRight: 17}}
                        data={selectId === 0 ? using_coupons : expired_coupons}
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
