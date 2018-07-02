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
import PropTypes from 'prop-types';

export default class CouponSelectPage extends Component {
    state = {
        coupons: [],
        select_changed: false,
        selectId: 0,
        selected_coupon: {}
    };

    componentDidMount() {
        const {person_coupons} = this.props.params;

        let coupons_copy = [...person_coupons];
        coupons_copy.map(x => {
            x.isSelect = false;
        });

        this.setState({
            coupons: coupons_copy
        })
    };

    _changeSelect = (item) => {
        let coupons_copy = [...this.state.coupons];
        coupons_copy.map(x => {

            x.isSelect = x.coupon_number === item.coupon_number;

        });
        this.setState({
            coupons: coupons_copy
        })
    };


    _separator = () => {
        return (
            <View style={{backgroundColor: "#F3F3F3", height: 5, width: '100%'}}/>
        )
    };
    _renderItem = ({item, index}) => {
        const {coupon_type, name, short_desc, begin_date, end_date} = item;
        return (
            <ImageBackground
                style={styles.sameView}
                source={Images.coupon.background}>
                <View style={styles.itemView}>
                    <View style={styles.itemLeft}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: "#F34247", fontSize: 18}}>¥<Text
                                style={{fontSize: 50, fontWeight: 'bold'}}>50</Text></Text>
                            <View style={{width: 180}}>
                                <Text style={{color: "#444444", fontSize: 20, marginLeft: 22}}>{name}</Text>
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
                                          this._changeSelect(item)
                                      }}>
                        <Image style={{width: 22, height: 22}}
                               source={item.isSelect ? Images.coupon.selected : Images.coupon.unSelected}/>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    };
    _onClickCoupon = () => {
        const {coupons} = this.state;

        coupons.forEach((x) => {
            if (x.isSelect) {
               this.props.params._selectedCoupon(x)
                return;
            }
        })
    };

    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    titleStyle={{fontSize: 17, color: Colors.white}}
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title={'优惠券'}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        router.pop();
                        this._onClickCoupon();
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
                        data={this.props.params.person_coupons}
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



