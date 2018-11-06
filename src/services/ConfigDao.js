/**
 * Created by lorne on 2017/1/11.
 */
import StorageKey from '../configs/StorageKey';
import {setLanguage} from '../I18n/I18n';
import {getSize, setLang, getCarts, logMsg, getPosition} from '../utils/ComonHelper';
import {setDpLang} from '../services/RequestHelper';
import {listVerified} from './AccountDao';
import {Platform, PermissionsAndroid} from 'react-native'
import {locations} from "./SocialDao";

export function init(resolve) {
    storage.load({key: StorageKey.Language})
        .then(ret => {
            switchLang(ret);
            resolve();
        }).catch(err => {

        switchLang(language);
    });
    getSize();
    /*获取购物车*/
    getCarts();

    getPosition(data=>{
      const {longitude, latitude} = data;
      // let body = {
      //   longitude: longitude,
      //   latitude: latitude
      // }
        let body = {
            latitude:"22.203672",
            longitude:"113.564241"
        }
      locations(body, data => {
        global.city_name = data.base.city_name;
      }, err => {
        console.log("获取位置失败");
      })
    },err=>{

    })

}


export function initLogin() {
    listVerified(data => {
    }, err => {
    })
}

function switchLang(lang) {
    global.language = lang;
    setLanguage(lang);
    setDpLang(lang);
    setLang(lang);
}

export function setLocalLanguage(language) {
    switchLang(language);
    storage.save({
        key: StorageKey.Language,
        rawData: language
    });

}

export async function requestCameraPermission() {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            )

            return granted;
        } catch (err) {
            console.warn(err)
        }
    }
}

