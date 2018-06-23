import React, {Component} from 'react';
import {
    ScrollView, Text, FlatList,
    StyleSheet,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';



export default class IntegralBar extends Component {

    render(){
        return(
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
                <Text style={styles.title}>{this.props.text}</Text>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    onPress={() => {
                        global.router.toIntegralDetailsPage();
                    }}>
                    <Text style={styles.btn_click}>积分明细</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    nav: {
        height: Metrics.navBarHeight,
        width: '100%',
        backgroundColor: Colors._E54,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight
    },
    title: {
        fontSize: 18,
        color: Colors.white
    }
})