import React, { useEffect, useRef } from 'react';
import { StyleSheet, Keyboard, View, TextInput, Alert, TouchableOpacity, Image, ImageBackground, Animated, FlatList, TouchableWithoutFeedback, SafeAreaView } from 'react-native';

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
			<RestaurantHeader state={state} onStarRatingPress={onStarRatingPress} favorite={favorite} dismiss={dismiss} />
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
