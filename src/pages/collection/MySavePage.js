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
import moment from "moment/moment";

export default class MySavePage extends PureComponent {

    state={
        date: {
            begin_date: moment().format('YYYY-MM-DD'),
            end_date: moment().add('hours', 24).format('YYYY-MM-DD'),
            counts: 1
        }
    }


    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            getFavoritesList({page, page_size: 20}, data => {
                    logMsg("收藏列表：", data)
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
        return <View style={{width: Metrics.screenWidth, height: 1, backgroundColor: '#F3F3F3'}}/>
    };

    setImage = (img) => {
        if (strNotNull(img)) {
            return img;
        } else {
            return Images.empty_image
        }
    }

    item_view = (item, index) => {
        let item2 = {};
        let img = '';
        let intro = '';
        if (item.target_type === 'info') {
            const {title, preview_image, date, id} = item;
            img = item.preview_image;
            intro = "资讯";
            item2 = item.info;
        } else if (item.target_type === 'hotel') {
            const {title, preview_logo, location, id} = item;
            img = item.preview_logo;
            intro = "酒店";
            item2 = item.hotel;
        }
        return (
            <TouchableOpacity style={{
                width: Metrics.screenWidth,
                flexDirection: 'column',
                backgroundColor: 'white'
            }} onPress={()=>{
                if(item.target_type === 'hotel'){
                    global.router.toHotelDetail(item2,this.state.date)
                }else{
                    global.router.toInfoPage(item2)
                }
            }}>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 14,
                    marginLeft: 17,
                    marginRight: 17
                }}>
                    <Image style={{width: 54, height: 54,marginRight:16}} source={this.setImage(img)}/>
                    <Text style={{color: '#444444', fontSize: 18,width:'85%'}} numberOfLines={2}>{item2.title}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                    marginBottom: 14,
                    marginLeft: 17,
                    marginRight: 17
                }}>
                    <Text style={{color: '#CCCCCC', fontSize: 12,marginRight:12,width:54}}>{intro}</Text>
                    <Text style={{color: '#CCCCCC', fontSize: 12}}>{item2.title}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        return (
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
                    showsVerticalScrollIndicator={false}
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