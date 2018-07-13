import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';
import {showToast} from "../utils/ComonHelper";

export function invite_count(resolve, reject) {
    helper.get(Api.invite_count, ret => {
        resolve(ret.data)
    }, reject)
}

export function award_details(resolve, reject) {
    helper.get(Api.award_details, ret => {
        resolve(ret.data)
    }, reject)
}

export function wallet_account(resolve, reject) {
    helper.get(Api.wallet_account, ret => {
        resolve(ret.data)
    }, reject)
}

export function account_details(resolve, reject) {
    helper.get(Api.account_details, ret => {
        resolve(ret.data)
    }, reject)
}

export function display_check(resolve, reject) {
    helper.get(Api.display_check, ret => {
        resolve(ret.data)
    }, err => {
        reject(err)
    })
}

