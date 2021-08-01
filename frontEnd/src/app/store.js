import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../screens/SignUp/signUpSlice';
import loginRedcuer from '../screens/LogIn/loginSlice';
import homeReducer from '../screens/Home/homeSlice';
export const store = configureStore({
	reducer: {
		signup: signUpReducer,
		login: loginRedcuer,
		home: homeReducer
	}
});
