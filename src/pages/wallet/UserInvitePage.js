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
        const {user_invites} = this.props.params;

        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    refreshPage={this.refreshPage}
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title={`我的邀请好友-${user_invites.items}人`}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                {isEmptyObject(user_invites) ? <InviteDetails invites={user_invites.items}/> : null}


            </View>
        )
    }


};