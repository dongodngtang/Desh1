import React, {Component} from 'react';
import {
    FlatList,ScrollView,
    StyleSheet,Text,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {convertDate, isEmptyObject} from "../../utils/ComonHelper";
import {NavigationBar} from '../../components';
import {postIntegralDetails} from "../../services/IntegralDao";


export default class IntegralDetailsPage extends Component {

    state = {
        details: []
    };

    componentDidMount() {
        postIntegralDetails({}, data => {
            console.log('details', data);
            this.setState({details: data})
        })
    }

    render() {
        const {details} = this.state;
        return(
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    refreshPage={this.refreshPage}
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title={'积分明细'}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <ScrollView style={styles.View}>
                    {isEmptyObject(details)?<View/>:<FlatList
                        style={{backgroundColor:'white'}}
                        data={details}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => `commodities${index}`}
                    />}
                </ScrollView>
            </View>
        )
    }
    _renderItem = ({item,index}) => {
        return (
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <Text style={{color:'#444444',fontSize:14}}>订单：3766273682368</Text>
                    <Text style={{color:'#AAAAAA',fontSize:12}}>2018-1-23 23:34</Text>
                </View>
                <View style={{flex:1}}/>
                <Text style={{color:'#34BA3C',fontSize:20,marginRight:17}}>-1000</Text>
            </View>
        )
    };
    _separator = () => {
        return <View style={{backgroundColor: '#F3F3F3', height: 2,width:'100%'}}/>
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
        marginTop:16,
        marginBottom:7,
        flexDirection:'row',

        alignItems: 'center'
    },
    itemLeft:{
        flexDirection:'column',
        marginLeft:17
    }

});