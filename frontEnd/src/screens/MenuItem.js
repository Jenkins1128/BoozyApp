import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class MenuItem extends React.Component{
    render(){
        
        return (
          
                <View key={this.props.keyval} style={styles.todo}>
                    <Text style={styles.priceText}>${this.props.val.price}</Text>
                    <Text style={styles.descText}>{this.props.val.content}</Text>
                </View>
         
          );
    }
}

const styles = StyleSheet.create({
    todo: {
        position: 'relative',
        padding: 20,
        paddingRight:100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    priceText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63',
        color: 'black'
    },
    descText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63',
        color: 'black'
    },
    todoDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 0
    },
    viewList: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EB8873',
        padding: 10,
        borderRadius: 20,
        top: 10,
        bottom: 10,
        right: 10
    },
    todoDeleteText: {
        color: 'white',
    },
    viewText: {
        color: 'white',
        fontWeight: 'bold'
    }
});
