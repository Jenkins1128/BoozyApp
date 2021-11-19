import React from 'react';
import { render, cleanup, fireEvent } from '../../../../TestHelperFiles/redux/test-utils';
import Favorite from '../Favorite';

describe('<Favorite />', () => {
	let val;
	let rendered;

	beforeEach(() => {
		val = {
			name: 'Texas Roadhouse'
		};
		rendered = render(<Favorite val={val} />);
	});

	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should wrap text with flexible wrapper', () => {
		const itemViewComponent = rendered.getByTestId('container');
		const given = itemViewComponent.props.style;
		const result = {
			flex: 1,
			width: '100%',
			borderBottomWidth: 2,
			borderBottomColor: '#ededed',
			paddingHorizontal: 100,
			paddingVertical: 20
		};
		expect(result).toMatchObject(given);
	});

	it('should render itemText styles correctly', () => {
		const itemTextComponent = rendered.getByTestId('itemText');
		const given = itemTextComponent.props.style;
		const result = {
			color: 'black'
		};
		expect(result).toMatchObject(given);
	});
});
