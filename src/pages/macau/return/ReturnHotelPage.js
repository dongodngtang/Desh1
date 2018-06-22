//退换货申请页面
import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, Alert, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {NavigationBar, BaseComponent} from '../../../components';
import {postTempImg, postMallRefund} from '../../../services/MallDao';
import {strNotNull, showToast, getFileName, util, alertOrder} from '../../../utils/ComonHelper';

export default class ReturnHotelPage extends Component {


    render(){
        const {} = this.props.params.order;
        return(
            <View>

            </View>
        )
    }
}