import React from 'react';
import { render, cleanup, fireEvent } from '../../../../TestHelperFiles/redux/test-utils';
import RestaurantHeader from '../RestaurantHeader';

describe('<RestaurantHeader />', () => {
	let state;
	let onStarRatingPressed, favorite, dismiss;
	let rendered;

	beforeEach(() => {
		state = {
			restaurantImage: '',
			restaurantName: '',
			favoriteColor: '',
			allCategories: '',
			rating: 4,
			phoneNumber: '',
			reviews: '',
			rated: false,
			starCount: 0
		};
		(onStarRatingPressed = jest.fn()), (favorite = jest.fn()), (dismiss = jest.fn());
		rendered = render(<RestaurantHeader state={state} onStarRatingPressed={onStarRatingPressed} favorite={favorite} dismiss={dismiss} />);
	});

	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should wrap flexible wrapper over view and list', () => {
		const headerComponent = rendered.getByTestId('header');
		const given = headerComponent.props.style;
		const result = {
			flex: 1,
			width: '100%',
			justifyContent: 'center',
			backgroundColor: '#EB8873'
		};
		expect(result).toMatchObject(given);
	});

	it('should render titleHeader styles correctly', () => {
		const titleHeaderComponent = rendered.getByTestId('titleHeader');
		const given = titleHeaderComponent.props.style;
		const result = {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 10
		};
		expect(result).toMatchObject(given);
	});

	it('should render logoImage styles correctly', () => {
		const logoImageComponent = rendered.getByTestId('logoImage');
		const given = logoImageComponent.props.style;
		const result = {
			flex: 2,
			width: '100%',
			height: '100%'
		};
		expect(result).toMatchObject(given);
	});

	it('should render restaurantName styles correctly', () => {
		const restaurantNameComponent = rendered.getByTestId('restaurantName');
		const given = restaurantNameComponent.props.style;
		const result = {
			color: 'white',
			fontSize: 25,
			fontWeight: 'bold',
			marginLeft: 10
		};
		expect(result).toMatchObject(given);
	});

	it('should render categoriesText styles correctly', () => {
		const categoriesTextComponent = rendered.getByTestId('categoriesText');
		const given = categoriesTextComponent.props.style;
		const result = {
			fontSize: 14,
			marginBottom: 0,
			color: 'white'
		};
		expect(result).toMatchObject(given);
	});

	it('should render phoneNumberText styles correctly', () => {
		const phoneNumberTextComponent = rendered.getByTestId('phoneNumberText');
		const given = phoneNumberTextComponent.props.style;
		const result = {
			fontSize: 14,
			marginBottom: 0,
			color: 'white'
		};
		expect(result).toMatchObject(given);
	});

	it('should render favoriteButton styles correctly', () => {
		const favoriteButtonComponent = rendered.getByTestId('favoriteButton');
		const given = favoriteButtonComponent.props.style;
		const result = {
			marginBottom: 0,
			margin: 10,
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render titleBody styles correctly', () => {
		const titleBodyComponent = rendered.getByTestId('titleBody');
		const given = titleBodyComponent.props.style;
		const result = {
			flex: 1,
			marginHorizontal: 15
		};
		expect(result).toMatchObject(given);
	});

	it('should render infoContainer styles correctly', () => {
		const infoContainerComponent = rendered.getByTestId('infoContainer');
		const given = infoContainerComponent.props.style;
		const result = {
			flex: 1,
			marginBottom: 0
		};
		expect(result).toMatchObject(given);
	});

	it('should render starRatingContainer styles correctly', () => {
		const starRatingContainerComponent = rendered.getByTestId('starRatingContainer');
		const given = starRatingContainerComponent.props.style;
		const result = {
			flex: 1,
			paddingBottom: 0
		};
		expect(result).toMatchObject(given);
	});

	//interaction
	it('should fire dismiss button event on TouchableWithoutFeedback', () => {
		const dismissButton = rendered.getByTestId('header');
		fireEvent.press(dismissButton);
		expect(dismiss).toHaveBeenCalledTimes(1);
	});

	it('should fire favorite button event', () => {
		const favoriteButton = rendered.getByTestId('favoriteButton');
		fireEvent.press(favoriteButton);
		expect(favorite).toHaveBeenCalledTimes(1);
	});
});
