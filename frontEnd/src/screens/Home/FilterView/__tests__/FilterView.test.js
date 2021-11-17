import React from 'react';
import { cleanup, render, fireEvent } from '../../../../TestHelperFiles/redux/test-utils';
import FilterView from '../FilterView';

describe('<FilterView />', () => {
	let state;
	let dispatch, reset, updateLocation, updateCuisine, setPrice1, setPrice2, setPrice3, setPrice4, showFilterOverlay, getDataFromFilter;
	let rendered;

	beforeEach(() => {
		state = {
			location: 'France',
			cuisine: 'pizza',
			$color: 'white',
			$$color: 'white',
			$$$color: 'white',
			$$$$color: 'white'
		};
		(dispatch = jest.fn()),
			(reset = jest.fn()),
			(updateLocation = jest.fn()),
			(updateCuisine = jest.fn()),
			(setPrice1 = jest.fn()),
			(setPrice2 = jest.fn()),
			(setPrice3 = jest.fn()),
			(setPrice4 = jest.fn()),
			(showFilterOverlay = jest.fn()),
			(getDataFromFilter = jest.fn());
		rendered = render(
			<FilterView
				dispatch={dispatch}
				state={state}
				reset={reset}
				updateLocation={updateLocation}
				updateCuisine={updateCuisine}
				setPrice1={setPrice1}
				setPrice2={setPrice2}
				setPrice3={setPrice3}
				setPrice4={setPrice4}
				showFilterOverlay={showFilterOverlay}
				getDataFromFilter={getDataFromFilter}
			/>
		);
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

	it('should render header styles correctly', () => {
		const headerComponent = rendered.getByTestId('header');
		const given = headerComponent.props.style;
		const result = {
			flex: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render title styles correctly', () => {
		const titleComponent = rendered.getByTestId('title');
		const given = titleComponent.props.style;
		const result = {
			flex: 1,
			alignSelf: 'center'
		};
		expect(result).toMatchObject(given);
	});

	it('should render headerSettings styles correctly', () => {
		const headerSettingsComponent = rendered.getByTestId('headerSettings');
		const given = headerSettingsComponent.props.style;
		const result = {
			flexDirection: 'row',
			justifyContent: 'space-between'
		};
		expect(result).toMatchObject(given);
	});

	it('should render filterInput styles correctly', () => {
		const filterInputComponent = rendered.getByTestId('filterInput');
		const given = filterInputComponent.props.style;
		const result = {
			flex: 3,
			justifyContent: 'center',
			alignItems: 'center'
		};
		expect(result).toMatchObject(given);
	});

	it('should render locationInput styles correctly', () => {
		const locationInputComponent = rendered.getByTestId('locationInput');
		const given = locationInputComponent.props.style;
		const result = {
			flex: 1,
			padding: 20,
			fontSize: 18
		};
		expect(result).toMatchObject(given);
	});

	it('should render cuisineInput styles correctly', () => {
		const cuisineInputComponent = rendered.getByTestId('cuisineInput');
		const given = cuisineInputComponent.props.style;
		const result = {
			flex: 1,
			padding: 20,
			fontSize: 18
		};
		expect(result).toMatchObject(given);
	});

	it('should render priceTypeContainer styles correctly', () => {
		const priceTypeContainerComponent = rendered.getByTestId('priceTypeContainer');
		const given = priceTypeContainerComponent.props.style;
		const result = {
			flexDirection: 'row',
			justifyContent: 'space-around',
			height: 100,
			width: '80%'
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

	it('should render resetButton styles correctly', () => {
		const resetButtonComponent = rendered.getByTestId('resetButton');
		const given = resetButtonComponent.props.style;
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

	it('should render applyButton styles correctly', () => {
		const applyButtonComponent = rendered.getByTestId('applyButton');
		const given = applyButtonComponent.props.style;
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

	it('should render $Button styles correctly', () => {
		const $ButtonComponent = rendered.getByTestId('$Button');
		const given = $ButtonComponent.props.style;
		const result = {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#EB8873',
			borderRadius: 30,
			width: 45,
			height: 45,
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render $$Button styles correctly', () => {
		const $$ButtonComponent = rendered.getByTestId('$$Button');
		const given = $$ButtonComponent.props.style;
		const result = {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#EB8873',
			borderRadius: 20,
			borderRadius: 30,
			width: 45,
			height: 45,
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render $$$Button styles correctly', () => {
		const $$$ButtonComponent = rendered.getByTestId('$$$Button');
		const given = $$$ButtonComponent.props.style;
		const result = {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#EB8873',
			borderRadius: 20,
			borderRadius: 30,
			width: 45,
			height: 45,
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render $$$$Button styles correctly', () => {
		const $$$$ButtonComponent = rendered.getByTestId('$$$$Button');
		const given = $$$$ButtonComponent.props.style;
		const result = {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#EB8873',
			borderRadius: 20,
			borderRadius: 30,
			width: 45,
			height: 45,
			opacity: 1
		};
		expect(result).toMatchObject(given);
	});

	it('should render resetText styles correctly', () => {
		const resetTextComponent = rendered.getByTestId('resetText');
		const given = resetTextComponent.props.style;
		const result = {
			color: '#EB8873',
			fontWeight: 'bold'
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

	it('should render applyText styles correctly', () => {
		const applyTextComponent = rendered.getByTestId('applyText');
		const given = applyTextComponent.props.style;
		const result = {
			color: 'white',
			fontWeight: 'bold'
		};
		expect(result).toMatchObject(given);
	});

	//interaction
	it('should fire filterView location input onChangeText events', () => {
		const locationInputComponent = rendered.getByTestId('locationInput');
		fireEvent(locationInputComponent, 'changeText', 'new text');
		expect(updateLocation).toHaveBeenCalledWith({ location: 'new text' });
	});

	it('should fire filterView cuisine input onChangeText events', () => {
		const updateCuisineComponent = rendered.getByTestId('cuisineInput');
		fireEvent(updateCuisineComponent, 'changeText', 'new text');
		expect(updateCuisine).toHaveBeenCalledWith({ cuisine: 'new text' });
	});
});
