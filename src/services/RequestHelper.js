/**
 * Created by lorne on 2016/12/23.
 */
import {create, SERVER_ERROR, TIMEOUT_ERROR, NETWORK_ERROR} from 'apisauce';
import Api from '../configs/ApiConfig';
import {clearLoginUser, showToast, strNotNull, permissionAlert} from '../utils/ComonHelper';
import StorageKey from '../configs/StorageKey';
import I18n from 'react-native-i18n';


let TAG = 'PuKeHttp:';


// define the api
const client = create({
    baseURL: Api.production,
    timeout: 30000,
    // headers: {
    //     'X-DP-APP-KEY': '467109f4b44be6398c17f6c058dfa7ee',
    //     'X-DP-CLIENT-IP': '192.168.2.231'
    // },
});

export function setDpLang(lang) {
    client.setHeader('X-DP-LANG', 'zh')
}

export function getDpLang() {
    return client.headers['X-DP-LANG'];
}

export function getApiType() {
    let type = 'production';
    let ret = client.getBaseURL();

    if (ret === Api.dev)
        type = 'dev';
    else if (ret === Api.test)
        type = 'test';
    else if (ret === Api.production)
        type = 'production';

    return type;
}


export function getBaseURL(callback) {
    storage.load({
        key: StorageKey.ApiSever,
        autoSync: true,
        syncInBackground: false
    })
        .then((ret) => {
            client.setBaseURL(ret);
            callback();
        }).catch(err => {
        client.setBaseURL(Api.production);
        setBaseURL(Api.production);
        callback();
    });
}

export function setBaseURL(api) {
    client.setBaseURL(api);
    storage.save({
        key: StorageKey.ApiSever,
        rawData: api
    });

}

export function setAccessToken(token) {
    client.setHeader('x-access-token', token)
}

export function getAccessToken() {
    let token = client.headers['x-access-token'];

    return strNotNull(token) ? token : '';
}

export function removeToken() {
    delete client.headers['x-access-token']
}


if (__DEV__) {

    const naviMonitor = (response) => {
        const {config} = response;
        console.log('RES_URL:' + config.url, response)
    }
    client.addMonitor(naviMonitor);
    client.addRequestTransform(request => {
        console.log('URL:' + client.getBaseURL() + request.url, request)
    })
}


export function post(url, body, resolve, reject) {

    console.log(url, body)
    client.post(url, body)
        .then((response) => {
            handle(response, resolve, reject)


        }).catch((error) => {
        console.log(TAG, error);
        showToast(error);
        reject('Network response was not ok.');
    });
}


export function del(url, body, resolve, reject) {
    console.log(url, body);
    client.delete(url, body)
        .then((response) => {
            handle(response, resolve, reject)

        }).catch((error) => {
        showToast(error);
        console.log(TAG, error);
        reject('Network response was not ok.');
    });
}


export function put(url, body, resolve, reject) {
    console.log(url, body)
    client.put(url, body)
        .then((response) => {
            handle(response, resolve, reject)

        }).catch((error) => {
        console.log(TAG, error);
        reject('Network response was not ok.');
    });
}

export function get(url, resolve, reject, params = {}) {
    console.log(url)
    client.get(url, params)
        .then((response) => {
            handle(response, resolve, reject)

        }).catch((error) => {
        showToast(error);
        console.log(TAG, error);
        reject('Network response was not ok.');
    });
}


/*token过期*/
function netError(response, reject) {
    let msgErr = '';
    if (response.status === 401) {
        clearLoginUser();
        router.popToLoginFirstPage();
        msgErr = response.data.message;
    }

    if (response.problem === SERVER_ERROR)
        msgErr = I18n.t('SERVER_ERROR');
    else if (response.problem === TIMEOUT_ERROR)
        msgErr = I18n.t('TIMEOUT_ERROR');
    else if (response.problem === NETWORK_ERROR) {
        permissionAlert('澳门通网络权限已被关闭，是否前往开启')
        msgErr = I18n.t('NETWORK_ERROR');
    }


    showToast(msgErr);
    reject(msgErr);

}

function handle(response, resolve, reject) {
    if (response.ok) {

        const {code, message} = response.data;
        if (code === 0) {
            resolve(response.data);
        } else {
            reject(message);
        }
    } else {

        netError(response, reject);
    }
}



