import React, {Component} from 'react';
import {
    ScrollView, Text, FlatList,
    StyleSheet,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {isEmptyObject} from "../../utils/ComonHelper";
const dataHosts = [{image: Images.integral.renwu, name: '未完成'},
    {image: Images.integral.renwu, name: '每日登录',status:'领取'},
    {image: Images.integral.renwu, name: '发表长帖',status:'领取'},
    {image: Images.integral.renwu, name: '消费金额满800元人民币',status:'去完成'},
    {image: Images.integral.renwu, name: '每日分享',status:'去完成'},
    {image: Images.integral.renwu, name: '好友注册',status:'去完成'}];

export default class IntegralPage extends Component {


    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>
                <View style={styles.nav}>
                    <TouchableOpacity
                        style={styles.btn_search}
                        onPress={() => {
                            router.pop()
                        }}>

                        <Image
                            style={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                            source={Images.sign_return}/>

                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                    <Text style={styles.title}>我的积分</Text>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity
                        onPress={() => {
                            global.router.toIntegralDetailsPage();
                        }}>
                        <Text style={styles.btn_click}>积分明细</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.ruleView}>
                    <View style={{width:50}}/>
                    <View style={{flex:1}}/>
                    <Text style={styles.ruleTxt1}>360452</Text>
                    <View style={{flex:1}}/>
                    <TouchableOpacity
                        style={{marginRight: 17}}
                        onPress={() => {
                            global.router.toIntegralRulePage();
                        }}>
                        <Text style={styles.ruleTxt2}>！积分规则</Text>
                    </TouchableOpacity>

                </View>

                <ScrollView style={{backgroundColor: 'white'}}>
                    <View style={{backgroundColor: '#F3F3F3', height: 14, width: '100%'}}/>
                    <FlatList
                        style={{marginRight: 17, marginLeft: 17}}
                        data={dataHosts}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => `commodities${index}`}
                    />
                </ScrollView>

            </View>
        )
    }

    _renderItem = (item,index) => {
        console.log("jj:",item)
        return (
            <TouchableOpacity style={styles.item} key={index}>
                <Image style={{height: 34, width: 34}}
                       source={item.image}/>
                <Text style={{color: '#444444', fontSize: 16}}>{item.name}</Text>
                <View style={{flex:1}}/>
                {!isEmptyObject(item.status) ? <View style={[styles.statusView,{backgroundColor:item.status === '领取' ? '#6CC7FF' :'#FF6B4C'}]}>

                </View> : null}
            </TouchableOpacity>
        )
    };
    _separator = () => {
        return <View style={{backgroundColor: '#F3F3F3', height: 1}}/>
    }

};
const styles = StyleSheet.create({
    nav: {
        height: Metrics.navBarHeight,
        width: '100%',
        backgroundColor: Colors._E54,
        flexDirection: 'row',
        alignItems:'center',
        paddingTop: Metrics.statusBarHeight
    },
    View1:{
        flexDirection: 'row',
        alignItems:'center'
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
    btn_click: {
        marginRight: 17,
        color: '#FFFFFF', fontSize: 14
    },
    ruleView: {
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: Colors._E54,
        width:'100%',
        paddingTop:14,
        paddingBottom:18
    },
    ruleTxt1: {
        color: '#FFFFFF',
        fontSize: 30
    },
    ruleTxt2: {
        color: '#FFFFFF',
        fontSize: 12
    },
    item: {
        height: 47,
        alignItems: 'center'
    },
    statusView:{
        width:68,height:30
    }


});