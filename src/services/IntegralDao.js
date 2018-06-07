import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

export function postIntegralTask(body, resolve, reject) {
    helper.post(Api.integral_task(body), {}, ret => {
        resolve(ret.data)
    }, reject, body)
}

export function postIntegralDetails(body, resolve, reject) {
    helper.post(Api.integral_detail(body), {}, ret => {
        resolve(ret.data)
    }, reject, body)
}