import React from 'react';
import { Alert } from 'react-native';
import Favorite from '../../screens/Favorites/Favorite/Favorite';

const FavoritesTestFuncs = {
	showErrorAlert: (errorString) => {
		Alert.alert('Uh oh', errorString, [{ text: 'OK' }]);
	},
	favorite: ({ item, index }) => {
		return <Favorite key={index} keyval={index} val={item} />;
	}
};

export default FavoritesTestFuncs;
