import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    ScrollView, FlatList
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import {isEmptyObject} from "../../utils/ComonHelper";
import I18n from "react-native-i18n";
import * as Animatable from 'react-native-animatable';

export default class TimeSpecificationInfo extends PureComponent {


    render() {
        const {showSpecInfo} = this.props;
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
        backgroundColor: 'white',
        left: 0,
        right: 0,
        bottom: 0
    }


})