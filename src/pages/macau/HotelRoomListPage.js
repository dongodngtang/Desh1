import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, FlatList, Image,TouchableOpacity
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';

export default class HotelRoomListPage extends PureComponent {

    state = {
        timeShow: false
    };


    render() {
        let data = [{
            id:15,
            logo: Images.Group,
            title: '上海浦东香格里拉大酒店',
            star: 5,
            location: '富城路33号(富城路陆家嘴西路)',
            vouchers: true,
            recommend: true,
            price: 580
        },
            {
                id:13,
                logo: Images.Group,
                title: '上海浦东香格里拉大酒店',
                star: 3,
                location: '富城路33号(富城路陆家嘴西路)',
                vouchers: false,
                recommend: false,
                price: 710
            },
            {
                id:25,
                logo: Images.Group,
                title: '上海浦东香格里拉大酒店',
                star: 4,
                location: '富城路33号(富城路陆家嘴西路)',
                vouchers: false,
                recommend: false,
                price: 780
            },
            {
                id:7,
                logo: Images.Group,
                title: '上海浦东香格里拉大酒店',
                star: 5,
                location: '富城路33号(富城路陆家嘴西路)',
                vouchers: false,
                recommend: false,
                price: 540
            }];

        const {title} = this.props.params.hotel;

        return (<View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    refreshPage={this.refreshPage}
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title={title}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>


                <FlatList
                    ListHeaderComponent={this._separator}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    data={data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index + "item"}
                />
            </View>
        )
    }

    _star = (star) => {
        let stars = [];
        for (let i = 1; i <= star; i++) {
            stars.push(i);
        }
        return stars;
    };
    //是否有早餐
    _vouchers = () => {
        return (
            <View style={[styles.view, {borderColor: '#FF3F3F'}]}>
                <Text style={{color: '#FF3F3F', fontSize: 10}}>代金劵</Text>
            </View>
        )
    };
    //可住人数
    _recommend = () => {
        return (
            <View style={[styles.view, {borderColor: '#4A90E2', marginLeft: 8}]}>
                <Text style={{color: '#4A90E2', fontSize: 10}}>小编推荐</Text>
            </View>
        )
    };

    _renderItem = ({item, index}) => {
        return (

        )
    };

    _separator = () => {
        return (
            <View style={{width: '100%', height: 5, backgroundColor: '#ECECEE'}}/>
        )
    }


}
const styles = StyleSheet.create({

})

