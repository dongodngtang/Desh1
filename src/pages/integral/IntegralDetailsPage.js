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
import {postIntegralDetails} from "../../services/IntegralDao";


export default class IntegralDetailsPage extends Component {

    state = {
        details: []
    };

    componentDidMount() {
        postIntegralDetails({}, data => {
            console.log('details', data);
            this.setState({details: data})
        })
    }

    render() {
        const {details} = this.state;
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    refreshPage={this.refreshPage}
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title={'积分明细'}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <ScrollView style={styles.View}>
                    {isEmptyObject(details) ? <View/> : <FlatList
                        style={{backgroundColor: 'white'}}
                        data={details.items}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => `commodities${index}`}
                    />}
                </ScrollView>
            </View>
        )
    }

    _renderItem = ({item, index}) => {
        const {active_at, category, created_at, mark, option_type, points} = item;
        return (
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <Text style={{color: '#444444', fontSize: 14}}>{mark}</Text>
                    <Text style={{color: '#AAAAAA', fontSize: 12,marginTop:3}}>{utcDate(active_at, 'YYYY-MM-DD hh:mm')}</Text>
                </View>
                <View style={{flex: 1}}/>
                <Text style={{
                    color: points < 0 ? '#34BA3C' : "#E54A2E",
                    fontSize: 20,
                    marginRight: 17
                }}>{points < 0 ? "-" : "+"}{points}</Text>
            </View>
        )
    };
    _separator = () => {
        return <View style={{backgroundColor: '#F3F3F3', height: 2, width: '100%'}}/>
    }

};
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