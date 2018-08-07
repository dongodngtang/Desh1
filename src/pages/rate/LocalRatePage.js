import React, {PureComponent, Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes/index';
import {NavigationBar} from '../../components/index';
import {LoadingView, NoDataView} from '../../components/load/index';
import {getExchange_traders} from '../../services/MacauDao';
import {isEmptyObject, mul, div, formatCurrency, strNotNull} from "../../utils/ComonHelper";
import {RateTop} from './RatePage'
import ImageLoad from "../../components/ImageLoad";
import styles from '../macau/Styles';
import I18n from "react-native-i18n";
import Leaderboard from './Leaderboard'

const categories = [{id: 1, name: '汇率咨询达人', type: 'ex_rate'}, {id: 2, name: '积分达人', type: 'integral'}, {
    id: 3,
    name: '交友达人',
    type: 'dating'
}];

export default class LocalRatePage extends Component {

    state = {
        show_index: 1
    }
    //
    // componentDidMount() {
    //     getExchange_traders(data => {
    //         console.log("exchange_traders:", data)
    //
    //         this.setState({
    //             exchange_traders: data.items
    //         });
    //     }, err => {
    //
    //     })
    // };


    render() {
        const {show_index} = this.state;
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title="澳门本地汇率参考"
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <ScrollView style={{backgroundColor: 'white'}}>
                    <RateTop
                        type={'local'}/>

                    <View style={{
                        paddingTop: 17,
                        paddingLeft: 17,
                        paddingRight: 17,
                        paddingBottom: 10,
                        flexDirection: 'row',

                        alignItems: 'center',
                        backgroundColor: '#F3F3F3'
                    }}>
                        {categories.map((item, index) => {
                            return (
                                <View key={index} style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                                    <TouchableOpacity

                                        style={{}}
                                        onPress={() => {
                                            this.setState({
                                                trader_type: item.type,
                                                show_index: item.id
                                            })
                                        }}>
                                        <Text style={{
                                            color: show_index === item.id ? "#E54A2E" : "#000000",
                                            fontSize: 14
                                        }}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                    {show_index === item.id ?
                                        <View style={{width: '34%', height: 1.5, backgroundColor: '#E54A2E'}}/> : null}

                                </View>
                            )
                        })}
                    </View>
                    <Leaderboard category={categories[this.state.show_index]}/>

                </ScrollView>

            </View>
        )
    }
}

