import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    ScrollView, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import LinearGradient from 'react-native-linear-gradient';

export default class SelectTimePage extends PureComponent {
    render() {
        return (
            <LinearGradient colors={['#E54A2E', '#F5F5F5', '#FFFFFF']} style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    title={"选择入住时间"}
                    toolbarStyle={{
                        backgroundColor: Colors._E54
                    }}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                <View style={styles.searchView}>

                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    searchView: {
        marginTop: 34,
        marginLeft: 14,
        marginRight: 15,
        height:294,
        backgroundColor:"#FFFFFF",
        flexDirection:"column",
        alignItems:"center"
    }

})