import React from 'react';
import { cleanup, render, fireEvent } from '../../../../../TestHelperFiles/redux/test-utils';
import Restaurant from '../Restaurant';

describe('<Restaurant />', () => {
	let val;
	let viewRestaurant = jest.fn(),
		dismiss = jest.fn();
	let rendered;
	beforeEach(() => {
		val = {
			name: 'test'
		};
		(viewRestaurant = jest.fn()), (dismiss = jest.fn());
		rendered = render(<Restaurant val={val} viewRestaurant={viewRestaurant} dismiss={dismiss} />);
	});

	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should render container styles and space between items correctly', () => {
		const containerViewComponent = rendered.getByTestId('container');
		const given = containerViewComponent.props.style;
		const result = {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: 20,
			paddingHorizontal: 30,
			borderBottomWidth: 2,
			borderBottomColor: '#ededed'
		};
		expect(result).toMatchObject(given);
	});

	it('should render nameText styles correctly', () => {
		const nameTextComponent = rendered.getByTestId('nameText');
		const given = nameTextComponent.props.style;
		const result = {
			color: 'black'
		};
		expect(result).toMatchObject(given);
	});

	it('should render viewRestaurant button styles correctly', () => {
		const viewRestaurantComponent = rendered.getByTestId('viewRestaurant');
		const given = viewRestaurantComponent.props.style;
		const result = {
			padding: 5,
			backgroundColor: '#EB8873',
			borderRadius: 20,
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render viewText styles correctly', () => {
		const viewTextComponent = rendered.getByTestId('viewText');
		const given = viewTextComponent.props.style;
		const result = {
			color: 'white',
			fontWeight: 'bold'
		};
		expect(result).toMatchObject(given);
	});

	//interaction
	it('should fire viewRestaurant button events', () => {
		const viewRestaurantButton = rendered.getByTestId('viewRestaurant');
		fireEvent.press(viewRestaurantButton);
		expect(viewRestaurant).toHaveBeenCalledTimes(1);
	});
});
