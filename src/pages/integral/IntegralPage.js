import React, {Component} from 'react';
import {
    AppRegistry,Text,
    StyleSheet,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";

export default class IntegralPage extends Component {

    render() {
        return(
            <View style={ApplicationStyles.bgContainer}>
                <View style={styles.nav}>
                    <TouchableOpacity
                        style={styles.btn_search}
                        onPress={() => {
                            router.pop()
                        }}>

                        <Image
                            style={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                            source={Images.sign_return}/>

                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                    <Text style={styles.title}>我的积分</Text>
                    <View style={{flex: 1}}/>

                    <TouchableOpacity
                        style={styles.btn_click}
                        onPress={() => {
                            global.router.toIntegralRulePage();
                        }}>
                        <Text>积分规则</Text>
                    </TouchableOpacity>


                </View>
            </View>
        )
    }

};
const styles = StyleSheet.create({
    nav: {
        height: Metrics.navBarHeight,
        width: '100%',
        backgroundColor: Colors._E54,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight
    },
    cancel: {
        fontSize: 14,
        color: Colors.white
    },
    title: {
        fontSize: 18,
        color: Colors.white
    },
    btn_search: {
        width: 50,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_click:{
        marginRight:17
    }
});