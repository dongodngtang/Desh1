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
                size: {height: 32, width: 32},
                icon: ''
            },
                {
                    name: '娱乐',
                    size: {height: 29, width: 31},
                    icon: ''
                }
            ],
            [
                {
                    name: '酒店',
                    size: {height: 34, width: 34},
                    icon: ''
                },
                {
                    name: '景点',
                    size: {height: 29, width: 31},
                    icon: ''
                }
            ],
            [
                {
                    name: '美食',
                    size: {height: 34, width: 34},
                    icon: ''
                },

                {
                    name: '人闻',
                    size: {height: 29, width: 31},
                    icon: ''
                }
            ],
            [
                {
                    name: '特产',
                    size: {height: 29, width: 31},
                    icon: ''
                },
                {
                    name: '商城',
                    size: {height: 29, width: 31},
                    icon: ''
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
                    style={{
                        alignItems: 'center',
                        padding: 15
                    }}>
                    <Image style={item.size}
                           source={Images.social.mall}/>
                    <Text style={{
                        fontSize: 14, color: Colors._666,
                        marginTop: 5
                    }}>{item.name}</Text>

                </TouchableOpacity>
            })}
        </View>)

    }

}