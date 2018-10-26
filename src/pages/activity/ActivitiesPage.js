import React, {Component} from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ImageBackground, Modal
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import {convertDate, isEmptyObject, logMsg, strNotNull} from "../../utils/ComonHelper";
import {exchange_rates, getRoomList, hotels, info_types} from "../../services/MacauDao";
import I18n from "react-native-i18n";
import {ImageLoad, UltimateListView} from "../../components";
import {LoadErrorView, NoDataView} from '../../components/load';

const activeies = [{id: 0, type: 'active', img: Images.wallet.bg},
    {id: 0, type: 'begin', img: Images.wallet.bg},
    {id: 0, type: 'end', img: Images.wallet.bg},
    {id: 0, type: 'begin', img: Images.wallet.bg}];

export default class ActivitiesPage extends Component {

    item_view = (item, index) => {
        const {type, img} = item;
        return (
            <ImageBackground source={img} style={{height: 156, width: '100%'}}>
                <ImageBackground source={this.backgroundImg(type)} style={{width: 45, height: 16}}>
                    <Text style={{fontSize: 14, color: '#FFFFFF'}}>{this.active_type(type)}</Text>
                </ImageBackground>
            </ImageBackground>
        )
    };

    backgroundImg = (type) => {
        if (type === 'active') {
            return Images.share2
        } else if (type === 'begin') {
            return Images.guide1
        } else {
            return Images.APPbanner
        }
    };

    active_type = (type) => {
        if (type === 'active') {
            return '进行中'
        } else if (type === 'begin') {
            return '即将开始'
        } else {
            return '已结束'
        }

    };

    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: 'white'}}
                    titleStyle={{fontSize: 18, color: '#444444'}}
                    title="活动"
                    leftBtnIcon={Images.coupon.return_hei}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        router.pop();
                    }}/>
                <UltimateListView
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
                        return this.state.error ? <LoadErrorView
                            onPress={() => {
                                this.listView.refresh()
                            }}/> : <NoDataView/>;
                    }}
                />
            </View>
        )
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            startFetch(activeies, 18)

        } catch (err) {
            console.log(err)
            abortFetch()
        }
    }

    separator = () => {
        return <View style={{height: 5}}/>
    }
}