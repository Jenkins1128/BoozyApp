import React from 'react';
import renderer from 'react-test-renderer';
import SignUpHeader from '../SignUpHeader';

const state = {
	requestStatus: 'idle',
	isLoading: false
};

describe('SignUpHeader unit tests', () => {
	test('SignUpHeader renders correctly', () => {
		const tree = renderer.create(<SignUpHeader state={state} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
