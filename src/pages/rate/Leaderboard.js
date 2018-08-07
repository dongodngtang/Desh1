import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, Platform, FlatList
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import propTypes from 'prop-types';
import {isEmptyObject} from '../../utils/ComonHelper';
import {getExchange_traders} from "../../services/MacauDao";
import styles from '../macau/Styles';
import ImageLoad from "../../components/ImageLoad";

export default class Leaderboard extends Component {

    static propTypes = {
        category: propTypes.object
    };

    state = {
        exchange_traders: []
    };


    show_index = (index) => {
        if (index === 0) {
            return <Image style={{width: Metrics.reallySize(18), height: Metrics.reallySize(25)}} source={Images.one1}/>
        } else if (index === 1) {
            return <Image style={{width: Metrics.reallySize(18), height: Metrics.reallySize(25)}} source={Images.two}/>
        } else if (index === 2) {
            return <Image style={{width: Metrics.reallySize(18), height: Metrics.reallySize(25)}}
                          source={Images.three}/>
        } else {
            return <Text style={[styles.txt_num, {width: 25}]}>{index + 1}</Text>
        }
    }

    _renderItem = (item, index) => {
        const {avatar, mobile, nick_name, signature, user_id} = item
        return (
            <TouchableOpacity style={styles.pageItem}
                              onPress={() => {
                                  global.router.toUserTopicPage(item)
                              }}>

                {this.show_index(index)}

                <ImageLoad style={styles.avatar}
                           source={{uri: avatar}}/>

                <View style={{width: '50%'}}>
                    <Text style={styles.txt_name}>{nick_name}</Text>
                    <Text style={[styles.txt_decs, {marginTop: 2}]}>{signature}</Text>
                </View>

                <View style={{flex: 1}}/>

                <Text style={styles.txt_decs}>联系他</Text>

                <Image style={styles.img_left}
                       source={Images.adr_right}/>

            </TouchableOpacity>
        )
    };

    render() {
        return (this.renderFlatList())

    }

    renderFlatList = () => {
        return <UltimateFlatList
            firstLoader={true}
            ref={(ref) => this.listView = ref}
            onFetch={this.onFetch}
            keyExtractor={(item, index) => `Leaderboard${index}`}  //this is required when you are using FlatList
            item={this._renderItem}  //this takes two params (item, index)
            numColumns={2}
            refreshableTitlePull={I18n.t('pull_refresh')}
            refreshableTitleRelease={I18n.t('release_refresh')}
            dateTitle={I18n.t('last_refresh')}
            allLoadedText={I18n.t('no_more')}
            waitingSpinnerText={I18n.t('loading')}
            emptyView={() => <View/>}
        />


    };


    onFetch = (page = 1, startFetch, abortFetch) => {
        try {

            this.refresh(page, startFetch, abortFetch);
        } catch (err) {
            abortFetch();
        }
    };


    refresh = (page, startFetch, abortFetch) => {
        const {type} = this.props.category;
        getExchange_traders({page: page, page_size: 20, trader_type: type}, data => {
            console.log("trader_type:", type);
            console.log("exchange_traders:", data);
            startFetch(data.items, 6)
        }, err => {
            abortFetch()
        }, {
            page: 1,
            page_size: 20,
            trader_type: trader_type
        })
    };
}