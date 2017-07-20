// @flow

// leave off @2x/@3x
const images = {
    nav_close: require('../../source/nav_Close@2x.png'),
    icon_biyan: require('../../source/icon_biyan@2x.png'),
    icon_guanbi: require('../../source/icon_guanbi@2x.png'),
    icon_mima: require('../../source/icon_mima@2x.png'),
    icon_shouji: require('../../source/icon_shouji@2x.png'),
    icon_weixuanzhong: require('../../source/icon_weixuanzhong@2x.png'),
    icon_xuanzhong: require('../../source/icon_xuanzhong@2x.png'),
    icon_yanjing: require('../../source/icon_yanjing@2x.png'),
    icon_yanzhenma: require('../../source/icon_yanzhenma@2x.png'),
    icon_youxiang: require('../../source/icon_youxiang@2x.png'),
    icon_zhanghao: require('../../source/icon_zhanghao@2x.png'),
    icon_return: require('../../source/icon_return@2x.png'),
    icon_blackspots: require('../../source/icon_blackspots@2x.png'),
    icon_camera: require('../../source/icon_camera@2x.png'),
    icon_cancel: require('../../source/icon_cancel@2x.png'),
    icon_closed: require('../../source/icon_closed@2x.png'),
    icon_deshpro: require('../../source/icon_deshpro@2x.png'),
    icon_exclamation: require('../../source/icon_exclamation@2x.png'),
    icon_longframe: require('../../source/icon_longframe@2x.png'),
    icon_love: require('../../source/icon_love@2x.png'),
    icon_match: require('../../source/icon_match@2x.png'),
    icon_more: require('../../source/icon_more@2x.png'),
    icon_open: require('../../source/icon_open@2x.png'),
    icon_order: require('../../source/icon_order@2x.png'),
    icon_phone: require('../../source/icon_phone@2x.png'),
    icon_search_gray: require('../../source/icon_search_gray @2x.png'),
    icon_search: require('../../source/icon_search@2x.png'),
    icon_service: require('../../source/icon_service@2x.png'),
    icon_setup: require('../../source/icon_setup@2x.png'),
    icon_shortframe: require('../../source/icon_shortframe@2x.png'),
    icon_slide: require('../../source/icon_slide@2x.png'),
    icon_slide_down: require('../../source/icon_Slidedownward@2x.png'),
    icon_spot: require('../../source/icon_spot@2x.png'),
    icon_spotl: require('../../source/icon_spotl@2x.png'),
    icon_time: require('../../source/icon_time@2x.png'),
    icon_trophy: require('../../source/icon_trophy@2x.png'),
    img_head: require('../../source/img_headportrait@2x.png'),
    tab_search: require('../../source/tab_search@2x.png'),
    load_gif: require('../../source/Load2.gif'),
    tickit: require('../../source/tickit.gif'),
    home_competition: require('../../source/home/home_competition@2x.png'),
    home_def_harid: require('../../source/home/home_def_harid@2x.png'),
    home_follow: require('../../source/home/home_follow@2x.png'),
    home_gold: require('../../source/home/home_gold@2x.png'),
    home_gray: require('../../source/home/home_gray@2x.png'),
    home_highlights: require('../../source/home/home_highlights@2x.png'),
    home_left_click: require('../../source/home/home_left_click@2x.png'),
    home_match: require('../../source/home/home_match@2x.png'),
    home_more_one: require('../../source/home/home_more_one@2x.png'),
    home_more: require('../../source/home/home_side@3x.png'),
    home_notification: require('../../source/home/home_remind@3x.png'),
    home_open: require('../../source/home/home_open@2x.png'),
    home_over_one: require('../../source/home/home_over_one@2x.png'),
    home_over: require('../../source/home/home_over@2x.png'),
    home_poker: require('../../source/home/home_poker@2x.png'),
    home_prize: require('../../source/home/home_prize@2x.png'),
    home_right_click: require('../../source/home/home_right_click@2x.png'),
    home_spot: require('../../source/home/home_spot@2x.png'),
    home_typeface: require('../../source/home/home_typeface@2x.png'),
    home_bg: require('../../source/home/home_bg_image@2x.png'),
    home_bg_races: require('../../source/home/home_bg_race.png'),
    home_sort: require('../../source/home/home_sort.gif'),
    home_ticket: require('../../source/home/home_tickit.gif'),
    home_video: require('../../source/home/home_video.gif'),
    home_new: require('../../source/home/home_new.gif'),
    home_unstart: require('../../source/home/home_races_unstart@2x.png'),
    home_no: require('../../source/home/home_no@3x.png'),
    home_fail: require('../../source/home/home_fail@3x.png'),
    home_ordered: require('../../source/home/home_ordered.png'),
    home_avatar: require('../../source/home/home_avatar.png'),
    sign_bg: require('../../source/login/sign_bg_image@3x.png'),
    sign_choice_no: require('../../source/login/sign_choice_no@3x.png'),
    sign_choice: require('../../source/login/sign_choice@3x.png'),
    sign_close: require('../../source/login/sign_close@3x.png'),
    sign_close_gray: require('../../source/login/sign_close_one@3x.png'),
    sign_eye_open: require('../../source/login/sign_eye_open@3x.png'),
    sign_eye: require('../../source/login/sign_eye@3x.png'),
    sign_logo_poker: require('../../source/login/sign_logo_poker.png'),
    sign_number: require('../../source/login/sign_number@3x.png'),
    sign_password: require('../../source/login/sign_password@3x.png'),
    sign_return: require('../../source/login/sign_retrun@3x.png'),
    match_ticket: require('../../source/races/macth_ticket@3x.png'),
    match_service: require('../../source/races/match_service@3x.png'),
    match_share: require('../../source/races/match_share@3x.png'),
    match_prize: require('../../source/races/match_prize@3x.png'),
    match_point: require('../../source/races/match_point.png'),
    slide_edit: require('../../source/slide/sidebar_modify@3x.png'),
    slide_order: require('../../source/slide/sidebar_order@3x.png'),
    slide_service: require('../../source/slide/sidebar_service@3x.png'),
    slide_setting: require('../../source/slide/sidebar_set-up@3x.png'),
    ticket_arrow: require('../../source/buy/ticket_arrow@3x.png'),
    ticket_check: require('../../source/buy/ticket_check@3x.png'),
    ticket_check2: require('../../source/buy/ticket_check2@3x.png'),
    ticket_edit: require('../../source/buy/ticket_edit@3x.png'),
    ticket_prompt: require('../../source/buy/ticket_prompt@3x.png'),
    ticket_security: require('../../source/buy/ticket_security@3x.png'),
    ticket_security2: require('../../source/buy/ticket_securitys@3x.png'),
    prompt_service: require('../../source/buy/prompt_service@3x.png'),
    e_ticket_buy: require('../../source/buy/e_ticket_buy.png'),
    entity_ticket_buy: require('../../source/buy/entity_tickey_buy.png'),
    name_id: require('../../source/buy/name_id@3x.png'),
    name_passport: require('../../source/buy/name_passport@3x.png'),
    set_closed: require('../../source/setting/set_closed@3x.png'),
    set_exclamation: require('../../source/setting/set_exclamation@3x.png'),
    set_eye_close: require('../../source/setting/set_eye_close@3x.png'),
    set_eye: require('../../source/setting/set_eye@3x.png'),
    set_fork: require('../../source/setting/set_fork@3x.png'),
    set_fork2: require('../../source/setting/set_fork2@3x.png'),
    set_more: require('../../source/setting/set_more@3x.png'),
    set_open: require('../../source/setting/set_open@3x.png'),
    load_no_data: require('../../source/load/load_no_data@3x.png'),
    load_refresh: require('../../source/load/load_refresh@3x.png'),
    load_wifi: require('../../source/load/load_wifi@3x.png'),
    races_bg: require('../../source/races/races_bg.png'),
    user_real_failed: require('../../source/order/user_real_failed.png'),
    user_real_pending: require('../../source/order/user_real_pending.png'),
    schedule: require('../../source/races/schedule@3x.png'),
    search: require('../../source/races/search@3x.png'),
    prev: require('../../source/races/prev@3x.png'),
    search_gray: require('../../source/races/search_gray@3x.png'),
    back: require('../../source/races/back@3x.png'),
    slid_business: require('../../source/slide/slid_business@3x.png'),
    set_poker: require('../../source/setting/set_poker.png'),
    race_location: require('../../source/races/race_location.png'),
    race_time: require('../../source/races/race_time.png'),
    race_triangle: require('../../source/races/triangle.png'),
    news_outline: require('../../source/news/outline.png'),
    news_triangle: require('../../source/news/triangle.png'),
    empty_image: require('../../source/empty/empty_ticket.png'),
    news_share: require('../../source/news/news_share.png'),
    race_type: require('../../source/races/race_type.png'),
    race_type_selected: require('../../source/races/race_type_selected.png'),
    race_type_unselect: require('../../source/races/race_type_unselect.png'),
    load_error: require('../../source/load/load_error.png'),
    set_back: require('../../source/setting/set_back.png'),
    home_badge: require('../../source/home/home_badge.png'),
    dark_back: require('../../source/home/dark_back.png'),
    up_triangle: require('../../source/order/up_triangle.png'),
    down_triangle: require('../../source/order/down_triangle.png'),
    ic_back: require('../../source/order/ic_back.png'),
    side_select: require('../../source/order/side_select.png'),
    side_selected: require('../../source/order/side_seleced.png'),
    empty_ticket: require('../../source/empty/empty_ticket.png'),
    home_img: require('../../source/home/home_img.png'),
    home_fire: require('../../source/home/home_fire.png'),
    more: require('../../source/home/more.png'),
    home_news: require('../../source/home/home_news.png'),
    home_sort1: require('../../source/home/home_sort1.png'),
    home_ticket1: require('../../source/home/home_ticket.png'),
    home_video1: require('../../source/home/home_video1.png'),
    item_sale: require('../../source/home/item_sale.png'),
    home_clock: require('../../source/home/home_clock.png'),
    home_adr: require('../../source/home/home_adr.png'),
    race_doing: require('../../source/home/race_doing.png'),
    race_end: require('../../source/home/race_end.png'),
    race_unstart: require('../../source/home/race_unstart.png'),
    race_wait: require('../../source/home/race_wait.png'),
    home_head: require('../../source/home/home_head.png'),
    edit: require('../../source/buy/edit@2x.png'),
    handle: require('../../source/buy/handle@2x.png'),
    handle2: require('../../source/buy/handle2@2x.png'),
    adr_right: require('../../source/buy/adr_right.png'),
    adr_select: require('../../source/buy/adr_select.png'),
    adr_selected: require('../../source/buy/adr_selected.png'),
    video_play: require('../../source/news/video_play.png'),
    post_id_image: require('../../source/buy/postIDImage.png'),
    mask: require('../../source/Mask@2x.png'),
    shape: require('../../source/rank/Shape@2x.png'),
    web_left: require('../../source/news/web_left.png'),
    web_page: require('../../source/news/web_page.png'),
    web_right: require('../../source/news/web_right.png'),
    web_refresh: require('../../source/news/web_refresh.png')


};

export default images

