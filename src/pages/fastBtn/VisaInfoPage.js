import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    ScrollView, InteractionManager, FlatList
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import RenderHtml from '../comm/RenderHtml';
import {convertDate, util, call} from '../../utils/ComonHelper';
import {getApiType} from "../../services/RequestHelper";

export default class VisaInfoPage extends Component {
    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    title={'签证'}
                    toolbarStyle={{
                        backgroundColor: Colors._E54
                    }}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                />
                <Text style={styles.txt1}>港澳通行证团队旅游L签续签办理</Text>
                <Text>合作商铺地址：珠海市香洲区拱北地下口岸广场t字通道
                </Text>
                <Text>营业时间：11:30 至20:30
                </Text>

                <TouchableOpacity onPress={() => {
                    let phone = "13169674979"
                    call(phone);
                }}>
                    <Text>请联系电话：+86-13169674979</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    if (getApiType() === 'test') {
                        global.router.toMallInfoPage({id: 9})
                    } else {
                        global.router.toMallInfoPage({id: 67})
                    }

                }}>
                    <Text>快签办理点击前往</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (getApiType() === 'test') {
                        global.router.toMallInfoPage({id: 10})
                    } else {
                        global.router.toMallInfoPage({id: 35})
                    }
                }}>
                    <Text>慢签办理点击前往</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    txt1: {
        color: '#444444',
        fontSize: 18,
        fontWeight: 'bold'
    }
})