/**
 * Created by lorne on 2017/9/5.
 */
import React, {PropTypes, Component} from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    FlatList, View, Text, ScrollView, TouchableOpacity,
    InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, UltimateListView} from '../../components';
import moment from 'moment';

export default class ActivityCenter extends Component {

    render() {
        const {activities} = this.props.params;
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                router={router}
                title="活动中心"
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <FlatList
                keyExtractor={(item, index) => index}
                renderItem={this._renderItem}
                data={activities}

            />

        </View>)
    }

    _renderItem = ({item}) => {
        return (<View style={styles.listItem}>
            <Image style={styles.banner}
                   source={{uri: item.banner}}
            />
            <View style={styles.content}>
                <Text
                    numberOfLines={2}
                    style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>活动／#WPT</Text>

                <Text style={styles.time}>{moment.unix(item.activity_time).startOf('hour').fromNow()}</Text>

                <View style={styles.line}/>

            </View>

        </View>)
    }
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: 'white'
    },
    banner: {
        height: 212,
        width: '100%',
        resizeMode: 'cover',
        backgroundColor: Colors._ECE
    },
    content: {
        paddingLeft: 17,
        paddingRight: 17,
        paddingTop: 13,
        paddingBottom: 9,
        minHeight: 78
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors._333,
        marginRight: 60
    },
    desc: {
        fontSize: 12,
        color: Colors._AAA,
        marginTop: 5
    },
    line: {
        height: 1,
        backgroundColor: Colors._ECE,
        marginTop: 12
    },
    time: {
        fontSize: 12,
        color: Colors._AAA,
        position: 'absolute',
        right: 18,
        top: 35

    }

});