import React from 'react';
import LogInHeader from '../LogInHeader';
import { render, cleanup } from '../../../../TestHelperFiles/redux/test-utils';

describe('<LogInHeader />', () => {
	let state;
	let rendered;

	beforeEach(() => {
		state = {
			isLoading: true
		};
		rendered = render(<LogInHeader state={state} />);
	});
	afterEach(cleanup);

	//snapshot
	it('should render correctly', () => {
		expect(rendered).toMatchSnapshot();
	});

	//content
	it('should wrap view with a flexible wrapper', () => {
		const headerComponent = rendered.getByTestId('header');
		const given = headerComponent.props.style;
		const result = {
			flex: 2,
			alignItems: 'center',
			marginTop: 100
		};
		expect(result).toMatchObject(given);
	});

	it('should render logoImage styles', () => {
		const headerComponent = rendered.getByTestId('logoImage');
		const given = headerComponent.props.style;
		const result = {
			width: '30%',
			height: '40%',
			opacity: 0.7
		};
		expect(result).toMatchObject(given);
	});

	it('should render loadingIndicator styles', () => {
		const headerComponent = rendered.getByTestId('loadingIndicator');
		const given = headerComponent.props.style;
		const result = {
			marginTop: 20
		};
		expect(result).toMatchObject(given);
	});
});
