import React, {Component} from 'react';
import {
    ScrollView, Text, FlatList,
    StyleSheet,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {postIntegralTask, postAward} from '../../services/IntegralDao';
import {isEmptyObject} from "../../utils/ComonHelper";
import {getProfile} from "../../services/AccountDao";
import {ImageLoad} from '../../components'


export default class IntegralPage extends Component {

    constructor(props) {
        super(props)


        this.action = "";
        this.background = "";
        this.unfinished = [];


        this.state = {
            unfinished: this.unfinished,
            finished: [],
            total_points: 0
        };
    }


    componentDidMount() {
        this.refresh()
    }

    refresh = () => {
        postIntegralTask({}, data => {
            this.setState({
                unfinished: data.items.unfinished,
                finished: data.items.finished
            })

        });

        getProfile('', data => {
            console.log(data)
            this.setState({
                total_points: data.total_points
            })

        }, err => {
        })

    }


    render() {
        const {unfinished, finished, total_points} = this.state;

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
                    <Text style={styles.title}>我的积分</Text>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity
                        onPress={() => {
                            global.router.toIntegralDetailsPage();
                        }}>
                        <Text style={styles.btn_click}>积分明细</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.ruleView}>
                    <View style={{width: 50}}/>
                    <View style={{flex: 1}}/>
                    <Text
                        style={styles.ruleTxt1}>{total_points}</Text>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity
                        style={{marginRight: 17}}
                        onPress={() => {
                            global.router.toIntegralRulePage();
                        }}>
                        <Text style={styles.ruleTxt2}>！积分规则</Text>
                    </TouchableOpacity>

                </View>

                <ScrollView style={{backgroundColor: 'white'}}>
                    <View style={{backgroundColor: '#F3F3F3', height: 14, width: '100%'}}/>
                    {isEmptyObject(unfinished) ? null : <FlatList
                        ListHeaderComponent={this._header('未完成')}
                        style={{marginRight: 17, marginLeft: 17}}
                        data={unfinished}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={item => this._renderItem(item, 'unfinished')}
                        keyExtractor={(item, index) => `integral${index}`}
                    />}
                    <View style={{backgroundColor: '#F3F3F3', height: 13, width: '100%'}}/>
                    {isEmptyObject(finished) ? null : <FlatList
                        ListHeaderComponent={this._header('已完成')}
                        style={{marginRight: 17, marginLeft: 17}}
                        data={finished}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={item => this._renderItem(item, 'finished')}
                        keyExtractor={(item, index) => `integral${index}`}
                    />}
                </ScrollView>

            </View>
        )
    }


    _header = (status) => {
        return (
            <View style={[styles.head, {borderBottomWidth: 1.5, borderColor: '#F3F3F3'}]}>
                <Image style={{height: 24, width: 24}}
                       source={Images.integral.renwu}/>
                <Text style={{color: '#444444', fontSize: 16, marginLeft: 10}}>{status}</Text>
            </View>
        )
    };

    _doingTime = (item) => {
        const {doing_times, option_type} = item;
        postAward({option_type: option_type}, data => {
            this.refresh()
        }, err => {

        })
    };

    _action = (item) => {
        let action = '';
        const {doing_times, done_times, total_doing_points, mark, limit_times} = item;
        if (done_times === limit_times) {
            action = '已完成'
        } else if (doing_times > 0 && done_times < limit_times) {
            action = "领取"
        } else if (doing_times === 0 && done_times < limit_times) {
            action = "未完成"
        }
        return action;

    };

    _background = (item) => {
        let action = this._action(item);
        if (action === '领取') {
            return '#6CC7FF'
        } else if (action === '未完成') {
            return '#FF6B4C'
        } else {
            return "#D9D9D9"
        }
    };

    _renderItem = ({item, index}, type) => {
        if (isEmptyObject(item)) {
            return <View/>
        }
        const {doing_times, done_times, total_doing_points, mark, limit_times, total_done_points} = item;

        let unfinished = doing_times > 0 && total_doing_points > 0 ?
            <Text style={{
                color: '#AAAAAA',
                fontSize: 12
            }}>积分+{total_doing_points}</Text> : null;


        let finished = total_done_points > 0 ? <Text style={{
            color: '#AAAAAA',
            fontSize: 12
        }}>积分+{total_done_points}</Text> : null;


        let internal = type === 'finished' ? finished : unfinished;

        return (
            <View style={styles.item} key={type + index}>
                <ImageLoad style={{height: 34, width: 34}}
                       source={{uri:item.icon}}
                           emptyBg={Images.integral.tiezi}/>
                <View style={{marginLeft: 14, flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#444444', fontSize: 14}}>{mark}</Text>
                        {type === 'unfinished' ?
                            <Text style={{color: '#444444', fontSize: 14}}>{this._task(item, type)}</Text> : null}

                    </View>

                    {internal}

                </View>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    activeOpacity={this.action === "领取" ? 0 : 1}
                    style={[styles.statusView, {backgroundColor: this._background(item)}]}
                    onPress={() => {
                        if (type === 'unfinished')
                            this._doingTime(item)
                    }}>
                    <Text style={{color: '#FFFFFF', fontSize: 14}}>{this._action(item)}</Text>
                </TouchableOpacity>
            </View>
        )
    };

    _task = (item, type) => {
        const {limit_times, doing_times, done_times} = item;

        return type === 'unfinished' && done_times === limit_times ? '' : ` (${doing_times + done_times}/${limit_times})`
    }
    _separator = () => {
        return <View style={{backgroundColor: '#F3F3F3', height: 1.5}}/>
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
    View1: {
        flexDirection: 'row',
        alignItems: 'center'
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
    btn_click: {
        marginRight: 17,
        color: '#FFFFFF', fontSize: 14
    },
    ruleView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors._E54,
        width: '100%',
        paddingTop: 14,
        paddingBottom: 18
    },
    ruleTxt1: {
        color: '#FFFFFF',
        fontSize: 30
    },
    ruleTxt2: {
        color: '#FFFFFF',
        fontSize: 12
    },
    head: {
        height: 47,
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        marginTop: 12,
        marginBottom: 13,
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusView: {
        width: 68, height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }


});