import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import SearchBar from "../comm/SearchBar";
import {UltimateListView, ImageLoad} from '../../components'
import I18n from "react-native-i18n";
import {LoadErrorView, NoDataView} from '../../components/load';
import {hotels, info_types} from '../../services/MacauDao';


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
    img_search: {
        height: 17,
        width: 17
    },
    btn_search: {
        width: 50,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default class HotelSearch extends PureComponent {
    state = {
        search: false,
    };


    render() {
        const {name, type} = this.props.params.item;
        return <View style={ApplicationStyles.bgContainer}>
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
                {this.state.search ? <SearchBar
                    keywords={keywords => {
                        this.keywords = keywords;
                        this.listView && this.listView.refresh()

                    }}/> : <Text style={styles.title}>{name}</Text>}
                <View style={{flex: 1}}/>


                <TouchableOpacity
                    style={styles.btn_search}
                    onPress={() => {
                        this.setState({
                            search: !this.state.search
                        })
                    }}>
                    {this.state.search ? <Text style={styles.cancel}>取消</Text> : <Image
                        style={styles.img_search}
                        source={Images.macau.search}/>}

                </TouchableOpacity>


            </View>
            {this.separator()}
            <UltimateListView
                separator={() => this.separator()}
                keyExtractor={(item, index) => index + "item"}
                ref={(ref) => this.listView = ref}
                onFetch={this.onFetch}
                item={this.item_view}
                refreshableTitlePull={I18n.t('pull_refresh')}
                refreshableTitleRelease={I18n.t('release_refresh')}
                dateTitle={I18n.t('last_refresh')}
                allLoadedText={I18n.t('no_more')}
                waitingSpinnerText={I18n.t('loading')}
                emptyView={() => {
                    return this.state.error ? <LoadErrorView
                        onPress={() => {
                            this.listView.refresh()
                        }}/> : <NoDataView/>;
                }}
            />

        </View>
    }

    separator = () => {
        const {name, type} = this.props.params.item;
        if (type !== 'exchange_rate')
            return <View style={{height: 5}}/>
        else
            return null
    }

    item_view = (item, index, separators) => {
        const {type} = this.props.params.item;
        if (type === 'hotel')
            return <HotelItem
                key={`${type}${index}`}
                item={item}/>
        else if (type === 'exchange_rate')
            return <RateItem/>
        else
            return <FoodItem
                key={`${type}${index}`}
                item={item}/>


    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            const {type} = this.props.params.item;
            if (type === 'hotel') {
                hotels({page, page_size: 20, keywords: this.keywords}, data => {
                    startFetch(data.items, 18)
                }, err => {
                    abortFetch()
                })
            } else if (type === 'exchange_rate') {
                startFetch([1, 2], 5)

            } else {
                info_types({page, page_size: 20, keywords: this.keywords, type},
                    data => {
                        startFetch(data.items, 18)
                    }, err => {
                        abortFetch()
                    })
            }


        } catch (err) {
            console.log(err)
            abortFetch()
        }
    }


}


class HotelItem extends PureComponent {

    render() {
        const {title, address, location, logo} = this.props.item;
        return <TouchableOpacity
            onPress={() => {
                router.toHotelDetail(this.props.item)
            }}
            style={{
                height: 128,
                backgroundColor: Colors.white,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center'
            }}>

            <ImageLoad
                source={{uri: logo}}
                style={{height: 95, width: 67, marginLeft: 12, marginRight: 12}}/>

            <View style={{marginRight: 17, height: 95, flex: 1}}>
                <Text
                    numberOfLines={2}
                    style={{fontSize: 17, color: Colors._161817, marginTop: 5}}>{title}</Text>
                <Text
                    numberOfLines={2}
                    style={{fontSize: 14, color: Colors._999, marginTop: 5}}>{location}</Text>

                <View style={{flex: 1}}/>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 10, height: 14}}
                           source={Images.macau.location}/>

                    <Text
                        numberOfLines={1}
                        style={{fontSize: 12, color: '#4A90E2', marginLeft: 7}}>{}</Text>

                </View>

            </View>


        </TouchableOpacity>
    }
}

class FoodItem extends PureComponent {

    render() {
        const {title, read, like, image, date} = this.props.item;
        return <TouchableOpacity
            onPress={() => {
                router.toInfoPage(this.props.item)
            }}
            style={{
                height: 102, backgroundColor: Colors.white, width: '100%',
                alignItems: 'center', flexDirection: 'row',
                paddingLeft: 17, paddingRight: 17
            }}>
            <View style={{flex: 1, height: 74}}>
                <Text
                    numberOfLines={2}
                    style={{fontSize: 16, color: Colors.txt_444, marginTop: 5}}>{title}</Text>
                <View style={{flex: 1}}/>

                <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text
                        numberOfLines={1}
                        style={{fontSize: 12, color: Colors._AAA}}>{date}</Text>

                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Image
                            style={{height: 13, width: 13}}
                            source={Images.social.like_gray}/>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 12, color: Colors._AAA,
                                marginLeft: 3
                            }}>{like}</Text>
                    </View>

                </View>

            </View>

            <Image
                source={{uri: image}}
                style={{width: 122, height: 74, marginLeft: 16}}/>

        </TouchableOpacity>
    }
}

class RoomItem extends PureComponent {
    render() {
        return <TouchableOpacity
            style={{
                height: 128, width: '100%', backgroundColor: 'white',
                flexDirection: 'row', alignItems: 'center'
            }}>

            <ImageLoad

                style={{height: 95, width: 67}}/>


        </TouchableOpacity>
    }
}

class RateItem extends PureComponent {
    render() {
        return <TouchableOpacity
            style={{
                height: 142, width: '100%', alignItems: 'center',
                justifyContent: 'center'
            }}>


            <Image
                source={Images.macau.rate1}
                style={{height: 142, width: '100%', position: 'absolute'}}/>

            <Text style={{fontSize: 15, color: 'white'}}>实时汇率</Text>
            <Text style={{fontSize: 20, color: 'white', marginTop: 10}}>1港元=0.8117人民币</Text>
            <Text style={{fontSize: 20, color: 'white', marginTop: 6}}>1人民币=1.232港元</Text>


        </TouchableOpacity>
    }
}