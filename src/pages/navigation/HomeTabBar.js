import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, Platform,
    StatusBar
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {Badge} from '../../components';


export default class HomeTabBar extends PureComponent {

    render() {
        return (<View style={styles.navBar}>
            <StatusBar barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"}/>

            <View style={styles.navContent}>
                <View style={{marginLeft: 17, flex: 1}}/>
                <TouchableOpacity
                    onPress={() => {
                        global.router.toSearchHomePage()
                    }}
                    style={styles.search}>
                    <Image style={styles.searchImg}
                           source={Images.search_gray}/>
                    <Text style={styles.txtSearch}>请输入关键字</Text>

                </TouchableOpacity>
                <View style={{flex: 1}}/>

                <TouchableOpacity
                    onPress={() => {
                        global.router.toActivitiesPage()
                    }}>
                    <Image style={styles.imgCat}
                           source={Images.lottery.activities}/>
                </TouchableOpacity>
            </View>

        </View>)

    }
}

const styles = StyleSheet.create({
    cancel: {
        fontSize: 14,
        color: Colors.white,
        marginRight:17
    },
    navBar: {
        height: Metrics.navBarHeight,
        width: '100%',
        paddingTop: Metrics.statusBarHeight,
        position: 'absolute',
        zIndex: 9999

    },
    navContent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44
    },
    search: {
        width: 250,
        height: 30,
        backgroundColor: 'rgba(236, 236, 237,0.959)',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
    imgCat: {
        width: 28, height: 26, marginRight: 17
    }
});