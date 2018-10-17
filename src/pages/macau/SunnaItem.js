import React, {Component} from 'react';
import {
    View,
    FlatList,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    ListView,
    TextInput, StyleSheet
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, BaseComponent} from '../../components';
import ImageLoad from "../../components/ImageLoad";
import {mul, DateDiff, checkPriceLength} from '../../utils/ComonHelper'

export default class SunnaItem extends Component {

    render(){
        const {item} = this.props;
        const {index,title, location, logo, price, star_level,distance} = item;
        return (
            <TouchableOpacity style={styles.item} key={index}
                              onPress={() => {
                                  // router.toHotelDetail(item, changeTime)
                              }}>
                <Image
                    style={{width: 67, height: 95, marginLeft: 12}}
                    source={logo}/>
                <View style={styles.message}>
                    <Text style={styles.name} numberOfLines={1}>{title}</Text>
                    {star_level > 0 ? <View style={styles.starView}>
                        <Text style={{color: '#999999', fontSize: 12}}>酒店星级：</Text>
                        {this._star(item.star_level).map((index) => {
                            return <Image key={index} style={styles.stars} source={Images.macau.star}/>
                        })}
                    </View> : null}
                    <Text style={styles.location} numberOfLines={1}>地址：{location}</Text>
                    <View style={{flex:1}}/>
                    <View style={styles.priceView}>
                        <Text style={{color:'#E54A2E',fontSize:16}}>{`人均¥${price}`}</Text>
                        <View style={{flex:1}}/>
                        <Text style={{color:'#4A90E2',fontSize:12}}>{distance}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "flex-start",
        backgroundColor: "white",
        paddingTop: 17,
        paddingBottom: 17
    },
    message: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        marginTop: 7,
        marginRight: 22
    },
    name: {
        color: '#161718',
        fontSize: 18,
        fontWeight: 'bold'
    },
    stars: {
        width: 14,
        height: 14,
        marginRight: 4
    },
    starView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 9
    },
    location: {
        color: '#999999',
        fontSize: 12,
        marginTop: 8
    },
    priceView: {
        flexDirection: 'row',
        marginTop: 3
    }
})