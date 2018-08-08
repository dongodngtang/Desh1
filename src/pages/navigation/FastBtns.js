import React, {Component} from 'react';
import {
    View, Text, Alert,
    Image, StyleSheet,
    TouchableOpacity
} from 'react-native';
import {Images, Colors, Metrics} from '../../Themes';
import {logMsg} from "../../utils/ComonHelper";

const catalogs = [{
    name: '天气',
    type: 'weather',
    size: {height: 28, width: 28,marginRight:8},
    icon: Images.navigation2.weather
},
    {
        name: '快餐',
        type: 'fast_food',
        size: {height: 24, width: 24,marginRight:8},
        icon: Images.navigation2.fast_food
    },
    {
        name: '往返',
        type: 'round_trip',
        size: {height: 24, width: 24,marginRight:8},
        icon: Images.navigation2.round_trip
    },
    {
        name: '便民',
        type: 'convenient',
        size: {height: 18, width: 18,marginRight:8},
        icon: Images.navigation2.convenient
    }

    ]

export default class FastBtns extends Component {

    render() {

        return <View style={{
            width: Metrics.screenWidth,
            paddingTop: 17,
            paddingBottom: 17,
            paddingLeft: 17,
            paddingRight: 17,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-around'
        }}>

            {catalogs.map((item, index) => {
                logMsg("hdsjjd",item)
                return <TouchableOpacity
                    key={item.name}
                    onPress={() => {
                        if (item.type === 'weather')
                            router.toWebView('天气', 'http://wx.weather.com.cn/mweather/101330101.shtml')
                        else if (item.type === 'hotel') {
                            router.toSelectTimePage();
                        } else if (item.type === 'exchange_rate') {
                            router.toRatePage();
                        } else if (item.type === 'entry_exit') {
                            router.toWebView('出入境', 'http://www.fsm.gov.mo/psp/pspmonitor/mobile/PortasdoCerco.aspx')
                        } else if (item.type === 'humanities') {
                            router.toWebView('天气', 'http://wx.weather.com.cn/mweather/101330101.shtml')
                        } else
                            router.toHotelSearch(item)
                    }}
                    style={{
                        flexDirection: 'row',
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                    <Image style={item.size}
                           source={item.icon}/>

                    <Text style={{
                        fontSize: 14, color: '#444444'
                    }}>{item.name}</Text>

                </TouchableOpacity>
            })}

        </View>
    }

}