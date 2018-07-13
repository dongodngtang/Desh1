import React, {Component} from 'react';
import {
    FlatList, ScrollView,
    StyleSheet, Text,
    View, Image,
    TouchableOpacity
} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from "../../Themes";
import {utcDate, isEmptyObject} from "../../utils/ComonHelper";
import {NavigationBar} from '../../components';
import {other_invite, user_invite} from "../../services/WallDao";
import InviteDetails from './InviteDetails';


export default class OtherInvitePage extends Component {

    state = {
        other_invite: []
    };

    componentDidMount() {
        other_invite(data => {
            console.log('别人的邀请好友', data);

            this.setState({user_invite: data.items})
        })
    }

    render() {
        const {item} = this.props.params;
        const {other_invite} = this.state;
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    refreshPage={this.refreshPage}
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title={`${item.nick_name}的邀请好友-${isEmptyObject(other_invite) ? '0' : other_invite.length}人`}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                {isEmptyObject(other_invite) ? null : <InviteDetails invites={other_invite}/>}


            </View>
        )
    }


};