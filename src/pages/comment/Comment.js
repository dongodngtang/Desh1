import React,{Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {utcDate, util} from '../../utils/ComonHelper';

export default class Comment extends Component {
    state:{

    };

    _renderItem=()=>{
        return(
            <View style={styles.content}>
                <Image style={styles.img} source={Images.empty_image}/>
                <View style={styles.contentRight}>
                    <View style={styles.commentTop}>
                        <Text style={styles.name}>花花公子</Text>
                        <View style={{flex:1}}/>
                        <TouchableOpacity
                        style={styles.commentView}>
                            <Image style={styles.commentImg} source={Images.comment}/>
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.time}>3小时前</Text>
                    <Text style={styles.messages}>已越来越多的德扑选手参加比赛</Text>
                    <TouchableOpacity
                        style={styles.moreMessagesView}>
                        <Text style={styles.moreMessages}>查看34条回复></Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    _separator = () => {
        return <View style={{height: 0.5, marginLeft: 68, marginRight: 17, backgroundColor: '#ECECEE'}}/>;
    };

    render(){
        let dataHosts =[1,2,3,4,5,6,7,8];
        return(
            <View style={styles.container}>
                <View style={{width:'100%',height:3,backgroundColor:'#ECECEE'}}/>
                <View style={styles.top}>
                    <Text style={styles.topTxt}>全部评论（555）</Text>
                </View>
                <FlatList
                    style={{paddingTop: 6,marginTop:1,backgroundColor:'#F5F5F5'}}
                    data={dataHosts}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `comment${index}`}
                />
                <View style={{height:50}}/>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
       backgroundColor:'#ECECEE',
       marginTop:1,
   },
    top:{
       height:37,
        backgroundColor:'#FFFFFF',
        justifyContent:'center'
    },
    topTxt:{
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft:16
    },
    content:{
        width:'100%',
        flexDirection:'row',
        alignItems:'flex-start',
        paddingBottom:6,
        paddingTop:13
    },
    img:{
       width:38,
        height:38,
        borderRadius:19,
        marginLeft:17,
        top:-2
    },
    contentRight:{
       alignItems:'flex-start',
       flex:1,
        marginLeft:11,
        marginRight:17
    },
    name:{
        fontSize: 14,
        color: '#666666',
    },
    commentImg:{
       width:20,
        height:18
    },
    commentTop:{
       flexDirection:'row',
        alignItems:'flex-start',

    },
    time:{
        fontSize: 10,
        color: '#CCCCCC',
    },
    messages:{
        fontSize: 16,
        color: '#444444',
        marginTop:6
    },
    moreMessagesView:{
        width:'100%',
       height:20,
        marginRight:17,
        backgroundColor:'#ECECEE',
        alignItems:'flex-start',
        marginTop:10,
        justifyContent:'center'
    },
    moreMessages:{
        fontSize: 12,
        color: '#4990E2',
        marginLeft:11
    },
    commentView:{
        alignItems:'center',
        justifyContent:'center',
        // paddingTop:10,
        // paddingBottom:10,
        // paddingLeft:10,
        // paddingRight:10,
        // marginRight:17
    }

});