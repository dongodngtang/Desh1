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
import I18n from "react-native-i18n";

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
        paddingLeft: 17,
        paddingRight: 17,
        backgroundColor: Colors.white,
        width: '100%',
        marginBottom: 5
    },
    title: {
        fontSize: 18,
        color: Colors.txt_444,
    },
    location: {
        fontSize: 12,
        color: Colors._AAA,
        marginTop: 5
    },
    btn_book: {
        height: 44,
        width: '90%',
        backgroundColor: Colors._E54,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        borderRadius: 3
    },
    btn_book_txt: {
        fontSize: 18,
        color: Colors.white
    }
})

export default class HotelDetail extends PureComponent {

    state = {
        hotel: {},
        opacity: 0
    }

    componentWillMount() {
        hotelDetail(this.props.params.hotel, data => {
            this.setState({
                hotel: data.hotel
            })
        }, err => {

        })
    }

    render() {

        const {images, location, title, description} = this.state.hotel;
        return <View style={ApplicationStyles.bgContainer}>


            <ScrollView
                iosalwaysBounceVertical={false}
                scrollEventThrottle={16}
                onScroll={this._onScroll}>
                <Banner banners={images}/>

                <View style={styles.nav_view}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.location}>{location}</Text>
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
                rightBtnIcon={Images.macau.call}
                rightImageStyle={{height: 20, width: 20, marginLeft: 20, marginRight: 20}}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <TouchableOpacity
                style={styles.btn_book}>
                <Text style={styles.btn_book_txt}>查看房间</Text>

            </TouchableOpacity>
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