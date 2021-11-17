import React from 'react';
import { reduxRender, cleanup, render, fireEvent, waitFor } from '../../../TestHelperFiles/redux/test-utils';
import Home from '../Home';
import HomeTestFuncs from '../../../TestHelperFiles/Functions/HomeTestFuncs';
import getDataFromFilterReducer, { getDataFromFilterAsync } from '../redux/getDataFromFilterSlice';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { baseUrl } from '../../../helpers/constants';
import homeReducer, { getCurrentLocationDataAsync } from '../redux/homeSlice';
import viewRestaurantsReducer, { viewRestaurantsAsync } from '../redux/viewRestaurantsSlice';

const createTestProps = (props) => ({
	navigation: {
		navigate: jest.fn(),
		addListener: jest.fn()
	},
	...props
});

describe('<Home />', () => {
	let props;
	let rendered;

	beforeEach(() => {
		props = createTestProps({});
		rendered = reduxRender(<Home {...props} />);
	});

	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
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

	it('should render inner styles and center items', () => {
		const keyboardAvoidingViewComponent = rendered.getByTestId('inner');
		const given = keyboardAvoidingViewComponent.props.style;
		//padding-bottom 0 added from KeyboardAvoidingView behavior prop
		const result = {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center'
		};
		expect(result).toMatchObject(given);
	});

	//functions

	describe('showErrorAlert', () => {
		it('calls sideEffect', () => {
			jest.spyOn(HomeTestFuncs, 'showErrorAlert');
			HomeTestFuncs.showErrorAlert('Network failed...');
			expect(HomeTestFuncs.showErrorAlert).toHaveBeenCalledTimes(1);
			expect(HomeTestFuncs.showErrorAlert).toHaveBeenCalledWith('Network failed...');
		});
	});

	describe('populateRestaurants', () => {
		it('calls sideEffect', () => {
			jest.spyOn(HomeTestFuncs, 'populateRestaurants');
			HomeTestFuncs.populateRestaurants([]);
			expect(HomeTestFuncs.populateRestaurants).toHaveBeenCalledTimes(1);
			expect(HomeTestFuncs.populateRestaurants).toHaveBeenCalledWith([]);
		});
	});

	describe('showFilterOverlay', () => {
		it('calls sideEffect', () => {
			jest.spyOn(HomeTestFuncs, 'showFilterOverlay');
			HomeTestFuncs.showFilterOverlay(true);
			expect(HomeTestFuncs.showFilterOverlay).toHaveBeenCalledTimes(1);
			expect(HomeTestFuncs.showFilterOverlay).toHaveBeenCalledWith(true);
		});
	});

	describe('getDataFromFilter', () => {
		it('calls sideEffect', () => {
			jest.spyOn(HomeTestFuncs, 'getDataFromFilter');
			HomeTestFuncs.getDataFromFilter();
			expect(HomeTestFuncs.getDataFromFilter).toHaveBeenCalledTimes(1);
		});
	});

	describe('setMapRef', () => {
		it('calls sideEffect', () => {
			jest.spyOn(HomeTestFuncs, 'setMapRef');
			HomeTestFuncs.setMapRef(null);
			expect(HomeTestFuncs.setMapRef).toHaveBeenCalledTimes(1);
		});
	});

	describe('dismiss', () => {
		it('calls sideEffect', () => {
			jest.spyOn(HomeTestFuncs, 'dismiss');
			HomeTestFuncs.dismiss();
			expect(HomeTestFuncs.dismiss).toHaveBeenCalledTimes(1);
		});
	});

	//redux integration
	describe('redux', () => {
		it('should dispatch getDataFromFilterAsync and state updated fulfilled', async () => {
			const filter = {
				location: 'France',
				priceType: 2,
				cuisine: 'pizza'
			};
			const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce([]);
			const store = configureStore({
				reducer: {
					dataFromFilter: getDataFromFilterReducer
				}
			});
			await store.dispatch(getDataFromFilterAsync(filter));
			expect(getSpy).toBeCalledWith(`${baseUrl}/yelp/${filter.location}/${filter.priceType}/${filter.cuisine}`);
			const state = store.getState();
			expect(state).toEqual({
				dataFromFilter: {
					currentState: {
						restaurantsArray: undefined,
						dataFromFilterRequestStatus: 'fulfilled'
					}
				}
			});
		});

		it('should dispatch getCurrentLocationDataAsync and state updated fulfilled', async () => {
			const coordinates = {
				latitude: 0,
				longitude: 0
			};
			const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce([]);
			const store = configureStore({
				reducer: {
					home: homeReducer
				}
			});
			await store.dispatch(getCurrentLocationDataAsync(coordinates));
			expect(getSpy).toBeCalledWith(`${baseUrl}/yelp/${coordinates.latitude}/${coordinates.longitude}`);
			const state = store.getState();
			expect(state).toEqual({
				home: {
					currentState: {
						$$$$color: 'white',
						$$$color: 'white',
						$$color: 'white',
						$color: 'white',
						allCategories: '',
						alreadyFavorited: false,
						alreadyRated: false,
						cuisine: null,
						initialPosition: {
							latitude: 0,
							longitude: 0
						},
						location: '',
						locationDataRequestStatus: 'fulfilled',
						markerPosition: {
							latitude: 0,
							longitude: 0
						},
						priceType: 6,
						restaurantsArray: undefined
					}
				}
			});
		});

		it('should dispatch viewRestaurantsAsync and state updated', async () => {
			const restaurant = {
				index: 0,
				state: {
					index: 0,
					restaurantsArray: [
						{
							id: 0,
							name: 'Texas Roadhouse',
							categories: ['barbecue']
						}
					]
				}
			};
			let restaurantId = undefined;
			const postSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce([]);
			const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce([]);
			const store = configureStore({
				reducer: {
					restaurant: viewRestaurantsReducer
				}
			});
			await store.dispatch(viewRestaurantsAsync(restaurant));
			expect(postSpy).toBeCalledWith(`${baseUrl}/favorites`, {
				name: 'Texas Roadhouse',
				restaurantId: undefined
			});
			expect(getSpy).toBeCalledWith(`${baseUrl}/${restaurantId}/review`);
			const state = store.getState();
			expect(state).toEqual({
				restaurant: {
					currentState: {
						restaurantRequestStatus: 'rejected'
					}
				}
			});
		});
	});
});
