import React, {PureComponent, Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, TextInput
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import {LoadingView, NoDataView} from '../../components/load';
import {getExchange_rates} from '../../services/MacauDao';
import {isEmptyObject, mul, div, formatCurrency, strNotNull} from "../../utils/ComonHelper";
import {RateTop} from './RatePage'

export default class LocalRatePage extends Component {

    render() {
        return (
            <View style={[ApplicationStyles.bgContainer, {backgroundColor: "white"}]}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title="本地汇率"
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <RateTop
                    type={'local'}/>

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