import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

//删除订单

export function delHotelOrder(body, resolve, reject) {
    helper.del(Api.del_order_hotel(body), {}, (ret) => {
        resolve(ret.data)
    }, reject)
}

//取消订单
export function cancelHotelOrder(body, resolve, reject) {
    helper.post(Api.hotel_order_cancel(body), {}, ret => {
        resolve(ret.data)
    }, reject)
}


export function getHotelOrderList(body, resolve, reject) {
    helper.get(Api.hotel_order, ret => {
        resolve(ret.data)
    }, reject, body)
}

//微信支付结果
export function getHotelWxPaidResult(body, resolve, reject) {
    helper.get(Api.hotel_wx_paid_result(body), (ret) => {
        resolve(ret.data)
    }, reject)
}

//微信支付
export function postHotelWxPay(body, resolve, reject) {
    helper.post(Api.hotel_wxPay(body), {}, ret => {
        resolve(ret.data)
    }, reject)
}

export function getHotelOrderInfo(body, resolve, reject) {
    helper.get(Api.hotel_order_info(body), ret => {
        resolve(ret.data)
    }, reject, body)
}

export function postHotelOrder(body, resolve, reject) {
    helper.post(Api.hotel_order, body, ret => {
        resolve(ret.data)
    }, reject)
}

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