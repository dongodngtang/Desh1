import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {} from '../../services/IntegralDao';
import IntegralBar from './IntegralBar';

export default class IntegralMallPage extends PureComponent {

    state = {

    };

    componentDidMount() {

    }

    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>
                <IntegralBar text={'积分商城'}/>
            </View>
        )
    }


}

const styles = StyleSheet.create({

})
