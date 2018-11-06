import React, {PureComponent} from 'react';
import {
    View, Text, Alert,
    Image, StyleSheet,
    TouchableOpacity, ImageBackground
} from 'react-native';
import {ApplicationStyles, Images, Colors, Metrics} from '../../Themes';
import {getPosition, isEmptyObject, logMsg} from "../../utils/ComonHelper";
import {getApiType} from "../../services/RequestHelper";
import {locations} from "../../services/SocialDao";

export default class HotCatalogs extends PureComponent {

    state = {
        isMacau: false
    };

    componentDidMount() {

        getPosition(data=>{
            const {longitude, latitude} = data;
            let body = {
                longitude: longitude,
                latitude: latitude
            }
            locations(body, data => {
                let city_name = data.base.city_name
                if(getApiType()=== 'test')
                    alert('定位城市：'+city_name)
                if(city_name && city_name.indexOf('澳门')!== -1){
                    this.setState({
                        isMacau:true
                    })
                    this.refresh()

                }
            }, err => {
                console.log("获取位置失败");
            })
        },err=>{
            alert('获取定位失败')
        })
    }

    render() {
        return (
            <View style={styles.hotView}>
                <View style={styles.viewLeft}>
                    <TouchableOpacity onPress={() => {
                        global.router.toSelectTimePage();
                    }}>
                        <ImageBackground style={styles.leftTop}
                                         source={Images.navigation2.hotel_bg}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        global.router.toRatePage();
                    }}>
                        <ImageBackground style={[styles.leftBottom, {marginTop: 4}]}
                                         source={Images.navigation2.rate_bg}/>
                    </TouchableOpacity>

                </View>
                <View style={styles.viewRight}>
                    <TouchableOpacity onPress={() => {
                        global.router.toHotelSearch({
                            name: '美食',
                            type: 'cate',
                            size: {height: 35, width: 34},
                            icon: Images.macau.food
                        })
                    }}>
                        <ImageBackground style={styles.leftBottom}
                                         source={Images.navigation2.info_ng}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {

                        if (this.state.isMacau) {
                            global.router.toRecreationPage({
                                name: '娱乐',
                                type: 'recreation',
                                size: {height: 34, width: 36},
                                icon: Images.macau.entertainment
                            });
                        } else {
                            global.router.toHotelSearch({
                                name: '休闲娱乐',
                                type: 'recreation',
                                size: {height: 34, width: 36},
                                icon: Images.macau.entertainment
                            })
                        }

                    }}>
                        <ImageBackground style={[styles.leftTop, {marginTop: 4}]}
                                         source={Images.navigation2.rec_bg}/>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    txt1: {
        color: '#FFFFFF',
        fontSize: 18
    },
    txt2: {
        color: '#FFFFFF',
        fontSize: 14
    },
    hotView: {
        marginTop: 4,
        width: Metrics.screenWidth,
        height: 335,
        flexDirection: 'row'
    },
    viewLeft: {
        marginLeft: 4,
        flex: 1
    },
    viewRight: {
        marginLeft: 4,
        marginRight: 4,
        flex: 1
    },
    leftTop: {
        width: '100%',
        height: 236
    },
    leftBottom: {
        width: '100%',
        height: 94
    }
});


