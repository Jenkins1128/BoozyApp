import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../screens/SignUp/redux/signUpSlice';
import loginRedcuer from '../screens/LogIn/redux/loginSlice';
import homeReducer from '../screens/Home/redux/homeSlice';
import viewRestaurantsReducer from '../screens/Home/redux/viewRestaurantsSlice';
import getDataFromFilterReducer from '../screens/Home/redux/getDataFromFilterSlice';

export const store = configureStore({
	reducer: {
		signup: signUpReducer,
		login: loginRedcuer,
		home: homeReducer,
		restaurant: viewRestaurantsReducer,
		dataFromFilter: getDataFromFilterReducer
	}
});
