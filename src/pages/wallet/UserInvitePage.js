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
import {award_details} from "../../services/WallDao";
import InviteDetails from './InviteDetails';


export default class UserInvitePage extends Component {

    state = {};

    componentDidMount() {

    }

    render() {
        const {user_invite} = this.props.params;

        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    refreshPage={this.refreshPage}
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title={`我的邀请好友-${isEmptyObject(user_invite) ? '0' : user_invite.items.length}人`}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                {isEmptyObject(user_invite) || isEmptyObject(user_invite.items) ? null :<InviteDetails invites={user_invite.items}/> }


            </View>
        )
    }


};