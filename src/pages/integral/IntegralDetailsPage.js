import React, {Component} from 'react';
import {
    FlatList,ScrollView,
    StyleSheet,Text,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {isEmptyObject} from "../../utils/ComonHelper";
const dataHosts = [1,2,3,4,5];


export default class IntegralDetailsPage extends Component {

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
                    <Text style={styles.title}>积分明细</Text>
                    <View style={{flex: 1}}/>
                </View>

                <ScrollView style={styles.View}>
                    <FlatList
                        data={dataHosts}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => `commodities${index}`}
                    />
                </ScrollView>
            </View>
        )
    }
    _renderItem = ({item,index}) => {
        return (
            <View style={styles.item}>
                <View style={styles.itemLeft}>

                </View>
                <View style={{flex:1}}/>

            </View>
        )
    };
    _separator = () => {
        return <View style={{backgroundColor: '#F3F3F3', height: 3,width:'100%'}}/>
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
    View:{
        marginTop:7,
        width:'100%'
    },
    item:{
        height:56,
        backgroundColor:'white',
        alignItems: 'center'
    },
    itemLeft:{
        flexDirection:'column',
        marginLeft:17
    },
    txt:{
        color:'#34BA3C',
        fontSize:20,
        marginRight:17
    }

});