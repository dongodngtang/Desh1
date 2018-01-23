/**
 * Created by lorne on 2018/1/16
 * Function:
 * Desc:
 */
import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, FlatList,
    StyleSheet, Image, Text, Platform, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, ImageLoad, ProgressBar} from '../../components';
import IntroRecord from './IntroRecord';
import {footer} from './CrowdDetail';
import {poker_info} from '../../services/CrowdDao';
import {isEmptyObject} from '../../utils/ComonHelper';

const styles = StyleSheet.create({
    img_poker: {
        height: 200,
        width: 'auto'
    },
    view_info: {
        padding: 17,
        paddingTop: 11,
        backgroundColor: 'white'

    },
    view_info1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txt_name: {
        fontSize: 15,
        color: Colors.txt_444,
        marginBottom: 5
    },
    lb_price: {
        fontSize: 14,
        color: Colors._888
    },
    txt_price: {
        fontSize: 14,
        color: Colors._F34
    },
    view_info2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt_entry: {
        fontSize: 20,
        color: '#4990E2'
    },
    lb_entry: {
        fontSize: 12,
        color: '#4990E2',
        marginTop: 5
    },
    txt_final: {
        fontSize: 20,
        color: Colors._F34
    },
    lb_final: {
        fontSize: 12,
        color: Colors._F34,
        marginTop: 5
    },
    lb_slogan: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.txt_444
    },
    txt_slogan: {
        fontSize: 14,
        color: Colors.txt_444
    },
    view_percent: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 15
    },
    view_head: {
        backgroundColor: 'white',
        paddingTop: 14,
        marginTop: 7,
        paddingBottom: 30,
        paddingLeft: 17
    },
    img_head: {
        height: 44,
        width: 44,
        borderRadius: 22,
        marginRight: 10

    }
});

export default class PokerInfo extends PureComponent {

    state = {
        pokerInfo: {}
    };

    componentDidMount() {
        const {crowd, player} = this.props.params;
        poker_info({id: crowd.id, player_id: player.cf_player_id}, data => {
            console.log("pokerInfo:", data)
            this.setState({
                pokerInfo: data
            })
        }, err => {

        })
    }

    render() {

        const {
            cf_player_id,race_rank, ordered, player_images, name, logo, stock_unit_price, cf_money,
            stock_number, sell_stock, lairage_rate, final_rate, join_slogan, description
        } = this.state.pokerInfo;

        const {cf_total_money, cf_offer_money} = this.props.params.crowd;
        let percent = 0;
        if (cf_total_money !== 0)
            percent = cf_offer_money / cf_total_money;


        return <View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                toolbarStyle={{backgroundColor: Colors.white}}
                title={name}
                titleStyle={{color: Colors._161}}
                leftBtnIcon={Images.mall_return}
                leftImageStyle={{height: 23, width: 23, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => global.router.pop()}/>
            <ScrollView>

                {isEmptyObject(logo) ? null : <ImageLoad style={styles.img_poker}
                                                         source={{uri:logo.url}}/>}


                <View style={styles.view_info}>
                    <View style={styles.view_info1}>
                        <View>
                            <Text style={styles.txt_name}>赞助牌手：{name}</Text>
                            <Text style={styles.lb_price}>每份单价：<Text style={styles.txt_price}>{stock_unit_price}</Text></Text>
                        </View>

                        <View style={styles.view_info2}>
                            <View style={{alignItems:'center', marginRight: 10}}>
                                <Text style={styles.txt_entry}>{lairage_rate}</Text>
                                <Text style={styles.lb_entry}>进圈率</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text style={styles.txt_final}>{final_rate}</Text>
                                <Text style={styles.lb_final}>决赛率</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', marginTop: 12,
                        marginBottom: 8
                    }}>
                        <Text style={styles.lb_slogan}>口号：</Text>
                        <Text style={styles.txt_slogan}>{join_slogan}</Text>
                    </View>

                    <ProgressBar
                        backgroundStyle={{backgroundColor: Colors._ECE, borderRadius: 2}}
                        style={{width: Metrics.screenWidth - 34}}
                        initialProgress={percent}/>

                    <View style={styles.view_percent}>
                        {this.renderItem(sell_stock, '让出股份')}
                        {this.renderItem(stock_number, '股份划分')}
                        {this.renderItem(cf_money, '众筹总额')}
                    </View>
                </View>

                <View style={styles.view_head}>
                    <Text style={[styles.txt_slogan, {marginBottom: 14, alignSelf: 'center'}]}
                    >目前已有<Text
                        style={{color: Colors._F34}}>{isEmptyObject(ordered) ? '' : ordered.number}</Text>人认购</Text>

                    <FlatList
                        horizontal={true}
                        data={isEmptyObject(ordered) ?[]:ordered.users}
                        renderItem={({item}) => <ImageLoad style={styles.img_head} source={{uri: item.avatar}}/>}
                        keyExtractor={(item, index) => `buy_person${index}`}/>
                </View>

                <IntroRecord
                    description={description}
                    race_rank={race_rank}/>
            </ScrollView>

            {footer(this.props.params.crowd,'poker_info',this.state.pokerInfo,this.props.params.race)}
        </View>
    }


    renderItem = (percent, type) => {
        return <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: Colors._F34}}>{percent}</Text>
            <Text style={{fontSize: 12, color: Colors._888, marginTop: 5}}>{type}</Text>
        </View>
    }
}


