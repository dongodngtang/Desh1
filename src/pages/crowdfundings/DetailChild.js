/**
 * Created by lorne on 2018/1/9
 * Function:
 * Desc:
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, StatusBar,
    StyleSheet, Image, Text, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {ImageLoad, ProgressBar, MarkdownPlat} from '../../components';
import moment from 'moment';
import {isEmptyObject} from '../../utils/ComonHelper';
import {crowd_detail} from '../../services/CrowdDao';

const styles = StyleSheet.create({
    cover: {
        height: 170,
        width: '100%'
    },
    txtName: {
        color: Colors._333,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 'bold',
        marginTop: 8,
        flex: 1
    },
    txtTime: {
        fontSize: 12,
        color: Colors._666,
        marginTop: 5
    },
    txtRed: {
        fontSize: 18,
        color: Colors._F34,
        fontWeight: 'bold',
        lineHeight: 25
    },
    txtCrowd: {
        fontSize: 12,
        color: Colors._888,
        lineHeight: 17
    },
    txtSelect: {
        fontSize: 15,
        color: Colors._AAA,
        fontWeight: 'bold',
        lineHeight: 21
    },
    txtSelected: {
        fontSize: 15,
        color: Colors.txt_444,
        fontWeight: 'bold',
        lineHeight: 21
    },
    lineSelected: {
        height: 3,
        width: 60,
        backgroundColor: Colors._F34,
        marginTop: 3
    },
    tabView: {
        width: '100%', height: 50, flexDirection: 'row',
        borderTopWidth: 1, borderTopColor: Colors._ECE
    },
    tabFloatView: {
        width: '100%', height: 50, flexDirection: 'row',
        borderTopWidth: 1, borderTopColor: Colors._ECE,
        position: 'absolute', top: 0, backgroundColor: 'white',
        zIndex: 9
    },
    btnReport: {
        borderWidth: 1,
        borderColor: Colors._F34,
        borderRadius: 2,
        flexDirection: 'row',
        height: 23,
        alignItems: 'center',
        paddingRight: 5,
        paddingLeft: 5,
        marginTop: 10
    },
    txtReport: {
        fontSize: 12,
        color: Colors._F34
    }
});

export default class DetailChild extends Component {


    state = {
        floatTabView: false,
        tabIndex: 0,
        crowd:{}
    };
    componentDidMount() {
        const {id} = this.props.info;
        crowd_detail({id: id}, data => {
            console.log('crowd_detail', data)
            this.setState({
                crowd: data
            })
        }, err => {

        })
    }

    onScroll = (event) => {
        const offsetHeight = 400;
        let offsetY = event.nativeEvent.contentOffset.y;

        this.setState({
            floatTabView: offsetY >= offsetHeight
        })
    };

    race_time = (race) => {
        const {begin_date, end_date} = race;
        return moment(begin_date).format('YYYY.MM.DD') + '-' + moment(end_date).format('YYYY.MM.DD')
    };

    render() {
        const {master_image, race, cf_total_money, cf_offer_money, mark_desc, cf_cond} = this.props.info;
        const {categories} = this.state.crowd;
        let percent = cf_offer_money / cf_total_money;
        return <View style={{backgroundColor: 'white'}}>
            {this.state.floatTabView ? this.renderTabView(styles.tabFloatView) : null}
            <ScrollView
                scrollEventThrottle={10}
                onScroll={this.onScroll}>
                <ImageLoad style={styles.cover}
                           source={{uri: master_image}}/>
                <View style={{marginLeft: 17, marginRight: 17}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.txtName}>{race.name}</Text>

                        <View style={styles.btnReport}>
                            <Text style={styles.txtReport}>及时赛报</Text>
                        </View>
                    </View>

                    <Text style={styles.txtTime}>{`入赛资格：¥${cf_cond}  ${this.race_time(race)}`}</Text>
                    <Text style={styles.txtTime}>地点：{race.location}</Text>
                    <ProgressBar
                        backgroundStyle={{backgroundColor: Colors._ECE, borderRadius: 2}}
                        style={{width: Metrics.screenWidth - 34}}
                        initialProgress={percent}/>

                    <View style={{width: '100%', height: 70, flexDirection: 'row'}}>
                        {this.renderTotal('5人', '选手人数')}
                        {this.renderTotal(cf_total_money + '万', '赞助总额')}
                        {this.renderTotal(cf_offer_money + '万', '认购金额')}
                    </View>
                </View>

                {this.renderTabView(categories, styles.tabView)}

                <View style={{height: 10, width: '100%', backgroundColor: Colors._ECE}}/>

                {this.state.tabIndex === 0 ? <MarkdownPlat
                        markdownStr={mark_desc}/> :
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>开发中...</Text>
                    </View>}

                <View style={{height: 100}}/>

            </ScrollView>
        </View>


    }

    renderTabView = (categories, tabView) => {
        return <View style={tabView}>
            {isEmptyObject(categories) ? null : categories.map((item,key) => {
                    this.renderTab(key, item.name)
            })}
        </View>
    };

    renderTab = (tabIndex, name) => {
        return <TouchableOpacity
            onPress={() => {
                this.setState({tabIndex})
            }}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={this.state.tabIndex === tabIndex ? styles.txtSelected : styles.txtSelect}>{name}</Text>
            {this.state.tabIndex === tabIndex ? <View style={styles.lineSelected}/> : null}
        </TouchableOpacity>
    };

    renderTotal = (number, label) => {
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.txtRed}>{number}</Text>
            <Text style={styles.txtCrowd}>{label}</Text>
        </View>
    }
}