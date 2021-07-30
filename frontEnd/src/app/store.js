import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../screens/SignUp/signUpSlice';
import loginRedcuer from '../screens/LogIn/loginSlice';

export const store = configureStore({
	reducer: {
		signup: signUpReducer,
		login: loginRedcuer
	}
});
