import React from 'react';
import LogIn from '../LogIn';
import { reduxRender, cleanup, fireEvent, configureStore } from '../../../TestHelperFiles/redux/test-utils';
import LoginTestFuncs from '../../../TestHelperFiles/Functions/LoginTestFuncs';
import { baseUrl } from '../../../helpers/constants';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigatorLogIn from '../../../TestHelperFiles/AppNavigators/AppNavigatorLogIn';
import axios from 'axios';
import loginReducer, { loginAsync } from '../redux/loginSlice';

describe('<LogIn />', () => {
	let rendered;

	beforeEach(() => {
		rendered = reduxRender(<LogIn />);
	});
	afterEach(cleanup);

	//snapshot
	it('should match snapshot', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should wrap view with a flexible wrapper', () => {
		const keyboardAvoidingViewComponent = rendered.getByTestId('container');
		const given = keyboardAvoidingViewComponent.props.style;
		//padding-bottom 0 added from KeyboardAvoidingView behavior prop
		const result = [{ flex: 1 }, { paddingBottom: 0 }];
		expect(result).toMatchObject(given);
	});

	it('should wrap backgroundImage with a flexible wrapper and centers items', () => {
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
		const imageBackgroundComponent = rendered.getByTestId('backgroundImage');
		const given = imageBackgroundComponent.props.style;
		const result = [{ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }, { height: '100%', width: '100%' }, undefined];
		expect(given).toMatchObject(result);
	});

	//functions
	describe('isEmpty', () => {
		it('should return true', () => {
			const currentState = {};
			const result = LoginTestFuncs.isEmpty(currentState);
			expect(result).toBeTruthy();
		});
	});

	describe('showErrorAlert', () => {
		it('calls sideEffect', () => {
			jest.spyOn(LoginTestFuncs, 'showErrorAlert');
			LoginTestFuncs.showErrorAlert('Username already exists...');
			expect(LoginTestFuncs.showErrorAlert).toHaveBeenCalledTimes(1);
			expect(LoginTestFuncs.showErrorAlert).toHaveBeenCalledWith('Username already exists...');
		});
	});

	describe('goToSignup', () => {
		afterEach(cleanup);

		it('calls sideEffect', () => {
			const component = (
				<NavigationContainer>
					<AppNavigatorLogIn />
				</NavigationContainer>
			);

			const { getByTestId } = reduxRender(component);
			const toClick = getByTestId('goToSignup');

			fireEvent(toClick, 'press');
			const signupButton = getByTestId('signupPressed');

			expect(signupButton).toBeTruthy();
		});
	});

	//redux integration
	describe('redux', () => {
		it('should dispatch login pressed and state updated fulfilled', async () => {
			const emailPass = {
				email: '123@gmail.com',
				password: '123456'
			};
			const postSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce({ response: { status: 204 } });
			const store = configureStore({
				reducer: {
					login: loginReducer
				}
			});
			await store.dispatch(loginAsync(emailPass));
			expect(postSpy).toBeCalledWith(`${baseUrl}/login`, emailPass);
			const state = store.getState();
			expect(state).toEqual({
				login: {
					currentState: {
						isLoading: false,
						requestStatus: 'fulfilled'
					}
				}
			});
		});
	});
});
