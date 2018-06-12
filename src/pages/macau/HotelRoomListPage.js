import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity,ImageBackground
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import ImageLoad from "../../components/ImageLoad";
import {isEmptyObject} from "../../utils/ComonHelper";

export default class HotelRoomListPage extends PureComponent {

    state = {
        timeShow: false
    };


    render() {
        let data = [{
            id: 15,
            logo: Images.Group,
            title: '城市观景双人房',
            message: {area: '34㎡', size: '两床', wifi: true},
            price: 580,
            breakfast: false,
            live: "可住2人"
        },
            {
                id: 13,
                logo: Images.Group,
                title: '贝利双人房',
                message: {area: '60㎡', size: '两床', wifi: true},
                price: 580,
                breakfast: true,
                live: "可住2人"
            },
            {
                id: 25,
                logo: Images.Group,
                title: '城市观景双人房',
                message: {area: '34㎡', size: '大床2m', wifi: true},
                price: 680,
                breakfast: false,
                live: "可住1人"
            },
            {
                id: 7,
                logo: Images.Group,
                title: '城市观景客房',
                message: {},
                price: 540,
                breakfast: false,
                live: ""
            }];

        const {title} = this.props.params.hotel;

        return (<View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title={title}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>


                <FlatList
                    ListHeaderComponent={this._separator}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    data={data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index + "item"}
                />
            </View>
        )
    }

    _renderItem = ({item, index}) => {
        return (
            <View style={styles.itemView}>
                <ImageBackground
                    emptyBg={Images.crowd_banner}
                    style={{width: 68, height: 68, marginLeft: 12,justifyContent:'flex-end',alignItems:'flex-end'}}
                    source={Images.crowd_banner}>
                    <View style={styles.counts}>
                        <Text style={{color:'#FFFFFF',fontSize:9}}>2张</Text>
                    </View>
                </ImageBackground>

                <Message item={item}/>

                <View style={styles.priceView}>
                    <Text style={{color:"#FF3F3F",fontSize:20}}><Text style={{color:"#FF3F3F",fontSize:12}}>¥</Text>{item.price}</Text>
                    <TouchableOpacity style={styles.reservation}
                    onPress={()=>{
                        router.toRoomReservationPage(item)
                    }}>
                        <Text style={{color:"#FFFFFF",fontSize:14}}>预定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    _separator = () => {
        return (
            <View style={{width: '100%', height: 5, backgroundColor: '#ECECEE'}}/>
        )
    }


}

export class Message extends PureComponent {
    _breakfast = (item) => {
        return (
            <View style={{flexDirection: 'row',marginTop:8}}>
                {item.breakfast ? <Text style={[styles.txt2,{marginRight: 10}]}>含早餐</Text> : null}
                {isEmptyObject(item.live) ? null : <Text style={styles.txt2}>{item.live}</Text>}
            </View>
        )
    };
    _message = (message) => {
        return (
            <View style={styles.message}>
                <View style={[styles.message1,{marginRight:6}]}>
                    <Text style={styles.txt}>{message.area}</Text>
                </View>
                {message.wifi ? <View style={[styles.message1, {marginRight: 6}]}>
                    <Text style={styles.txt}>WiFi</Text>
                </View> : null}

                <View style={styles.message1}>
                    <Text style={styles.txt}>{message.size}</Text>
                </View>

            </View>
        )
    };
    render(){
        const {item} = this.props;
        return(
            <View style={styles.messageView}>
                <Text style={{color: "#161718", fontSize: 18, fontWeight: 'bold'}}>{item.title}</Text>
                {!isEmptyObject(item.message) ? this._message(item.message) :
                    <Text style={{color: '#CCCCCC', fontSize: 12, marginTop: 6}}>暂无房型信息</Text>}

                {!item.breakfast && isEmptyObject(item.live) ? null : this._breakfast(item)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 25,
        paddingBottom: 20,
        backgroundColor: "#FFFFFF"
    },
    messageView: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 17
    },
    message: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 8
    },
    message1: {
        backgroundColor: '#F3F3F3',
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:2
    },
    txt: {
        color: '#888888',
        fontSize: 10
    },
    txt2: {
        color: "#4A90E2",
        fontSize: 12
    },
    priceView:{
        flexDirection:'column',
        marginRight:17,
        alignItems:'flex-end'
    },
    reservation:{
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:16,
        paddingRight:16,
        backgroundColor:'#FF6448',
        alignItems:'center',
        justifyContent:'center',
        marginTop:18,
        borderRadius:3,
        shadowOffset:{width:1,height:1},
        shadowColor:"#FF4726"
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

