import React from 'react';
import SignUpHeader from '../SignUpHeader';
import { render, cleanup } from '../../../../TestHelperFiles/redux/test-utils';

describe('<SignUpHeader />', () => {
	let state;
	let rendered;

	beforeEach(() => {
		state = {
			isLoading: false
		};
		rendered = render(<SignUpHeader state={state} />);
	});
	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should wrap view with a flexible wrapper', () => {
		const headerComponent = rendered.getByTestId('header');
		const given = headerComponent.props.style;
		//padding-bottom 0 added from KeyboardAvoidingView behavior prop
		const result = {
			flex: 2,
			alignItems: 'center',
			marginTop: 40
		};
		expect(result).toMatchObject(given);
	});

	it('should wrap goLogin and center items', () => {
		const goToLoginComponent = rendered.getByTestId('goToLogin');
		const given = goToLoginComponent.props.style;
		const result = {
			width: 100,
			height: 60,
			borderRadius: 70,
			alignItems: 'center',
			justifyContent: 'center',
			alignSelf: 'flex-end',
			color: '#fff',
			padding: 20,
			marginRight: 5,
			backgroundColor: '#EB8873',
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render correct logInText styles', () => {
		const goToLoginComponent = rendered.getByTestId('logInText');
		const given = goToLoginComponent.props.style;
		const result = {
			color: 'white',
			fontSize: 14,
			fontWeight: 'bold'
		};
		expect(result).toMatchObject(given);
	});

	it('should render correct boozyText styles', () => {
		const boozyTextComponent = rendered.getByTestId('boozyText');
		const given = boozyTextComponent.props.style;
		const result = {
			color: '#EB8873',
			fontSize: 90,
			fontFamily: 'BradleyHandBold'
		};
		expect(result).toMatchObject(given);
	});

	it('should render correct boozySlogan styles', () => {
		const boozySloganComponent = rendered.getByTestId('boozySlogan');
		const given = boozySloganComponent.props.style;
		const result = {
			color: 'white',
			fontSize: 25,
			fontFamily: 'BradleyHandBold'
		};
		expect(result).toMatchObject(given);
	});
});
