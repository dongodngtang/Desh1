import React, {PureComponent, Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import SearchBar from "../comm/SearchBar";
import {UltimateListView, ImageLoad} from '../../components'
import I18n from "react-native-i18n";
import {LoadErrorView, NoDataView} from '../../components/load';
import {hotels, info_types, getSaunas, getPermission} from '../../services/MacauDao';
import {getPosition, isEmptyObject, logMsg, strNotNull} from "../../utils/ComonHelper";
import RejectPage from "../comm/RejectPage";
import {locations} from "../../services/SocialDao";
import {getApiType} from "../../services/RequestHelper";
import {NavigationBar} from '../../components';

export default class MySavePage extends PureComponent {

    componentDidMount(){

    }

    render(){
        return(
            <View style={[ApplicationStyles.bgContainer, {backgroundColor: '#ECECEE'}]}>
                <NavigationBar
                    barStyle={'dark-content'}
                    toolbarStyle={{backgroundColor: 'white'}}
                    titleStyle={{fontSize: 18, color: '#444444'}}
                    title="收藏"
                    leftBtnIcon={Images.coupon.return_hei}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        router.pop();
                    }}
                />

            </View>
        )
    }
}