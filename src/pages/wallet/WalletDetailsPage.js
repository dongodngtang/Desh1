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
import {account_details} from "../../services/WallDao";
import Details from './Details';

export default class WalletDetailsPage extends Component {

    state = {
        wallet_details: []
    };

    componentDidMount() {
        account_details(data => {
            console.log('wallet_details', data);

            this.setState({wallet_details: data})
        })
    }

    render() {
        const {wallet_details} = this.state;
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    refreshPage={this.refreshPage}
                    toolbarStyle={{backgroundColor: Colors._E54}}
                    title={'收支明细'}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                {isEmptyObject(wallet_details) ? null : <Details details={wallet_details.items}/>}


            </View>
        )
    }


};