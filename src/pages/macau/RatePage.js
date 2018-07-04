import React, {PureComponent, Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, TextInput
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import {LoadErrorView, NoDataView} from '../../components/load';
import {getExchange_rates} from '../../services/MacauDao';
import {isEmptyObject} from "../../utils/ComonHelper";

const groups = [{id: 1, img: Images.cny, abb: 'CNY', name: '人民币¥'},
    {id: 2, img: Images.hkd, abb: 'HKD', name: '港币$'},
    {id: 3, img: Images.mop, abb: 'MOP', name: '澳门币$'}];

export default class RatePage extends Component {

    state = {
        ratesItem: {}
    }

    componentDidMount() {
        getExchange_rates(data => {
            console.log("ratesItem:", data)
            this.setState({
                ratesItem: data.data
            })
        }, err => {

        })
    }

    render() {
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

                <View style={styleR.page}>
                    <Text style={styleR.txt}>今日汇率：</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{`1人名币=1.2101港币，1港币=${cny_to_hkd_rate.rate}人名币`}</Text>
                        <Text>{`1人名币=1.2101澳门币，1澳门币=${cny_to_mop_rate.rate}人名币`}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    {groups.map((item) => {
                        return (
                            <View style={styles.itemPage}>
                                <Image style={{width: 44, height: 44}} source={item.img}/>
                                <Text style={{color: "#444444", fontSize: 18, marginLeft: 18}}>{item.abb}</Text>
                                <View style={{flex: 1}}/>
                                <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                                    <TextInput
                                        keyboardType={'numeric'}
                                        style={{paddingTop: 0, paddingBottom: 0}}
                                        maxLength={12}
                                        numberOfLines={1}
                                        underlineColorAndroid={'transparent'}
                                        onChangeText={txt => {

                                        }}
                                        value={phone}/>
                                    <Text style={{color: "#8C8C8C", fontSize: 14, marginTop: 6}}>{item.name}</Text>
                                </View>
                            </View>
                        )
                    })}

                </View>
            </View>
        )
    }
}

const styleR = StyleSheet.create({
    itemPage: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 23,
        paddingBottom: 21,
        marginLeft: 17,
        marginRight: 17
    },
    page: {
        paddingTop: 12,
        paddingBottom: 9,
        marginLeft: 17,
        marginRight: 17,
        flexDirection: 'row',
        backgroundColor: "#F3F3F3"
    },
    txt: {
        color: "#8C8C8C",
        fontSize: 12
    }
})