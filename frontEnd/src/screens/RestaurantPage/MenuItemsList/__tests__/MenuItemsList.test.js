import React from 'react';
import { cleanup, render, fireEvent } from '../../../../TestHelperFiles/redux/test-utils';
import MenuItemsList from '../MenuItemsList';

describe('<MenuItemsList />', () => {
	let state;
	let showMenuItemOverlay = jest.fn(),
		dismiss = jest.fn();
	let rendered;
	beforeEach(() => {
		state = {
			menuItemArray: []
		};
		(showMenuItemOverlay = jest.fn()), (dismiss = jest.fn());
		rendered = render(<MenuItemsList state={state} showMenuItemOverlay={showMenuItemOverlay} dismiss={dismiss} />);
	});

	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should wrap flexible wrapper over view and list', () => {
		const scrollContainerViewComponent = rendered.getByTestId('scrollContainer');
		const given = scrollContainerViewComponent.props.style;
		const result = {
			flex: 1,
			width: '100%',
			backgroundColor: 'white'
		};
		expect(result).toMatchObject(given);
	});

	it('should render menuItemsTitleContainer styles correctly', () => {
		const menuItemsTitleContainerComponent = rendered.getByTestId('menuItemsTitleContainer');
		const given = menuItemsTitleContainerComponent.props.style;
		const result = {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		};
		expect(result).toMatchObject(given);
	});

	it('should render menuTitle styles correctly', () => {
		const menuTitleComponent = rendered.getByTestId('menuTitle');
		const given = menuTitleComponent.props.style;
		const result = {
			color: 'lightgrey',
			fontSize: 20,
			marginTop: 0,
			fontWeight: 'bold',
			padding: 10
		};
		expect(result).toMatchObject(given);
	});

	it('should render menuButtonContainer styles correctly', () => {
		const menuButtonContainerComponent = rendered.getByTestId('menuButtonContainer');
		const given = menuButtonContainerComponent.props.style;
		const result = {
			marginRight: 15
		};
		expect(result).toMatchObject(given);
	});

	it('should render menu button styles correctly', () => {
		const menuButtonComponent = rendered.getByTestId('menuButton');
		const given = menuButtonComponent.props.style;
		const result = {
			width: 110,
			backgroundColor: '#EB8873',
			borderRadius: 20,
			padding: 7,
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render menuItemText styles correctly', () => {
		const menuItemTextComponent = rendered.getByTestId('menuItemText');
		const given = menuItemTextComponent.props.style;
		const result = {
			color: 'white',
			fontWeight: 'bold'
		};
		expect(result).toMatchObject(given);
	});

	//interaction
	it('should fire menu button event', () => {
		const menuButton = rendered.getByTestId('menuButton');
		fireEvent.press(menuButton);
		expect(showMenuItemOverlay).toHaveBeenCalledTimes(1);
	});
});
