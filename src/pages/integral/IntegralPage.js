import React, {Component} from 'react';
import {
    ScrollView, Text, FlatList,
    StyleSheet,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {isEmptyObject} from "../../utils/ComonHelper";
const dataHosts = [
    {image: Images.integral.login, name: '每日登录',status:'领取'},
    {image: Images.integral.tiezi, name: '发表长帖',status:'领取'},
    {image: Images.integral.jine, name: '消费金额满800元人民币',status:'去完成'},
    {image: Images.integral.share, name: '每日分享',status:'去完成'},
    {image: Images.integral.frends, name: '好友注册',status:'去完成'}];

export default class IntegralPage extends Component {

    state = {
        integral: []
    };

    componentDidMount() {

    }


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
                        ListHeaderComponent={this._header('未完成')}
                        style={{marginRight: 17, marginLeft: 17}}
                        data={dataHosts}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => `commodities${index}`}
                    />
                    <View style={{backgroundColor: '#F3F3F3', height: 13, width: '100%'}}/>
                    <View style={{marginRight: 17, marginLeft: 17}}>
                        {this._header('已完成')}
                        {this._separator}
                        {/*{this._renderItem([{image:Images.integral.monents,name:'每日评论'}])}*/}
                    </View>
                </ScrollView>

            </View>
        )
    }


    _header=(status)=>{
        return(
            <View style={[styles.head,{borderBottomWidth:1.5,borderColor:'#F3F3F3'}]}>
                <Image style={{height: 24, width: 24}}
                       source={Images.integral.renwu}/>
                <Text style={{color: '#444444', fontSize: 16,marginLeft:10}}>{status}</Text>
            </View>
        )
    };

    _renderItem = ({item,index}) => {
        return (
            <View style={styles.item} key={index}>
                <Image style={{height: 34, width: 34}}
                       source={item.image}/>
                <View style={{marginLeft:14,flexDirection:'column'}}>
                    <Text style={{color: '#444444', fontSize: 14}}>{item.name}</Text>
                    <Text style={{color: '#AAAAAA', fontSize: 12}}>积分+5</Text>
                </View>
                <View style={{flex:1}}/>
                <TouchableOpacity style={[styles.statusView,{backgroundColor:item.status === '领取' ? '#6CC7FF' :'#FF6B4C'}]}>
                    <Text style={{color:'#FFFFFF',fontSize:14}}>领取</Text>
                </TouchableOpacity>
            </View>
        )
    };
    _separator = () => {
        return <View style={{backgroundColor: '#F3F3F3', height: 1.5}}/>
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
    head: {
        height:47,
        flexDirection:'row',
        alignItems: 'center'
    },
    item: {
        marginTop:12,
        marginBottom:13,
        flexDirection:'row',
        alignItems: 'center'
    },
    statusView:{
        width:68,height:30,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'
    }


});