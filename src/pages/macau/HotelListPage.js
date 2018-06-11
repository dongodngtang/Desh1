import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, FlatList
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import SearchBar from './SearchBar';
import TimeSpecificationInfo from './TimeSpecificationInfo';
import ImageLoad from "../../components/ImageLoad";


export default class HotelListPage extends PureComponent {

    state = {
        timeShow: false
    };

    showSpecInfo = (temp) => {
        this.setState({
            timeShow: !this.state.timeShow
        })
    };

    componentDidMount() {

    }


    render() {
        let data = [1, 2, 3, 4];
        const {timeShow} = this.state;
        return (<View style={{flex: 1}}>
                <SearchBar
                    showSpecInfo={this.showSpecInfo}/>

                {timeShow ? <TimeSpecificationInfo
                    showSpecInfo={this.showSpecInfo}/> : null}

                <FlatList
                    ListHeaderComponent={() => {
                        this._separator();
                    }}
                    style={styles.list}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    data={data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index + "item"}
                />


            </View>
        )
    }

    _renderItem = () => {
        return (
            <View style={styles.item}>
                <ImageLoad
                    emptyBg={Images.home_avatar}
                    style={{width: 67, height: 95}}
                    source={Images.Group}/>
                <View>

                </View>
            </View>
        )
    };

    _separator = () => {
        return (
            <View style={{width: '100%', height: 5, backgroundColor: '#ECECEE'}}/>
        )
    }


}
const styles = StyleSheet.create({
    list: {
        backgroundColor:"white"
    },
    item:{
        flexDirection:'row',
        alignItems:"center",
        marginLeft:12,
        marginRight:22,
        paddingTop:17,
        paddingBottom:17
    }
})

