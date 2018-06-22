import React, {Component} from 'react';
import {
    View, ScrollView, StyleSheet, RefreshControl,
    Text, ActivityIndicator, Platform
}
    from 'react-native';
// import Races from './Races';
// import Headlines from './Headlines';
// import Coming from './Coming';
import Information from './Information';
import MainBanner from './MainBanner';
// import {getRecentRaces, getRaceTickets} from '../../services/RacesDao';
import {getHotInfos, getMainBanners, getPukeNews} from '../../services/NewsDao';
import Router from '../../configs/Router';
import {connect} from 'react-redux';
// import {SearchPage} from './SearchPage';
import {SHOW_BACK_TOP, HIDE_BACK_TOP, BACK_TOP} from '../../actions/ActionTypes';
import {getDispatchAction, alertRefresh, getCurrentDate, strNotNull} from '../../utils/ComonHelper';
import ActivityModel from '../message/ActivityModel';
import {getActivityPush} from '../../services/AccountDao';
import StorageKey from '../../configs/StorageKey';
import I18n from 'react-native-i18n';
import {ApplicationStyles, Images, Colors} from '../../Themes';
import NavigationBar from "../../components/NavigationBar";
import Catalog from './Catalog'
import {home_recommends} from '../../services/MacauDao'

class TabHomePage extends Component {
    state = {
        listRace: [],
        raceTickets: [],
        banners: [],
        bgColor: 'transparent',
        opacity: 0,
        headlines: [],
        next_id: '0',
        keyword: '',
        informationY: 0,
        isRefreshing: false,
        info_page: 1,
        load_more: ''
    };

    componentWillReceiveProps(newProps) {

        if (newProps.actionType === BACK_TOP) {
            if (this.mainScroll)
                this.mainScroll.scrollTo({x: 0, y: 0, animated: true})
        }

        if (newProps.actionType === 'SWITCH_LANGUAGE') {

            setTimeout(this._getData, 300)
        }
    }

    componentWillMount() {
        this.router = this.router || new Router();
        global.router = this.router;

    }

    componentDidMount() {

        setTimeout(this._getData, 300)
    }

    _getPushActivity = () => {
        let today = getCurrentDate().format('YYYY-MM-DD');
        storage.load({key: StorageKey.Activity})
            .then(ret => {
                getActivityPush(data => {

                    const {activity} = data;

                    if (ret.id !== activity.id
                        && activity.push_type === 'once') {

                        this._setActivity(activity)
                    }
                    if (activity.push_type === 'once_a_day'
                        && ret.today !== today) {

                        this._setActivity(activity)
                    }


                }, err => {

                })

            }).catch(err => {
            getActivityPush(data => {
                this._setActivity(data.activity)
            }, err => {

            })
        })

    };

    _setActivity = (activity) => {
        let today = getCurrentDate().format('YYYY-MM-DD');
        if (this.activityModel)
            this.activityModel.setData(activity);
        activity.today = today;
        storage.save({
            key: StorageKey.Activity,
            rawData: activity
        })
    };

    _getData = () => {
        this._getPushActivity();
        getMainBanners(data => {
            this.setState({
                banners: data.items
            });

        }, err => {

        });


        this.setState({
            load_more: 'loading'
        });
        home_recommends(data => {
            if (data.items.length > 0) {

                this.setState({
                    info_page: 2,
                    load_more: 'success'
                });
                this.infosView && this.infosView.refresh(data.items)
            } else {
                this.setState({
                    load_more: 'load_all'
                });
            }


        }, err => {
            this.setState({
                load_more: 'fail'
            });
            // setTimeout(() => {
            //     alertRefresh(this._getData)
            // }, 2000)

        }, {page: 1, page_size: 20})
    };

    _onScroll = (event) => {

        this.onTopScroll(event);
        this.scrollLoad(event);
    };

    scrollLoad = (e) => {

        let {load_more, info_page} = this.state;
        const event = e.nativeEvent;
        const offsetY = event.contentOffset.y;

        const _num = event['contentSize']['height'] - event['layoutMeasurement']['height'] - offsetY;

        if (event['contentSize']['height'] > event['layoutMeasurement']['height']
            && _num < Platform.OS === 'ios' ? -30 : 2
                && load_more !== 'loading' && load_more !== 'load_all') {

            this.setState({
                load_more: 'loading'
            });
            setTimeout(() => {
                home_recommends(data => {
                    if (data.items.length > 0) {

                        this.setState({
                            info_page: ++info_page,
                            load_more: 'success'
                        });
                        this.infosView && this.infosView.setInfos(data.items)
                    } else {
                        this.setState({
                            load_more: 'load_all'
                        });
                    }


                }, err => {
                    this.setState({
                        load_more: 'fail'
                    });
                }, {page: info_page, page_size: 20})
            }, 300)

        }
    };


    onTopScroll = (event) => {
        const offsetHeight = 720;
        let offsetY = event.nativeEvent.contentOffset.y;

        if (offsetY >= offsetHeight) {

            getDispatchAction()[SHOW_BACK_TOP]()
        } else {

            getDispatchAction()[HIDE_BACK_TOP]()
        }
    };


    _onRefresh = () => {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this._getData();
            this.setState({isRefreshing: false});
        }, 1000)
    };

    render() {
        const {banners, headlines, load_more} = this.state;

        return (

            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title={'澳门旅行'}/>
                <ScrollView
                    ref={ref => this.mainScroll = ref}
                    scrollEventThrottle={16}
                    onScroll={this._onScroll}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                    />}
                >
                    <MainBanner
                        banners={banners}/>
                    <Catalog/>

                    {/*<Races*/}
                    {/*raceTickets={raceTickets}/>*/}
                    {/*<Coming*/}
                    {/*listRace={listRace}/>*/}
                    <Information
                        ref={ref => this.infosView = ref}
                    />
                    {load_more === 'loading' ? <View style={{
                        height: 48, alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'row'
                    }}>
                        <Text>{I18n.t('loading')}</Text>
                        <ActivityIndicator/>
                    </View> : null}

                    {load_more === 'load_all' ? <View style={{
                        height: 48, alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'row'
                    }}>
                        <Text style={{color: Colors._AAA}}>{I18n.t('no_more')}</Text>
                    </View> : null}
                </ScrollView>


                <ActivityModel
                    ref={ref => this.activityModel = ref}/>

            </View>

        );
    }
}


const bindAction = dispatch => ({});

const mapStateToProps = state => ({

    actionType: state.AccountState.actionType,
    unread: state.AccountState.unread,
});

export default connect(mapStateToProps, bindAction)(TabHomePage);


