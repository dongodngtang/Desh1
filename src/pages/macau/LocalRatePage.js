import React, {PureComponent, Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, FlatList,ScrollView
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
    };

    show_index=(index)=>{
        if(index === 0){
            return <Image style={{width:18,height:25}} source={Images.one1}/>
        }else if(index === 1){
            return <Image style={{width:18,height:25}} source={Images.two}/>
        }else if(index === 2){
            return <Image style={{width:18,height:25}} source={Images.three}/>
        }else{
            return <Text style={[styles.txt_num,{width:25}]}>{index+1}</Text>
        }
    }

    _renderItem = ({item,index}) => {
        const {avatar,mobile,nick_name,signature,user_id} = item
        return (
            <TouchableOpacity style={styles.pageItem}
            onPress={()=>{
                global.router.toUserTopicPage(item)
            }}>

                <Text style={[styles.txt_num,{width:25}]}>{this.show_index(index)}</Text>

                <ImageLoad style={styles.avatar}
                           source={{uri: avatar}}/>

                <View style={{width:'50%'}}>
                    <Text style={styles.txt_name}>{nick_name}</Text>
                    <Text style={[styles.txt_decs, {marginTop: 2}]}>{signature}</Text>
                </View>

                <View style={{flex: 1}}/>

                <Text style={styles.txt_decs}>联系他</Text>

                <Image style={styles.img_left}
                       source={Images.adr_right}/>

            </TouchableOpacity>
        )
    };


    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title="澳门本地汇率参考"
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <ScrollView>
                    <View style={{backgroundColor: 'white'}}>
                        <RateTop
                            type={'local'}/>
                    </View>

                    <Text style={{color: "#000000", fontSize: 14, marginTop: 17, marginLeft: 17, marginBottom: 6}}>
                        汇率资讯达人排行榜
                    </Text>

                    <FlatList
                        style={{flex: 1, backgroundColor: '#FFFFFF',paddingBottom:50}}
                        data={this.state.exchange_traders}
                        showsHorizontalScrollIndicator={false}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => `comment${index}`}
                    />
                </ScrollView>

            </View>
        )
    }
}

