import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image, FlatList, Button
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import SearchBar from "../comm/SearchBar";

const styles = StyleSheet.create({
    nav: {
        height: Metrics.navBarHeight,
        width: '100%',
        backgroundColor: Colors._E54,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight
    },
    cancel: {
        fontSize: 14,
        color: Colors.white
    },
    title: {
        fontSize: 18,
        color: Colors.white
    }
})

export default class HotelSearch extends PureComponent {
    state = {
        search: false
    };

    render() {
        return <View style={ApplicationStyles.bgContainer}>
            <View style={styles.nav}>
                <Text>返回</Text>
                <View style={{flex: 1}}/>
                {this.state.search ? <SearchBar/> : <Text>酒店</Text>}
                <View style={{flex: 1}}/>


                <Text onPress={() => {
                    this.setState({
                        search: !this.state.search
                    })
                }}>取消</Text>

            </View>


        </View>
    }
}