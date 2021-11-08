import React from 'react';
import { render } from '@testing-library/react-native';
import SignUpHeader from '../SignUpHeader';

const state = {
	requestStatus: 'idle',
	isLoading: false
};

describe('SignUpHeader unit tests', () => {
	test('SignUpHeader renders correctly', () => {
		const tree = render(<SignUpHeader state={state} />);
		expect(tree).toMatchSnapshot();
	});
});
