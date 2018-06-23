import React, {Component} from 'react';
import {
    StyleSheet, Text, View,ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {} from '../../services/IntegralDao';
import IntegralBar from './IntegralBar';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import CouponList from './CouponList';
import styles from './IntegralStyle'
const arrayMenu=[1,2,3,4,5,6];

export default class IntegralMallPage extends Component {

    state = {

    };

    componentDidMount() {

    }

    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>
                <IntegralBar text={'积分商城'}/>
                <CouponList
                    category={arrayMenu}/>
            </View>
        )
    }


}

