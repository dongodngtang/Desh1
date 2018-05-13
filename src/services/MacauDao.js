import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';


export function info_types(body, resolve, reject) {
    helper.get(Api.info_types(body), ret => {
        resolve(ret.data)
    }, reject, body)
}

export function hotels(body, resolve, reject) {
    helper.get(Api.hotels, ret => {
        resolve(ret.data)
    }, reject, body)
}

export function hotelDetail(body, resolve, reject) {
    helper.get(Api.hotels + `/${body.id}`, ret => {
        resolve(ret.data)
    }, reject)
}