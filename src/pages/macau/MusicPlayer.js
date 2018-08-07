/**
 * MusicPlayer.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/8/6.
 *
 */

import React, {Component} from 'react';
import {
    View, Platform
} from 'react-native';
import Sound from 'react-native-sound'
import RNFS from 'react-native-fs'
import {getFileName, logMsg} from "../../utils/ComonHelper";

Sound.setCategory('Playback');

export default class MusicPlayer extends Component {


    downloadMusic = (fromUrlPath) => {
        let toFilePath = Platform.select({
            ios: RNFS.MainBundlePath + `/${getFileName(fromUrlPath)}`,
            android: RNFS.ExternalStorageDirectoryPath + `/${getFileName(fromUrlPath)}`
        })


        logMsg('缓存路径', toFilePath)
        try {
            this.download = RNFS.downloadFile({
                fromUrl: fromUrlPath,
                toFile: toFilePath,
                cacheable: true,
                background: true,
                begin: (res => {
                    logMsg('开始下载...', fromUrlPath)
                })
            })

            this.download.promise.then(res => {
                logMsg('下载成功', res)
                this.sound = new Sound(toFilePath, '', error => {
                    if (error) {
                        logMsg('播放失败：', error)
                        return
                    }
                    //设置音量为一半
                    this.sound.setVolume(0.5)
                    //单曲循环 调用stop停止
                    this.sound.setNumberOfLoops(-1)
                    //播放
                    this.sound.play(success => {
                        if (success) {
                            logMsg('播放结束...', toFilePath)
                        } else {
                            logMsg('reset 重试')
                            this.sound.reset();
                        }
                    })




                })
            }).catch(err => {
                logMsg('下载失败', err)
            })
        } catch (e) {
            logMsg(e)
        }

    }

    stop = () => {
        this.sound && this.sound.stop(() => {
            logMsg('暂停播放')
        })
    }


    componentWillUnmount() {
        logMsg('停止下载')
        this.download && RNFS.stopDownload(this.download.jobId)
        this.stop()
    }

    render() {
        return <View/>
    }

}