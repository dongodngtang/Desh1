/**
 * Created by lorne on 2018/5/13
 * Function:
 * Desc:
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    ScrollView, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import RenderHtml from '../comm/RenderHtml';
import {getInfos} from '../../services/MacauDao'
import {isEmptyObject, uShareInfoItem} from "../../utils/ComonHelper";
import LoadingView from "../../components/load/LoadingView";

export default class InfoPage extends PureComponent {
    state = {
        info: {}
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {id} = this.props.params.info
            getInfos(id, data => {
                this.setState({
                    info: data.info
                })
            }, err => {
            })
        })


    }

    render() {

        const {description, title, image, id, exist_coupon} = this.state.info;

        return <View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                title={title}
                toolbarStyle={{
                    backgroundColor: Colors._E54
                }}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}
                rightBtnIcon={Images.share2}
                rightImageStyle={{height: 20, width: 19, marginLeft: 20, marginRight: 20}}
                rightBtnPress={() => {
                    uShareInfoItem(title, description, image, id)
                }}/>

            {isEmptyObject(description) ? <LoadingView/> : <ScrollView>
                <View style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    paddingLeft: 17,
                    paddingRight: 17,
                    paddingBottom: 70
                }}>

                    <View style={{width: '100%'}}>
                        <Text style={{
                            fontSize: 17,
                            color: Colors.txt_444,
                            marginTop: 12,
                            fontWeight: 'bold'
                        }}>{title}</Text>

                    </View>


                    <RenderHtml
                        html={description}/>
                </View>
            </ScrollView>}


            {exist_coupon ? <TouchableOpacity style={{position: 'absolute', bottom: 20, right: 17}}
                                              onPress={() => {
                                                  global.router.toCouponReceivePage()
                                              }}>
                <Image style={{
                    width: Metrics.reallySize(54),
                    height: Metrics.reallySize(54)
                }}
                       source={Images.coupon.croup_receive}/>
            </TouchableOpacity> : null}


        </View>
    }
}