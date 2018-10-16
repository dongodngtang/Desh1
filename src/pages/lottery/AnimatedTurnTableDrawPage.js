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
} from "react-native"

export default class AnimatedTurnTableDrawPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            drawData: [
                {id: 1, title: "谢谢参与", icon: require('./imgs/cry_coin.png')},
                {id: 2, title: "手机1", icon: require('./imgs/phone1_coin.png')},
                {id: 3, title: "+20金币", icon: require('./imgs/gold_coin.png')},
                {id: 4, title: "手机2", icon: require('./imgs/phone2_coin.png')},
                {id: 5, title: "手机50", icon: require('./imgs/gold_coin.png')},
                {id: 6, title: "+100金币", icon: require('./imgs/gold_coin.png')},
                {id: 7, title: "谢谢参与", icon: require('./imgs/cry_coin.png')},
                {id: 8, title: "手机3", icon: require('./imgs/phone3_coin.png')}
            ],
            offOn: true,
            rotateDeg: new Animated.Value(0),
            visible: true
        };
    }

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    };

    rotateImg = () => {
        if (this.state.offOn) {
            this.rotateImg1();
        }
    };

    rotateImg1 = () => {
        //获取抽奖位置
        // let number = Math.floor(Math.random() * 8);
        let number = 5
        if ((number / 8) == 0.875) {
            number = 1;
        }

        this.setState({
            offOn: !this.state.offOn,
        });

        let oneTimeRotate = number / 8 + 3.0625;
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
        alert("定位到了" + postion + "上了");
    };


    render() {
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
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.6)'
                }}>
                    <Image source={require('./imgs/turntable.png')}
                           style={{width: 200, height: 150, top: 60, alignSelf: 'center', zIndex: 1000}}/>
                    <ImageBackground source={require('./imgs/circle_bg.png')} style={{height:400,width:400,
                        alignItems: 'center',
                        justifyContent: 'center'}}>


                    <View  style={styles.lottery_container}>
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
                                        source={require('./imgs/circle.png')}/>
                                    {this.state.drawData.map((one, index) => {
                                        const rotateDeg = 22.5;
                                        let translateX = 0;
                                        let translateY = 0;
                                        const rotateTemp = -rotateDeg - (index * 45);
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
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: "#74340A",
                                                    fontFamily: "STYuanti-SC-Regular",
                                                    marginBottom: 10
                                                }}>{one.name}</Text>
                                                <Image style={{width: 40, height: 40, resizeMode: "contain"}}
                                                       source={one.icon}/>
                                            </View>
                                        )
                                    })}
                                </View>
                            </Animated.View>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                            this.rotateImg()
                        }} style={styles.centerPoint}>
                            <Image source={require('./imgs/point_new.png')}
                                   style={{ height: 157,
                                       width: 124.5, resizeMode: "stretch", position: "absolute"}}/>
                            {/*<Text style={{*/}
                            {/*color: "#ffffff",*/}
                            {/*textAlign: "center",*/}
                            {/*fontSize: 17,*/}
                            {/*fontWeight: 'bold',*/}
                            {/*width: 45,*/}
                            {/*marginTop: 20*/}
                            {/*}}>{"开始抽奖" || "start game"}</Text>*/}
                        </TouchableOpacity>
                    </View>
                    </ImageBackground>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                                      style={{
                                          position: 'absolute',
                                          top: 140,
                                          right: 40,
                                          zIndex: 999
                                      }}>
                        <Image source={require('./imgs/lottery_close.png')} style={{width: 30, height: 30}}/>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
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
        left: 300 / 2-62.25,
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
    }
});