/**
 * AnimatedTurnTableDrawPage.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/10/8.
 *
 */

import React, {Component} from "react"
import {
    Animated,
    Easing,
    View,
    TouchableOpacity,
    Modal,
    Image,
    StyleSheet,
    Dimensions,
    Text,
    ImageBackground
} from "react-native";
import {Images, Metrics} from '../../Themes'
import {getProfile, getElements, postLottery, getWheelTime, getprizeMessages} from "../../services/AccountDao";
import {isEmptyObject, logMsg, showToast, strNotNull} from "../../utils/ComonHelper";
import Swiper from 'react-native-swiper';


const rule_list = [{id: 0, name: '每日登录', des: '每日可获得1次抽奖机会', image: Images.integral.login, status: '完成'},
    {id: 0, name: '游戏分享', des: '每日可获得1次抽奖机会', image: Images.integral.share, status: '未完成'},
    {id: 0, name: '积分兑换', des: '每200积分可购买1次抽奖机会', image: Images.integral.exchange, status: '兑换'}];
const prompts = ['1.完成每日任务，最高每日可获得45积分', '2.成功购买商城现金商品，可获得等额积分', '3.转盘小游戏还有赢取积分的机会哦～ '];

export default class AnimatedTurnTableDrawPage extends Component {

    constructor(props) {
        super(props);
        router.popToTop();
        this.state = {
            drawData: [],
            // elements: [],
            lottery: 1,
            offOn: true,
            rotateDeg: new Animated.Value(0),
            visible: true,
            total_points: 0,
            rule_show: false,
            wheel_times: 1,
            prize_messages: []
        };
    };

    componentDidMount() {
        this.getTime();
        this.refresh();
        this.prizeMessage();
    }

    getTime = () => {
        getWheelTime(data => {
            logMsg("抽奖次数", data)
            this.setState({
                wheel_times: data.wheel_remain_times
            })
        })
    };

    prizeMessage = () => {
        //用户中奖轮播
        getprizeMessages(data => {
            logMsg("中奖轮播", data);
            this.setState({
                prize_messages: data.items
            })
        })
    }

    refresh = () => {
        getElements(data => {
            logMsg("转盘元素：", data);
            this.setState({
                drawData: data.items
            })
        });

        if (!isEmptyObject(global.login_user)) {
            getProfile('', data => {
                console.log("我的积分", data)
                this.setState({
                    total_points: data.total_points
                })

            }, err => {
                console.log("err", err)
            })
        }

    }

    toggle = () => {
        if (this.state.offOn)
            this.setState({
                visible: !this.state.visible
            })
    };

    rotateImg = () => {
        if (this.state.offOn) {
            postLottery({}, data => {
                logMsg("抽奖的ID", data)
                this.rotateImg1(data);
            }, err => {
                showToast(err.msg);
                logMsg("抽奖问题", err)
            });

        }
    };


    rotateImg1 = (lottery) => {
        //刷新次数
        this.getTime();
        //轮播
        this.prizeMessage();

        //转盘中奖品个数
        const COUNT = 10;

        //获取抽奖位置
        // let number = Math.floor(Math.random() * 8);
        let number = strNotNull(lottery.wheel_element_id) ? lottery.wheel_element_id : 1;


        this.setState({
            offOn: !this.state.offOn,
        });


        let oneTimeRotate = number / COUNT + 3;
        Animated.timing(this.state.rotateDeg, {
            toValue: oneTimeRotate,
            duration: 5000,
            easing: Easing.out(Easing.quad)
        }).start(() => {
            this.setState({
                offOn: !this.state.offOn,
                rotateDeg: new Animated.Value(0)
            });
            //动画结束时，会把toValue值，回调给callback
            this.state.rotateDeg.stopAnimation(() => {
                this.changeValue(number);
            })
        });
    };

    changeValue = (postion) => {
        if (this.state.visible)
            alert("定位到了" + postion + "上了");
    };

    _background = (item) => {
        let action = item.status;
        if (action === '完成') {
            return '#6CC7FF'
        } else if (action === '未完成') {
            return '#FF6B4C'
        } else {
            return "#FF6B4C"
        }
    };

    content_show() {
        if (this.state.rule_show) {
            return (
                <View style={{
                    width: '90%', height: 400, backgroundColor: '#FFFFFF', borderColor: '#6787EE',
                    borderWidth: 3, borderRadius: 10,marginTop:10
                }}>
                    <View style={{flexDirection: 'row', width: '100%', marginTop: 20, marginBottom: 26}}>
                        <View style={{flex: 1, marginLeft: 17}}/>
                        <Text style={{
                            color: '#1E41B2',
                            fontSize: 18,
                            alignSelf: 'center',
                            fontWeight: 'bold'
                        }}>活动任务</Text>
                        <View style={{flex: 1}}/>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                rule_show: false
                            })
                        }}>
                            <Image source={Images.lottery.rule_close} style={{marginRight: 23, width: 18, height: 18}}/>
                        </TouchableOpacity>
                    </View>

                    {rule_list.map((item, index) => {
                        return (
                            <View key={index} style={{flexDirection: 'column', alignItems: 'center'}}>
                                <View style={styles.item} key={index}>
                                    <Image style={{height: 34, width: 34}}
                                           source={item.image}/>
                                    <View style={{marginLeft: 14, flexDirection: 'column'}}>
                                        <Text style={{color: '#444444', fontSize: 14}}>{item.name}</Text>
                                        <Text style={{color: '#AAAAAA', fontSize: 12, marginTop: 3}}>{item.des}</Text>

                                    </View>
                                    <View style={{flex: 1}}/>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={[styles.statusView, {backgroundColor: this._background(item)}]}
                                        onPress={() => {
                                            if (item.status === '未完成') {
                                                this.setState({
                                                    rule_show: false
                                                });

                                            } else if (item.status === '兑换') {

                                            }
                                        }}>
                                        <Text style={{color: '#FFFFFF', fontSize: 14}}>{item.status}</Text>
                                    </TouchableOpacity>
                                </View>

                                {index === rule_list.length - 1 ? <Text style={{
                                    color: '#AAAAAA', fontSize: 12, marginTop: 2, alignSelf: 'flex-end',
                                    marginRight: 23
                                }}>
                                    {`当前积分：${this.state.total_points}`}
                                </Text> : null}
                                <View style={{
                                    height: 1,
                                    width: '90%',
                                    alignSelf: 'center',
                                    backgroundColor: '#F3F3F3',
                                    marginTop: 5
                                }}/>
                            </View>
                        )
                    })}

                    <Text style={{color: '#444444', fontSize: 14, marginTop: 20, marginLeft: 23}}>活动规则</Text>
                    {prompts.map((prompt, index) => {
                        return <Text key={index} style={{
                            color: '#666666',
                            fontSize: 14,
                            marginTop: 5,
                            marginLeft: 23
                        }}>{prompt}</Text>
                    })}
                </View>
            )
        } else {
            return (
                <View style={{marginTop: 0}}>
                    <Image source={require('./imgs/turntable.png')}
                           style={{width: 200, height: 150, alignSelf: 'center', zIndex: 1000}}/>
                    <ImageBackground source={require('./imgs/circle_bg.png')} style={{
                        height: 340, width: 340, marginTop: -50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>


                        <View style={styles.lottery_container}>
                            <Animated.View style={[styles.mainImg, {
                                transform: [{
                                    rotate: this.state.rotateDeg.interpolate({
                                        inputRange: [0, 4],
                                        outputRange: ['0deg', '1440deg']
                                    })
                                }]
                            }]}>
                                <View style={{height: 300, width: 300, alignItems: "center"}}>
                                    <Image
                                        style={{position: "absolute", height: 300, width: 300, resizeMode: 'stretch'}}
                                        source={require('./imgs/circle1.png')}/>
                                    {!isEmptyObject(this.state.drawData) && this.state.drawData.map((one, index) => {
                                        const rotateDeg = 18;
                                        let translateX = 0;
                                        let translateY = 0;
                                        const rotateTemp = -rotateDeg - (index * 36);
                                        const sinTemp = Math.sin(rotateDeg * Math.PI / 180) * 105;
                                        const consTemp = Math.cos(rotateDeg * Math.PI / 180) * 105;
                                        switch (index) {
                                            case 0:
                                                translateX = -sinTemp;
                                                translateY = -consTemp;
                                                break;
                                            case 1:
                                                translateX = -consTemp;
                                                translateY = -sinTemp;
                                                break;
                                            case 2:
                                                translateX = -consTemp;
                                                translateY = sinTemp;
                                                break;
                                            case 3:
                                                translateX = -sinTemp;
                                                translateY = consTemp;
                                                break;
                                            case 4:
                                                translateX = sinTemp;
                                                translateY = consTemp;
                                                break;
                                            case 5:
                                                translateX = consTemp;
                                                translateY = sinTemp;
                                                break;
                                            case 6:
                                                translateX = consTemp;
                                                translateY = -sinTemp;
                                                break;
                                            case 7:
                                                translateX = sinTemp;
                                                translateY = -consTemp;
                                                break;
                                            case 8:
                                                translateX = -sinTemp;
                                                translateY = consTemp;
                                                break;
                                            case 9:
                                                translateX = consTemp;
                                                translateY = sinTemp;
                                                break;
                                            default:
                                                break
                                        }
                                        return (
                                            <View key={one.id} style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                position: "absolute",
                                                zIndex: 99,
                                                height: 70,
                                                width: 60,
                                                top: 115,
                                                transform: [{translateX: translateX}, {translateY: translateY}, {rotateZ: `${rotateTemp}deg`}]
                                            }}>
                                                {/*<Text style={{*/}
                                                {/*fontSize: 12,*/}
                                                {/*color: "#74340A",*/}
                                                {/*marginBottom: 10*/}
                                                {/*}}>{one.name}</Text>*/}
                                                {strNotNull(one.image) ?
                                                    <Image style={{width: 50, height: 50, resizeMode: "contain"}}
                                                           source={{uri: one.image}}/> : null}
                                            </View>
                                        )
                                    })}
                                </View>
                            </Animated.View>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => {
                                if (isEmptyObject(global.login_user)) {
                                    global.router.toLoginFirstPage()
                                } else {
                                    this.rotateImg()
                                }
                            }} style={styles.centerPoint}>
                                <Image source={require('./imgs/point_new.png')}
                                       style={{
                                           height: 80,
                                           width: 63.4, resizeMode: "stretch", position: "absolute"
                                       }}/>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <TouchableOpacity onPress={() => {
                        if (this.state.offOn)
                            this.setState({
                                visible: false
                            })
                    }}
                                      style={{
                                          position: 'absolute',
                                          top: 30,
                                          right: 25,
                                          zIndex: 999
                                      }}>
                        <Image source={require('./imgs/lottery_close.png')} style={{width: 30, height: 30}}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }


    render() {
        const {total_points} = this.state;
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                onRequestClose={() => {

                }}
                visible={this.state.visible}
                style={{alignItems: 'center'}}
            >
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.6)'

                }}>
                    <View style={{marginTop: 50, alignItems: 'center'}}>
                        {this.carousel()}

                        {this.content_show()}
                    </View>


                    <View style={{position: 'absolute', bottom: 60}}>
                        <View style={{alignSelf: 'center', width: 150, flexDirection: 'row', alignItems: 'center'}}>
                            <ImageBackground
                                source={Images.lottery.opportunity}
                                style={{width: 120, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>{`${this.state.wheel_times}次机会`}</Text>
                            </ImageBackground>
                            <TouchableOpacity style={{position: 'absolute', right: 10}}
                                              onPress={() => {
                                                  this.setState({
                                                      rule_show: true
                                                  })
                                              }}>
                                <Image style={{width: 30, height: 30}} source={Images.lottery.ward_add}/>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => {
                            this.toggle();
                            global.router.toGameRulesPage(this.toggle)
                        }} style={{marginTop: 20, alignSelf: 'center'}}>
                            <Text style={{
                                fontSize: 18,
                                color: '#6787EE',
                                textDecorationLine: 'underline',
                                textDecorationStyle: "solid",
                                textDecorationColor: "#6787EE"
                            }}>游戏规则></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    carousel = () => {
        const {prize_messages} = this.state;
        if (!isEmptyObject(prize_messages) && prize_messages.length > 0)
            return (
                <View style={{
                    height: 24,
                    backgroundColor: 'rgba(0, 0, 0,0.59)',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <Swiper
                        autoplayTimeout={2}
                        autoplay>
                        {prize_messages.map((item, key) => {
                            return <Text style={{color: '#F3F3F3', fontSize: 12, alignSelf: 'center'}}
                                         key={key}>{`恭喜用户${item.nick_name}转盘活动抽奖获得${item.prize}`}</Text>
                        })}


                    </Swiper>
                </View>


            );
    }


    componentWillUnmount() {

    }
}


const styles = StyleSheet.create({
    lottery_container: {
        width: 300,
        height: 300,
        alignItems: 'center'
    },
    imgPoint: {
        width: 100,
        height: 100,
    },
    centerPoint: {
        position: 'absolute',
        left: 300 / 2 - 62.25,
        top: 72.5,
        zIndex: 100,
        height: 157,
        width: 124.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainImg: {
        width: 300,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    statusView: {
        width: 68, height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        marginTop: 12,
        marginBottom: 13,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 17, marginLeft: 17
    }
});