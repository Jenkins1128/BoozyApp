import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

const MenuItem = ({ keyval, val, dismiss }) => {
	return (
		<TouchableWithoutFeedback onPress={dismiss}>
			<View key={keyval} style={styles.item}>
				<Text style={styles.priceText}>${val.price}</Text>
				<Text style={styles.descText}>{val.content}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default MenuItem;

const styles = StyleSheet.create({
	item: {
		padding: 20,
		paddingRight: 100,
		borderBottomWidth: 2,
		borderBottomColor: '#ededed'
	},
	priceText: {
		borderLeftWidth: 10,
		borderLeftColor: '#e91e63',
		color: 'black'
	},
	descText: {
		borderLeftWidth: 10,
		borderLeftColor: '#e91e63',
		color: 'black'
	}
});
