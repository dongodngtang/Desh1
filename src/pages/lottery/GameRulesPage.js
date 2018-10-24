import React, {Component} from 'react';
import {
    AppRegistry,ScrollView,
    StyleSheet,Text,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {NavigationBar} from '../../components';

const rules = ['1.新人首次登陆即可获得3次机会','2.每日登陆，获得2次机会','3.每日游戏分享，可获得1次机会',
'4.每成功邀请1位朋友，可获得1次抽奖机会，每日最多可额外增加5次抽奖机会 ','5.每200积分可购买1次机会',
    '6.如发现存在任何作弊或者恶意刷奖行为，官方将有权取消该用户参与资格。','7.本次活动最终解释权归"澳门旅行APP"所有。'];
const prompts = ['1.完成每日任务，最高每日可获得45积分','2.成功购买商城现金商品，可获得等额积分 ',
    '3.转盘小游戏还有赢取积分的机会哦～ '];

export default class IntegralPage extends Component {

    render(){
        return(
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    refreshPage={this.refreshPage}
                    toolbarStyle={{backgroundColor: 'white'}}
                    title={'活动规则'}
                    titleStyle={{fontSize: 18, color: '#444444'}}
                    leftBtnIcon={Images.coupon.return_hei}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        this.props.params.toggle()
                        router.pop();
                    }}/>

                <ScrollView style={styles.rulesView}>
                    <View style={styles.rules}>
                        <Text style={styles.txt1}>活动规则</Text>
                        {rules.map((item, index) => {
                            return <Text key={index} style={[styles.txt2,{marginTop:6}]}>{item}</Text>
                        })}

                        <Text style={[styles.txt1,{marginTop:17}]}>获得积分小提示</Text>
                        {prompts.map((item, index) => {
                            return <Text key={index} style={[styles.txt2,{marginTop:6}]}>{item}</Text>
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nav: {
        height: Metrics.navBarHeight,
        width: '100%',
        backgroundColor: Colors._E54,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight
    },
    cancel: {
        fontSize: 14,
        color: Colors.white
    },
    title: {
        fontSize: 18,
        color: Colors.white
    },
    btn_search: {
        width: 50,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rulesView:{
        backgroundColor:'#F2F2F2'
    },
    rules:{
        flex:1,
        paddingRight:15,
        paddingLeft:17,
        marginTop:21
    },
    txt1:{
        color:'#444444',
        fontSize:18,
        fontWeight:'bold'
    },
    txt2:{
        color:'#666666',
        fontSize:14,
        marginTop:12,
        lineHeight:20
    }
});