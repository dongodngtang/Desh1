/**
 * Created by lorne on 2017/12/19
 * Function:
 * Desc:
 */
import * as helper from './RequestHelper';
import Api from '../configs/ApiConfig';

/*某个回复下回复的接口*/
export function postRepliesReplies(body, resolve, reject) {
    helper.post(Api.replies_replies(body), body, ret => {
        resolve(ret.data)
    }, reject)
}

/*资讯视频回复列表的接口*/
export function getReplies(body, resolve, reject) {
    helper.get(Api.comment_replies(body), ret => {
        resolve(ret.data)
    }, reject)
}

/*评论下回复的接口*/
export function postRelaies(body, resolve, reject) {
    helper.post(Api.comment_replies(body), body, ret => {
        resolve(ret.data)
    }, reject)
}

/*资讯视频评论接口*/
export function postComment(body, resolve, reject) {
    helper.post(Api.topic_comments, body, ret => {
        resolve(ret.data)
    }, reject)
}