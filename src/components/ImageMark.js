/**
 * Created by lorne on 2017/4/21.
 */
import React, {Component} from 'react';
import {ActivityIndicator, TouchableOpacity, View, Image, Platform} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes/index';
import PropTypes from 'prop-types';
import {logMsg, strNotNull, util} from '../utils/ComonHelper';


export default class ImageMark extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired
    };


    state = {
        success: false,
        width: Metrics.screenWidth - 40,
        height: 320
    };

    componentDidMount() {
        if (this.no_chang()) {
            Image.getSize(this.props.src, (width, height) => {
                let screenWidth = Metrics.screenWidth - 40;
                height = screenWidth * height / width; //按照屏幕宽度进行等比缩放
                this.setState({width: screenWidth, height});
            });
        } else {
            this.setState({
                width: strNotNull(this.props.width) && Number.parseFloat(this.props.width),
                height:strNotNull(this.props.height) && Number.parseFloat(this.props.height)
            })
        }
    }

    imageClick = (source) => {

        if (!util.isEmpty(source)) {
            let index = 0;

            let images = [{url: source}];

            router.toImageGalleryPage(images, index)
        }

    };

    no_chang = () => {
        const {alt} = this.props;
        if (alt && alt === 'MACAUHIKE') {
            return false;
        } else {
            return true;
        }

    };


    render() {
        const {success} = this.state;

        const {src} = this.props;

        // if(Platform.OS !== 'ios' && (src.substr(src.lastIndexOf(".")+1)) === 'gif'){
        //     logMsg('jsakjskaja',this.props)
        //     return <Image style={{
        //         width: this.state.width,
        //         height: this.state.height
        //     }} source={{uri:src}}/>
        // }
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    if(this.no_chang()){
                        this.imageClick(src)
                    }
                }}
                style={{
                    backgroundColor: Colors._ECE,
                    width: this.state.width,
                    height: this.state.height
                }}>
                <Image
                    style={{
                        width: this.state.width,
                        height: this.state.height
                    }}
                    source={{uri: src}}/>

            </TouchableOpacity>


        );
    }
}
