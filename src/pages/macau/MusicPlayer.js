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
    View
} from 'react-native';
import Sound from 'react-native-sound'
import RNFS from 'react-native-fs'
import {getFileName, logMsg} from "../../utils/ComonHelper";

Sound.setCategory('Playback');

export default class MusicPlayer extends Component {


    downloadMusic = (fromUrlPath) => {
        let toFilePath = RNFS.CachesDirectoryPath + `/${getFileName(fromUrlPath)}`

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
                this.sound = new Sound(toFilePath, Sound.MAIN_BUNDLE, error => {
                    if (error) {
                        logMsg('播放失败：', error)
                        return
                    }

                    //播放
                    this.sound.play(success => {
                        if (success) {
                            logMsg('正在播放...', toFilePath)
                        } else {
                            logMsg('reset 重试')
                            this.sound.reset();
                        }
                    })

                    //播放结束后重新播放
                    this.sound.stop(() => {
                        this.sound.play();
                    });
                })
            })
        } catch (e) {
            logMsg(e)
        }

    }

    toggle=(Path)=>{
        this.downloadMusic(Path)
    }

    componentWillUnmount() {
        this.download && RNFS.stopDownload(this.download.jobId)
        this.sound && this.sound.pause()
    }

    render() {
        return <View/>
    }

}