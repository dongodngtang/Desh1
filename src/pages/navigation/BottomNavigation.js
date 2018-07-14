import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, StatusBar, Image, Platform} from 'react-native';
import I18n from 'react-native-i18n';
import {Images, Colors} from '../../Themes';
import TabIcon from './TabIcon';
import {
    showTabTop, hideTabTop, onPressBackTop, videoPause,
    shareClose, shareOpen, swichTab
} from '../../actions/AccountAction';
import {
    SHOW_BACK_TOP, HIDE_BACK_TOP, VIDEO_PAUSE, BACK_TOP,
    SHARE_OPEN, SHARE_CLOSE, SWITCH_TAB
} from '../../actions/ActionTypes';
import {connect} from 'react-redux';
import {isEmptyObject, setDispatchAction, getDispatchAction} from '../../utils/ComonHelper';
import ShareToast from "../comm/ShareToast";
import PopRelease from '../socials/PopRelease'


class BottomNavigation extends Component {


    componentDidMount() {
        setDispatchAction(SHOW_BACK_TOP, this.props._showBackTop);
        setDispatchAction(HIDE_BACK_TOP, this.props._hideBackTop);
        setDispatchAction(BACK_TOP, this.props._backTop);
        setDispatchAction(SHARE_OPEN, this.props._showShare);
        setDispatchAction(SHARE_CLOSE, this.props._closeShare);
        setDispatchAction(SWITCH_TAB, this.props._swichTab);

    }


    render() {

        const {index} = this.props.navigationState;
        const {jumpToIndex, actionType, share_param} = this.props;
        const {shareLink, shareTitle, shareImage, shareText} = share_param;
        this.props._swichTab(index)

        return (
            <View style={styleBN.navigation}>
                <StatusBar barStyle={"light-content"}/>
                <TouchableOpacity
                    onPress={() => {

                        this.props._videoPause();
                        jumpToIndex(0)

                    }}
                    style={styleBN.navigations}>
                    <TabIcon tab={'home'} focused={index === 0}/>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => {
                        this.props._hideBackTop();

                        jumpToIndex(1)
                    }}
                    style={styleBN.navigations}>
                    <TabIcon tab={'news'} focused={index === 1}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props._videoPause();

                        this.popRelease && this.popRelease.toggle()

                    }}
                    style={styleBN.navigations}>
                    <Image source={Images.social.close_blue}
                           style={{height: 46, width: 46}}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props._videoPause();

                        jumpToIndex(2)

                    }}
                    style={styleBN.navigations}>
                    <TabIcon tab={'mall'} focused={index === 2}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props._videoPause();
                        jumpToIndex(3)
                    }}
                    style={styleBN.navigations}>
                    <TabIcon tab={'me'} focused={index === 3}/>
                </TouchableOpacity>

                {!isEmptyObject(share_param) ? <ShareToast hiddenShareAction={() => {
                    getDispatchAction()[SHARE_CLOSE]()
                }}
                                                           shareTitle={shareTitle}
                                                           shareText={shareText}
                                                           shareLink={shareLink}
                                                           shareImage={shareImage}/> : null}

                <PopRelease ref={ref => this.popRelease = ref}/>
            </View>

        )
    }


}

const styleBN = StyleSheet.create({
    navigation: {
        height: 50,
        width: '100%',
        backgroundColor: '#ffffff',
        opacity: 0.96,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors._ECE
    },
    navigations: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabs: {
        height: 50
    },
    textStyle: {
        color: '#AAAAAA'
    },
    textStyle2: {
        color: '#161718'
    },
    bgHomeStyle: {
        height: 24,
        width: 24
    },
    bgInformationStyle: {
        width: 17,
        height: 23
    },
    bgRankStyle2: {
        height: 25,
        width: 25
    },
    buttonView: {
        width: 94,
        height: 50,
        backgroundColor: '#FFE9AD',
        alignItems: 'center',
        justifyContent: 'center'
    },
    topImg: {
        width: 19,
        height: 12
    },
    topText: {
        backgroundColor: 'transparent',
        color: '#151516',
        fontSize: 12,
        marginTop: 5
    }
});

const bindAction = dispatch => ({
    _showBackTop: () => dispatch(showTabTop()),
    _hideBackTop: () => dispatch(hideTabTop()),
    _backTop: () => dispatch(onPressBackTop()),
    _videoPause: () => dispatch(videoPause()),
    _showShare: (share_param) => dispatch(shareOpen(share_param)),
    _closeShare: () => dispatch(shareClose()),
    _swichTab: (tab) => dispatch(swichTab(tab))

});

const mapStateToProps = state => ({

    actionType: state.AccountState.actionType,
    share_param: state.AccountState.share_param,
});

export default connect(mapStateToProps, bindAction)(BottomNavigation);
