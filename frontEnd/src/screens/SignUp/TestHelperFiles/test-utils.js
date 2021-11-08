import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const INITIAL_STATE = {
	signup: {
		currentState: {
			requestStatus: 'idle',
			isLoading: false,
			email: 'xxx@gmail.com',
			password: 'xxx'
		}
	},
	login: {
		currentState: {
			requestStatus: 'idle',
			isLoading: false,
			email: 'xxx@gmail.com',
			password: 'xxx'
		}
	}
}; // Or use value from root reducer
const mockStore = configureStore([]);
const store = mockStore(INITIAL_STATE);

const reduxRender = (ui, options) =>
	render(ui, {
		wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
		...options
	});

// re-export everything for convenience
export * from '@testing-library/react-native';

// override render method
export { reduxRender, store };
