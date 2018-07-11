import React ,{Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, KeyboardAvoidingView, FlatList, Modal
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from '../../components/NavigationBar';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {CountDownText} from '../../components/countdown/CountDownText';
import {fetchPostVerifyCode, fetchPostVCode} from '../../actions/AccountAction';
import {checkPhone, strNotNull, showToast, checkMail} from '../../utils/ComonHelper';
import {POST_VERIFY_CODE, POST_V_CODE} from '../../actions/ActionTypes';
import {BtnLong, BtnSoild, InputView} from '../../components';
import {postVCode} from '../../services/AccountDao';
import * as Animatable from 'react-native-animatable';

const codes = [{id: 0, name: '大陆', code: '86'}, {id: 1, name: '香港', code: '852'}, {id: 2, name: '澳门', code: '853'}, {
    id: 3,
    name: '台湾',
    code: '886'
}];

export default class ExtArea extends Component {

    _separator = () => {
        return <View style={{width: '100%', height: 1, backgroundColor: '#F3F3F3'}}/>
    };

    _renderItem = ({item}) => {
        const {id, name, code} = item;
        return (
            <TouchableOpacity style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', height: 50}}
                              onPress={() => {
                                  this.props.changed_ext(code);
                                  this.props.changed_area()
                              }}>
                <Text style={{color: "#666666", fontSize: 14, marginLeft: 17}}>{name}</Text>
                <View style={{flex: 1}}/>
                <Text style={{color: "#666666", fontSize: 14, marginRight: 17}}>{code}</Text>
            </TouchableOpacity>
        )
    }

    render(){
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                onRequestClose={() => {

                }}
                visible={this.props.show_area}
                style={{flex:1}}
            >
                <View style={{marginTop: 110}}>
                    <FlatList
                        style={{}}
                        data={codes}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => `coupon${index}`}
                    />
                </View>
                {/*<TouchableOpacity style={{height:Metrics.screenHeight - 180}}*/}
                {/*onPress={()=>{*/}
                {/*this.setState({*/}
                {/*show_area:!this.state.show_area*/}
                {/*})*/}
                {/*}}>*/}

                {/*</TouchableOpacity>*/}
            </Modal>
        )
    }
}