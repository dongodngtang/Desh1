import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Platform,
    TouchableOpacity,
    Text,
} from 'react-native';
import I18n from "react-native-i18n";
import {Colors, Images, ApplicationStyles, Metrics} from "../../Themes";
import {NavigationBar, ImageLoad} from '../../components';
import ErrLocation from '../comm/ErrLocation';
import {getNearBys, postNearBys} from '../../services/SocialDao'
import {strNotNull} from '../../utils/ComonHelper'

const styles = StyleSheet.create({
    avatar: {
        height: 54,
        width: 54,
        borderRadius: 27,
        marginLeft: 17,
        marginRight: 20,
    },
    name: {
        fontSize: 15,
        color: Colors._333
    },
    time: {
        fontSize: 12,
        color: Colors._AAA
    },
    male: {
        height: 9,
        width: 9
    },
    woman: {
        height: 10,
        width: 8
    }
})

export default class NearFriend extends PureComponent {

    state = {
        geolocation: true,
        nearby_users: [{
            avatar: "https://cdn-upyun.deshpro.com/faces/e2c/807/e2c8071236d3c5b913d6f98872d0112c.jpg",
            distance: 8.757719710805624,
            gender: 2,
            nick_name: "Ricky",
            signature: "这个人很懒，什么都没写。",
            user_id: "014b58eac7cf2955a78b64393872fbda"
        }],
        refreshing: false

    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(data => {
            console.log('位置坐标：', data)
            if (Platform.OS === 'ios') {
                const {coords} = data;
                postNearBys(coords, data => {
                    console.log('更新位置', data)

                    getNearBys(ret => {
                        console.log('获取附近', ret)
                        this.setState({
                            nearby_users: ret.nearby_users
                        })
                    }, err => {
                    })
                }, err => {

                })
            }

        }, err => {
            this.setState({
                geolocation: false
            })
        })

    }


    render() {
        return <View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                barStyle={'dark-content'}
                titleStyle={{color: Colors._333}}
                toolbarStyle={{backgroundColor: 'white'}}
                title={'附近牌友'}
                leftBtnIcon={Images.social.back}
                leftImageStyle={{height: 19, width: 10, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <View style={{height: 8}}/>
            {this.state.geolocation ? <FlatList
                refreshing={this.state.refreshing}
                data={this.state.nearby_users}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => `near` + index}
                ListEmptyComponent={() => <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 100
                }}>
                    <Text>附近没有人</Text>
                </View>}
                onRefresh={() => {
                    console.log('onRefresh')
                }
                }
            /> : <ErrLocation/>}

        </View>
    }

    renderItem = ({item}) => {
        const {nick_name, gender, avatar, signature, distance} = item;
        let sex = gender === 0 ? Images.social.male : gender === 1 ? Images.social.woman : "";

        return <TouchableOpacity
            onPress={() => {
                global.router.toUserTopicPage(item)
            }}
            style={{backgroundColor: 'white'}}>
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                height: 75
            }}>
                <ImageLoad style={styles.avatar}
                           emptyBg={Images.home_avatar}
                           source={{uri: avatar}}/>

                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>{nick_name}</Text>
                        {gender === 2 ? null : <Image
                            source={sex}
                            style={gender === 0 ? styles.male : styles.woman}/>}


                    </View>

                    <Text>{this.covertTom(distance)}</Text>
                </View>

                <View style={{flex: 1}}/>


                {strNotNull(signature) ? <Text style={{
                    fontSize: 12, color: Colors._888,
                    backgroundColor: Colors._ECE, padding: 5,
                    borderRadius: 5,
                    maxHeight: 54,
                    maxWidth: 110,
                    marginRight: 17
                }}>{signature}</Text> : null}


            </View>
            <View style={{marginLeft: 91, height: 1, backgroundColor: Colors._ECE}}/>
        </TouchableOpacity>
    }

    covertTom = (distance) => {
        if (distance < 1) {
            return Number.parseInt(distance * 1000) + "m"
        }

        return Number.parseInt(distance) + "km"
    }
}