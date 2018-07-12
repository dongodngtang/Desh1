import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

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
