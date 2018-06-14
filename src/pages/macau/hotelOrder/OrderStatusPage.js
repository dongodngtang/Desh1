import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {NavigationBar} from '../../../components';
import ImageLoad from "../../../components/ImageLoad";
import {isEmptyObject, showToast} from "../../../utils/ComonHelper";


export default class HotelItem extends PureComponent {
    state = {};


    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>

                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title="待入住"
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

            </View>
        )
    }
}


const styles = StyleSheet.create({

})