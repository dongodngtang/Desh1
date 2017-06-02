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
    empty_image: require('../../source/empty-image.png'),
    news_share: require('../../source/news/news_share.png'),
    race_type: require('../../source/races/race_type.png'),
    race_type_selected: require('../../source/races/race_type_selected.png'),
    race_type_unselect: require('../../source/races/race_type_unselect.png'),
    load_error: require('../../source/load/load_error.png'),
    set_back: require('../../source/setting/set_back.png'),
    home_badge: require('../../source/home/home_badge.png'),
    dark_back: require('../../source/home/dark_back.png')


}

export default images


const avatar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAIAAACyr5FlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUY2NzBEMDdENkU1MTFFNjk2MDQ5QzM1RjMzODg1NTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUY2NzBEMDhENkU1MTFFNjk2MDQ5QzM1RjMzODg1NTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRjY3MEQwNUQ2RTUxMUU2OTYwNDlDMzVGMzM4ODU1NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRjY3MEQwNkQ2RTUxMUU2OTYwNDlDMzVGMzM4ODU1NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhEuCZEAAAipSURBVHja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'