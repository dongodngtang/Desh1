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
import {isEmptyObject, strNotNull, uShareInfoItem} from "../../utils/ComonHelper";
import LoadingView from "../../components/load/LoadingView";
import MusicPlayer from "./MusicPlayer";

export default class InfoPage extends PureComponent {
    state = {
        info: {},
        music: true
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {id} = this.props.params.info
            getInfos(id, data => {
                this.setState({
                    info: data.info
                })
                if (strNotNull(data.info.audio_link))
                    this.musicShow && this.musicShow.downloadMusic(data.info.audio_link)
            }, err => {
            })
        })


    }

    render() {
        const {info} = this.state;
        if (isEmptyObject(info)) {
            return (
                <View style={ApplicationStyles.bgContainer}>
                    <NavigationBar
                        title={title}
                        toolbarStyle={{
                            backgroundColor: Colors._E54
                        }}
                        leftBtnIcon={Images.sign_return}
                        leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                        leftBtnPress={() => router.pop()}
                    />
                </View>
            )
        }
        const {description, title, image, id, exist_coupon, audio_link,intro} = info;
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
                    uShareInfoItem(title, intro, image, id)
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
                            marginBottom:4,
                            fontWeight: 'bold'
                        }}>{title}</Text>

                    </View>


                    <RenderHtml
                        html={description}/>
                </View>
            </ScrollView>}

            {strNotNull(audio_link) ? <TouchableOpacity style={{position: 'absolute', top: 80, right: 17}}
                                                        onPress={() => {
                                                            this.setState({
                                                                music: !this.state.music
                                                            })
                                                            this.musicShow && this.musicShow.pause()
                                                        }}>
                <Image style={{
                    width: Metrics.reallySize(26),
                    height: Metrics.reallySize(26)
                }}
                       source={this.state.music ? Images.macau.bg_music : Images.macau.bg_music_close}/>
            </TouchableOpacity> : null}
            <MusicPlayer ref={ref => this.musicShow = ref} music={this.state.music}/>

            {exist_coupon ? <TouchableOpacity style={{position: 'absolute', bottom: 20, right: 17}}
                                              onPress={() => {
                                                  if (isEmptyObject(global.login_user))
                                                      global.router.toLoginFirstPage()
                                                  else
                                                      global.router.toCouponReceivePage(id,this.refresh)

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