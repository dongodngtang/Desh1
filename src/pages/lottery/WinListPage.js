import React, {Component} from 'react';
import {
    AppRegistry, ScrollView,
    StyleSheet, Text,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {NavigationBar} from '../../components';
import I18n from "react-native-i18n";
import {UltimateListView, ImageLoad} from '../../components'
import {LoadErrorView, NoDataView} from '../../components/load';
import {getWin_history} from "../../services/MacauDao";
import {logMsg} from "../../utils/ComonHelper";

export default class WinListPage extends Component {

    separator = () => {
        return <View style={{height: 0.5, backgroundColor: '#666666'}}/>
    };

    separator2 = () => {
        return <View style={{width:Metrics.screenWidth - 52,height: 1, backgroundColor: '#FC8787'}}/>
    };

    item_view = (item, index) => {
        const {nick_name,prize} = item;
        return (
            <View style={{width:Metrics.screenWidth - 52,paddingTop:14,paddingBottom:14,flexDirection: 'row',alignItems: 'center',backgroundColor:'#E54A2E'}}>
                <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color: '#FFFFFF', fontSize: 14}}>{nick_name}</Text>
                </View>
                <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color: '#FFFFFF', fontSize: 14}}>{prize}</Text>
                </View>
            </View>
        )
    };

    header = () => {
        return (
            <View style={{width:Metrics.screenWidth - 52,alignItems: 'center'}}>
                <View style={{width:Metrics.screenWidth - 52,height: 46,alignItems: 'center', justifyContent: 'center', backgroundColor: '#C43319'}}>
                    <Text style={{color: '#FFFFFF', fontSize: 18}}>———— 中奖名单 ————</Text>
                </View>
                {this.separator2()}
                <View style={{
                    width:Metrics.screenWidth - 52,
                    height: 46,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FF7056'
                }}>
                    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color: '#FFFFFF', fontSize: 14}}>ID</Text>
                    </View>
                    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color: '#FFFFFF', fontSize: 14}}>奖品</Text>
                    </View>
                </View>
            </View>
        )
    };

    render() {
        return (
            <View style={[ApplicationStyles.bgContainer, {backgroundColor: '#E54A2E'}]}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: '#E54A2E'}}
                    title={'往期中奖'}
                    titleStyle={{fontSize: 18, color: '#FFFFFF'}}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        this.props.params.toggle && this.props.params.toggle()
                        router.pop();
                    }}/>

                {this.separator()}

                <View style={{
                    marginTop: 12,
                    width:Metrics.screenWidth - 52,
                    alignSelf:'center',
                    marginBottom: 74,
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#FC8787'
                }}>
                    <UltimateListView
                        header={() => this.header()}
                        separator={() => this.separator2()}
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
            </View>
        )
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            getWin_history({page, page_size: 20}, data => {
                    logMsg("往期中奖名单：", data)
                    startFetch(data.items, 18)
                }, err => {
                    logMsg("reject:", err)
                    abortFetch()
                }
            )
        } catch (err) {
            console.log(err)
            abortFetch()
        }
    }
}