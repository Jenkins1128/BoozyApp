import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

const MenuItem = ({ keyval, val, dismiss }) => {
	return (
		<TouchableWithoutFeedback testID={'container'} onPress={dismiss}>
			<View key={keyval} style={styles.container}>
				<Text testID={'priceText'} style={styles.priceText}>
					${val.price}
				</Text>
				<Text testID={'descText'} style={styles.descText}>
					{val.content}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default MenuItem;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		paddingRight: 100,
		borderBottomWidth: 2,
		borderBottomColor: '#ededed'
	},
	priceText: {
		color: 'black'
	},
	descText: {
		color: 'black'
	}
});
