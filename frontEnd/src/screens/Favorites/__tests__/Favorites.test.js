import React from 'react';
import { reduxRender, cleanup } from '../../../TestHelperFiles/redux/test-utils';
import Favorites from '../Favorites';
import FavoritesTestFuncs from '../../../TestHelperFiles/Functions/FavoritesTestFuncs';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { baseUrl } from '../../../helpers/constants';
import favoritesReducer, { getFavoritesAsync } from '../redux/favoritesSlice';

const createTestProps = (props) => ({
	navigation: {
		navigate: jest.fn(),
		addListener: jest.fn()
	},
	...props
});

describe('<Favorites />', () => {
	let props;
	let rendered;

	beforeEach(() => {
		props = createTestProps({});
		rendered = reduxRender(<Favorites {...props} />);
	});

	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should wrap view with a flexible wrapper', () => {
		const containerComponent = rendered.getByTestId('container');
		const given = containerComponent.props.style;
		const result = {
			flex: 1,
			paddingTop: 0,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%'
		};
		expect(result).toMatchObject(given);
	});

	it('should fill parent container 1/8', () => {
		const myFavoritesContainerComponent = rendered.getByTestId('myFavoritesContainer');
		const given = myFavoritesContainerComponent.props.style;
		const result = {
			flex: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should fill parent container 7/8', () => {
		const myFavoritesContainerComponent = rendered.getByTestId('myFavoritesListContainer');
		const given = myFavoritesContainerComponent.props.style;
		const result = {
			flex: 7
		};
		expect(result).toMatchObject(given);
	});

	it('should render myFavoritesText styles', () => {
		const myFavoritesTextComponent = rendered.getByTestId('myFavoritesText');
		const given = myFavoritesTextComponent.props.style;
		const result = {
			color: '#EB8873',
			fontFamily: 'Arial',
			fontWeight: 'bold',
			fontSize: 30
		};
		expect(result).toMatchObject(given);
	});

	//functions
	describe('showErrorAlert', () => {
		it('calls sideEffect', () => {
			jest.spyOn(FavoritesTestFuncs, 'showErrorAlert');
			FavoritesTestFuncs.showErrorAlert('Network failed...');
			expect(FavoritesTestFuncs.showErrorAlert).toHaveBeenCalledTimes(1);
			expect(FavoritesTestFuncs.showErrorAlert).toHaveBeenCalledWith('Network failed...');
		});
	});

	describe('favorite', () => {
		it('returns Favorite component', () => {
			const restaurant = {
				index: 0,
				item: {}
			};
			jest.spyOn(FavoritesTestFuncs, 'favorite');
			FavoritesTestFuncs.favorite(restaurant);
			expect(FavoritesTestFuncs.favorite).toHaveReturned();
			expect(FavoritesTestFuncs.favorite).toHaveBeenCalledWith(restaurant);
		});
	});

	//redux integration
	describe('redux', () => {
		it('should dispatch getFavoritesAsync and state updated fulfilled', async () => {
			const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce([]);
			const store = configureStore({
				reducer: {
					favorites: favoritesReducer
				}
			});
			await store.dispatch(getFavoritesAsync());
			expect(getSpy).toBeCalledWith(`${baseUrl}/get`);
			const state = store.getState();
			expect(state).toEqual({
				favorites: {
					currentState: {
						allCategories: '',
						alreadyFavorited: false,
						alreadyRated: false,
						restaurantsArray: undefined,
						getFavoritesRequestStatus: 'fulfilled'
					}
				}
			});
		});
	});
});
