import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Favorite = ({ keyval, val }) => {
	return (
		<View key={keyval} style={styles.item}>
			<Text style={styles.itemText}>{val.name}</Text>
		</View>
	);
};

export default Favorite;

const styles = StyleSheet.create({
	item: {
		flex: 1,
		width: '100%',
		borderBottomWidth: 2,
		borderBottomColor: '#ededed',
		paddingHorizontal: 100,
		paddingVertical: 20
	},
	itemText: {
		color: 'black'
	},
	viewList: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 20
	},
	viewText: {
		color: 'white',
		fontWeight: 'bold'
	}
});
