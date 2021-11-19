import React from 'react';
import { render, cleanup } from '../../../../TestHelperFiles/redux/test-utils';
import RestaurantList from '../RestaurantList';
describe('<RestaurantList />', () => {
	let state;
	let viewRestaurants, dismiss;
	let rendered;

	beforeEach(() => {
		state = {
			restaurantsArray: []
		};
		(viewRestaurants = jest.fn()), (dismiss = jest.fn());
		rendered = render(<RestaurantList state={state} viewRestaurants={viewRestaurants} dismiss={dismiss} />);
	});

	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should wrap flatlist with a flexible wrapper', () => {
		const scrollContainerComponent = rendered.getByTestId('scrollContainer');
		const given = scrollContainerComponent.props.style;
		const result = {
			flex: 2,
			width: '100%'
		};
		expect(result).toMatchObject(given);
	});
});
