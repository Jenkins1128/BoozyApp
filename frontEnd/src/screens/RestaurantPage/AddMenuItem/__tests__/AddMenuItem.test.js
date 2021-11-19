import React from 'react';
import { render, cleanup, fireEvent } from '../../../../TestHelperFiles/redux/test-utils';
import AddMenuItem from '../AddMenuItem';

describe('<AddMenuItem />', () => {
	let menuItemState;
	let dispatch, updatePrice, updateDescription, getDataFromMenuItem, dismiss;
	let rendered;

	beforeEach(() => {
		menuItemState = {
			price: 6,
			description: 'test'
		};
		(dispatch = jest.fn()), (updatePrice = jest.fn()), (updateDescription = jest.fn()), (getDataFromMenuItem = jest.fn()), (dismiss = jest.fn());
		rendered = render(<AddMenuItem menuItemState={menuItemState} dispatch={dispatch} updatePrice={updatePrice} updateDescription={updateDescription} getDataFromMenuItem={getDataFromMenuItem} dismiss={dismiss} />);
	});

	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should render subView styles correctly', () => {
		const subViewComponent = rendered.getByTestId('subView');
		const given = subViewComponent.props.style;
		const result = {
			position: 'absolute',
			backgroundColor: '#FFFFFF',
			padding: 20,
			borderRadius: 30,
			transform: [{ translateY: undefined }]
		};
		expect(result).toMatchObject(given);
	});

	it('should render addMenuItemHeader styles correctly', () => {
		const addMenuItemHeaderComponent = rendered.getByTestId('addMenuItemHeader');
		const given = addMenuItemHeaderComponent.props.style;
		const result = {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 20
		};
		expect(result).toMatchObject(given);
	});

	it('should render addMenuItemTitleContainer styles correctly', () => {
		const addMenuItemTitleContainerComponent = rendered.getByTestId('addMenuItemTitleContainer');
		const given = addMenuItemTitleContainerComponent.props.style;
		const result = {
			marginRight: 20
		};
		expect(result).toMatchObject(given);
	});

	it('should render addMenuItemTitle styles correctly', () => {
		const addMenuItemTitleComponent = rendered.getByTestId('addMenuItemTitle');
		const given = addMenuItemTitleComponent.props.style;
		const result = {
			fontSize: 20,
			fontWeight: 'bold',
			color: '#EB8873'
		};
		expect(result).toMatchObject(given);
	});

	it('should render cancelButton styles correctly', () => {
		const cancelButtonComponent = rendered.getByTestId('cancelButton');
		const given = cancelButtonComponent.props.style;
		const result = {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#FFFFFF',
			padding: 10,
			borderRadius: 20,
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render priceInput styles correctly', () => {
		const priceInputComponent = rendered.getByTestId('priceInput');
		const given = priceInputComponent.props.style;
		const result = {
			fontSize: 18,
			textAlign: 'center',
			marginBottom: 20
		};
		expect(result).toMatchObject(given);
	});

	it('should render descriptionInput styles correctly', () => {
		const descriptionInputComponent = rendered.getByTestId('descriptionInput');
		const given = descriptionInputComponent.props.style;
		const result = {
			fontSize: 18,
			textAlign: 'center',
			marginBottom: 20
		};
		expect(result).toMatchObject(given);
	});

	it('should render addMenuItemButton styles correctly', () => {
		const addMenuItemButtonComponent = rendered.getByTestId('addMenuItemButton');
		const given = addMenuItemButtonComponent.props.style;
		const result = {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#EB8873',
			padding: 10,
			borderRadius: 20,
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render cancelText styles correctly', () => {
		const cancelTextComponent = rendered.getByTestId('cancelText');
		const given = cancelTextComponent.props.style;
		const result = {
			color: '#EB8873',
			fontWeight: 'bold'
		};
		expect(result).toMatchObject(given);
	});

	it('should render addMenuItemText styles correctly', () => {
		const addMenuItemTextComponent = rendered.getByTestId('addMenuItemText');
		const given = addMenuItemTextComponent.props.style;
		const result = {
			color: 'white',
			fontWeight: 'bold'
		};
		expect(result).toMatchObject(given);
	});

	//interaction
	it('should fire updatePrice onChangeText event', () => {
		const inputComponent = rendered.getByTestId('priceInput');
		fireEvent(inputComponent, 'changeText', 5);
		expect(updatePrice).toHaveBeenCalledWith({ price: 5 });
	});

	it('should fire updateDescription onChangeText event', () => {
		const inputComponent = rendered.getByTestId('descriptionInput');
		fireEvent(inputComponent, 'changeText', 'pizza, yum');
		expect(updateDescription).toHaveBeenCalledWith({ description: 'pizza, yum' });
	});

	it('should fire addMenuItemButton event', () => {
		const addMenuItemButton = rendered.getByText('Submit');
		fireEvent.press(addMenuItemButton);
		expect(getDataFromMenuItem).toHaveBeenCalledTimes(1);
	});
});
