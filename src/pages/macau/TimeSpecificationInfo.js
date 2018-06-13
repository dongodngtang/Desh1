import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    ScrollView, FlatList
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import {isEmptyObject, convertDate} from "../../utils/ComonHelper";
import I18n from "react-native-i18n";
import * as Animatable from 'react-native-animatable';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales.en = LocaleConfig.locales[''];
LocaleConfig.locales.fr = {
    monthNames: [
        '二月',
        '一月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
        '一月',
    ],
    monthNamesShort: [
        '二月',
        '一月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
        '一月',
    ],
    dayNames: [
        '日',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
    ],
    dayNamesShort: ['日',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',]
};

LocaleConfig.defaultLocale = 'fr';

export default class TimeSpecificationInfo extends PureComponent {

    state = {
        firstDay: "",
        lastDay: ""
    };

    componentDidMount() {
        this.setState({
            firstDay: convertDate(new Date(), 'YYYY-MM-DD')
        })
    }

    _getDay = (num, str) => {
        let today = new Date();
        let nowTime = today.getTime();
        let ms = 24 * 3600 * 1000 * num;
        today.setTime(parseInt(nowTime + ms));
        let oYear = today.getFullYear();
        let oMoth = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1) oMoth = '0' + oMoth;
        let oDay = today.getDate().toString();
        if (oDay.length <= 1) oDay = '0' + oDay;
        return oYear + str + oMoth + str + oDay;
    };

    render() {
        let onClickTime = 0;
        const {firstDay, lastDay} = this.state;
        const {showSpecInfo, begin_date, end_date} = this.props;
        let date = convertDate(new Date(), 'YYYY-MM-DD');
        return (
            <Animatable.View
                duration={300}
                animation={'fadeInUp'}
                style={styles.page}>
                <TouchableOpacity
                    style={{height: 146, width: '100%'}}
                    onPress={() => {
                        this.props.showSpecInfo()
                    }}>

                </TouchableOpacity>
                <View style={styles.View}>
                    <Calendar
                        current={date}
                        minDate={date}
                        maxDate={this._getDay(3, '-')}
                        onDayPress={(day) => {
                            let timestamp = Date.parse(new Date());
                            timestamp = timestamp / 1000;
                            if (onClickTime > 2) {
                                onClickTime = 0
                            }
                            ++onClickTime;
                            if (day.timestamp > timestamp) {
                                this.setState({
                                    lastDay: day
                                })
                            } else {
                                this.setState({
                                    firstDay: day
                                })
                            }
                        }}
                        markedDates={
                            {
                                firstDay: {startingDay: true, color: 'ren'},
                                lastDay: {selected: true, endingDay: true, color: 'red', textColor: 'blue'}
                            }}
                        markingType={'period'}
                        theme={{
                            selectedDayBackgroundColor: '#E94D49',
                            selectedDayTextColor: '#fff',
                        }}
                    />
                </View>
            </Animatable.View>
        );
    }


}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999
    },
    View: {
        flex: 1,
        backgroundColor: 'white',
        left: 0,
        right: 0,
        bottom: 0
    }


})