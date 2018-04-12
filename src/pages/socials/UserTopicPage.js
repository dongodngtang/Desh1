import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView, Platform
} from 'react-native';
import {Images, ApplicationStyles, Metrics, Colors} from "../../Themes";
import I18n from "react-native-i18n";
import {NavigationBar} from '../../components';
import PersonDynamicPage from '../comment/PersonDynamicPage'
import {visit_other, follow} from '../../services/SocialDao';
import _ from 'lodash';
import Loading from "../../components/Loading";
import {isFollowed} from '../../utils/ComonHelper'

const styles = StyleSheet.create({
    topBar: {
        width: Metrics.screenWidth,
        alignItems: 'center',
        backgroundColor: Colors._161,
        height: 280
    },
    person1: {
        width: 74,
        height: 74,
        borderRadius: 37,
        backgroundColor: '#FFE9AD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 6
    },
    follow: {
        color: Colors._CCC,
        fontSize: 14
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        height: 12, width: 1, backgroundColor: '#979797',
        marginLeft: 9, marginRight: 9
    },
    intro: {
        fontSize: 12,
        color: Colors._AAA,
        marginTop: 7
    },
    btn_follow: {
        height: 28,
        width: 120,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#979797',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default class UserTopicPage extends PureComponent {

    state = {
        scrollEnabled: true,
        follow: isFollowed(this.props.params.userInfo.user_id)
    };

    //私信
    visitChat = () => {
        ///未登录先登录
        if (login_user.user_id === undefined) {
            router.toLoginFirstPage();
            return;
        }

        this.loading && this.loading.open();
        console.log("点击了按钮");

        const {nick_name, user_id} = this.props.params.userInfo;
        ///获取私信用户的用户名
        visit_other({userId: user_id}, (success) => {
            this.loading && this.loading.close();
            router.toMessageList({username: success.username, nickName: nick_name});
        }, (error) => {
            console.log(error);
        });
    };


    render() {

        const {avatar, nick_name, signature, user_id} = this.props.params.userInfo;
        return <ScrollView style={{flex: 1}}>
            <View style={styles.topBar}>
                <Image
                    style={{position: 'absolute', height: 280, width: '100%'}}
                    source={Images.social.user_topic}/>

                <NavigationBar
                    barStyle={'light-content'}
                    rightBtnIcon={Images.social.more_4}
                    rightImageStyle={{height: 4, width: 20, marginLeft: 20, marginRight: 20}}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                <View
                    style={styles.person1}>
                    <Image
                        defaultSource={Images.home_avatar}
                        style={{width: 72, height: 72, borderRadius: 36}}
                        source={{uri: avatar}}/>
                </View>

                <Text style={styles.name}>{nick_name}</Text>

                <View style={[styles.row, {marginTop: 7}]}>
                    <Text style={styles.follow}>关注 2000</Text>
                    <View style={styles.line}/>
                    <Text style={styles.follow}>粉丝 2000</Text>
                </View>

                <Text style={styles.intro}>{_.isEmpty(signature) ? '简介：这家伙很懒' : signature}</Text>


                <View style={[styles.row, {marginTop: 17, marginBottom: 17}]}>
                    <TouchableOpacity
                        onPress={() => {
                            follow(this.state.follow, {target_id: user_id}, data => {
                                this.setState({
                                    follow: !this.state.follow
                                })
                            }, err => {
                            })
                        }}
                        style={[styles.btn_follow, {marginRight: 26}]}>
                        <Text
                            style={styles.follow}>{this.state.follow ? I18n.t('rank_focused') : I18n.t('rank_focus')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn_follow, styles.row]} onPress={() => this.visitChat()}>
                        <Image style={{height: 14, width: 15, marginRight: 3}}
                               source={Images.social.reply}
                        />
                        <Text style={styles.follow}>私信</Text>
                    </TouchableOpacity>
                </View>


            </View>

            <PersonDynamicPage
                params={this.props.params}/>


            <Loading ref={ref => this.loading = ref} cancelable={true}/>


        </ScrollView>
    }
}