import React, {PureComponent} from 'react';
import {
    View, Text, Alert,
    Image, StyleSheet,
    TouchableOpacity
} from 'react-native';
import {Images} from '../../Themes';
import Colors from "../../Themes/styles/Colors";

export default class Catalog extends PureComponent {

    state = {
        catalogs: [
            [{
                name: '汇率',
                size: {height: 34, width: 30},
                icon: Images.macau.rate_exchange
            },
                {
                    name: '娱乐',
                    size: {height: 34, width: 36},
                    icon: Images.macau.entertainment
                }
            ],
            [
                {
                    name: '酒店',
                    size: {height: 34, width: 37},
                    icon: Images.macau.hotel
                },
                {
                    name: '景点',
                    size: {height: 34, width: 36},
                    icon: Images.macau.viewpoint
                }
            ],
            [
                {
                    name: '美食',
                    size: {height: 35, width: 34},
                    icon: Images.macau.food
                },

                {
                    name: '人闻',
                    size: {height: 30, width: 34},
                    icon: Images.macau.book
                }
            ],
            [
                {
                    name: '特产',
                    size: {height: 29, width: 31},
                    icon: Images.macau.gift
                },
                {
                    name: '商城',
                    size: {height: 29, width: 31},
                    icon: Images.macau.store,
                    onPress: () => global.router.toMallPage()
                }
            ]


        ]
    }

    render() {

        const {catalogs} = this.state;


        return <View style={{
            height: 160, width: '100%', backgroundColor: 'white',
            justifyContent: 'center'
        }}>

            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                {this.catalogView(catalogs)}
            </View>

        </View>
    }

    catalogView = (catalogs) => {

        return catalogs.map(items => <View>
            {items.map(item => {
                return <TouchableOpacity
                    onPress={() => {
                        item.onPress && item.onPress();
                    }}
                    style={{
                        alignItems: 'center',
                        padding: 15
                    }}>
                    <View style={{
                        height: 35, width: 35,
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Image style={item.size}
                               source={item.icon}/>
                    </View>

                    <Text style={{
                        fontSize: 14, color: Colors._666,
                        marginTop: 5
                    }}>{item.name}</Text>

                </TouchableOpacity>
            })}
        </View>)

    }

}