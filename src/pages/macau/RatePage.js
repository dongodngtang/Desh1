import React, {PureComponent, Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, BaseComponent} from '../../components';
import {LoadingView, NoDataView} from '../../components/load';
import {getExchange_rates} from '../../services/MacauDao';
import {isEmptyObject, mul, div, formatCurrency, strNotNull, convertDate, utcDate} from "../../utils/ComonHelper";

export default class RatePage extends Component {

    state = {
        update_time: ''
    };

    change_time = (time) => {
        this.setState({
            update_time: time
        })
    }

    render() {
        return (
            <View style={[ApplicationStyles.bgContainer, {backgroundColor: "white"}]}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title="实时汇率"
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <ScrollView>
                    <RateTop
                        type={'real_time'}
                        change_time={this.change_time}/>

                    <TouchableOpacity
                        onPress={() => {
                            if (isEmptyObject(global.login_user)) {
                                router.toLoginFirstPage()
                            } else {
                                global.router.toLocalRatePage()
                            }

                        }}
                        activeOpacity={1}
                        style={{
                            height: 142, width: '100%', alignItems: 'center',
                            justifyContent: 'center'
                        }}>

                        <Image
                            source={Images.macau.rate2}
                            style={{height: 142, width: '100%', position: 'absolute'}}/>
                        <Text style={{fontSize: 15, color: 'white'}}>澳门本地汇率参考</Text>

                    </TouchableOpacity>

                    <Text style={{color: "#333333", fontSize: 14, marginTop: 10, alignSelf: 'center'}}>
                        数据来源于中国银行官网，仅供参考{'\n'}
                        更新时间：{this.state.update_time}
                    </Text>

                </ScrollView>
            </View>
        )
    }
}

export class RateTop extends Component {

    state = {
        ratesItem: {},
        price_changed: [{id: 0, img: Images.cny, abb: 'CNY', name: '人民币¥', price2: 0, price: '', showTrue: true},
            {id: 1, img: Images.hkd, abb: 'HKD', name: '港币$', price2: 0, price: '', showTrue: false},
            {id: 2, img: Images.mop, abb: 'MOP', name: '澳门币$', price2: 0, price: '', showTrue: false}],
        show: false
    };

    componentDidMount() {
        let rate = [100, 0, 0];
        const {price_changed} = this.state;
        const {type} = this.props;
        getExchange_rates({exchange_type: type}, data => {
            console.log("ratesItem:", data)
            rate[1] = mul(data.cny_to_hkd_rate.rate, rate[0]);
            rate[2] = mul(data.cny_to_mop_rate.rate, rate[0]);
            let group2 = price_changed;
            group2.map((item, index) => {
                item.price2 = rate[index]
            });

            this.setState({
                ratesItem: data,
                price_changed: group2
            })
            console.log("price_changed:", group2);
            if (type === 'real_time' && strNotNull(data.cny_to_hkd_rate.updated_at)) {
                this.props.change_time(utcDate(data.cny_to_hkd_rate.updated_at, 'YYYY-MM-DD HH:mm:ss'))
            }
        }, err => {

        })

    }

    changing_price = (item, index, txt) => {
        const {price_changed} = this.state;
        const {cny_to_hkd_rate, cny_to_mop_rate} = this.state.ratesItem;
        let group2 = price_changed;
        let rate = [0, 0, 0];

        if (index === 0) {
            if (this.isZero(txt)) {
                rate[0] = 0.00;
                rate[1] = 0.00;
                rate[2] = 0.00
            } else {
                rate[0] = txt;
                rate[1] = mul(rate[0], cny_to_hkd_rate.rate);
                rate[2] = mul(rate[0], cny_to_mop_rate.rate);
                rate[1] = formatCurrency(rate[1]);
                rate[2] = formatCurrency(rate[2]);
            }

        } else if (index === 1) {
            if (this.isZero(txt)) {
                rate[0] = 0.00;
                rate[1] = 0.00;
                rate[2] = 0.00
            } else {
                rate[1] = txt;
                rate[0] = div(rate[1], cny_to_hkd_rate.rate);
                rate[2] = mul(rate[0], cny_to_mop_rate.rate);
                rate[0] = formatCurrency(rate[0]);
                rate[2] = formatCurrency(rate[2]);
            }

        } else if (index === 2) {
            if (this.isZero(txt)) {
                rate[0] = 0.00;
                rate[1] = 0.00;
                rate[2] = 0.00
            } else {
                rate[2] = txt;
                rate[0] = div(rate[2], cny_to_mop_rate.rate);
                rate[1] = mul(rate[0], cny_to_hkd_rate.rate);
                rate[0] = formatCurrency(rate[0]);
                rate[1] = formatCurrency(rate[1]);
            }

        }
        group2.map((x, index) => {
            x.price = rate[index]
        });
        this.setState({
            price_changed: group2
        })
        console.log("price_changeddssds:", group2)
    };

    isZero = (price) => {
        if (price === 0.00 || price === 0.0 || price === 0 || price === '0.00' || price === '0.0' || price === '0') {
            return true
        } else {
            return false
        }
    };

    clean_txt = () => {
        let rate = [100, 0, 0];
        const {price_changed, ratesItem} = this.state;
        rate[1] = mul(ratesItem.cny_to_hkd_rate.rate, rate[0]);
        rate[2] = mul(ratesItem.cny_to_mop_rate.rate, rate[0]);

        let group2 = price_changed;
        group2.map((x, index) => {
            x.price = '';
            x.price2 = rate[index]
        });
        this.setState({
            price_changed: group2
        })
    }

    render() {
        const {ratesItem, price_changed, show} = this.state;
        const {cny_to_hkd_rate, cny_to_mop_rate} = ratesItem;

        if (isEmptyObject(ratesItem)) {
            return <LoadingView/>
        }
        return (
            <View>
                <View style={styles.page}>
                    <Text style={styles.txt}>今日汇率：</Text>
                    <View style={{flexDirection: 'column', alignSelf: 'center'}}>
                        <Text
                            style={styles.txt}>{`1人民币=${cny_to_hkd_rate.rate}港币，1港币=${div(1, cny_to_hkd_rate.rate).toFixed(4)}人民币`}</Text>
                        <Text
                            style={[styles.txt, {marginTop: 5}]}>{`1人民币=${cny_to_mop_rate.rate}澳门币，1澳门币=${div(1, cny_to_mop_rate.rate).toFixed(4)}人民币`}</Text>

                        {this.props.type === 'local' ?
                            <Text style={[styles.txt, {marginTop: 5, marginRight: 30, lineHeight: 20}]}>
                                参考数据来源于澳门当地实时汇率{'\n'}更新时间：{utcDate(cny_to_hkd_rate.updated_at, 'YYYY-MM-DD HH:mm:ss')}
                            </Text> : null}
                    </View>
                </View>

                {price_changed.map((item, index) => {
                    return (
                        <View style={{flexDirection: 'column', marginLeft: 17, marginRight: 17}} key={index}>
                            <View style={styles.itemPage} key={index}>
                                <Image style={{width: 44, height: 44}} source={item.img}/>
                                <Text style={{color: "#444444", fontSize: 18, marginLeft: 18}}>{item.abb}</Text>
                                <View style={{flex: 1}}/>
                                <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                                    <TextInput
                                        autoFocus={item.showTrue}
                                        keyboardType={'numeric'}
                                        style={{
                                            paddingTop: 0,
                                            paddingBottom: 0,
                                            width: 230,
                                            height: 40,
                                            fontSize: 24,
                                            fontWeight: 'bold',
                                            color: show ? '#444444' : '#F3F3F3',
                                            textAlign: 'right'
                                        }}
                                        maxLength={11}
                                        numberOfLines={1}
                                        placeholderTextColor={'#CCCCCC'}
                                        placeholder={strNotNull(item.price) ? '' : item.price2 + ''}
                                        value={item.price + ''}
                                        clearTextOnFocus={true}
                                        underlineColorAndroid={'transparent'}
                                        onChangeText={txt => {
                                            this.state.show = true
                                            this.changing_price(item, index, txt)
                                        }}
                                        onFocus={() => {
                                            this.clean_txt()
                                        }}

                                    />
                                    <Text style={{color: "#8C8C8C", fontSize: 14, marginTop: 3}}>{item.name}</Text>
                                </View>
                            </View>
                            <View style={{height: 1.5, width: '100%', backgroundColor: "#F3F3F3"}}/>
                        </View>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemPage: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 23,
        paddingBottom: 21
    },
    page: {
        width: '100%',
        paddingTop: 12,
        paddingBottom: 9,
        paddingLeft: 17,
        paddingRight: 17,
        flexDirection: 'row',
        backgroundColor: "#F3F3F3"
    },
    txt: {
        color: "#8C8C8C",
        fontSize: 12
    }
})