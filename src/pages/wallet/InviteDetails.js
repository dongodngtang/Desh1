import React, {Component} from 'react';
import {
    FlatList, ScrollView,
    StyleSheet, Text,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {utcDate, isEmptyObject} from "../../utils/ComonHelper";
import {NavigationBar} from '../../components';
import {award_details} from "../../services/WallDao";
import ImageLoad from "../../components/ImageLoad";

export default class InviteDetails extends Component {


    _renderItem = ({item,index}) => {
        const {user_id, nick_name, avatar} = item;
        return (
            <TouchableOpacity style={styles.pageItem}
                              onPress={()=>{
                                  // global.router.toUserTopicPage(item)
                              }}>

                {this.show_index(index)}

                <ImageLoad style={styles.avatar}
                           source={{uri: avatar}}/>

                <View style={{width:'50%'}}>
                    <Text style={styles.txt_name}>{nick_name}</Text>
                </View>

            </TouchableOpacity>
        )
    };

    _separator = () => {
        return <View style={{backgroundColor: '#F3F3F3', height: 2, width: '100%'}}/>
    }

    render(){
        const {invites} = this.props.details;
        return(

            <ScrollView style={styles.View}>
                {isEmptyObject(invites)? <View/> : <FlatList
                    style={{backgroundColor: 'white'}}
                    data={invites}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `details${index}`}
                />}
            </ScrollView>
        )
    }

}


const styles = StyleSheet.create({
    pageItem:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        marginRight:17,
        marginLeft:22,
        borderBottomWidth:1,
        borderBottomColor:'#F3F3F3'

    },
    txt_num:{
        color:Colors._666,
        fontSize:15,
        fontWeight:'bold'
    },
    avatar:{
        height:50,
        width:50,
        borderRadius:25,
        marginRight:15,
        marginLeft:24
    },
    txt_name:{
        color:Colors._333,
        fontSize:14,
        fontWeight:'bold',
        marginBottom:2
    },
    txt_decs:{
        color:Colors._AAA,
        fontSize:12
    },
    img_left:{
        height:12,
        width:6,
        marginLeft:8
    },
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
    View: {
        marginTop: 7,
        width: '100%'
    },
    item: {
        marginTop: 16,
        marginBottom: 7,
        flexDirection: 'row',

        alignItems: 'center'
    },
    itemLeft: {
        flexDirection: 'column',
        marginLeft: 17
    }

});