/**
 * Created by lorne on 2017/2/9.
 */
import React, {PropTypes} from 'react';
import {
    Modal, ActivityIndicator, View, CameraRoll, Platform
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import {logMsg, showToast} from "../utils/ComonHelper";
import RNFS from 'react-native-fs';

const storeLocation = `${RNFS.DocumentDirectoryPath}`;

export default class ImageGallery extends React.Component {

//保存图片
    saveImg = (img) => {
        let path = img.url;
        if (Platform.OS === 'ios') {
            var promise = CameraRoll.saveToCameraRoll(path);
            promise.then(function (result) {
                showToast('保存成功！');
            }).catch(function (error) {
                showToast('保存失败！');
            });
        } else {
            let filename;
            if (path.indexOf("/") > 0)//如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
            {
                filename = path.substring(img.url.lastIndexOf("."), path.length);
            }
            else {
                filename = path;
            }
            logMsg('filename',filename)
            let pathName = new Date().getTime() + filename;
            let downloadDest = `${storeLocation}/${pathName}`;
            logMsg('downloadDest',downloadDest)
            try {
                const ret = RNFS.downloadFile({fromUrl: path, toFile: downloadDest,background: true});
                ret.promise.then(res => {
                    CameraRoll.saveToCameraRoll(downloadDest)
                        .then(()=>{
                            logMsg('图片已保存到相册')
                        }).catch(()=>{
                        logMsg('图片保存失败')
                    })

                }).catch(err => {
                    console.log('err', err);
                });
            }
            catch (e) {
                console.log(error);
            }
        }

    };

    render() {

        const {images, index} = this.props.params;
        return (
            <ImageViewer
                loadingRender={() => {
                    return <ActivityIndicator
                        color='white'/>
                }}
                // saveToLocalByLongPress={true}
                onLongPress={(image) => {
                    this.saveImg(image);
                }}
                imageUrls={images}
                index={index}
                onClick={() => router.pop()}/>
        )
    }
}