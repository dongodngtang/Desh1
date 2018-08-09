import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    ScrollView, InteractionManager,FlatList
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import RenderHtml from '../comm/RenderHtml';
import {getInfos} from '../../services/MacauDao'
import {isEmptyObject, strNotNull, uShareInfoItem} from "../../utils/ComonHelper";
import LoadingView from "../../components/load/LoadingView";
import styles from './fastStyles'

export default class RenderItem extends Component {

    render(){
       const {item} = this.props;
        return(
            <View style={{flexDirection:'row',paddingTop:20,paddingBottom:20,alignItems:'center'}}>
                <View style={{flexDirection:'column'}}>
                    <Text style={styles.txt2}>威尼斯人周边订餐（营业时间：09:00-24:00）</Text>
                    <Text selectable={true} style={[styles.txt1,{marginTop:6}]}>+853 8393 1120</Text>
                </View>
                <View style={{flex:1}}/>
                <TouchableOpacity onPress={()=>{

                }}>
                    <Image style={styles.img} source={Images.navigation2.hotline}/>
                </TouchableOpacity>
            </View>
        )
    }
}