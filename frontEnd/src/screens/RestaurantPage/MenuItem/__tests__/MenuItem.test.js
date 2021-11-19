import React from 'react';
import { render, cleanup, fireEvent } from '../../../../TestHelperFiles/redux/test-utils';
import MenuItem from '../MenuItem';

describe('<MenuItem />', () => {
	let val;
	let dismiss;
	let rendered;

	beforeEach(() => {
		val = {
			price: 6,
			content: 'test'
		};
		dismiss = jest.fn();
		rendered = render(<MenuItem val={val} dismiss={dismiss} />);
	});

	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should render item styles correctly', () => {
		const itemViewComponent = rendered.getByTestId('container');
		const given = itemViewComponent.props.style;
		const result = {
			padding: 20,
			paddingRight: 100,
			borderBottomWidth: 2,
			borderBottomColor: '#ededed'
		};
		expect(result).toMatchObject(given);
	});

	it('should render priceText styles correctly', () => {
		const priceTextComponent = rendered.getByTestId('priceText');
		const given = priceTextComponent.props.style;
		const result = {
			color: 'black'
		};
		expect(result).toMatchObject(given);
	});

	it('should render descText styles correctly', () => {
		const descTextComponent = rendered.getByTestId('descText');
		const given = descTextComponent.props.style;
		const result = {
			color: 'black'
		};
		expect(result).toMatchObject(given);
	});

	//interaction
	it('should fire dismiss button event on TouchableWithoutFeedback', () => {
		const dismissButton = rendered.getByTestId('container');
		fireEvent.press(dismissButton);
		expect(dismiss).toHaveBeenCalledTimes(1);
	});
});
