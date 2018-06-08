import React, {Component} from 'react';
import {
    ScrollView, Text, FlatList,
    StyleSheet,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {postIntegralTask,postAward} from '../../services/IntegralDao';
import {isEmptyObject} from "../../utils/ComonHelper";


const dataHosts = [
    {image: Images.integral.login},
    {image: Images.integral.tiezi},
    {image: Images.integral.jine},
    {image: Images.integral.share},
    {image: Images.integral.frends}];

export default class IntegralPage extends Component {

    state = {
        integral: []
    };

    componentDidMount() {
        postIntegralTask({}, data => {
            console.log('integral_task', data);
            this.setState({integral: data})
        })
    }


    render() {
        const {integral} = this.state;
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
                    <Text style={styles.ruleTxt1}>{isEmptyObject(this.props.params.total_points)?0:this.props.params.total_points}</Text>
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
                    {isEmptyObject(integral.items) ? <View/> : <FlatList
                        ListHeaderComponent={this._header('未完成')}
                        style={{marginRight: 17, marginLeft: 17}}
                        data={integral.items.unfinished}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => `integral${index}`}
                    />}
                    <View style={{backgroundColor: '#F3F3F3', height: 13, width: '100%'}}/>
                    {isEmptyObject(integral.items) ? <View/> : <FlatList
                        ListHeaderComponent={this._header('已完成')}
                        style={{marginRight: 17, marginLeft: 17}}
                        data={integral.items.finished}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
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

    _doingTime=(item)=>{
        const{doing_times,option_type} = item;
        postAward({option_type:option_type}, data => {

        },err=>{

        })
    }

    _renderItem = ({item, index}) => {
        if (isEmptyObject(item)) {
            return <View/>
        }
        return (
            <View style={styles.item} key={index}>
                <Image style={{height: 34, width: 34}}
                       source={Images.integral.login}/>
                <View style={{marginLeft: 14, flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#444444', fontSize: 14}}>{item.mark}</Text>
                        <Text style={{color: '#444444', fontSize: 14}}>{this._task(item)}</Text>
                    </View>
                    <Text style={{color: '#AAAAAA', fontSize: 12}}>积分+5</Text>
                </View>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    style={[styles.statusView, {backgroundColor: item.status === '领取' ? '#6CC7FF' : '#FF6B4C'}]}
                onPress={()=>{
                    this._doingTime(item)
                }}>
                    <Text style={{color: '#FFFFFF', fontSize: 14}}>领取</Text>
                </TouchableOpacity>
            </View>
        )
    };

    _task = (item) => {
        const {doing_times, total_doing_points, total_done_points, limit_times, done_times} = item;
        if (doing_times === (limit_times - done_times)) {
            return null
        } else {
            return ` (${doing_times}/${limit_times - done_times})`;
        }
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