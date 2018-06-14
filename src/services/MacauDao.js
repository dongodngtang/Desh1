import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';


export function postRoomReservation(body, resolve, reject) {
    helper.post(Api.room_reservation, body, ret => {
        resolve(ret.data)
    }, reject)
}

export function getRoomList(body, resolve, reject) {
    helper.get(Api.room_list(body), ret => {
        resolve(ret.data)
    }, reject, body)
}

export function home_recommends(resolve, reject, params) {
    helper.get(Api.recommends, ret => {
        resolve(ret.data)
    }, reject, params)
}

export function exchange_rates(resolve, reject) {
    helper.get(Api.exchange_rates, ret => {
        resolve(ret.data)
    }, reject)
}

export function getInfos(id, resolve, reject) {
    helper.get(Api.infos + `/${id}`, ret => {
        resolve(ret.data)
    }, reject)
}

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