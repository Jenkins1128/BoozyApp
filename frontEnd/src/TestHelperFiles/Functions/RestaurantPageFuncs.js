import { Alert, Animated, Keyboard } from 'react-native';

let bounceValue = new Animated.Value(1000);
const keyboardVisible = jest.fn();
const dispatch = jest.fn(),
	updateState = jest.fn(),
	changeColor = jest.fn(),
	getMenuItemsAsync = jest.fn(),
	updateFavoriteColor = jest.fn(),
	updateStarCount = jest.fn(),
	starRatingAsync = jest.fn(),
	postMenuItemAsync = jest.fn(),
	showMenuItemOverlay = jest.fn(),
	updateMenuItems = jest.fn(),
	favoriteAsync = jest.fn();
const state = {
	restaurantId: 0,
	restaurantName: 'Mountain Mikes'
};

const menuItemState = {
	description: '',
	price: 0
};

const route = {
	params: {
		id: 0,
		alreadyFavorited: 'red'
	}
};

const RestaurantPageFuncs = {
	showErrorAlert: (errorString) => {
		Alert.alert('Uh oh', errorString, [{ text: 'OK' }]);
	},
	getRestaurantDataOnFocus: () => {
		const { params } = route;
		dispatch(updateState({ params: params }));
		const colorFavorited = params.alreadyFavorited ? 'red' : 'white';
		changeColor(colorFavorited);
		dispatch(getMenuItemsAsync(params.id));
	},
	showMenuItemOverlay: (shown) => {
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
	},
	changeColor: (color) => {
		dispatch(updateFavoriteColor({ color: color }));
	},
	onStarRatingPressed: (rating) => {
		dispatch(updateStarCount({ starCount: rating }));
		dispatch(starRatingAsync({ rating: rating, restaurantId: state.restaurantId, restaurantName: state.restaurantName }));
	},
	getDataFromMenuItem: () => {
		dispatch(postMenuItemAsync({ description: menuItemState.description, price: menuItemState.price, restaurantName: state.restaurantName, restaurantId: state.restaurantId }));
		showMenuItemOverlay(false);
	},
	menuItemSubmitted: () => {
		let price = menuItemState.price;
		if (price % 1 == 0) {
			price = parseFloat(price.toString());
		}
		dispatch(updateMenuItems({ menuItem: { price: price, content: menuItemState.description } }));
	},
	favorite: () => {
		dispatch(favoriteAsync({ restaurantId: state.restaurantId, name: state.restaurantName }));
	},
	dismiss: () => {
		if (keyboardVisible.current) {
			Keyboard.dismiss();
		}
		if (!keyboardVisible.current) {
			showMenuItemOverlay(false);
		}
	}
};

export default RestaurantPageFuncs;
