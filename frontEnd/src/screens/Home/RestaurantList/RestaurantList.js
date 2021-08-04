import React from 'react';
import { View, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const RestaurantList = ({ state, restaurant, dismiss }) => {
	return (
		<TouchableWithoutFeedback onPress={dismiss}>
			<View style={styles.scrollContainer}>
				<FlatList data={state.restaurantsArray} keyExtractor={(item, i) => i.toString()} renderItem={restaurant} />
			</View>
		</TouchableWithoutFeedback>
	);
};

export default RestaurantList;

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 2,
		width: '100%'
	}
});
