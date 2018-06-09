import React, {Component} from 'react';
import {Scene, Stack, Tabs, ActionConst} from 'react-native-router-flux';
import TabHomePage from './TabHomePage';
import Personal from './Personal';
import {
    StyleSheet
} from 'react-native';
import VideoNewsTab from './VideoNewsTab';
import CustomTabBar from './BottomNavigation';
import Discover from '../socials/Discover';
import Square from '../socials/Square';
import MessageCenter from '../message/MessageCenter';


export const Navigation = () => {


    return (
        <Tabs
            type="reset"
            style={styles.tabs}
            lazy
            key="Navigation"
            showLabel={false}
            tabBarPosition={'bottom'}
            swipeEnabled={false}
            animationEnabled={false}
            tabBarComponent={CustomTabBar}
        >
            <Scene
                key="tab_home"
                component={TabHomePage}
                hideNavBar
            />
            <Scene key="tab_news"
                   component={Square}
                   hideNavBar

            />

            <Scene key="tab_discover"
                   component={MessageCenter}
                   hideNavBar
            />
            <Scene key="tab_person"
                   component={Personal}
                   hideNavBar
            />
        </Tabs>
    );
};
const styles = StyleSheet.create({
    tabs: {
        height: 50
    },
    textStyle: {
        color: '#AAAAAA'
    },
    textStyle2: {
        color: '#161718'
    },
    bgHomeStyle: {
        height: 24,
        width: 24
    },
    bgInformationStyle: {
        width: 17,
        height: 23
    },
    bgRankStyle2: {
        height: 25,
        width: 25
    }
})