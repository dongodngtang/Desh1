/**
 * Created by lorne on 2017/1/12.
 */
import {PixelRatio, Alert, Share, Platform, Linking} from 'react-native';
import React, {PropTypes} from 'react';
import Toast from 'react-native-root-toast';
import md5 from "react-native-md5";
import I18n from 'react-native-i18n';
import moment from 'moment';
import {LoginUser, setLoginUser, removeToken} from '../services/AccountDao';
import StorageKey from '../configs/StorageKey';
import {Verified, SellStatus} from '../configs/Status';
import Communications from 'react-native-communications';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import UMShare from 'react-native-umshare';
import *as wechat from 'react-native-wechat'
import * as Constants from '../configs/Constants';
import {getApiType} from '../services/RequestHelper';

export const YYYY_MM_DD = 'YYYY.MM.DD';
export const DATA_SS = 'YYYY-MM-DD hh:mm:ss';
export const YYYY_MM = 'YYYY-MM';
export const YYYY年MM月 = 'YYYY年MM月';
export const YYYYMMDD = 'YYYYMMDD';
export const MM_DD = 'MM-DD';

const HOST = 'https://h5.deshpro.com/';
const THOST = 'http://test.h5.deshpro.com/';

function shareHost() {
    if (getApiType() === 'production')
        return HOST;
    else
        return THOST;

}

export const loadApp = HOST + 'race/181/zh/loadAPP';
export const picker = {
    width: 500,
    height: 500,
    cropping: true,
    cropperCircleOverlay: true,
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 600,
    compressImageQuality: 0.5,
};


export function getFileName(o) {
    var pos = o.lastIndexOf("/");
    return o.substring(pos + 1);
}

export function updateApp(data) {
    const {android_platform, ios_platform} = data;
    console.log(data)
    if (Platform.OS === 'ios') {
        if (ios_platform.version !== Constants.UpdateVersion) {
            updateAlet(ios_platform)
        }
    } else {
        if (android_platform.version !== Constants.UpdateVersion) {
            updateAlet(android_platform)
        }
    }


}


function updateAlet(data) {

    const upgrade = data.force_upgrade ? [{
        text: I18n.t('update_download'),
        onPress: () => {
            if (Platform.OS === 'ios') {
                Linking.openURL(Constants.IOSLOAD)
            } else {
                Linking.openURL(Constants.ANDROIDLOAD)
            }
        }
    }] : [{
        text: I18n.t('update_cancel'),
        onPress: () => {

        }
    },
        {
            text: I18n.t('update_download'),
            onPress: () => {
                if (Platform.OS === 'ios') {
                    Linking.openURL(Constants.IOSLOAD)
                } else {
                    Linking.openURL(Constants.ANDROIDLOAD)
                }
            }
        }];
    Alert.alert(strNotNull(data.title) ? data.title : 'Alert',
        strNotNull(data.content) ? data.content : 'content', upgrade, {cancelable: false})
}

export function strToDate(date) {
    let t = Date.parse(date);
    if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        return new Date();
    }
}


const shareIcon = 'https://www.deshpro.com/pokerpro.png';
export const DayHeadings = [I18n.t('calendar_7'),
    I18n.t('calendar_1'),
    I18n.t('calendar_2'),
    I18n.t('calendar_3'),
    I18n.t('calendar_4'),
    I18n.t('calendar_5'),
    I18n.t('calendar_6')];
export const MonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/*判断是否为Null*/
export function strNotNull(str) {
    if (str == undefined || str == null || str.length == 0)
        return false;
    else
        return true;
}

let Lang = 'zh';

export function setLang(lang) {
    Lang = lang;
    // console.log('分享页语言'+Lang);
}

export function getDateDiff(dateTimeStamp) {

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();

    var diffValue = now - dateTimeStamp * 1000;
    if (diffValue < 0) {
        return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + I18n.t('time_month');
    }
    else if (weekC >= 1) {
        result = "" + parseInt(weekC) + I18n.t('time_week');
    }
    else if (dayC >= 1) {
        result = "" + parseInt(dayC) + I18n.t('time_day');
    }
    else if (hourC >= 1) {
        result = "" + parseInt(hourC) + I18n.t('time_hour');
    }
    else if (minC >= 1) {
        result = "" + parseInt(minC) + I18n.t('time_min');
    } else
        result = I18n.t('time_moment');
    return result;
}

export function payWx(data, callback) {
    const body = {
        partnerId: data.partnerid,  // 商家向财付通申请的商家id
        prepayId: data.prepayid,   // 预支付订单
        nonceStr: data.noncestr,   // 随机串，防重发
        timeStamp: data.timestamp,  // 时间戳，防重发
        package: data.package,    // 商家根据财付通文档填写的数据和签名
        sign: data.sign
    };

    router.log('wxpay', body);
    wechat.pay(body).then(ret => {
        callback();
    }).catch(err => {

    })
}

export function isWXAppInstalled(resolve) {
    return wechat.isWXAppInstalled().then(data => {
        resolve(data)
    }).catch(err => {
        resolve(false);
    });
}


export function loginWX(resolve, reject) {

    if (Platform.OS === 'ios')
        wechat.sendAuthRequest('snsapi_userinfo', 'pokerpro')
            .then(data => {

                resolve(data)
            }).catch(err => {
            reject(err)
        });
    else
        UMShare.loginWX().then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })

}

function shareTxt(msg) {
    return strNotNull(msg) ? msg : I18n.t('ads_poker');
}


export function uShareTicket(title, desc, icon, id, ticket_id) {

    UMShare.share(title, shareTxt(desc), getShareIcon(icon), shareHost() + "races/" + id + '/tickets/' + ticket_id + "/" + Lang)
        .then(() => {
            showToast(`${I18n.t('show_success')}`)
        }, (error) => {
            showToast(error)
        })
}

export function uShareActivity(title, desc, icon, id) {

    UMShare.share(title, shareTxt(desc), getShareIcon(icon), shareHost() + "activities/" + id + "/" + Lang)
        .then(() => {
            showToast(`${I18n.t('show_success')}`)
        }, (error) => {
            showToast(error)
        })
}

export function uShareRace(title, location, icon, raceId) {

    UMShare.share(title, location, getShareIcon(icon), shareHost() + "race/" + raceId + "/" + Lang)
        .then(() => {
            showToast(`${I18n.t('show_success')}`)
        }, (error) => {
            showToast(error)
        })
}

export function newShare(title, location, icon, newsId) {
    UMShare.share(title, location, getShareIcon(icon), shareHost() + "news/" + newsId + "/" + Lang)
        .then(() => {
            showToast(`${I18n.t('show_success')}`)
        }, (error) => {
            showToast(error)
        })
}

export function rankPlayerShare(title, location, icon, playerId) {

    UMShare.share(title, location, getShareIcon(icon), shareHost() + "rankPlayer/" + playerId + "/" + Lang)
        .then(() => {
            showToast(`${I18n.t('show_success')}`)
        }, (error) => {
            showToast(error)
        })
}

export function rankGameShare(title, location, icon, gameId) {
    UMShare.share(title, location, getShareIcon(icon), shareHost() + "rankGame/" + gameId + "/" + Lang)
        .then(() => {
            showToast(`${I18n.t('show_success')}`)
        }, (error) => {
            showToast(error)
        })
}

export function uVideoShare(title, desc, icon, videoId) {
    UMShare.share(title, shareTxt(desc), getShareIcon(icon), shareHost() + "videos/" + videoId + "/" + Lang)
        .then(() => {
            showToast(`${I18n.t('show_success')}`)
        }, (error) => {
            showToast(error)
        })
}

function getShareIcon(icon) {
    return strNotNull(icon) ? encodeURI(icon) : shareIcon
}

export function strNull__(str) {
    if (strNotNull(str))
        return str;
    else
        return '--';
}

export function strValid(str) {
    if (str === undefined || str === null || str.length === 0)
        return '';
    else
        return str;
}


export function getGetOrdinal(n) {
    let s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}


export function strRow(str) {
    if (strValid(str)) {
        return str.replace('|', '\n');
    }
}

var pattern = / /;

export function nameRow(name) {
    if (strValid(name)) {
        return name.replace(pattern, ' ').replace(' ', '\n');
    }
}

/*日期数据*/
export function _createDateData() {
    let date = [];
    for (let i = 1950; i < 2050; i++) {
        let month = [];
        for (let j = 1; j < 13; j++) {
            let day = [];
            if (j === 2) {
                for (let k = 1; k < 29; k++) {
                    day.push(k + '日');
                }
                //Leap day for years that are divisible by 4, such as 2000, 2004
                if (i % 4 === 0) {
                    day.push(29 + '日');
                }
            }
            else if (j in {1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1}) {
                for (let k = 1; k < 32; k++) {
                    day.push(k + '日');
                }
            }
            else {
                for (let k = 1; k < 31; k++) {
                    day.push(k + '日');
                }
            }
            let _month = {};
            _month[j + '月'] = day;
            month.push(_month);
        }
        let _date = {};
        _date[i + '年'] = month;
        date.push(_date);
    }
    return date;
}

/*金额千分转换*/
export function moneyFormat(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
}

/*对象是否为空对象*/
export function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

export function showToast(msg) {

    const toast = Toast.show(msg, {
        testID: 'deshproToast', position: 200, duration: Toast.durations.SHORT,
        onHidden: (siblingManager) => {
            Toast.hide(toast)
        }
    });

}


var myreg = /^1(3|4|5|7|8)\d{9}$/;

export function checkPhone(phone) {
    if (phone != null && phone != undefined) {
        if (!myreg.test(phone.trim())) {
            showToast(`${I18n.t('show_put_phone')}`);
            return false;
        }
        return true;
    }
}

var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export function checkMail(mail) {

    if (strNotNull(mail) && filter.test(mail.trim())) return true;
    else {
        showToast(`${I18n.t('show_mail_fail')}`);
        return false;
    }
}

export function checkLoginMail(mail) {
    if (filter.test(mail.trim())) return true;
    else {
        return false;
    }
}

/*有效的密码格式满足的条件
 1, 长度必须6 - 20位
 2, 必须是 数字+字母 或 数字 + 特殊字符 或 字母+特殊字符 或 数字 + 字母 + 特殊字符的组合*/
var PWD_VALID_FORMAT_REGEX = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;

export function pwdVaild(password) {
    if (PWD_VALID_FORMAT_REGEX.test(password))
        return true;
    else {
        showToast(`${I18n.t('show_password_fail')}`);
        return false;
    }

}

export function md5Pwd(password) {
    return md5.hex_md5(password);
}

/*赛事状态*/
export function raceStatusConvert(status) {
    switch (status) {
        case 'unbegin':
            return I18n.t('races_unstart');
        case 'go_ahead':
            return I18n.t('donging');
        case 'ended':
            return I18n.t('ended');
        case 'closed':
            return I18n.t('closed');
    }
}

export function racesStatusImage(status) {
    switch (status) {
        case 'unbegin':
            return Images.home_unstart;
        case 'go_ahead':
            return Images.home_competition;
        case 'ended':
            return Images.home_over;
        case 'closed':
            return Images.home_over_one;
    }
}

/*票务状态*/
export function ticketStatusConvert(status) {
    switch (status) {
        case 'unsold':
            return I18n.t('ticket_unsold');
        case 'selling':
            return I18n.t('ticket_selling');
        case 'end':
            return I18n.t('ticket_end');
        case 'sold_out':
            return I18n.t('ticket_sold_out');
    }
}


export function sellable(status, sellable) {

    if (sellable)
        return status === SellStatus.selling;
    else
        return false;

}


/*日期转化*/
export function convertDate(date, formate) {
    if (strNotNull(date))
        return moment(legalValue(date)).format(formate)
}

export function utcDate(utc, formate) {
    return moment.unix(utc).format(formate)
}


/*订单状态*/
export function orderStatus(status) {
    switch (legalValue(status)) {
        case 'unpaid':
            return I18n.t('unpaid');
        case 'paid':
            return I18n.t('unshipped');
        case 'completed':
            return I18n.t('completed');
        case 'canceled':
            return I18n.t('canceled');
        case 'delivered':
            return I18n.t('delivered');
    }
}

/*票务类型*/
export function ticketType(type) {
    switch (legalValue(type)) {
        case 'e_ticket':
            return I18n.t('ticket_web');
    }
}

/**/
export function legalValue(value) {
    return value ? value : '';
}

/*获取登陆用户*/
export function getLoginUser() {
    return LoginUser;
}

/*缓存登陆用户*/
export function putLoginUser(ret) {
    setLoginUser(ret);
    storage.save({
        key: StorageKey.UserAvatar,
        rawData: ret.avatar
    });
}

/*是否登陆*/
export function isLoginUser() {
    if (!isEmptyObject(LoginUser) && strNotNull(LoginUser.user_id))
        return true;
    else
        return false;
}

/*清除登陆用户*/
export function clearLoginUser() {
    storage.remove({
        key: StorageKey.LoginUser
    });
    removeToken();
    setLoginUser({});
    global.user_extra = {};
}

/*身份证验证状态*/
export function idCardStatus(status) {
    switch (status) {
        case Verified.PENDING:
            return I18n.t('pending');
        case Verified.PASSED:
            return I18n.t('passed');
        case Verified.FAILED:
            return I18n.t('failed');
    }
}

export function setUserData(username) {
    userData = username;
    storage.save({
        key: StorageKey.UserData,
        rawData: username
    })
}

export var userData = '';

export function getUserData() {
    storage.load({key: StorageKey.UserData})
        .then((ret) => {
            userData = ret
        })
}

export let FontSize = {
    h19: 19,
    h18: 18,
    h17: 17,
    h16: 16,
    h15: 15,
    h14: 14,
    h13: 13,
    h12: 12,
    h9: 9,
};
let sizeNum = 0;

export function getSize() {
    storage.load({key: StorageKey.FontNum})
        .then((ret) => {
            sizeNum = ret;
            console.log('sizeNum:' + sizeNum);
            FontSize = {
                h19: 19 + sizeNum,
                h18: 18 + sizeNum,
                h17: 17 + sizeNum,
                h16: 16 + sizeNum,
                h15: 15 + sizeNum,
                h14: 14 + sizeNum,
                h13: 13 + sizeNum,
                h12: 12 + sizeNum,
                h9: 9 + sizeNum,
            }
        });
}


export function setSize(num) {
    sizeNum = num;
    FontSize = {
        h19: 19 + sizeNum,
        h18: 18 + sizeNum,
        h17: 17 + sizeNum,
        h16: 16 + sizeNum,
        h15: 15 + sizeNum,
        h14: 14 + sizeNum,
        h13: 13 + sizeNum,
        h12: 12 + sizeNum,
        h9: 9 + sizeNum,
    };
    storage.save({
        key: StorageKey.FontNum,
        rawData: num
    });
}

export function setFontSize(num) {
    storage.save({
        key: StorageKey.FontSizeNum,
        rawData: num
    })
}


/*数组格式 转 字典数组*/
export function dataBlob(arr) {

    var objArr = {};            //定义一个空对象
    var len = arr.length;

    for (var i = 0; i < len; i++) {

        var begin_date = convertDate(arr[i].begin_date, YYYY_MM);
        var Value = arr[i];

        if (!objArr[begin_date]) {        //objArr[Id]未定义或不存在
            objArr[begin_date] = [];
        }


        objArr[begin_date].push(Value);
    }

    return objArr;
}

/*月份增加*/
export function getCurrentMonth() {
    return moment().format(YYYY_MM)
}

export function getCurrentDate() {
    return moment();
}

/*数组去重*/
export function arrayUnique(arr) {

    var n = {}, r = []; //n为hash表，r为临时数组
    for (var i = 0; i < arr.length; i++) //遍历当前数组
    {
        var race_id = arr[i].race_id;
        if (!n[race_id]) //如果hash表中没有当前项
        {
            n[race_id] = true; //存入hash表
            r.push(arr[i]); //把当前数组的当前项push到临时数组里面
        }
    }
    return r;
}


export function newsUnique(arr) {

    var n = {}, r = []; //n为hash表，r为临时数组
    for (var i = 0; i < arr.length; i++) //遍历当前数组
    {
        var id = arr[i].id;
        if (!n[id]) //如果hash表中没有当前项
        {
            n[id] = true; //存入hash表
            r.push(arr[i]); //把当前数组的当前项push到临时数组里面
        }
    }
    return r;
}

export function uniqueArray(arr, items) {
    arr.concat(items);
    let n = {}, r = [];
    for (let i = 0; i < arr.length; i++) {
        let id = arr[i].id;
        if (!n[id]) //如果hash表中没有当前项
        {
            n[id] = true;
        } else {
            r.push(arr[i]); //把当前数组的当前项push到临时数组里面
        }
    }

    items.concat(r);
    let m = {}, l = [];
    for (let j = 0; j < items.length; j++) {
        let id = items[j].id;
        if (!m[id]) //如果hash表中没有当前项
        {
            m[id] = true; //存入hash表
            l.push(items[j]); //把当前数组的当前项push到临时数组里面
        }
    }

    console.log(l)

    return l;
}


/*拨打电话*/
export function call(phone) {
    Communications.phonecall(phone, false)
}

/*屏幕像素密度*/
export function pixel(layout) {
    return PixelRatio.getPixelSizeForLayoutSize(layout)
}


var Actions = {};

/*Action 方法*/
export function setDispatchAction(key, func) {
    Actions[key] = func;
}

export function getDispatchAction() {
    return Actions;
}

//正在开发提示
export function developing() {
    Alert.alert(`${I18n.t('alert_doing')}`, `${I18n.t('alert_help')}`, [{
        text: `${I18n.t('alert_sure')}`, onPress: () => {
        }
    }])
}

//获取单月的最后一个天
export function getMonthLastDay(firstDate) {

    let endDate = new Date(firstDate);
    endDate.setMonth(endDate.getMonth() + 1);

    endDate.setDate(0);

    return moment(endDate).format("YYYY-MM-DD");
}

//分享工具
export function share(content, url) {
    Share.share({
        message: url,
        url: url,
        title: content
    }).then(_showResult)
        .catch((error) => {

        });
}

function _showResult(result) {
    if (result.action === Share.sharedAction) {
        // showToast('分享成功');
    }
}

//判断奇偶数
export function singleOrdouble(num) {
    if (num % 2 === 0)
        return true;
    else
        return false;
}



