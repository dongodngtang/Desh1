import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, TextInput, StatusBar,
    Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from "react-native-i18n";

export default class SearchHomePage extends Component {

    state = {
        recordKeys: [],
        submit: false
    };

    render(){
        return (
            <View style={ApplicationStyles.bgContainer}>
                <StatusBar barStyle={"dark-content"}/>
                {this.TopBar()}

                {this.state.submit ? null : <View style={styles.viewSearch}>
                    {/*{this.resentBlank()}*/}
                    {/*{this.tabBlank()}*/}
                </View>}


            </View>
        )
    }

    TopBar = () => {

        return (<View style={styles.navBar}>

            <View style={styles.navContent}>

                <View
                    style={styles.search}>
                    <Image
                        style={styles.searchImg}
                        source={Images.search_gray}/>


                    <TextInput
                        ref={ref => this.input = ref}
                        onChangeText={text => {
                            this.keywords = text;
                        }}
                        style={styles.txtSearch}
                        underlineColorAndroid='transparent'
                        returnKeyLabel={I18n.t('certain')}
                        clearButtonMode='always'
                        placeholderColor={Colors._AAA}
                        onSubmitEditing={this.submitSearch}
                        returnKeyType={'search'}
                        placeholder={I18n.t('mall_search')}/>

                </View>
                <TouchableOpacity
                    onPress={() => {
                        global.router.pop()
                    }}
                    style={styles.btnCat}>
                    <Text>取消</Text>

                </TouchableOpacity>
            </View>

        </View>)


    };
}

const styles= StyleSheet.create({
    btnCat: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSearch: {
        color: Colors.txt_444,
        fontSize: 12,
        height: Platform.OS === 'ios' ? 30 : 40,
        width: 210
    },
    navContent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44
    },
    search: {
        height: 28,
        width: 270,
        backgroundColor: Colors._ECE,
        borderRadius: 3,
        marginLeft: 17,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchImg: {
        height: 17,
        width: 17,
        marginLeft: 14,
        marginRight: 9,
        opacity: 0.8
    },
    navBar: {
        height: Metrics.navBarHeight,
        width: '100%',
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: Colors._ECE
    },
    viewSearch: {
        position: 'absolute',
        top: Metrics.navBarHeight,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors._ECE
    }
})


