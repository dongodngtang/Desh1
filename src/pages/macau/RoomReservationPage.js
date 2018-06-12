import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity,ImageBackground
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import ImageLoad from "../../components/ImageLoad";
import {isEmptyObject} from "../../utils/ComonHelper";
import {Message} from './HotelRoomListPage';

export default class HotelRoomListPage extends PureComponent {

    render(){
        const {item} = this.props.params;
        return(
            <View  style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title="房间预订"
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                <View style={styles.barView}>
                    <View style={styles.bar}>
                        <ImageBackground
                            emptyBg={Images.crowd_banner}
                            style={{width: 68, height: 68, marginLeft: 12,justifyContent:'flex-end',alignItems:'flex-end'}}
                            source={Images.crowd_banner}>
                            <View style={styles.counts}>
                                <Text style={{color:'#FFFFFF',fontSize:9}}>2张</Text>
                            </View>
                        </ImageBackground>
                        <Message item={item}/>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    barView:{
        width:'100%',
        backgroundColor: Colors._E54,
        marginTop:0,
        paddingBottom:8,
        justifyContent:"center",
        alignItems:'center'
    },
    bar:{
        marginLeft:17,
        marginRight:17,
        backgroundColor:'white',
        flexDirection:'row',
        paddingTop:20,
        paddingBottom:20
    },
    counts:{
        width:22,
        height:11,
        backgroundColor:"#000000",
        borderRadius:2,
        opacity:0.6,
        justifyContent:'center',
        alignItems:'center',
        marginRight:2,
        marginBottom:1
    }
})