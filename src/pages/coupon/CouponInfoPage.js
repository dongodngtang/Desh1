import React, {Component} from 'react';
import {
    FlatList, ScrollView,
    StyleSheet, Text,
    View, Image,
    TouchableOpacity,ImageBackground
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {utcDate, isEmptyObject, mul} from "../../utils/ComonHelper";
import {NavigationBar} from '../../components';
import styles from './couponStyle';

export default class CouponInfoPage extends Component {

    state = {

    };

    componentDidMount() {

    }

    render() {
        const {begin_date, discount, discount_type, cover_link, end_date, name, short_desc, reduce_price, limit_price, coupon_type} = this.props.params.item;
        return (
            <View style={ApplicationStyles.bgContainer2}>
                <NavigationBar
                    refreshPage={this.refreshPage}
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title={'使用规则'}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <ScrollView style={styles.View}>
                    <View style={{marginTop:7,marginLeft:17,marginRight:17,marginBottom:11,alignItems:'center',justifyContent:'center'}}>
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
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={{backgroundColor:'white'}}>
                        <View style={styles.info_item}>
                            <Text style={styles.text22}>折扣</Text>
                            <Text style={styles.text23} numberOfLines={1}>任意消费9.5折</Text>
                        </View>
                        <View style={styles.info_item}>
                            <Text style={styles.text22}>过期时间</Text>
                            <Text style={styles.text23} numberOfLines={1}>2018-06-31 23:59:59</Text>
                        </View>
                        <View style={styles.info_item}>
                            <Text style={styles.text22}>地址</Text>
                            <Text style={styles.text23} numberOfLines={1}>澳门威尼斯酒店3楼344</Text>
                        </View>
                        <View style={styles.info_item}>
                            <Text style={styles.text22}>电话</Text>
                            <Text style={styles.text23} numberOfLines={1}>55779384</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }



};
