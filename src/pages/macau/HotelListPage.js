import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import SearchBar from './SearchBar';
import TimeSpecificationInfo from './TimeSpecificationInfo';
import {ImageLoad, UltimateListView} from "../../components";
import {LoadErrorView, NoDataView} from '../../components/load';
import {exchange_rates, hotels, info_types} from '../../services/MacauDao';
import I18n from "react-native-i18n";
import {isEmptyObject} from "../../utils/ComonHelper";
import moment from "moment/moment";

export default class HotelListPage extends PureComponent {

    keyword = '';

    state = {
        timeShow: false,
        changeTime: this.props.params.date
    };

    showSpecInfo = (temp) => {
        this.setState({
            timeShow: !this.state.timeShow
        })
    };


    _change = (date) => {
        console.log("changeTime:", date)
        this.setState({
            changeTime: date
        });

        console.log("第二次选择的时间：", this.state.changeTime)
    };


    render() {

        const {timeShow, changeTime} = this.state;
        return (<View style={ApplicationStyles.bgContainer}>
                <SearchBar
                    onChangeText={keyword => {
                        this.keyword = keyword;
                        this.listView && this.listView.refresh()
                    }}
                    showSpecInfo={this.showSpecInfo}
                    changeTime={changeTime}
                    _click={'HotelListPage'}/>
                {timeShow ? <TimeSpecificationInfo
                    showSpecInfo={this.showSpecInfo}
                    _change={this._change}/> : null}

                <UltimateListView
                    ListHeaderComponent={this._separator}
                    separator={this._separator}
                    keyExtractor={(item, index) => index + "item"}
                    ref={(ref) => this.listView = ref}
                    onFetch={this.onFetch}
                    item={this._renderItem}
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
            hotels({page, page_size: 20, keyword: this.keyword}, data => {
                console.log("HotelList:", data)
                startFetch(data.items, 18)
            }, err => {
                abortFetch()
            })
        } catch (err) {
            console.log(err)
            abortFetch()
        }
    };

    _star = (star) => {
        let stars = [];
        for (let i = 1; i <= star; i++) {
            stars.push(i);
        }
        return stars;
    };
    //是否有代金劵
    _vouchers = () => {
        return (
            <View style={[styles.view, {borderColor: '#FF3F3F'}]}>
                <Text style={{color: '#FF3F3F', fontSize: 10}}>代金劵</Text>
            </View>
        )
    };
    //是否是精选
    _recommend = () => {
        return (
            <View style={[styles.view, {borderColor: '#4A90E2', marginLeft: 8}]}>
                <Text style={{color: '#4A90E2', fontSize: 10}}>小编推荐</Text>
            </View>
        )
    };

    _renderItem = (item, index) => {
        const {title, address, location, logo, start_price, star_level} = item;
        console.log("djsdnks", item)
        const {changeTime} = this.state;
        return (
            <TouchableOpacity style={styles.item} key={index}
                              onPress={() => {
                                  router.toHotelDetail(item, changeTime)
                              }}>
                <ImageLoad
                    style={{width: 67, height: 95, marginLeft: 12}}
                    source={{uri: logo}}/>
                <View style={styles.message}>
                    <Text style={styles.name} numberOfLines={1}>{title}</Text>
                    {item.star_level > 0 ? <View style={styles.starView}>
                        {this._star(item.star_level).map((index) => {
                            return <Image key={index} style={styles.stars} source={Images.macau.star}/>
                        })}
                    </View> : null}
                    <Text style={styles.location} numberOfLines={1}>{location}</Text>
                    <View style={styles.priceView}>
                        {item.vouchers ? this._vouchers() : <View/>}
                        {item.recommend ? this._recommend() : <View/>}
                        <View style={{flex: 1}}/>
                        {item.start_price !== '0.0' ? <Text style={styles.price}><Text
                            style={{color: '#FF3F3F', fontSize: 12}}>¥</Text>{start_price}<Text
                            style={{color: '#AAAAAA', fontSize: 12}}>起</Text></Text> : null}
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    _separator = () => {
        return (
            <View style={{width: '100%', height: 5, backgroundColor: '#ECECEE'}}/>
        )
    }


}
const styles = StyleSheet.create({
    list: {},
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "flex-start",
        backgroundColor: "white",
        paddingTop: 17,
        paddingBottom: 17
    },
    message: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        marginTop: 7,
        marginRight: 22
    },
    name: {
        color: '#161718',
        fontSize: 18,
        fontWeight: 'bold'
    },
    stars: {
        width: 14,
        height: 14,
        marginRight: 4
    },
    starView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 9
    },
    location: {
        color: '#999999',
        fontSize: 12,
        marginTop: 8
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 3
    },
    price: {
        color: '#FF3F3F',
        fontSize: 20
    },
    view: {
        width: 48,
        height: 18,
        borderWidth: 1,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

