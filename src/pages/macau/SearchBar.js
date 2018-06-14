import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, Platform,
    StatusBar, TextInput
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {Badge} from '../../components';


export default class SearchBar extends PureComponent {
    render() {
        let item = {
            name: '酒店',
            type: 'hotel',
            size: {height: 32, width: 35},
            icon: Images.macau.hotel
        };
        return (<View style={styles.navBar}>

            <View style={styles.navContent}>
                <TouchableOpacity
                    onPress={() => {
                        global.router.pop()
                    }}
                    style={{
                        height: 40, width: 50,
                        alignItems: 'center', justifyContent: 'center',
                    }}>
                    <Image style={{height: 19, width: 10}}
                           source={Images.sign_return}/>
                </TouchableOpacity>

                <View
                    style={styles.search}>
                    <Image style={styles.searchImg}
                           source={Images.search_gray}/>

                    <TextInput
                        onChangeText={text => {
                            this.props.onChangeText && this.props.onChangeText(text)
                        }}
                        placeholderTextColor={'white'}
                        placeholder={'地名／酒店'}
                        underlineColorAndroid={'transparent'}
                        style={{height: 40, fontSize: 14, color: 'white', flex: 1}}/>
                </View>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    onPress={() => {
                        this.props.showSpecInfo();
                    }}
                    style={styles.btnCat}>
                    <View style={styles.timView}>
                        <Text style={styles.txt}>住07-23</Text>
                        <Text style={styles.txt}>离07-26</Text>
                    </View>
                    <Image style={{width: 5, height: 5, marginLeft: 5}} source={Images.macau.down2}/>

                </TouchableOpacity>
            </View>

        </View>)

    }

}

const styles = StyleSheet.create({
    txt: {
        color: 'white',
        fontSize: 10
    },
    navBar: {
        height: Metrics.navBarHeight,
        width: '100%',
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: '#E54A2E'
    },
    navContent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44
    },
    search: {
        height: 28,
        width: 248,
        backgroundColor: "#CD3A1F",
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchImg: {
        height: 17,
        width: 17,
        marginLeft: 15,
        marginRight: 9
    },
    txtSearch: {
        color: Colors._AAA,
        fontSize: 12
    },
    btnCat: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        marginRight: 7
    },
    imgCat: {
        height: 20,
        width: 22
    },
    badge: {
        position: 'absolute',
        top: 5,
        right: '26%'
    },
    timView: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 9
    }

});