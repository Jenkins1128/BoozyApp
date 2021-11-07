import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SignUp from '../SignUp';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import isEmpty from '../TestHelperFiles/IsEmpty';
import ShowErrorAlert from '../TestHelperFiles/ShowErrorAlert';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../TestHelperFiles/AppNavigator';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('<SignUp />', () => {
	const mockStore = configureStore([]);
	const signupReducer = {
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
	};

	afterEach(cleanup);

	//snapshot
	it('should match snapshot', () => {
		const store = mockStore(signupReducer);
		const signup = (
			<Provider store={store}>
				<SignUp />
			</Provider>
		);
		const tree = render(signup).toJSON();
		expect(tree).toMatchSnapshot();
	});

	//content
	it('should wrap view with a flexible wrapper', () => {
		const store = mockStore(signupReducer);
		const signup = (
			<Provider store={store}>
				<SignUp />
			</Provider>
		);
		const rendered = render(signup);
		const keyboardAvoidingViewComponent = rendered.getByTestId('container');
		const given = keyboardAvoidingViewComponent.props.style;
		//padding-bottom 0 added from KeyboardAvoidingView behavior prop
		const result = [{ flex: 1 }, { paddingBottom: 0 }];
		expect(result).toMatchObject(given);
	});

	it('should wrap backgroundImage with a flexible wrapper and centers items', () => {
		const store = mockStore(signupReducer);
		const signup = (
			<Provider store={store}>
				<SignUp />
			</Provider>
		);
		const rendered = render(signup);
		const innerViewComponent = rendered.getByTestId('inner');
		const given = innerViewComponent.props.style;
		const result = {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		};
		expect(given).toMatchObject(result);
	});

	it('should wrap a flexible wrapper around the Image Background component, width/height = 100%, and opacity = 0.95', () => {
		const store = mockStore(signupReducer);
		const signup = (
			<Provider store={store}>
				<SignUp />
			</Provider>
		);
		const rendered = render(signup);
		const imageBackgroundComponent = rendered.getByTestId('backgroundImage');
		const given = imageBackgroundComponent.props.style;
		const result = [{ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }, { height: '100%', width: '100%' }, undefined];
		expect(given).toMatchObject(result);
	});

	//functions
	describe('isEmpty', () => {
		it('should return true', () => {
			const currentState = {};
			const result = isEmpty(currentState);
			expect(result).toBeTruthy();
		});
	});

	describe('showErrorAlert', () => {
		it('calls sideEffect', () => {
			jest.spyOn(ShowErrorAlert, 'showErrorAlert');
			ShowErrorAlert.showErrorAlert('Username already exists...');
			expect(ShowErrorAlert.showErrorAlert).toHaveBeenCalledTimes(1);
			expect(ShowErrorAlert.showErrorAlert).toHaveBeenCalledWith('Username already exists...');
		});
	});

	describe('goToLogin', () => {
		it('calls sideEffect', () => {
			const store = mockStore(signupReducer);
			const component = (
				<Provider store={store}>
					<NavigationContainer>
						<AppNavigator />
					</NavigationContainer>
				</Provider>
			);

			const { getByTestId } = render(component);
			const toClick = getByTestId('goToLogin');

			fireEvent(toClick, 'press');
			const loginButton = getByTestId('loginButton');

			expect(loginButton).toBeTruthy();
		});
	});
});
