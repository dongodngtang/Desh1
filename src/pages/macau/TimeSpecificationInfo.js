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
import moment from 'moment'

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


    constructor(props) {
        super(props)

        let date = convertDate(new Date(), 'YYYY-MM-DD');
        this.minDate = date;

        this.markedArr = [];

        this.state = {
            calendarProps: {}
        }

    }

    nDayPress = (day) => {


        let dateString = day.dateString;


        if (this.markedArr.length < 2) {

            let markedDates = {}
            let props = {}
            //第一次选择
            if (this.markedArr.length === 0) {
                this.markedArr.push(dateString)
                markedDates[dateString] = {
                    selected: true
                }

                props = {
                    markedDates
                }

            } else {//第二次选择
                this.markedArr.push(dateString)
                let start = new Date(this.markedArr[0])
                let end = new Date(this.markedArr[1])
                let seleactDatas = [];
                if (start <= end) {
                    seleactDatas = getDates(start, end)
                } else {
                    seleactDatas = getDates(end, start)
                }
                seleactDatas.forEach((item, index, arr) => {
                    if (index === 0) {
                        markedDates[item] = {startingDay: true, color: '#6EA240'};
                        return;
                    }
                    if (index === arr.length - 1) {
                        markedDates[item] = {endingDay: true, color: '#6EA240'};
                        return;
                    }

                    markedDates[item] = {color: '#6EA240'};
                })

                props = {
                    markedDates,
                    markingType:'period'
                }


            }

            console.log(markedDates)

            this.setState({
                calendarProps: props
            })


        } else {
            this.markedDates = {}
            this.markedArr = [];
            this.nDayPress(day)
        }

    }


    render() {
        let onClickTime = 0;

        const {showSpecInfo, begin_date, end_date} = this.props;

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
                        displayLoadingIndicator
                        minDate={this.minDate}
                        onDayPress={this.nDayPress}
                        monthFormat={'yyyy MM'}
                        firstDay={1}
                        {...this.state.calendarProps}
                        // markedDates={{
                        //     '2018-06-19': {startingDay: true, color: 'green'},
                        //     '2018-06-20': {
                        //         color: 'green'
                        //     },
                        //     '2018-06-21': {
                        //         color: 'green'
                        //     },
                        //     '2018-06-22': {selected: true, endingDay: true, color: 'green', textColor: 'white'},
                        // }}
                    />
                </View>
            </Animatable.View>
        );
    }


}


getDates = (startDate, stopDate) => {
    console.log(startDate, stopDate)
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(convertDate(currentDate, 'YYYY-MM-DD'));
        currentDate = moment(currentDate).add(1, 'days')
    }
    console.log(dateArray)
    return dateArray;
}

addDays = (dat, days) => {

    dat.setDate(dat.getDate() + days);
    return dat;
};

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