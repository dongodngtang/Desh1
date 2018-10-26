import React, {Component} from 'react';
import {
    AppRegistry, ScrollView,
    StyleSheet, Text,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {NavigationBar} from '../../components';
import {getActivities, getJmessageInfo} from "../../services/AccountDao";
import {isEmptyObject, showToast} from "../../utils/ComonHelper";
import I18n from "react-native-i18n";
import {visit_other} from "../../services/SocialDao";
import {UltimateListView} from "../../components";
import {LoadErrorView, NoDataView} from '../../components/load';

export default class MyWardsPage extends Component {

    refresh = () => {
        this.listView && this.listView.refresh();
    }

    getImUser = () => {
        // this.loading && this.loading.open();

        const user_id = 'fd433a53b54c0a4f21a8c07e73f43a0c';
        ///获取私信用户的用户名
        visit_other({userId: user_id}, (user) => {

            // this.loading && this.loading.close();
            router.toMessageList({
                username: user.username,
                nickname: user.nickname,
                avatarThumbPath: user.avatar,
            });
        }, (error) => {
            showToast(I18n.t("error_alert"));
            this.loading && this.loading.close();
        });
    };

    item_view = () => {
        return (
            <TouchableOpacity style={{
                paddingTop: 14,
                paddingBottom: 14,
                paddingLeft: 17,
                paddingRight: 17,
                backgroundColor: 'white'
            }}
            onPress={()=>{
                global.router.toWardReceivePage(this.refresh)
            }}>
                <Text style={{color: '#444444', fontSize: 14}}>

                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    refreshPage={this.refreshPage}
                    toolbarStyle={{backgroundColor: 'white'}}
                    title={'我的奖品'}
                    titleStyle={{fontSize: 18, color: '#444444'}}
                    leftBtnIcon={Images.coupon.return_hei}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        router.pop();
                    }}
                    rightBtnIcon={Images.lottery.cus_service}
                    rightImageStyle={{width: 26, height: 20, marginRight: 17}}
                    rightBtnPress={() => {
                        if (isEmptyObject(global.login_user))
                            global.router.toLoginFirstPage()
                        else {
                            if (isEmptyObject(global.imUser)) {
                                getJmessageInfo(() => {
                                    this.getImUser()
                                })
                            } else {
                                this.getImUser()
                            }
                        }
                    }}/>

                <UltimateListView
                    header={()=>this.separator()}
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
            // getActivities({page: 1, page_size: 20}, data => {
            //     console.log("activities", data.items);
            //     startFetch(data.items, 18)
            // }, err => {
            //     console.log("Activities_err", err)
            //     abortFetch()
            // })

        } catch (err) {
            console.log(err)
            abortFetch()
        }
    }

    separator = () => {
        return <View style={{height: 5}}/>
    }

}