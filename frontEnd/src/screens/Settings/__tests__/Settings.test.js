import React from 'react';
import { reduxRender, cleanup } from '../../../TestHelperFiles/redux/test-utils';
import SettingsTestFuncs from '../../../TestHelperFiles/Functions/SettingsTestFuncs';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { baseUrl } from '../../../helpers/constants';
import Settings from '../Settings';
import settingsReducer, { logoutAsync } from '../redux/settingsSlice';

describe('<Settings />', () => {
	let rendered;

	beforeEach(() => {
		rendered = reduxRender(<Settings />);
	});

	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should wrap view with a flexible wrapper', () => {
		const containerViewComponent = rendered.getByTestId('container');
		const given = containerViewComponent.props.style;
		const result = {
			flex: 1,
			paddingTop: 0,
			backgroundColor: '#fff'
		};
		expect(result).toMatchObject(given);
	});

	it('should render logoutButtonContainer styles correctly', () => {
		const logoutButtonContainerComponent = rendered.getByTestId('logoutButtonContainer');
		const given = logoutButtonContainerComponent.props.style;
		const result = {
			flex: 1,
			justifyContent: 'flex-start',
			alignItems: 'flex-end',
			margin: 20
		};
		expect(result).toMatchObject(given);
	});

	it('should render logoutButton styles correctly', () => {
		const logoutButtonComponent = rendered.getByTestId('logoutButton');
		const given = logoutButtonComponent.props.style;
		const result = {
			width: 100,
			height: 60,
			borderRadius: 70,
			elevation: 8,
			color: '#fff',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#EB8873',
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render logoutText styles correctly', () => {
		const logoutTextComponent = rendered.getByTestId('logoutText');
		const given = logoutTextComponent.props.style;
		const result = {
			color: '#fff',
			fontSize: 14,
			fontWeight: 'bold'
		};
		expect(result).toMatchObject(given);
	});

	it('should render logoImage styles correctly', () => {
		const logoImageComponent = rendered.getByTestId('logoImage');
		const given = logoImageComponent.props.style;
		const result = {
			alignSelf: 'center',
			justifyContent: 'flex-start',
			width: '45%',
			height: '60%',
			marginTop: 20,
			opacity: 0.7
		};
		expect(result).toMatchObject(given);
	});

	it('should render aboutContainer styles correctly', () => {
		const aboutContainerComponent = rendered.getByTestId('aboutContainer');
		const given = aboutContainerComponent.props.style;
		const result = {
			flex: 1,
			justifyContent: 'flex-start',
			marginHorizontal: 20
		};
		expect(result).toMatchObject(given);
	});

	it('should render aboutBoozyContainer styles correctly', () => {
		const aboutBoozyContainerComponent = rendered.getByTestId('aboutBoozyContainer');
		const given = aboutBoozyContainerComponent.props.style;
		const result = {
			marginBottom: 20
		};
		expect(result).toMatchObject(given);
	});

	it('should render aboutText styles correctly', () => {
		const aboutTextComponent = rendered.getByTestId('aboutText');
		const given = aboutTextComponent.props.style;
		const result = {
			color: '#EB8873',
			fontSize: 30,
			fontWeight: 'bold'
		};
		expect(result).toMatchObject(given);
	});

	it('should render aboutInfo styles correctly', () => {
		const aboutInfoComponent = rendered.getByTestId('aboutInfo');
		const given = aboutInfoComponent.props.style;
		const result = {
			color: '#ccc',
			fontSize: 13
		};
		expect(result).toMatchObject(given);
	});

	it('should render creatorText styles correctly', () => {
		const creatorTextComponent = rendered.getByTestId('creatorText');
		const given = creatorTextComponent.props.style;
		const result = {
			color: '#EB8873',
			fontSize: 30,
			fontWeight: 'bold'
		};
		expect(result).toMatchObject(given);
	});

	it('should render creatorInfo styles correctly', () => {
		const creatorInfoComponent = rendered.getByTestId('creatorInfo');
		const given = creatorInfoComponent.props.style;
		const result = {
			color: '#ccc',
			fontSize: 13
		};
		expect(result).toMatchObject(given);
	});

	//functions
	describe('goToLogin', () => {
		it('calls sideEffect', () => {
			jest.spyOn(SettingsTestFuncs, 'goToLogin');
			SettingsTestFuncs.goToLogin();
			expect(SettingsTestFuncs.goToLogin).toHaveBeenCalledTimes(1);
		});
	});

	describe('setIsSignedInAsyncStorage', () => {
		it('calls sideEffect', async () => {
			jest.spyOn(SettingsTestFuncs, 'setIsSignedInAsyncStorage');
			await SettingsTestFuncs.setIsSignedInAsyncStorage('true');
			expect(SettingsTestFuncs.setIsSignedInAsyncStorage).toHaveBeenCalledTimes(1);
			expect(SettingsTestFuncs.setIsSignedInAsyncStorage).toHaveBeenCalledWith('true');
		});
	});

	describe('logout', () => {
		it('calls sideEffect', () => {
			jest.spyOn(SettingsTestFuncs, 'logout');
			SettingsTestFuncs.logout();
			expect(SettingsTestFuncs.logout).toHaveBeenCalledTimes(1);
		});
	});

	//redux integration
	describe('redux', () => {
		it('should dispatch logoutAsync and state updated fulfilled', async () => {
			const postSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce(204);
			const store = configureStore({
				reducer: {
					settings: settingsReducer
				}
			});
			await store.dispatch(logoutAsync());
			expect(postSpy).toBeCalledWith(`${baseUrl}/logout`);
			const state = store.getState();
			expect(state).toEqual({
				settings: {
					currentState: {
						settingsRequestStatus: 'fulfilled'
					}
				}
			});
		});
	});
});
