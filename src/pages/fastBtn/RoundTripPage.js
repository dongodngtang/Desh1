import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    ScrollView, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import RenderHtml from '../comm/RenderHtml';
import {getInfos} from '../../services/MacauDao'
import {isEmptyObject, strNotNull, uShareInfoItem} from "../../utils/ComonHelper";
import LoadingView from "../../components/load/LoadingView";
import styles from './fastStyles'

export default class RoundTripPage extends Component {

    render(){
        return(
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    title={'邮轮往返'}
                    toolbarStyle={{
                        backgroundColor: Colors._E54
                    }}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                />

                <ScrollView style={{marginLeft:17,marginRight:17}}>
                    <Text style={[styles.txt1,{marginTop:28}]}>
                        微信搜索「<Text selectable={true} >招商蛇口邮轮母港</Text><Text>」</Text>
                    </Text>
                    <Text style={[styles.txt1,{marginTop:10}]}>点击关注</Text>
                </ScrollView>
            </View>
        )
    }
}