import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import {Badge} from '../../components';
import {util} from '../../utils/ComonHelper';
import {postNewLikes} from '../../services/CommentDao';
import {sharePage} from '../../utils/ComonHelper';
import {WebAction} from '../../configs/Status';

export default class ClickComment extends Component {

    state = {
        text: '',
        current_user_like: false
    };
    static propTypes = {
        _showInput: propTypes.func.isRequired,
        comment_count: propTypes.number
    };


    setUserLike = (current_user_like) => {
        this.setState({
            current_user_like: current_user_like
        })
    };

    _carts = () => {
        const {comment_count} = this.props;
        if (comment_count && comment_count > 0)
            return <View
                style={styles.badge}>
                <Text style={{fontSize:8,color:Colors.white}}>{comment_count > 99 ? '99+' : comment_count}</Text>
            </View>
    };

    likeChang = () => {
        const {info_id, topic_type} = this.props;

        postNewLikes({info_id: info_id, topic_type: `${topic_type}s`}, data => {
            this.setState({
                current_user_like: !this.state.current_user_like
            });
            this.props.sendMessageToWeb && this.props.sendMessageToWeb({action: WebAction.ADD_TOTAL_LIKES});

        }, err => {
        });


    };

    likeShare = () => {
        const {current_user_like} = this.state;
        return (
            <View style={{flexDirection: 'row', flex: 1,alignItems:'center'}}>
                <TouchableOpacity
                    style={[styles.search, this.props.onlyComment ? {width: '90%'} : {}]}
                    onPress={() => {
                        this.props._showInput()
                    }}>
                    <Image
                        style={styles.searchImg}
                        source={Images.pen}/>
                    <Text style={styles.input}>{I18n.t('write_comment')}</Text>

                </TouchableOpacity>

                {this.props.onlyComment ? null : <View style={{flexDirection: 'row', flex: 1}}>
                        <TouchableOpacity
                            onPress={() => {
                            this.props.sendMessageToWeb && this.props.sendMessageToWeb({action: WebAction.SCROLL_COMMENT_TOP});
                        }}
                            style={styles.commentWhiteView}>
                            <Image style={styles.commentWhite} source={Images.commentWhite}/>
                            {this._carts()}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.likeView}
                            onPress={() => {
                            this.likeChang()
                        }}>
                            <Image style={styles.like} source={current_user_like ? Images.likeRed : Images.like}/>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.forwardView}
                            onPress={() => {
                            const {title, date, image_thumb, id} = this.props.info;
                            sharePage(title, date, image_thumb, "news/" + id)
                        }}>
                            <Image style={styles.forward} source={Images.forward}/>
                        </TouchableOpacity>
                    </View>}


            </View>
        )
    };

    render() {
        return (
            this.likeShare()
        );
    }


}

const styles = StyleSheet.create({

    input: {
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        borderRadius: 40,
        fontSize: 14,
        color: '#CCCCCC'
    },
    search: {
        marginLeft: 17,
        height: 30,
        width: '48%',
        backgroundColor: Colors._ECE,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchImg: {
        height: 14,
        width: 14,
        marginLeft: 15,
        marginRight: 10,
    },
    commentWhiteView: {
        justifyContent: 'center',
        marginLeft: 20,
        flex: 1,
        height: 48
    },
    commentWhite: {
        width: 22,
        height: 20
    },
    likeView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        flex: 1,
        height: 48
    },
    like: {
        width: 20,
        height: 19
    },
    forwardView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        flex: 1,
        height: 48
    },
    forward: {
        width: 20,
        height: 20
    },
    badge: {
        position: 'absolute',
        top: 5,
        left: 12,
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#F34A4A',
        alignItems: 'center',
        justifyContent: 'center'
    }

});