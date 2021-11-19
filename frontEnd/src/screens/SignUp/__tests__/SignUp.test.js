import React from 'react';
import SignUp from '../SignUp';
import { reduxRender, cleanup, fireEvent, configureStore } from '../../../TestHelperFiles/redux/test-utils';
import { baseUrl } from '../../../helpers/constants';
import SignupTestFuncs from '../../../TestHelperFiles/Functions/SignupTestFuncs';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../../../TestHelperFiles/AppNavigators/AppNavigatorSignUp';
import axios from 'axios';
import signUpReducer, { signUpAsync } from '../redux/signUpSlice';

describe('<SignUp />', () => {
	let rendered;

	beforeEach(() => {
		rendered = reduxRender(<SignUp />);
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
			const result = SignupTestFuncs.isEmpty(currentState);
			expect(result).toBeTruthy();
		});
	});

	describe('showErrorAlert', () => {
		it('calls sideEffect', () => {
			jest.spyOn(SignupTestFuncs, 'showErrorAlert');
			SignupTestFuncs.showErrorAlert('Username already exists...');
			expect(SignupTestFuncs.showErrorAlert).toHaveBeenCalledTimes(1);
			expect(SignupTestFuncs.showErrorAlert).toHaveBeenCalledWith('Username already exists...');
		});
	});

	describe('goToLogin', () => {
		afterEach(cleanup);

		it('calls sideEffect', () => {
			const component = (
				<NavigationContainer>
					<AppNavigator />
				</NavigationContainer>
			);

			const { getByTestId } = reduxRender(component);
			const toClick = getByTestId('goToLogin');

			fireEvent(toClick, 'press');
			const loginButton = getByTestId('loginButton');

			expect(loginButton).toBeTruthy();
		});
	});

	//redux integration
	describe('redux', () => {
		it('should dispatch signup pressed and state updated fulfilled', async () => {
			const emailPass = {
				email: '123@gmail.com',
				password: '123456'
			};
			const postSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce(204);
			const store = configureStore({
				reducer: {
					signup: signUpReducer
				}
			});
			await store.dispatch(signUpAsync(emailPass));
			expect(postSpy).toBeCalledWith(`${baseUrl}/register`, emailPass);
			const state = store.getState();
			expect(state).toEqual({
				signup: {
					currentState: {
						isLoading: false,
						requestStatus: 'fulfilled'
					}
				}
			});
		});
	});
});
