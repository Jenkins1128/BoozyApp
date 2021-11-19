import React from 'react';
import SignUpInput from '../SignUpInput';
import { render, cleanup, fireEvent } from '../../../../TestHelperFiles/redux/test-utils';

describe('<SignUpInput />', () => {
	let state;
	let updateEmail, updatePassword, dispatch, signupPressed;
	let rendered;

	beforeEach(() => {
		state = {
			email: 'xxx@gmail.com',
			password: 'xxxxxx'
		};
		(updateEmail = jest.fn()), (updatePassword = jest.fn()), (dispatch = jest.fn()), (signupPressed = jest.fn());
		rendered = render(<SignUpInput state={state} updateEmail={updateEmail} updatePassword={updatePassword} dispatch={dispatch} signupPressed={signupPressed} />);
	});

	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});
	//content
	it('should wrap text inputs with a flexible wrapper', () => {
		const inputContainerComponent = rendered.getByTestId('inputContainer');
		const given = inputContainerComponent.props.style;
		const result = {
			flex: 3,
			width: '100%',
			paddingHorizontal: 40
		};
		expect(result).toMatchObject(given);
	});

	it('should render correct emailInput styles correctly', () => {
		const emailInputComponent = rendered.getByTestId('emailInput');
		const given = emailInputComponent.props.style;
		const result = {
			borderRadius: 30,
			color: '#EB8873',
			padding: 30,
			backgroundColor: '#FFFFFF',
			borderTopWidth: 2,
			borderTopColor: '#ededed',
			marginBottom: 10
		};
		expect(result).toMatchObject(given);
	});

	it('should render correct passwordInput styles correctly', () => {
		const passwordInputComponent = rendered.getByTestId('passwordInput');
		const given = passwordInputComponent.props.style;
		const result = {
			borderRadius: 30,
			color: '#EB8873',
			padding: 30,
			backgroundColor: '#FFFFFF',
			marginBottom: 50
		};
		expect(result).toMatchObject(given);
	});

	it('should render correct signUpButton styles and center items correctly', () => {
		const signUpButtonComponent = rendered.getByTestId('signupPressed');
		const given = signUpButtonComponent.props.style;
		const result = {
			width: '80%',
			height: 90,
			borderRadius: 70,
			alignItems: 'center',
			justifyContent: 'center',
			alignSelf: 'center',
			elevation: 8,
			color: '#fff',
			backgroundColor: '#EB8873',
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render correct signUpText styles correctly', () => {
		const signUpTextComponent = rendered.getByTestId('signUpText');
		const given = signUpTextComponent.props.style;
		const result = {
			color: 'white',
			fontSize: 24,
			fontWeight: 'bold'
		};
		expect(result).toMatchObject(given);
	});

	//interaction
	it('should fire updateEmail onChangeText event', () => {
		const inputComponent = rendered.getByTestId('emailInput');
		fireEvent(inputComponent, 'changeText', 'new text');
		expect(updateEmail).toHaveBeenCalledWith({ email: 'new text' });
	});

	it('should fire updatePassword onChangeText event', () => {
		const inputComponent = rendered.getByTestId('passwordInput');
		fireEvent(inputComponent, 'changeText', 'new text');
		expect(updatePassword).toHaveBeenCalledWith({ password: 'new text' });
	});

	it('should fire signupPressed event', () => {
		const signupPressedButton = rendered.getByText('Sign Up');
		fireEvent.press(signupPressedButton);
		expect(signupPressed).toHaveBeenCalledTimes(1);
	});
});
