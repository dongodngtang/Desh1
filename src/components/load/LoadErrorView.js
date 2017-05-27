/**
 * Created by lorne on 2017/3/8.
 */
import React, {PropTypes, Component}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {Button} from '../../components'

export default class LoadErrorView extends Component {

    render() {
        return (<View
            testID="view_load_error"
            style={styles.page}>

            <View style={{alignItems:'center',justifyContent:'center',
            marginTop:140}}>
                <Image
                    resizeMode={'contain'}
                    style={{height:100,width:155}}
                    source={Images.load_error}/>

                <Text style={[Fonts.H18,{color:Colors._AAA,
                marginTop:19}]}>{I18n.t('load_error')}</Text>
                <Button
                    testID="btn_retry"
                    onPress={()=>{
                    if(this.props.onPress !== undefined)
                        this.props.onPress();
                }}
                    style={{backgroundColor:Colors._161817,
                height:40,width:172,marginTop:37,justifyContent:'center'}}
                    textStyle={[Fonts.H17,{color:Colors.txt_E4D}]}>
                    {I18n.t('retry')}
                </Button>
            </View>


        </View>)
    }
}


const styles = StyleSheet.create({
    page: {
        backgroundColor: Colors.bg_f5
    }
});