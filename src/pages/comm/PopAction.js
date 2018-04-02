import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Modal, Text} from 'react-native';
import {Images, Colors} from '../../Themes/index';
import propTypes from 'prop-types';
import I18n from 'react-native-i18n';


export default class PopAction extends PureComponent {

    static propTypes = {
        btnArray: propTypes.array
    }

    state = {
        visible: false
    };

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    componentWillMount() {
        this.props.btnArray.push({name: I18n.t('cancel'), txtStyle: {color: Colors._AAA}});
    }


    btnArrayView = () => {

        const {btnArray} = this.props;


        return btnArray.map((item, index) => {
            return <TouchableOpacity
                key={'action' + index}
                style={{
                    height: 50,
                    backgroundColor: 'white',
                    borderBottomColor: Colors._ECE,
                    borderBottomWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}>

                <Text style={[{fontSize: 17, fontWeight: 'bold'}, item.txtStyle]}>{item.name}</Text>

            </TouchableOpacity>


        })


    }

    render() {


        return (<Modal
            animationType="slide"
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => {
            }}>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
                    {this.btnArrayView()}
                </View>

            </View>

        </Modal>)
    }
}