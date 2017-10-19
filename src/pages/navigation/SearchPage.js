import React, {Component} from 'react';
import {
    View, ScrollView, Platform, StyleSheet, Image, TextInput,
    Text, Alert, TouchableOpacity
}
    from 'react-native';
import {Images, Metrics, Colors} from '../../Themes';
import I18n from 'react-native-i18n';
import {umengEvent} from '../../utils/UmengEvent';
import {isEmptyObject, getDispatchAction} from '../../utils/ComonHelper';
import JpushHelp from '../../services/JpushHelper';
import {setLocalLanguage} from '../../services/ConfigDao';

export class SearchPage extends Component {
    state = {
        bgColor: 'transparent',
        headlines: [],
        next_id: '0',
        keyword: '',
        opacity: 0,
        badge: false
    };


    onScroll = (event) => {
        const offsetHeight = 200;

        let offsetY = event.nativeEvent.contentOffset.y;

        if (offsetY <= offsetHeight) {
            let opacity = offsetY / offsetHeight;
            this.setState({opacity: opacity});
        } else {
            this.setState({opacity: 1});
        }
    };

    _search = () => {
        return (
            <TouchableOpacity style={styleR.searchBar}
                              onPress={() => global.router.toSearchKeywordPage(this.props)}>

                <Image style={styleR.imgSearch}
                       source={Images.search_gray}/>
                <Text
                    style={styleR.inputSearch}
                    onPress={() => global.router.toSearchKeywordPage(this.props)}>
                    {I18n.t('serachMore')}
                </Text>

            </TouchableOpacity>
        )
    };
    toMessagePage = () => {

        umengEvent('home_notification');
        if (isEmptyObject(login_user)) {
            router.toLoginFirstPage()
        } else {
            this.setState({
                badge: false
            });
            JpushHelp.iosSetBadge(0);
            router.toMessageCenter()
        }

    };

    _switchLanguage = () => {
        Alert.alert(I18n.t('language_switch'), '', [
            {
                text: I18n.t('chinese'), onPress: () => {
                setLocalLanguage('zh');
                getDispatchAction()['SWITCH_LANGUAGE']()

            }
            },
            {
                text: I18n.t('english'), onPress: () => {
                setLocalLanguage('en');
                getDispatchAction()['SWITCH_LANGUAGE']()

            }
            }
        ]);
    };

    render() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    backgroundColor: 'rgba(0,0,0,' + this.state.opacity + ')',
                    paddingTop: Metrics.statusBarHeight
                }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                    width: Metrics.screenWidth
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this._switchLanguage()
                        }}>
                        <Text style={styleR.searchText}>{global.language === 'zh' ?
                            I18n.t('chinese') : I18n.t('english')}</Text>
                    </TouchableOpacity>


                    {this._search()}

                    <TouchableOpacity
                        testID="btn_bar_right"
                        onPress={this.toMessagePage}
                        activeOpacity={1}>
                        <Image style={styleR.imgSearch2}
                               source={this._imgNotice()}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    _imgNotice = () => {
        if (!isEmptyObject(this.props.unread)) {
            return this.props.unread.unread_count > 0 ? Images.search_notice2 : Images.search_notice;
        } else
            return Images.search_notice;
    }
}

const styleR = StyleSheet.create({
    searchText: {
        fontSize: 14,
        color: '#FFE9AD',
        marginLeft: 17,
        backgroundColor: 'transparent'
    },
    searchBar: {
        height: 28,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        opacity: 0.8,
        borderRadius: 3,
        marginLeft: 23,
        flex: 1
    },
    imgSearch: {
        height: 18,
        width: 18,
        marginRight: 11,
        marginLeft: 8
    },
    imgSearch2: {
        height: 22,
        width: 21,
        marginLeft: 22,
        marginRight: 22
    },
    inputSearch: {
        color: '#6A6B6B',
        fontSize: 15
    }
})