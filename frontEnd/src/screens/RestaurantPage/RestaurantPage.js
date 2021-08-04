import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, ImageBackground, Animated } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';
import MenuItem from '../MenuItem/MenuItem';
import background from '../../images/background.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItemsAsync, selectRestaurantPageState, updateFavoriteColor, updateMenuItems, updateStarCount, updateState } from './redux/restaurantPageSlice';
import { selectStarRatingState, starRatingAsync } from './redux/starRatingSlice';
import { postMenuItemAsync, resetMenuItem, selectMenuItemState } from './redux/menuItemSlice';
import { selectFavoriteState } from './redux/favoriteSlice';



const RestaurantPage = ({route}) => {
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

  //Star rating success check
  useEffect(() => {
		switch(starRatingState.starRatingRequestStatus){
			case 'rejected':
				showErrorAlert('Star rating failed. Please check your network.')
				return;
			default:
				return;
		}
  },[state])

  //Add menu check 
  useEffect(() => {
	switch(menuItemState.getMenuItemRequestStatus){
			case 'rejected':
				showErrorAlert('Star rating failed. Please check your network.')
				return;
			case 'fulfilled':
				break;
			default:
				return;
		}
		dispatch(resetMenuItem());
  }, [menuItemState])

  //Favorite check
  useEffect(() => {
	  switch(favoriteState.favoriteRequestStatus){
		case 'rejected':
			showErrorAlert('Favoriting restaurant failed. Please check your network.')
			return;
		case 'fulfilled':

			return;
		default:
			return;

	  }

  }, [favoriteState])

  const showErrorAlert = (errorString) => {
		Alert.alert('Uh oh', errorString, [{ text: 'OK' }]);
	};


  const getRestaurantDataOnFocus = () => {
		const {params } = route;
		dispatch(updateState({parmas: params}))
		
		const colorFavorited =  state.favorited ? 'red' : 'white';
		changeColor(colorFavorited);
		
		dispatch(getMenuItemsAsync(state.restaurantId))
	}

	const showFilterOverlay = (shown) => {
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
		dispatch(updateFavoriteColor({color: color}))
	};

	const onStarRatingPress = (rating) => {
		dispatch(updateStarCount({starCount: rating}))
		dispatch(starRatingAsync({rating: rating, restaurantId: state.restaurantId, restaurantName: state.restaurantName}))
	}

	const getDataFromMenuItem = () => {
		dispatch(postMenuItemAsync({description: state.description, price: state.price, restaurantName: state.restaurantName, restaurantId: state.restaurantId }))
		// const axios = require('axios').default;
		// if (!this.state.price || this.state.price.trim().length === 0) {
		// 	this.setState({ price: '' });
		// }
		// if (!this.state.description || this.state.description.trim().length === 0) {
		// 	this.setState({ description: '' });
		// }

		// axios
		// 	.post('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/user/' + this.state.restaurantId + '/menu', {
		// 		content: this.state.description,
		// 		price: this.state.price,
		// 		name: this.state.restaurantName
		// 	})
		// 	.then((response) => {
		// 		this.menuItemSubmitted();
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	});
	}

	const menuItemSubmitted = () => {
		let price = state.price;
		if (price % 1 == 0) {
			price = parseFloat(price.toString());
		}
		dispatch(updateMenuItems({price: price, content: state.description}))
		//showMenuItemOverlay(false);
	}

	const favoriteChangeColor = (data) => {
		const favoriteColor = data[0]['contains'] ? 'red' : 'white';
		this.changeColor(favoriteColor);
	}




}

export default RestaurantPage;

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

	render() {
		let items = this.state.menuItemArray.map((val, key) => {
			return <MenuItem key={key} keyval={key} val={val} />;
		});

		return (
			<View style={styles.container}>
				<ImageBackground source={background} style={styles.backgroundImage}></ImageBackground>
				<Image source={{ uri: this.state.restaurantImage }} style={styles.logoImage}></Image>
				<Text style={styles.headerText}> {this.state.restaurantName} </Text>
				<Text style={styles.categoriesText}>
					{this.state.allCategories} • {this.state.rating}★
				</Text>
				<Text style={styles.phoneNumberText}>
					{this.state.phoneNumber} • {this.state.reviews} Yelp Reviews
				</Text>
				<TouchableOpacity onPress={this.favorite.bind(this)} style={styles.favoriteButton}>
					<AntDesign name='heart' style={{ color: this.state.favoriteColor, fontSize: 30 }} />
				</TouchableOpacity>
				<TouchableOpacity onPress={this.showMenuItemOverlay.bind(this)} style={styles.menuButton}>
					<Text style={styles.menuItemText}>+ Menu Item</Text>
				</TouchableOpacity>
				<Text style={styles.header2Text}> Menu items </Text>
				<ScrollView style={styles.scrollContainer}>{items}</ScrollView>
				<Animated.View style={[styles.subView, { transform: [{ translateY: this.state.bounceValue }] }]}>
					<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#EB8873' }}>Add Menu Item</Text>
					<TouchableOpacity onPress={this.showMenuItemOverlay.bind(this)} style={styles.cancelButton}>
						<Text style={styles.cancelText}>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.getDataFromMenuItem.bind(this)} style={styles.addMenuItemButton}>
						<Text style={styles.addMenuItemText}>Submit</Text>
					</TouchableOpacity>
					<TextInput style={styles.priceStyle} keyboardType={'numeric'} multiline={false} value='' returnKeyType='next' onChangeText={(price) => this.setState({ price })} value={this.state.price.toString()} placeholder='Enter Price' />
					<TextInput style={styles.descriptionStyle} multiline={false} returnKeyType='next' onChangeText={(description) => this.setState({ description })} value={this.state.description} placeholder='Enter menu item' />
				</Animated.View>

				<StarRating
					disabled={false}
					emptyStar={'ios-star-outline'}
					fullStar={'ios-star'}
					halfStar={'ios-star-half'}
					iconSet={'Ionicons'}
					maxStars={5}
					disabled={this.state.rated}
					rating={this.state.starCount}
					selectedStar={(rating) => this.onStarRatingPress(rating)}
					fullStarColor={'yellow'}
					ratingBackgroundColor='white'
					containerStyle={{ position: 'absolute', top: 300, left: 125 }}
				/>
			</View>
		);
	}
//}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		justifyContent: 'center',
		height: 170
	},
	scrollContainer: {
		flexGrow: 1,
		marginBottom: 100,
		position: 'absolute',
		top: 600,
		height: 300
	},
	headerText: {
		position: 'absolute',
		top: 200,
		left: 0,
		color: 'white',
		fontSize: 25,
		marginTop: 0,
		fontWeight: 'bold',
		padding: 10
	},
	header2Text: {
		position: 'absolute',
		top: 400,
		left: 0,
		color: 'white',
		fontSize: 20,
		marginTop: 0,
		fontWeight: 'bold',
		padding: 10
	},
	menuButton: {
		position: 'absolute',
		top: 350,
		left: 145,
		width: 110,
		backgroundColor: '#EB8873',
		padding: 10,
		marginLeft: 10,
		borderRadius: 20
	},
	menuItemText: {
		color: 'white',
		fontWeight: 'bold'
	},
	cancelButton: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		padding: 10,
		borderRadius: 20,
		top: 10,
		left: 10
	},
	addMenuItemButton: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873',
		padding: 10,
		borderRadius: 20,
		bottom: 50
	},
	subView: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#FFFFFF',
		height: 250,
		alignItems: 'center'
	},
	priceStyle: {
		flex: 1,
		fontSize: 18,
		position: 'absolute',
		top: 50
	},
	descriptionStyle: {
		flex: 1,
		fontSize: 18,
		position: 'absolute',
		top: 100
	},
	cancelText: {
		color: '#EB8873',
		fontWeight: 'bold'
	},
	addMenuItemText: {
		color: 'white',
		fontWeight: 'bold'
	},
	starRating: {
		position: 'absolute',
		top: 200,
		padding: 15
	},
	ratingReviewText: {
		position: 'absolute',
		top: 230,
		left: 0,
		fontSize: 16,
		marginBottom: 0,
		color: 'white',
		padding: 15
	},
	categoriesText: {
		position: 'absolute',
		top: 220,
		left: 0,
		fontSize: 14,
		marginBottom: 0,
		color: 'white',
		padding: 15
	},
	phoneNumberText: {
		position: 'absolute',
		top: 235,
		left: 0,
		fontSize: 14,
		marginBottom: 0,
		color: 'white',
		padding: 15
	},
	favoriteButton: {
		position: 'absolute',
		top: 190,
		right: 0,
		marginBottom: 0,
		padding: 15
	},
	scrollContainer: {
		flex: 1,
		marginBottom: 0
	},
	footer: {
		backgroundColor: '#EB8873',
		position: 'absolute',
		alignContent: 'center',
		height: 55,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 0
	},
	backgroundImage: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 0.95
	},
	logoImage: {
		position: 'absolute',
		width: 430,
		height: 200
	},
	textInput: {
		alignSelf: 'stretch',
		color: '#fff',
		padding: 20,
		backgroundColor: '#252525',
		borderTopWidth: 2,
		borderTopColor: '#ededed'
	},
	homeIconStyle: {
		fontSize: 35,
		alignSelf: 'center',
		marginTop: 5,
		marginHorizontal: 15,
		color: 'white'
	},
	ratingIconStyle: {
		color: 'yellow'
	},
	addButton: {
		position: 'absolute',
		zIndex: 11,
		right: 20,
		bottom: 90,
		backgroundColor: '#E91E63',
		width: 90,
		height: 90,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 8
	},
	addButtonText: {
		color: '#fff',
		fontSize: 24
	}
});
