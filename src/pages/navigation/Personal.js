import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet, Platform,
    Text, Image,
    View, Animated, findNodeHandle, Linking
} from 'react-native';
import {Images, Colors, Metrics} from '../../Themes';
import {strNotNull, isEmptyObject, getLoginUser, getUserData, getDispatchAction} from '../../utils/ComonHelper';
import {umengEvent} from '../../utils/UmengEvent';
import I18n from 'react-native-i18n';
import JpushHelp from '../../services/JpushHelper';
import {connect} from 'react-redux';
import {FETCH_SUCCESS, GET_PROFILE, GET_UNREAND_MSG} from '../../actions/ActionTypes';


class Personal extends Component {

    state = {
        viewRef: 0
    };


    componentWillReceiveProps(newProps) {
        if (newProps.actionType === GET_PROFILE && newProps.hasData
            && isEmptyObject(newProps.unread)) {
            this._unReadMsg()
        }

        if (newProps.actionType1 === 'SWITCH_LANGUAGE') {
            this.forceUpdate()
        }
    }

    _unReadMsg = () => {
        if (!isEmptyObject(global.login_user))
            getDispatchAction()[GET_UNREAND_MSG]()
    };


    render() {

        return (
            <View>
                {this.readerMe()}

                {this.renderItem()}
            </View>
        )
    }


    renderItem = () => {
        return <View>

            {this._item(stylesP.item_view, Images.person_dynamic, stylesP.img_dy,
                I18n.t('person_dynamic'), () => {
                    if (isEmptyObject(login_user)) {
                        router.toLoginFirstPage()
                    } else {
                        router.toPersonDynamic()
                    }

                })}

            <View style={{height: 3, width: '100%'}}/>
            {this._item(stylesP.item_view, Images.crowd, stylesP.img_dy,
                '赞助记录', () => {
                    global.router.toPokerB()

                })}

            <View style={{height: 1, width: '100%'}}/>

            {this._item(stylesP.item_view, Images.business, {width: 21, height: 22, marginLeft: 20},
                I18n.t('business_cooperation'), () => {
                    umengEvent('more_business');
                    router.toBusinessPage()

                })}
            <View style={{height: 1, width: '100%'}}/>
            {this._item(stylesP.item_view, Images.settings, {width: 23, height: 23, marginLeft: 20},
                I18n.t('setting'), () => {
                    router.toSettingPage()

                })}


            <TouchableOpacity style={[stylesP.personalView, {marginTop: 20}]} onPress={() => {
                Linking.openURL('tel:0755-23919844');

            }}>
                <View style={stylesP.personalView2}>
                    <Image style={{width: 21, height: 22, marginLeft: 20}} source={Images.customer_service_tel}/>
                    <Text style={stylesP.personalText}>{I18n.t('customer_service_tel')}：0755-23919844</Text>
                </View>
            </TouchableOpacity>
        </View>
    };


    _item = (itemStyle, img, imgStyle, title, onPress) => {
        return <TouchableOpacity style={itemStyle} onPress={onPress}>
            <Image style={imgStyle} source={img}/>
            <Text style={stylesP.personalText}>{title}</Text>
            <View style={{flex: 1}}/>

            <Image style={stylesP.personalImg} source={Images.is}/>
        </TouchableOpacity>
    };


    _avatar = () => {
        const {profile} = this.props;
        if (isEmptyObject(profile))
            return Images.home_avatar;
        else if (strNotNull(profile.avatar))
            return {uri: profile.avatar}
        else
            return Images.home_avatar;
    };

    _signature = () => {
        const {profile} = this.props;
        if (profile.signature && strNotNull(profile.signature))
            return profile.signature;
        else
            return I18n.t('ple_sign')
    };


    readerMe = () => {
        const {profile} = this.props;
        return <View style={{marginBottom: 10}}>
            <View style={stylesP.meView}>


                <View style={{
                    height: Metrics.navBarHeight,
                    width: '100%',
                    paddingTop: Metrics.statusBarHeight,
                    flexDirection: 'row-reverse'
                }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 44
                        }}
                        onPress={this.toMessagePage}>
                        <Image
                            source={this._imgNotice()}
                            style={{
                                height: 22,
                                width: 21,
                                marginRight: 20
                            }}/>

                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                                  onPress={() => {
                                      if (!isEmptyObject(login_user))
                                          router.toPersonPage();
                                      else
                                          router.toLoginFirstPage()

                                  }}>
                    <View
                        style={stylesP.personRadius2}>
                        <Image style={{width: 72, height: 72, borderRadius: 36}} source={this._avatar()}/>
                    </View>

                    <View style={{marginLeft: 20}}>

                        <Text
                            style={stylesP.personSignature2}>{profile.nick_name ? profile.nick_name : I18n.t('log_register')}</Text>
                        <Text style={stylesP.personSignature}>{this._signature()}</Text>


                    </View>
                    <View style={{flex: 1}}/>
                    <Image style={{marginRight: 17, width: 8, height: 15}} source={Images.rightImg}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => global.router.toPokerB()}
                    style={{alignItems: 'center', marginTop: 20, marginBottom: 17}}>
                    <Text style={{fontSize: 24, color: Colors._FFE}}>24232.23</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                        <Image style={{height: 18, width: 18}} source={Images.poker_b}/>
                        <Text style={{fontSize: 14, color: Colors._FFE, marginLeft: 3}}>扑客币</Text>
                    </View>

                </TouchableOpacity>

            </View>

            <View style={stylesP.orderView}>
                <TouchableOpacity
                    onPress={() => {
                        umengEvent('more_order');
                        if (strNotNull(getLoginUser().user_id))
                            global.router.toOrderListPage();
                        else
                            global.router.toLoginFirstPage()
                    }}
                    style={stylesP.btnOrder}>
                    <Image style={stylesP.imgOrder1}
                           source={Images.ticket_order}/>
                    <Text style={stylesP.txtProfile1}>{I18n.t('ticket_order')}</Text>
                </TouchableOpacity>
                <View style={{width: 1, backgroundColor: Colors._ECE, marginBottom: 5, marginTop: 5}}/>
                <TouchableOpacity style={stylesP.btnOrder}
                                  onPress={() => {
                                      if (strNotNull(getLoginUser().user_id))
                                          global.router.toMallOrderPage();
                                      else
                                          global.router.toLoginFirstPage();
                                  }}>
                    <Image style={stylesP.imgOrder2}
                           source={Images.mall_order}/>
                    <Text style={stylesP.txtProfile1}>{I18n.t('mall_order')}</Text>
                </TouchableOpacity>

            </View>
        </View>


    };


    toMessagePage = () => {
        umengEvent('home_notification');
        if (isEmptyObject(login_user)) {
            router.toLoginFirstPage()
        } else {

            JpushHelp.iosSetBadge(0);
            router.toMessageCenter()
        }

    };

    _imgNotice = () => {
        if (!isEmptyObject(this.props.unread)) {
            return this.props.unread.unread_count > 0 ? Images.search_notice2 : Images.search_notice;
        } else
            return Images.search_notice;
    }

}

const stylesP = StyleSheet.create({
    img_dy: {
        width: 23,
        height: 22,
        marginLeft: 20
    },
    item_view: {
        backgroundColor: 'white',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',

    },
    blurImg: {
        height: 260,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    blur: {
        height: 260,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
    },
    personalView: {
        backgroundColor: '#ffffff'
    },
    personalView2: {
        width: Metrics.screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 13,
        marginBottom: 13,
    },
    personalViewBusiness: {
        flexDirection: 'row',
    },
    personalView2Img: {
        width: 18,
        height: 22,
        marginLeft: 20
    },
    personalText: {
        fontSize: 16,
        color: '#444444',
        marginLeft: 30
    },
    personalImg: {
        width: 8,
        height: 15,
        marginRight: 18
    },

    personRadius: {
        width: 88,
        height: 88,
        borderRadius: 44,
        marginTop: 30,
        backgroundColor: 'rgba(0,0,0,0.23)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    personRadius2: {
        width: 74,
        height: 74,
        borderRadius: 37,
        backgroundColor: '#FFE9AD',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25
    },
    personID: {
        fontSize: 12,
        color: '#eeeeee',
        marginBottom: 12,
        marginTop: 8,
        backgroundColor: 'transparent'
    },
    personSignature: {
        fontSize: 13,
        color: Colors._888,
        marginTop: 8,
        backgroundColor: 'transparent'
    },
    personSignature2: {
        fontSize: 17,
        color: Colors._CCC,
        fontWeight: 'bold',
        marginTop: 8,
        backgroundColor: 'transparent'
    },
    textLine: {
        height: 1,
        width: 67,
        backgroundColor: '#ffffff',

    },
    msgImg: {
        height: 22,
        width: 21,
        marginLeft: 20
    },
    meView: {
        backgroundColor: '#090909',
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderView: {flexDirection: 'row', height: 82, width: '100%', backgroundColor: 'white'},
    btnOrder: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    imgOrder1: {height: 25, width: 25},
    imgOrder2: {height: 27, width: 30},
    txtProfile1: {
        fontSize: 14,
        color: Colors.txt_444,
        marginTop: 8
    },
    personDynamic: {
        width: Metrics.screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 13,
        marginBottom: 13,
    }


});

const bindAction = dispatch => ({});

const mapStateToProps = state => ({
    loading: state.PersonState.loading,
    profile: state.PersonState.profile,
    error: state.PersonState.error,
    hasData: state.PersonState.hasData,
    actionType: state.PersonState.actionType,
    unread: state.AccountState.unread,
    actionType1: state.AccountState.actionType,

});

export default connect(mapStateToProps, bindAction)(Personal);
