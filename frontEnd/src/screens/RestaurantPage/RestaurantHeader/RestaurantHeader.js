import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground } from 'react-native';
import StarRating from 'react-native-star-rating';
import { AntDesign } from '@expo/vector-icons';

const RestaurantHeader = ({ state, onStarRatingPressed, favorite, dismiss }) => {
	return (
		<TouchableWithoutFeedback testID={'header'} onPress={dismiss}>
			<View style={styles.header}>
				<Image testID={'logoImage'} source={{ uri: state.restaurantImage }} style={styles.logoImage}></Image>
				<View testID={'titleHeader'} style={styles.titleHeader}>
					<Text testID={'restaurantName'} style={styles.restaurantName}>
						{state.restaurantName}
					</Text>
					<TouchableOpacity testID={'favoriteButton'} onPress={favorite} style={styles.favoriteButton}>
						<AntDesign name='heart' style={{ color: state.favoriteColor, fontSize: 30 }} />
					</TouchableOpacity>
				</View>
				<View testID={'titleBody'} style={styles.titleBody}>
					<View testID={'infoContainer'} style={styles.infoContainer}>
						<Text testID={'categoriesText'} style={styles.categoriesText}>
							{state.allCategories} • {state.rating}★
						</Text>
						<Text testID={'phoneNumberText'} style={styles.phoneNumberText}>
							{state.phoneNumber} • {state.reviews} Yelp Reviews
						</Text>
					</View>
					<View testID={'starRatingContainer'} style={styles.starRatingContainer}>
						<StarRating
							disabled={false}
							emptyStar={'ios-star-outline'}
							fullStar={'ios-star'}
							halfStar={'ios-star-half'}
							iconSet={'Ionicons'}
							maxStars={5}
							disabled={state.rated}
							rating={state.starCount}
							selectedStar={(rating) => onStarRatingPressed(rating)}
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
	}
});
