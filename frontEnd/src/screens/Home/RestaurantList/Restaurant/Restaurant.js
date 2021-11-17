import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const Restaurant = ({ keyval, val, viewRestaurant, dismiss }) => {
	const dismissAndViewRestaurant = () => {
		dismiss();
		viewRestaurant();
	};
	return (
		<TouchableWithoutFeedback onPress={dismissAndViewRestaurant}>
			<View testID={'container'} key={keyval} style={styles.container}>
				<Text testID={'nameText'} style={styles.nameText}>
					{val.name}
				</Text>
				<TouchableOpacity testID={'viewRestaurant'} onPress={viewRestaurant} style={styles.viewButton}>
					<Text testID={'viewText'} style={styles.viewText}>
						view
					</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Restaurant;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		paddingHorizontal: 30,
		borderBottomWidth: 2,
		borderBottomColor: '#ededed'
	},
	nameText: {
		color: 'black'
	},
	viewButton: {
		padding: 5,
		backgroundColor: '#EB8873',
		borderRadius: 20
	},
	viewText: {
		color: 'white',
		fontWeight: 'bold'
	}
});
