import { Alert, Animated, Keyboard } from 'react-native';

let mapref;
let bounceValue = new Animated.Value(1000);
const keyboardVisible = jest.fn();
const showFilterOverlay = jest.fn(),
	dispatch = jest.fn(),
	getDataFromFilterAsync = jest.fn(),
	viewRestaurantsAsync = jest.fn();
const state = {
	location: 'France',
	priceType: '',
	cuisine: 'pizza'
};

const HomeTestFuncs = {
	showErrorAlert: (errorString) => {
		Alert.alert('Uh oh', errorString, [{ text: 'OK' }]);
	},
	populateRestaurants: (restaurantsArray) => {
		if (mapref != null) {
			mapref.fitToCoordinates(restaurantsArray.map(({ lat, long }) => ({ latitude: lat, longitude: long })));
		}
	},
	showFilterOverlay: (shown) => {
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
	getDataFromFilter: () => {
		showFilterOverlay(false);
		dispatch(getDataFromFilterAsync({ location: state.location, priceType: state.priceType, cuisine: state.cuisine }));
	},
	viewRestaurants: (index) => {
		dispatch(viewRestaurantsAsync({ index, state }));
	},
	setMapRef: (ref) => {
		mapref = ref;
	},
	dismiss: () => {
		if (keyboardVisible.current) {
			Keyboard.dismiss();
		}
		if (!keyboardVisible.current) {
			showFilterOverlay(false);
		}
	}
};

export default HomeTestFuncs;
