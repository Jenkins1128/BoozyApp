import React from 'react';
import LogInInput from '../LogInInput';
import { render, cleanup, fireEvent } from '../../../../TestHelperFiles/redux/test-utils';

describe('<LogInInput />', () => {
	let state;
	let updateEmail, updatePassword, dispatch, loginPressed;
	let rendered;

	beforeEach(() => {
		state = {
			email: 'xxx@gmail.com',
			password: 'xxxxxx'
		};
		(updateEmail = jest.fn()), (updatePassword = jest.fn()), (dispatch = jest.fn()), (loginPressed = jest.fn());
		rendered = render(<LogInInput state={state} updateEmail={updateEmail} updatePassword={updatePassword} dispatch={dispatch} loginPressed={loginPressed} />);
	});
	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should wrap inputs with a flexible wrapper', () => {
		const inputContainerComponent = rendered.getByTestId('inputContainer');
		const given = inputContainerComponent.props.style;
		const result = { flex: 4 };
		expect(result).toMatchObject(given);
	});

	it('should render emailInput styles and center itself', () => {
		const inputContainerComponent = rendered.getByTestId('emailInput');
		const given = inputContainerComponent.props.style;
		const result = {
			width: 320,
			borderRadius: 30,
			alignSelf: 'center',
			color: '#FFFFFF',
			marginBottom: 10,
			padding: 30,
			borderWidth: 1,
			borderColor: '#ededed'
		};
		expect(result).toMatchObject(given);
	});

	it('should render passwordInput styles and center itself', () => {
		const inputContainerComponent = rendered.getByTestId('passwordInput');
		const given = inputContainerComponent.props.style;
		const result = {
			width: 320,
			borderRadius: 30,
			alignSelf: 'center',
			color: '#FFFFFF',
			padding: 30,
			marginBottom: 10,
			borderWidth: 1,
			borderColor: '#ededed'
		};
		expect(result).toMatchObject(given);
	});

	it('should render goToSignup styles correctly', () => {
		const signUpButtonComponent = rendered.getByTestId('goToSignup');
		const given = signUpButtonComponent.props.style;
		const result = {
			width: 150,
			height: 55,
			borderRadius: 70,
			alignItems: 'center',
			justifyContent: 'center',
			alignSelf: 'center',
			elevation: 8,
			color: '#fff',
			padding: 20,
			marginBottom: 10,
			backgroundColor: '#FFFFFF',
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render signUpText styles correctly', () => {
		const signUpTextComponent = rendered.getByTestId('signUpText');
		const given = signUpTextComponent.props.style;
		const result = {
			color: '#EB8873',
			fontSize: 11,
			fontWeight: 'bold'
		};
		expect(result).toMatchObject(given);
	});

	it('should render loginButton styles correctly', () => {
		const loginButtonComponent = rendered.getByTestId('loginButton');
		const given = loginButtonComponent.props.style;
		const result = {
			width: 240,
			height: 60,
			borderRadius: 70,
			alignItems: 'center',
			justifyContent: 'center',
			alignSelf: 'center',
			elevation: 8,
			color: '#fff',
			padding: 20,
			backgroundColor: '#FFFFFF',
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render logInText styles correctly', () => {
		const logInTextComponent = rendered.getByTestId('logInText');
		const given = logInTextComponent.props.style;
		const result = {
			color: '#EB8873',
			fontSize: 14,
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

	it('should fire loginPressed event', () => {
		const loginPressedButton = rendered.getByText('Log In');
		fireEvent.press(loginPressedButton);
		expect(loginPressed).toHaveBeenCalledTimes(1);
	});
});
