import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import signUpReducer from '../../screens/SignUp/redux/signUpSlice';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../../screens/LogIn/redux/loginSlice';
import homeReducer from '../../screens/Home/redux/homeSlice';
import viewRestaurantsReducer from '../../screens/Home/redux/viewRestaurantsSlice';
import getDataFromFilterReducer from '../../screens/Home/redux/getDataFromFilterSlice';
const store = configureStore({
	reducer: {
		signup: signUpReducer,
		login: loginReducer,
		home: homeReducer,
		restaurant: viewRestaurantsReducer,
		dataFromFilter: getDataFromFilterReducer
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
