/**
 * Created by lorne on 2017/5/23.
 */
import JPushModule from 'jpush-react-native';
import {DeviceEventEmitter, NativeAppEventEmitter, Platform} from 'react-native'
import {logMsg} from "../utils/ComonHelper";


export default class JpushHelper {


    static getRegistrationID(callback) {
        JPushModule.getRegistrationID(callback);
    }


    static setAlias(alias, successCallback) {
        JPushModule.setAlias(alias, ret => {
            successCallback && successCallback(ret)
            if (ret.errorCode !== 0 && Platform.OS === 'android')
                JPushModule.resumePush()

        })
    }

    static addPushListener(receiveCb, openCb) {

        if (Platform.OS === 'android') {
            JPushModule.notifyJSDidLoad((resultCode) => {
                console.log('Jpush', resultCode)
            });

            JPushModule.addReceiveCustomMsgListener(openCb);
        }

        JPushModule.addReceiveNotificationListener(receiveCb);
        JPushModule.addReceiveOpenNotificationListener(map => {
            console.log('Opening notification!')
            console.log('map.extra: ' ,map)
            setTimeout(() => {
                router.toAboutPage()
            }, 200)

        })

    }


    static removePushListener() {
        if (Platform.OS === 'android') {
            JPushModule.removeReceiveCustomMsgListener();
        }

        JPushModule.removeReceiveNotificationListener();
        JPushModule.removeReceiveOpenNotificationListener()

    }

//设置 badge 值
    static iosSetBadge(badge) {
        if (Platform.OS === 'ios')
            JPushModule.setBadge(badge, (value) => {
                logMsg('badge', value)
            });
    }

    //***************************IOS******************************************
//设置本地推送


    //***************************IOS******************************************


    //***************************ANDROID******************************************
    static initPush() {
        if (Platform.OS === 'android')
            JPushModule.initPush();
    }


    static stopPush() {
        JPushModule.stopPush();
    }





    //***************************ANDROID******************************************
}


