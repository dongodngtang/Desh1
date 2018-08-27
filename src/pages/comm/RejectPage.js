/**
 * Created by lorne on 2018/5/13
 * Function:
 * Desc:
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    ScrollView, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, UltimateListView} from '../../components';
import RenderHtml from '../comm/RenderHtml';
import {getInfos} from '../../services/MacauDao'
import {
    isEmptyObject, isFollowed, shareHost, sharePage, showToast, strNotNull,
    uShareInfoItem
} from "../../utils/ComonHelper";
import LoadingView from "../../components/load/LoadingView";

import {topics_comments, topics_details, topics_like} from "../../services/SocialDao";
import {postComment, postRelaies} from "../../services/CommentDao";
import I18n from "react-native-i18n";
import CommentBar from '../comm/CommentBar';
import CommentList from "../comment/CommentList";
import {reallySize} from "../socials/Header";

export default class RejectPage extends Component {

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 14, color: '#888888'}}>网络出小差啦～～</Text>
                <TouchableOpacity
                    style={{
                        width: 60,
                        height: 25,
                        borderRadius: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#E54A2E',
                        marginTop: 8
                    }}
                    onPress={() => {
                        this.props.refresh()
                    }}>
                    <Text style={{fontSize: 14, color: '#FFFFFF'}}>刷新</Text>
                </TouchableOpacity>
            </View>
        )
    }
}