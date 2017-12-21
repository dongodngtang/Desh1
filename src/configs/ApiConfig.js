/**
 * Created by lorne on 2016/12/20.
 */
import {LoginUser} from '../services/AccountDao';
import {strNotNull, isEmptyObject} from '../utils/ComonHelper';

export default {
    //内部测试
    dev: 'http://deshpro.ngrok.cc/v10/',
    dev_ci_at: 'http://192.168.2.231:8801/v10/',

    //test分支用来发布版本  test_ci_at用来跑自动化测试
    test: 'http://test.api.deshpro.com/v10/',
    test_ci_at: 'http://106.75.134.18:8801/v10/',

    //production 用来发布正式生产环境
    staging: 'http://106.75.136.9:8801/v10/',
    production: 'https://api.deshpro.com/v10/',

    register: 'register',
    login: 'login',
    account_profile: putProfile,
    upload_avatar: 'uploaders/avatar',
    account_verify: 'account/verify_vcode',
    account_reset_password: 'account/reset_password',
    account_change_pwd: postChangePwd,
    recent_races: recent_races,
    v_codes: 'account/v_codes',
    races_info: races_info,

    new_order: new_order,
    ticket_status: ticket_status,
    buyTicket: buyTicket,
    certification: certification,
    upload_card_image: 'uploaders/card_image',
    users_orderList: users_orderList,
    users_orderDetail: users_orderDetail,
    users_orderCancel: users_orderCancel,
    search_races: search_races,
    search_by_date: search_by_date,
    search_by_keyword: search_by_keyword,
    search_range_list: search_range_list,
    sub_races: sub_races,
    race_ranks: race_ranks,
    sub_race_info: sub_race_info,
    player_info: player_info,
    news_types: 'news/types',
    news_list: news_list,
    news_search: news_search,
    race_hosts: 'race_hosts',
    race_tickets: race_tickets,
    account_change_bind: account_change_bind,
    bind_account: bind_account,
    change_permission: change_permission,
    notifications: notifications,
    videoTypes: 'videos/types',
    videoList: videoList,
    searchVideo: searchVideo,
    delNotice: delNotice,
    selectRaceTicket: selectRaceTicket,
    buyRaceTicket: buyRaceTicket,
    orderTicket: orderTicket,
    addAddress: addAddress,
    setAdrDefault: setAdrDefault,
    adrDelete: adrDelete,
    login_count: login_count,
    players_list: players_list,
    poker_ranks: poker_ranks,
    player_focus: player_focus,
    focus_list: focus_list,
    pay_order: pay_order,
    order_complete: order_complete,
    unpaid_order: unpaid_order,
    feedbacks: 'feedbacks',
    wx_pay: wx_pay,
    weixin_auth: 'weixin/auth',
    weixin_bind: 'weixin/bind',
    account_exist: account_exist,
    activities: 'activities',
    activityInfo: activityInfo,
    activityPush: 'activities/pushed',
    verify_invite_code: verify_invite_code,
    msg_read: msg_read,
    unread_remind: unread_remind,
    app_versions: 'app_versions',
    add_certification: add_certification,
    del_certification: del_certification,
    list_certification: list_certification,
    cert_default: cert_default,
    test_user: 'account/test_user',
    preferential: preferential,
    banners: 'banners',
    headlines: 'headlines',
    hot_infos: 'hot_infos',
    info_detail: info_detail,
    video_detail: video_detail,
    sub_videos: sub_videos,
    search_video: search_video,
    categories: 'categories',
    categories_child: categories_child,
    cat_products: cat_products,
    products: 'products',
    product_detail: product_detail,
    product_orders: product_orders,
    mall_order: 'product_orders',
    mall_wxPay: mall_wxPay,
    order_lists: order_lists,
    mall_order_cancel: mall_order_cancel,
    wx_paid_result: wx_paid_result,
    product_order_detail: product_order_detail,
    product_order_confirm: product_order_confirm,
    logistics_info: logistics_info,
    refund_types: 'refund_types',
    upload_temp_img: 'uploaders/tmp_image',
    mall_refund: mall_refund,
    refund_info: refund_info,
    topic_comments: 'topic/comments',
    comment_replies: comment_replies,
    replies_replies: replies_replies,
    new_likes: new_likes,
    person_dynamics: person_dynamics


}


function getUserId() {
    if (!isEmptyObject(global.login_user) && strNotNull(global.login_user.user_id)) {
        return login_user.user_id;
    }
    return '0';
}

const page_size = 10;

export function person_dynamics(body) {
    const {user_id, page} = body;

    return `users/${user_id}/dynamics?page=${page}&page_size=${page_size}`;
}
export function new_likes(body) {
    const {info_id} = body;

    return `topic/infos/${info_id}/likes`;
}

export function replies_replies(body) {
    const {comment_id, reply_id} = body;
    return `topic/comments/${comment_id}/replies/${reply_id}/replies`
}

export function comment_replies(body) {
    const {comment_id} = body;

    return `topic/comments/${comment_id}/replies`;
}

export function refund_info(body) {
    const {refund_number} = body;
    return `refund/${refund_number}/refund_record`
}


export function mall_refund(body) {
    const {order_number} = body;
    return `product_orders/${order_number}/refund`
}

export function logistics_info(body) {
    const {shipping_number, express_code, order_number} = body;
    return `shipments/search?shipping_number=${shipping_number}&express_code=${express_code}&order_number=${order_number}`;
}

export function product_order_confirm(body) {
    const {order_number} = body;
    return `product_orders/${order_number}/confirm`
}

export function product_order_detail(body) {
    const {order_number} = body;
    return `product_orders/${order_number}`
}

export function wx_paid_result(body) {
    const {order_number} = body;
    return `product_orders/${order_number}/wx_paid_result`
}

export function mall_order_cancel(body) {
    const {order_number} = body;
    return `product_orders/${order_number}/cancel`
}

export function order_lists(body) {
    const {next_id, status} = body;
    return `product_orders?page_size=${page_size}&next_id=${next_id}&status=${status}`
}

export function mall_wxPay(body) {
    const {order_number} = body;
    return `product_orders/${order_number}/wx_pay`
}

export function product_detail(body) {
    return `products/${body.id}`

}

export function product_orders() {
    return `product_orders/new`

}

export function cat_products(body) {
    const {id} = body;
    if (id === -1)
        return 'recommended_products';//推荐
    else
        return `categories/${id}/products`
}

export function categories_child(body) {
    const {id} = body;
    return `categories/${id}/children`;
}

export function search_video(body) {
    const {keyword, next_id} = body;

    return `videos/search_main_videos?keyword=${keyword}&next_id=${next_id}&page_size=${page_size}`
}

export function sub_videos(body) {
    const {group_id} = body;
    return `videos/group/${group_id}/sub_videos`
}

export function video_detail(body) {
    const {video_id} = body;
    return 'news/videos/' + video_id;
}

export function info_detail(body) {
    const {info_id} = body;
    return 'news/infos/' + info_id;
}

export function preferential(body) {
    const {race_id} = body;
    return 'races/' + race_id + '/tickets/preferential'
}

export function cert_default() {
    return 'account/users/' + getUserId() + '/certification/default'
}


export function list_certification() {
    return 'account/users/' + getUserId() + '/certification?version=v20'
}

export function del_certification() {
    return 'account/users/' + getUserId() + '/certification/delete'
}

export function add_certification() {
    return 'account/users/' + getUserId() + '/certification'
}

export function unread_remind() {
    return 'users/' + getUserId() + '/notifications/unread_remind';
}


export function msg_read(body) {
    const {id} = body;
    return 'users/' + getUserId() + '/notifications/' + id + '/read';
}


export function verify_invite_code() {
    return 'users/' + getUserId() + '/verify_invite_code'
}

export function activityInfo(body) {
    const {id} = body;
    return 'activities/' + id;
}

export function account_exist(body) {
    const {account} = body;
    return 'account/' + account + '/verify'
}

export function wx_pay(body) {
    const {order_number} = body;
    return 'users/' + getUserId() + '/orders/' + order_number + '/wx_pay';
}

export function unpaid_order(body) {
    const {race_id, ticket_id} = body;
    return 'races/' + race_id + '/tickets/' + ticket_id + '/unpaid_order'

}

export function order_complete(body) {
    const {order_number} = body;
    return 'users/' + getUserId() + '/orders/' + order_number + '/complete';
}

export function pay_order(body) {
    const {order_number} = body;
    return 'users/' + getUserId() + '/orders/' + order_number + '/pay';
}

export function player_focus(body) {
    const {player_id} = body;
    return 'players/' + player_id + '/follow'
}

export function login_count() {
    return 'users/' + getUserId() + '/login_count';
}


export function adrDelete(address_id) {
    return 'account/users/' + getUserId() + '/address/' + address_id + '/delete';
}

export function setAdrDefault(address_id) {
    return 'account/users/' + getUserId() + '/address/' + address_id + '/default';
}

export function addAddress() {
    return 'account/users/' + getUserId() + '/address';
}

export function orderTicket(body) {
    const {race_id, ticket_id} = body;
    return 'races/' + race_id + '/tickets/' + ticket_id + '/orders';
}


export function buyRaceTicket(body) {
    const {race_id, ticket_id} = body;
    return 'races/' + race_id + '/tickets/' + ticket_id;
}

export function selectRaceTicket(body) {
    const {race_id} = body;
    return 'races/' + race_id + '/tickets';
}

export function delNotice(body) {
    const {id} = body;
    return 'users/' + login_user.user_id + '/notifications/' + id;

}

export function searchVideo(body) {
    const {keyword, next_id} = body;
    return 'videos/search?keyword=' + keyword + '&next_id=' + next_id
}

export function videoList(body) {
    const {type_id, next_id} = body;
    return 'videos/types/' + type_id + '/main_lists?page_size=' + page_size + '&next_id=' + next_id
}


export function notifications() {
    return 'users/' + login_user.user_id + '/notifications';
}


export function change_permission() {
    return 'account/users/' + login_user.user_id + '/change_permission';
}


export function bind_account() {
    return 'account/users/' + login_user.user_id + '/bind_account';
}

export function account_change_bind() {
    return 'account/users/' + login_user.user_id + '/change_account'
}

export function race_tickets(body) {
    const {keyword, seq_id} = body;
    let url = '';
    if (strNotNull(keyword)) {
        url = '&keyword=' + keyword;
    }
    if (strNotNull(seq_id))
        url = url + '&seq_id=' + seq_id;

    return 'race_tickets?page_size=' + page_size + url;
}

export function news_search(body) {
    const {keyword, next_id} = body;

    return 'news/search?keyword=' + keyword + '&next_id=' + next_id;
}

export function news_list(body) {

    const {type_id, next_id} = body;

    return 'news/types/' + type_id + '?page_size=' + page_size + '&next_id=' + next_id;
}

export function players_list(body) {
    const {page_index, region, page_size, begin_year, end_year, keyword} = body;
    if (strNotNull(keyword))
        return 'players?keyword=' + keyword;
    else
        return 'players?page_index=' + page_index + '&page_size=' + page_size
            + '&region=' + region + '&begin_year=' + begin_year + '&end_year=' + end_year;
}

export function player_info(body) {
    const {player_id} = body;
    return 'players/' + player_id;
}

export function poker_ranks(body) {
    const {player_id} = body;
    return 'players/' + player_id + '/ranks';
}

export function focus_list(body) {
    const {next_id} = body;
    return 'users/' + getUserId() + '/followed_players?next_id=' + next_id
}

export function sub_race_info(body) {
    const {race_id_1, race_id_2} = body;
    return 'races/' + race_id_1 + '/sub_races/' + race_id_2;
}


export function race_ranks(body) {
    const {race_id} = body;
    return 'races/' + race_id + '/race_ranks';
}

export function sub_races(body) {
    const {race_id, type} = body;
    if (strNotNull(type))
        return 'races/' + race_id + '/sub_races?type=' + type;
    else
        return 'races/' + race_id + '/sub_races';
}

export function search_range_list(body) {
    const {begin_date, end_date} = body;
    return 'u/' + getUserId() + '/races/search_range_list?begin_date='
        + begin_date + '&end_date=' + end_date
}

export function search_by_keyword(body) {
    const {keyword, next_id} = body;
    return 'u/' + getUserId() + '/races/search_by_keyword?keyword='
        + keyword + '&next_id=' + next_id + '&page_size=' + page_size;
}

export function search_by_date(body) {
    const {date, next_id} = body;
    return 'u/' + getUserId() + '/races/search_by_date?date='
        + date + '&next_id=' + next_id + '&page_size=' + page_size;

}


export function search_races(body) {

    console.log('search_race', body);
    const {seq_id, operator, host_id, date} = body;
    if (!isEmptyObject(login_user) && strNotNull(login_user.user_id)) {

        return '/u/' + login_user.user_id + '/races?page_size='
            + page_size + '&seq_id=' + paramCheck(seq_id) + '&operator=' + paramCheck(operator)
            + '&host_id=' + paramCheck(host_id) + '&date=' + paramCheck(date);

    } else {
        return '/u/0/races?page_size='
            + page_size + '&seq_id=' + paramCheck(seq_id) + '&operator=' + paramCheck(operator)
            + '&host_id=' + paramCheck(host_id) + '&date=' + paramCheck(date);

    }

}

function paramCheck(param) {
    return strNotNull(param) ? param : '';
}


export function putProfile(user_id) {
    return 'account/users/' + user_id + '/profile';
}

function postChangePwd() {
    return 'account/users/' + LoginUser.user_id + '/change_password';
}

function recent_races(body) {
    const {number} = body;
    if (strNotNull(number)) {
        return 'u/' + getUserId() + '/recent_races?numbers=' + number;
    } else {
        return 'u/0/recent_races';
    }
}


function races_info(body) {
    const {user_id, race_id} = body;
    return 'u/' + getUserId() + '/races/' + race_id;
}

function new_order(race_id) {
    return 'races/' + race_id + '/new_order'
}

function ticket_status(race_id) {
    return 'races/' + race_id + '/ticket_status'
}

function buyTicket(race_id) {
    return 'races/' + race_id + '/orders'
}

function certification(user_uuid) {
    return 'account/users/' + user_uuid + '/certification'
}

function users_orderList(body) {
    const {user_id, page_size, next_id, status} = body;
    return 'users/' + user_id + '/orders?page_size='
        + page_size + '&next_id=' + next_id + '&status=' + status;

}

function users_orderDetail(body) {
    const {user_id, order_id} = body;
    return 'users/' + user_id + '/orders/' + order_id;
}

function users_orderCancel(body) {
    const {user_id, order_id} = body;
    return 'users/' + getUserId() + '/orders/' + order_id + '/cancel';
}


