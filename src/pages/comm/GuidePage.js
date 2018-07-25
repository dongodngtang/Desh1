import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, KeyboardAvoidingView, FlatList, Modal
} from 'react-native';

export default class GuidePage extends Component {

    state = {
        visible: false
    };

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    }



    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                onRequestClose={() => {

                }}
                visible={this.state.visible}
                style={{alignItems:'center'}}
            >
                <View style={{flex: 1}}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={this.toggle}
                        style={{height: 110}}/>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={this.toggle} style={{flex: 1}}/>
                </View>
            </Modal>
        )
    }
}