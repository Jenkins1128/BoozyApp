import React, { useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, View, Animated, Alert, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCurrentLocationDataAsync,
	reset,
	resetHomeRequestStatus,
	selectHomeState,
	setPrice1,
	setPrice2,
	setPrice3,
	setPrice4,
	updateCuisine,
	updateInitialPosition,
	updateLocation,
	updateMarkerPosition,
	updateRestaurantsArray
} from './redux/homeSlice';
import { selectRestaurantState, viewRestaurantsAsync, resetRestaurantRequestStatus } from './redux/viewRestaurantsSlice';
import { getDataFromFilterAsync, resetDataFromFilterRequestStatus, selectDataFromFilterState } from './redux/getDataFromFilterSlice';
import BoozyMap from './BoozyMap/BoozyMap';
import Searchbar from './Searchbar/Searchbar';
import RestaurantList from './RestaurantList/RestaurantList';
import FilterView from './FilterView/FilterView';

const Home = ({ navigation }) => {
	let mapref = useRef();
	const bounceValue = useRef(new Animated.Value(1000)).current;
	const keyboardVisible = useRef(false);

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

	//did screen focus, get last filtered data
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (state.restaurantsArray.length) {
				populateRestaurants(state.restaurantsArray);
			}
		});
		return unsubscribe;
	}, [navigation]);

	//Get current location data
	useEffect(() => {
		switch (state.locationDataRequestStatus) {
			case 'idle':
				return;
			case 'rejected':
				showErrorAlert('Unable to get location. Please check your network.');
				break;
			case 'fulfilled':
				populateRestaurants(state.restaurantsArray);
				break;
			default:
				return;
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
				break;
			case 'fulfilled':
				if (!filteredRestaurantData.restaurantsArray.length) {
					showErrorAlert('No places found for filter.');
				} else {
					dispatch(updateRestaurantsArray({ restaurantsArray: filteredRestaurantData.restaurantsArray }));
					populateRestaurants(filteredRestaurantData.restaurantsArray);
				}
				break;
			default:
				return;
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
				break;
			case 'fulfilled':
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
			default:
				return;
		}
		dispatch(resetRestaurantRequestStatus());
	}, [restaurantState]);

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

	const showErrorAlert = (errorString) => {
		Alert.alert('Uh oh', errorString, [{ text: 'OK' }]);
	};

	const populateRestaurants = (restaurantsArray) => {
		if (mapref != null) {
			mapref.fitToCoordinates(restaurantsArray.map(({ lat, long }) => ({ latitude: lat, longitude: long })));
		}
	};

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

	const getDataFromFilter = () => {
		showFilterOverlay(false);
		dispatch(getDataFromFilterAsync({ location: state.location, priceType: state.priceType, cuisine: state.cuisine }));
	};

	const viewRestaurants = (index) => {
		dispatch(viewRestaurantsAsync({ index, state }));
	};

	const setMapRef = (ref) => {
		mapref = ref;
	};

	const dismiss = () => {
		if (keyboardVisible.current) {
			Keyboard.dismiss();
		}
		if (!keyboardVisible.current) {
			showFilterOverlay(false);
		}
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<View style={styles.inner}>
				<BoozyMap setMapRef={setMapRef} state={state} viewRestaurants={viewRestaurants} dismiss={dismiss} />
				<Searchbar state={state} dispatch={dispatch} updateLocation={updateLocation} showFilterOverlay={() => showFilterOverlay(true)} getDataFromFilter={getDataFromFilter} dismiss={dismiss} />
				<RestaurantList state={state} viewRestaurants={viewRestaurants} dismiss={dismiss} />

				<FilterView
					bounceValue={bounceValue}
					dispatch={dispatch}
					state={state}
					reset={reset}
					updateLocation={updateLocation}
					updateCuisine={updateCuisine}
					setPrice1={setPrice1}
					setPrice2={setPrice2}
					setPrice3={setPrice3}
					setPrice4={setPrice4}
					showFilterOverlay={showFilterOverlay}
					getDataFromFilter={getDataFromFilter}
				/>
			</View>
		</KeyboardAvoidingView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	inner: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
