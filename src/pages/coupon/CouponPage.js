//退换货申请页面
import React, {Component} from 'react';
import {View, FlatList, ScrollView, Text, Image, TouchableOpacity, ImageBackground, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, BaseComponent} from '../../components';
import ImageLoad from "../../components/ImageLoad";
import styles from './couponStyle'
import {getPersonCoupons} from "../../services/MacauDao";

export default class CouponPage extends Component {

    state={
        person_coupons: []
    };

    componentDidMount(){
        getPersonCoupons({}, data => {
            console.log("person_personCoupons:", data);
            this.setState({
                person_coupons: data.items
            })
        },err => {

        })
    }

    _separator=()=>{
        return(
            <View style={{backgroundColor:"#F3F3F3",height:5,width:'100%'}}/>
        )
    };

    _renderItem=({item,index})=>{
        const {begin_date,coupon_type,cover_link,end_date,name,short_desc} = item;
        return(
            <ImageBackground
                key = {index}
                style={styles.sameView}
                source={Images.coupon.background}>
                <View style={styles.itemView}>
                    <View  style={[styles.itemLeft]}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{color:"#F34247",fontSize:18}}>¥<Text style={{fontSize:50,fontWeight:'bold'}}>50</Text></Text>
                            <View style={{width:150}}>
                                <Text style={{color:"#444444",fontSize:20,marginLeft:16}} >{name}</Text>
                            </View>

                        </View>
                        <Text style={[styles.txt1,{marginTop:10}]}>{short_desc}</Text>
                        <Text style={[styles.txt1,{marginTop:1}]}>{`有限期：${begin_date}至${end_date}`}</Text>

                    </View>
                    <View style={{flex:1}}/>
                    <View  style={[styles.itemLeft,{alignItems:'center'}]}>
                        <Text  style={{color:"#666666",fontSize:16}}>剩30日</Text>
                        <TouchableOpacity style={styles.touchView}
                        onPress={()=>{
                            router.pop();
                            global.router.toSelectTimePage();
                        }}>
                            <Text style={{color:"#FFFFFF",fontSize:14}}>去使用</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    };

    render(){
        const {person_coupons} = this.state;
        return(
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    titleStyle={{fontSize: 17, color: Colors.white}}
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title={'优惠券'}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        router.pop()
                    }}
                />

                <ScrollView >
                    <FlatList
                        style={{marginTop:15,marginLeft:17,marginRight:17}}
                        data={person_coupons}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        keyExtractor={(index)=>`coupon${index}`}
                    />
                    <View style={{height:80}}/>
                </ScrollView>

            </View>
        )
    }
}
