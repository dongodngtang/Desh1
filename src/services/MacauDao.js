import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';


export function postReceiveCoupons(body, resolve, reject) {
    helper.post(Api.receive_coupons(body), body, ret => {
        resolve(ret.data)
    }, reject)
}


export function getHotlines(body, resolve, reject) {
    helper.get(Api.hotlines, ret => {
        resolve(ret.data)
    }, reject, body)
}


export function getExchange_traders(body, resolve, reject) {
    helper.get(Api.exchange_traders, ret => {
        resolve(ret.data)
    }, reject, body)
}

export function getExchange_rates(body, resolve, reject) {
    helper.get(Api.exchange_rates(body), ret => {
        resolve(ret.data)
    }, reject, body)
}

export function getUsingCoupons(body, resolve, reject) {
    helper.get(Api.using_coupon(body), ret => {
        resolve(ret.data)
    }, reject)
}

export function getCouponInfos(body, resolve, reject) {
    helper.get(Api.coupons_infos(body), ret => {
        resolve(ret.data)
    }, reject, body)
}


export function getInfoCoupons(body, resolve, reject) {
    helper.get(Api.info_coupons(body), ret => {
        resolve(ret.data)
    }, reject, body)
}

export function getPersonCoupons(body, resolve, reject) {
    helper.get(Api.person_coupons(), ret => {
        resolve(ret.data)
    }, reject, body)
}

//删除订单
export function delHotelOrder(body, resolve, reject) {
    helper.del(Api.del_order_hotel(body), {}, (ret) => {
        resolve(ret.data)
    }, reject)
}

//酒店退款
export function returnHotelOrder(body, resolve, reject) {
    helper.post(Api.hotel_return(body), {}, ret => {
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

//支付宝支付
export function postHotelAliPay(body, resolve, reject) {
    helper.post(Api.hotel_aliPay(body), {}, ret => {
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