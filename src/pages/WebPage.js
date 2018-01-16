/**
 * Created by lorne on 2017/12/13
 * Function:
 * Desc:
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    WebView,
    View,
    Text,
    TextInput,
    Platform,
    TouchableOpacity
} from 'react-native';

import {NavigationBar} from '../components';
import {Colors, Fonts, Images, ApplicationStyles} from '../Themes';
import {getAccessToken, getDpLang} from '../services/RequestHelper';
import {strNotNull, isEmptyObject, shareHost} from "../utils/ComonHelper";
import {CommentBottom} from './comment';

class PostRoute {
    static NewsInfo = 'NewsInfo';
    static CommentList = 'comments';
    static RepliesComment = 'replies';
    static ADD_COMMENT = 'addComment';
    static ClickAvatar = 'ClickAvatar';
}


export default class WebPage extends Component {


    constructor(props) {
        super(props);

        const {url} = props.params;

        this.url = shareHost() + url + `/${getDpLang()}`;
        let webUrl = this.url + `?accessToken=${getAccessToken()}&user_id=${global.login_user.user_id}`;

        this.state = {
            url: webUrl,
            canGoBack: false,
            title: 'PokerPro',
            news_info: {},
            nativeData: ''
        };
        this.webMsg = '';

    }

    onBackPress = () => {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            global.router.pop();
        }
    };

    onNavigationStateChange(navState) {
        console.log('onNavigationStateChange', navState);
        this.setState({
            canGoBack: navState.canGoBack,
            title: Platform.OS === 'ios' ? navState.title : 'PokerPro'
        });

    }

    sendMessage = (msg) => {
        this.webView && this.webView.postMessage(JSON.stringify(msg));
    };

    handleMessage = (e) => {
        try {
            let msg = e.nativeEvent.data;
            if (this.webMsg !== msg) {
                this.webMsg = msg;

                //去重
                let webParam = JSON.parse(msg.substring(6));
                console.log('来自Web数据', webParam);
                const {route, param} = webParam;
                if (strNotNull(route)) {
                    switch (route) {
                        case PostRoute.CommentList:
                            global.router.toCommentInfoPage(param);
                            break;
                        case PostRoute.RepliesComment:
                            this.commentNav && this.commentNav.repliesBtn(param, CommentBottom.replies);
                            break;
                        case PostRoute.ADD_COMMENT:
                            this.commentNav && this.commentNav.commentTotal(param);
                            break;
                        case PostRoute.NewsInfo:
                            if (this.commentNav) {
                                this.commentNav.userLike(param.current_user_like);
                                this.commentNav.setNewsInfo(param);
                            }

                            break;
                        case PostRoute.ClickAvatar:

                            global.router.toPersonDynamic(param);
                            break;
                    }
                }
            }
        } catch (e) {
            throw Error(e)
        }


    };

    render() {
        const {nativeData, url} = this.state;
        return (
            <View style={styles.container}>

                {this.props.hideNav || <NavigationBar
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    toolbarStyle={{backgroundColor: '#090909'}}
                    leftBtnPress={this.onBackPress}
                    title={this.state.title}
                />}


                <WebView
                    ref={ref => this.webView = ref}
                    startInLoadingState={true}
                    renderError={this._renderError}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
                    source={{uri: url}}
                    mixedContentMode={'always'}
                    domStorageEnabled={false}
                    scalesPageToFit={true}
                    dataDetectorTypes={'none'}
                    onMessage={this.handleMessage}/>

                <View style={styles.bottom}>
                    {this._renderBottomNav()}
                </View>


            </View>
        );
    };

    webRefesh = () => {
        this.webView && this.webView.reload();
    };

    _renderBottomNav = () => {
        if (this.props.params.body) {
            const {bottomNav, info, topic_type} = this.props.params.body;

            if (strNotNull(bottomNav)) {
                switch (bottomNav) {
                    case 'commentNav':
                        return <CommentBottom
                            sendMessage={this.sendMessage}
                            ref={ref => this.commentNav = ref}
                            topic_type={topic_type}
                            info={info}
                            url={this.url}
                        />

                }
            }
        }

    };

    _renderError = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.webView.reload();
                }}
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text> 出错了, 重新刷新下吧～</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    listViewContainer: {
        flex: 1,
        backgroundColor: '#f3f3f4',
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
});