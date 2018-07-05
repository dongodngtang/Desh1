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
import styles from './couponStyle';
import {getUsingCoupons} from "../../services/MacauDao";
import {isEmptyObject, mul} from "../../utils/ComonHelper";

export default class CouponSelectPage extends Component {
    state = {
        select_changed: false,
        selectId: 0,
        selected_coupon: {},
        using_coupons: []
    };



    componentDidMount() {

        const {total_price} = this.props.params;
        // 用户订单可用优惠券
        getUsingCoupons({amount: total_price}, data => {

            let using_coupons = data.items;
            using_coupons.map(item=>{
                item.isSelect = false;
            })
            this.setState({
                using_coupons
            })


        }, err => {

        })



    };

    _changeSelect = (item) => {
       item.isSelect = !item.isSelect;
    };


    _separator = () => {
        return (
            <View style={{backgroundColor: "#F3F3F3", height: 5, width: '100%'}}/>
        )
    };
    _renderItem = ({item, index}) => {
        const {discount_type, name, short_desc, begin_date, end_date, reduce_price, discount} = item;
        return (
            <ImageBackground
                style={styles.sameView}
                source={Images.coupon.background}>
                <View style={styles.itemView}>
                    <View style={styles.itemLeft}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {discount_type === 'rebate' ?
                                <Text style={{
                                    color: "#F34247",
                                    fontSize: 40,
                                    marginRight: 16,
                                    fontWeight: 'bold'
                                }}>{mul(discount, 10)}<Text
                                    style={{color: "#F34247", fontSize: 18, fontWeight: 'bold'}}>折</Text></Text> :

                                <Text style={{color: "#F34247", fontSize: 18, marginRight: 16}}>¥<Text
                                    style={{
                                        fontSize: reduce_price.length > 3 ? 30 : 40,
                                        fontWeight: 'bold',
                                        letterSpacing: 1
                                    }}>{reduce_price}</Text></Text>}
                            {/*<Text style={{color: "#F34247", fontSize: 18}}>¥<Text*/}
                            {/*style={{fontSize: 50, fontWeight: 'bold'}}>50</Text></Text>*/}
                            <View style={{width: 140}}>
                                <Text style={{
                                    color: "#444444",
                                    fontSize: name.length > 13 ? 12 : 20,
                                    marginLeft: 22
                                }}
                                numberOfLines={2}>{name}</Text>
                            </View>
                        </View>
                        <Text style={[styles.txt1, {marginTop: 10}]}>{short_desc}</Text>
                        <Text style={[styles.txt1, {marginTop: 1}]}>{`有限期：${begin_date}至${end_date}`}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={[styles.itemLeft, {
                        alignItems: 'center',
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10
                    }]}
                                      onPress={() => {
                                          this._changeSelect(item);
                                          this._onClickCoupon();
                                          router.pop();
                                      }}>
                        <Image style={{width: 22, height: 22}}
                               source={item.isSelect ? Images.coupon.selected : Images.coupon.unSelected}/>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    };
    _onClickCoupon = () => {
        const {using_coupons} = this.state;
        using_coupons.forEach((x) => {
            if (x.isSelect) {
                this.props.params._selectedCoupon(x);
                return;
            }
        })
    };

    render() {
        const {using_coupons} = this.state;

        console.log("using_coupons:", using_coupons);
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    titleStyle={{fontSize: 17, color: Colors.white}}
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title={'优惠券'}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        this._onClickCoupon();
                        router.pop();
                    }}
                />

                <ScrollView>
                    {/*{data.map((item, index) => {*/}
                    {/*return (*/}
                    {/*<View key={index} style={{marginTop: 15, marginLeft: 17, marginRight: 17}}>*/}
                    {/*{this._renderItem(item)}*/}
                    {/*{this._separator()}*/}
                    {/*</View>*/}
                    {/*)*/}

                    {/*})}*/}
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



