import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import Swipeout from 'react-native-swipeout';

const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];

export default class ShoppingCart extends PureComponent {
    state = {
        showCart: true,
        showEdit: true,
        showBottom: true,
        selected: false,
        text: "1",
        selectAll: false,
        dataHosts: [],
        selectArray: []
    };

    componentDidMount() {

        data.map(function (x) {
            x.isSelect = false
        });
        this.setState({
            dataHosts: data
        })
    }


    toBottom = () => {
        return (
            <View style={styleS.bottomView}>
                <TouchableOpacity

                    onPress={()=>{
                            this.setState({
                                selectAll:!this.state.selectAll
                            }),this._pressAll()
                        }}>
                    <Image style={styleS.radioImg} source={this.state.selectAll ? Images.radioSelected : Images.radio}/>
                </TouchableOpacity>
                <Text style={styleS.selectedAll}>全选</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styleS.total}>合计：</Text>
                    <Text style={styleS.selectedPrice}>¥23,300.8</Text>
                </View>
                <View style={{flex: 1}}/>
                <TouchableOpacity style={styleS.settlementView}>
                    <Text style={styleS.settlement}>去结算</Text>
                    <Text style={styleS.settlementQuantity}>(3)</Text>
                </TouchableOpacity>
            </View>
        )
    };

    _isSelect = (x) => {
        return (x.isSelect === false);
    };
    _deleteItem = () => {
        const {dataHosts} = this.state;
        let newSelects = [...dataHosts];
        newSelects = newSelects.filter(this._isSelect);
        this.setState({dataHosts:newSelects});
    };
    toBottom2 = () => {
        return (
            <View style={styleS.bottomView}>
                <TouchableOpacity

                    onPress={()=>{
                            this.setState({
                                selectAll:!this.state.selectAll
                            }),this._pressAll()
                        }}>
                    <Image style={styleS.radioImg} source={this.state.selectAll ? Images.radioSelected : Images.radio}/>
                </TouchableOpacity>
                <Text style={styleS.selectedAll}>全选</Text>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    style={styleS.settlementView2}
                    onPress={()=>{
                        this._deleteItem()
                    }}>
                    <Text style={styleS.settlement2}>删除</Text>
                </TouchableOpacity>
            </View>
        )
    };

    topBar = () => {
        return (<View style={styleS.topBar}>
            <TouchableOpacity
                testID="btn_bar_left"
                style={styleS.popBtn}
                onPress={() => router.pop()}>
                <Image style={styleS.backImg}
                       source={Images.mall_return}/>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <Text style={styleS.cart}>{this.state.showCart ? '购物车' : ""}</Text>
            <View style={{flex: 1}}/>
            <TouchableOpacity
                testID="btn_bar_right"
                style={styleS.popBtn}
                onPress={() => {
                    this.setState({
                        showEdit: !this.state.showEdit,
                        showCart: !this.state.showCart,
                        showBottom: !this.state.showBottom,
                    }),this.refreshAll()
                }}>
                <Text style={styleS.rightTxt}>{this.state.showEdit ? '编辑' : '完成'}</Text>
            </TouchableOpacity>


        </View>)
    };
    closeThisMall = () => {
        return (
            alert("确认删除该商品吗？")
        )
    };
    _pressAll = () => {
        const {dataHosts} = this.state;
        let newSelects = [...dataHosts];
        if (this.state.selectAll === false) {
            newSelects.map(function (x) {
                x.isSelect = true
            });
        } else {
            newSelects.map(function (x) {
                x.isSelect = false
            });
        }


        this.setState({newSelects})
    };
    refreshAll = () => {
        const {dataHosts} = this.state;
        let newSelects = [...dataHosts];
        newSelects.map(function (x) {
            x.isSelect = false
        });
        this.setState({newSelects})
    };

    _pressItem = (item) => {

        const {dataHosts} = this.state;
        let newSelects = [...dataHosts];
        newSelects.map(function (x) {
            if (x.id === item.id) {
                item.isSelect = !item.isSelect;
            }
        });

        this.setState({newSelects})
    };

    renderShowEditView(item, onPress) {
        let imageURL = Images.radio;
        if (item.isSelect === true) {
            imageURL = Images.radioSelected
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    onPress(item, item.index)
                }}>
                <Image style={styleS.radioImg}
                       source={imageURL}/>
            </TouchableOpacity>
        )
    };

    _renderItem = ({item}) => {
        let swipeoutBtns = [
            {
                text: 'Delete',
                backgroundColor: '#F34A4A',
                onPress: this.closeThisMall
            }
        ];
        return (
            <Swipeout right={swipeoutBtns}>
                <View style={styleS.renderItem}>
                    {this.renderShowEditView(item, () => {
                        this._pressItem(item)
                    })}

                    <Image style={styleS.mallImg} source={Images.empty_image}/>
                    <View style={styleS.TxtView}>
                        <Text numberOfLines={2} style={styleS.mallTextName}>筹码14克皇冠粘土百家乐德州扑克筹码币</Text>
                        <Text style={styleS.mallAttributes}>重量：1.62KG 颜色：黑 数量：500</Text>
                        <View style={styleS.PriceView}>
                            <Text style={styleS.Price}>¥555555.55</Text>
                            {this.buyQuantity()}
                        </View>
                    </View>
                </View>
            </Swipeout>
        )
    };
    buyQuantity = () => {
        const styleCutDisable = {
            backgroundColor: '#FBFAFA'
        };
        const styleCut = {
            backgroundColor: '#F6F5F5'
        };
        return (
            <View style={styleS.quantity}>
                <TouchableOpacity
                    style={[styleS.buyTouch, Number(this.state.text) === "1" ? styleCutDisable : styleCut]}
                    onPress={() => {
                        let number = Number(this.state.text)
                        if (number >= 1) {
                            this.setState({
                                text: number - 1
                            })
                        }

                    }}>
                    <Image style={styleS.buyImgCut} source={Images.cut}/>
                </TouchableOpacity>

                <View style={styleS.buyInput}>
                    <Text>1</Text>
                </View>

                <TouchableOpacity
                    style={styleS.buyTouch}
                    onPress={() => {
                        let number = Number(this.state.text)
                        this.setState({
                            text: number + 1
                        })
                    }}>
                    <Image style={styleS.buyImgAdd} source={Images.add}/>
                </TouchableOpacity>
            </View>
        )
    };


    _separator = () => {
        return <View style={{height: 10, marginLeft: 17, marginRight: 17, backgroundColor: '#ECECEE'}}/>;
    };
    _keyExtractor = (item, index) => item.id;

    render() {

        console.log(this.state.dataHosts)
        return (
            <View style={{flex: 1}}>
                {this.topBar()}

                <FlatList
                    style={{paddingTop: 6, marginBottom: 50}}
                    data={this.state.dataHosts}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />

                {this.state.showBottom ? this.toBottom() : this.toBottom2()}

            </View>
        )
    }
}

const styleS = StyleSheet.create({

    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: '#FFFFFF',
        width: '100%',
        zIndex: 999
    },
    popBtn: {
        height: 44,
        width: 50,
        justifyContent: 'center'
    },
    backImg: {
        width: 11,
        height: 20,
        marginLeft: 15
    },
    rightTxt: {
        fontSize: 15,
        color: '#161718'
    },
    cart: {
        fontSize: 17,
        color: '#161718',
        alignItems: 'center'
    },
    radioImg: {
        width: 22,
        height: 22,
        marginLeft: 16
    },
    mallImg: {
        width: 100,
        height: 96,
        marginLeft: 11
    },
    TxtView: {
        flex: 1,
        marginLeft: 12,
    },
    mallTextName: {
        fontSize: 14,
        color: '#333333',
        marginRight: 27
    },
    mallAttributes: {
        fontSize: 10,
        color: '#AAAAAA',
        marginRight: 27,
        marginTop: 5
    },
    PriceView: {
        flexDirection: 'row',
    },
    Price: {
        fontSize: 14,
        color: '#F34A4A',
        marginTop: 19
    },
    buyTouch: {
        width: 33,
        height: 30,
        backgroundColor: '#F6F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyImgCut: {
        width: 12,
        height: 2
    },
    buyImgAdd: {
        width: 12,
        height: 12,
    },
    buyInput: {
        width: 38,
        height: 30,
        borderRadius: 1,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: '#F6F5F5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buyTextInput: {
        fontSize: 15,
        color: '#444444',
    },
    renderItem: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingTop: 15, paddingBottom: 11
    },
    quantity: {
        marginRight: 17, flexDirection: 'row', alignItems: 'center', marginTop: 9, marginLeft: 15
    },
    selectedAll: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 6
    },
    total: {
        fontSize: 16,
        color: '#333333',
        marginLeft: 12
    },
    selectedPrice: {
        fontSize: 18,
        color: '#DF1D0F',
    },
    settlementView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 120,
        backgroundColor: '#F34A4A'
    },
    settlement: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    settlementQuantity: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    bottomView: {
        backgroundColor: '#FFFFFF',
        height: 50,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    settlementView2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 37,
        width: 89,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#F34A4A'
    },
    settlement2: {
        fontSize: 18,
        color: '#F34A4A',
    },
})