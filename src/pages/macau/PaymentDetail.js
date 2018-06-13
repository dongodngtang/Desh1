import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    ScrollView, FlatList
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import {isEmptyObject, convertDate} from "../../utils/ComonHelper";
import * as Animatable from 'react-native-animatable';

export default class PaymentDetail extends PureComponent {

    state = {};

    componentDidMount() {

    }

    _renderItem = ({item, index}) => {
        return (
            <View style={styles.item}>
                <Text style={[styles.itemTxt,{marginRight: 10}]} numberOfLines={1}>2018-06-13（2间)</Text>
                <View style={{marginLeft:10,marginRight:10,flex:1,backgroundColor: '#F3F3F3', height: 1}}/>
                <Text style={styles.itemTxt}>¥345</Text>
            </View>
        )
    }

    render() {
        let data = [1, 2, 3, 4, 5, 6];
        return (
            <Animatable.View
                duration={300}
                animation={'fadeInUp'}
                style={styles.page}>
                <TouchableOpacity
                    style={{marginBottom:250,height:100, width: '100%'}}
                    onPress={() => {
                        this.props._detailsShow()
                    }}>

                </TouchableOpacity>
                <View style={styles.View}>
                    <View style={styles.payment}>
                        <Text style={{color: '#444444', fontSize: 16, fontWeight: 'bold'}}>在线支付</Text>
                        <View style={{flex: 1}}/>
                        <Text style={{color: '#E54A2E', fontSize: 16}}>¥2182.8</Text>
                    </View>
                    <ScrollView>
                        <FlatList
                            style={{marginLeft: 30,marginRight: 22}}
                            showsHorizontalScrollIndicator={false}
                            data={data}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index + "item"}
                        />
                    </ScrollView>
                </View>
            </Animatable.View>
        );
    }

}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99
    },
    View: {
        height: 290,
        width: '100%',
        backgroundColor: 'white',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column'
    },
    payment: {
        marginLeft: 30,
        marginRight: 22,
        flexDirection: 'row',
        marginTop: 21,
        marginBottom: 14

    },
    item: {
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    itemTxt: {
        color: "#AAAAAA",
        fontSize: 14
    }


})