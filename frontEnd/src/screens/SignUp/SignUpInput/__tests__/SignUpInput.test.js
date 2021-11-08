import React from 'react';
import { render } from '@testing-library/react-native';
import SignUpInput from '../SignUpInput';

const state = {
	email: 'xxx@gmail.com'
};

describe('SignUpInput snapshot', () => {
	test('SignUpInput renders correctly', () => {
		const tree = render(<SignUpInput state={state} />);
		expect(tree).toMatchSnapshot();
	});
});
