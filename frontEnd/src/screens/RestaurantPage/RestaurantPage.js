import React, { useEffect, useRef } from 'react';
import { StyleSheet, Keyboard, View, TextInput, Alert, TouchableOpacity, Image, ImageBackground, Animated, FlatList, TouchableWithoutFeedback } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { getMenuItemsAsync, selectRestaurantPageState, updateFavoriteColor, updateMenuItems, updateStarCount, updateState, resetRestaurantPageRequestStatus } from './redux/restaurantPageSlice';
import { selectStarRatingState, starRatingAsync } from './redux/starRatingSlice';
import { postMenuItemAsync, resetMenuItem, selectMenuItemState, updateDescription, updatePrice } from './redux/menuItemSlice';
import { favoriteAsync, resetFavorite, selectFavoriteState } from './redux/favoriteSlice';
import RestaurantHeader from './RestaurantHeader/RestaurantHeader';
import MenuItemsList from './MenuItemsList/MenuItemsList';
import MenuItem from './MenuItem/MenuItem';
import AddMenuItem from './AddMenuItem/AddMenuItem';

const RestaurantPage = ({ navigation, route }) => {
	const keyboardVisible = useRef(false);
	const bounceValue = useRef(new Animated.Value(1000)).current;
	const state = useSelector(selectRestaurantPageState);
	const starRatingState = useSelector(selectStarRatingState);
	const menuItemState = useSelector(selectMenuItemState);
	const favoriteState = useSelector(selectFavoriteState);
	const dispatch = useDispatch();

	//did screen focus, get restaurant data
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			// The screen is focused
			// Call any action
			getRestaurantDataOnFocus();
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [navigation]);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			keyboardVisible.current = true; // or some other action
		});
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			keyboardVisible.current = false; // or some other action
		});

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	//Star rating success check
	useEffect(() => {
		switch (starRatingState.starRatingRequestStatus) {
			case 'rejected':
				showErrorAlert('Star rating failed. Please check your network.');
				break;
			default:
				return;
		}
	}, [starRatingState]);

	//Add submit menu item check
	useEffect(() => {
		switch (menuItemState.postMenuItemRequestStatus) {
			case 'rejected':
				showErrorAlert('Menu item submit failed. Please check your network.');
				break;
			case 'fulfilled':
				menuItemSubmitted();
				break;
			default:
				return;
		}
		dispatch(resetMenuItem());
	}, [menuItemState]);

	//get menu items check
	useEffect(() => {
		switch (state.restaurantPageRequestStatus) {
			case 'rejected':
				showErrorAlert('Fetching Menu items failed. Please check your network.');
				break;
			default:
				return;
		}
		dispatch(resetRestaurantPageRequestStatus());
	}, [state]);

	//Favorite check
	useEffect(() => {
		switch (favoriteState.favoriteRequestStatus) {
			case 'rejected':
				showErrorAlert('Favoriting restaurant failed. Please check your network.');
				break;
			case 'fulfilled':
				console.log('favoriteColor', favoriteState.favoriteColor);
				changeColor(favoriteState.favoriteColor);
				break;
			default:
				return;
		}
		dispatch(resetFavorite());
	}, [favoriteState]);

	const showErrorAlert = (errorString) => {
		Alert.alert('Uh oh', errorString, [{ text: 'OK' }]);
	};

	const getRestaurantDataOnFocus = () => {
		const { params } = route;
		console.log('params', params);
		dispatch(updateState({ params: params }));
		console.log('favorited', params.alreadyFavorited);
		const colorFavorited = params.alreadyFavorited ? 'red' : 'white';
		changeColor(colorFavorited);

		dispatch(getMenuItemsAsync(params.id));
	};

	const showMenuItemOverlay = (shown) => {
		console.log('shown', shown);
		let toValue;
		if (shown) {
			toValue = 0;
		} else {
			toValue = 1000;
		}
		Animated.spring(bounceValue, {
			toValue: toValue,
			velocity: 5,
			tension: 2,
			friction: 8,
			useNativeDriver: true
		}).start();
	};

	const changeColor = (color) => {
		dispatch(updateFavoriteColor({ color: color }));
	};

	const onStarRatingPress = (rating) => {
		dispatch(updateStarCount({ starCount: rating }));
		dispatch(starRatingAsync({ rating: rating, restaurantId: state.restaurantId, restaurantName: state.restaurantName }));
	};

	const getDataFromMenuItem = () => {
		dispatch(postMenuItemAsync({ description: menuItemState.description, price: menuItemState.price, restaurantName: state.restaurantName, restaurantId: state.restaurantId }));
		showMenuItemOverlay(false);
	};

	const menuItemSubmitted = () => {
		let price = menuItemState.price;
		if (price % 1 == 0) {
			price = parseFloat(price.toString());
		}
		console.log('menuItemSubmitted', price, menuItemState.description);
		dispatch(updateMenuItems({ menuItem: { price: price, content: menuItemState.description } }));
	};

	const favorite = () => {
		dispatch(favoriteAsync({ restaurantId: state.restaurantId, name: state.restaurantName }));
	};

	const dismiss = () => {
		if (keyboardVisible.current) {
			Keyboard.dismiss();
		}
		if (!keyboardVisible.current) {
			showMenuItemOverlay(false);
		}
	};

	return (
		<View style={styles.container}>
			<RestaurantHeader state={state} showMenuItemOverlay={showMenuItemOverlay} onStarRatingPress={onStarRatingPress} favorite={favorite} dismiss={dismiss} />
			<MenuItemsList state={state} showMenuItemOverlay={showMenuItemOverlay} dismiss={dismiss} />
			<AddMenuItem
				bounceValue={bounceValue}
				menuItemState={menuItemState}
				dispatch={dispatch}
				updatePrice={updatePrice}
				updateDescription={updateDescription}
				showMenuItemOverlay={showMenuItemOverlay}
				getDataFromMenuItem={getDataFromMenuItem}
				dismiss={dismiss}
			/>
		</View>
	);
};

export default RestaurantPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

//export default class RestaurantPage extends React.Component {
// constructor(props) {
// 	super(props);
// 	this.state = {
// 		restaurantId: '',
// 		restaurantName: '',
// 		restaurantImage: 'https://boozyimage.s3.us-east-2.amazonaws.com/logo.png',
// 		phoneNumber: '',
// 		allCategories: '',
// 		rating: 0.0,
// 		reviews: 0,
// 		favoriteColor: 'white',
// 		changeFavoritedColor: '',
// 		starCount: 0,
// 		favorited: false,
// 		rated: false,
// 		bounceValue: new Animated.Value(250),
// 		price: 0.0,
// 		description: '',
// 		menuItemArray: []
// 	};
// 	this.populateMenuItems = this.populateMenuItems.bind(this);
// }

// showMenuItemOverlay() {
// 	var toValue = 400;
// 	if (isHidden) {
// 		toValue = 0;
// 	}
// 	Animated.spring(this.state.bounceValue, {
// 		toValue: toValue,
// 		velocity: 5,
// 		tension: 2,
// 		friction: 8
// 	}).start();
// 	isHidden = !isHidden;
// }

// onFocusFunction = () => {
// 	const { params } = this.props.route;
// 	console.log('params', params);
// 	this.state.restaurantId = params ? params.id : '';
// 	this.state.restaurantName = params ? params.name : '';
// 	this.state.restaurantImage = params ? params.img : 'https://boozyimage.s3.us-east-2.amazonaws.com/logo.png';
// 	this.state.phoneNumber = params ? params.phone : '';
// 	this.state.allCategories = params ? params.allCategories : '';
// 	this.state.rating = params ? params.rating : 0.0;
// 	this.state.reviews = params ? params.reviews : 0;
// 	this.state.rated = params ? params.alreadyRated : false;
// 	this.state.favorited = params ? params.alreadyFavorited : false;
// 	this.state.starCount = 0;

// 	if (this.state.favorited) {
// 		this.changeColor('red');
// 	} else {
// 		this.changeColor('white');
// 	}
// 	const axios = require('axios').default;
// 	axios
// 		.post(
// 			'https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/menu/list',
// 			{
// 				restaurantId: this.state.restaurantId
// 			},
// 			{
// 				headers: {
// 					Accept: 'application/json, text/plain, */*',
// 					'Content-Type': 'application/json'
// 				}
// 			}
// 		)
// 		.then((response) => {
// 			this.populateMenuItems(response.data);
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// };

// populateMenuItems(response) {
// 	this.setState({
// 		menuItemArray: response
// 	});
// }

// async componentDidMount() {
// 	this.focusListener = this.props.navigation.addListener('didFocus', () => {
// 		this.onFocusFunction();
// 	});
// }

// componentWillUnmount() {
// 	this.focusListener.remove();
// }

// changeColor = (color) => {
// 	this.setState({
// 		favoriteColor: color
// 	});
// };

// onStarRatingPress(rating) {
// 	this.setState({
// 		starCount: rating
// 	});
// 	const axios = require('axios').default;
// 	axios
// 		.post(
// 			'https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/user/' + this.state.restaurantId + '/restaurants',
// 			{
// 				content: rating,
// 				name: this.state.restaurantName
// 			},
// 			{
// 				headers: {
// 					Accept: 'application/json, text/plain, */*',
// 					'Content-Type': 'application/json'
// 				}
// 			}
// 		)
// 		.then((response) => {
// 			console.log('Rating sent!');
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// }

// getDataFromMenuItem() {
// 	const axios = require('axios').default;
// 	if (!this.state.price || this.state.price.trim().length === 0) {
// 		this.setState({ price: '' });
// 	}
// 	if (!this.state.description || this.state.description.trim().length === 0) {
// 		this.setState({ description: '' });
// 	}
// 	axios
// 		.post('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/user/' + this.state.restaurantId + '/menu', {
// 			content: this.state.description,
// 			price: this.state.price,
// 			name: this.state.restaurantName
// 		})
// 		.then((response) => {
// 			this.menuItemSubmitted();
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// }

// menuItemSubmitted() {
// 	if (this.state.price % 1 == 0) {
// 		this.state.price = parseFloat(this.state.price.toString());
// 	}
// 	this.state.menuItemArray.push({
// 		price: this.state.price,
// 		content: this.state.description
// 	});
// 	this.setState({ menuItemArray: this.state.menuItemArray });
// 	this.showMenuItemOverlay();
// }

//favorite() {
// const axios = require('axios').default;
// axios
// 	.post(
// 		`https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/user/add`,
// 		{
// 			restaurantId: this.state.restaurantId,
// 			name: this.state.restaurantName
// 		},
// 		{
// 			headers: {
// 				Accept: 'application/json, text/plain, */*',
// 				'Content-Type': 'application/json'
// 			}
// 		}
// 	)
// 	.then((response) => {
// 		console.log('Favorited/Unfavorite!');
// 		axios
// 			.post(
// 				`https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/favorites`,
// 				{
// 					restaurantId: this.state.restaurantId,
// 					name: this.state.restaurantName
// 				},
// 				{
// 					headers: {
// 						Accept: 'application/json, text/plain, */*',
// 						'Content-Type': 'application/json'
// 					}
// 				}
// 			)
// 			.then((response) => {
// 				this.favoriteChangeColor(response);
// 			})
// 			.catch(function (error) {
// 				console.log(error);
// 			});
// 	})
// 	.catch(function (error) {
// 		console.log(error);
// 	});
//}

// favoriteChangeColor(data) {
// 	const favoriteColor = data[0]['contains'] ? 'red' : 'white';
// 	this.changeColor(favoriteColor);
// }

// render() {
// 	let items = this.state.menuItemArray.map((val, key) => {
// 		return <MenuItem key={key} keyval={key} val={val} />;
// 	});

// 	return (
// 		<View style={styles.container}>
// 			<ImageBackground source={background} style={styles.backgroundImage}></ImageBackground>
// 			<Image source={{ uri: this.state.restaurantImage }} style={styles.logoImage}></Image>
// 			<Text style={styles.headerText}> {this.state.restaurantName} </Text>
// 			<Text style={styles.categoriesText}>
// 				{this.state.allCategories} • {this.state.rating}★
// 			</Text>
// 			<Text style={styles.phoneNumberText}>
// 				{this.state.phoneNumber} • {this.state.reviews} Yelp Reviews
// 			</Text>
// 			<TouchableOpacity onPress={this.favorite.bind(this)} style={styles.favoriteButton}>
// 				<AntDesign name='heart' style={{ color: this.state.favoriteColor, fontSize: 30 }} />
// 			</TouchableOpacity>
// 			<TouchableOpacity onPress={this.showMenuItemOverlay.bind(this)} style={styles.menuButton}>
// 				<Text style={styles.menuItemText}>+ Menu Item</Text>
// 			</TouchableOpacity>
// 			<Text style={styles.header2Text}> Menu items </Text>
// 			<ScrollView style={styles.scrollContainer}>{items}</ScrollView>
// 			<Animated.View style={[styles.subView, { transform: [{ translateY: this.state.bounceValue }] }]}>
// 				<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#EB8873' }}>Add Menu Item</Text>
// 				<TouchableOpacity onPress={this.showMenuItemOverlay.bind(this)} style={styles.cancelButton}>
// 					<Text style={styles.cancelText}>Cancel</Text>
// 				</TouchableOpacity>
// 				<TouchableOpacity onPress={this.getDataFromMenuItem.bind(this)} style={styles.addMenuItemButton}>
// 					<Text style={styles.addMenuItemText}>Submit</Text>
// 				</TouchableOpacity>
// 				<TextInput style={styles.priceStyle} keyboardType={'numeric'} multiline={false} value='' returnKeyType='next' onChangeText={(price) => this.setState({ price })} value={this.state.price.toString()} placeholder='Enter Price' />
// 				<TextInput style={styles.descriptionStyle} multiline={false} returnKeyType='next' onChangeText={(description) => this.setState({ description })} value={this.state.description} placeholder='Enter menu item' />
// 			</Animated.View>

// 			<StarRating
// 				disabled={false}
// 				emptyStar={'ios-star-outline'}
// 				fullStar={'ios-star'}
// 				halfStar={'ios-star-half'}
// 				iconSet={'Ionicons'}
// 				maxStars={5}
// 				disabled={this.state.rated}
// 				rating={this.state.starCount}
// 				selectedStar={(rating) => this.onStarRatingPress(rating)}
// 				fullStarColor={'yellow'}
// 				ratingBackgroundColor='white'
// 				containerStyle={{ position: 'absolute', top: 300, left: 125 }}
// 			/>
// 		</View>
// 	);
// }
//}
