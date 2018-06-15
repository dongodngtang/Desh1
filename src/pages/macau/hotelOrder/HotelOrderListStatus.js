import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import HotelItem from './HotelItem';
import CompletedBottom from './CompletedBottom';
import {getMallOrders} from '../../../services/MallDao';
import UltimateFlatList from '../../../components/ultimate';
import {BaseComponent} from '../../../components';

export default class HotelOrderListStatus extends Component {
    _color = (status) => {
        if (status === '待付款') {
            return "#E54A2E"
        } else if (status === '已取消') {
            return "#333333"
        } else if (status === '待入住') {
            return "#4A90E2"
        } else if (status === '已完成') {
            return "#333333"
        }
    };

    renderItem = (item, index) => {
        item = {
            id: 15,
            images: ["https://cdn-upyun.deshpro.com/test//uploads/admin_image/79f2c7de5eb69a5f7d8516a73e964ead.jpg"],
            notes: ["含早餐", "可住两人"],
            price: 14999,
            tags: ["WIFI", "双床"],
            title: "城市景观双人房",
            status:'待付款'
        };
        const {id, images, notes, price, tags, title,status} = item;
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    global.router.toOrderStatusPage(item, this.refresh)
                }}
                style={{flex: 1, marginTop: 5}}>
                <View style={styles.top}>
                    <Text style={styles.txtLeft}>{`订单编号：1234567899`}</Text>
                    <View style={{flex: 1}}/>
                    <Text style={[styles.txtRight,{color: this._color(status)}]}>{status}</Text>
                </View>
                <View style={{height: 1}}/>
                <HotelItem
                    item={item}/>

                <CompletedBottom
                    pageOrderInfo={false}
                    refresh={this.refresh}
                    orderItem={item}/>
            </TouchableOpacity>
        )
    };

    refresh = () => {
        this.contain && this.contain.open();
        this.ultimate && this.ultimate.refresh();
    };


    render() {

        return <BaseComponent
            ref={ref => this.contain = ref}>
            <UltimateFlatList
                arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                ref={ref => this.ultimate = ref}
                onFetch={this.onFetch}
                keyExtractor={(item, index) => `${this.props.status}${index}`}
                item={this.renderItem}
                refreshableTitlePull={I18n.t('pull_refresh')}
                refreshableTitleRelease={I18n.t('release_refresh')}
                dateTitle={I18n.t('last_refresh')}
                allLoadedText={I18n.t('no_more')}
                waitingSpinnerText={I18n.t('loading')}
            />
        </BaseComponent>


    }

    onFetch = (page, postRefresh, endFetch) => {
        if (page === 1) {

            this.load({
                status: this.props.status,
                page: 1,
                page_size: 20
            }, postRefresh, endFetch)
        } else {
            this.load({
                status: this.props.status,
                page: 1,
                page_size: 20
            }, postRefresh, endFetch)
        }

    };


    load = (body, postRefresh, endFetch) => {
        getMallOrders(body, data => {
            this.contain && this.contain.close();
            postRefresh(data.items, 18);

        }, err => {
            this.contain && this.contain.close();
            endFetch();
        });
    }
}
const styles = StyleSheet.create({
    top: {
        height: 40,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtLeft: {
        marginLeft: 17,
        fontSize: 14,
        color: '#333333'
    },
    txtRight: {
        marginRight: 16,
        fontSize: 14,
        color: '#333333'
    },
    viewTotal: {
        height: 44,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    txtTotal1: {
        color: '#333333',
        fontSize: 14
    },
    txtTotal2: {
        color: '#333333',
        fontSize: 18,
        marginRight: 18
    }
});