import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    ScrollView, FlatList
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import TimeSpecificationInfo from './TimeSpecificationInfo';
import {convertDate} from '../../utils/ComonHelper';

export default class SelectTimePage extends PureComponent {
    state = {
        timeShow: false,
        begin_date: "",
        end_date: ""
    };

    showSpecInfo = (temp) => {
        this.setState({
            timeShow: !this.state.timeShow
        })
    };
    _begin_date = (date) => {
        this.setState({
            begin_date: date
        })
    };

    _end_date = (date) => {
        this.setState({
            end_date: date
        })
    };

    render() {
        const {timeShow, begin_date, end_date} = this.state;
        return (
            <LinearGradient colors={['#E54A2E', '#F5F5F5', '#FFFFFF']} style={ApplicationStyles.bgContainer}>

                <NavigationBar
                    title={"选择入住时间"}
                    toolbarStyle={{}}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                <View style={styles.searchView}>
                    <Text style={styles.location}>位置：澳门</Text>
                    {this._line()}
                    <TouchableOpacity style={styles.selectTime}
                                      onPress={() => {
                                          this.showSpecInfo()
                                      }}>
                        <Text style={styles.txt1}>{convertDate(new Date(), 'M月DD日')}<Text
                            style={styles.txt2}>今日入住</Text></Text>
                        <Text style={[styles.txt1, {marginLeft: 15}]}>6月13日<Text style={styles.txt2}>周三离店</Text></Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.txt2}>共9晚</Text>
                        <Image style={styles.image} source={Images.is}/>
                    </TouchableOpacity>
                    {this._line()}
                    <TouchableOpacity style={styles.search}
                                      onPress={() => {
                                          router.toHotelListPage()
                                      }}>
                        <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>开始搜索</Text>
                    </TouchableOpacity>
                </View>

                {timeShow ? <TimeSpecificationInfo
                    showSpecInfo={this.showSpecInfo}
                    _begin_date={this._begin_date}
                    _end_date={this._end_date}/> : null}

            </LinearGradient>
        );
    }

    _line = () => {
        return (
            <View style={{backgroundColor: "#F3F3F3", height: 1, width: '90%'}}/>
        )
    }

}

const styles = StyleSheet.create({
    searchView: {
        marginTop: 34,
        marginLeft: 14,
        marginRight: 15,
        height: 294,
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 3,
        shadowOffset: {width: 2, height: 2},
        shadowColor: '#E54A2E',
        shadowOpacity: 0.6,
        shadowRadius: 5
    },
    location: {
        color: '#E54A2E',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 35,
        marginBottom: 27
    },
    search: {
        width: '90%',
        height: 42,
        marginLeft: 17,
        marginRight: 17,
        backgroundColor: "#F96348",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 43,
        borderRadius: 3,
        shadowColor: '#F96348',
        shadowOpacity: 0.5,
        shadowOffset: {width: 2, height: 2}
    },
    selectTime: {
        flexDirection: "row",
        marginLeft: 17,
        marginRight: 17,
        alignItems: 'flex-end',
        paddingTop: 30,
        paddingBottom: 30
    },
    image: {
        width: 10,
        height: 20,
        marginLeft: 9
    },
    txt1: {
        color: "#444444",
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 3
    },
    txt2: {
        color: "#444444",
        fontSize: 10
    }


})