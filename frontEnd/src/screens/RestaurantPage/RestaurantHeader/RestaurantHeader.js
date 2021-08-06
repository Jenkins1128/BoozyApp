import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground } from 'react-native';
import StarRating from 'react-native-star-rating';
import background from '../../../images/background.jpeg';
import { AntDesign } from '@expo/vector-icons';

const RestaurantHeader = ({ state, onStarRatingPress, favorite, dismiss }) => {
	return (
		<TouchableWithoutFeedback onPress={dismiss}>
			<View style={styles.header}>
				<Image source={{ uri: state.restaurantImage }} style={styles.logoImage}></Image>
				<View style={styles.titleHeader}>
					<Text style={styles.restaurantName}> {state.restaurantName} </Text>
					<TouchableOpacity onPress={favorite} style={styles.favoriteButton}>
						<AntDesign name='heart' style={{ color: state.favoriteColor, fontSize: 30 }} />
					</TouchableOpacity>
				</View>
				<View style={styles.titleBody}>
					<View style={styles.infoContainer}>
						<Text style={styles.categoriesText}>
							{state.allCategories} • {state.rating}★
						</Text>
						<Text style={styles.phoneNumberText}>
							{state.phoneNumber} • {state.reviews} Yelp Reviews
						</Text>
					</View>
					<View style={styles.starRatingContainer}>
						<StarRating
							disabled={false}
							emptyStar={'ios-star-outline'}
							fullStar={'ios-star'}
							halfStar={'ios-star-half'}
							iconSet={'Ionicons'}
							maxStars={5}
							disabled={state.rated}
							rating={state.starCount}
							selectedStar={(rating) => onStarRatingPress(rating)}
							fullStarColor={'yellow'}
							ratingBackgroundColor='white'
							starSize={30}
						/>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default RestaurantHeader;

const styles = StyleSheet.create({
	header: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		backgroundColor: '#EB8873'
	},
	backgroundImage: {
		flex: 1,
		opacity: 0.95
	},
	titleHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10
	},
	logoImage: {
		flex: 2,
		width: '100%',
		height: '100%'
	},
	restaurantName: {
		color: 'white',
		fontSize: 25,
		fontWeight: 'bold',
		marginLeft: 10
	},
	categoriesText: {
		fontSize: 14,
		marginBottom: 0,
		color: 'white'
	},
	phoneNumberText: {
		fontSize: 14,
		marginBottom: 0,
		color: 'white'
	},
	favoriteButton: {
		marginBottom: 0,
		margin: 10
	},
	titleBody: {
		flex: 1,
		marginHorizontal: 15
	},
	infoContainer: {
		flex: 1,
		marginBottom: 0
	},
	starRatingContainer: {
		flex: 1,
		paddingBottom: 0
	},
	menuButtonContainer: {}
});
