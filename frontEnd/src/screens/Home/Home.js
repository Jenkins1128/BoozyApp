import React, { useEffect, useReducer } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, Image, Text, TextInput, ScrollView, TouchableOpacity, View, Dimensions, Animated, Alert, SafeAreaView } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Restaurant from '../Restaurant/Restaurant';
import logo from '../../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentLocationDataAsync, reset, resetStatus, selectHomeState, setPrice1, setPrice2, setPrice3, setPrice4, updateCuisine, updateInitialPosition, updateLocation, updateMarkerPosition, updateRestaurantsArray } from './homeSlice';

let mapref = null;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = width;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const bounceValue = new Animated.Value(250);
let isHidden = true;

const Home = () => {
	const state = useSelector(selectHomeState);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			const position = { latitude: parseFloat(location.coords.latitude), longitude: parseFloat(location.coords.longitude) };

			dispatch(updateInitialPosition({ initialPosition: position }));
			dispatch(updateMarkerPosition({ markerPosition: position }));
			console.log(state.initialPosition.latitude, state.initialPosition.longitude);
			dispatch(getCurrentLocationDataAsync(`https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/yelp/${state.initialPosition.latitude}/${state.initialPosition.longitude}`));
		})();
	}, []);

	useEffect(() => {
		//console.log(state);
		if (state.restaurantsArray.length > 0) {
			populateRestaurants();
		}
	}, [state]);
	// if (!isEmpty(state)) {
	// 	if (state.locationDataRequestStatus === 'fulfilled') {
	// 		populateRestaurants(state.data);
	// 		dispatch(resetStatus());
	// 	} else if (state.locationDataRequestStatus === 'rejected') {
	// 		showErrorAlert('Unable to get current location data. Please check your network.');
	// 		dispatch(resetStatus());
	// 	}
	// }
	// }, [state]);

	const isEmpty = (currentState) => {
		for (const x in currentState) {
			return false;
		}
		return true;
	};

	const showErrorAlert = (errorString) => {
		Alert.alert('Uh oh', errorString, [{ text: 'OK' }]);
	};

	const populateRestaurants = () => {
		mapref.fitToCoordinates(state.restaurantsArray.map(({ lat, long }) => ({ latitude: lat, longitude: long })));
	};

	const showFilterOverlay = () => {
		let toValue = 400;
		if (isHidden) {
			toValue = 0;
		}
		Animated.spring(bounceValue, {
			toValue: toValue,
			velocity: 5,
			tension: 2,
			friction: 8,
			useNativeDriver: true
		}).start();
		isHidden = !isHidden;
	};

	// const getDataFromFilter = () => {

	// 	if (!state.location || state.location.trim().length === 0) {
	// 		this.setState({ location: '' });
	// 	}
	// 	if (!state.cuisine || state.cuisine.trim().length === 0) {
	// 		this.setState({ cuisine: null });
	// 	}
	// 	if (!state.priceType) {
	// 		this.setState({ price_type: 6 });
	// 	}

	// 	axios
	// 		.get('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/yelp/' + this.state.location + '/' + this.state.price_type + '/' + this.state.cuisine, {})
	// 		.then((response) => {
	// 			this.populateFilteredRestaurants(response.data);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// }

	// 	populateFilteredRestaurants(response) {
	// 	this.showFilterOverlay();
	// 	this.setState({
	// 		restaurantsArray: response
	// 	});
	// 	this.mapref.fitToCoordinates(response.map(({ lat, long }) => ({ latitude: lat, longitude: long })));
	// }

	// viewRestaurants(key) {
	// 	const axios = require('axios').default;
	// 	axios
	// 		.post(
	// 			`https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/favorites`,
	// 			{
	// 				restaurantId: this.state.restaurantsArray[key]['id'],
	// 				name: this.state.restaurantsArray[key]['name']
	// 			},
	// 			{
	// 				headers: {
	// 					Accept: 'application/json, text/plain, */*',
	// 					'Content-Type': 'application/json'
	// 				}
	// 			}
	// 		)
	// 		.then((response) => {
	// 			this.state.alreadyFavorited = response.data[0]['contains'];
	// 			axios
	// 				.get(
	// 					'https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/' + this.state.restaurantsArray[key]['id'] + '/review',
	// 					{},
	// 					{
	// 						headers: {
	// 							Accept: 'application/json, text/plain, */*',
	// 							'Content-Type': 'application/json'
	// 						}
	// 					}
	// 				)
	// 				.then((response) => {
	// 					this.state.alreadyRated = response.data[0]['contains'];

	// 					this.setState({ allCategories: '' });
	// 					for (var i = 0; i < this.state.restaurantsArray[key]['categories'].length; i++) {
	// 						if (i == 0) {
	// 							this.state.allCategories += this.state.restaurantsArray[key]['categories'][i]['title'];
	// 						} else {
	// 							this.state.allCategories += ', ' + this.state.restaurantsArray[key]['categories'][i]['title'];
	// 						}
	// 					}
	// 					this.props.navigation.navigate('Restaurant', {
	// 						id: this.state.restaurantsArray[key]['id'],
	// 						name: this.state.restaurantsArray[key]['name'],
	// 						img: this.state.restaurantsArray[key]['img'],
	// 						phone: this.state.restaurantsArray[key]['phone'],
	// 						rating: this.state.restaurantsArray[key]['rating'],
	// 						reviews: this.state.restaurantsArray[key]['revCount'],
	// 						allCategories: this.state.allCategories,
	// 						alreadyFavorited: this.state.alreadyFavorited,
	// 						alreadyRated: this.state.alreadyRated
	// 					});
	// 				})
	// 				.catch(function (error) {
	// 					console.log(error);
	// 				});
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// }

	const goToHome = () => {
		navigation.navigate('Home');
	};

	let restaurants = state.restaurantsArray.map((val, key) => {
		/*() => this.viewRestaurants(key) */
		return <Restaurant key={key} keyval={key} val={val} viewRestaurant={() => console.log('test')} />;
	});

	return (
		<View style={styles.container}>
			<MapView
				ref={(ref) => {
					mapref = ref;
				}}
				initialCamera={{ center: state.initialPosition, zoom: 10, pitch: 0, heading: 0, altitude: 10 }}
				provider={PROVIDER_GOOGLE}
				style={styles.mapStyle}
			>
				<Marker coordinate={state.markerPosition}></Marker>
				{state.restaurantsArray.map((marker, index) => {
					return (
						<Marker key={index} coordinate={{ latitude: marker.lat, longitude: marker.long }}>
							<Image style={{ width: 30, height: 40 }} source={logo} />
							{/* this.viewRestaurants(index); */}
							<Callout
								style={styles.callout}
								onPress={() => {
									() => console.log('test');
								}}
							>
								<Text>{marker.name}</Text>
								<Text>{marker.address}</Text>
							</Callout>
						</Marker>
					);
				})}
			</MapView>
			<Text style={styles.searchNearbyText}>Search for happy hours nearby.</Text>
			<View style={styles.searchBarBackground}>
				<Feather name='search' style={styles.searchIconStyle} />
				{/* this.getDataFromFilter.bind(this); */}
				<TextInput
					style={styles.inputStyle}
					multiline={false}
					returnKeyType='next'
					onKeyPress={(ev) => {
						if (ev.nativeEvent.key == 'Enter') {
						}
					}}
					onChangeText={(location) => dispatch(updateLocation({ location: location }))}
					value={state.location}
					placeholder='Enter City or Zip code'
				/>
				{/* this.showFilterOverlay(); */}
				<TouchableOpacity onPress={showFilterOverlay} style={styles.filterButton}>
					<MaterialIcons name='filter-list' style={styles.filterIconStyle} />
				</TouchableOpacity>
			</View>
			{/* this.getDataFromFilter.bind(this) */}
			<TouchableOpacity onPress={() => console.log('test')} style={styles.searchButton}>
				<Text style={styles.searchtext}>search</Text>
			</TouchableOpacity>
			<ScrollView style={styles.scrollContainer}>{restaurants}</ScrollView>
			<Animated.View style={[styles.subView, { transform: [{ translateY: bounceValue }] }]}>
				<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#EB8873' }}>Filters</Text>
				<TouchableOpacity onPress={() => dispatch(reset())} style={styles.resetButton}>
					<Text style={styles.resetText}>Reset</Text>
				</TouchableOpacity>
				{/* this.showFilterOverlay.bind(this) */}
				<TouchableOpacity onPress={() => console.log('test')} style={styles.cancelButton}>
					<Text style={styles.cancelText}>Cancel</Text>
				</TouchableOpacity>
				{/* this.getDataFromFilter.bind(this) */}
				<TouchableOpacity onPress={() => console.log('test')} style={styles.applyButton}>
					<Text style={styles.applyText}>Apply</Text>
				</TouchableOpacity>
				<TextInput style={styles.locationStyle} multiline={false} returnKeyType='next' onChangeText={(location) => dispatch(updateLocation({ location: location }))} value={state.location} placeholder='Enter City or Zip code' />
				<TextInput style={styles.cuisineStyle} multiline={false} returnKeyType='next' onChangeText={(cuisine) => dispatch(updateCuisine({ cuisine: cuisine }))} value={state.cuisine} placeholder='Enter cuisine' />
				<TouchableOpacity onPress={() => dispatch(setPrice1())} style={styles.$Button}>
					<Text style={{ color: state.$color, fontWeight: 'bold', fontSize: 16 }}>$</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => dispatch(setPrice2())} style={styles.$$Button}>
					<Text style={{ color: state.$$color, fontWeight: 'bold', fontSize: 16 }}>$$</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => dispatch(setPrice3())} style={styles.$$$Button}>
					<Text style={{ color: state.$$$color, fontWeight: 'bold', fontSize: 16 }}>$$$</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => dispatch(setPrice4())} style={styles.$$$$Button}>
					<Text style={{ color: state.$$$$color, fontWeight: 'bold', fontSize: 16 }}>$$$$</Text>
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
};

export default Home;

//export default class Home extends React.Component {
// constructor(props) {
// 	super(props);
// 	this.state = {
// 		location: '',
// 		cuisine: null,
// 		price_type: 6,
// 		$color: 'white',
// 		$$color: 'white',
// 		$$$color: 'white',
// 		$$$$color: 'white',
// 		allCategories: '',
// 		alreadyFavorited: false,
// 		alreadyRated: false,
// 		restaurantsArray: [],
// 		initialPosition: {
// 			latitude: 0,
// 			longitude: 0
// 		},
// 		markerPosition: {
// 			latitude: 0,
// 			longitude: 0
// 		}
// 	};
// 	this.mapref = null;
// 	this.getRestaurantData = this.getRestaurantData.bind(this);
// 	this.populateRestaurants = this.populateRestaurants.bind(this);
// }

// componentDidMount() {
// 	console.log('CALLED');
// 	//console.log(this.props.route.params.TabNav);
// 	navigator.geolocation.getCurrentPosition(
// 		(position) => {
// 			var lat = parseFloat(position.coords.latitude);
// 			var long = parseFloat(position.coords.longitude);

// 			var initialRegion = {
// 				latitude: lat,
// 				longitude: long,
// 				latitudeDelta: LATITUDE_DELTA,
// 				longitudeDelta: LONGITUDE_DELTA
// 			};

// 			this.setState({ initialPosition: initialRegion });
// 			this.setState({ markerPosition: initialRegion });
// 		},
// 		(error) => alert(JSON.stringify(error)),
// 		{ enableHighAccuracy: true, timeout: 20000 }
// 	);

// 	this.currentLocationData();
// }

// getDataFromFilter() {
// 	const axios = require('axios').default;

// 	if (!this.state.location || this.state.location.trim().length === 0) {
// 		this.setState({ location: '' });
// 	}
// 	if (!this.state.cuisine || this.state.cuisine.trim().length === 0) {
// 		this.setState({ cuisine: null });
// 	}
// 	if (!this.state.price_type) {
// 		this.setState({ price_type: 6 });
// 	}

// 	axios
// 		.get('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/yelp/' + this.state.location + '/' + this.state.price_type + '/' + this.state.cuisine, {})
// 		.then((response) => {
// 			this.populateFilteredRestaurants(response.data);
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// }

// currentLocationData() {
// 	const axios = require('axios').default;

// 	axios
// 		.get('https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/yelp/' + this.state.initialPosition.latitude + '/' + this.state.initialPosition.longitude, {})
// 		.then((response) => {
// 			this.populateRestaurants(response.data);
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// }

// showFilterOverlay() {
// 	const toValue = 400;
// 	if (isHidden) {
// 		toValue = 0;
// 	}
// 	Animated.spring(bounceValue, {
// 		toValue: toValue,
// 		velocity: 5,
// 		tension: 2,
// 		friction: 8,
// 		useNativeDriver: true
// 	}).start();
// 	isHidden = !isHidden;
// }

// populateRestaurants(response) {
// 	this.setState({
// 		restaurantsArray: response
// 	});
// 	this.mapref.fitToCoordinates(response.map(({ lat, long }) => ({ latitude: lat, longitude: long })));
// }

// populateFilteredRestaurants(response) {
// 	this.showFilterOverlay();
// 	this.setState({
// 		restaurantsArray: response
// 	});
// 	this.mapref.fitToCoordinates(response.map(({ lat, long }) => ({ latitude: lat, longitude: long })));
// }

// viewRestaurants(key) {
// 	const axios = require('axios').default;
// 	axios
// 		.post(
// 			`https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/favorites`,
// 			{
// 				restaurantId: this.state.restaurantsArray[key]['id'],
// 				name: this.state.restaurantsArray[key]['name']
// 			},
// 			{
// 				headers: {
// 					Accept: 'application/json, text/plain, */*',
// 					'Content-Type': 'application/json'
// 				}
// 			}
// 		)
// 		.then((response) => {
// 			this.state.alreadyFavorited = response.data[0]['contains'];
// 			axios
// 				.get(
// 					'https://qvsn1ge17c.execute-api.us-east-2.amazonaws.com/latest/api/' + this.state.restaurantsArray[key]['id'] + '/review',
// 					{},
// 					{
// 						headers: {
// 							Accept: 'application/json, text/plain, */*',
// 							'Content-Type': 'application/json'
// 						}
// 					}
// 				)
// 				.then((response) => {
// 					this.state.alreadyRated = response.data[0]['contains'];

// 					this.setState({ allCategories: '' });
// 					for (var i = 0; i < this.state.restaurantsArray[key]['categories'].length; i++) {
// 						if (i == 0) {
// 							this.state.allCategories += this.state.restaurantsArray[key]['categories'][i]['title'];
// 						} else {
// 							this.state.allCategories += ', ' + this.state.restaurantsArray[key]['categories'][i]['title'];
// 						}
// 					}
// 					this.props.navigation.navigate('Restaurant', {
// 						id: this.state.restaurantsArray[key]['id'],
// 						name: this.state.restaurantsArray[key]['name'],
// 						img: this.state.restaurantsArray[key]['img'],
// 						phone: this.state.restaurantsArray[key]['phone'],
// 						rating: this.state.restaurantsArray[key]['rating'],
// 						reviews: this.state.restaurantsArray[key]['revCount'],
// 						allCategories: this.state.allCategories,
// 						alreadyFavorited: this.state.alreadyFavorited,
// 						alreadyRated: this.state.alreadyRated
// 					});
// 				})
// 				.catch(function (error) {
// 					console.log(error);
// 				});
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// }

// goToHome() {
// 	this.props.navigation.navigate('Home');
// }

// reset() {
// 	this.setState({ location: '' });
// 	this.setState({ cuisine: '' });
// 	this.setState({ price_type: 6 });
// 	this.setState({ $color: 'white' });
// 	this.setState({ $$color: 'white' });
// 	this.setState({ $$$color: 'white' });
// 	this.setState({ $$$$color: 'white' });
// }

// setPrice1() {
// 	this.setState({ price_type: 1 });
// 	this.setState({ $color: 'yellow' });
// 	this.setState({ $$color: 'white' });
// 	this.setState({ $$$color: 'white' });
// 	this.setState({ $$$$color: 'white' });
// }

// setPrice2() {
// 	this.setState({ price_type: 2 });
// 	this.setState({ $$color: 'yellow' });
// 	this.setState({ $color: 'white' });
// 	this.setState({ $$$color: 'white' });
// 	this.setState({ $$$$color: 'white' });
// }

// setPrice3() {
// 	this.setState({ price_type: 3 });
// 	this.setState({ $$$color: 'yellow' });
// 	this.setState({ $$color: 'white' });
// 	this.setState({ $color: 'white' });
// 	this.setState({ $$$$color: 'white' });
// }

// setPrice4() {
// 	this.setState({ price_type: 4 });
// 	this.setState({ $$$$color: 'yellow' });
// 	this.setState({ $$color: 'white' });
// 	this.setState({ $$$color: 'white' });
// 	this.setState({ $color: 'white' });
// }

//render() {
// let restaurants = this.state.restaurantsArray.map((val, key) => {
// 	return <Restaurant key={key} keyval={key} val={val} viewRestaurant={() => this.viewRestaurants(key)} />;
// });

// return (
// 	<View style={styles.container}>
// 		<MapView
// 			ref={(ref) => {
// 				this.mapref = ref;
// 			}}
// 			initialCamera={{ center: this.state.initialPosition, zoom: 10, pitch: 0, heading: 0, altitude: 10 }}
// 			provider={PROVIDER_GOOGLE}
// 			style={styles.mapStyle}
// 		>
// 			<Marker coordinate={this.state.markerPosition}></Marker>
// 			{this.state.restaurantsArray.map((marker, index) => {
// 				return (
// 					<Marker key={index} coordinate={{ latitude: marker.lat, longitude: marker.long }}>
// 						<Image style={{ width: 30, height: 40 }} source={logo} />
// 						<Callout
// 							style={styles.callout}
// 							onPress={() => {
// 								this.viewRestaurants(index);
// 							}}
// 						>
// 							<Text>{marker.name}</Text>
// 							<Text>{marker.address}</Text>
// 						</Callout>
// 					</Marker>
// 				);
// 			})}
// 		</MapView>
// 		<Text style={styles.searchNearbyText}>Search for happy hours nearby.</Text>
// 		<View style={styles.searchBarBackground}>
// 			<Feather name='search' style={styles.searchIconStyle} />
// 			<TextInput
// 				style={styles.inputStyle}
// 				multiline={false}
// 				returnKeyType='next'
// 				onKeyPress={(ev) => {
// 					if (ev.nativeEvent.key == 'Enter') {
// 						this.getDataFromFilter.bind(this);
// 					}
// 				}}
// 				onChangeText={(location) => this.setState({ location })}
// 				value={this.state.location}
// 				placeholder='Enter City or Zip code'
// 			/>
// 			<TouchableOpacity
// 				onPress={() => {
// 					this.showFilterOverlay();
// 				}}
// 				style={styles.filterButton}
// 			>
// 				<MaterialIcons name='filter-list' style={styles.filterIconStyle} />
// 			</TouchableOpacity>
// 		</View>
// 		<TouchableOpacity onPress={this.getDataFromFilter.bind(this)} style={styles.searchButton}>
// 			<Text style={styles.searchtext}>search</Text>
// 		</TouchableOpacity>
// 		<ScrollView style={styles.scrollContainer}>{restaurants}</ScrollView>

// 		<Animated.View style={[styles.subView, { transform: [{ translateY: bounceValue }] }]}>
// 			<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#EB8873' }}>Filters</Text>
// 			<TouchableOpacity onPress={this.reset.bind(this)} style={styles.resetButton}>
// 				<Text style={styles.resetText}>Reset</Text>
// 			</TouchableOpacity>
// 			<TouchableOpacity onPress={this.showFilterOverlay.bind(this)} style={styles.cancelButton}>
// 				<Text style={styles.cancelText}>Cancel</Text>
// 			</TouchableOpacity>
// 			<TouchableOpacity onPress={this.getDataFromFilter.bind(this)} style={styles.applyButton}>
// 				<Text style={styles.applyText}>Apply</Text>
// 			</TouchableOpacity>
// 			<TextInput style={styles.locationStyle} multiline={false} returnKeyType='next' onChangeText={(location) => this.setState({ location })} value={this.state.location} placeholder='Enter City or Zip code' />
// 			<TextInput style={styles.cuisineStyle} multiline={false} returnKeyType='next' onChangeText={(cuisine) => this.setState({ cuisine })} value={this.state.cuisine} placeholder='Enter cuisine' />
// 			<TouchableOpacity onPress={this.setPrice1.bind(this)} style={styles.$Button}>
// 				<Text style={{ color: this.state.$color, fontWeight: 'bold', fontSize: 16 }}>$</Text>
// 			</TouchableOpacity>
// 			<TouchableOpacity onPress={this.setPrice2.bind(this)} style={styles.$$Button}>
// 				<Text style={{ color: this.state.$$color, fontWeight: 'bold', fontSize: 16 }}>$$</Text>
// 			</TouchableOpacity>
// 			<TouchableOpacity onPress={this.setPrice3.bind(this)} style={styles.$$$Button}>
// 				<Text style={{ color: this.state.$$$color, fontWeight: 'bold', fontSize: 16 }}>$$$</Text>
// 			</TouchableOpacity>
// 			<TouchableOpacity onPress={this.setPrice4.bind(this)} style={styles.$$$$Button}>
// 				<Text style={{ color: this.state.$$$$color, fontWeight: 'bold', fontSize: 16 }}>$$$$</Text>
// 			</TouchableOpacity>
// 		</Animated.View>
// 	</View>
// );
//}
//}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	callout: {
		flex: 1,
		position: 'relative'
	},
	searchButton: {
		position: 'absolute',
		bottom: 320,
		right: 40,
		color: '#E91E63'
	},
	filterButton: {
		position: 'absolute',
		top: 7,
		right: 0
	},
	searchtext: {
		color: '#E91E63',
		position: 'absolute',
		top: -40,
		right: 10
	},
	searchBarBackground: {
		position: 'absolute',
		top: 500,
		width: 350,
		backgroundColor: '#F0EEEE',
		height: 50,
		borderRadius: 15,
		marginHorizontal: 15,
		flexDirection: 'row'
	},
	searchNearbyText: {
		position: 'absolute',
		top: 465,
		left: 35,
		color: '#EB8873',
		fontFamily: 'Arial',
		fontWeight: 'bold',
		fontSize: 18
	},
	searchIconStyle: {
		fontSize: 35,
		alignSelf: 'center',
		marginHorizontal: 15,
		color: '#E91E63'
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
	filterIconStyle: {
		fontSize: 35,
		alignSelf: 'center',
		marginHorizontal: 15,
		color: '#E91E63'
	},
	homeIconStyle: {
		fontSize: 30,
		alignSelf: 'center',
		marginTop: 5,
		marginHorizontal: 15,
		color: 'white'
	},
	inputStyle: {
		flex: 1,
		fontSize: 18
	},
	locationStyle: {
		flex: 1,
		fontSize: 18,
		position: 'absolute',
		top: 50
	},
	cuisineStyle: {
		flex: 1,
		fontSize: 18,
		position: 'absolute',
		top: 100
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2,
		position: 'absolute',
		top: 0
	},
	header: {
		backgroundColor: '#E91E63',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 10,
		borderBottomColor: '#ddd'
	},
	headerText: {
		color: 'white',
		fontSize: 18,
		padding: 32
	},
	scrollContainer: {
		flexGrow: 1,
		marginBottom: 100,
		position: 'absolute',
		top: 600,
		height: 300
	},
	textInput: {
		alignSelf: 'stretch',
		color: '#fff',
		padding: 20,
		backgroundColor: '#252525',
		borderTopWidth: 2,
		borderTopColor: '#ededed'
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
	},
	footer: {
		backgroundColor: '#EB8873',
		position: 'absolute',
		alignContent: 'center',
		height: 55,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 10
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
	resetButton: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		padding: 10,
		borderRadius: 20,
		top: 10,
		right: 10
	},
	applyButton: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873',
		padding: 10,
		borderRadius: 20,
		bottom: 20
	},
	$Button: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873',
		borderRadius: 30,
		width: 45,
		height: 45,
		bottom: 70,
		left: 60
	},
	$$Button: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 70,
		left: 140,
		backgroundColor: '#EB8873',
		borderRadius: 20,
		borderRadius: 30,
		width: 45,
		height: 45
	},
	$$$Button: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 70,
		left: 220,
		backgroundColor: '#EB8873',
		borderRadius: 20,
		borderRadius: 30,
		width: 45,
		height: 45
	},
	$$$$Button: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 70,
		left: 300,
		backgroundColor: '#EB8873',
		borderRadius: 20,
		borderRadius: 30,
		width: 45,
		height: 45
	},
	resetText: {
		color: '#EB8873',
		fontWeight: 'bold'
	},
	cancelText: {
		color: '#EB8873',
		fontWeight: 'bold'
	},
	applyText: {
		color: 'white',
		fontWeight: 'bold'
	},
	animatedContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
