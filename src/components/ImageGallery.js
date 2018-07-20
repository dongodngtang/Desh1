/**
 * Created by lorne on 2017/2/9.
 */
import React, {PropTypes} from 'react';
import {
    Modal, ActivityIndicator,View
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import {showToast} from "../utils/ComonHelper";

export default class ImageGallery extends React.Component {

//保存图片
//     saveImg=(img)=> {
//         var promise = CameraRoll.saveToCameraRoll(img);
//         promise.then(function(result) {
//             showToast('保存成功！');
//         }).catch(function(error) {
//             showToast('保存失败！');
//         });
//     };

    render() {

        const {images, index} = this.props.params;
        return (
            <ImageViewer
                loadingRender={() => {
                    return <ActivityIndicator
                        color='white'/>
                }}
                // saveToLocalByLongPress={true}
                // onLongPress={(image) => {
                //     console.log('image', image);
                //     // this.saveImg(image.url)
                // }}
                imageUrls={images}
                index={index}
                onClick={() => router.pop()}/>
        )
    }
}