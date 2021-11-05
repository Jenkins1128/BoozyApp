import React from 'react';
import renderer from 'react-test-renderer';
import LogInHeader from '../LogInHeader';

test('LogInHeader renders correctly', () => {
	const state = {
		isLoading: false
	};
	const tree = renderer.create(<LogInHeader state={state} />).toJSON();
	expect(tree).toMatchSnapshot();
});
