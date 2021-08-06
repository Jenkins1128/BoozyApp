import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MenuItem from '../MenuItem/MenuItem';

const MenuItemsList = ({ state, dismiss }) => {
	const menuItem = ({ item, index }) => {
		return <MenuItem key={index} keyval={index} val={item} dismiss={dismiss} />;
	};
	return (
		<View style={styles.scrollContainer}>
			<Text style={styles.menuTitle}> Menu items </Text>
			<FlatList data={state.menuItemArray} keyExtractor={(item, i) => i.toString()} renderItem={menuItem}></FlatList>
		</View>
	);
};

export default MenuItemsList;

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
		width: '100%',
		backgroundColor: 'white'
	},
	menuTitle: {
		color: 'lightgrey',
		fontSize: 20,
		marginTop: 0,
		fontWeight: 'bold',
		padding: 10
	}
});
