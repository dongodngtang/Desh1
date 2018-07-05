import React, {PureComponent, Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, FlatList
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import {LoadingView, NoDataView} from '../../components/load';
import {getExchange_traders} from '../../services/MacauDao';
import {isEmptyObject, mul, div, formatCurrency, strNotNull} from "../../utils/ComonHelper";
import {RateTop} from './RatePage'
import ImageLoad from "../../components/ImageLoad";
import styles from './Styles'

export default class LocalRatePage extends Component {

    state={
        exchange_traders:[]
    }

    componentDidMount(){
        getExchange_traders(data => {
            console.log("exchange_traders:", data)

            this.setState({
                exchange_traders:data.items
            });
        }, err => {

        })
    }

    _renderItem = ({item,index}) => {
        const {avatar,mobile,nick_name,signature,user_id} = item
        return (
            <View style={styles.pageItem}>

                <Text style={styles.txt_num}>{index+1}</Text>

                <ImageLoad style={styles.avatar}
                           source={{uri: avatar}}/>

                <View>
                    <Text style={styles.txt_name}>{nick_name}</Text>
                    <Text style={[styles.txt_decs, {marginTop: 2}]}>{signature}</Text>
                </View>

                <View style={{flex: 1}}/>

                <Text style={styles.txt_decs}>联系他</Text>

                <Image style={styles.img_left}
                       source={Images.adr_right}/>

            </View>
        )
    };


    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title="本地汇率"
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <View style={{backgroundColor: 'white'}}>
                    <RateTop
                        type={'local'}/>
                </View>

                <Text style={{color: "#000000", fontSize: 14, marginTop: 17, marginLeft: 17, marginBottom: 6}}>
                    换汇推荐
                </Text>

                <FlatList
                    style={{flex: 1, backgroundColor: '#FFFFFF'}}
                    data={this.state.exchange_traders}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `comment${index}`}
                />

            </View>
        )
    }
}

