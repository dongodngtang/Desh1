import React, {PureComponent, Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import SearchBar from "../comm/SearchBar";
import {UltimateListView, ImageLoad} from '../../components'
import I18n from "react-native-i18n";
import {LoadErrorView, NoDataView} from '../../components/load';
import {getFavoritesList, getWin_history} from '../../services/MacauDao';
import {getPosition, isEmptyObject, logMsg, strNotNull} from "../../utils/ComonHelper";
import RejectPage from "../comm/RejectPage";
import {locations} from "../../services/SocialDao";
import {getApiType} from "../../services/RequestHelper";
import {NavigationBar} from '../../components';

export default class MySavePage extends PureComponent {


    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            getFavoritesList({page, page_size: 20}, data => {
                logMsg("收藏列表：",data)
                    startFetch(data.items, 18)
                }, err => {
                    logMsg("收藏reject:", err)
                    abortFetch()
                }
            )
        } catch (err) {
            console.log(err)
            abortFetch()
        }
    };

    separator = () => {
        return <View style={{width: Metrics.screenWidth - 52, height: 1, backgroundColor: '#FC8787'}}/>
    };

    item_view = (item, index) => {
        if(item.target_type === 'info'){
            const {title,preview_image,date,id} = item;
            return (

            )
        }else if(item.target_type === 'hotel'){
            const {title,preview_logo,location,id} = item;

        }
        return (
            <View style={{
                width: 52,
                paddingLeft:17,
                paddingRight:17,
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white'
            }}>
                <View style={{flexDirection:'row', alignItems: 'center', marginTop:14}}>
                    <Image source={}/>
                </View>
                <View style={{flexDirection:'row',  alignItems: 'center', marginBottom:14}}>
                    <Text style={{color: '#FFFFFF', fontSize: 14}}>{prize}</Text>
                </View>
            </View>
        )
    };

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

                <UltimateListView
                    header={() => this.separator()}
                    style={{width: Metrics.screenWidth - 52}}
                    showsVerticalScrollIndicator = {false}
                    separator={() => this.separator()}
                    keyExtractor={(item, index) => index + "item"}
                    ref={(ref) => this.listView = ref}
                    onFetch={this.onFetch}
                    item={this.item_view}
                    refreshableTitlePull={I18n.t('pull_refresh')}
                    refreshableTitleRelease={I18n.t('release_refresh')}
                    dateTitle={I18n.t('last_refresh')}
                    allLoadedText={I18n.t('no_more')}
                    waitingSpinnerText={I18n.t('loading')}
                    emptyView={() => {
                        return <NoDataView/>;
                    }}
                />

            </View>
        )
    }
}