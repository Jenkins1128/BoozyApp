import React from 'react';
import { View, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Restaurant from './Restaurant/Restaurant';

const RestaurantList = ({ state, viewRestaurants, dismiss }) => {
	const restaurant = ({ item, index }) => {
		return <Restaurant key={index} keyval={index} val={item} dismiss={dismiss} viewRestaurant={() => viewRestaurants(index)} />;
	};
	return (
		<View style={styles.scrollContainer}>
			<FlatList data={state.restaurantsArray} keyExtractor={(item, i) => i.toString()} renderItem={restaurant} />
		</View>
	);
};

export default RestaurantList;

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 2,
		width: '100%'
	}
});
