import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import {UltimateListView, ImageLoad, LeftAlignedImage} from '../../components'
import {NoDataView, LoadErrorView} from '../../components/load';
import {Colors, Images} from '../../Themes';
import {
    getDateDiff, alertOrder, strNotNull, isEmptyObject,
    getFileMine
} from '../../utils/ComonHelper';

export const styles = StyleSheet.create({

});

export default class LeaderboardList extends PureComponent {

    static props = {
        showMore: null,
    };


    render() {
        return <UltimateListView
            header={() => <View style={styles.separator1}/>}
            scrollEnabled={true}
            keyExtractor={(item, index) => index + "_moment"}
            ref={(ref) => this.listView = ref}
            onFetch={this.onFetch}
            separator={() => <View style={styles.separator}/>}
            item={this.itemView}
            refreshableTitlePull={I18n.t('pull_refresh')}
            refreshableTitleRelease={I18n.t('release_refresh')}
            dateTitle={I18n.t('last_refresh')}
            allLoadedText={I18n.t('no_more')}
            waitingSpinnerText={I18n.t('loading')}
            emptyView={() => {
                return <NoDataView/>
            }}/>
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        // const {type, userId} = this.props
        // if (type === 'topics')
        //     topics({page, page_size: 20}, data => {
        //         startFetch(data.items, 15)
        //     }, err => {
        //         abortFetch()
        //     })
        // if (type === 'recommends')
        //     topics_recommends({page, page_size: 20}, data => {
        //         startFetch(data.items, 15)
        //     }, err => {
        //         abortFetch()
        //     })
        // if (type === 'user_topics') {
        //     user_topics({page, page_size: 20, user_id: userId}, data => {
        //         startFetch(data.items, 15)
        //     }, err => {
        //         abortFetch()
        //     })
        // }
        // if (type === 'long' ||
        //     type === 'short') {
        //     topics_search(userId, data => {
        //         startFetch(data.items, 15)
        //     }, err => {
        //         abortFetch()
        //     }, {type})
        // }
        //
        // if (type === 'follows') {
        //     my_foucs({page, page_size: 20}, data => {
        //         startFetch(data.items, 15)
        //     }, err => {
        //     })
        // }

    };


    itemView = (item) => {

    }

}