import React, {PureComponent, Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import SearchBar from "../comm/SearchBar";
import {UltimateListView, ImageLoad} from '../../components'
import I18n from "react-native-i18n";
import {LoadErrorView, NoDataView} from '../../components/load';
import {hotels, info_types, exchange_rates} from '../../services/MacauDao';
import {isEmptyObject, logMsg, strNotNull} from "../../utils/ComonHelper";
import RejectPage from "../comm/RejectPage";
import SunnaItem from './SunnaItem';
import {FoodItem} from './HotelSearch'

const sunna_data = [{
    index: 0,
    title: '金碧辉煌水疗馆',
    location: '富城路33号(富城路陆家嘴西路)',
    logo: Images.wallet.bg,
    price: 2333,
    distance: '1.4km'
}, {
    index: 1,
    title: '金碧辉煌水疗馆2',
    location: '富城路33号(富城路陆家嘴西路)',
    logo: Images.wallet.bg,
    price: 2333,
    distance: '1.4km'
}, {
    index: 2,
    title: '金碧辉煌水疗馆3',
    location: '富城路33号(富城路陆家嘴西路)',
    logo: Images.wallet.bg,
    price: 2333,
    distance: '1.4km'
}];

export default class RecreationPage extends PureComponent {
    state = {
        search: false,
        show_content: true,
        reject_problem: '',
        name_index: 0
    };

    componentDidMount() {
        let city = global.city_name;
        let index = this.state.name_index;
        if (city === '澳门') {
            index = 1;
        } else {
            index = 0;
        }
        this.setState({
            name_index: index
        })
    }

    refresh = () => {
        this.setState({
            reject_problem: ''
        });
        this.listView && this.listView.refresh();
    };

    change_content() {
        const {name_index} = this.state;
        let city = global.city_name;
        if (city === '澳门') {
            return (
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '40%',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity onPress={() => {
                        this.listView && this.listView.postRefresh([])
                        this.setState({
                            name_index: 0
                        })
                        setTimeout(() => {
                            this.refresh()
                        }, 200)

                    }}>
                        <Text
                            style={{
                                fontSize: name_index === 0 ? 18 : 14,
                                color: name_index === 0 ? 'white' : '#FFCACA'
                            }}>休闲娱乐</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.listView && this.listView.postRefresh([])
                        this.setState({
                            name_index: 1
                        });
                        setTimeout(() => {
                            this.refresh()
                        }, 200)
                    }}>
                        <Text
                            style={{
                                fontSize: name_index === 1 ? 18 : 14,
                                color: name_index === 1 ? 'white' : '#FFCACA'
                            }}>桑拿水疗</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <Text style={[styles.title,{alignSelf:'center'}]}>{'休闲娱乐'}</Text>
            )
        }

    }

    render() {
        const {name, type} = this.props.params.item;
        if (this.state.reject_problem === 'NETWORK_ERROR') {
            return (
                <View style={ApplicationStyles.bgContainer}>
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

                            }}/> : this.change_content()}
                        <View style={{flex: 1}}/>
                        <TouchableOpacity
                            style={styles.btn_search}
                            onPress={() => {
                                this.setState({
                                    search: !this.state.search
                                })
                                this.keyword = undefined;
                                this.listView && this.listView.refresh()
                            }}>
                            {this.state.search ? <Text style={styles.cancel}>取消</Text> : <Image
                                style={styles.img_search}
                                source={Images.macau.search}/>}

                        </TouchableOpacity>
                    </View>

                    <RejectPage refresh={this.refresh}/>
                </View>
            )
        }
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

                    }}/> : this.change_content()}
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    style={styles.btn_search}
                    onPress={() => {
                        this.setState({
                            search: !this.state.search
                        })
                        this.keyword = undefined;
                        this.listView && this.listView.refresh()
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
        return <View style={{height: 5}}/>
    };


    item_view = (item, index) => {
        if (this.state.name_index === 1) {
            return <SunnaItem
                key={`${index}sanna`}
                item={item}/>
        } else if (this.state.name_index === 0) {
            return <FoodItem
                key={`recreation${index}`}
                item={item}
                refresh={() => {
                    this.listView.refresh()
                }}/>
        }
    };

    onFetch_forSunna = (page = 1, startFetch, abortFetch) => {
        try {
            startFetch(sunna_data, 18)
        } catch (err) {
            console.log(err)
            abortFetch()
        }
    };

    onFetch_forEn = (page = 1, startFetch, abortFetch) => {
        const {type} = this.props.params.item;
        info_types({
                page, page_size: 20, keyword: this.keyword, type
            },
            data => {
                startFetch(data.items, 18)
            }, err => {
                logMsg("reject:", err)
                this.setState({
                    reject_problem: err.problem
                })
                abortFetch()
            }
        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            if (this.state.name_index === 1) {
                this.onFetch_forSunna(page, startFetch, abortFetch)
            } else if (this.state.name_index === 0) {
                this.onFetch_forEn(page, startFetch, abortFetch);
            }
        } catch (err) {
            console.log(err)
            abortFetch()
        }
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