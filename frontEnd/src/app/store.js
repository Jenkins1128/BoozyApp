import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../screens/SignUp/redux/signUpSlice';
import loginRedcuer from '../screens/LogIn/redux/loginSlice';
import homeReducer from '../screens/Home/redux/homeSlice';
import viewRestaurantsReducer from '../screens/Home/redux/viewRestaurantsSlice';
import getDataFromFilterReducer from '../screens/Home/redux/getDataFromFilterSlice';
import restaurantPageReducer from '../screens/RestaurantPage/redux/restaurantPageSlice';
import starRatingReducer from '../screens/RestaurantPage/redux/starRatingSlice';
import menuItemReducer from '../screens/RestaurantPage/redux/menuItemSlice';
import favoriteReducer from '../screens/RestaurantPage/redux/favoriteSlice';
import favoritesReducer from '../screens/Favorites/redux/favoritesSlice';
import settingsReducer from '../screens/Settings/redux/settingsSlice';
import appReducer from '../../appSlice';

export const store = configureStore({
	reducer: {
		app: appReducer,
		signup: signUpReducer,
		login: loginRedcuer,
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
