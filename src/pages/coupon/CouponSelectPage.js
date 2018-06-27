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


export default class CouponSelectPage extends Component {

    state = {
        coupons: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}],
        select_changed: false,
        selectId: 0
    };

    componentDidMount() {
        let coupons_copy = [...this.state.coupons];
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

            x.isSelect =  x.id === item.id;


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
        return (
            <ImageBackground
                style={styles.sameView}
                source={Images.coupon.background}>
                <View style={styles.itemView}>
                    <View style={styles.itemLeft}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: "#F34247", fontSize: 18}}>¥<Text
                                style={{fontSize: 50, fontWeight: 'bold'}}>50</Text></Text>
                            <Text style={{color: "#444444", fontSize: 20, marginLeft: 22}}>酒店优惠券</Text>
                        </View>
                        <Text style={[styles.txt1, {marginTop: 10}]}>单笔酒店预订金额满800元可使用</Text>
                        <Text style={[styles.txt1, {marginTop: 1}]}>有限期：2018-06-21至06-31</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={[styles.itemLeft, {alignItems: 'center'}]}
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
                        router.pop()
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
                        data={this.state.coupons}
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


