import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    ScrollView, InteractionManager,FlatList
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import RenderHtml from '../comm/RenderHtml';
import {getInfos} from '../../services/MacauDao'
import {isEmptyObject, strNotNull, uShareInfoItem} from "../../utils/ComonHelper";
import LoadingView from "../../components/load/LoadingView";
import RenderItem from './RenderItem';
import styles from './fastStyles'

export default class FastFoodPage extends Component {

    _separator=()=>{
        return (
            <View style={{height:1,width:'100%',backgroundColor:'#F3F3F3'}}/>
        )
    };

    _renderItem=({item,index})=>{
        return <RenderItem item={item}/>
    };

    render(){
        return(
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    title={'快餐热线'}
                    toolbarStyle={{
                        backgroundColor: Colors._E54
                    }}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                />
                <ScrollView>
                    <FlatList
                        style={{backgroundColor:'white',paddingLeft:17,paddingRight:17}}
                        data={[1,2,3,4,5,6,7]}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                    />
                </ScrollView>

            </View>
        )
    }
}
