import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import signUpReducer from '../../screens/SignUp/redux/signUpSlice';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../../screens/LogIn/redux/loginSlice';
import homeReducer from '../../screens/Home/redux/homeSlice';
import viewRestaurantsReducer from '../../screens/Home/redux/viewRestaurantsSlice';
import getDataFromFilterReducer from '../../screens/Home/redux/getDataFromFilterSlice';
import restaurantPageReducer from '../../screens/RestaurantPage/redux/restaurantPageSlice';
import starRatingReducer from '../../screens/RestaurantPage/redux/starRatingSlice';
import menuItemReducer from '../../screens/RestaurantPage/redux/menuItemSlice';
import favoriteReducer from '../../screens/RestaurantPage/redux/favoriteSlice';
import favoritesReducer from '../../screens/Favorites/redux/favoritesSlice';
import settingsReducer from '../../screens/Settings/redux/settingsSlice';

const store = configureStore({
	reducer: {
		signup: signUpReducer,
		login: loginReducer,
		home: homeReducer,
		restaurant: viewRestaurantsReducer,
		dataFromFilter: getDataFromFilterReducer,
		restaurantPage: restaurantPageReducer,
		starRating: starRatingReducer,
		menuItem: menuItemReducer,
		favorite: favoriteReducer,
		favorites: favoritesReducer,
		settings: settingsReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

const reduxRender = (ui, options) =>
	render(ui, {
		wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
		...options
	});

// re-export everything for convenience
export * from '@testing-library/react-native';

// override render method
export { reduxRender, configureStore };
