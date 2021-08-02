import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../screens/SignUp/signUpSlice';
import loginRedcuer from '../screens/LogIn/loginSlice';
import homeReducer from '../screens/Home/homeSlice';
import viewRestaurantsReducer from '../screens/Home/viewRestaurantsSlice';
import getDataFromFilterReducer from '../screens/Home/getDataFromFilterSlice';

export const store = configureStore({
	reducer: {
		signup: signUpReducer,
		login: loginRedcuer,
		home: homeReducer,
		restaurant: viewRestaurantsReducer,
		dataFromFilter: getDataFromFilterReducer
	}
});
