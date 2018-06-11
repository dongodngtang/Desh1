import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import SearchBar from './SearchBar';
import TimeSpecificationInfo from './TimeSpecificationInfo';


export default class HotelListPage extends PureComponent {

    state = {
        timeShow: false
    };

    showSpecInfo = (temp) => {
        this.setState({
            timeShow: !this.state.timeShow
        })
    };

    componentDidMount() {

    }


    render() {
        const {timeShow} = this.state;
        return (<View style={{flex: 1}}>
            <SearchBar
                showSpecInfo={this.showSpecInfo}/>

            {timeShow ? <TimeSpecificationInfo
                showSpecInfo={this.showSpecInfo}/> : null}

        </View>)
    }


}

