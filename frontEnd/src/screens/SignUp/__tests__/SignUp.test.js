import React from 'react';
import SignUp from '../SignUp';
import { reduxRender, render, cleanup, fireEvent, store } from '../TestHelperFiles/test-utils';
import isEmpty from '../TestHelperFiles/IsEmpty';
import ShowErrorAlert from '../TestHelperFiles/ShowErrorAlert';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../TestHelperFiles/AppNavigator';
import SignUpInput from '../SignUpInput/SignUpInput';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('<SignUp />', () => {
	afterEach(cleanup);

	//snapshot
	it('should match snapshot', () => {
		const tree = reduxRender(<SignUp />);
		expect(tree).toMatchSnapshot();
	});

	//content
	it('should wrap view with a flexible wrapper', () => {
		const rendered = reduxRender(<SignUp />);
		const keyboardAvoidingViewComponent = rendered.getByTestId('container');
		const given = keyboardAvoidingViewComponent.props.style;
		//padding-bottom 0 added from KeyboardAvoidingView behavior prop
		const result = [{ flex: 1 }, { paddingBottom: 0 }];
		expect(result).toMatchObject(given);
	});

	it('should wrap backgroundImage with a flexible wrapper and centers items', () => {
		const rendered = reduxRender(<SignUp />);
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
		const rendered = reduxRender(<SignUp />);
		const imageBackgroundComponent = rendered.getByTestId('backgroundImage');
		const given = imageBackgroundComponent.props.style;
		const result = [{ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }, { height: '100%', width: '100%' }, undefined];
		expect(given).toMatchObject(result);
	});

	//interaction

	it('should fire updateEmail onChangeText events', () => {
		const state = {
			email: 'xxx@gmail.com',
			password: 'xx'
		};

		const updateEmail = jest.fn();
		const updatePassword = jest.fn();
		const dispatch = jest.fn();
		const rendered = render(<SignUpInput state={state} updateEmail={updateEmail} updatePassword={updatePassword} dispatch={dispatch} />);
		const inputComponent = rendered.getByTestId('emailInput');

		fireEvent(inputComponent, 'changeText', 'new text');

		expect(updateEmail).toHaveBeenCalledWith({ email: 'new text' });
	});

	it('should fire updatePassword onChangeText events', () => {
		const state = {
			email: 'xxx@gmail.com',
			password: 'xx'
		};

		const updateEmail = jest.fn();
		const updatePassword = jest.fn();
		const dispatch = jest.fn();
		const rendered = render(<SignUpInput state={state} updateEmail={updateEmail} updatePassword={updatePassword} dispatch={dispatch} />);
		const inputComponent = rendered.getByTestId('passwordInput');

		fireEvent(inputComponent, 'changeText', 'new text');

		expect(updatePassword).toHaveBeenCalledWith({ password: 'new text' });
	});

	it('should fire signupPressed events', () => {
		const state = {
			email: 'xxx@gmail.com',
			password: 'xx'
		};

		const updateEmail = jest.fn();
		const updatePassword = jest.fn();
		const dispatch = jest.fn();
		const signupPressed = jest.fn();
		const rendered = render(<SignUpInput state={state} updateEmail={updateEmail} updatePassword={updatePassword} dispatch={dispatch} signupPressed={signupPressed} />);
		const signupPressedButton = rendered.getByText('Sign Up');

		fireEvent.press(signupPressedButton);

		expect(signupPressed).toHaveBeenCalledTimes(1);
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

	//redux actions
	// describe('redux actions', () => {
	// 	afterEach(() => {
	// 		cleanup();
	// 		store.clearActions();
	// 	});

	// 	it('should dispatch signup pressed action', () => {
	// 		const rendered = reduxRender(<SignUp />);
	// 		const buttonComponent = rendered.getByTestId('signupPressed');

	// 		fireEvent(buttonComponent, 'press');

	// 		// This will return all actions dispatched on this store
	// 		const actions = store.getActions();
	// 		expect(actions.length).toBe(1);
	// 		expect(actions[0].type).toEqual('INCREMENT');
	// 	});
	// });
});
