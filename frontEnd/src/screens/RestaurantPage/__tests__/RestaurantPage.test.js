import React from 'react';
import RestaurantPage from '../RestaurantPage';
import { reduxRender, cleanup } from '../../../TestHelperFiles/redux/test-utils';
import RestaurantPageFuncs from '../../../TestHelperFiles/Functions/RestaurantPageFuncs';
import favoriteReducer, { favoriteAsync } from '../redux/favoriteSlice';
import menuItemReducer, { postMenuItemAsync } from '../redux/menuItemSlice';
import restaurantPageReducer, { getMenuItemsAsync } from '../redux/restaurantPageSlice';
import starRatingReducer, { starRatingAsync } from '../redux/starRatingSlice';
import axios from 'axios';
import { baseUrl, defaultRestaurantImageUrl } from '../../../helpers/constants';
import { configureStore } from '@reduxjs/toolkit';

const createTestProps = (props) => ({
	navigation: {
		navigate: jest.fn(),
		addListener: jest.fn()
	},
	...props
});

describe('<RestaurantPage />', () => {
	let rendered;

	beforeEach(() => {
		props = createTestProps({});
		rendered = reduxRender(<RestaurantPage {...props} />);
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

	it('should render inner styles and center items correctly', () => {
		const innerViewComponent = rendered.getByTestId('inner');
		const given = innerViewComponent.props.style;
		//padding-bottom 0 added from KeyboardAvoidingView behavior prop
		const result = {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		};
		expect(result).toMatchObject(given);
	});

	//functions
	describe('showErrorAlert', () => {
		it('calls sideEffect', () => {
			jest.spyOn(RestaurantPageFuncs, 'showErrorAlert');
			RestaurantPageFuncs.showErrorAlert('Network failed...');
			expect(RestaurantPageFuncs.showErrorAlert).toHaveBeenCalledTimes(1);
			expect(RestaurantPageFuncs.showErrorAlert).toHaveBeenCalledWith('Network failed...');
		});
	});

	describe('getRestaurantDataOnFocus', () => {
		it('calls sideEffect', () => {
			jest.spyOn(RestaurantPageFuncs, 'getRestaurantDataOnFocus');
			RestaurantPageFuncs.getRestaurantDataOnFocus();
			expect(RestaurantPageFuncs.getRestaurantDataOnFocus).toHaveBeenCalledTimes(1);
		});
	});

	describe('showMenuItemOverlay', () => {
		it('calls sideEffect', () => {
			jest.spyOn(RestaurantPageFuncs, 'showMenuItemOverlay');
			RestaurantPageFuncs.showMenuItemOverlay(true);
			expect(RestaurantPageFuncs.showMenuItemOverlay).toHaveBeenCalledTimes(1);
		});
	});

	describe('changeColor', () => {
		it('calls sideEffect', () => {
			jest.spyOn(RestaurantPageFuncs, 'changeColor');
			RestaurantPageFuncs.changeColor('white');
			expect(RestaurantPageFuncs.changeColor).toHaveBeenCalledTimes(1);
		});
	});

	describe('onStarRatingPressed', () => {
		it('calls sideEffect', () => {
			jest.spyOn(RestaurantPageFuncs, 'onStarRatingPressed');
			RestaurantPageFuncs.onStarRatingPressed(4);
			expect(RestaurantPageFuncs.onStarRatingPressed).toHaveBeenCalledTimes(1);
		});
	});

	describe('getDataFromMenuItem', () => {
		it('calls sideEffect', () => {
			jest.spyOn(RestaurantPageFuncs, 'getDataFromMenuItem');
			RestaurantPageFuncs.getDataFromMenuItem();
			expect(RestaurantPageFuncs.getDataFromMenuItem).toHaveBeenCalledTimes(1);
		});
	});

	describe('menuItemSubmitted', () => {
		it('calls sideEffect', () => {
			jest.spyOn(RestaurantPageFuncs, 'menuItemSubmitted');
			RestaurantPageFuncs.menuItemSubmitted();
			expect(RestaurantPageFuncs.menuItemSubmitted).toHaveBeenCalledTimes(1);
		});
	});

	describe('favorite', () => {
		it('calls sideEffect', () => {
			jest.spyOn(RestaurantPageFuncs, 'favorite');
			RestaurantPageFuncs.favorite();
			expect(RestaurantPageFuncs.favorite).toHaveBeenCalledTimes(1);
		});
	});

	describe('dismiss', () => {
		it('calls sideEffect', () => {
			jest.spyOn(RestaurantPageFuncs, 'dismiss');
			RestaurantPageFuncs.dismiss();
			expect(RestaurantPageFuncs.dismiss).toHaveBeenCalledTimes(1);
		});
	});

	//redux integrations
	describe('redux', () => {
		it('should dispatch favoriteAsync and state updated fulfilled', async () => {
			const restaurant = {
				restaurantId: 0,
				name: 'Texas Roadhouse'
			};
			const postSpy1 = jest.spyOn(axios, 'post').mockResolvedValueOnce(204);
			const postSpy2 = jest.spyOn(axios, 'post').mockResolvedValueOnce([]);
			const store = configureStore({
				reducer: {
					favorite: favoriteReducer
				}
			});
			await store.dispatch(favoriteAsync(restaurant));
			expect(postSpy1).toBeCalledWith(`${baseUrl}/user/add`, restaurant);
			expect(postSpy2).toBeCalledWith(`${baseUrl}/favorites`, restaurant);
			const state = store.getState();
			expect(state).toEqual({
				favorite: {
					currentState: {
						favoriteColor: 'white',
						favoriteRequestStatus: 'fulfilled'
					}
				}
			});
		});

		it('should dispatch postMenuItemAsync and state updated fulfilled', async () => {
			const restaurant = {
				description: 'Pulled pork, fantastic',
				price: 6,
				restaurantName: 'Texas Roadhouse',
				restaurantId: 0
			};
			const postSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce(204);
			const store = configureStore({
				reducer: {
					menuItem: menuItemReducer
				}
			});
			await store.dispatch(postMenuItemAsync(restaurant));
			expect(postSpy).toBeCalledWith(`${baseUrl}/user/${restaurant.restaurantId}/menu`, {
				content: 'Pulled pork, fantastic',
				price: 6,
				name: 'Texas Roadhouse'
			});
			const state = store.getState();
			expect(state).toEqual({
				menuItem: {
					currentState: {
						postMenuItemRequestStatus: 'fulfilled'
					}
				}
			});
		});

		it('should dispatch getMenuItemsAsync and state updated fulfilled', async () => {
			let restaurantId = 0;
			const postSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce([]);
			const store = configureStore({
				reducer: {
					restaurantPage: restaurantPageReducer
				}
			});
			await store.dispatch(getMenuItemsAsync(restaurantId));
			expect(postSpy).toBeCalledWith(`${baseUrl}/menu/list`, {
				restaurantId: restaurantId
			});
			const state = store.getState();
			expect(state).toEqual({
				restaurantPage: {
					currentState: {
						restaurantPageRequestStatus: 'fulfilled',
						restaurantId: '',
						restaurantName: '',
						restaurantImage: defaultRestaurantImageUrl,
						phoneNumber: '',
						allCategories: '',
						rating: 0.0,
						reviews: 0,
						favoriteColor: 'white',
						changeFavoritedColor: '',
						starCount: 0,
						favorited: false,
						rated: false,
						price: 0.0,
						description: '',
						menuItemArray: undefined
					}
				}
			});
		});

		it('should dispatch starRatingAsync and state updated fulfilled', async () => {
			const restaurant = {
				rating: 4,
				restaurantId: 0,
				restaurantName: 'Texas Roadhouse'
			};
			const postSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce(204);
			const store = configureStore({
				reducer: {
					starRating: starRatingReducer
				}
			});
			await store.dispatch(starRatingAsync(restaurant));
			expect(postSpy).toBeCalledWith(`${baseUrl}/user/${restaurant.restaurantId}/restaurants`, {
				content: restaurant.rating,
				name: restaurant.restaurantName
			});
			const state = store.getState();
			expect(state).toEqual({
				starRating: {
					currentState: {
						starRatingRequestStatus: 'fulfilled'
					}
				}
			});
		});
	});
});
