import React, {PureComponent, Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, TextInput
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import SearchBar from "../comm/SearchBar";
import {UltimateListView, ImageLoad} from '../../components'
import I18n from "react-native-i18n";
import {LoadErrorView, NoDataView} from '../../components/load';
import {hotels, info_types, exchange_rates, getRoomList} from '../../services/MacauDao';
import {isEmptyObject} from "../../utils/ComonHelper";

const groups = [{id: 1, img: Images.cny, abb: 'CNY', name: '人民币¥'},
    {id: 2, img: Images.hkd, abb: 'HKD', name: '港币$'},
    {id: 3, img: Images.mop, abb: 'MOP', name: '澳门币$'}];

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
        search: false
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
                    keyword={keyword => {
                        this.keyword = keyword;
                        this.listView && this.listView.refresh()

                    }}/> : <Text style={styles.title}>{name === '汇率' ? '实时汇率' : name}</Text>}
                <View style={{flex: 1}}/>


                {type === 'exchange_rate' ? <View style={{width: 40}}/> : <TouchableOpacity
                    style={styles.btn_search}
                    onPress={() => {
                        this.setState({
                            search: !this.state.search
                        })
                    }}>
                    {this.state.search ? <Text style={styles.cancel}>取消</Text> : <Image
                        style={styles.img_search}
                        source={Images.macau.search}/>}

                </TouchableOpacity>}


            </View>
            {this.separator()}
            {type === 'exchange_rate' ? <RateItem/> : <UltimateListView
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
            />}


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
        // else if (type === 'exchange_rate')
        //     return <RateItem
        //         refresh={() => {
        //             this.listView.refresh()
        //         }
        //         }
        //         key={`${type}${index}`}
        //         item={item}/>
        else
            return <FoodItem
                key={`${type}${index}`}
                item={item}/>


    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            const {type} = this.props.params.item;
            if (type === 'hotel') {
                hotels({page, page_size: 20, keyword: this.keyword}, data => {
                    startFetch(data.items, 18)
                }, err => {
                    abortFetch()
                })
                // } else if (type === 'exchange_rate') {
                //     exchange_rates(data => {
                //         startFetch(data.items, 18)
                //     }, err => {
                //         abortFetch()
                //     })
                //
                // } else {
            } else {
                info_types({page, page_size: 20, keyword: this.keyword, type},
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


class HotelItem extends Component {

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

    state = {
        ratesItem: {}
    }

    componentDidMount() {
        getRoomList({}, data => {
            console.log("ratesItem:", data)
            this.setState({
                ratesItem: data.items
            })
        }, err => {

        })
    }

    render() {
        // const {rate, rate_type, s_currency, t_currency} = this.state.ratesItem;
        const {cny_to_hkd_rate, cny_to_mop_rate} = this.state.ratesItem;
        // let t_rate = 1 / Number.parseFloat(rate);
        // t_rate = t_rate.toFixed(4);
        // let rate_type_name = rate_type === 'real_time' ? '实时汇率' : '本地汇率';
        // let rate_bg = rate_type === 'real_time' ? Images.macau.rate1 : Images.macau.rate2;
        // let target_source = `1${t_currency}=${t_rate}${s_currency}`;
        // let source_target = `1${s_currency}=${rate}${t_currency}`;
        // let login_or_local = !isEmptyObject(global.login_user) || rate_type === 'real_time';
        // if (rate_type === 'local' && isEmptyObject(global.login_user)) {
        //     target_source = '登录查看'
        // }
        if(isEmptyObject(cny_to_hkd_rate) && isEmptyObject(cny_to_mop_rate)){
            return <NoDataView/>
        }

        return (
            <View style={[ApplicationStyles.bgContainer, {backgroundColor: "white"}]}>
                <View style={styleR.page}>
                    <Text style={styleR.txt}>今日汇率：</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{`1人名币=1.2101港币，1港币=${cny_to_hkd_rate.rate}人名币`}</Text>
                        <Text>{`1人名币=1.2101澳门币，1澳门币=${cny_to_mop_rate.rate}人名币`}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    {groups.map((item) => {
                        return (
                            <View style={styles.itemPage}>
                                <Image style={{width: 44, height: 44}} source={item.img}/>
                                <Text style={{color: "#444444", fontSize: 18, marginLeft: 18}}>{item.abb}</Text>
                                <View style={{flex: 1}}/>
                                <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                                    <TextInput
                                        keyboardType={'numeric'}
                                        style={{paddingTop: 0, paddingBottom: 0}}
                                        maxLength={12}
                                        numberOfLines={1}
                                        underlineColorAndroid={'transparent'}
                                        onChangeText={txt => {

                                        }}
                                        value={phone}/>
                                    <Text style={{color: "#8C8C8C", fontSize: 14, marginTop: 6}}>{item.name}</Text>
                                </View>
                            </View>
                        )
                    })}

                </View>
            </View>
        )
    }
}

const styleR = StyleSheet.create({
    itemPage: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 23,
        paddingBottom: 21,
        marginLeft: 17,
        marginRight: 17
    },
    page: {
        paddingTop: 12,
        paddingBottom: 9,
        marginLeft: 17,
        marginRight: 17,
        flexDirection: 'row',
        backgroundColor: "#F3F3F3"
    },
    txt: {
        color: "#8C8C8C",
        fontSize: 12
    }
})