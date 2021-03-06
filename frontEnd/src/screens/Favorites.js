import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default class Favorites extends React.Component{
    render(){
        
        return (
          
                <View key={this.props.keyval} style={styles.todo}>
                    <Text style={styles.todoText}>{this.props.val.name}</Text>
                    <TouchableOpacity onPress={this.props.viewFavorite} style={styles.viewList}>
                        <Text style={styles.viewText}></Text>
                    </TouchableOpacity>
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
    todoText: {
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
        backgroundColor: '#fff',
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