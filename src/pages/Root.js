/**
 * Created by lorne on 2016/12/20.
 */
import React, {Component} from 'react';
import {Platform, PermissionsAndroid} from 'react-native'
import {Router} from 'react-native-router-flux';
import {Stacks} from '../configs/StackRoute';
import StorageKey from '../configs/StorageKey';
import {setAccessToken, getBaseURL} from '../services/RequestHelper';
import {
    putLoginUser,
    getUserData,
    updateApp,
    setDispatchAction,
    isEmptyObject,
    getDispatchAction, logMsg
} from '../utils/ComonHelper';
import {init,requestCameraPermission} from '../services/ConfigDao';
import {releases_show, getUpdate} from '../services/AccountDao';
import {
    GET_CERTIFICATION,
    GET_RECENT_RACES,
    GET_PROFILE,
    GET_UNREAND_MSG,
    SWITCH_LANGUAGE,
    VIDEO_PAUSE,
    ADD_CART,
    DELETE_CART,
    CLEAR_PROFILE
} from '../actions/ActionTypes';
import JpushHelp from '../services/JpushHelper';
import {fetchGetProfile} from '../actions/PersonAction';
import {_getProfileOk, fetchGetRecentRaces} from '../actions/RacesAction';
import {fetchGetCertification, switchLanguage, videoPause} from '../actions/AccountAction';
import {connect} from 'react-redux';
import {fetchUnreadMsg} from '../actions/AccountAction';
import {addCart, deleteCart} from '../actions/MallAction';
import codePush from "react-native-code-push";


class Root extends Component {

    state = {
        languageChange: false,
    };

    componentDidMount() {

        setDispatchAction(GET_CERTIFICATION, this.props._getRealName);
        setDispatchAction(GET_RECENT_RACES, this.props._getRecentRaces);
        setDispatchAction(GET_PROFILE, this.props._getProfile);
        setDispatchAction(GET_UNREAND_MSG, this.props._fetchUnreadMsg);
        setDispatchAction(SWITCH_LANGUAGE, this.props._switchLanguage);
        setDispatchAction(VIDEO_PAUSE, this.props._videoPause);
        setDispatchAction(DELETE_CART, this.props._deleteCart);
        setDispatchAction(ADD_CART, this.props._addCart);
        setDispatchAction(CLEAR_PROFILE, this.props._getProfileNull)


        init(() => {
            this.setState({
                languageChange: true
            });
        });

        requestCameraPermission()
        codePush.disallowRestart()
        codePush.sync({
            // updateDialog: {
            //     appendReleaseDescription: true,
            //     title: '更新通知',
            //     mandatoryContinueButtonLabel: '更新',
            //     descriptionPrefix: '更新内容：',
            //     mandatoryUpdateMessage: '',
            //     optionalUpdateMessage:'',
            //     optionalInstallButtonLabel:'更新',
            //     optionalIgnoreButtonLabel:'取消'
            // },
            updateDialog: false,
            installMode: codePush.InstallMode.ON_NEXT_RESUME
        })
    }

    constructor(props) {
        super(props);
        JpushHelp.addPushListener(this.receiveCb, this.openCb);

        getUserData();

        //App更新

        storage.load({key: StorageKey.LoginUser})
            .then(ret => {
                console.log('User', ret);
                let {access_token, user_id} = ret;
                setAccessToken(access_token);
                putLoginUser(ret);
                setTimeout(() => {
                    this.props._getProfile(user_id);
                    this.props._fetchUnreadMsg();
                }, 500)

            }).catch(err => {

        });

    }


    receiveCb = (notification) => {
        logMsg('jpush',notification)
        // const {aps} = notification;
        // if (aps.badge > 0) {
        //     if (!isEmptyObject(global.login_user))
        //         this.props._fetchUnreadMsg()
        // }
    };

    openCb = (notification) => {
        logMsg('jpush',notification)

    };

    render() {
        return (<Router
            scenes={Stacks}/>);
    }

    componentWillUnmount() {
        JpushHelp.removePushListener();
    }

}

const bindAction = dispatch => ({
    _getRealName: () => dispatch(fetchGetCertification()),
    _getProfile: (user_id) => dispatch(fetchGetProfile(user_id)),
    _getRecentRaces: (body) => dispatch(fetchGetRecentRaces(body)),
    _fetchUnreadMsg: () => dispatch(fetchUnreadMsg()),
    _switchLanguage: () => dispatch(switchLanguage()),
    _videoPause: () => dispatch(videoPause()),
    _addCart: () => dispatch(addCart()),
    _deleteCart: () => dispatch(deleteCart()),
    _getProfileNull: () => dispatch(_getProfileOk({}))
});

const mapStateToProps = state => ({
    drawerState: state.DrawerRedux.drawerState,
    actionType: state.AccountState.actionType

});

let MyApp = codePush(Root);

export default connect(mapStateToProps, bindAction)(MyApp);