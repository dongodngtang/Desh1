import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import Swiper from 'react-native-swiper';
import {hotelDetail} from '../../services/MacauDao';
import RenderHtml from '../comm/RenderHtml';
import {NavigationBar} from '../../components'
import {call, turn2MapMark} from '../../utils/ComonHelper'

const styles = StyleSheet.create({
    banner: {
        height: 200,
        width: '100%',
        backgroundColor: Colors._ECE
    },
    activeDot: {
        backgroundColor: 'white',
        width: 18,
        height: 4,
        borderRadius: 2,
        marginBottom: 0
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 9,
        height: 4,
        borderRadius: 2,
        marginBottom: 0
    },
    nav_view: {
        paddingTop: 10,
        paddingBottom: 14,
        backgroundColor: Colors.white,
        marginBottom: 5,
        flexDirection: 'row',
        // alignItems:'center',
        paddingLeft: 18,
        width: Metrics.screenWidth
    },
    title: {
        fontSize: 18,
        color: Colors.txt_444,
        width: '70%'
    },
    location: {
        fontSize: 12,
        color: Colors._AAA,
        width: '70%'
    },
    btn_book: {
        height: 60,
        width:Metrics.screenWidth,
        backgroundColor: 'white',
        flexDirection:'row',
        alignItems:'center',
        position: 'absolute',
        bottom:0,
        borderTopWidth:1,
        borderTopColor:'#F3F3F3'
    },
    btn_book_txt: {
        fontSize: 18,
        color: Colors.white
    },
    stars: {
        width: 14,
        height: 14,
        marginRight: 4
    },
    starView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 9
    },
    location2: {
        color: '#999999',
        fontSize: 12,
        marginTop: 8
    },
    price3: {
        color: '#FF3F3F',
        fontSize: 20
    }
})

export default class HotelDetail extends PureComponent {

    state = {
        hotel: {},
        opacity: 0
    }

    componentWillMount() {
        hotelDetail(this.props.params.hotel, data => {
            console.log("hotel:", data)
            this.setState({
                hotel: data.hotel
            })
        }, err => {

        })
    };

    _star = (star) => {
        let stars = [];
        for (let i = 1; i <= star; i++) {
            stars.push(i);
        }
        return stars;
    };

    render() {
        const {hotel} = this.props.params;
        const {images, location, title, description, telephone, amap_poiid} = this.state.hotel;
        return <View style={ApplicationStyles.bgContainer}>


            <ScrollView
                iosalwaysBounceVertical={false}
                scrollEventThrottle={16}
                onScroll={this._onScroll}>
                <Banner banners={images}/>

                <View style={styles.nav_view}>

                    <View style={{width:'70%'}}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={{flexDirection: 'row', marginTop: 5,alignItems:'center'}}>
                            <Text style={{color: '#999999', fontSize: 12}}>酒店星级：</Text>
                            {this._star(hotel.star_level).map((index) => {
                                return <Image key={index} style={styles.stars} source={Images.macau.star}/>
                            })}
                        </View>
                        <Text style={styles.location2} numberOfLines={2}>地址：{location}</Text>
                    </View>
                    <View style={{flex: 1}}/>

                    <View style={{marginRight: 22,flexDirection:'column',alignItems:'flex-end'}}>
                        {hotel.start_price !== '0.0' ? <Text style={styles.price3}><Text
                            style={{color: '#FF3F3F', fontSize: 12}}>¥</Text>{hotel.start_price}<Text
                            style={{color: '#AAAAAA', fontSize: 12}}>起</Text></Text> : null}
                        <View style={{flex: 1}}/>
                        <TouchableOpacity style={{flexDirection: 'row'}}
                                          onPress={() => {
                                              turn2MapMark(amap_poiid)
                                          }}>
                            <Image style={{height: 14, width: 10}}
                                   source={Images.macau.location}/>
                            <Text style={{color: "#4A90E2", fontSize: 12, marginLeft: 4}}>地图</Text>
                        </TouchableOpacity>
                    </View>


                    {/*<View style={{flex:1}}/>*/}

                    {/*<TouchableOpacity*/}
                    {/*style={{marginRight: 17}}*/}
                    {/*onPress={() => {*/}
                    {/*call(telephone)*/}
                    {/*}}>*/}
                    {/*<Image style={{height: 20, width: 20, marginLeft: 20, marginRight: 20}}*/}
                    {/*source={Images.macau.viewpoint}/>*/}
                    {/*</TouchableOpacity>*/}
                </View>

                <View style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    paddingLeft: 17,
                    paddingRight: 17,
                    paddingBottom: 70
                }}>
                    <RenderHtml
                        html={description}/>
                </View>


            </ScrollView>

            <NavigationBar
                toolbarStyle={{
                    position: 'absolute',
                    top: 0,
                    backgroundColor: 'rgba(229,74,46,' + this.state.opacity + ')'
                }}
                // rightBtnIcon={Images.macau.call}
                // rightBtnPress={()=>{call(telephone)}}
                // rightImageStyle={{height: 20, width: 20, marginLeft: 20, marginRight: 20}}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>



            <View
                style={styles.btn_book}>
                <TouchableOpacity
                    style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white',height:60}}
                    onPress={() => {
                        call(telephone)
                }}>
                    <Image style={{width:27,height:23}} source={Images.macau.callPhone}/>
                    <Text style={{color:"#666666",fontSize:14,marginLeft:11}}>联系客服</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{flex:1,backgroundColor:'#E54A2E',alignItems:'center',height:60,
                    justifyContent:'center'}}
                    onPress={() => {
                    router.toHotelRoomListPage(this.state.hotel, this.props.params.date);
                }}>
                    <Text style={styles.btn_book_txt}>预定房间</Text>
                </TouchableOpacity>
            </View>
        </View>
    }

    _onScroll = (event) => {
        let offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY <= 200) {
            let opacity = offsetY / 200;
            this.setState({opacity: opacity});
        } else {
            this.setState({opacity: 1});
        }


    };
}

class Banner extends PureComponent {

    render() {

        const {banners} = this.props;
        if (banners && banners.length > 0) {
            let images = banners.map(item => {
                return {url: item.image}
            });
            return <View style={{height: 200}}>
                <Swiper
                    activeDotStyle={styles.activeDot}
                    dotStyle={styles.dot}
                    autoplayTimeout={3}
                    autoplay>
                    {banners.map((item, key) => {
                        return <TouchableOpacity
                            key={key}
                            onPress={() => {

                                router.toImageGalleryPage(images, key)
                            }}
                            activeOpacity={1}>
                            <Image style={styles.banner}
                                   source={{uri: item.image}}/>
                        </TouchableOpacity>

                    })}

                </Swiper>
            </View>
        }

        else
            return <View style={styles.banner}/>
    }
}