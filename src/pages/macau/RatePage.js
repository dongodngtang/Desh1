import React, {PureComponent, Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, TextInput
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import {LoadErrorView, NoDataView} from '../../components/load';
import {getExchange_rates} from '../../services/MacauDao';
import {isEmptyObject, mul, div, formatCurrency} from "../../utils/ComonHelper";

const groups = [{id: 0, img: Images.cny, abb: 'CNY', name: '人民币¥'},
    {id: 1, img: Images.hkd, abb: 'HKD', name: '港币$'},
    {id: 2, img: Images.mop, abb: 'MOP', name: '澳门币$'}];

export default class RatePage extends Component {

    state = {
        ratesItem: {},
        price_changed: groups,
        show: false,
        width:0
    }

    componentDidMount() {
        let rate = [100, 0, 0];
        const {price_changed} = this.state;
        getExchange_rates(data => {
            console.log("ratesItem:", data)
            rate[1] = mul(data.cny_to_hkd_rate.rate, rate[0]);
            rate[2] = mul(data.cny_to_mop_rate.rate, rate[0]);
            let group2 = price_changed;
            group2.map((item, index) => {
                item.price = rate[index]
            });

            this.setState({
                ratesItem: data,
                price_changed: group2,
                width:rate[2].length
            })
        }, err => {

        })
    }

    changing_price = (item, index, txt) => {
        const {price_changed} = this.state;
        const {cny_to_hkd_rate, cny_to_mop_rate} = this.state.ratesItem;
        let group2 = price_changed;
        let rate = [0, 0, 0];
        if (index === 0) {
            rate[0] = txt;
            rate[1] = formatCurrency(mul(rate[0], cny_to_hkd_rate.rate));
            rate[2] = formatCurrency(mul(rate[0], cny_to_mop_rate.rate));
        } else if (index === 1) {
            rate[1] = txt;
            rate[0] = formatCurrency(div(rate[1], cny_to_hkd_rate.rate));
            rate[2] = formatCurrency(mul(rate[0], cny_to_mop_rate.rate));
        } else if (index === 2) {
            rate[2] = txt;
            rate[0] = formatCurrency(div(rate[2], cny_to_mop_rate.rate));
            rate[1] = formatCurrency(mul(rate[0], cny_to_hkd_rate.rate));
        }
        group2.map((x, index) => {
            x.price = rate[index]
        });
        this.setState({
            price_changed: group2
        })
    }
    ;


    render() {
        const {show} = this.state;
        const {cny_to_hkd_rate, cny_to_mop_rate} = this.state.ratesItem;

        if (isEmptyObject(cny_to_hkd_rate) && isEmptyObject(cny_to_mop_rate)) {
            return <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title="实时汇率"
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                <NoDataView/>
            </View>

        }

        return (
            <View style={[ApplicationStyles.bgContainer, {backgroundColor: "white"}]}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title="实时汇率"
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <View style={styles.page}>
                    <Text style={styles.txt}>今日汇率：</Text>
                    <View style={{flexDirection: 'column', alignSelf: 'center'}}>
                        <Text style={styles.txt}>{`1人名币=1.2101港币，1港币=${cny_to_hkd_rate.rate}人名币`}</Text>
                        <Text
                            style={[styles.txt, {marginTop: 5}]}>{`1人名币=1.2101澳门币，1澳门币=${cny_to_mop_rate.rate}人名币`}</Text>
                    </View>
                </View>

                {groups.map((item, index) => {
                    return (
                        <View style={{flexDirection: 'column', marginLeft: 17, marginRight: 17}} key={index}>
                            <View style={styles.itemPage} key={index}>
                                <Image style={{width: 44, height: 44}} source={item.img}/>
                                <Text style={{color: "#444444", fontSize: 18, marginLeft: 18}}>{item.abb}</Text>
                                <View style={{flex: 1}}/>
                                <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                                    <TextInput
                                        dir={'rtl'}
                                        keyboardType={'numeric'}
                                        style={{
                                            paddingTop: 0,
                                            paddingBottom: 0,
                                            width: this.state.width,
                                            fontSize: 24,
                                            fontWeight: 'bold',
                                            flexDirection: 'row-reverse',
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-end',
                                            color: show ? '#444444' : '#F3F3F3'
                                        }}
                                        maxLength={11}
                                        numberOfLines={1}
                                        placeholderTextColor={show ? '#444444' : '#F3F3F3'}
                                        placeholder={item.price + ''}
                                        value={item.price + ''}
                                        clearTextOnFocus={true}
                                        underlineColorAndroid={'transparent'}
                                        onChangeText={txt => {
                                            this.setState({
                                                show: true
                                            })
                                            this.changing_price(item, index, txt)
                                        }}
                                        onContentSizeChange={() => {
                                            this.setState({
                                                width: item.price.length
                                            })
                                            console.log("ll:",item.price.length)
                                        }}
                                    />
                                    <Text style={{color: "#8C8C8C", fontSize: 14, marginTop: 6}}>{item.name}</Text>
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