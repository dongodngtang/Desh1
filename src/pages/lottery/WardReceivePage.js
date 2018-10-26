import React, {Component} from 'react';
import {
    AppRegistry, ScrollView,
    StyleSheet, Text,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {NavigationBar} from '../../components';
import {getActivities, getJmessageInfo} from "../../services/AccountDao";
import {isEmptyObject, showToast} from "../../utils/ComonHelper";
import I18n from "react-native-i18n";
import {visit_other} from "../../services/SocialDao";
import {UltimateListView} from "../../components";
import {LoadErrorView, NoDataView} from '../../components/load';

const rules = ['1.抽中后请尽快兑换，奖品将从抽中后当天算起，有效期为期1个月。',
    '2.请点击“右上角图标”联系客服，完善地址部分，避免耽误实体物件的寄件，周末以及节假日不发货',
    '3.现金奖可在钱包内查询金额，提现需要3个工作日，节假日顺延。',
    '4.餐券仅限凼仔威尼斯人美食广场，需直接到澳门旅行官方驻地领取。',
    '5.双人旅行套餐将随机抽选双人船票、双人澳门塔自助餐或双人星级酒店一份，兑奖时，请提前三天和客服预约（不能预约当天），按要求提供相关信息。',
    '6.中奖后，需完成客服提示的相应任务，即可完成整个兑奖过程。',
    '7.如有疑问其他，请自行联系客服咨询',
    '8.如发现存在任何作弊或者恶意刷奖行为，官方将有权取消该用户参与资格。',
    '9.本次活动最终解释权归"澳门旅行 APP"所有。']

export default class WardReceivePage extends Component {

    getImUser = () => {
        // this.loading && this.loading.open();

        const user_id = 'fd433a53b54c0a4f21a8c07e73f43a0c';
        ///获取私信用户的用户名
        visit_other({userId: user_id}, (user) => {

            // this.loading && this.loading.close();
            router.toMessageList({
                username: user.username,
                nickname: user.nickname,
                avatarThumbPath: user.avatar,
            });
        }, (error) => {
            showToast(I18n.t("error_alert"));
            this.loading && this.loading.close();
        });
    };

    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    refreshPage={this.refreshPage}
                    toolbarStyle={{backgroundColor: 'white'}}
                    title={'领取奖品'}
                    titleStyle={{fontSize: 18, color: '#444444'}}
                    leftBtnIcon={Images.coupon.return_hei}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        router.pop();
                    }}
                    rightBtnIcon={Images.lottery.cus_service}
                    rightImageStyle={{width: 26, height: 20, marginRight: 17}}
                    rightBtnPress={() => {
                        if (isEmptyObject(global.login_user))
                            global.router.toLoginFirstPage()
                        else {
                            if (isEmptyObject(global.imUser)) {
                                getJmessageInfo(() => {
                                    this.getImUser()
                                })
                            } else {
                                this.getImUser()
                            }
                        }
                    }}/>
                <ScrollView style={{paddingTop: 14, marginTop: 1, backgroundColor: 'white'}}>
                    <Text style={{color:'#444444',fontSize:18,marginTop:15,marginLeft:17,marginRight:17,marginBottom:10}}>活动规则</Text>
                    {rules.map((rule,index)=>{
                        return <Text style={{lineHeight:20,color:'#444444',fontSize:14,marginTop:3,marginLeft:17,marginRight:17}} key={index}>{rule}</Text>
                    })}
                </ScrollView>

            </View>
        )
    }
}