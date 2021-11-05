import React from 'react';
import renderer from 'react-test-renderer';
import LogInInput from '../LogInInput';

test('LogInInput renders correctly', () => {
	const state = {
		email: 'xxx@gmail.com'
	};
	const tree = renderer.create(<LogInInput state={state} />).toJSON();
	expect(tree).toMatchSnapshot();
});
