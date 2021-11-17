import React from 'react';
import BoozyMap from '../BoozyMap';
import { reduxRender, cleanup, render, fireEvent } from '../../../../TestHelperFiles/redux/test-utils';
import { Dimensions } from 'react-native';

describe('<BoozyMap />', () => {
	let state;
	let setMapRef, viewRestaurants, dismiss;
	let rendered;

	beforeEach(() => {
		state = {
			restaurantsArray: [
				{
					marker: {
						lat: 0,
						long: 0,
						name: 'test',
						address: 'test'
					}
				}
			],
			initialPosition: {
				latitude: 0,
				longitude: 0
			},
			markerPosition: {
				latitude: 0,
				longitude: 0
			}
		};
		(setMapRef = jest.fn()), (viewRestaurants = jest.fn()), (dismiss = jest.fn());
		rendered = reduxRender(<BoozyMap setMapRef={setMapRef} state={state} viewRestaurants={viewRestaurants} dismiss={dismiss} />);
	});

	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should wrap view with a flexible wrapper', () => {
		const mapViewComponent = rendered.getByTestId('mapView');
		const given = mapViewComponent.props.style;
		const result = {
			flex: 3,
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height / 2
		};
		expect(result).toMatchObject(given);
	});

	it('should render callout position', () => {
		const calloutBtnComponent = rendered.getByTestId('calloutBtn');
		const given = calloutBtnComponent.props.style;
		const result = {
			flex: 1,
			position: 'relative'
		};
		expect(result).toMatchObject(given);
	});

	//interaction
	it('should fire mapview callout button events', () => {
		const calloutButton = rendered.getByTestId('calloutBtn');
		fireEvent.press(calloutButton);
		expect(viewRestaurants).toHaveBeenCalledTimes(1);
	});
});
