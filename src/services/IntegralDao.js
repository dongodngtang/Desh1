import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';


export function getIntrgralMall(resolve, reject) {
    helper.get(Api.integral_mall, ret => {
        resolve(ret.data);
    }, err => {
        reject(err)
    })
}

export function postAward(body, resolve, reject) {
    helper.post(Api.integral_award(), body, ret => {
        resolve(ret.data)
    }, reject, body)
}
export function postIntegralTask(body, resolve, reject) {
    helper.post(Api.integral_task(body), {}, ret => {
        resolve(ret.data)
    }, reject, body)
}

export function postIntegralDetails(body, resolve, reject) {
    helper.get(Api.integral_detail(body), ret => {
        resolve(ret.data)
    }, reject)
}
