import React, {Component} from 'react';
import {
    FlatList, ScrollView,
    StyleSheet, Text,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {utcDate, isEmptyObject} from "../../utils/ComonHelper";
import {NavigationBar} from '../../components';
import {award_details} from "../../services/WallDao";


export default class Details extends Component {

    _renderItem = ({item, index}) => {
        const {memo, amount, created_at} = item;

        return (
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <Text style={{color: '#444444', fontSize: 14}}>{memo}</Text>
                    <Text style={{
                        color: '#AAAAAA',
                        fontSize: 12,
                        marginTop: 3
                    }}>{utcDate(created_at, 'YYYY-MM-DD hh:mm')}</Text>
                </View>
                <View style={{flex: 1}}/>
                <Text style={{
                    color: amount < 0 ? '#34BA3C' : "#E54A2E",
                    fontSize: 20,
                    marginRight: 17
                }}>{amount < 0 ? "" : "+"}{amount}</Text>
            </View>
        )
    };
    _separator = () => {
        return <View style={{backgroundColor: '#F3F3F3', height: 2, width: '100%'}}/>
    }

    render(){
        const {details} = this.props.details;
        return(

            <ScrollView style={styles.View}>
                {isEmptyObject(details)? <View/> : <FlatList
                    style={{backgroundColor: 'white'}}
                    data={details}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `details${index}`}
                />}
            </ScrollView>
        )
    }

}


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
    },
    btn_search: {
        width: 50,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    View: {
        marginTop: 7,
        width: '100%'
    },
    item: {
        marginTop: 16,
        marginBottom: 7,
        flexDirection: 'row',

        alignItems: 'center'
    },
    itemLeft: {
        flexDirection: 'column',
        marginLeft: 17
    }

});