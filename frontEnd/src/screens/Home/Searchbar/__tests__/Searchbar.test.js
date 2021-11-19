import React from 'react';
import Searchbar from '../Searchbar';
import { cleanup, render, fireEvent } from '../../../../TestHelperFiles/redux/test-utils';

describe('<Searchbar />', () => {
	let state;
	let updateLocation, dispatch, showFilterOverlay, getDataFromFilter;
	let rendered;

	beforeEach(() => {
		state = {
			location: 'France'
		};
		(updateLocation = jest.fn()), (dispatch = jest.fn()), (showFilterOverlay = jest.fn()), (getDataFromFilter = jest.fn());
		rendered = render(<Searchbar state={state} updateLocation={updateLocation} dispatch={dispatch} showFilterOverlay={showFilterOverlay} getDataFromFilter={getDataFromFilter} />);
	});

	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should wrap view with a flexible wrapper', () => {
		const containerViewComponent = rendered.getByTestId('searchContainer');
		const given = containerViewComponent.props.style;
		const result = {
			flex: 1,
			width: '100%',
			padding: 20
		};
		expect(result).toMatchObject(given);
	});

	it('should wrap view with a flexible wrapper', () => {
		const containerViewComponent = rendered.getByTestId('searchContainer');
		const given = containerViewComponent.props.style;
		const result = {
			flex: 1,
			width: '100%',
			padding: 20
		};
		expect(result).toMatchObject(given);
	});

	it('should render searchNearbyTextContainer styles correctly', () => {
		const searchNearbyTextContainerComponent = rendered.getByTestId('searchNearbyTextContainer');
		const given = searchNearbyTextContainerComponent.props.style;
		const result = {
			marginBottom: 10
		};
		expect(result).toMatchObject(given);
	});

	it('should render searchNearbyText styles correctly', () => {
		const searchNearbyTextComponent = rendered.getByTestId('searchNearbyText');
		const given = searchNearbyTextComponent.props.style;
		const result = {
			color: '#EB8873',
			fontFamily: 'Arial',
			fontWeight: 'bold',
			fontSize: 18
		};
		expect(result).toMatchObject(given);
	});

	it('should render searchBarBackground styles correctly', () => {
		const searchBarBackgroundComponent = rendered.getByTestId('searchBarBackground');
		const given = searchBarBackgroundComponent.props.style;
		const result = {
			backgroundColor: '#F0EEEE',
			height: 50,
			width: '90%',
			borderRadius: 15,
			alignSelf: 'center',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingHorizontal: 20
		};
		expect(result).toMatchObject(given);
	});

	it('should render searchInput styles correctly', () => {
		const searchInputComponent = rendered.getByTestId('searchInput');
		const given = searchInputComponent.props.style;
		const result = {
			fontSize: 18
		};
		expect(result).toMatchObject(given);
	});

	it('should render searchButton correctly', () => {
		const searchButtonComponent = rendered.getByTestId('searchButton');
		const given = searchButtonComponent.props.style;
		const result = {
			alignSelf: 'flex-end',
			marginTop: 5,
			marginRight: 20,
			color: '#E91E63',
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render searchtext correctly', () => {
		const containerViewComponent = rendered.getByTestId('searchtext');
		const given = containerViewComponent.props.style;
		const result = {
			color: '#E91E63'
		};
		expect(result).toMatchObject(given);
	});

	//interaction
	it('should fire searchInput onChangeText event', () => {
		const searchInputComponent = rendered.getByTestId('searchInput');
		fireEvent(searchInputComponent, 'changeText', 'new text');
		expect(updateLocation).toHaveBeenCalledWith({ location: 'new text' });
	});

	it('should fire search button event', () => {
		const getDataFromFilterButton = rendered.getByText('search');
		fireEvent.press(getDataFromFilterButton);
		expect(getDataFromFilter).toHaveBeenCalledTimes(1);
	});

	it('should fire show filter button event', () => {
		const showFilterButton = rendered.getByTestId('showFilterButton');
		fireEvent.press(showFilterButton);
		expect(showFilterOverlay).toHaveBeenCalledTimes(1);
	});
});
