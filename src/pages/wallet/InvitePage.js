import React, {PureComponent, Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import {LoadingView, NoDataView} from '../../components/load';
import {getExchange_traders} from '../../services/MacauDao';
import {isEmptyObject, mul, div, formatCurrency, strNotNull} from "../../utils/ComonHelper";
import ImageLoad from "../../components/ImageLoad";

export default class InvitePage extends Component {

    state = {
        invites: []
    }

    componentDidMount() {

    };


    _renderItem = ({item, index}) => {
        const {avatar, mobile, nick_name, signature, user_id} = item
        return (
            <TouchableOpacity style={styles.pageItem}
                              onPress={() => {
                                  global.router.toUserTopicPage(item)
                              }}>

                {this.show_index(index)}

                <ImageLoad style={styles.avatar}
                           source={{uri: avatar}}/>

                <View style={{width: '50%'}}>
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
                    toolbarStyle={{background:Images.wallet.bg}}
                    title=""
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                    rightBtnIcon={Images.wallet.rule2}/>

                {/*<ScrollView>*/}
                    {/*<View style={{backgroundColor: 'white'}}>*/}
                        {/*<RateTop*/}
                            {/*type={'local'}/>*/}
                    {/*</View>*/}

                    {/*<Text style={{color: "#000000", fontSize: 14, marginTop: 17, marginLeft: 17, marginBottom: 6}}>*/}
                        {/*汇率资讯达人排行榜*/}
                    {/*</Text>*/}

                    {/*<FlatList*/}
                        {/*style={{flex: 1, backgroundColor: '#FFFFFF', paddingBottom: 50}}*/}
                        {/*data={this.state.exchange_traders}*/}
                        {/*showsHorizontalScrollIndicator={false}*/}
                        {/*renderItem={this._renderItem}*/}
                        {/*keyExtractor={(item, index) => `comment${index}`}*/}
                    {/*/>*/}
                {/*</ScrollView>*/}

            </View>
        )
    }
}

