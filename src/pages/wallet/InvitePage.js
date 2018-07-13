import React, {PureComponent, Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground,FlatList, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import {LoadingView, NoDataView} from '../../components/load';
import {getExchange_traders} from '../../services/MacauDao';
import {isEmptyObject, mul, div, formatCurrency, strNotNull} from "../../utils/ComonHelper";
import ImageLoad from "../../components/ImageLoad";
import styles from './wallet.style';
import {invite_count} from "../../services/WallDao";

export default class InvitePage extends Component {

    state = {
        invites: [],
        invite_count:{}
    }

    componentDidMount() {
        invite_count(data => {
            console.log('总的邀请数和邀请奖励', data);

            this.setState({invite_count: data})
        })
    };


    _renderItem = ({item, index}) => {
        const {avatar, mobile, nick_name, signature, user_id} = item
        return (
            <TouchableOpacity style={styles.pageItem}
                              onPress={() => {
                                  global.router.toUserTopicPage(item)
                              }}>

                {this.show_index(index)}

                <ImageLoad style={styles.avatar}
                           source={{uri: avatar}}/>

                <View style={{width: '50%'}}>
                    <Text style={styles.txt_name}>{nick_name}</Text>
                    <Text style={[styles.txt_decs, {marginTop: 2}]}>{signature}</Text>
                </View>

                <View style={{flex: 1}}/>

                <Text style={styles.txt_decs}>他的邀请</Text>

                <Image style={styles.img_left}
                       source={Images.adr_right}/>

            </TouchableOpacity>
        )
    };


    render() {
        const {total_invite_number,total_invite_money} = this.state.invite_count
        return (
            <ScrollView style={ApplicationStyles.bgContainer}>
                <ImageBackground style={{width:Metrics.screenWidth,height:284}} source={Images.wallet.bg}>
                    <NavigationBar

                        title=""
                        leftBtnIcon={Images.sign_return}
                        leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                        leftBtnPress={() => router.pop()}
                        rightBtnIcon={Images.wallet.rule2}/>
                </ImageBackground>


                <View style={{backgroundColor: 'white',paddingTop:28,paddingBottom:12,flexDirection:'column',justifyContent:'space-around'}}>
                    <View style={[styles.invite_view]}>
                        <View style={[styles.botton_view,{backgroundColor:'#E54A2E',borderWidth:1,borderColor:'#E54A2E'}]}>
                            <Text style={{color:"white",fontSize:14}}>立即邀请</Text>
                        </View>
                        <View style={{flex:1}}/>
                        <View style={[styles.botton_view,{backgroundColor:'white',borderWidth:1,borderColor:'#E54A2E'}]}>
                            <Text style={{color:"#E54A2E",fontSize:14}}>二维码邀请</Text>
                        </View>
                    </View>
                    <View style={[styles.invite_view,{marginTop:31}]}>
                        <Image style={{width:20,height:20}} source={Images.wallet.moneys}/>
                        <Text style={{color:'#444444',fontSize:15,marginLeft:8}}>邀请奖励</Text>
                        <View style={{flex:1}}/>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={()=>{
                            global.router.toAwardDetailPage()
                        }}>
                            <Text style={{color:'#888888',fontSize:12,marginLeft:8}}>查看明细</Text>K
                            <Image source={Images.adr_right} style={{height:14,width:7,marginLeft:5}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.invite_view,{marginLeft:58,marginRight:58,marginTop:24}]}>
                        <View style={styles.view33}>
                            <Text style={styles.txt44}>{total_invite_money}元</Text>
                            <Text style={styles.txt55}>累计赚取</Text>
                        </View>
                        <Image source={Images.wallet.dddd} style={{height:39,width:3,marginLeft:49,marginRight:49}}/>
                        <View style={styles.view33}>
                            <Text  style={styles.txt44}>{total_invite_number}人</Text>
                            <Text style={styles.txt55}>成功邀请</Text>
                        </View>
                    </View>


                </View>

                <View style={{flexDirection:'row',alignItems:'center',marginTop: 17, marginLeft: 17, marginRight:17,marginBottom: 6}}>
                    <Image style={{width:25,height:23,marginRight:6}} source={Images.wallet.friends}/>
                    <Text style={{color: "#000000", fontSize: 14}}>
                        我邀请的好友
                    </Text>
                    <View style={{flex:1}}/>
                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'#888888',fontSize:12,marginLeft:8}}>更多好友</Text>
                        <Image source={Images.adr_right} style={{height:14,width:7,marginLeft:5}}/>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={{flex: 1, backgroundColor: '#FFFFFF', paddingBottom: 50}}
                    data={this.state.exchange_traders}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `comment${index}`}
                />

            </ScrollView>
        )
    }
}

