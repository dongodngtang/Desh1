import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, Platform
} from 'react-native';

import {Images, Metrics, Colors} from "../../Themes";

export default class SelfMessage extends Component {
    static props = {
        message: null,
        messageClick: null
    };

    createMessage = () => {
        const {type, text, image, path, duration} = this.props.message;
        console.log("我发送的消息", this.props.message);
        switch (type) {
            case "text" :
                return (
                    <View style={[styles.superView, styles.textView]}>
                        <Text style={[{color: "white"}, {fontSize: 15}]}>{text}</Text>
                    </View>
                );
            case "image" :
                return (
                    <View style={[styles.superView, styles.imageView]}>
                        <Image source={{uri: image}} style={{flex: 1, borderRadius: 5}}/>
                    </View>
                );
            case "video":
                return (
                    <View style={[styles.superView, styles.imageView]}>
                        <Image source={{uri: path}} style={{flex: 1, borderRadius: 5}}/>
                    </View>
                );
            case "voice":
                return (
                    <View style={[styles.superView, styles.voiceView,{width:parseInt(duration) * 6 + 50}]}>
                        <Text style={[{color: "white"}, {fontSize: 15}]}>{`${parseInt(duration)}"`}</Text>
                        <Image source={Images.social.voice_right} style={styles.voiceImage}/>
                    </View>
                );
            default:
                return null
        }

    };


    render() {
        const {userInfo} = this.props.message;
        let avatarThumbPath = userInfo.avatarThumbPath;
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={() => {
                    if (this.props.messageClick === null) return;
                    this.props.messageClick();
                }} style={[{flexDirection: "row"}, {alignItems: "flex-end"}]}>
                    {this.createMessage()}

                    <Image source={Images.social.chat_right} style={styles.rightCorner}/>
                </TouchableOpacity>


                {avatarThumbPath === "" || avatarThumbPath === undefined ?
                    <Image source={Images.home_avatar} style={styles.userIcon}/> :
                    <Image source={{uri: avatarThumbPath}} style={styles.userIcon}/>}


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Metrics.screenWidth,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    userIcon: {
        width: Metrics.reallySize(38),
        height: Metrics.reallySize(38),
        borderRadius: Metrics.reallySize(19),
        marginRight: 17,
        marginBottom: 17,
    },
    superView: {
        backgroundColor: "#1D89FA",
        marginBottom: 17,
        marginTop: 17,
        borderRadius: 6,
        marginRight: -5,
    },
    textView: {
        maxWidth: Metrics.screenWidth - (Metrics.reallySize(38) + 27) * 2,
        padding: 10,
    },
    voiceView: {
        flexDirection:"row",
        justifyContent: "flex-end",
        alignItems:"center",
    },
    voiceImage: {
        marginBottom: 12,
        marginTop: 12,
        width: Metrics.reallySize(24),
        height: Metrics.reallySize(15),
        marginLeft: 2,
        marginRight: 3,
        resizeMode: 'contain',
    },
    imageView: {
        width: Metrics.reallySize(120),
        height: Metrics.reallySize(150),
        padding: 1,
    },
    rightCorner: {
        width: Metrics.reallySize(10),
        height: Metrics.reallySize(10),
        marginBottom: 17,
        marginRight: 10,
    }
});