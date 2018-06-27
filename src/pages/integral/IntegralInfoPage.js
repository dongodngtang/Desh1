import React, {Component} from 'react';
import {
    FlatList, ScrollView,
    StyleSheet, Text,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {utcDate, isEmptyObject} from "../../utils/ComonHelper";
import {NavigationBar,BaseComponent} from '../../components';
import styles from './IntegralStyle';


export default class IntegralInfoPage extends Component {

    render(){
        const {coupon_type,name,integrals,short_desc,stock} = this.props.params.item;
        return(
            <BaseComponent style={{flex:1,backgroundColor:"#F3F3F3"}}
                           ref={ref => this.contain = ref}>
                <NavigationBar
                    refreshPage={this.refreshPage}
                    toolbarStyle={{backgroundColor: Colors._FFF}}
                    title={'积分详情'}
                    titleStyle={{color: Colors.txt_444,fontSize:18}}
                    leftBtnIcon={Images.coupon.return_hei}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <ScrollView style={{flexDirection:'column'}}>

                    <View style={[styles.infoPage,{marginTop:1,paddingBottom:15}]}>
                        <Image  style={{alignSelf: 'center',marginTop:28}} source={Images.integral.coupon}/>
                        <Text style={[styles.marginS,styles.TXt,{marginTop:21,fontWeight:'bold'}]}>{name}</Text>
                        <View style={[styles.marginS,{marginTop:5,flexDirection:'row'}]}>
                            <Text style={styles.TXt3}>{integrals}<Text style={styles.TXt4}>积分</Text></Text>
                            <View style={{flex:1}}/>
                            <Text style={styles.TXt2}>剩余{stock}件</Text>
                        </View>
                    </View>
                    <View style={{marginTop:18,marginLeft:17,marginRight:17,flexDirection:'column'}}>
                        <Text style={{color:'#444444',fontSize:18,fontWeight:'bold'}}>商品详情</Text>
                        <Text style={[styles.Txt5,{marginTop:9}]}>优惠面值：100元</Text>
                        <Text style={styles.Txt5}>可使用于酒店预订付费减免</Text>
                        <Text style={styles.Txt5}>使用条件：单笔酒店预订金额满900元</Text>
                        <Text style={styles.Txt5}>有效期：30天</Text>

                        <Text style={[styles.TXt4,{marginTop:13,fontWeight:'bold'}]}>兑换流程</Text>
                        <Text style={[styles.Txt5,{marginTop:8}]}>1、点击「立即兑换」，抵扣券即时发放至兑换用户</Text>
                        <Text style={styles.Txt5}> 2、优惠券信息可在「个人中心」-我的优惠中查看</Text>

                        <Text style={[styles.TXt4,{marginTop:14,fontWeight:'bold'}]}>兑换流程</Text>
                        <Text style={[styles.Txt5,{marginTop:9}]}>1、此优惠券仅限兑换用户使用，兑换后积分不予退还 </Text>
                        <Text style={styles.Txt5}>2、如有疑问请联系客服0755-23919844</Text>

                    </View>
                    <View style={{height:50}}/>

                </ScrollView>
                <TouchableOpacity style={styles.infoBottom}
                onPress={()=>{
                    this.contain && this.contain.close();
                    global.router.pop();
                    global.router.pop();
                    global.router.pop();
                    global.router.toSelectTimePage();
                }}>
                    <Text style={{color:"#FFFFFF",fontSize:18}}>立即兑换</Text>
                </TouchableOpacity>
            </BaseComponent>
        )
    }
}