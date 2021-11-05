import React from 'react';
import renderer from 'react-test-renderer';
import SignUpInput from '../SignUpInput';

const state = {
	email: 'xxx@gmail.com'
};

describe('SignUpInput snapshot', () => {
	test('SignUpInput renders correctly', () => {
		const tree = renderer.create(<SignUpInput state={state} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
