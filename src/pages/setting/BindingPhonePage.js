/**
 * Created by lorne on 2017/5/10.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, SetInputView, BtnLong} from '../../components';
import {CountDownText} from '../../components/countdown/CountDownText';
import {checkPhone, strNotNull, showToast, putLoginUser,checkPhone2} from '../../utils/ComonHelper';
import {POST_BIND_ACCOUNT, POST_VERIFY_CODE, POST_V_CODE} from '../../actions/ActionTypes';
import {fetchBindAccount, fetchPostVCode, fetchPostVerifyCode} from '../../actions/AccountAction';
import StorageKey from '../../configs/StorageKey';
import ExtArea from '../comm/ExtArea';

class BindingPhonePage extends Component {


    constructor(props) {
        super(props);
        this.phone = '';
        this.code = '';
        this.ext=''
    }


    state = {
        codeDisable: false,
    };

    componentWillReceiveProps(newProps) {
        const {loading, actionType, hasData} = newProps;
        if (actionType === POST_BIND_ACCOUNT && hasData) {
            showToast(`${I18n.t('phoneBang')}`);
            login_user.mobile = this.phone;
            storage.save({
                key: StorageKey.LoginUser,
                rawData: login_user
            });
            putLoginUser(login_user);
            router.popToTop();
        } else if (actionType === POST_VERIFY_CODE && hasData) {

            const body = {
                type: 'mobile',
                account: this.phone,
                code: this.code,
                ext:this.ext
            };
            this.props._postBindAccount(body);
        } else if (actionType === POST_V_CODE && hasData) {
            this.setState({
                codeDisable: !this.state.codeDisable
            });
            this.countDownText.start();
        }
    };
    changed_ext = (code) => {
        this.setState({
            ext: code
        })
    }

    render() {

        const {ext} = this.state;
        return (<View
            testID="page_bind"
            style={ApplicationStyles.bg_black}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors._E54}}
                router={router}
                title={`${I18n.t('phone')}`}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            {/*区号选择*/}
            <TouchableOpacity style={styles.areaView} onPress={() => {
                this.areaAction && this.areaAction.toggle();
            }}>
                <TextInput
                    autoFocus={false}
                    editable={false}
                    placeholderTextColor={Colors._BBBB}
                    underlineColorAndroid='transparent'
                    testID="ext"
                    placeholder={!strNotNull(ext) ? '选择地区' : ext}
                    value={ext}/>
                <View style={{flex: 1}}/>

                <Image style={{width: 16, height: 12}} source={Images.bottomarea}/>
            </TouchableOpacity>

            {this._inputPhoneCode()}

            <Text style={styles.txtPrompt}>{I18n.t('reset')}</Text>

            <BtnLong
                name={I18n.t('bang')}
                onPress={this._btnBind}
                testID="btn_bind"
                textStyle={styles.txtBind}
                style={styles.btnBind}/>
            <ExtArea
                ref={ref => this.areaAction = ref}
                changed_ext={this.changed_ext}/>

        </View>)
    }


    _inputPhoneCode = () => {
        const {codeDisable} = this.state;
        return (<View style={styles.inputBg}>
            <SetInputView
                textChange={text => {
                    this.phone = text
                }}
                placeholder={I18n.t('please_input_phone')}
                inputTestID="input_phone"
                clearTestID="btn_phone_clear"/>
            <View style={styles.line}/>
            <View style={styles.codeView}>
                <View style={{flex: 1}}>
                    <SetInputView
                        textChange={text => {
                            this.code = text
                        }}
                        placeholder={I18n.t('please_input_code')}
                        inputTestID="input_code"
                        clearTestID="btn_code_clear"/>
                </View>


                <TouchableOpacity
                    testID="btn_get_code"
                    disabled={codeDisable}
                    activeOpacity={1}
                    onPress={this._countBtn}
                    style={[styles.codeBtn, {
                        backgroundColor:
                            codeDisable ? '#444444' : '#666666'
                    }]}>
                    <CountDownText style={styles.codeText}
                                   countType='seconds' // 计时类型：seconds / date
                                   afterEnd={this._afterEnd} // 结束回调
                                   auto={false} // 自动开始
                                   timeLeft={60} // 正向计时 时间起点为0秒
                                   step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
                                   startText={I18n.t('get_vcode')} // 开始的文本
                                   endText={I18n.t('get_vcode')} // 结束的文本
                                   ref={ref => this.countDownText = ref}
                                   intervalText={(sec) => sec + 's'} // 定时的文本回调
                    />
                </TouchableOpacity>

            </View>

        </View>)
    };

    _afterEnd = () => {
        this.setState({
            codeDisable: false
        });
    };
    _countBtn = () => {
        if (checkPhone2(this.phone,this.ext) && strNotNull(this.ext)) {


            const body = {
                option_type: 'bind_account',
                vcode_type: 'mobile',
                mobile: this.phone,
                ext:this.ext
            };

            this.props._postVCode(body);
        }
    };

    _btnBind = () => {
        if (checkPhone2(this.phone,ext) && strNotNull(this.code) && strNotNull(this.ext)) {

            const body = {
                option_type: 'bind_account',
                vcode_type: 'mobile',
                account: this.phone,
                vcode: this.code,
                ext:this.ext
            };
            this.props._postVerifyCode(body);


        }

    }
}


const bindAction = dispatch => ({
    _postBindAccount: (body) => dispatch(fetchBindAccount(body)),
    _postVerifyCode: (body) => dispatch(fetchPostVerifyCode(body)),
    _postVCode: (body) => dispatch(fetchPostVCode(body))
});

const mapStateToProps = state => ({
    loading: state.AccountState.loading,
    error: state.AccountState.error,
    hasData: state.AccountState.hasData,
    actionType: state.AccountState.actionType
});

export default connect(mapStateToProps, bindAction)(BindingPhonePage);


const styles = StyleSheet.create({
    areaView: {
        marginTop: 7,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 17,
        paddingRight: 17,
        backgroundColor: 'white',
        flexDirection: 'row', alignItems: 'center'
    },
    line: {
        height: 1,
        marginLeft: 17,
        backgroundColor: '#0E0E0F'
    },
    inputBg: {
        backgroundColor: Colors.setting,
        marginTop: 10
    },
    codeView: {
        height: 50,
        flexDirection: 'row'
    },
    codeBtn: {
        width: 115,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',

    },
    codeText: {
        color: '#DDDDDD',
        fontSize: 15
    },
    txtPrompt: {
        color: Colors.txt_666,
        fontSize: 13,
        marginTop: 15,
        alignSelf: 'center'
    },
    btnBind: {
        height: 45,
        marginRight: 20,
        marginLeft: 20,
        backgroundColor: '#E0BB75',
        marginTop: 48,
        justifyContent: 'center',
        borderRadius: 4
    },
    txtBind: {
        fontSize: 19,
        color: Colors._161817
    }

});