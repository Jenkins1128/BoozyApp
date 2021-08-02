import React, { useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, Image, Text, TextInput, TouchableOpacity, View, Dimensions, Animated, Alert, FlatList } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Restaurant from '../Restaurant/Restaurant';
import logo from '../../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentLocationDataAsync, reset, resetHomeRequestStatus, selectHomeState, setPrice1, setPrice2, setPrice3, setPrice4, updateCuisine, updateInitialPosition, updateLocation, updateMarkerPosition, updateRestaurantsArray } from './homeSlice';
import { selectRestaurantState, viewRestaurantsAsync, resetRestaurantRequestStatus } from './viewRestaurantsSlice';
import { getDataFromFilterAsync, resetDataFromFilterRequestStatus, selectDataFromFilterState } from './getDataFromFilterSlice';

let mapref = null;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = width;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const bounceValue = new Animated.Value(250);
let isHidden = true;

const Home = ({ navigation }) => {
	const state = useSelector(selectHomeState);
	const restaurantState = useSelector(selectRestaurantState);
	const filteredRestaurantData = useSelector(selectDataFromFilterState);
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
			dispatch(getCurrentLocationDataAsync({ latitude: position.latitude, longitude: position.longitude }));
		})();
	}, []);

	//Get current location data
	useEffect(() => {
		switch (state.locationDataRequestStatus) {
			case 'idle':
				return;
			case 'rejected':
				showErrorAlert('Unable to get location. Please check your network.');
				return;
			case 'fulfilled':
				if (!isHidden) {
					showFilterOverlay();
				}
				populateRestaurants(state.restaurantsArray);
				break;
		}
		dispatch(resetHomeRequestStatus());
	}, [state]);

	//Get to filtered locaiton data
	useEffect(() => {
		switch (filteredRestaurantData.dataFromFilterRequestStatus) {
			case 'idle':
				return;
			case 'rejected':
				showErrorAlert('Unable to fulfill filter. Please check your network.');
				return;
			case 'fulfilled':
				if (!isHidden) {
					showFilterOverlay();
				}
				console.log('filteredRestaurantData', filteredRestaurantData.restaurantsArray);
				if (!filteredRestaurantData.restaurantsArray.length) {
					showErrorAlert('No places found for filter.');
				} else {
					dispatch(updateRestaurantsArray({ restaurantsArray: filteredRestaurantData.restaurantsArray }));
					populateRestaurants(filteredRestaurantData.restaurantsArray);
				}
				break;
		}
		dispatch(resetDataFromFilterRequestStatus());
	}, [filteredRestaurantData]);

	//Navigation to Restaurant Page
	useEffect(() => {
		switch (restaurantState.restaurantRequestStatus) {
			case 'idle':
				return;
			case 'rejected':
				showErrorAlert('Unable to get restaurant data. Please check your network.');
				return;
			case 'fulfilled':
				console.log('restaurantState', restaurantState);
				navigation.navigate('Restaurant', {
					id: restaurantState.restaurantInfo.restaurantsArray[0]['id'],
					name: restaurantState.restaurantInfo.restaurantsArray[0]['name'],
					img: restaurantState.restaurantInfo.restaurantsArray[0]['img'],
					phone: restaurantState.restaurantInfo.restaurantsArray[0]['phone'],
					rating: restaurantState.restaurantInfo.restaurantsArray[0]['rating'],
					reviews: restaurantState.restaurantInfo.restaurantsArray[0]['revCount'],
					allCategories: restaurantState.restaurantInfo.allCategories,
					alreadyFavorited: restaurantState.restaurantInfo.alreadyFavorited,
					alreadyRated: restaurantState.restaurantInfo.alreadyRated
				});
				break;
		}
		dispatch(resetRestaurantRequestStatus());
	}, [restaurantState]);

	const isEmpty = (currentState) => {
		for (const x in currentState) {
			return false;
		}
		return true;
	};

	const showErrorAlert = (errorString) => {
		Alert.alert('Uh oh', errorString, [{ text: 'OK' }]);
	};

	const populateRestaurants = (restaurantsArray) => {
		mapref.fitToCoordinates(restaurantsArray.map(({ lat, long }) => ({ latitude: lat, longitude: long })));
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

	const getDataFromFilter = () => {
		dispatch(getDataFromFilterAsync({ location: state.location, priceType: state.priceType, cuisine: state.cuisine }));
	};

	const viewRestaurants = (index) => {
		dispatch(viewRestaurantsAsync({ index, state }));
	};

	const restaurant = ({ item, index }) => {
		return <Restaurant key={index} keyval={index} val={item} viewRestaurant={() => viewRestaurants(index)} />;
	};

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
							<Callout style={styles.callout} onPress={() => viewRestaurants(index)}>
								<Text>{marker.name}</Text>
								<Text>{marker.address}</Text>
							</Callout>
						</Marker>
					);
				})}
			</MapView>
			<View style={styles.searchContainer}>
				<View style={styles.searchNearbyTextContainer}>
					<Text style={styles.searchNearbyText}>Search for happy hours nearby.</Text>
				</View>

				<View style={styles.searchBarBackground}>
					<Feather name='search' style={styles.searchIconStyle} />
					<TextInput
						style={styles.inputStyle}
						multiline={false}
						returnKeyType='next'
						onKeyPress={(ev) => {
							if (ev.nativeEvent.key == 'Enter') {
								getDataFromFilter();
							}
						}}
						onChangeText={(location) => dispatch(updateLocation({ location: location }))}
						value={state.location}
						placeholder='Enter City or Zip code'
					/>
					<TouchableOpacity onPress={showFilterOverlay}>
						<MaterialIcons name='filter-list' style={styles.filterIconStyle} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={getDataFromFilter} style={styles.searchButton}>
					<Text style={styles.searchtext}>search</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.scrollContainer}>
				<FlatList data={state.restaurantsArray} keyExtractor={(item, i) => i.toString()} renderItem={restaurant} />
			</View>

			{/* 			
			<Animated.View style={[styles.subView, { transform: [{ translateY: bounceValue }] }]}>
				<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#EB8873' }}>Filters</Text>
				<TouchableOpacity onPress={() => dispatch(reset())} style={styles.resetButton}>
					<Text style={styles.resetText}>Reset</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={showFilterOverlay} style={styles.cancelButton}>
					<Text style={styles.cancelText}>Cancel</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={getDataFromFilter} style={styles.applyButton}>
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
			</Animated.View> */}
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	mapStyle: {
		flex: 3,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 2
	},
	searchContainer: {
		flex: 1,
		width: '100%',
		padding: 20
	},
	searchNearbyTextContainer: {
		marginBottom: 10
	},
	searchNearbyText: {
		color: '#EB8873',
		fontFamily: 'Arial',
		fontWeight: 'bold',
		fontSize: 18
	},
	searchBarBackground: {
		backgroundColor: '#F0EEEE',
		height: 50,
		width: '90%',
		borderRadius: 15,
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	searchIconStyle: {
		fontSize: 35,
		color: '#E91E63'
	},
	inputStyle: {
		fontSize: 18
	},
	searchButton: {
		alignSelf: 'flex-end',
		marginTop: 5,
		marginRight: 20,
		color: '#E91E63'
	},

	searchtext: {
		color: '#E91E63'
	},

	callout: {
		flex: 1,
		position: 'relative'
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
		color: '#E91E63'
	},
	homeIconStyle: {
		fontSize: 30,
		alignSelf: 'center',
		marginTop: 5,
		marginHorizontal: 15,
		color: 'white'
	},

	locationStyle: {
		flex: 1,
		fontSize: 18
	},
	cuisineStyle: {
		flex: 1,
		fontSize: 18
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
		flex: 2,
		width: '100%'
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
		alignContent: 'center',
		height: 55
	},
	cancelButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		padding: 10,
		borderRadius: 20
	},
	resetButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		padding: 10,
		borderRadius: 20
	},
	applyButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873',
		padding: 10,
		borderRadius: 20
	},
	$Button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873',
		borderRadius: 30,
		width: 45,
		height: 45
	},
	$$Button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873',
		borderRadius: 20,
		borderRadius: 30,
		width: 45,
		height: 45
	},
	$$$Button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EB8873',
		borderRadius: 20,
		borderRadius: 30,
		width: 45,
		height: 45
	},
	$$$$Button: {
		justifyContent: 'center',
		alignItems: 'center',
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
