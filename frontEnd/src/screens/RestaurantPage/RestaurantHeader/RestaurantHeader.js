import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image, ImageBackground } from 'react-native';
import StarRating from 'react-native-star-rating';
import background from '../../../images/background.jpeg';
import { AntDesign } from '@expo/vector-icons';

const RestaurantHeader = ({ state, showMenuItemOverlay, onStarRatingPress, favorite, dismiss }) => {
	return (
		<TouchableWithoutFeedback onPress={dismiss}>
			<View style={styles.header}>
				<Image source={{ uri: state.restaurantImage }} style={styles.logoImage}></Image>
				<ImageBackground source={background} style={styles.backgroundImage}>
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
							/>
						</View>
						<View style={styles.menuButtonContainer}>
							<TouchableOpacity onPress={() => showMenuItemOverlay(true)} style={styles.menuButton}>
								<Text style={styles.menuItemText}>+ Menu Item</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default RestaurantHeader;

const styles = StyleSheet.create({
	header: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center'
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
		width: 430,
		height: 200
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
		marginTop: 5,
		marginHorizontal: 15
	},
	infoContainer: {
		marginBottom: 10
	},
	starRatingContainer: {
		marginBottom: 10
	},
	menuButtonContainer: {
		alignSelf: 'center'
	},
	menuButton: {
		width: 110,
		backgroundColor: '#EB8873',
		borderRadius: 20,
		padding: 10
	},
	menuItemText: {
		color: 'white',
		fontWeight: 'bold'
	}
});
