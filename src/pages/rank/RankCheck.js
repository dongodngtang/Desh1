import React,{Component, PropTypes} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {Colors, Images} from '../../Themes';

class RankCheck extends Component {
    static propTypes = {
        checkTitle: PropTypes.string,
        checkData: PropTypes.array,
        checkType: PropTypes.func,
        checkList: PropTypes.func
    };

    constructor(props){
        super(props);
        this.selectArr = [];
        this.state = {
            check: false,
            itemArr: [],
            name: '',
            testarr: []
        }
    }

    componentWillMount(checkData){
        let length= this.props.checkData.length;
        let arr = [];
        for(let i = 0 ;i < length;i++){
            let data = this.props.checkData[i];
            let item = {index:i,infoData: data,select:false, info: ''};
            arr.push(item);
        }

        this.setState({
            itemArr:arr,
        });
    }

    selectedBtn = (key) => {
        let arr = this.state.itemArr;
        if(arr[key].index == key){
            arr[key].select = !arr[key].select;
            this.setState({
                itemArr: arr
            });
        }
    };

    cancelBtn = () => {
        let arr = this.state.itemArr;
        let arrClear = [];
        for(let i = 0 ;i < arr.length;i++){
            let infoData = this.props.checkData[i];
            let item = {index:i,infoData: infoData,select:false,info: ''};
            arrClear.push(item);
        }

        this.setState({
            itemArr:arrClear,
        });
    };

    sureBtn = () => {
        let arr = this.state.itemArr;
        for(let i=0;i<arr.length;i++){
            if(arr[i].info){
                var check_type = arr[i].info;
                return check_type
            }else{
                return null
            }
        };
    };

    lineView = (checkData) => {
        if(this.props.checkData.length == 0){
            return(
                <View style={{height:1,backgroundColor: Colors.bg_f5,marginTop: 5,marginBottom: 20,width: 0}}></View>
            )
        }else if(this.props.checkData.length == 1){
            return(
                <View style={{height:1,backgroundColor: Colors.bg_f5,marginTop: 5,marginBottom: 20,width: 72}}></View>
            )
        }else if(this.props.checkData.length == 2){
            return(
                <View style={{height:1,backgroundColor: Colors.bg_f5,marginTop: 5,marginBottom: 20,width: 155}}></View>
            )
        }else{
            return(
                <View style={{height:1,backgroundColor: Colors.bg_f5,marginTop: 5,marginBottom: 20,width: 239}}></View>
            )
        }
    };

    choiceBtn = (checkData) => {
        const {testarr} = this.state;
        let arr = this.state.itemArr;
        return(<View style={{flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'flex-start'}}>
            {
                this.props.checkData.map((item,key) => {
                    let is_select = null;
                    let info = null;
                    if(arr[key].index == key){
                        is_select = arr[key].select;
                    }
                    if(arr[key].select){
                        arr[key].info = arr[key].infoData;
                    }else{
                        arr[key].info = '';
                    }

                    return(
                        <TouchableOpacity key={key} onPress={() => {
                            {this.selectedBtn(key);}
                        }}
                                  style={styles.btn_style}>
                            <Image source={is_select?Images.Group:Images.Group_em}
                                   style={{width: 72,height: 30,alignItems: 'center',justifyContent: 'center'}}>
                                <Text style={{color: Colors._333,fontSize: 15}}>{item}</Text>
                            </Image>
                        </TouchableOpacity>
                    )
                })
            }
        </View>);

    };

    render(){
        return(<View>
            <Text style={{lineHeight: 21,fontSize: 15,color: Colors._888}} onPress={() => this.sureBtn()}>{this.props.checkTitle}</Text>
            {this.lineView()}
            {this.choiceBtn()}
        </View>)
    }
}

export default RankCheck;

const styles = StyleSheet.create({
    btn_style: {
        width: 72,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginRight: 13
    }
});
