import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, FlatList, Image
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import SearchBar from './SearchBar';
import TimeSpecificationInfo from './TimeSpecificationInfo';
import ImageLoad from "../../components/ImageLoad";

const stars = [1, 2, 3, 4, 5];

export default class HotelListPage extends PureComponent {

    state = {
        timeShow: false
    };

    showSpecInfo = (temp) => {
        this.setState({
            timeShow: !this.state.timeShow
        })
    };

    componentDidMount() {

    }


    render() {
        let data = [{
            icon: Images.Group,
            name: '上海浦东香格里拉大酒店',
            star: 5,
            location: '富城路33号(富城路陆家嘴西路)',
            vouchers: true,
            recommend: true,
            price: 580
        },
            {
                icon: Images.Group,
                name: '上海浦东香格里拉大酒店',
                star: 3,
                location: '富城路33号(富城路陆家嘴西路)',
                vouchers: false,
                recommend: false,
                price: 710
            },
            {
                icon: Images.Group,
                name: '上海浦东香格里拉大酒店',
                star: 4,
                location: '富城路33号(富城路陆家嘴西路)',
                vouchers: false,
                recommend: false,
                price: 780
            },
            {
                icon: Images.Group,
                name: '上海浦东香格里拉大酒店',
                star: 5,
                location: '富城路33号(富城路陆家嘴西路)',
                vouchers: false,
                recommend: false,
                price: 540
            }];

        const {timeShow} = this.state;
        return (<View style={ApplicationStyles.bgContainer}>
                <SearchBar showSpecInfo={this.showSpecInfo}/>
                {timeShow ? <TimeSpecificationInfo
                    showSpecInfo={this.showSpecInfo}/> : null}

                <FlatList
                    ListHeaderComponent={this._separator}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    data={data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index + "item"}
                />
                <View style={{backgroundColor: '#ECECEE', height: 80, width: '100%'}}/>
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
    _vouchers = () => {
        return (
            <View style={[styles.view, {borderColor: '#FF3F3F'}]}>
                <Text style={{color: '#FF3F3F', fontSize: 10}}>代金劵</Text>
            </View>
        )
    };
    _recommend = () => {
        return (
            <View style={[styles.view, {borderColor: '#4A90E2', marginLeft: 8}]}>
                <Text style={{color: '#4A90E2', fontSize: 10}}>小编推荐</Text>
            </View>
        )
    };

    _renderItem = ({item, index}) => {
        return (
            <View style={styles.item} key={index}>
                <ImageLoad
                    emptyBg={Images.crowd_banner}
                    style={{width: 67, height: 95,marginLeft:12}}
                    source={Images.crowd_banner}/>
                <View style={styles.message}>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.starView}>
                        {this._star(item.star).map(() => {
                            return <Image style={styles.stars} source={Images.macau.star}/>
                        })}
                    </View>
                    <Text style={styles.location} numberOfLines={1}>{item.location}</Text>
                    <View style={styles.priceView}>
                        {item.vouchers ? this._vouchers() : <View/>}
                        {item.recommend ? this._recommend() : <View/>}
                        <View style={{flex: 1}}/>
                        <Text style={styles.price}><Text
                            style={{color: '#FF3F3F', fontSize: 12}}>¥</Text>{item.price}<Text
                            style={{color: '#AAAAAA', fontSize: 12}}>起</Text></Text>
                    </View>
                </View>
            </View>
        )
    };

    _separator = () => {
        return (
            <View style={{width: '100%', height: 5, backgroundColor: '#ECECEE'}}/>
        )
    }


}
const styles = StyleSheet.create({
    list: {

    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: 17,
        paddingBottom: 17
    },
    message: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'flex-end',
        marginRight:22
    },
    name: {
        color: '#161718',
        fontSize: 18,
        fontWeight: 'bold'
    },
    stars: {
        width: 14,
        height: 14,
        marginRight: 4
    },
    starView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 9
    },
    location: {
        color: '#999999',
        fontSize: 12,
        marginTop: 8
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 3
    },
    price: {
        color: '#FF3F3F',
        fontSize: 20
    },
    view: {
        width: 48,
        height: 18,
        borderWidth: 1,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

